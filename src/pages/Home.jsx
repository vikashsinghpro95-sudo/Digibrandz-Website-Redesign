import React, { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import AboutUs from '../components/AboutUs'

// Lazy loaded below-the-fold components
const ServicesOverview = lazy(() => import('../components/ServicesOverview'))
const DigitalMarketing = lazy(() => import('../components/DigitalMarketing'))
const SoftwareDevelopment = lazy(() => import('../components/SoftwareDevelopment'))
const WebDevelopment = lazy(() => import('../components/WebDevelopment'))
const MobileAppDevelopment = lazy(() => import('../components/MobileAppDevelopment'))
const AiAutomation = lazy(() => import('../components/AiAutomation'))
const UiUxDesign = lazy(() => import('../components/UiUxDesign'))
const TechStack = lazy(() => import('../components/TechStack'))
const Industries = lazy(() => import('../components/Industries'))
const Solutions = lazy(() => import('../components/Solutions'))
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'))
const ProcessTimeline = lazy(() => import('../components/ProcessTimeline'))
const CaseStudies = lazy(() => import('../components/CaseStudies'))
const Testimonials = lazy(() => import('../components/Testimonials'))
const Statistics = lazy(() => import('../components/Statistics'))
const Pricing = lazy(() => import('../components/Pricing'))
const FAQ = lazy(() => import('../components/FAQ'))
const Blog = lazy(() => import('../components/Blog'))
const LeadGenCTA = lazy(() => import('../components/LeadGenCTA'))
const Contact = lazy(() => import('../components/Contact'))

export default function Home() {
  return (
    <div className="flex-grow">
      {/* Above the fold (critical path) */}
      <Hero />
      <TrustedBy />
      <AboutUs />
      
      {/* Below the fold (lazy loaded) */}
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-muted-foreground">Loading...</div>}>
        <ServicesOverview />
        <DigitalMarketing />
        <SoftwareDevelopment />
        <WebDevelopment />
        <MobileAppDevelopment />
        <AiAutomation />
        <UiUxDesign />
        <TechStack />
        
        <Industries />
        <Solutions />
        <WhyChooseUs />
        <ProcessTimeline />
        
        <CaseStudies />
        <Testimonials />
        <Statistics />
        <Pricing />
        <FAQ />
        <Blog />
        <LeadGenCTA />
        <Contact />
      </Suspense>
    </div>
  )
}
