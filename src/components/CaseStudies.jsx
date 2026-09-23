import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaXmark, FaCheck } from 'react-icons/fa6'
import { Button } from './ui/button'
import { CASE_STUDIES } from '../data/content'
import { Link } from 'react-router-dom'

export default function CaseStudies({ limit }) {
  const [selectedStudy, setSelectedStudy] = useState(null)
  
  const displayedStudies = limit ? CASE_STUDIES.slice(0, limit) : CASE_STUDIES;

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            Real Problems. Real Solutions. <br className="hidden sm:block"/>
            <span className="text-brand-rose">Real Results.</span>
          </motion.h2>
        </div>

        {/* Grid Container */}
        <div className="flex flex-wrap justify-center gap-6 pb-12 pt-4">
          {displayedStudies.map((study, index) => (
            <motion.div 
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
              onClick={() => setSelectedStudy(study)}
              className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-card/95 border border-border/40 rounded-[2rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(189,85,121,0.08)] hover:-translate-y-2 hover:bg-card hover:border-brand-rose/20 transition-all duration-500 cursor-pointer group flex flex-col justify-between relative overflow-hidden transform-gpu"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose/5 rounded-full blur-[40px] group-hover:bg-brand-rose/10 transition-colors transform-gpu" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6 gap-4">
                  <span className="text-brand-rose font-bold text-[10px] sm:text-xs uppercase tracking-widest block bg-brand-rose/5 border border-brand-rose/10 w-fit px-4 py-1.5 rounded-full">
                    {study.industry}
                  </span>
                  {study.logo && (
                    <div className="h-12 w-auto max-w-[120px] bg-white rounded-lg p-2 shadow-sm shrink-0 border border-border/50 opacity-90 group-hover:opacity-100 transition-opacity">
                      <img src={study.logo} alt={`${study.client} logo`} className="h-full object-contain" />
                    </div>
                  )}
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight group-hover:text-brand-rose transition-colors line-clamp-2">
                  {study.client}
                </h3>
                <p className="text-base text-muted-foreground/90 line-clamp-3 mb-8 leading-relaxed font-medium">
                  {study.overview}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 mt-auto pt-6 border-t border-border/40 relative z-10">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-brand-rose transition-colors">
                  Read Case Study
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
                {study.website && (
                  <a 
                    href={study.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-muted-foreground hover:text-white transition-all px-4 py-2 rounded-full bg-muted/30 hover:bg-brand-plum border border-transparent hover:border-brand-plum w-fit shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Site
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {limit && limit < CASE_STUDIES.length && (
          <div className="flex justify-center mt-8">
            <Link to="/portfolio">
              <Button size="lg" className="bg-brand-rose hover:bg-white hover:text-brand-plum text-white rounded-full px-10 py-6 text-lg font-bold shadow-xl shadow-brand-rose/20 transition-all hover:-translate-y-1">
                Show More Case Studies
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        )}

      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background/90 backdrop-blur-sm"
            onClick={() => setSelectedStudy(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedStudy(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-foreground transition-all z-20"
              >
                <FaXmark size={18} />
              </button>

              {/* Minimal Header */}
              <div className="pt-12 px-8 md:px-12 pb-8 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-4 mb-6">
                  {selectedStudy.logo && (
                    <div className="h-12 w-auto bg-white rounded-lg p-1.5 shadow-sm border border-border/50">
                      <img src={selectedStudy.logo} alt={`${selectedStudy.client} logo`} className="h-full w-full object-contain" />
                    </div>
                  )}
                  <span className="text-brand-rose font-bold text-[10px] uppercase tracking-widest bg-brand-rose/5 border border-brand-rose/10 px-3 py-1 rounded-full">
                    {selectedStudy.industry}
                  </span>
                </div>
                
                <h3 className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight mb-6">
                  {selectedStudy.client}
                </h3>
                
                {selectedStudy.website && (
                  <a 
                    href={selectedStudy.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-brand-rose transition-colors group"
                  >
                    Visit Live Project <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>

              {/* Reading Content */}
              <div className="px-8 md:px-12 py-8 overflow-y-auto flex-grow" data-lenis-prevent="true">
                <div className="max-w-2xl mx-auto space-y-12 pb-12">
                  
                  {/* Overview */}
                  <section>
                    <h4 className="font-bold text-lg text-foreground mb-4 border-l-2 border-brand-rose pl-4">Overview</h4>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {selectedStudy.overview}
                    </p>
                  </section>

                  {/* The Challenge */}
                  <section>
                    <h4 className="font-bold text-lg text-foreground mb-4 border-l-2 border-brand-rose pl-4">The Challenge</h4>
                    <ul className="space-y-3">
                      {selectedStudy.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 shrink-0 mt-2.5" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* What We Did */}
                  <section>
                    <h4 className="font-bold text-lg text-foreground mb-6 border-l-2 border-brand-rose pl-4">What We Delivered</h4>
                    <div className="space-y-8">
                      {Object.entries(selectedStudy.whatWeDid).map(([category, actions], idx) => (
                        <div key={idx}>
                          <h5 className="font-bold text-foreground mb-3">{category}</h5>
                          <ul className="space-y-3">
                            {actions.map((action, actionIdx) => (
                              <li key={actionIdx} className="flex items-start gap-3 text-muted-foreground">
                                <FaCheck className="text-brand-rose shrink-0 mt-1" size={14} />
                                <span className="leading-relaxed">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
