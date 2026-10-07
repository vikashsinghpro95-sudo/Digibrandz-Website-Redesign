import React, { useEffect, useState } from 'react';
import { fetchAll } from '../../lib/turso';
import { FileText, Loader2, Download, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { turso } from '../../lib/turso';

export default function AuditsAdmin() {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAudits();
  }, []);

  const loadAudits = async () => {
    setLoading(true);
    try {
      const data = await fetchAll('SELECT * FROM seo_audits ORDER BY created_at DESC');
      setAudits(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteAudit = async (id) => {
    if(!window.confirm('Delete this audit log?')) return;
    try {
      await turso.execute({ sql: 'DELETE FROM seo_audits WHERE id = ?', args: [id] });
      setAudits(audits.filter(a => a.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const downloadAudit = (audit) => {
    const doc = new jsPDF();
    const pages = audit.report_content.split('---PAGE_BREAK---');
    doc.setFont('helvetica');
    
    pages.forEach((pageContent, idx) => {
      if (idx > 0) doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(255, 8, 68);
      doc.text(`DigiBrandz SEO Audit: ${audit.website_url}`, 15, 20);
      doc.line(15, 25, 195, 25);
      
      doc.setFontSize(11);
      doc.setTextColor(50, 50, 50);
      const splitText = doc.splitTextToSize(pageContent.trim(), 180);
      doc.text(splitText, 15, 35);
      
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${idx + 1} of ${pages.length}`, 195, 285, { align: 'right' });
    });

    const hostname = new URL(audit.website_url.startsWith('http') ? audit.website_url : `https://${audit.website_url}`).hostname || 'Report';
    doc.save(`SEO_Audit_${hostname}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">SEO Audit Logs</h2>
      </div>

      {loading ? (
        <div className="flex items-center gap-2"><Loader2 className="animate-spin w-5 h-5"/> Loading audits...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
          {audits.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">No SEO audits have been generated yet.</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Website URL</th>
                  <th className="px-6 py-4 font-medium">Generated At</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {audits.map(audit => (
                  <tr key={audit.id} className="hover:bg-zinc-50/50">
                    <td className="px-6 py-4 font-medium text-zinc-900">{audit.website_url}</td>
                    <td className="px-6 py-4 text-zinc-500">{new Date(audit.created_at + 'Z').toLocaleString()}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button onClick={() => downloadAudit(audit)} className="text-black hover:text-black  font-medium text-sm flex items-center gap-1 inline-flex">
                        <Download className="w-4 h-4" /> Download
                      </button>
                      <button onClick={() => deleteAudit(audit.id)} className="text-red-500 hover:text-red-700 font-medium text-sm inline-flex">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
