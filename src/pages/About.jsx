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