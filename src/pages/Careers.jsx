import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { FaArrowRight, FaLaptopCode, FaRocket, FaHeart, FaGlobe, FaXmark, FaLocationDot, FaClock, FaCalendarDays } from 'react-icons/fa6'
import { CAREERS } from '../data/content'

// Mapping icons dynamically for the whyJoin section
const ICONS = [
  <FaLaptopCode className="w-6 h-6 text-brand-rose" />,
  <FaRocket className="w-6 h-6 text-brand-rose" />,
  <FaGlobe className="w-6 h-6 text-brand-rose" />,
  <FaHeart className="w-6 h-6 text-brand-rose" />,
  <FaRocket className="w-6 h-6 text-brand-rose" />
]

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      
      {/* Careers Hero */}
      <section className="relative py-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-rose/10 blur-[120px] rounded-full pointer-events-none transform-gpu" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-semibold text-brand-plum dark:text-brand-cream mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#ff0844] animate-pulse"></span>
            We are hiring
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl mb-6 text-foreground tracking-tight"
          >
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-[#ff0844]">Future</span> with Us
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {CAREERS.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground"
          >
            <span className="flex items-center gap-2"><FaLocationDot className="text-brand-rose"/> {CAREERS.location}</span>
            <span className="flex items-center gap-2"><FaCalendarDays className="text-brand-rose"/> {CAREERS.workingDays}</span>
            <span className="flex items-center gap-2"><FaClock className="text-brand-rose"/> {CAREERS.workingHours}</span>
          </motion.div>
        </div>
      </section>

      {/* Our Culture / Values */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-plum dark:text-brand-cream mb-4">Why Join Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We don't just build great products, we build a great environment for our people to thrive.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {CAREERS.whyJoin.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-rose/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {ICONS[i % ICONS.length]}
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{val.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{val.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-4xl mx-auto">
            <h3 className="font-bold text-xl mb-6">Perks & Benefits</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {CAREERS.benefits.map((benefit, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-brand-plum/10 text-brand-plum dark:bg-brand-cream/10 dark:text-brand-cream font-medium text-sm">
                  {benefit}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 relative" id="open-roles">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-display font-bold text-4xl text-brand-plum dark:text-brand-cream mb-4">Open Roles</h2>
              <p className="text-muted-foreground">Find your next big opportunity.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREERS.jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setSelectedJob(job)}
                className="group p-8 rounded-3xl border border-border bg-card hover:bg-muted/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-rose px-3 py-1 rounded-full bg-brand-rose/10">
                      {job.experience}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-brand-plum dark:group-hover:text-brand-cream transition-colors mb-2">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium mb-4">
                    <span className="flex items-center gap-1.5"><FaGlobe /> {CAREERS.location}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{job.type}</span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {job.description}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-brand-plum dark:bg-brand-cream flex items-center justify-center text-white dark:text-brand-plum">
                    <FaArrowRight />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl max-h-[95vh] bg-card rounded-[2rem] shadow-2xl border border-border overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-brand-rose hover:text-white transition-colors z-50 md:hidden"
              >
                <FaXmark size={20} />
              </button>

              {/* Left: Job Details */}
              <div className="w-full md:w-2/5 bg-brand-plum p-8 md:p-12 relative overflow-y-auto hidden md:block" data-lenis-prevent="true">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/20 rounded-full blur-[80px] transform-gpu" />
                
                <div className="relative z-10 text-brand-cream">
                  <span className="text-brand-rose font-bold text-xs uppercase tracking-wider mb-4 block bg-brand-rose/10 w-fit px-3 py-1 rounded-full border border-brand-rose/20">
                    {selectedJob.experience}
                  </span>
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
                    {selectedJob.title}
                  </h3>
                  
                  <div className="space-y-3 mb-10 text-sm font-medium text-white/80">
                    <div className="flex items-center gap-3">
                      <FaGlobe className="text-brand-rose"/> {CAREERS.location}
                    </div>
                    <div className="flex items-center gap-3">
                      <FaClock className="text-brand-rose"/> {selectedJob.type}
                    </div>
                  </div>

                  <h4 className="font-bold text-xl text-white mb-4">Role Description</h4>
                  <p className="text-brand-cream/80 leading-relaxed mb-8">
                    {selectedJob.description}
                  </p>

                  <h4 className="font-bold text-xl text-white mb-4">Key Skills Required</h4>
                  <ul className="space-y-2">
                    {selectedJob.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-brand-cream/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-rose shrink-0 mt-2" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Application Form */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-card relative" data-lenis-prevent="true">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted hidden md:flex items-center justify-center hover:bg-brand-rose hover:text-white transition-colors z-10"
                >
                  <FaXmark size={20} />
                </button>

                <div className="mb-8 md:hidden">
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">Apply for {selectedJob.title}</h3>
                </div>
                <div className="hidden md:block mb-8">
                  <h3 className="font-display font-bold text-3xl text-foreground mb-2">Submit Your Application</h3>
                  <p className="text-muted-foreground">Please fill out the form below to apply.</p>
                </div>

                <form className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="app-name">Full Name *</Label>
                      <Input id="app-name" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="app-email">Email Address *</Label>
                      <Input id="app-email" type="email" required className="bg-background" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="app-phone">Phone Number *</Label>
                      <Input id="app-phone" type="tel" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="app-qual">Highest Qualification *</Label>
                      <select id="app-qual" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="" disabled selected>Select Qualification</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post-Graduate">Post-Graduate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="app-exp">Total Experience *</Label>
                      <select id="app-exp" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="" disabled selected>Select Experience</option>
                        <option value="Fresher (0 Years)">Fresher (0 Years)</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="app-portfolio">Portfolio / LinkedIn URL</Label>
                      <Input id="app-portfolio" type="url" placeholder="https://" className="bg-background" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="app-resume">Resume / CV (PDF) *</Label>
                      <Input id="app-resume" type="file" accept=".pdf,.doc,.docx" required className="bg-background cursor-pointer" />
                    </div>
                  </div>

                  <div className="space-y-2 hidden">
                    <Label htmlFor="app-position">Position</Label>
                    <Input id="app-position" value={selectedJob.title} readOnly className="bg-muted text-muted-foreground" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="app-cover">Cover Letter / Why should we hire you?</Label>
                    <Textarea 
                      id="app-cover" 
                      className="min-h-[120px] bg-background"
                      placeholder="Briefly tell us about your background and why you're a good fit..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-brand-plum hover:bg-brand-plum/90 dark:bg-brand-cream dark:text-brand-plum dark:hover:bg-brand-cream/90 text-white font-bold h-14 text-base rounded-full">
                    Submit Application
                  </Button>
                  
                </form>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
