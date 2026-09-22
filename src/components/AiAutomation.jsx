import React from 'react'
import { motion } from 'framer-motion'
import { FaRobot, FaMessage, FaPhone, FaGear, FaPenNib, FaBrain, FaDiagramProject, FaGauge, FaFileInvoice, FaWandMagicSparkles, FaCubes } from 'react-icons/fa6'
import { Button } from './ui/button'

const AI_SERVICES = [
  { name: "AI Chatbots", icon: <FaMessage /> },
  { name: "AI Customer Support", icon: <FaPhone /> },
  { name: "WhatsApp Automation", icon: <FaMessage /> },
  { name: "Business Process Automation", icon: <FaGear /> },
  { name: "AI Content Generation", icon: <FaPenNib /> },
  { name: "AI Agents", icon: <FaRobot /> },
  { name: "Workflow Automation", icon: <FaDiagramProject /> },
  { name: "AI Dashboards", icon: <FaGauge /> },
  { name: "Document Processing", icon: <FaFileInvoice /> },
  { name: "Recommendation Systems", icon: <FaWandMagicSparkles /> },
  { name: "API & AI Integrations", icon: <FaCubes /> },
]

export default function AiAutomation() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#1A0E15]">
      {/* Futuristic Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-rose/10 rounded-full blur-[150px] transform-gpu" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blush/10 rounded-full blur-[120px] transform-gpu" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        
        <div className="inline-block mb-4">
          <span className="px-3 py-1 rounded-full bg-brand-rose/20 text-brand-rose text-sm font-medium border border-brand-rose/30">
            Next-Gen Tech
          </span>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6"
        >
          Make Your Business Smarter <br className="hidden md:block"/> 
          With <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-brand-blush">AI & Automation</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/70 max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Reduce manual work, scale your operations, and provide 24/7 customer support. We integrate intelligent AI models and custom automated workflows into your existing business processes.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {AI_SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-white/10 hover:border-brand-rose/50 transition-colors group cursor-pointer"
            >
              <div className="text-brand-blush group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                {React.cloneElement(service.icon, { size: 32 })}
              </div>
              <span className="font-medium text-sm text-white/90">{service.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button size="lg" onClick={() => window.dispatchEvent(new CustomEvent('openConsultationModal'))} className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full px-8 shadow-[0_0_30px_rgba(189,85,121,0.4)]">
            Automate My Business
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
