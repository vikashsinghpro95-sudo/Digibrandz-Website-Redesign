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