import fs from 'fs';

let contentStr = fs.readFileSync('src/components/ServicesOverview.jsx', 'utf8');

// Import useNavigate
if (!contentStr.includes('useNavigate')) {
  contentStr = contentStr.replace(
    "import { motion, AnimatePresence } from 'framer-motion'",
    "import { motion, AnimatePresence } from 'framer-motion'\nimport { useNavigate } from 'react-router-dom'"
  );
}

// Remove state and replace with navigate
contentStr = contentStr.replace(
  /const \[selectedId, setSelectedId\] = useState\(null\)\n  const \[openFaqIndex, setOpenFaqIndex\] = useState\(null\)/,
  "const navigate = useNavigate()"
);

// Update onClick handler
contentStr = contentStr.replace(
  /onClick=\{\(\) => \{\n\s*setSelectedId\(service\.id\)\n\s*setOpenFaqIndex\(null\)\n\s*\}\}/g,
  "onClick={() => navigate(`/services/${service.id}`)}"
);

// Remove the expanded screen overlay entirely
const startOverlay = contentStr.indexOf("{/* Expanded Screen Overlay */}");
if (startOverlay !== -1) {
  const endOverlay = contentStr.indexOf("</section>");
  contentStr = contentStr.substring(0, startOverlay) + contentStr.substring(endOverlay);
}

fs.writeFileSync('src/components/ServicesOverview.jsx', contentStr);
console.log('Successfully updated ServicesOverview.jsx');
