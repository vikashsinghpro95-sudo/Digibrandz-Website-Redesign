import React, { useState, useEffect } from 'react';
import SortableTable from '../components/SortableTable';
import { turso, fetchAll } from '../../lib/turso';

export default function HeroServicesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      setItems(await fetchAll('SELECT * FROM hero_services ORDER BY sort_order ASC'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setId(''); setName(''); setIcon(''); setDisplayOrder(0);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setId(item.id);
    setName(item.name || '');
    setIcon(item.icon || '');
    setDisplayOrder(item.sort_order || 0);
  };

  const handleDelete = async (deleteId) => {
    if (!confirm('Are you sure?')) return;
    await turso.execute({ sql: 'DELETE FROM hero_services WHERE id = ?', args: [deleteId] });
    fetchItems();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // if id changed
        if (id !== editingId) {
          await turso.execute({
            sql: 'UPDATE hero_services SET id=?, name=?, icon=?, sort_order=? WHERE id=?',
            args: [id, name, icon, displayOrder, editingId]
          });
        } else {
          await turso.execute({
            sql: 'UPDATE hero_services SET name=?, icon=?, sort_order=? WHERE id=?',
            args: [name, icon, displayOrder, id]
          });
        }
      } else {
        await turso.execute({
          sql: 'INSERT INTO hero_services (id, name, icon, sort_order) VALUES (?, ?, ?, ?)',
          args: [id, name, icon, displayOrder]
        });
      }
      resetForm(); fetchItems();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900">Manage Hero Services (Explore Our Services)</h2>
        {editingId !== null && <button onClick={resetForm} className="text-sm text-black">Cancel Edit</button>}
      </div>
      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">ID (Slug-like)</label><input required type="text" className="w-full p-2 border rounded-lg" value={id} onChange={e => setId(e.target.value)} /></div>
            <div><label className="block text-sm font-medium mb-1">Name</label><input required type="text" className="w-full p-2 border rounded-lg" value={name} onChange={e => setName(e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Icon (e.g. FaShareNodes)</label>
              <input required type="text" className="w-full p-2 border rounded-lg" value={icon} onChange={e => setIcon(e.target.value)} placeholder="Must be a valid FontAwesome6 icon name" />
            </div>
            <div><label className="block text-sm font-medium mb-1">Display Order</label><input type="number" className="w-full p-2 border rounded-lg" value={displayOrder} onChange={e => setDisplayOrder(parseInt(e.target.value))} /></div>
          </div>
          <button type="submit" className="bg-[#C5FA01] text-black px-6 py-2 rounded-lg">{editingId ? 'Update Service' : 'Create Service'}</button>
        </form>
      </div>
      <SortableTable 
        items={items}
        onReorder={async (newItems) => {
          setItems(newItems);
          try {
            await Promise.all(newItems.map((item, index) => turso.execute({ sql: 'UPDATE hero_services SET sort_order = ? WHERE id = ?', args: [index, item.id] })));
          } catch (err) { alert('Order update failed'); fetchItems(); }
        }}
        columns={[{ label: 'Name' }, { label: 'Icon' }, { label: 'Actions', className: 'text-right' }]}
        renderRow={(item) => (
          <>
            <td className="px-6 py-4">{item.name}</td>
            <td className="px-6 py-4 font-mono text-sm">{item.icon}</td>
            <td className="px-6 py-4 text-right space-x-3"><button onClick={() => handleEdit(item)} className="text-black">Edit</button><button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button></td>
          </>
        )}
      />
    </div>
  );
}
