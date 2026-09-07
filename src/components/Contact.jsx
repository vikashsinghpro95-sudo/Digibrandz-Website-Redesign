import React from 'react'
import { motion } from 'framer-motion'
import { FaLocationDot, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa6'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            Let's Talk About <span className="text-brand-rose">Your Project</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground">
            Fill out the form below or reach out to us directly. We usually respond within 24 hours.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5 bg-card border border-border p-8 md:p-10 rounded-3xl shadow-sm"
          >
            <form className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="John Doe" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Acme Inc." className="bg-background" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-background" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="service">Service Required *</Label>
                  <select 
                    id="service" 
                    required 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled selected>Select a service</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="SEO">SEO</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <select 
                    id="budget" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled selected>Select a range</option>
                    <option value="< $5k">Under $5k</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k - $25k">$10k - $25k</option>
                    <option value="$25k+">$25k+</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Project Details *</Label>
                <Textarea 
                  id="details" 
                  placeholder="Tell us about your project goals, timelines, and any specific requirements..." 
                  className="min-h-[120px] bg-background"
                  required 
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-brand-plum hover:bg-brand-plum/90 dark:bg-brand-cream dark:text-brand-plum dark:hover:bg-brand-cream/90 text-white font-bold h-14 text-base rounded-full">
                Send Enquiry
              </Button>
              
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5 flex flex-col gap-8"
          >
            <div className="bg-brand-plum dark:bg-brand-darkPlum text-white rounded-3xl p-8 relative overflow-hidden flex-grow shadow-md">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-rose/20 rounded-full blur-[60px]" />
              
              <h3 className="font-display font-bold text-2xl mb-8 text-brand-cream relative z-10">Contact Information</h3>
              
              <div className="space-y-6 relative z-10 text-brand-cream/90">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">
                    <FaLocationDot size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Our Office</h4>
                    <p className="leading-relaxed">Level 4, Tech Park Building<br/>Kalyani Nagar, Pune<br/>Maharashtra 411014, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email Us</h4>
                    <p><a href="mailto:hello@digibrandz.com" className="hover:text-brand-rose transition-colors">hello@digibrandz.com</a></p>
                    <p><a href="mailto:support@digibrandz.com" className="hover:text-brand-rose transition-colors">support@digibrandz.com</a></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Call Us</h4>
                    <p><a href="tel:+910000000000" className="hover:text-brand-rose transition-colors">+91 0000 000 000</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Working Hours</h4>
                    <p>Mon - Fri: 10:00 AM - 7:00 PM (IST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Visual Placeholder */}
            <div className="w-full h-48 bg-muted rounded-3xl overflow-hidden border border-border relative flex items-center justify-center">
              <div className="absolute inset-0 bg-brand-plum/5 dark:bg-brand-cream/5 pattern-grid-lg opacity-50" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <FaLocationDot className="text-brand-rose" size={32} />
                <span className="font-display font-semibold text-foreground tracking-wide">PUNE, INDIA</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
