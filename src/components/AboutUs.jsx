import React from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase, FaBullseye, FaExpand, FaHandshake } from 'react-icons/fa6'
import { Button } from './ui/button'

const HIGHLIGHTS = [
  {
    title: "Business Focused",
    description: "We align our technical solutions with your core business goals.",
    icon: <FaBriefcase className="w-6 h-6 text-brand-rose" />,
  },
  {
    title: "Result Driven",
    description: "We measure success by metrics that matter: growth, leads, and sales.",
    icon: <FaBullseye className="w-6 h-6 text-brand-rose" />,
  },
  {
    title: "Scalable Solutions",
    description: "Built for today, engineered to grow with you tomorrow.",
    icon: <FaExpand className="w-6 h-6 text-brand-rose" />,
  },
  {
    title: "Long-Term Partnership",
    description: "We're not just an agency, we're your dedicated technology partner.",
    icon: <FaHandshake className="w-6 h-6 text-brand-rose" />,
  },
]

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-brand-plum dark:text-brand-cream leading-tight mb-6">
              Technology Meets Marketing. <br/>
              <span className="text-brand-rose">Growth Happens Here.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We are a unique blend of a software development company and a full-stack digital marketing agency. At DigiBrandz, we don't just build beautiful websites or powerful apps—we engineer complete digital ecosystems designed to attract, convert, and retain your customers.
            </p>
            
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              By bringing design, engineering, marketing, automation, and AI under one roof, we eliminate the friction between your technical stack and your growth strategy.
            </p>

            <Button size="lg" className="bg-brand-plum hover:bg-brand-plum/90 dark:bg-brand-cream dark:text-brand-plum dark:hover:bg-brand-cream/90 text-white rounded-full px-8">
              More About Us
            </Button>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 gap-6 relative">
            {/* Decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-cream/40 dark:bg-brand-plum/40 rounded-full blur-[80px] -z-10 pointer-events-none" />

            {HIGHLIGHTS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                  index % 2 !== 0 ? "sm:translate-y-8" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blush/20 dark:bg-brand-blush/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-xl mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
