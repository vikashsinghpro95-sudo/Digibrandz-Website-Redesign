import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaStethoscope, FaHouse, FaCartShopping, FaLandmark, FaIndustry, FaTruck, FaUtensils, FaPlane, FaCar, FaBriefcase, FaRocket, FaTag, FaTv } from 'react-icons/fa6'
import AnimatedHeading from './ui/AnimatedHeading';

import { Link } from 'react-router-dom'

import { useContent } from '../contexts/ContentContext'

const ICON_MAP = {
  "education": <FaGraduationCap />,
  "healthcare": <FaStethoscope />,
  "real-estate": <FaHouse />,
  "e-commerce": <FaCartShopping />,
  "finance": <FaLandmark />,
  "manufacturing": <FaIndustry />,
  "logistics": <FaTruck />,
  "restaurants": <FaUtensils />,
  "travel-tourism": <FaPlane />,
  "automotive": <FaCar />,
  "professional-services": <FaBriefcase />,
  "startups": <FaRocket />,
  "retail": <FaTag />,
  "entertainment": <FaTv />,
}

export default function Industries() {
  const { industries } = useContent();
  
  return (
    <section id="industries" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedHeading text="Digital Solutions for Every Industry" className="font-display font-bold text-4xl md:text-5xl text-black  mb-6" />
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
          {industries.map((ind, idx) => (
            <Link key={idx} to={`/industries/${ind.id}`} className="block h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (idx % 10) * 0.05 }}
                className="flex flex-col items-center text-center gap-3 group cursor-pointer h-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-black/50  group-hover:bg-[#C5FA01] group-hover:border-black group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {ICON_MAP[ind.id] ? React.cloneElement(ICON_MAP[ind.id], { size: 28 }) : <FaBriefcase size={28} />}
                </div>
                <span className="font-medium text-sm text-foreground group-hover:text-black  transition-colors">{ind.title}</span>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
