import React, { useState, useEffect } from 'react';
import SortableTable from '../components/SortableTable';
import { turso, fetchAll } from '../../lib/turso';
import ImageUpload from '../components/ImageUpload';

export default function PortfolioAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [challenge, setChallenge] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState('');
  const [status, setStatus] = useState('published');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      setItems(await fetchAll('SELECT * FROM case_studies ORDER BY display_order ASC, id ASC'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle(''); setSlug(''); setCategory(''); setChallenge(''); setWebsite(''); setLogo(''); setStatus('published');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title || ''); setSlug(item.slug || ''); setCategory(item.category || ''); 
    setChallenge(item.challenge || ''); setWebsite(item.website || ''); setLogo(item.logo || ''); 
    setStatus(item.status || 'published');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await turso.execute({ sql: 'DELETE FROM case_studies WHERE id = ?', args: [id] });
    fetchItems();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const args = [title, slug, category, challenge, website, logo, status];
    try {
      if (editingId) {
        await turso.execute({
          sql: 'UPDATE case_studies SET title=?, slug=?, category=?, challenge=?, website=?, logo=?, status=? WHERE id=?',
          args: [...args, editingId]
        });
      } else {
        await turso.execute({
          sql: 'INSERT INTO case_studies (title, slug, category, challenge, website, logo, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
          args
        });
      }
      resetForm(); fetchItems();
    } catch (err) { alert('Error: ' + err.message); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900">Manage Portfolio / Case Studies</h2>
        {editingId !== null && <button onClick={resetForm} className="text-sm text-brand-plum">Cancel Edit</button>}
      </div>
      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Title</label><input required type="text" className="w-full p-2 border rounded-lg" value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div><label className="block text-sm font-medium mb-1">Slug</label><input required type="text" className="w-full p-2 border rounded-lg" value={slug} onChange={e => setSlug(e.target.value)} /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Category (Industry)</label><input type="text" className="w-full p-2 border rounded-lg" value={category} onChange={e => setCategory(e.target.value)} /></div>
          
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Website Link</label><input type="url" className="w-full p-2 border rounded-lg" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://example.com" /></div>
            <div>
              <label className="block text-sm font-medium mb-1">Website Logo</label>
              <ImageUpload value={logo} onChange={setLogo} placeholder="https://example.com/logo.png" />
            </div>
          </div>
          
          <div><label className="block text-sm font-medium mb-1">Description (Challenge)</label><textarea className="w-full p-2 border rounded-lg h-24" value={challenge} onChange={e => setChallenge(e.target.value)} /></div>
          <div><label className="block text-sm font-medium mb-1">Status</label><select className="w-full p-2 border rounded-lg" value={status} onChange={e => setStatus(e.target.value)}><option value="published">Published</option><option value="draft">Draft</option></select></div>
          <button type="submit" className="bg-brand-plum text-white px-6 py-2 rounded-lg">{editingId ? 'Update' : 'Create'}</button>
        </form>
      </div>
      <SortableTable 
        items={items}
        onReorder={async (newItems) => {
          setItems(newItems);
          try {
            await Promise.all(newItems.map((item, index) => turso.execute({ sql: 'UPDATE case_studies SET display_order = ? WHERE id = ?', args: [index, item.id] })));
          } catch (err) { alert('Order update failed'); fetchItems(); }
        }}
        columns={[{ label: 'Client' }, { label: 'Title' }, { label: 'Actions', className: 'text-right' }]}
        renderRow={(item) => (
          <>
            <td className="px-6 py-4">{item.client}</td>
            <td className="px-6 py-4">{item.title}</td>
            <td className="px-6 py-4 text-right space-x-3"><button onClick={() => handleEdit(item)} className="text-brand-plum">Edit</button><button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button></td>
          </>
        )}
      />
    </div>
  );
}
