import React from 'react'
import { motion } from 'framer-motion'
import { FaMagnifyingGlass, FaArrowPointer, FaShareNodes, FaFileLines, FaEnvelope, FaUsers, FaArrowTrendUp, FaArrowRight } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import { Button } from './ui/button'

const SUB_SERVICES = [
  { 
    name: "Search Engine Optimization", 
    desc: "Dominate search rankings and drive high-intent organic traffic to your website through technical optimization and authoritative content.",
    icon: <FaMagnifyingGlass /> 
  },
  { 
    name: "Google Ads / PPC", 
    desc: "Capture customers exactly when they are searching for your services with hyper-targeted, high-ROI search campaigns.",
    icon: <FaArrowPointer /> 
  },
  { 
    name: "Meta Advertising", 
    desc: "Scale your customer acquisition with data-driven social advertising across Facebook, Instagram, and WhatsApp.",
    icon: <FaFacebook /> 
  },
  { 
    name: "Social Media Marketing", 
    desc: "Build a loyal community and elevate your brand presence with engaging, platform-native content strategies.",
    icon: <FaShareNodes /> 
  },
  { 
    name: "Content Marketing", 
    desc: "Establish industry authority and educate your audience with high-quality blogs, videos, and high-converting lead magnets.",
    icon: <FaFileLines /> 
  },
  { 
    name: "Email Automation", 
    desc: "Nurture leads and maximize customer lifetime value with highly personalized, automated email sequences.",
    icon: <FaEnvelope /> 
  },
  { 
    name: "B2B Lead Generation", 
    desc: "Fill your sales pipeline with qualified prospects using proven multi-channel acquisition funnels and outreach.",
    icon: <FaUsers /> 
  },
  { 
    name: "Performance Marketing", 
    desc: "A holistic, revenue-focused approach where every dollar spent is meticulously tracked, optimized, and scaled.",
    icon: <FaArrowTrendUp /> 
  },
]

export default function DigitalMarketing() {
  return (
    <section className="py-24 relative bg-[#130610] text-brand-cream overflow-hidden">
      
      {/* Dynamic Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-rose/10 rounded-full blur-[150px] pointer-events-none will-change-transform transform-gpu" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-plum/20 rounded-full blur-[150px] pointer-events-none will-change-transform transform-gpu" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Sticky Header */}
          <div className="lg:w-5/12 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-brand-rose tracking-wider uppercase mb-8">
                <span className="flex h-2 w-2 rounded-full bg-brand-rose animate-pulse"></span>
                Digital Marketing
              </div>
              
              <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight tracking-tight">
                Turn Attention <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-brand-blush">Into Customers</span>
              </h2>
              
              <p className="text-lg md:text-xl text-brand-cream/70 leading-relaxed mb-10 font-medium max-w-md">
                We don't just drive traffic; we drive revenue. Our full-funnel marketing strategies are engineered to capture high-intent audiences and convert them into loyal customers.
              </p>
              
              <Button size="lg" className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-brand-rose/20 transition-all hover:-translate-y-1 group">
                See Our Marketing Results
                <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          {/* Right Side: Scrolling Cards */}
          <div className="lg:w-7/12 w-full space-y-6 pb-12">
            {SUB_SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="group relative bg-white/[0.03] border border-white/10 hover:border-brand-rose/50 hover:bg-white/[0.06] rounded-3xl p-8 md:p-10 transition-all duration-500 overflow-hidden"
              >
                {/* Card Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-rose/0 via-brand-rose/5 to-brand-rose/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                  
                  {/* Icon Container */}
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-brand-rose shadow-inner group-hover:scale-110 group-hover:bg-brand-rose group-hover:text-white group-hover:border-brand-rose transition-all duration-500">
                    {service.icon}
                  </div>
                  
                  {/* Text Content */}
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-brand-rose transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-brand-cream/60 leading-relaxed group-hover:text-brand-cream/80 transition-colors">
                      {service.desc}
                    </p>
                  </div>
                  
                </div>
                
                {/* Decorative background icon */}
                <div className="absolute -bottom-10 -right-10 text-[120px] text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 pointer-events-none rotate-12 group-hover:-rotate-12 group-hover:scale-125">
                  {service.icon}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
