import React from 'react'
import { motion } from 'framer-motion'
import { FaBuilding, FaMicrochip, FaGlobe, FaLightbulb, FaShieldHalved, FaLeaf } from 'react-icons/fa6'

const LOGOS = [
  { name: "Acme Corp", icon: <FaBuilding /> },
  { name: "TechFlow", icon: <FaMicrochip /> },
  { name: "Global Industries", icon: <FaGlobe /> },
  { name: "Innovate LLC", icon: <FaLightbulb /> },
  { name: "Quantum Systems", icon: <FaShieldHalved /> },
  { name: "Nexus Brands", icon: <FaLeaf /> },
]

// Duplicate the array for seamless infinite scrolling
const MARQUEE_ITEMS = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS]

export default function TrustedBy() {
  return (
    <section className="py-16 border-b border-border/50 overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-bold tracking-[0.2em] text-brand-rose uppercase mb-3">
            Trusted by Businesses That Want to Grow
          </h3>
          <p className="text-base text-muted-foreground max-w-xl mx-auto font-medium">
            From fast-growing startups to established enterprises, we partner with ambitious brands.
          </p>
        </motion.div>
      </div>

      {/* Auto-scrolling marquee */}
      <div className="relative flex overflow-hidden w-full group py-4">
        
        {/* Track 1 */}
        <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap group-hover:[animation-play-state:paused]">
          {MARQUEE_ITEMS.map((item, index) => (
            <div 
              key={`logo-${index}`} 
              className="flex items-center gap-3 justify-center mx-10 md:mx-16 min-w-fit grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-default"
            >
              <div className="text-brand-plum dark:text-brand-cream text-3xl">
                {item.icon}
              </div>
              <span className="font-display font-bold text-2xl text-foreground tracking-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Track 2 (Absolute positioned for seamless loop) */}
        <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap absolute top-4 group-hover:[animation-play-state:paused] translate-x-full">
          {MARQUEE_ITEMS.map((item, index) => (
            <div 
              key={`logo-dup-${index}`} 
              className="flex items-center gap-3 justify-center mx-10 md:mx-16 min-w-fit grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-default"
            >
              <div className="text-brand-plum dark:text-brand-cream text-3xl">
                {item.icon}
              </div>
              <span className="font-display font-bold text-2xl text-foreground tracking-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
