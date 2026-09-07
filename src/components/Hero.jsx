import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { Button } from './ui/button'
import { FaArrowRight, FaCode, FaChartLine, FaRocket } from 'react-icons/fa6'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-16">
      
      {/* Dynamic Background Mesh & Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05]" />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, -20, 0],
            y: [0, -50, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -left-[10%] w-[500px] h-[500px] rounded-full bg-brand-rose/20 dark:bg-brand-rose/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen will-change-transform transform-gpu"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -60, 40, 0],
            y: [0, 60, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -right-[10%] w-[600px] h-[600px] rounded-full bg-brand-blush/30 dark:bg-brand-blush/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen will-change-transform transform-gpu"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-brand-plum/10 dark:bg-brand-cream/5 blur-[100px] will-change-transform transform-gpu"
        />
      </div>



      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-sm text-sm font-semibold text-brand-plum dark:text-brand-cream">
            <span className="flex h-2 w-2 rounded-full bg-brand-rose animate-pulse"></span>
            Your Growth & Technology Partner
          </div>
        </motion.div>

        {/* Massive Brand Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display font-bold text-7xl md:text-[100px] lg:text-[130px] leading-none tracking-tight mb-8 select-none"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-plum via-[#8a2b69] to-brand-rose dark:from-white dark:via-brand-cream dark:to-brand-blush">
            DigiBrandz
          </span>
        </motion.h1>

        {/* Headline with Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-4xl lg:text-5xl font-display font-medium text-foreground mb-8 max-w-4xl min-h-[100px] md:min-h-[60px] leading-tight"
        >
          We Build Digital Experiences That Grow{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-brand-plum dark:from-brand-blush dark:to-brand-cream font-bold inline-block relative mt-2 md:mt-0 px-2">
            <span className="absolute inset-0 bg-brand-rose/10 dark:bg-brand-blush/10 rounded-lg -rotate-1 scale-105 pointer-events-none" />
            <Typewriter
              words={['Websites.', 'Software.', 'Marketing.', 'Automation.']}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-12 leading-relaxed"
        >
          From high-performance websites and custom software to result-driven digital marketing campaigns, we help businesses <strong className="font-semibold text-foreground">build, launch, and scale</strong> their digital presence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
        >
          <Link to="contact" smooth duration={500} offset={-80} className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-brand-plum hover:bg-brand-plum/90 dark:bg-brand-cream dark:text-brand-plum dark:hover:bg-brand-cream/90 text-white rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-brand-plum/20 transition-all hover:-translate-y-1 group">
              Start Your Project
              <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="services" smooth duration={500} offset={-80} className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border text-foreground hover:bg-muted/50 rounded-full px-8 h-14 text-base font-bold transition-all hover:-translate-y-1">
              Explore Our Services
            </Button>
          </Link>
        </motion.div>

        {/* Trust Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl"
        >
          {["Software Development", "Web Development", "Digital Marketing", "UI/UX", "Automation", "AI Solutions"].map((service, idx) => (
            <span 
              key={idx} 
              className="px-4 py-2 rounded-full bg-muted/40 backdrop-blur-sm border border-border text-sm font-medium text-foreground/80 hover:bg-brand-rose/10 hover:text-brand-rose hover:border-brand-rose/30 transition-colors cursor-default"
            >
              {service}
            </span>
          ))}
        </motion.div>

      </div>
      
      {/* Bottom fade gradient for smooth transition */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
