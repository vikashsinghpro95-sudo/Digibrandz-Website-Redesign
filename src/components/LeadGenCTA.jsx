import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import AnimatedHeading from './ui/AnimatedHeading';

export default function LeadGenCTA() {
    return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[#C5FA01] z-0" />
      
      {/* Decorative Overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C5FA01]/20 to-transparent mix-blend-overlay pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[#C5FA01]/50 to-transparent mix-blend-overlay pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          
          <AnimatedHeading text="Have an Idea? Let's Build It Together." className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-black mb-6 leading-tight tracking-tight" />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-black mb-12 font-medium"
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
            <Link to="/contact">
              <Button size="lg" className="bg-[#C5FA01] text-black hover:bg-white px-8 h-14 text-base font-bold rounded-full shadow-xl shadow-brand-cream/20 transition-all hover:-translate-y-1">
                Start a Project
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-black/30 text-black bg-white/5 hover:bg-white/20 hover:text-black rounded-full px-10 h-16 text-lg font-bold backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto">
                Book a Free Consultation
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
      
    </section>
  )
}
