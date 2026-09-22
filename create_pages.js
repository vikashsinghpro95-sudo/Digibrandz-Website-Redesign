import fs from 'fs';
import path from 'path';

const pages = {
  'About.jsx': `
import React from 'react';
import AboutUs from '../components/AboutUs';
import Statistics from '../components/Statistics';

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <AboutUs />
      <Statistics />
    </div>
  );
}
`,
  'Services.jsx': `
import React, { lazy, Suspense } from 'react';
import ServicesOverview from '../components/ServicesOverview';
import DigitalMarketing from '../components/DigitalMarketing';
import SoftwareDevelopment from '../components/SoftwareDevelopment';
import WebDevelopment from '../components/WebDevelopment';
import MobileAppDevelopment from '../components/MobileAppDevelopment';
import AiAutomation from '../components/AiAutomation';
import UiUxDesign from '../components/UiUxDesign';
import TechStack from '../components/TechStack';

export default function Services() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <ServicesOverview />
      <DigitalMarketing />
      <SoftwareDevelopment />
      <WebDevelopment />
      <MobileAppDevelopment />
      <AiAutomation />
      <UiUxDesign />
      <TechStack />
    </div>
  );
}
`,
  'Solutions.jsx': `
import React from 'react';
import SolutionsComponent from '../components/Solutions';

export default function Solutions() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <SolutionsComponent />
    </div>
  );
}
`,
  'Industries.jsx': `
import React from 'react';
import IndustriesComponent from '../components/Industries';

export default function Industries() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <IndustriesComponent />
    </div>
  );
}
`,
  'Portfolio.jsx': `
import React from 'react';
import CaseStudies from '../components/CaseStudies';

export default function Portfolio() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <CaseStudies />
    </div>
  );
}
`,
  'Process.jsx': `
import React from 'react';
import ProcessTimeline from '../components/ProcessTimeline';

export default function Process() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <ProcessTimeline />
    </div>
  );
}
`,
  'PricingPage.jsx': `
import React from 'react';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';

export default function PricingPage() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <Pricing />
      <FAQ />
    </div>
  );
}
`,
  'ContactPage.jsx': `
import React from 'react';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <Contact />
    </div>
  );
}
`
};

for (const [filename, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join('src/pages', filename), content.trim());
}

console.log('Successfully created all new page components.');
