const fs = require('fs');
const path = require('path');

const contentFile = 'src/data/content.js';
let content = fs.readFileSync(contentFile, 'utf-8');

const regex = /https?:\/\/[^"]+\.(png|jpg|jpeg|webp|svg|gif)/gi;
const urls = content.match(regex);

if (!urls) {
  console.log('No external images found.');
  process.exit(0);
}

// Remove duplicates
const uniqueUrls = [...new Set(urls)];

const dir = 'public/assets/logos';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function downloadAndReplace() {
  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    console.log(`Downloading ${url}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      
      // Handle the URL pathname properly for extension
      const urlObj = new URL(url);
      let ext = path.extname(urlObj.pathname) || '.png'; // default to .png if missing
      if (ext === '') ext = '.png';
      
      const filename = `client-${i}${ext}`;
      const dest = path.join(dir, filename);
      
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(dest, buffer);
      
      const localPath = `/assets/logos/${filename}`;
      // escape the url for regex replacement
      const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      content = content.replace(new RegExp(escapedUrl, 'g'), localPath);
      console.log(`Saved to ${dest} and replaced in content.js`);
    } catch (err) {
      console.error(`Failed to download ${url}: ${err.message}`);
    }
  }
  
  fs.writeFileSync(contentFile, content);
  console.log('Finished updating content.js.');
}

downloadAndReplace();
