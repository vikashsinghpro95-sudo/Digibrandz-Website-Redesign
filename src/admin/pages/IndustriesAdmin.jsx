import React, { useState, useEffect } from 'react';
import SortableTable from '../components/SortableTable';
import { turso, fetchAll } from '../../lib/turso';

export default function IndustriesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('published');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      setItems(await fetchAll('SELECT * FROM industries ORDER BY display_order ASC, id ASC'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle(''); setSlug(''); setDescription(''); setStatus('published');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title || ''); setSlug(item.slug || ''); setDescription(item.description || ''); setStatus(item.status || 'published');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await turso.execute({ sql: 'DELETE FROM industries WHERE id = ?', args: [id] });
    fetchItems();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const args = [title, slug, description, status];
    try {
      if (editingId) {
        await turso.execute({
          sql: 'UPDATE industries SET title=?, slug=?, description=?, status=? WHERE id=?',
          args: [...args, editingId]
        });
      } else {
        await turso.execute({
          sql: 'INSERT INTO industries (title, slug, description, status) VALUES (?, ?, ?, ?)',
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
        <h2 className="text-2xl font-bold text-zinc-900">Manage Industries</h2>
        {editingId !== null && <button onClick={resetForm} className="text-sm text-black">Cancel Edit</button>}
      </div>
      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Title</label><input required type="text" className="w-full p-2 border rounded-lg" value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div><label className="block text-sm font-medium mb-1">Slug</label><input required type="text" className="w-full p-2 border rounded-lg" value={slug} onChange={e => setSlug(e.target.value)} /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Description</label><textarea className="w-full p-2 border rounded-lg h-24" value={description} onChange={e => setDescription(e.target.value)} /></div>
          <div><label className="block text-sm font-medium mb-1">Status</label><select className="w-full p-2 border rounded-lg" value={status} onChange={e => setStatus(e.target.value)}><option value="published">Published</option><option value="draft">Draft</option></select></div>
          <button type="submit" className="bg-[#C5FA01] text-black px-6 py-2 rounded-lg">{editingId ? 'Update' : 'Create'}</button>
        </form>
      </div>
      <SortableTable 
        items={items}
        onReorder={async (newItems) => {
          setItems(newItems);
          try {
            await Promise.all(newItems.map((item, index) => turso.execute({ sql: 'UPDATE industries SET display_order = ? WHERE id = ?', args: [index, item.id] })));
          } catch (err) { alert('Order update failed'); fetchItems(); }
        }}
        columns={[{ label: 'Title' }, { label: 'Actions', className: 'text-right' }]}
        renderRow={(item) => (
          <>
            <td className="px-6 py-4">{item.title}</td>
            <td className="px-6 py-4 text-right space-x-3"><button onClick={() => handleEdit(item)} className="text-black">Edit</button><button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button></td>
          </>
        )}
      />
    </div>
  );
}
