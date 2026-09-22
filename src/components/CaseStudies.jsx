import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaXmark, FaCheck } from 'react-icons/fa6'
import { Button } from './ui/button'
import { CASE_STUDIES } from '../data/content'

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState(null)

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 pt-4">
          {CASE_STUDIES.map((study, index) => (
            <motion.div 
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
              onClick={() => setSelectedStudy(study)}
              className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-brand-rose font-bold text-xs uppercase tracking-wider mb-4 block bg-brand-rose/10 w-fit px-3 py-1 rounded-full border border-brand-rose/20">
                  {study.industry}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-4 leading-tight group-hover:text-brand-plum dark:group-hover:text-brand-cream transition-colors line-clamp-3">
                  {study.client}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                  {study.overview}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-brand-plum dark:text-brand-cream group-hover:text-brand-rose transition-colors">
                Read Full Case Study
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedStudy(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-[2rem] shadow-2xl border border-border overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-brand-plum p-8 md:p-10 relative shrink-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/20 rounded-full blur-[80px]" />
                <button 
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-rose text-white transition-colors z-10"
                >
                  <FaXmark size={20} />
                </button>
                <span className="text-brand-rose font-bold text-xs uppercase tracking-wider mb-4 block bg-brand-rose/10 w-fit px-3 py-1 rounded-full border border-brand-rose/20">
                  {selectedStudy.industry}
                </span>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight relative z-10">
                  {selectedStudy.client}
                </h3>
              </div>

              <div className="p-8 md:p-10 overflow-y-auto flex-grow bg-card">
                
                <div className="mb-10">
                  <h4 className="font-bold text-lg text-foreground mb-4">Overview</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedStudy.overview}
                  </p>
                </div>

                <div className="mb-10">
                  <h4 className="font-bold text-lg text-foreground mb-4">The Challenge</h4>
                  <ul className="space-y-3">
                    {selectedStudy.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-brand-rose shrink-0 mt-2" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-10">
                  <h4 className="font-bold text-lg text-foreground mb-6">What We Did</h4>
                  <div className="space-y-8">
                    {Object.entries(selectedStudy.whatWeDid).map(([category, actions], idx) => (
                      <div key={idx}>
                        <h5 className="font-bold text-brand-plum dark:text-brand-cream mb-3">{category}</h5>
                        <ul className="space-y-3">
                          {actions.map((action, actionIdx) => (
                            <li key={actionIdx} className="flex items-start gap-3 text-muted-foreground">
                              <FaCheck className="text-brand-rose shrink-0 mt-1" size={14} />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
