import React from 'react'
import { motion } from 'framer-motion'
import { CASE_STUDIES } from '../data/content'

const LOGOS = CASE_STUDIES.filter(study => study.logo).map(study => ({
  name: study.client,
  logo: study.logo,
  website: study.website
}))

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
        {/* Track */}
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {MARQUEE_ITEMS.map((item, index) => (
            <a 
              key={`logo-${index}`} 
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center mx-10 md:mx-16 min-w-[120px] max-w-[200px] h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <img src={item.logo} alt={`${item.name} logo`} className="max-h-full max-w-full object-contain" />
            </a>
          ))}
        </motion.div>
        
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
