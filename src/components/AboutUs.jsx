import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBookOpen, FaBullseye, FaRocket, FaUsers, FaBuilding, FaTrophy } from 'react-icons/fa6'
import { ABOUT_US } from '../data/content'

const ABOUT_TABS = [
  { id: 'story', label: 'Our Story', icon: <FaBookOpen />, content: ABOUT_US.story },
  { id: 'vision', label: 'Our Vision', icon: <FaRocket />, content: ABOUT_US.vision },
  { id: 'mission', label: 'Our Mission', icon: <FaBullseye />, content: ABOUT_US.mission },
  { id: 'team', label: 'Meet Our Team', icon: <FaUsers />, content: ABOUT_US.team },
  { id: 'office', label: 'Our Office', icon: <FaBuilding />, content: ABOUT_US.office },
  { id: 'awards', label: 'Awards', icon: <FaTrophy />, content: ABOUT_US.awards },
]

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('story')

  return (
    <section id="about" className="py-24 bg-background overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-rose/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-plum/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            About <span className="text-brand-rose">DigiBrandz</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Empowering businesses with innovative technology, creative strategies, and result-driven digital solutions.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Tabs Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col gap-2"
          >
            {ABOUT_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 font-semibold text-lg ${
                  activeTab === tab.id 
                    ? 'bg-brand-plum text-white shadow-lg scale-[1.02] dark:bg-brand-cream dark:text-brand-plum' 
                    : 'bg-card text-foreground hover:bg-muted border border-transparent hover:border-border'
                }`}
              >
                <span className={`text-xl ${activeTab === tab.id ? 'text-brand-rose' : 'text-muted-foreground'}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-sm h-full min-h-[300px] flex items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/10 rounded-full blur-[80px] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {ABOUT_TABS.map((tab) => (
                  activeTab === tab.id && (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <h3 className="font-display font-bold text-3xl mb-6 text-foreground flex items-center gap-3">
                        <span className="text-brand-rose">{tab.icon}</span>
                        {tab.label}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {tab.content}
                      </p>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

