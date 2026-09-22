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