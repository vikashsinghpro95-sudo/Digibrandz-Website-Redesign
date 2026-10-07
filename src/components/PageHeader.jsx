import React from 'react'
import { motion } from 'framer-motion'
import { FaChevronRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-black text-[#C5FA01]">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5FA01]/10 rounded-full blur-[120px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-[#C5FA01]/20 rounded-full blur-[120px] pointer-events-none transform-gpu" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {breadcrumbs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-sm font-semibold mb-6 text-[#C5FA01]/60"
          >
            <Link to="/" className="hover:text-[#C5FA01] transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <FaChevronRight size={10} />
                <span className={idx === breadcrumbs.length - 1 ? "text-[#C5FA01]" : "hover:text-[#C5FA01] transition-colors cursor-pointer"}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        )}

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-[#C5FA01] tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[#C5FA01]/80 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}