import React from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaDesktop, FaMobileScreen, FaBullhorn, FaMagnifyingGlass, FaShareNodes, FaPenNib, FaRobot, FaArrowRight } from 'react-icons/fa6'
import { Button } from './ui/button'

const SERVICES = [
  {
    title: "Software Development",
    desc: "Custom solutions for complex business operations. We engineer scalable, secure, and high-performance software tailored to your specific needs.",
    icon: <FaCode className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" />,
    size: "large",
    bg: "bg-gradient-to-br from-brand-plum to-[#4a1538]",
    textColor: "text-white",
    descColor: "text-white/80"
  },
  {
    title: "Web Development",
    desc: "Fast, scalable, secure websites.",
    icon: <FaDesktop className="w-6 h-6 text-brand-plum dark:text-brand-cream group-hover:scale-110 transition-transform duration-500" />,
    size: "small",
    bg: "bg-card hover:bg-brand-rose/5",
    textColor: "text-foreground",
    descColor: "text-muted-foreground"
  },
  {
    title: "Mobile App Dev",
    desc: "Native iOS & Android apps.",
    icon: <FaMobileScreen className="w-6 h-6 text-brand-plum dark:text-brand-cream group-hover:scale-110 transition-transform duration-500" />,
    size: "small",
    bg: "bg-card hover:bg-brand-rose/5",
    textColor: "text-foreground",
    descColor: "text-muted-foreground"
  },
  {
    title: "SEO Optimization",
    desc: "Rank higher on Google organically.",
    icon: <FaMagnifyingGlass className="w-6 h-6 text-brand-plum dark:text-brand-cream group-hover:scale-110 transition-transform duration-500" />,
    size: "small",
    bg: "bg-card hover:bg-brand-rose/5",
    textColor: "text-foreground",
    descColor: "text-muted-foreground"
  },
  {
    title: "Social Media",
    desc: "Engage and convert your audience.",
    icon: <FaShareNodes className="w-6 h-6 text-brand-plum dark:text-brand-cream group-hover:scale-110 transition-transform duration-500" />,
    size: "small",
    bg: "bg-card hover:bg-brand-rose/5",
    textColor: "text-foreground",
    descColor: "text-muted-foreground"
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven campaigns that convert. From Meta ads to Google PPC, we maximize your ROI and lower your customer acquisition costs.",
    icon: <FaBullhorn className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" />,
    size: "large",
    bg: "bg-gradient-to-br from-brand-rose to-[#a53b5e]",
    textColor: "text-white",
    descColor: "text-white/80"
  },
  {
    title: "UI/UX Design",
    desc: "Beautiful, intuitive interfaces that users love.",
    icon: <FaPenNib className="w-7 h-7 text-brand-rose group-hover:scale-110 transition-transform duration-500" />,
    size: "medium",
    bg: "bg-brand-cream/30 dark:bg-card hover:bg-brand-cream/50",
    textColor: "text-brand-plum dark:text-brand-cream",
    descColor: "text-brand-plum/70 dark:text-muted-foreground"
  },
  {
    title: "AI & Automation",
    desc: "Work smarter. Automate workflows and integrate AI models.",
    icon: <FaRobot className="w-7 h-7 text-brand-rose group-hover:scale-110 transition-transform duration-500" />,
    size: "medium",
    bg: "bg-brand-cream/30 dark:bg-card hover:bg-brand-cream/50",
    textColor: "text-brand-plum dark:text-brand-cream",
    descColor: "text-brand-plum/70 dark:text-muted-foreground"
  },
]

export default function ServicesOverview() {
  return (
    <section id="services" className="py-32 bg-background border-t border-border relative overflow-hidden">
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blush/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-plum/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-brand-plum dark:text-brand-cream mb-6 tracking-tight leading-tight"
            >
              Everything You Need to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-brand-plum dark:from-brand-blush dark:to-brand-cream">Build, Market & Scale</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 font-bold border-brand-plum/20 hover:bg-brand-plum/5 dark:border-brand-cream/20 dark:hover:bg-brand-cream/10 transition-all hover:scale-105 active:scale-95">
              View All Services
            </Button>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px]">
          {SERVICES.map((service, i) => {
            let colSpan = "col-span-1 md:col-span-1"
            let rowSpan = "row-span-1"
            
            if (service.size === "large") {
              colSpan = "col-span-1 md:col-span-2"
              rowSpan = "row-span-1 md:row-span-2"
            } else if (service.size === "medium") {
              colSpan = "col-span-1 md:col-span-2"
              rowSpan = "row-span-1"
            }

            return (
               <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${colSpan} ${rowSpan} ${service.bg} group rounded-[2rem] border border-border/50 p-8 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden relative`}
              >
                {/* Background flare on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                
                {/* Top Section: Icon & Arrow */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className={`w-16 h-16 rounded-2xl ${service.size === 'large' ? 'bg-white/10 backdrop-blur-md' : 'bg-muted/50'} flex items-center justify-center shadow-inner`}>
                    {service.icon}
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${service.textColor}`}>
                    <FaArrowRight />
                  </div>
                </div>
                
                {/* Bottom Section: Text */}
                <div className="relative z-10 mt-auto pt-6">
                  <h3 className={`font-display font-bold text-2xl md:text-3xl mb-3 ${service.textColor}`}>
                    {service.title}
                  </h3>
                  <p className={`text-base leading-relaxed ${service.descColor} ${service.size !== 'large' && 'line-clamp-2'}`}>
                    {service.desc}
                  </p>
                </div>

                {/* Abstract shape for large cards */}
                {service.size === 'large' && (
                  <div className="absolute -bottom-24 -right-24 text-white/5 group-hover:text-white/10 transition-colors duration-700 pointer-events-none">
                    {React.cloneElement(service.icon, { className: "w-96 h-96" })}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
