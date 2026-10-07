import React, { useState, useEffect } from 'react';
import { turso, fetchAll } from '../../lib/turso';
import { format } from 'date-fns';
import { FaFileDownload, FaTrash } from 'react-icons/fa';

export default function JobApplicationsAdmin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchAll('SELECT * FROM form_submissions WHERE type = ? ORDER BY created_at DESC', ['careers']);
      setApplications(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await turso.execute({
        sql: 'UPDATE form_submissions SET status = ? WHERE id = ?',
        args: [newStatus, id]
      });
      fetchApplications();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (e) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await turso.execute({
        sql: 'DELETE FROM form_submissions WHERE id = ?',
        args: [id]
      });
      if (selectedApp?.id === id) setSelectedApp(null);
      fetchApplications();
    } catch (e) {
      alert('Failed to delete.');
    }
  };

  const parseExtra = (app) => {
    try {
      return JSON.parse(app.extra_data) || {};
    } catch {
      return {};
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-2xl font-bold text-zinc-900">Job Applications</h2>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* List side */}
        <div className="w-1/3 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[70vh]">
          <div className="bg-zinc-50 border-b border-zinc-200 p-4 shrink-0">
            <h3 className="font-semibold text-zinc-700">Applications ({applications.length})</h3>
          </div>
          <div className="overflow-auto flex-1">
            <ul className="divide-y divide-zinc-100">
              {applications.map(app => {
                const extra = parseExtra(app);
                return (
                  <li 
                    key={app.id} 
                    onClick={() => setSelectedApp(app)}
                    className={`p-4 cursor-pointer hover:bg-zinc-50 transition-colors ${selectedApp?.id === app.id ? 'bg-zinc-50 border-l-4 border-l-brand-plum' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-zinc-900">{app.name}</span>
                      <span className="text-xs text-zinc-500">{format(new Date(app.created_at), 'MMM d')}</span>
                    </div>
                    <div className="text-sm text-black mb-1">{extra.position || 'General Application'}</div>
                    <div className="text-sm text-zinc-500 line-clamp-1">{app.email}</div>
                    <div className="mt-2 flex gap-2">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
                        app.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'reviewed' ? 'bg-amber-100 text-amber-700' :
                        app.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                        'bg-zinc-100 text-zinc-700'
                      }`}>
                        {app.status || 'new'}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Detail side */}
        <div className="w-2/3 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[70vh]">
          {selectedApp ? (() => {
            const extra = parseExtra(selectedApp);
            return (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-zinc-200 shrink-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900">{selectedApp.name}</h3>
                      <p className="text-black font-medium">{extra.position}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        value={selectedApp.status || 'new'}
                        onChange={(e) => handleUpdateStatus(selectedApp.id, e.target.value)}
                        className="text-sm border border-zinc-200 rounded-lg p-2 bg-zinc-50"
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <button onClick={() => handleDelete(selectedApp.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-zinc-600">
                    <div><span className="block text-xs text-zinc-400 uppercase">Email</span>{selectedApp.email}</div>
                    <div><span className="block text-xs text-zinc-400 uppercase">Phone</span>{selectedApp.phone || '-'}</div>
                    <div><span className="block text-xs text-zinc-400 uppercase">Experience</span>{extra.experience || '-'}</div>
                    <div><span className="block text-xs text-zinc-400 uppercase">Qualification</span>{extra.qualification || '-'}</div>
                    {extra.portfolio && <div className="col-span-2"><span className="block text-xs text-zinc-400 uppercase">Portfolio / LinkedIn</span><a href={extra.portfolio} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{extra.portfolio}</a></div>}
                  </div>
                </div>

                <div className="p-6 overflow-auto flex-1">
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Cover Letter / Message</h4>
                  <div className="bg-zinc-50 rounded-xl p-4 text-zinc-700 whitespace-pre-wrap mb-6 border border-zinc-100">
                    {selectedApp.message || 'No message provided.'}
                  </div>

                  {extra.resume_base64 && (
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-900 mb-2">Resume</h4>
                      <a 
                        href={extra.resume_base64} 
                        download={extra.resume_name || `${selectedApp.name.replace(/\s+/g, '_')}_resume.pdf`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5FA01] text-black rounded-lg hover:bg-[#C5FA01]/90 transition-colors"
                      >
                        <FaFileDownload /> Download Resume
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })() : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
              <p>Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
