import React from 'react'
import { motion } from 'framer-motion'
import { FaCircleCheck } from 'react-icons/fa6'

const REASONS = [
  {
    title: "One Team, Multiple Capabilities",
    description: "No more juggling multiple agencies. We handle development, design, and marketing under one roof."
  },
  {
    title: "Business First",
    description: "We don't build tech for tech's sake. Every line of code and marketing campaign is tied to your business KPIs."
  },
  {
    title: "Transparent Process",
    description: "Complete visibility into timelines, deliverables, and performance metrics. No black boxes."
  },
  {
    title: "Modern Technology",
    description: "We use scalable, future-proof stacks like React, Node.js, and advanced AI models to keep you ahead."
  },
  {
    title: "Performance Driven",
    description: "Fast load times, high conversion rates, and optimized user journeys are our standard."
  },
  {
    title: "Continuous Support",
    description: "We don't just launch and leave. We provide ongoing maintenance, optimization, and scaling."
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            Why Businesses <span className="text-brand-rose">Choose Us</span>
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Sticky Visual / Illustration Side */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 w-full order-2 lg:order-1">
            <div className="aspect-square md:aspect-video lg:aspect-square rounded-3xl bg-brand-cream/30 dark:bg-card border border-brand-rose/20 relative overflow-hidden flex items-center justify-center p-8">
              
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blush/20 rounded-full blur-[60px]" />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-sm text-center"
              >
                <div className="w-24 h-24 mx-auto bg-brand-plum dark:bg-brand-cream rounded-full flex items-center justify-center mb-6 shadow-xl">
                  <span className="font-display font-bold text-4xl text-brand-cream dark:text-brand-plum">Dbz</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-4">Your Growth Partner</h3>
                <p className="text-muted-foreground">
                  Experience the synergy of world-class engineering and data-driven marketing.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Numbered List Side */}
          <div className="lg:w-1/2 w-full order-1 lg:order-2 space-y-12">
            {REASONS.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-brand-rose text-brand-rose flex items-center justify-center font-display font-bold text-xl group-hover:bg-brand-rose group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  {idx !== REASONS.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-4" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-display font-bold text-2xl mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
