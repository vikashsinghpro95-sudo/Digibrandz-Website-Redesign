import React from 'react'
import { motion } from 'framer-motion'
import { FaRobot, FaMessage, FaPhone, FaGear, FaPenNib, FaBrain, FaDiagramProject, FaGauge, FaFileInvoice, FaWandMagicSparkles, FaCubes } from 'react-icons/fa6'
import { Button } from './ui/button'
import AnimatedHeading from './ui/AnimatedHeading'

import { Link } from 'react-router-dom'

const AI_SERVICES = [
  { name: "AI Chatbots", icon: <FaMessage />, slug: "ai-chatbots" },
  { name: "AI Customer Support", icon: <FaPhone />, slug: "ai-customer-support" },
  { name: "WhatsApp Automation", icon: <FaMessage />, slug: "whatsapp-automation" },
  { name: "Business Process Automation", icon: <FaGear />, slug: "business-process-automation" },
  { name: "AI Content Generation", icon: <FaPenNib />, slug: "ai-content-generation" },
  { name: "AI Agents", icon: <FaRobot />, slug: "ai-agents" },
  { name: "Workflow Automation", icon: <FaDiagramProject />, slug: "workflow-automation" },
  { name: "AI Dashboards", icon: <FaGauge />, slug: "ai-dashboards" },
  { name: "Document Processing", icon: <FaFileInvoice />, slug: "document-processing" },
  { name: "Recommendation Systems", icon: <FaWandMagicSparkles />, slug: "recommendation-systems" },
  { name: "API & AI Integrations", icon: <FaCubes />, slug: "api-ai-integrations" },
]

export default function AiAutomation() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Futuristic Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C5FA01]/10 rounded-full blur-[120px] transform-gpu" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C5FA01]/5 rounded-full blur-[100px] transform-gpu" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        
        <div className="inline-block mb-4">
          <span className="px-4 py-2 rounded-full bg-[#C5FA01]/20 text-black text-sm font-bold border border-black/10 uppercase tracking-wider">
            Next-Gen Tech
          </span>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-black mb-6"
        >
          Make Your Business Smarter <br className="hidden md:block"/> 
          With <span className="text-transparent bg-clip-text bg-[#C5FA01] drop-shadow-sm">AI & Automation</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-black/80 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
        >
          Reduce manual work, scale your operations, and provide 24/7 customer support. We integrate intelligent AI models and custom automated workflows into your existing business processes.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {AI_SERVICES.map((service, idx) => (
            <Link key={idx} to={`/services/${service.slug}`} className="block h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white border border-black/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all group h-full cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#C5FA01]/0 group-hover:bg-[#C5FA01]/10 transition-colors duration-300" />
                <div className="text-black transition-transform duration-300 group-hover:scale-110 relative z-10">
                  {React.cloneElement(service.icon, { size: 32 })}
                </div>
                <span className="font-bold text-sm text-black relative z-10">{service.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/contact">
            <Button size="lg" className="bg-[#C5FA01] hover:bg-[#C5FA01]/90 text-black rounded-full px-8 h-14 text-base font-bold shadow-lg shadow-black/10 transition-transform hover:-translate-y-1">
              Automate My Business
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
