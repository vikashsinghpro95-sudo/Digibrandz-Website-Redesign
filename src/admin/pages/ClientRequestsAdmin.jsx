import React, { useState, useEffect } from 'react';
import { turso, fetchAll } from '../../lib/turso';
import { format } from 'date-fns';

export default function ClientRequestsAdmin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await fetchAll('SELECT * FROM client_requests ORDER BY created_at DESC');
      setRequests(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await turso.execute({
        sql: 'UPDATE client_requests SET status = ? WHERE id = ?',
        args: [newStatus, id]
      });
      fetchRequests();
    } catch (e) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    try {
      await turso.execute({
        sql: 'DELETE FROM client_requests WHERE id = ?',
        args: [id]
      });
      if (selectedRequest?.id === id) setSelectedRequest(null);
      fetchRequests();
    } catch (e) {
      alert('Failed to delete.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-2xl font-bold text-zinc-900">Client Requests</h2>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* List side */}
        <div className="w-1/3 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[70vh]">
          <div className="bg-zinc-50 border-b border-zinc-200 p-4 shrink-0">
            <h3 className="font-semibold text-zinc-700">Inbox ({requests.length})</h3>
          </div>
          <div className="overflow-auto flex-1">
            <ul className="divide-y divide-zinc-100">
              {requests.map(req => (
                <li 
                  key={req.id} 
                  onClick={() => setSelectedRequest(req)}
                  className={`p-4 cursor-pointer hover:bg-zinc-50 transition-colors ${selectedRequest?.id === req.id ? 'bg-zinc-50 border-l-4 border-brand-plum' : 'border-l-4 border-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-zinc-900 truncate pr-2">{req.name}</span>
                    <span className="text-xs text-zinc-500 shrink-0">
                      {req.created_at ? format(new Date(req.created_at.replace(' ', 'T') + 'Z'), 'MMM d, yyyy') : 'N/A'}
                    </span>
                  </div>
                  <div className="text-sm text-zinc-600 truncate mb-2">{req.company || req.service}</div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      req.status === 'new' ? 'bg-blue-100 text-blue-700' : 
                      req.status === 'contacted' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {req.status || 'new'}
                    </span>
                  </div>
                </li>
              ))}
              {requests.length === 0 && (
                <li className="p-8 text-center text-zinc-500">No requests yet.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Detail side */}
        <div className="w-2/3 bg-white rounded-xl border border-zinc-200 shadow-sm flex flex-col h-[70vh]">
          {selectedRequest ? (
            <>
              <div className="p-6 border-b border-zinc-200 shrink-0 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-1">{selectedRequest.name}</h3>
                  <p className="text-zinc-500 text-sm">
                    {selectedRequest.email} {selectedRequest.phone && `• ${selectedRequest.phone}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select 
                    value={selectedRequest.status || 'new'} 
                    onChange={(e) => handleUpdateStatus(selectedRequest.id, e.target.value)}
                    className="text-sm border border-zinc-200 rounded-lg p-2 bg-zinc-50"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button onClick={() => handleDelete(selectedRequest.id)} className="text-sm text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-auto flex-1">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Company / Type</h4>
                    <p className="font-medium text-zinc-800">{selectedRequest.company || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Services Interested In</h4>
                    <p className="font-medium text-zinc-800">{selectedRequest.service || 'Not specified'}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Message / Details</h4>
                  <div className="bg-zinc-50 p-4 rounded-xl text-zinc-700 whitespace-pre-wrap border border-zinc-100">
                    {selectedRequest.message || 'No message provided.'}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-400">
              Select a request from the inbox to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
