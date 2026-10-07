import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaXmark, FaCheck, FaChevronDown } from 'react-icons/fa6'
import { Button } from './ui/button'
import { useContent } from '../contexts/ContentContext'
import { useSettings } from '../contexts/SettingsContext'
import AnimatedHeading from './ui/AnimatedHeading';

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

export default function ServicesOverview({ hideHeader = false }) {
  const settings = useSettings() || {}
  const navigate = useNavigate()
  const { services } = useContent()

  return (
    <section id="services" className={`bg-white border-t border-black/10 relative overflow-hidden ${hideHeader ? 'py-16' : 'py-32'}`}>
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C5FA01]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[#C5FA01]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {!hideHeader && (
          <div className="text-center max-w-4xl mx-auto mb-20 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5FA01]/10 border border-black/20 text-black text-sm font-bold tracking-wide uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#C5FA01] animate-pulse" />
              Services
            </motion.div>

            <AnimatedHeading 
              text={settings.servicesTitle || "Our Expertise"} 
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-tight mb-6" 
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto leading-relaxed"
            >
              {settings.servicesSubtitle || "Comprehensive digital solutions tailored to scale your business and dominate your market."}
            </motion.p>
          </div>
        )}

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          {services.map((service, index) => {
            const bgImage = bgImages[index % bgImages.length];
            
            return (
              <motion.div
                layoutId={service.id || service.slug}
                onClick={() => navigate(`/services/${service.slug || service.id}`)}
                key={service.slug || service.id}
                className="group/card w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)] rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-xl cursor-pointer overflow-hidden relative transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Image Section (Top half) */}
                <div className="relative h-40 overflow-hidden shrink-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110"
                    style={{ backgroundImage: `url('${service.featuredImage || bgImage}')` }}
                  />
                  <div className="absolute inset-0 bg-[#C5FA01]/30 mix-blend-multiply transition-opacity group-hover/card:opacity-0" />
                  
                  {/* Explore Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm opacity-0 -translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
                    <span className="text-[10px] font-bold text-black uppercase tracking-wider">Explore</span>
                    <FaArrowRight className="text-[10px] text-black" />
                  </div>
                </div>
                
                {/* Content Section (Bottom half) */}
                <div className="p-5 flex flex-col grow">
                  <h3 className="font-display font-bold text-lg mb-2 text-black leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-black/70 line-clamp-3">
                    {service.description}
                  </p>
                  
                  {/* Bottom Line Accent */}
                  <div className="mt-auto pt-4">
                    <div className="w-8 h-1 bg-[#C5FA01] rounded-full group-hover/card:w-full transition-all duration-500 ease-out" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>

      </section>
  )
}
