import React from 'react'
import { motion } from 'framer-motion'
import { SiAndroid, SiApple, SiFlutter, SiReact, SiFirebase } from 'react-icons/si'
import { FaNetworkWired } from 'react-icons/fa6'

export default function MobileAppDevelopment() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
        >
          Turn Your Idea Into a <span className="text-brand-rose">Powerful Mobile App</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          We build native and cross-platform mobile experiences that users love. Whether you're targeting iOS, Android, or both, we deliver seamless performance and stunning design.
        </motion.p>

        {/* Tech Logos Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70"
        >
          <div className="flex flex-col items-center gap-2 hover:opacity-100 hover:text-brand-rose transition-all">
            <SiAndroid size={48} />
            <span className="text-sm font-medium">Android</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:opacity-100 hover:text-brand-rose transition-all">
            <SiApple size={48} />
            <span className="text-sm font-medium">iOS</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:opacity-100 hover:text-[#02569B] transition-all">
            <SiFlutter size={48} />
            <span className="text-sm font-medium">Flutter</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:opacity-100 hover:text-[#61DAFB] transition-all">
            <SiReact size={48} />
            <span className="text-sm font-medium">React Native</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:opacity-100 hover:text-[#FFCA28] transition-all">
            <SiFirebase size={48} />
            <span className="text-sm font-medium">Firebase</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:opacity-100 hover:text-brand-plum dark:hover:text-brand-cream transition-all">
            <FaNetworkWired size={48} />
            <span className="text-sm font-medium">REST APIs</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
