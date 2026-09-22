import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaPen, FaLock, FaCheck } from 'react-icons/fa6';
import { Button } from '../components/ui/button';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/blogs');
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password for now
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, slug, excerpt, content, coverImage };
      const url = currentId 
        ? `http://localhost:3001/api/blogs/${currentId}` 
        : 'http://localhost:3001/api/blogs';
      const method = currentId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Failed to save');
        return;
      }
      
      alert('Blog saved successfully!');
      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await fetch(`http://localhost:3001/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCoverImage('');
  };

  const loadPostForEdit = async (blog) => {
    try {
      const res = await fetch(`http://localhost:3001/api/blogs/${blog.slug}`);
      if (!res.ok) throw new Error('Failed to fetch full blog');
      const data = await res.json();
      const fullBlog = data.blog || blog; // fallback to list item if fetch fails strangely

      setIsEditing(true);
      setCurrentId(fullBlog.id);
      setTitle(fullBlog.title || '');
      setSlug(fullBlog.slug || '');
      setExcerpt(fullBlog.excerpt || '');
      setContent(fullBlog.content || '');
      setCoverImage(fullBlog.coverImage || '');
    } catch (err) {
      console.error(err);
      alert('Failed to load blog for editing. It may have been deleted.');
    }
  };

  // --- Auth Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#130610] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] w-full max-w-md backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-brand-rose/20 text-brand-rose flex items-center justify-center mx-auto mb-6">
            <FaLock size={24} />
          </div>
          <h2 className="text-3xl font-display font-bold text-center text-white mb-8">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" 
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-rose focus:ring-1 focus:ring-brand-rose outline-none"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">Hint: admin123</p>
            </div>
            <Button type="submit" className="w-full bg-brand-rose hover:bg-white hover:text-brand-plum text-white font-bold rounded-xl h-12">
              Access Dashboard
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- Dashboard Screen ---
  return (
    <div className="min-h-screen bg-[#130610] text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-display font-bold">Blog Admin</h1>
          {!isEditing ? (
            <Button onClick={() => { resetForm(); setIsEditing(true); }} className="bg-brand-rose hover:bg-brand-rose/80 text-white rounded-full">
              <FaPlus className="mr-2" /> New Post
            </Button>
          ) : (
            <Button variant="outline" onClick={resetForm} className="rounded-full">
              Back to List
            </Button>
          )}
        </div>

        {isEditing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-display font-bold mb-8">{currentId ? 'Edit Post' : 'Compose Post'}</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white/70 mb-2">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-rose" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/70 mb-2">URL Slug</label>
                  <input type="text" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} required placeholder="e.g. why-seo-matters" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-rose" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">Cover Image URL</label>
                <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-rose" />
              </div>

              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">Short Excerpt</label>
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={2} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-rose" />
              </div>

              <div>
                <label className="block text-sm font-bold text-white/70 mb-2">Content (Rich Text)</label>
                <div className="bg-white text-black rounded-xl overflow-hidden">
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    className="h-64 mb-12"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" size="lg" className="bg-green-500 hover:bg-green-400 text-white rounded-full font-bold px-10">
                  <FaCheck className="mr-2" /> Publish Post
                </Button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left">
              <thead className="bg-black/40 border-b border-white/10">
                <tr>
                  <th className="p-5 font-bold text-white/70">Title</th>
                  <th className="p-5 font-bold text-white/70">Date</th>
                  <th className="p-5 font-bold text-white/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-white/50">No blog posts found. Create one!</td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-5 font-medium">{blog.title}</td>
                      <td className="p-5 text-white/50 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</td>
                      <td className="p-5 flex justify-end gap-3">
                        <button onClick={() => loadPostForEdit(blog)} className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors">
                          <FaPen size={14} />
                        </button>
                        <button onClick={() => handleDelete(blog.id)} className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
