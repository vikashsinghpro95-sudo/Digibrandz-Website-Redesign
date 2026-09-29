import React, { createContext, useContext, useState, useEffect } from 'react';
import { turso, fetchAll } from '../lib/turso';

const hexToHsl = (hex) => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    // Hero
    heroTitle: 'Empowering Your Digital Evolution',
    heroSubtitle: 'We engineer high-performance software and execute data-driven marketing strategies to accelerate your growth.',
    
    // About
    aboutTitle: 'Driving Digital Innovation Since 2018',
    aboutText: 'DigiBrandz is a premier digital agency specializing in cutting-edge web development, mobile apps, and full-spectrum digital marketing. Our team of expert engineers and creative strategists work together to deliver solutions that drive real business growth.',
    
    // Services
    servicesTitle: 'Our Expertise',
    servicesSubtitle: 'Comprehensive digital solutions tailored to scale your business and dominate your market.',

    // Colors & Contact
    primaryColor: '#601D49',
    secondaryColor: '#BD5579',
    contactEmail: 'contact@digibrandz.com',
    contactPhone: '+91 (123) 456-7890',
    contactAddress: '123 Innovation Drive, Tech District, 400001',
    
    // Footer
    footerText: 'Building digital experiences that scale. Let us build your next big idea.'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const rows = await fetchAll('SELECT setting_key, setting_value FROM settings');
        const data = {};
        rows.forEach(r => data[r.setting_key] = r.setting_value);
        
        setSettings(prev => ({ ...prev, ...data }));
        
        if (data.primaryColor) {
          document.documentElement.style.setProperty('--primary', hexToHsl(data.primaryColor));
        }
        if (data.secondaryColor) {
          document.documentElement.style.setProperty('--secondary', hexToHsl(data.secondaryColor));
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
