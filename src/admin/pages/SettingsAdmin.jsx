import React, { useState, useEffect } from 'react';
import { turso, fetchAll } from '../../lib/turso';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await fetchAll('SELECT setting_key, setting_value FROM settings');
      const settingsObj = {};
      data.forEach(row => {
          settingsObj[row.setting_key] = row.setting_value;
      });
      setSettings(settingsObj);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
          await turso.execute({
              sql: 'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON CONFLICT(setting_key) DO UPDATE SET setting_value = excluded.setting_value',
              args: [key, String(value)]
          });
      }
      alert('Settings updated successfully!');
    } catch (err) {
      alert('Failed to update settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-zinc-900">Global Settings</h2>
      <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-plum border-b pb-2">Company Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Company Name</label><input type="text" className="w-full p-2 border rounded-lg" value={settings.companyName || ''} onChange={e => handleChange('companyName', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1">Phone Number</label><input type="text" className="w-full p-2 border rounded-lg" value={settings.contactPhone || ''} onChange={e => handleChange('contactPhone', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" className="w-full p-2 border rounded-lg" value={settings.contactEmail || ''} onChange={e => handleChange('contactEmail', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1">Address</label><input type="text" className="w-full p-2 border rounded-lg" value={settings.contactAddress || ''} onChange={e => handleChange('contactAddress', e.target.value)} /></div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-plum border-b pb-2">Social Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">LinkedIn</label><input type="url" className="w-full p-2 border rounded-lg" value={settings.socialLinkedIn || ''} onChange={e => handleChange('socialLinkedIn', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1">Twitter</label><input type="url" className="w-full p-2 border rounded-lg" value={settings.socialTwitter || ''} onChange={e => handleChange('socialTwitter', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1">Facebook</label><input type="url" className="w-full p-2 border rounded-lg" value={settings.socialFacebook || ''} onChange={e => handleChange('socialFacebook', e.target.value)} /></div>
              <div><label className="block text-sm font-medium mb-1">Instagram</label><input type="url" className="w-full p-2 border rounded-lg" value={settings.socialInstagram || ''} onChange={e => handleChange('socialInstagram', e.target.value)} /></div>
            </div>
          </div>
          <button type="submit" disabled={saving} className="bg-brand-plum text-white px-8 py-3 rounded-lg font-semibold">{saving ? 'Saving...' : 'Save All Settings'}</button>
        </form>
      </div>
    </div>
  );
}
