import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

export default function LeadGenCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-plum to-brand-rose z-0" />
      
      {/* Decorative Overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blush/20 to-transparent mix-blend-overlay pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-t from-brand-darkPlum/50 to-transparent mix-blend-overlay pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-tight"
          >
            Have an Idea? <br className="hidden sm:block"/>
            Let's Build It <span className="text-brand-cream">Together.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/80 mb-12 font-medium"
          >
            Whether it's a disruptive app, a high-converting website, or a full-scale digital marketing campaign—we're ready when you are.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button size="lg" className="bg-brand-cream hover:bg-white text-brand-plum rounded-full px-10 h-16 text-lg font-bold shadow-xl transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto">
              Start a Project
            </Button>
            <Button size="lg" variant="outline" className="border-brand-cream/30 text-white bg-white/5 hover:bg-white/20 hover:text-white rounded-full px-10 h-16 text-lg font-bold backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto">
              Book a Free Consultation
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
