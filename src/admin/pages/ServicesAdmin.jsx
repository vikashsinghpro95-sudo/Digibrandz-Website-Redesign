import React, { useState, useEffect } from 'react';
import SortableTable from '../components/SortableTable';
import { turso, fetchAll } from '../../lib/turso';
import ImageUpload from '../components/ImageUpload';

export default function ServicesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [offers, setOffers] = useState(''); 
  const [faqs, setFaqs] = useState('');     
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('published');
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      setItems(await fetchAll('SELECT * FROM services ORDER BY display_order ASC, id ASC'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle(''); setSlug(''); setDescription(''); setOffers(''); setFaqs(''); setFeaturedImage(''); setStatus('published'); setDisplayOrder(0);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title || ''); setSlug(item.slug || ''); setDescription(item.description || '');
    
    const parseArray = (val) => {
      if (!val) return '';
      if (Array.isArray(val)) return val.join('\n');
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed.join('\n') : val;
      } catch { return val; }
    };
    
    setOffers(parseArray(item.offers));
    setFaqs(typeof item.faqs === 'string' ? item.faqs : JSON.stringify(item.faqs, null, 2));
    setFeaturedImage(item.featured_image || '');
    setStatus(item.status || 'published');
    setDisplayOrder(item.display_order || 0);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await turso.execute({ sql: 'DELETE FROM services WHERE id = ?', args: [id] });
    fetchItems();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const offersArray = offers.split('\n').map(s => s.trim()).filter(Boolean);
    let faqsData = [];
    try { faqsData = JSON.parse(faqs || '[]'); } catch {}

    const args = [title, slug, description, JSON.stringify(offersArray), JSON.stringify(faqsData), featuredImage, status, displayOrder];
    
    try {
      if (editingId) {
        await turso.execute({
          sql: 'UPDATE services SET title=?, slug=?, description=?, offers=?, faqs=?, featured_image=?, status=?, display_order=? WHERE id=?',
          args: [...args, editingId]
        });
      } else {
        await turso.execute({
          sql: 'INSERT INTO services (title, slug, description, offers, faqs, featured_image, status, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          args
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
        <h2 className="text-2xl font-bold text-zinc-900">Manage Services</h2>
        {editingId !== null && <button onClick={resetForm} className="text-sm text-brand-plum">Cancel Edit</button>}
      </div>
      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Title</label><input required type="text" className="w-full p-2 border rounded-lg" value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div><label className="block text-sm font-medium mb-1">Slug (URL)</label><input required type="text" className="w-full p-2 border rounded-lg" value={slug} onChange={e => setSlug(e.target.value)} /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Description</label><textarea className="w-full p-2 border rounded-lg h-24" value={description} onChange={e => setDescription(e.target.value)} /></div>
          <div>
            <label className="block text-sm font-medium mb-1">Featured Image Link (URL)</label>
            <ImageUpload value={featuredImage} onChange={setFeaturedImage} placeholder="https://example.com/image.jpg" />
          </div>
          <div><label className="block text-sm font-medium mb-1">Offers (One per line)</label><textarea className="w-full p-2 border rounded-lg h-24" value={offers} onChange={e => setOffers(e.target.value)} /></div>
          <div><label className="block text-sm font-medium mb-1">FAQs (Valid JSON Array)</label><textarea className="w-full p-2 border rounded-lg h-24 font-mono text-sm" value={faqs} onChange={e => setFaqs(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Status</label><select className="w-full p-2 border rounded-lg" value={status} onChange={e => setStatus(e.target.value)}><option value="published">Published</option><option value="draft">Draft</option></select></div>
            <div><label className="block text-sm font-medium mb-1">Display Order</label><input type="number" className="w-full p-2 border rounded-lg" value={displayOrder} onChange={e => setDisplayOrder(parseInt(e.target.value))} /></div>
          </div>
          <button type="submit" className="bg-brand-plum text-white px-6 py-2 rounded-lg">{editingId ? 'Update Service' : 'Create Service'}</button>
        </form>
      </div>
      <SortableTable 
        items={items}
        onReorder={async (newItems) => {
          setItems(newItems);
          try {
            await Promise.all(newItems.map((item, index) => turso.execute({ sql: 'UPDATE services SET display_order = ? WHERE id = ?', args: [index, item.id] })));
          } catch (err) { alert('Order update failed'); fetchItems(); }
        }}
        columns={[{ label: 'Title' }, { label: 'Actions', className: 'text-right' }]}
        renderRow={(item) => (
          <>
            <td className="px-6 py-4">{item.title}</td>
            <td className="px-6 py-4 text-right space-x-3"><button onClick={() => handleEdit(item)} className="text-brand-plum">Edit</button><button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button></td>
          </>
        )}
      />
    </div>
  );
}
