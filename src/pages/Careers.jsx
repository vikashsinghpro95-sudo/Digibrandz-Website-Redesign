import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { FaArrowRight, FaLaptopCode, FaRocket, FaHeart, FaGlobe, FaXmark, FaLocationDot, FaClock, FaCalendarDays } from 'react-icons/fa6'
import { useContent } from '../contexts/ContentContext'
import { API_BASE } from '../lib/api'

// Mapping icons dynamically for the whyJoin section
const ICONS = [
  <FaLaptopCode className="w-6 h-6 text-black " />,
  <FaRocket className="w-6 h-6 text-black " />,
  <FaGlobe className="w-6 h-6 text-black " />,
  <FaHeart className="w-6 h-6 text-black " />,
  <FaRocket className="w-6 h-6 text-black " />
]

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { careers } = useContent()
  const [jobs, setJobs] = useState(careers.jobs || []);

  React.useEffect(() => {
    if (Array.isArray(careers.jobs) && careers.jobs.length > 0) {
      setJobs(careers.jobs);
    }
  }, [careers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg('');

    const form = e.target;
    const formData = new FormData(form);
    const type = 'careers';
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const message = formData.get('message') || '';

    const extraDataObj = {
      position: selectedJob?.title || '',
      qualification: formData.get('qualification') || '',
      experience: formData.get('experience') || '',
      portfolio: formData.get('portfolio') || ''
    };

    try {
      const file = formData.get('resume');
      if (file && file.size > 0) {
        if (file.size > 3 * 1024 * 1024) {
           setErrorMsg('Resume file size must be less than 3MB.');
           setLoading(false);
           return;
        }
        
        const base64Str = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
        
        extraDataObj.resume_base64 = base64Str;
        extraDataObj.resume_name = file.name;
      }

      const { turso } = await import('../lib/turso');
      await turso.execute({
        sql: `INSERT INTO form_submissions (type, name, email, phone, message, extra_data, status) 
              VALUES (?, ?, ?, ?, ?, ?, 'new')`,
        args: [
          type, 
          name, 
          email, 
          phone, 
          message, 
          JSON.stringify(extraDataObj)
        ]
      });

      setSuccess(true);
      form.reset();
      setTimeout(() => {
        setSelectedJob(null);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      
      {/* Careers Hero */}
      <section className="relative py-20 overflow-hidden bg-black">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#C5FA01]/10 blur-[120px] rounded-full pointer-events-none transform-gpu" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-semibold text-[#C5FA01]  mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#C5FA01] animate-pulse"></span>
            We are hiring
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-7xl mb-6 text-[#C5FA01] tracking-tight"
          >
            Build the <span className="text-transparent bg-clip-text bg-[#C5FA01]">Future</span> with Us
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#C5FA01]/80 max-w-3xl mx-auto leading-relaxed"
          >
            {careers.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium text-[#C5FA01]/80"
          >
            <span className="flex items-center gap-2"><FaLocationDot className="text-[#C5FA01] "/> {careers.location}</span>
            <span className="flex items-center gap-2"><FaCalendarDays className="text-[#C5FA01] "/> {careers.workingDays}</span>
            <span className="flex items-center gap-2"><FaClock className="text-[#C5FA01] "/> {careers.workingHours}</span>
          </motion.div>
        </div>
      </section>

      {/* Our Culture / Values */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-black  mb-4">Why Join Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We don't just build great products, we build a great environment for our people to thrive.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {(careers.whyJoin || []).map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C5FA01]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
              {(careers.benefits || []).map((benefit, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-[#C5FA01]/10 text-black   font-medium text-sm">
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
              <h2 className="font-display font-bold text-4xl text-black  mb-4">Open Roles</h2>
              <p className="text-muted-foreground">Find your next big opportunity.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
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
                    <span className="text-xs font-bold uppercase tracking-wider text-black  px-3 py-1 rounded-full bg-[#C5FA01]/10">
                      {job.experience}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-black :text-black transition-colors mb-2">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium mb-4">
                    <span className="flex items-center gap-1.5"><FaGlobe /> {job.location || careers.location}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{job.type}</span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {job.description}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#C5FA01]  flex items-center justify-center text-black ">
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
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-[#C5FA01] hover:text-black transition-colors z-50 md:hidden"
              >
                <FaXmark size={20} />
              </button>

              {/* Left: Job Details */}
              <div className="w-full md:w-2/5 bg-[#C5FA01] p-8 md:p-12 relative overflow-y-auto hidden md:block" data-lenis-prevent="true">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5FA01]/20 rounded-full blur-[80px] transform-gpu" />
                
                <div className="relative z-10 text-black">
                  <span className="text-black  font-bold text-xs uppercase tracking-wider mb-4 block bg-[#C5FA01]/10 w-fit px-3 py-1 rounded-full border border-black/20">
                    {selectedJob.experience}
                  </span>
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-black mb-6 leading-tight">
                    {selectedJob.title}
                  </h3>
                  
                  <div className="space-y-3 mb-10 text-sm font-medium text-black">
                    <div className="flex items-center gap-3">
                      <FaGlobe className="text-black "/> {selectedJob.location || careers.location}
                    </div>
                    <div className="flex items-center gap-3">
                      <FaClock className="text-black "/> {selectedJob.type}
                    </div>
                  </div>

                  <h4 className="font-bold text-xl text-black mb-4">Role Description</h4>
                  <p className="text-black/80 leading-relaxed mb-8">
                    {selectedJob.description}
                  </p>

                  <h4 className="font-bold text-xl text-black mb-4">Key Skills Required</h4>
                  <ul className="space-y-2">
                    {(selectedJob.requirements || selectedJob.skills || []).map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-black/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5FA01] shrink-0 mt-2" />
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
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted hidden md:flex items-center justify-center hover:bg-[#C5FA01] hover:text-black transition-colors z-10"
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

                {success ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100  text-green-600 rounded-full flex items-center justify-center text-2xl">✓</div>
                    <h3 className="text-2xl font-bold">Application Sent!</h3>
                    <p className="text-muted-foreground">We will review your application and get back to you.</p>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="bg-red-100  text-red-600  p-4 rounded-xl border border-red-200  text-sm font-medium">
                      {errorMsg}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="app-name">Full Name *</Label>
                      <Input id="app-name" name="name" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="app-email">Email Address *</Label>
                      <Input id="app-email" name="email" type="email" required className="bg-background" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="app-phone">Phone Number *</Label>
                      <Input id="app-phone" name="phone" type="tel" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="app-qual">Highest Qualification *</Label>
                      <select id="app-qual" name="qualification" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="" disabled selected>Select Qualification</option>
                        <option value="SSC">SSC</option>
                        <option value="HSC">HSC</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="MBA">MBA</option>
                        <option value="MCA">MCA</option>
                        <option value="BCA">BCA</option>
                        <option value="B.Tech / BE">B.Tech / BE</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="app-exp">Total Experience *</Label>
                      <select id="app-exp" name="experience" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="" disabled selected>Select Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0–1 Year">0–1 Year</option>
                        <option value="1–2 Years">1–2 Years</option>
                        <option value="2–4 Years">2–4 Years</option>
                        <option value="4–6 Years">4–6 Years</option>
                        <option value="6+ Years">6+ Years</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="app-portfolio">Portfolio / LinkedIn URL</Label>
                      <Input id="app-portfolio" name="portfolio" type="url" placeholder="https://" className="bg-background" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="app-resume">Resume / CV (PDF) *</Label>
                      <Input id="app-resume" name="resume" type="file" accept=".pdf,.doc,.docx" required className="bg-background cursor-pointer" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="app-cover">Cover Letter / Why should we hire you?</Label>
                    <Textarea 
                      id="app-cover" 
                      name="message"
                      className="min-h-[120px] bg-background"
                      placeholder="Briefly tell us about your background and why you're a good fit..."
                    />
                  </div>

                  <Button disabled={loading} type="submit" size="lg" className="w-full bg-[#C5FA01] hover:bg-[#C5FA01]/90   :bg-[#C5FA01]/90 text-black font-bold h-14 text-base rounded-full">
                    {loading ? "Submitting..." : "Submit Application"}
                  </Button>
                  
                </form>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
