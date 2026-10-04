import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';

export default function ImageUpload({ value, onChange, placeholder }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Upload failed');
      }

      // ImgBB returns a full CDN URL
      onChange(data.url);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error uploading image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <input 
          type="text" 
          className="flex-1 p-2 border rounded-lg bg-zinc-50 focus:bg-white transition-colors" 
          value={value || ''} 
          onChange={e => onChange(e.target.value)} 
          placeholder={placeholder || "https://example.com/image.jpg"} 
        />
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="bg-brand-plum text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-brand-plum/90 disabled:opacity-70 whitespace-nowrap"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
      
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml" 
        className="hidden" 
      />
      
      {value && (
        <div className="mt-3 relative inline-block border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
          <img src={value} alt="Preview" className="h-24 w-auto object-contain" onError={(e) => e.target.style.display = 'none'} onLoad={(e) => e.target.style.display = 'block'} />
          <button 
            type="button" 
            onClick={() => onChange('')} 
            className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white rounded-full p-1 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
