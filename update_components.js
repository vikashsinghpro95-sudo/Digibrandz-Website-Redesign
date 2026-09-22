import fs from 'fs';

// --- Navbar.jsx ---
let navbarStr = fs.readFileSync('src/components/Navbar.jsx', 'utf8');
navbarStr = navbarStr.replace("import ConsultationModal from './ConsultationModal'\n", "");
navbarStr = navbarStr.replace("const [isConsultationOpen, setIsConsultationOpen] = useState(false)\n", "");
navbarStr = navbarStr.replace(
  /const handleContactClick = \(\) => \{\n\s*setIsConsultationOpen\(true\)\n\s*\}/,
  "const handleContactClick = () => { window.dispatchEvent(new CustomEvent('openConsultationModal')); }"
);
// Remove `<ConsultationModal />` tag completely
navbarStr = navbarStr.replace(/<ConsultationModal[\s\S]*?\/>/, "");
fs.writeFileSync('src/components/Navbar.jsx', navbarStr);
console.log('Updated Navbar.jsx');

// --- LeadGenCTA.jsx ---
let ctaStr = fs.readFileSync('src/components/LeadGenCTA.jsx', 'utf8');
ctaStr = ctaStr.replace("import ConsultationModal from './ConsultationModal'\n", "");
ctaStr = ctaStr.replace("const [isConsultationOpen, setIsConsultationOpen] = useState(false)\n", "");
ctaStr = ctaStr.replace(/onClick=\{.*?setIsConsultationOpen\(true\).*?\}/g, "onClick={() => window.dispatchEvent(new CustomEvent('openConsultationModal'))}");
ctaStr = ctaStr.replace(/<ConsultationModal[\s\S]*?\/>/, "");
fs.writeFileSync('src/components/LeadGenCTA.jsx', ctaStr);
console.log('Updated LeadGenCTA.jsx');

