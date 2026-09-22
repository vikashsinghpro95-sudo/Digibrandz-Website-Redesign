import React, { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import AboutUs from '../components/AboutUs'

// Lazy loaded below-the-fold components
const ServicesOverview = lazy(() => import('../components/ServicesOverview'))
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'))
const CaseStudies = lazy(() => import('../components/CaseStudies'))
const Testimonials = lazy(() => import('../components/Testimonials'))
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
        <WhyChooseUs />
        <CaseStudies />
        <Testimonials />
        <Blog />
        <LeadGenCTA />
        <Contact />
      </Suspense>
    </div>
  )
}
