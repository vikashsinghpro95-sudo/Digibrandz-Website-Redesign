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