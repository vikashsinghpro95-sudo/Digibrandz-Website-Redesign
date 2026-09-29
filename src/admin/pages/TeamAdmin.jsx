import React, { useState, useEffect } from 'react';
import { turso, fetchAll } from '../../lib/turso';
import ImageUpload from '../components/ImageUpload';

export default function TeamAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [status, setStatus] = useState('published');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      setItems(await fetchAll('SELECT * FROM team_members ORDER BY display_order ASC, id ASC'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName(''); setSlug(''); setRole(''); setBio(''); setImage(''); setLinkedin(''); setTwitter(''); setStatus('published');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name || ''); setSlug(item.slug || ''); setRole(item.role || ''); setBio(item.bio || ''); setImage(item.image || '');
    
    let social = item.social;
    if (typeof social === 'string' && social.startsWith('{')) {
        try { social = JSON.parse(social); } catch {}
    }
    setLinkedin(social?.linkedin || '');
    setTwitter(social?.twitter || '');
    setStatus(item.status || 'published');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await turso.execute({ sql: 'DELETE FROM team_members WHERE id = ?', args: [id] });
    fetchItems();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const socialObj = {};
    if (linkedin) socialObj.linkedin = linkedin;
    if (twitter) socialObj.twitter = twitter;
    
    const args = [name, slug, role, bio, image, JSON.stringify(socialObj), status];
    try {
      if (editingId) {
        await turso.execute({
          sql: 'UPDATE team_members SET name=?, slug=?, role=?, bio=?, image=?, social=?, status=? WHERE id=?',
          args: [...args, editingId]
        });
      } else {
        await turso.execute({
          sql: 'INSERT INTO team_members (name, slug, role, bio, image, social, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
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
        <h2 className="text-2xl font-bold text-zinc-900">Manage Team</h2>
        {editingId !== null && <button onClick={resetForm} className="text-sm text-brand-plum">Cancel Edit</button>}
      </div>
      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Name</label><input required type="text" className="w-full p-2 border rounded-lg" value={name} onChange={e => setName(e.target.value)} /></div>
            <div><label className="block text-sm font-medium mb-1">Slug</label><input required type="text" className="w-full p-2 border rounded-lg" value={slug} onChange={e => setSlug(e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Role</label><input type="text" className="w-full p-2 border rounded-lg" value={role} onChange={e => setRole(e.target.value)} /></div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <ImageUpload value={image} onChange={setImage} placeholder="https://example.com/photo.jpg" />
            </div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Bio</label><textarea className="w-full p-2 border rounded-lg h-24" value={bio} onChange={e => setBio(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">LinkedIn URL</label><input type="url" className="w-full p-2 border rounded-lg" value={linkedin} onChange={e => setLinkedin(e.target.value)} /></div>
            <div><label className="block text-sm font-medium mb-1">Twitter URL</label><input type="url" className="w-full p-2 border rounded-lg" value={twitter} onChange={e => setTwitter(e.target.value)} /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Status</label><select className="w-full p-2 border rounded-lg" value={status} onChange={e => setStatus(e.target.value)}><option value="published">Published</option><option value="draft">Draft</option></select></div>
          <button type="submit" className="bg-brand-plum text-white px-6 py-2 rounded-lg">{editingId ? 'Update' : 'Create'}</button>
        </form>
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr><th className="px-6 py-3">Name</th><th className="px-6 py-3">Role</th><th className="px-6 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.map(item => (
              <tr key={item.id}><td className="px-6 py-4">{item.name}</td><td className="px-6 py-4">{item.role}</td><td className="px-6 py-4 text-right space-x-3"><button onClick={() => handleEdit(item)} className="text-brand-plum">Edit</button><button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
