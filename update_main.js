import fs from 'fs';

let contentStr = fs.readFileSync('src/main.jsx', 'utf8');

if (!contentStr.includes('HelmetProvider')) {
  contentStr = contentStr.replace(
    "import { BrowserRouter } from 'react-router-dom'",
    "import { BrowserRouter } from 'react-router-dom'\nimport { HelmetProvider } from 'react-helmet-async'"
  );
  
  contentStr = contentStr.replace(
    "<BrowserRouter>",
    "<HelmetProvider>\n      <BrowserRouter>"
  );
  
  contentStr = contentStr.replace(
    "</BrowserRouter>",
    "</BrowserRouter>\n    </HelmetProvider>"
  );
  
  fs.writeFileSync('src/main.jsx', contentStr);
  console.log('Successfully updated main.jsx');
} else {
  console.log('Already updated.');
}
