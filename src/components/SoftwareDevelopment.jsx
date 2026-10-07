import React from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaGlobe, FaMobileScreen, FaCloud, FaUsers, FaLayerGroup, FaWindowMaximize, FaCubes, FaDatabase, FaServer, FaGear, FaMicrochip } from 'react-icons/fa6'
import { Button } from './ui/button'
import AnimatedHeading from './ui/AnimatedHeading'

import { Link } from 'react-router-dom'

const EXPERTISE = [
  { name: "Custom Software", icon: <FaCode />, slug: "custom-software" },
  { name: "Web Apps", icon: <FaGlobe />, slug: "web-apps" },
  { name: "Mobile Apps", icon: <FaMobileScreen />, slug: "mobile-apps" },
  { name: "SaaS Platforms", icon: <FaCloud />, slug: "saas-platforms" },
  { name: "CRM Systems", icon: <FaUsers />, slug: "crm-systems" },
  { name: "ERP Solutions", icon: <FaLayerGroup />, slug: "erp-solutions" },
  { name: "E-Commerce", icon: <FaWindowMaximize />, slug: "e-commerce" },
  { name: "API Development", icon: <FaCubes />, slug: "api-development" },
  { name: "Database Design", icon: <FaDatabase />, slug: "database-design" },
  { name: "Enterprise Software", icon: <FaServer />, slug: "enterprise-software" },
  { name: "Business Automation", icon: <FaGear />, slug: "business-automation" },
  { name: "AI Applications", icon: <FaMicrochip />, slug: "ai-applications" },
]

export default function SoftwareDevelopment() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/3">
            <AnimatedHeading text="Software Built Around Your Business" className="font-display font-bold text-4xl md:text-5xl text-black mb-6" />
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-black/70 text-lg mb-8 leading-relaxed"
            >
              We engineer scalable, secure, and high-performance software tailored to your specific operational needs. From complex enterprise systems to sleek customer-facing apps, we turn logic into value.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/contact">
                <Button size="lg" className="bg-[#C5FA01] hover:bg-[#C5FA01]/90   :bg-[#C5FA01]/90 text-black rounded-full">
                  Discuss Your Software Idea
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {EXPERTISE.map((item, idx) => (
                <Link key={idx} to={`/services/${item.slug}`} className="block h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white  border border-black/10  hover:border-black :border-black/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#C5FA01]/5  text-black  flex items-center justify-center text-xl mb-4 group-hover:bg-[#C5FA01] group-hover:text-black transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="font-display font-bold text-lg text-black  group-hover:text-black  transition-colors">
                      {item.name}
                    </h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
