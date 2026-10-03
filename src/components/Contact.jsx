import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLocationDot, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa6'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useSettings } from '../contexts/SettingsContext'
import { turso } from '../lib/turso'

export default function Contact() {
  const settings = useSettings() || {}
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg('');

    const formData = new FormData(e.target);
    const selectedServices = Array.from(e.target.elements)
      .filter(el => el.type === 'checkbox' && el.checked)
      .map(el => el.value);

    const payload = {
      type: 'contact',
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('mobile'),
      message: formData.get('details'),
      company: formData.get('company'),
      website: formData.get('website'),
      businessType: formData.get('businessType'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      services: selectedServices,
      contactMethod: formData.get('contactMethod')
    };

    try {
      await turso.execute({
        sql: `INSERT INTO client_requests (name, email, phone, company, service, message) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          payload.name,
          payload.email,
          payload.phone,
          payload.company || payload.businessType,
          payload.services.join(', ') || 'General Enquiry',
          payload.message
        ]
      });
      setSuccess(true);
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'SubmitApplication');
      }
      e.target.reset();
    } catch (err) {
      console.error(err);
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            {success ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center text-2xl">✓</div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. We will get back to you shortly.</p>
                <Button onClick={() => setSuccess(false)} variant="outline" className="mt-4">Send Another Message</Button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800 text-sm font-medium">
                  {errorMsg}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" placeholder="John Doe" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-background" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input id="mobile" name="mobile" type="tel" placeholder="+91 0000000000" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" name="company" placeholder="Acme Inc." className="bg-background" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input id="website" name="website" type="url" placeholder="https://example.com" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <select id="businessType" name="businessType" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="" disabled selected>Select Business Type</option>
                    {["Startup", "Small Business (SME)", "Enterprise / Corporate", "E-commerce Business", "Healthcare", "Real Estate", "Education & Institute", "Restaurant & Café", "Hotel & Tourism", "Construction", "Manufacturing / Industrial", "Retail Store", "Fashion & Apparel", "Beauty & Salon", "Fitness & Gym", "Finance & Insurance", "Automobile", "Agriculture", "IT & Software", "NGO", "Government", "Other"].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget *</Label>
                  <select id="budget" name="budget" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="" disabled selected>Select a range</option>
                    <option value="Under ₹20,000">Under ₹20,000</option>
                    <option value="₹20,000 - ₹25,000">₹20,000 - ₹25,000</option>
                    <option value="₹25,000 - ₹40,000">₹25,000 - ₹40,000</option>
                    <option value="₹40,000 - ₹60,000">₹40,000 - ₹60,000</option>
                    <option value="₹60,000 - ₹1,00,000">₹60,000 - ₹1,00,000</option>
                    <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                    <option value="Let's Discuss">Let's Discuss</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Project Timeline *</Label>
                  <select id="timeline" name="timeline" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="" disabled selected>Select timeline</option>
                    <option value="Immediately">Immediately</option>
                    <option value="Within 15 Days">Within 15 Days</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="Within 3 Months">Within 3 Months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Services Interested In (Select Multiple) *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-border rounded-xl bg-background max-h-60 overflow-y-auto" data-lenis-prevent="true">
                  {[
                    "Website & App Development", "Social Media Management", "Meta Ads", "Google Ads / PPC",
                    "Website SEO", "Google My Business / Local SEO", "Real Estate Lead Generation",
                    "E-Commerce / Quick Commerce", "Performance Marketing", "AI Video Creation",
                    "Influencer Marketing", "Video Editing & Creative Designing", "WhatsApp & SMS Marketing",
                    "Videography & Photography", "Other"
                  ].map((service) => (
                    <label key={service} className="flex items-center gap-3 text-sm cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-border text-brand-rose focus:ring-brand-rose/20 cursor-pointer accent-brand-rose" value={service} />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Preferred Contact Method *</Label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="contactMethod" value="Email" required className="accent-brand-rose" /> Email
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="contactMethod" value="Phone" required className="accent-brand-rose" /> Phone Call
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="contactMethod" value="WhatsApp" required className="accent-brand-rose" /> WhatsApp
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="contactMethod" value="Google Meet" required className="accent-brand-rose" /> Google Meet
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Project Details *</Label>
                <Textarea 
                  id="details" 
                  name="details"
                  placeholder="Tell us about your project goals, any specific requirements, or challenges you're facing..." 
                  className="min-h-[120px] bg-background"
                  required 
                />
              </div>

              <Button disabled={loading} type="submit" size="lg" className="w-full bg-brand-plum hover:bg-brand-plum/90 dark:bg-brand-cream dark:text-brand-plum dark:hover:bg-brand-cream/90 text-white font-bold h-14 text-base rounded-full">
                {loading ? "Sending..." : "Submit Enquiry"}
              </Button>
              
            </form>
            )}
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5 flex flex-col gap-8"
          >
            <div className="bg-brand-plum dark:bg-brand-darkPlum text-white rounded-3xl p-8 relative overflow-hidden flex-grow shadow-md">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-rose/20 rounded-full blur-[60px] transform-gpu" />
              
              <h3 className="font-display font-bold text-2xl mb-8 text-brand-cream relative z-10">Contact Information</h3>
              
              <div className="space-y-6 relative z-10 text-brand-cream/90">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">
                    <FaLocationDot size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Our Office</h4>
                    <p className="leading-relaxed whitespace-pre-line">{settings.contactAddress || "Office no.23, 3rd Floor, Aston Plaza, Narhe Ambegaon Rd, above Star Bazaar, Ambegaon Budruk, Pune, Maharashtra 411046"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email Us</h4>
                    <p><a href={`mailto:${settings.contactEmail || "Digibrandzitsolutions@gmail.com"}`} className="hover:text-brand-rose transition-colors break-all">{settings.contactEmail || "Digibrandzitsolutions@gmail.com"}</a></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Call Us</h4>
                    <p><a href={`tel:${settings.contactPhone || "+918483082699"}`} className="hover:text-brand-rose transition-colors">{settings.contactPhone || "+91 8483082699"}</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand-rose">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Working Hours</h4>
                    <p>Monday - Saturday: 10:00 AM - 6:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-64 md:h-80 bg-muted rounded-3xl overflow-hidden border border-border relative">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.google.com/maps?q=Ambegaon+Budruk%2C+Pune%2C+Maharashtra+411046&z=14&t=m&hl=en&output=embed" 
                style={{ border: 0, display: "block", width: "100%", height: "100%" }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                title="Google Map of DigiBrandz IT Solutions, Pune"
              ></iframe>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
