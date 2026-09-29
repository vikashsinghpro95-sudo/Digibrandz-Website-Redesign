import React, { useState, useEffect } from 'react';
import { turso, fetchAll } from '../../lib/turso';

export default function CareersAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('Full-Time');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [status, setStatus] = useState('open');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      setItems(await fetchAll('SELECT * FROM jobs ORDER BY created_at DESC'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle(''); setDepartment(''); setLocation(''); setJobType('Full-Time'); setExperience(''); setDescription(''); setRequirements(''); setStatus('open');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title || ''); setDepartment(item.department || ''); setLocation(item.location || ''); setJobType(item.job_type || item.type || 'Full-Time'); setExperience(item.experience || ''); setDescription(item.description || ''); 
    
    let reqs = item.requirements || item.skills;
    if (typeof reqs === 'string' && reqs.startsWith('[')) {
        try { reqs = JSON.parse(reqs); } catch {}
    }
    setRequirements(Array.isArray(reqs) ? reqs.join('\n') : (typeof reqs === 'string' ? reqs : ''));
    
    setStatus(item.status || 'open');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await turso.execute({ sql: 'DELETE FROM jobs WHERE id = ?', args: [id] });
    fetchItems();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqArray = requirements.split('\n').map(s => s.trim()).filter(Boolean);
    const args = [title, department, location, jobType, description, experience, JSON.stringify(reqArray), status];
    
    try {
      if (editingId) {
        await turso.execute({
          sql: 'UPDATE jobs SET title=?, department=?, location=?, job_type=?, description=?, experience=?, requirements=?, status=? WHERE id=?',
          args: [...args, editingId]
        });
      } else {
        await turso.execute({
          sql: 'INSERT INTO jobs (title, department, location, job_type, description, experience, requirements, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
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
        <h2 className="text-2xl font-bold text-zinc-900">Manage Careers</h2>
        {editingId !== null && <button onClick={resetForm} className="text-sm text-brand-plum">Cancel Edit</button>}
      </div>
      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Job Title</label><input required type="text" className="w-full p-2 border rounded-lg" value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div><label className="block text-sm font-medium mb-1">Department</label><input type="text" className="w-full p-2 border rounded-lg" value={department} onChange={e => setDepartment(e.target.value)} placeholder="Engineering" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Job Type</label><input required type="text" className="w-full p-2 border rounded-lg" value={jobType} onChange={e => setJobType(e.target.value)} placeholder="Full-Time" /></div>
            <div><label className="block text-sm font-medium mb-1">Experience</label><input type="text" className="w-full p-2 border rounded-lg" value={experience} onChange={e => setExperience(e.target.value)} placeholder="1-3 Years" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Location</label><input type="text" className="w-full p-2 border rounded-lg" value={location} onChange={e => setLocation(e.target.value)} placeholder="Remote / Mumbai" /></div>
            <div><label className="block text-sm font-medium mb-1">Status</label><select className="w-full p-2 border rounded-lg" value={status} onChange={e => setStatus(e.target.value)}><option value="open">Open</option><option value="closed">Closed</option></select></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">Description</label><textarea className="w-full p-2 border rounded-lg h-24" value={description} onChange={e => setDescription(e.target.value)} /></div>
          <div><label className="block text-sm font-medium mb-1">Requirements (One per line)</label><textarea className="w-full p-2 border rounded-lg h-24" value={requirements} onChange={e => setRequirements(e.target.value)} /></div>
          <button type="submit" className="bg-brand-plum text-white px-6 py-2 rounded-lg">{editingId ? 'Update' : 'Create'}</button>
        </form>
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr><th className="px-6 py-3">Title</th><th className="px-6 py-3">Type</th><th className="px-6 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.map(item => (
              <tr key={item.id}><td className="px-6 py-4">{item.title}</td><td className="px-6 py-4">{item.job_type}</td><td className="px-6 py-4 text-right space-x-3"><button onClick={() => handleEdit(item)} className="text-brand-plum">Edit</button><button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
