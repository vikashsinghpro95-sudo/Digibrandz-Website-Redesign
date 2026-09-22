import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Regex to match div classes that contain "blur-[...]" but don't have transform-gpu yet
  // We'll just replace "blur-[" followed by anything up to the closing quote, ensuring transform-gpu is present
  const regex = /(className="[^"]*blur-\[\d+px\][^"]*")/g;
  
  content = content.replace(regex, (match) => {
    if (match.includes('transform-gpu')) return match;
    // Insert transform-gpu before the closing quote
    return match.replace(/"$/, ' transform-gpu"');
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('Optimized blurs in', filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

processDir('src/components');
processDir('src/pages');
