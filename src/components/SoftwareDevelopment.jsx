import React from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaGlobe, FaMobileScreen, FaCloud, FaUsers, FaLayerGroup, FaWindowMaximize, FaCubes, FaDatabase, FaServer, FaGear, FaMicrochip } from 'react-icons/fa6'
import { Button } from './ui/button'

const EXPERTISE = [
  { name: "Custom Software", icon: <FaCode /> },
  { name: "Web Apps", icon: <FaGlobe /> },
  { name: "Mobile Apps", icon: <FaMobileScreen /> },
  { name: "SaaS Platforms", icon: <FaCloud /> },
  { name: "CRM Systems", icon: <FaUsers /> },
  { name: "ERP Solutions", icon: <FaLayerGroup /> },
  { name: "E-Commerce", icon: <FaWindowMaximize /> },
  { name: "API Development", icon: <FaCubes /> },
  { name: "Database Design", icon: <FaDatabase /> },
  { name: "Enterprise Software", icon: <FaServer /> },
  { name: "Business Automation", icon: <FaGear /> },
  { name: "AI Applications", icon: <FaMicrochip /> },
]

export default function SoftwareDevelopment() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/3">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
            >
              Software Built Around Your Business
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
            >
              We engineer scalable, secure, and high-performance software tailored to your specific operational needs. From complex enterprise systems to sleek customer-facing apps, we turn logic into value.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openConsultationModal'))} className="bg-brand-plum hover:bg-brand-plum/90 dark:bg-brand-cream dark:text-brand-plum dark:hover:bg-brand-cream/90 text-white rounded-full">
                Discuss Your Software Idea
              </Button>
            </motion.div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {EXPERTISE.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-muted/30 border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 hover:bg-muted/50 hover:border-brand-plum/20 transition-colors cursor-pointer group"
                >
                  <div className="text-brand-plum/50 dark:text-brand-cream/50 group-hover:text-brand-rose transition-colors duration-300">
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                  <span className="font-medium text-sm text-foreground">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
