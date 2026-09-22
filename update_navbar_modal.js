import fs from 'fs';

let contentStr = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// Add import for ConsultationModal
if (!contentStr.includes('ConsultationModal')) {
  contentStr = contentStr.replace(
    "import { Button } from './ui/button'",
    "import { Button } from './ui/button'\nimport ConsultationModal from './ConsultationModal'"
  );
}

// Add state for modal
if (!contentStr.includes('isConsultationOpen')) {
  contentStr = contentStr.replace(
    "const [isScrolled, setIsScrolled] = useState(false)",
    "const [isScrolled, setIsScrolled] = useState(false)\n  const [isConsultationOpen, setIsConsultationOpen] = useState(false)"
  );
}

// Update handleContactClick
contentStr = contentStr.replace(
  /const handleContactClick = \(\) => \{\n\s*navigate\('\/contact'\)\n\s*\}/,
  `const handleContactClick = () => {
    setIsConsultationOpen(true)
  }`
);

// Add the modal component at the end of the return statement before </header>
if (!contentStr.includes('<ConsultationModal')) {
  contentStr = contentStr.replace(
    /<\/header>/,
    `  <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </header>`
  );
}

fs.writeFileSync('src/components/Navbar.jsx', contentStr);
console.log('Successfully updated Navbar.jsx with modal.');
