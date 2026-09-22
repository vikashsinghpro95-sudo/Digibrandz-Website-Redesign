import fs from 'fs';
import path from 'path';

// 1. Create PageHeader.jsx
const pageHeaderContent = `
import React from 'react'
import { motion } from 'framer-motion'
import { FaChevronRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#130610] text-brand-cream">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-rose/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-brand-plum/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {breadcrumbs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-sm font-semibold mb-6 text-muted-foreground/60"
          >
            <Link to="/" className="hover:text-brand-rose transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <FaChevronRight size={10} />
                <span className={idx === breadcrumbs.length - 1 ? "text-brand-rose" : "hover:text-brand-rose transition-colors cursor-pointer"}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        )}

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-white tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}
`;
fs.writeFileSync('src/components/PageHeader.jsx', pageHeaderContent.trim());

// 2. Update all pages
const pages = {
  'About.jsx': `
import React from 'react';
import PageHeader from '../components/PageHeader';
import AboutUs from '../components/AboutUs';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import LeadGenCTA from '../components/LeadGenCTA';

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader 
        title="About DigiBrandz" 
        subtitle="Empowering businesses through innovation, data-driven strategies, and creative excellence." 
        breadcrumbs={['About']} 
      />
      <AboutUs />
      <Statistics />
      <Testimonials />
      <LeadGenCTA />
    </div>
  );
}
`,
  'Services.jsx': `
import React, { lazy, Suspense } from 'react';
import PageHeader from '../components/PageHeader';
import ServicesOverview from '../components/ServicesOverview';
import DigitalMarketing from '../components/DigitalMarketing';
import SoftwareDevelopment from '../components/SoftwareDevelopment';
import WebDevelopment from '../components/WebDevelopment';
import MobileAppDevelopment from '../components/MobileAppDevelopment';
import AiAutomation from '../components/AiAutomation';
import UiUxDesign from '../components/UiUxDesign';
import TechStack from '../components/TechStack';
import LeadGenCTA from '../components/LeadGenCTA';

export default function Services() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive digital solutions designed to scale your brand and drive measurable growth." 
        breadcrumbs={['Services']} 
      />
      <ServicesOverview />
      <DigitalMarketing />
      <SoftwareDevelopment />
      <WebDevelopment />
      <MobileAppDevelopment />
      <AiAutomation />
      <UiUxDesign />
      <TechStack />
      <LeadGenCTA />
    </div>
  );
}
`,
  'Solutions.jsx': `
import React from 'react';
import PageHeader from '../components/PageHeader';
import SolutionsComponent from '../components/Solutions';
import LeadGenCTA from '../components/LeadGenCTA';

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader 
        title="Tailored Solutions" 
        subtitle="Solving real-world business challenges with cutting-edge technology." 
        breadcrumbs={['Solutions']} 
      />
      <SolutionsComponent />
      <LeadGenCTA />
    </div>
  );
}
`,
  'Industries.jsx': `
import React from 'react';
import PageHeader from '../components/PageHeader';
import IndustriesComponent from '../components/Industries';
import LeadGenCTA from '../components/LeadGenCTA';

export default function Industries() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader 
        title="Industries We Serve" 
        subtitle="Specialized digital expertise across diverse business sectors." 
        breadcrumbs={['Industries']} 
      />
      <IndustriesComponent />
      <LeadGenCTA />
    </div>
  );
}
`,
  'Portfolio.jsx': `
import React from 'react';
import PageHeader from '../components/PageHeader';
import CaseStudies from '../components/CaseStudies';
import LeadGenCTA from '../components/LeadGenCTA';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader 
        title="Our Portfolio" 
        subtitle="Real problems. Real solutions. Real results." 
        breadcrumbs={['Portfolio']} 
      />
      <CaseStudies />
      <LeadGenCTA />
    </div>
  );
}
`,
  'Process.jsx': `
import React from 'react';
import PageHeader from '../components/PageHeader';
import ProcessTimeline from '../components/ProcessTimeline';
import LeadGenCTA from '../components/LeadGenCTA';

export default function Process() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader 
        title="How We Work" 
        subtitle="A transparent, milestone-driven approach to ensure timely and high-quality delivery." 
        breadcrumbs={['Process']} 
      />
      <ProcessTimeline />
      <LeadGenCTA />
    </div>
  );
}
`,
  'PricingPage.jsx': `
import React from 'react';
import PageHeader from '../components/PageHeader';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import LeadGenCTA from '../components/LeadGenCTA';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader 
        title="Transparent Pricing" 
        subtitle="Flexible, results-driven plans designed to grow with your business." 
        breadcrumbs={['Pricing']} 
      />
      <Pricing />
      <FAQ />
      <LeadGenCTA />
    </div>
  );
}
`,
  'ContactPage.jsx': `
import React from 'react';
import PageHeader from '../components/PageHeader';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader 
        title="Get in Touch" 
        subtitle="Let's discuss how we can help your business grow and succeed in the digital world." 
        breadcrumbs={['Contact']} 
      />
      <Contact />
    </div>
  );
}
`
};

for (const [filename, content] of Object.entries(pages)) {
  fs.writeFileSync(path.join('src/pages', filename), content.trim());
}

console.log('Successfully updated all pages with PageHeader and CTA.');
