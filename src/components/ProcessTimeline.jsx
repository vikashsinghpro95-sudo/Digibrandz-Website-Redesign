import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { title: "Discovery", desc: "Understanding your business goals, target audience, and technical requirements." },
  { title: "Strategy", desc: "Defining the roadmap, tech stack, and marketing approach." },
  { title: "Planning", desc: "Creating wireframes, user journeys, and project milestones." },
  { title: "Design", desc: "Crafting visually stunning and highly intuitive interfaces." },
  { title: "Development", desc: "Writing clean, scalable, and secure code." },
  { title: "Launch", desc: "Rigorous testing, deployment, and going live." },
  { title: "Growth", desc: "Ongoing marketing, optimization, and scaling." },
]

export default function ProcessTimeline() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="process" ref={containerRef} className="py-24 bg-background border-y border-border relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            From Idea to Launch — <br/>
            <span className="text-brand-rose">A Simple Process</span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          
          {/* Background Track */}
          <div className="absolute top-0 left-[28px] md:left-1/2 w-1 h-full bg-border md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Fill Track */}
          <motion.div 
            className="absolute top-0 left-[28px] md:left-1/2 w-1 h-full bg-gradient-to-b from-brand-rose to-brand-blush md:-translate-x-1/2 rounded-full origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-12 md:space-y-24">
            {STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0
              
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-center justify-between w-full relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-5/12" />
                  
                  {/* Center Node */}
                  <div className="absolute left-[8px] md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-10 h-10 rounded-full bg-background border-4 border-brand-rose z-10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-brand-rose rounded-full" />
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-rose/50 transition-all">
                      <span className="text-brand-rose font-bold text-sm uppercase tracking-wider mb-2 block">Step 0{idx + 1}</span>
                      <h3 className="font-display font-bold text-2xl text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                  
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
