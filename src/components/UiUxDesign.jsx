import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaMagnifyingGlass, FaTable, FaPaintbrush, FaPlay, FaCircleCheck, FaCode } from 'react-icons/fa6'

const PROCESS = [
  { name: "Research", icon: <FaMagnifyingGlass /> },
  { name: "Wireframes", icon: <FaTable /> },
  { name: "UI Design", icon: <FaPaintbrush /> },
  { name: "Prototype", icon: <FaPlay /> },
  { name: "Testing", icon: <FaCircleCheck /> },
  { name: "Development", icon: <FaCode /> },
]

export default function UiUxDesign() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            Design That Users <span className="text-brand-rose">Love to Use</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            We combine aesthetics with human psychology. Our UI/UX process ensures that every digital product we create is not only visually stunning but also highly intuitive and conversion-optimized.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto hidden md:block">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2" />
          
          {/* Animated Connecting Line */}
          <motion.div 
            style={{ width: lineWidth }}
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-brand-rose to-brand-blush -translate-y-1/2 origin-left" 
          />

          <div className="relative z-10 flex justify-between">
            {PROCESS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                  className="w-14 h-14 rounded-full bg-background border-4 border-background shadow-md flex items-center justify-center text-brand-plum dark:text-brand-cream relative z-10 mb-4"
                >
                  <div className="w-full h-full rounded-full bg-brand-rose/10 flex items-center justify-center">
                    {React.cloneElement(step.icon, { size: 20 })}
                  </div>
                </motion.div>
                <span className="font-semibold text-sm whitespace-nowrap">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-8 relative max-w-xs mx-auto">
          <div className="absolute top-0 left-7 w-1 h-full bg-border" />
          <motion.div 
            style={{ height: lineWidth }}
            className="absolute top-0 left-7 w-1 bg-gradient-to-b from-brand-rose to-brand-blush origin-top" 
          />
          {PROCESS.map((step, idx) => (
            <div key={idx} className="flex items-center gap-6 relative z-10">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="w-14 h-14 shrink-0 rounded-full bg-background border-4 border-background shadow-md flex items-center justify-center text-brand-plum dark:text-brand-cream"
              >
                <div className="w-full h-full rounded-full bg-brand-rose/10 flex items-center justify-center">
                  {React.cloneElement(step.icon, { size: 20 })}
                </div>
              </motion.div>
              <span className="font-semibold text-lg">{step.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
