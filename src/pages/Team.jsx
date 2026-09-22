import React from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaEnvelope, FaArrowRight } from 'react-icons/fa6'
import { Button } from '../components/ui/button'

const TEAM_MEMBERS = [
  {
    name: 'Sarah Jenkins',
    role: 'Founder & CEO',
    bio: 'Former VP of Marketing at top tech firms. Sarah leads DigiBrandz with a vision to merge tech and marketing seamlessly.',
    initials: 'SJ',
    color: 'from-brand-rose to-[#ff0844]',
  },
  {
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    bio: 'Full-stack engineering veteran. Architect of scalable systems and passionate about clean, maintainable code.',
    initials: 'MC',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Digital Strategy',
    bio: 'Data-driven marketing expert specializing in high-ROI performance campaigns and conversion rate optimization.',
    initials: 'PS',
    color: 'from-brand-plum to-purple-500',
  },
  {
    name: 'David Okafor',
    role: 'Lead UI/UX Designer',
    bio: 'Award-winning designer obsessed with creating frictionless, beautiful digital experiences that users love.',
    initials: 'DO',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Elena Rostova',
    role: 'SEO & Content Director',
    bio: 'Master of organic growth. Elena has scaled organic traffic by 10x for enterprise clients across multiple industries.',
    initials: 'ER',
    color: 'from-orange-400 to-brand-rose',
  },
  {
    name: 'James Wilson',
    role: 'Senior App Developer',
    bio: 'Mobile ecosystem expert. Building high-performance native and cross-platform applications.',
    initials: 'JW',
    color: 'from-indigo-400 to-brand-plum',
  }
]

export default function Team() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      
      {/* Team Hero */}
      <section className="relative py-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-brand-rose/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-semibold text-brand-plum dark:text-brand-cream mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-rose animate-pulse"></span>
            Meet the Experts
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl mb-6 text-foreground tracking-tight"
          >
            The Minds Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-[#ff0844]">DigiBrandz</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            We are a collective of engineers, designers, and growth marketers united by a single goal: scaling your business through exceptional digital experiences.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-background border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-brand-rose/10 hover:border-brand-rose/30 transition-all duration-500"
              >
                {/* Avatar Placeholder Area */}
                <div className={`h-48 w-full bg-gradient-to-br ${member.color} relative overflow-hidden flex items-center justify-center`}>
                  {/* Subtle glass overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Initials fallback in case of no image */}
                  <span className="text-6xl font-display font-bold text-white/90 drop-shadow-md transform group-hover:scale-110 transition-transform duration-500">
                    {member.initials}
                  </span>
                </div>
                
                <div className="p-8">
                  <h3 className="font-display font-bold text-2xl mb-1 text-foreground">{member.name}</h3>
                  <p className="text-brand-rose font-semibold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-brand-rose hover:text-white transition-colors">
                      <FaLinkedin size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-brand-rose hover:text-white transition-colors">
                      <FaTwitter size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-brand-rose hover:text-white transition-colors">
                      <FaEnvelope size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center bg-brand-plum dark:bg-card border border-border rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
            {/* Glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-rose/20 blur-[100px] rounded-full pointer-events-none" />
            
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 relative z-10">
              Want to join our amazing team?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              We're always looking for brilliant minds to help us build the future of digital experiences. Explore our open roles.
            </p>
            <Button size="lg" className="bg-brand-rose hover:bg-white hover:text-brand-plum text-white rounded-full px-10 py-6 text-lg font-bold shadow-xl transition-all hover:-translate-y-1 relative z-10" onClick={() => window.location.href = '/careers'}>
              View Open Positions
              <FaArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
