import React from 'react'
import { motion } from 'framer-motion'
import { FaQuoteRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { TESTIMONIALS } from '../data/testimonials'

export default function Testimonials() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            What Our <span className="text-brand-rose">Clients Say</span>
          </motion.h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {TESTIMONIALS.slice(0, 9).map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-background border border-border p-8 rounded-3xl break-inside-avoid shadow-sm hover:shadow-md transition-shadow relative group"
            >
              <div className="absolute top-6 right-6 text-brand-plum/10 dark:text-brand-cream/10 group-hover:text-brand-rose/20 transition-colors">
                <FaQuoteRight size={48} />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-1 text-brand-rose mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-foreground/90 leading-relaxed text-lg mb-8 font-medium">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-display font-bold text-muted-foreground uppercase">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link to="/testimonials">
            <Button size="lg" className="rounded-full bg-brand-rose hover:bg-brand-rose/90 text-white font-bold h-14 px-8 text-base shadow-lg hover:shadow-brand-rose/20 transition-all">
              View All Client Stories
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}
