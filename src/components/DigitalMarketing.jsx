import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaMagnifyingGlass, FaArrowPointer, FaShareNodes, FaFileLines, FaEnvelope, FaUsers, FaArrowTrendUp, FaArrowRight } from 'react-icons/fa6'
import { FaFacebook } from 'react-icons/fa'
import { Button } from './ui/button'

const SUB_SERVICES = [
  { 
    name: "Search Engine Optimization", 
    desc: "Dominate search rankings and drive high-intent organic traffic to your website through technical optimization and authoritative content.",
    icon: <FaMagnifyingGlass />,
    slug: "seo"
  },
  { 
    name: "Google Ads / PPC", 
    desc: "Capture customers exactly when they are searching for your services with hyper-targeted, high-ROI search campaigns.",
    icon: <FaArrowPointer />,
    slug: "google-ads"
  },
  { 
    name: "Meta Advertising", 
    desc: "Scale your customer acquisition with data-driven social advertising across Facebook, Instagram, and WhatsApp.",
    icon: <FaFacebook />,
    slug: "meta-advertising"
  },
  { 
    name: "Social Media Marketing", 
    desc: "Build a loyal community and elevate your brand presence with engaging, platform-native content strategies.",
    icon: <FaShareNodes />,
    slug: "social-media-marketing"
  },
  { 
    name: "Content Marketing", 
    desc: "Establish industry authority and educate your audience with high-quality blogs, videos, and high-converting lead magnets.",
    icon: <FaFileLines />,
    slug: "content-marketing"
  },
  { 
    name: "Email Automation", 
    desc: "Nurture leads and maximize customer lifetime value with highly personalized, automated email sequences.",
    icon: <FaEnvelope />,
    slug: "email-automation"
  },
  { 
    name: "B2B Lead Generation", 
    desc: "Fill your sales pipeline with qualified prospects using proven multi-channel acquisition funnels and outreach.",
    icon: <FaUsers />,
    slug: "lead-generation"
  },
  { 
    name: "Performance Marketing", 
    desc: "A holistic, revenue-focused approach where every dollar spent is meticulously tracked, optimized, and scaled.",
    icon: <FaArrowTrendUp />,
    slug: "performance-marketing"
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
          
          {/* Left Side: Sticky Header & Creative */}
          <div className="lg:w-5/12 lg:sticky lg:top-24 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-brand-rose tracking-wider uppercase mb-8 shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-brand-rose animate-pulse"></span>
                Digital Marketing
              </div>
              
              <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6 leading-tight tracking-tight">
                Turn Attention <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-brand-blush">Into Customers</span>
              </h2>
              
              <p className="text-lg text-brand-cream/70 leading-relaxed mb-8 font-medium max-w-md">
                We don't just drive traffic; we drive revenue. Our full-funnel marketing strategies are engineered to capture high-intent audiences and convert them into loyal customers.
              </p>
              
              <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openConsultationModal'))} className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-brand-rose/20 transition-all hover:-translate-y-1 group mb-12 w-fit">
                See Our Marketing Results
                <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Premium 3D Creative Showcase (Visible on Desktop & Mobile) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-brand-rose/10 group mb-12 lg:mb-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#130610] via-[#130610]/20 to-transparent z-10 opacity-80" />
              <img 
                src="/images/digital-marketing-3d.jpg" 
                alt="Digital Marketing Analytics 3D" 
                className="w-full h-auto object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              
              {/* Floating Glassmorphism Badge */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <div>
                     <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                       Live Campaign ROI
                     </div>
                     <div className="text-white font-display font-black text-3xl md:text-4xl">+310%</div>
                   </div>
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-rose/20 border border-brand-rose/30 flex items-center justify-center text-brand-rose shrink-0">
                     <FaArrowTrendUp size={24} />
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Scrolling Cards Grid */}
          <div className="lg:w-7/12 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pb-12 lg:pt-0">
            {SUB_SERVICES.map((service, idx) => (
              <Link key={idx} to={`/services/${service.slug}`} className="block h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                  className="group relative bg-white/[0.02] border border-white/5 hover:border-brand-rose/30 hover:bg-white/[0.04] rounded-[2rem] p-6 md:p-8 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer"
                >
                  {/* Card Hover Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform-gpu" />
                  
                  {/* Icon Container */}
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl text-brand-cream/80 shadow-inner group-hover:scale-110 group-hover:bg-brand-rose group-hover:text-white group-hover:border-brand-rose/50 transition-all duration-500 mb-6 relative z-10">
                    {service.icon}
                  </div>
                  
                  {/* Text Content */}
                  <div className="relative z-10 flex-grow">
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-3 group-hover:text-brand-rose transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm md:text-base text-brand-cream/60 leading-relaxed group-hover:text-brand-cream/80 transition-colors">
                      {service.desc}
                    </p>
                  </div>
                  
                  {/* Decorative Background Icon */}
                  <div className="absolute -bottom-6 -right-6 text-[100px] text-white/[0.02] group-hover:text-brand-rose/[0.05] transition-colors duration-500 pointer-events-none rotate-12 group-hover:-rotate-12 group-hover:scale-110">
                    {service.icon}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
