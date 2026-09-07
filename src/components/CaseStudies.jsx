import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowTrendUp, FaUsers, FaBullseye, FaChartLine } from 'react-icons/fa6'
import { Button } from './ui/button'

export default function CaseStudies() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
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

        {/* Featured Case Study (Worked Example) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2">
            
            <div className="p-8 md:p-12 lg:pr-8 flex flex-col justify-center">
              <span className="text-brand-rose font-bold text-sm uppercase tracking-wider mb-4 block">
                B2B SaaS Provider (Illustrative Example)
              </span>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-8 leading-tight">
                Scaling lead generation and reducing CPA for a growing SaaS company.
              </h3>
              
              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="font-bold text-foreground mb-2">The Challenge</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    The client was struggling to scale their paid acquisition channels. Cost per acquisition (CPA) was rising, and lead quality was dropping, making it difficult to achieve their quarterly growth targets.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">Our Solution</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    We completely rebuilt their tracking infrastructure, optimized their landing page UX for higher conversions, and implemented a hyper-targeted Performance Marketing strategy across Google and Meta using AI-driven bidding.
                  </p>
                </div>
              </div>

              <div>
                <Button className="bg-brand-plum hover:bg-brand-plum/90 dark:bg-brand-cream dark:text-brand-plum dark:hover:bg-brand-cream/90 text-white rounded-full px-8">
                  View Full Case Study
                </Button>
              </div>
            </div>

            <div className="bg-brand-plum dark:bg-brand-darkPlum p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blush/20 rounded-full blur-[60px]" />

              <h4 className="font-display font-bold text-2xl mb-8 relative z-10 text-brand-cream">The Results</h4>
              
              <div className="grid grid-cols-2 gap-8 relative z-10">
                
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-rose mb-4">
                    <FaArrowTrendUp size={24} />
                  </div>
                  <div className="font-display font-bold text-4xl text-brand-cream">+180%</div>
                  <div className="text-sm text-brand-cream/80 font-medium">Website Traffic</div>
                </div>
                
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-rose mb-4">
                    <FaUsers size={24} />
                  </div>
                  <div className="font-display font-bold text-4xl text-brand-cream">+120%</div>
                  <div className="text-sm text-brand-cream/80 font-medium">Qualified Leads</div>
                </div>

                <div className="space-y-2">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-rose mb-4">
                    <FaChartLine size={24} />
                  </div>
                  <div className="font-display font-bold text-4xl text-brand-cream">35%</div>
                  <div className="text-sm text-brand-cream/80 font-medium">Lower Cost Per Lead</div>
                </div>

                <div className="space-y-2">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-rose mb-4">
                    <FaBullseye size={24} />
                  </div>
                  <div className="font-display font-bold text-4xl text-brand-cream">+60%</div>
                  <div className="text-sm text-brand-cream/80 font-medium">Conversion Rate</div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
