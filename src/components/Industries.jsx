import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaStethoscope, FaHouse, FaCartShopping, FaLandmark, FaIndustry, FaTruck, FaUtensils, FaPlane, FaCar, FaBriefcase, FaRocket, FaTag, FaTv } from 'react-icons/fa6'

const INDUSTRIES = [
  { name: "Education", icon: <FaGraduationCap /> },
  { name: "Healthcare", icon: <FaStethoscope /> },
  { name: "Real Estate", icon: <FaHouse /> },
  { name: "E-Commerce", icon: <FaCartShopping /> },
  { name: "Finance", icon: <FaLandmark /> },
  { name: "Manufacturing", icon: <FaIndustry /> },
  { name: "Logistics", icon: <FaTruck /> },
  { name: "Restaurants", icon: <FaUtensils /> },
  { name: "Travel & Tourism", icon: <FaPlane /> },
  { name: "Automotive", icon: <FaCar /> },
  { name: "Professional Services", icon: <FaBriefcase /> },
  { name: "Startups", icon: <FaRocket /> },
  { name: "Retail", icon: <FaTag /> },
  { name: "Entertainment", icon: <FaTv /> },
]

export default function Industries() {
  return (
    <section id="industries" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            Digital Solutions for <span className="text-brand-rose">Every Industry</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            We combine deep technical expertise with industry-specific marketing insights to build solutions that solve real-world challenges across diverse sectors.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {INDUSTRIES.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex flex-col items-center text-center gap-3 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-brand-plum/50 dark:text-brand-cream/50 group-hover:bg-brand-rose group-hover:border-brand-rose group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                {React.cloneElement(ind.icon, { size: 28 })}
              </div>
              <span className="font-medium text-sm text-foreground">{ind.name}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
