import React from 'react'
import { motion } from 'framer-motion'
import { useContent } from '../contexts/ContentContext'

export default function TrustedBy() {
  const { caseStudies } = useContent()
  const logos = caseStudies.filter((study) => study.logo).map((study) => ({
    name: study.client,
    logo: study.logo,
    website: study.website
  }))
  const marqueeItems = logos.length ? [...logos, ...logos, ...logos, ...logos] : []

  if (!marqueeItems.length) return null

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

      <div className="relative flex overflow-hidden w-full group py-4">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {marqueeItems.map((item, index) => (
            <a 
              key={`logo-${index}`} 
              href={item.website || '#'}
              target={item.website ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center justify-center mx-10 md:mx-16 min-w-[120px] max-w-[200px] h-16 transition-transform duration-300 hover:scale-105"
            >
              <img src={item.logo} alt={`${item.name} logo`} className="max-h-full max-w-full object-contain" />
            </a>
          ))}
        </motion.div>
        
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
