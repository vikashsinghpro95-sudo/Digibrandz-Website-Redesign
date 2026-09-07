import React, { useEffect } from 'react'
import Lenis from 'lenis'
import { ThemeProvider } from './components/ThemeProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import AboutUs from './components/AboutUs'
import ServicesOverview from './components/ServicesOverview'
import DigitalMarketing from './components/DigitalMarketing'
import SoftwareDevelopment from './components/SoftwareDevelopment'
import WebDevelopment from './components/WebDevelopment'
import MobileAppDevelopment from './components/MobileAppDevelopment'
import AiAutomation from './components/AiAutomation'
import UiUxDesign from './components/UiUxDesign'
import TechStack from './components/TechStack'
import Industries from './components/Industries'
import Solutions from './components/Solutions'
import WhyChooseUs from './components/WhyChooseUs'
import ProcessTimeline from './components/ProcessTimeline'
import Portfolio from './components/Portfolio'
import CaseStudies from './components/CaseStudies'
import Testimonials from './components/Testimonials'
import Statistics from './components/Statistics'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Blog from './components/Blog'
import LeadGenCTA from './components/LeadGenCTA'
import Contact from './components/Contact'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <ThemeProvider defaultTheme="light" storageKey="digibrandz-theme">
      <div className="min-h-screen flex flex-col relative overflow-hidden text-foreground selection:bg-brand-rose/30">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <TrustedBy />
          <AboutUs />
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
          
          <Portfolio />
          <CaseStudies />
          <Testimonials />
          <Statistics />
          <Pricing />
          <FAQ />
          <Blog />
          <LeadGenCTA />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
