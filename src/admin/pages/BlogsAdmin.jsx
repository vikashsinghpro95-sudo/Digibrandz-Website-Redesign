import React, { useState, useEffect } from 'react';
import { turso, fetchAll } from '../../lib/turso';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageUpload from '../components/ImageUpload';

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('published');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await fetchAll('SELECT * FROM blogs ORDER BY id DESC');
      setBlogs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setFeaturedImage('');
    setStatus('published');
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title || '');
    setSlug(blog.slug || '');
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    setFeaturedImage(blog.featured_image || '');
    setStatus(blog.status || 'published');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    await turso.execute({ sql: 'DELETE FROM blogs WHERE id = ?', args: [id] });
    fetchBlogs();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await turso.execute({
          sql: 'UPDATE blogs SET title=?, slug=?, excerpt=?, content=?, featured_image=?, status=? WHERE id=?',
          args: [title, slug, excerpt, content, featuredImage, status, editingId]
        });
      } else {
        await turso.execute({
          sql: 'INSERT INTO blogs (title, slug, excerpt, content, featured_image, status) VALUES (?, ?, ?, ?, ?, ?)',
          args: [title, slug, excerpt, content, featuredImage, status]
        });
      }
      resetForm();
      fetchBlogs();
    } catch (err) {
      alert('Error saving blog: ' + err.message);
    }
  };

  if (loading) return <div>Loading blogs...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900">Manage Blogs</h2>
        {editingId !== null && (
          <button onClick={resetForm} className="text-sm text-brand-plum font-medium">Cancel Edit</button>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit Blog' : 'Create New Blog'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input required type="text" className="w-full p-2 border rounded-lg" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug (URL)</label>
              <input required type="text" className="w-full p-2 border rounded-lg" value={slug} onChange={e => setSlug(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea required className="w-full p-2 border rounded-lg h-20" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Featured Image URL</label>
            <ImageUpload value={featuredImage} onChange={setFeaturedImage} placeholder="https://example.com/image.jpg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select className="w-full p-2 border rounded-lg" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content (HTML)</label>
            <div className="bg-white">
              <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64 mb-12" />
            </div>
          </div>
          <button type="submit" className="bg-brand-plum text-white px-6 py-2 rounded-lg hover:bg-brand-darkPlum">
            {editingId ? 'Update Blog' : 'Publish Blog'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-3 font-medium text-zinc-500">Title</th>
              <th className="px-6 py-3 font-medium text-zinc-500">Slug</th>
              <th className="px-6 py-3 font-medium text-zinc-500">Status</th>
              <th className="px-6 py-3 font-medium text-zinc-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {blogs.map(blog => (
              <tr key={blog.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 font-medium text-zinc-900">{blog.title}</td>
                <td className="px-6 py-4 text-zinc-500">{blog.slug}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-700'}`}>
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleEdit(blog)} className="text-brand-plum hover:underline">Edit</button>
                  <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-zinc-500">No blogs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
