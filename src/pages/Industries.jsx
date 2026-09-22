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