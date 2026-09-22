import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaXmark, FaCheck, FaChevronDown } from 'react-icons/fa6'
import { Button } from './ui/button'
import { SERVICES } from '../data/content'

// Fallback background images
const bgImages = [
  "/images/services/software.jpg",
  "/images/services/web.jpg",
  "/images/services/marketing.jpg",
  "/images/services/uiux.jpg",
  "/images/services/social.jpg",
  "/images/services/ai.jpg",
  "/images/services/seo.jpg",
  "/images/services/mobile.jpg"
]

export default function ServicesOverview() {
  const [selectedId, setSelectedId] = useState(null)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  return (
    <section id="services" className="py-32 bg-background border-t border-border relative overflow-hidden">
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blush/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-plum/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10 lg:gap-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-rose/10 border border-brand-rose/20 text-brand-rose text-sm font-bold tracking-wide uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-rose animate-pulse" />
              Our Expertise
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-5xl md:text-6xl lg:text-[80px] text-brand-plum dark:text-brand-cream tracking-tight leading-[1.1] mb-6"
            >
              Everything You Need to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose via-brand-plum to-brand-rose dark:from-brand-blush dark:via-brand-cream dark:to-brand-blush">
                Build, Market & Scale
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              We provide end-to-end digital solutions tailored for ambitious brands. From high-performance engineering to data-driven marketing, we deliver results.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 group/grid relative z-10">
          {SERVICES.map((service, index) => {
            const bgImage = bgImages[index % bgImages.length]
            
            return (
               <motion.div
                layoutId={service.id}
                onClick={() => {
                  setSelectedId(service.id)
                  setOpenFaqIndex(null)
                }}
                key={service.id}
                className="group/card rounded-[2rem] border border-border/50 p-8 flex flex-col justify-between cursor-pointer overflow-hidden relative transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl min-h-[300px]"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110"
                  style={{ backgroundImage: `url('${bgImage}')` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 z-0 bg-brand-darkPlum opacity-80 mix-blend-overlay transition-opacity duration-500 group-hover/card:opacity-70" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                
                {/* Top Section */}
                <div className="relative z-10 flex justify-end items-start">
                  <div className="flex items-center gap-2 opacity-0 -translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300">
                    <span className="text-sm font-bold text-white uppercase tracking-wider">Explore</span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-lg">
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
                
                {/* Bottom Section */}
                <div className="relative z-10 mt-auto pt-6 text-white transform transition-transform duration-500 group-hover/card:-translate-y-2">
                  <div className="w-12 h-1 bg-brand-rose mb-4 rounded-full opacity-0 scale-x-0 origin-left group-hover/card:opacity-100 group-hover/card:scale-x-100 transition-all duration-500 delay-100" />
                  <h3 className="font-display font-bold text-2xl mb-3 text-white group-hover/card:text-brand-cream transition-colors drop-shadow-md">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/80 drop-shadow-sm line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>

      {/* Expanded Screen Overlay */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
          >
            {(() => {
              const activeService = SERVICES.find((s) => s.id === selectedId)
              const bgImage = bgImages[SERVICES.findIndex(s => s.id === selectedId) % bgImages.length]
              
              return (
                <motion.div
                  layoutId={selectedId}
                  className="relative w-full max-w-6xl h-[90vh] md:h-[800px] bg-card rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-border"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Left: Huge Image Cover */}
                  <div className="w-full md:w-2/5 h-64 md:h-full relative shrink-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${bgImage}')` }}
                    />
                    <div className="absolute inset-0 bg-brand-plum/40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8">
                       <h3 className="font-display font-bold text-4xl text-white drop-shadow-lg leading-tight">
                         {activeService.title}
                       </h3>
                    </div>
                  </div>
                  
                  {/* Right: Detailed Content */}
                  <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col bg-card overflow-y-auto">
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-brand-rose hover:text-white transition-colors z-10"
                    >
                      <FaXmark size={20} />
                    </button>
                    
                    <div>
                      <h4 className="text-sm font-bold tracking-widest uppercase text-brand-rose mb-4">Overview</h4>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
                        {activeService.description}
                      </p>
                      
                      <h4 className="text-sm font-bold tracking-widest uppercase text-brand-rose mb-6">What We Offer</h4>
                      <div className="grid sm:grid-cols-2 gap-4 mb-10">
                        {activeService.offers.map((offer, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-brand-rose/20 text-brand-rose flex items-center justify-center shrink-0">
                              <FaCheck size={10} />
                            </div>
                            <span className="text-sm font-medium text-foreground">{offer}</span>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-sm font-bold tracking-widest uppercase text-brand-rose mb-6">Frequently Asked Questions</h4>
                      <div className="space-y-4 mb-10">
                        {activeService.faqs.map((faq, idx) => (
                          <div key={idx} className="border border-border rounded-xl overflow-hidden">
                            <button
                              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                              className="w-full px-6 py-4 flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors text-left"
                            >
                              <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                              <FaChevronDown className={`shrink-0 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                              {openFaqIndex === idx && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: "auto" }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden bg-background"
                                >
                                  <div className="p-6 text-sm text-muted-foreground">
                                    {faq.a}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full sm:w-auto rounded-full px-10 bg-brand-plum hover:bg-brand-plum/90 text-white font-bold h-14 text-lg shadow-xl shadow-brand-plum/20 hover:-translate-y-1 transition-transform">
                        Discuss Your Project
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
