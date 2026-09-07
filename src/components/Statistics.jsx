import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Industries Served" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
]

function AnimatedCounter({ value, suffix, duration = 2 }) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const totalFrames = Math.round((duration * 1000) / 16) // Assuming 60fps
      let frame = 0

      const counter = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        // easeOutQuad
        const easeProgress = 1 - (1 - progress) * (1 - progress)
        const currentCount = Math.round(end * easeProgress)
        
        setCount(currentCount)

        if (frame === totalFrames) {
          clearInterval(counter)
          setCount(end)
        }
      }, 16)

      return () => clearInterval(counter)
    }
  }, [value, duration, isInView])

  return (
    <div ref={nodeRef} className="font-display font-bold text-5xl md:text-6xl text-brand-plum dark:text-brand-cream mb-2">
      {count}{suffix}
    </div>
  )
}

export default function Statistics() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            Building Digital Success, <br className="hidden sm:block"/>
            <span className="text-brand-rose">One Project at a Time</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 text-center">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-muted/30 transition-colors"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
