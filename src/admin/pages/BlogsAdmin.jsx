import React, { useState, useEffect } from 'react';
import SortableTable from '../components/SortableTable';
import { turso, fetchAll } from '../../lib/turso';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageUpload from '../components/ImageUpload';

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Form State in requested order
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [status, setStatus] = useState('Draft'); // Draft / Active / Inactive
  const [internalLinking, setInternalLinking] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await fetchAll('SELECT * FROM blogs ORDER BY display_order ASC, id DESC');
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
    setContent('');
    setFeaturedImage('');
    setImageAltText('');
    setMetaTitle('');
    setMetaDescription('');
    setFocusKeyword('');
    setCanonicalUrl('');
    setPublishedAt('');
    setStatus('Draft');
    setInternalLinking('');
  };

  const decodeHTML = (html) => {
    if (!html) return '';
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title || '');
    setSlug(blog.slug || '');
    setContent(decodeHTML(blog.content || ''));
    setFeaturedImage(blog.featured_image || '');
    setImageAltText(blog.image_alt_text || '');
    setMetaTitle(blog.meta_title || '');
    setMetaDescription(blog.meta_description || '');
    setFocusKeyword(blog.focus_keyword || '');
    setCanonicalUrl(blog.canonical_url || '');
    setPublishedAt(blog.published_at ? blog.published_at.substring(0,10) : '');
    setStatus(blog.status || 'Draft');
    setInternalLinking(blog.internal_linking || '');
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
          sql: 'UPDATE blogs SET title=?, slug=?, content=?, featured_image=?, image_alt_text=?, meta_title=?, meta_description=?, focus_keyword=?, canonical_url=?, published_at=?, status=?, internal_linking=? WHERE id=?',
          args: [title, slug, content, featuredImage, imageAltText, metaTitle, metaDescription, focusKeyword, canonicalUrl, publishedAt, status, internalLinking, editingId]
        });
      } else {
        await turso.execute({
          sql: 'INSERT INTO blogs (title, slug, content, featured_image, image_alt_text, meta_title, meta_description, focus_keyword, canonical_url, published_at, status, internal_linking) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          args: [title, slug, content, featuredImage, imageAltText, metaTitle, metaDescription, focusKeyword, canonicalUrl, publishedAt, status, internalLinking]
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
          <button onClick={resetForm} className="text-sm text-black font-medium">Cancel Edit</button>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit Blog' : 'Create New Blog'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Blog Title</label>
              <input required type="text" className="w-full p-2 border rounded-lg" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug / URL</label>
              <input required type="text" className="w-full p-2 border rounded-lg" value={slug} onChange={e => setSlug(e.target.value)} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Content (HTML)</label>
            <div className="bg-white">
              <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64 mb-12" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Featured Image URL</label>
              <ImageUpload value={featuredImage} onChange={setFeaturedImage} placeholder="https://example.com/image.jpg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image Alt Text</label>
              <input type="text" className="w-full p-2 border rounded-lg" value={imageAltText} onChange={e => setImageAltText(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">SEO Meta Title</label>
              <input type="text" className="w-full p-2 border rounded-lg" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SEO Meta Description</label>
              <input type="text" className="w-full p-2 border rounded-lg" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Focus / Primary Keyword</label>
              <input type="text" className="w-full p-2 border rounded-lg" value={focusKeyword} onChange={e => setFocusKeyword(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Canonical URL</label>
              <input type="text" className="w-full p-2 border rounded-lg" value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Publish Date</label>
              <input type="date" className="w-full p-2 border rounded-lg" value={publishedAt} onChange={e => setPublishedAt(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className="w-full p-2 border rounded-lg" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Internal Linking (URLs, one per line)</label>
            <textarea className="w-full p-2 border rounded-lg h-24" value={internalLinking} onChange={e => setInternalLinking(e.target.value)} placeholder="https://digibrandz.com/services/seo" />
          </div>

          <button type="submit" className="bg-[#C5FA01] text-black px-6 py-2 rounded-lg hover:bg-[#C5FA01]">
            {editingId ? 'Update Blog' : 'Save Blog'}
          </button>
        </form>
      </div>

      <SortableTable 
        items={blogs}
        onReorder={async (newItems) => {
          setBlogs(newItems);
          try {
            await Promise.all(newItems.map((item, index) => turso.execute({ sql: 'UPDATE blogs SET display_order = ? WHERE id = ?', args: [index, item.id] })));
          } catch (err) { alert('Order update failed'); fetchBlogs(); }
        }}
        columns={[{ label: 'Title' }, { label: 'Slug' }, { label: 'Status' }, { label: 'Actions', className: 'text-right' }]}
        renderRow={(blog) => (
          <>
            <td className="px-6 py-4 font-medium text-zinc-900">{blog.title}</td>
            <td className="px-6 py-4 text-zinc-500">{blog.slug}</td>
            <td className="px-6 py-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.status === 'Active' || blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-700'}`}>
                {blog.status}
              </span>
            </td>
            <td className="px-6 py-4 text-right space-x-3">
              <button onClick={() => handleEdit(blog)} className="text-black font-medium hover:text-black/80">Edit</button>
              <button onClick={() => handleDelete(blog.id)} className="text-red-600 font-medium hover:text-red-800">Delete</button>
            </td>
          </>
        )}
      />
    </div>
  );
}
