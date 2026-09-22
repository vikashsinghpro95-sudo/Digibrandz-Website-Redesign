import fs from 'fs';
import path from 'path';

function replaceCTAsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  const CTA_TEXTS = [
    "Start a Project",
    "Discuss Your Project",
    "Get Started",
    "Get a Free SEO Audit",
    "Work With Us"
  ];

  CTA_TEXTS.forEach(text => {
    // Construct regex string without backticks
    const regexStr = "<Button([^>]*?)>([\\\\s\\\\S]*?)" + text + "([\\\\s\\\\S]*?)<\\\\/Button>";
    const regex = new RegExp(regexStr, 'g');
    
    content = content.replace(regex, (match, attrs, preText, postText) => {
      attrs = attrs.replace(/onClick=\{.*?\}/, '');
      return "<Button" + attrs + " onClick={() => window.dispatchEvent(new CustomEvent('openConsultationModal'))}>" + preText + text + postText + "</Button>";
    });
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('Updated CTAs in', filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceCTAsInFile(fullPath);
    }
  }
}

processDir('src/components');
processDir('src/pages');
