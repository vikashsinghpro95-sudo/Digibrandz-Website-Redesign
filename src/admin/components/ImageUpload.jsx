import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function ImageUpload({ value, onChange, placeholder }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    if (!IMGBB_API_KEY) {
      setError('Image upload not configured. Please add VITE_IMGBB_API_KEY to your .env file.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Convert file to base64
      const base64 = await fileToBase64(file);
      // Strip the data:image/...;base64, prefix
      const base64Data = base64.split(',')[1];

      const formData = new FormData();
      formData.append('key', IMGBB_API_KEY);
      formData.append('image', base64Data);
      formData.append('name', file.name.replace(/\.[^.]+$/, ''));

      // Upload directly to ImgBB from browser — no server needed
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || 'Upload to ImgBB failed');
      }

      onChange(data.data.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Error uploading image. Please try again.');
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
          placeholder={placeholder || 'https://example.com/image.jpg'}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="bg-[#C5FA01] text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#C5FA01]/90 disabled:opacity-70 whitespace-nowrap"
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
          <img
            src={value}
            alt="Preview"
            className="h-24 w-auto object-contain"
            onError={e => e.target.style.display = 'none'}
            onLoad={e => e.target.style.display = 'block'}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-[#C5FA01] rounded-full p-1 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = err => reject(err);
  });
}
