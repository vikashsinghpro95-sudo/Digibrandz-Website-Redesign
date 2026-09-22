import fs from 'fs';

let contentStr = fs.readFileSync('src/components/LeadGenCTA.jsx', 'utf8');

// Add import for ConsultationModal and useState
if (!contentStr.includes('useState')) {
  contentStr = contentStr.replace(
    "import React from 'react'",
    "import React, { useState } from 'react'"
  );
}

if (!contentStr.includes('ConsultationModal')) {
  contentStr = contentStr.replace(
    "import { Button } from './ui/button'",
    "import { Button } from './ui/button'\nimport ConsultationModal from './ConsultationModal'"
  );
}

// Add state for modal
if (!contentStr.includes('isConsultationOpen')) {
  contentStr = contentStr.replace(
    "export default function LeadGenCTA() {",
    "export default function LeadGenCTA() {\n  const [isConsultationOpen, setIsConsultationOpen] = useState(false)"
  );
}

// Update the button onClick to open modal instead of scroll/navigate
// The original probably has `onClick={() => document.getElementById('contact').scrollIntoView(...)` or similar, 
// let's just search and replace the Button attributes
contentStr = contentStr.replace(
  /<Button[\s\S]*?>([\s\S]*?)Book a Free Consultation([\s\S]*?)<\/Button>/,
  `<Button size="lg" onClick={() => setIsConsultationOpen(true)} className="bg-brand-cream text-brand-plum hover:bg-white px-8 h-14 text-base font-bold rounded-full shadow-xl shadow-brand-cream/20 transition-all hover:-translate-y-1">
                $1Book a Free Consultation$2
              </Button>`
);

// Add the modal component at the end of the return statement before </section>
if (!contentStr.includes('<ConsultationModal')) {
  contentStr = contentStr.replace(
    /<\/section>/,
    `  <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </section>`
  );
}

fs.writeFileSync('src/components/LeadGenCTA.jsx', contentStr);
console.log('Successfully updated LeadGenCTA.jsx with modal.');
