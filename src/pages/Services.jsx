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