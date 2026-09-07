import React from 'react'
import { motion } from 'framer-motion'

const TYPES = [
  "Corporate", "Business", "E-Commerce", "Landing Pages", "Portfolio", 
  "Booking Systems", "Educational", "Real Estate", "Healthcare", "Restaurant", "Custom Web Apps"
]

export default function WebDevelopment() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
        >
          Websites That Look Great. <span className="text-brand-rose">Perform Better.</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Your website is your best salesperson. We design and develop stunning, lightning-fast, and SEO-optimized websites that turn visitors into paying customers.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {TYPES.map((type, idx) => (
            <span 
              key={idx}
              className="px-5 py-2.5 bg-background border border-border text-foreground rounded-full text-sm font-medium shadow-sm hover:border-brand-rose hover:text-brand-rose transition-colors cursor-default"
            >
              {type}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
