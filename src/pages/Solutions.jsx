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