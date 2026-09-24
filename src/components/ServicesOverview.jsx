import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaXmark, FaCheck, FaChevronDown } from 'react-icons/fa6'
import { Button } from './ui/button'
import { SERVICES } from '../data/content'

// Fallback background images
const bgImages = [
  "/images/services/software.jpg",
  "/images/services/web.jpg",
  "/images/services/marketing.jpg",
  "/images/services/uiux.jpg",
  "/images/services/social.jpg",
  "/images/services/ai.jpg",
  "/images/services/seo.jpg",
  "/images/services/mobile.jpg"
]

export default function ServicesOverview() {
  const navigate = useNavigate()

  return (
    <section id="services" className="py-32 bg-background border-t border-border relative overflow-hidden">
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blush/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-plum/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10 lg:gap-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-rose/10 border border-brand-rose/20 text-brand-rose text-sm font-bold tracking-wide uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-rose animate-pulse" />
              Our Expertise
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-5xl md:text-6xl lg:text-[80px] text-brand-plum dark:text-brand-cream tracking-tight leading-[1.1] mb-6"
            >
              Everything You Need to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose via-brand-plum to-brand-rose dark:from-brand-blush dark:via-brand-cream dark:to-brand-blush">
                Build, Market & Scale
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              We provide end-to-end digital solutions tailored for ambitious brands. From high-performance engineering to data-driven marketing, we deliver results.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          {SERVICES.map((service, index) => {
            const bgImage = bgImages[index % bgImages.length]
            
            return (
               <motion.div
                layoutId={service.id}
                onClick={() => navigate(`/services/${service.id}`)}
                key={service.id}
                className="group/card w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)] rounded-xl border border-border/50 p-5 flex flex-col justify-between cursor-pointer overflow-hidden relative transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg min-h-[220px] transform-gpu"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110 transform-gpu"
                  style={{ backgroundImage: `url('${bgImage}')` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 z-0 bg-brand-darkPlum opacity-80 mix-blend-overlay transition-opacity duration-500 group-hover/card:opacity-70" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                
                {/* Top Section */}
                <div className="relative z-10 flex justify-end items-start">
                  <div className="flex items-center gap-2 opacity-0 -translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Explore</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-md text-sm">
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
                
                {/* Bottom Section */}
                <div className="relative z-10 mt-auto pt-4 text-white transform transition-transform duration-500 group-hover/card:-translate-y-1">
                  <div className="w-8 h-1 bg-brand-rose mb-3 rounded-full opacity-0 scale-x-0 origin-left group-hover/card:opacity-100 group-hover/card:scale-x-100 transition-all duration-500 delay-75" />
                  <h3 className="font-display font-bold text-lg mb-2 text-white group-hover/card:text-brand-cream transition-colors drop-shadow-md leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/80 drop-shadow-sm line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>

      </section>
  )
}
