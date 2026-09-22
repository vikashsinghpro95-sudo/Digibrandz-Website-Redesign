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