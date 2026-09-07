import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { Button } from './ui/button'

const PORTFOLIO_ITEMS = [
  {
    title: "E-Commerce Platform",
    industry: "Retail",
    services: "UI/UX • Web Development • Digital Marketing",
    tech: ["React", "Node.js", "MySQL"],
    description: "A scalable e-commerce platform designed to improve customer experience and increase online sales. Features real-time inventory sync and personalized AI recommendations.",
    isReal: true,
  },
  {
    title: "[Project Name Placeholder]",
    industry: "[Industry]",
    services: "[Services Provided]",
    tech: ["Tech 1", "Tech 2"],
    description: "Brief description of the project goes here. This card serves as a placeholder for a future portfolio piece.",
    isReal: false,
  },
  {
    title: "[Project Name Placeholder]",
    industry: "[Industry]",
    services: "[Services Provided]",
    tech: ["Tech 1", "Tech 2"],
    description: "Brief description of the project goes here. This card serves as a placeholder for a future portfolio piece.",
    isReal: false,
  },
  {
    title: "[Project Name Placeholder]",
    industry: "[Industry]",
    services: "[Services Provided]",
    tech: ["Tech 1", "Tech 2"],
    description: "Brief description of the project goes here. This card serves as a placeholder for a future portfolio piece.",
    isReal: false,
  }
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-muted/30 border-y border-border relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-2"
          >
            Our Work <span className="text-brand-rose">Speaks for Us</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button size="lg" variant="outline" className="rounded-full">
              View Our Portfolio
            </Button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col bg-background border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-rose/50 transition-all"
            >
              
              {/* Image Placeholder */}
              <div className="w-full h-64 bg-muted flex items-center justify-center relative overflow-hidden">
                {!item.isReal ? (
                  <span className="text-muted-foreground/50 font-medium tracking-widest uppercase">Placeholder Image</span>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-plum to-brand-rose opacity-80" />
                )}
                
                {/* Overlay link button */}
                <div className="absolute inset-0 bg-brand-plum/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="w-16 h-16 rounded-full bg-white text-brand-plum flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                    <FaArrowUpRightFromSquare size={24} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-brand-rose text-sm font-bold uppercase tracking-wider mb-1 block">
                      {item.industry}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-foreground">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="text-sm font-medium text-brand-plum/70 dark:text-brand-cream/70 mb-4">
                  {item.services}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-muted rounded-full text-xs font-semibold text-foreground border border-border/50">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
