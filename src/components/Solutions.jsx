import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa6'
import { Button } from './ui/button'
import AnimatedHeading from './ui/AnimatedHeading'
import { Link } from 'react-router-dom'

const SOLUTIONS = [
  {
    title: "Lead Generation System",
    problem: "Struggling to find qualified customers predictably?",
    solution: "A complete funnel: High-converting landing pages integrated with targeted Meta/Google Ads and an automated CRM bridge to capture and nurture leads.",
    link: "/services/performance-marketing"
  },
  {
    title: "E-Commerce Solution",
    problem: "Losing sales due to slow load times and poor checkout experience?",
    solution: "Scalable, blazing-fast online stores with optimized user journeys, secure payment gateways, and automated abandoned cart recovery.",
    link: "/services/ecommerce-quick-commerce"
  },
  {
    title: "CRM Solution",
    problem: "Customer data scattered across spreadsheets and inboxes?",
    solution: "Custom-tailored CRM platforms that centralize data, automate follow-ups, and provide actionable sales insights.",
    link: "/services/crm-systems"
  },
  {
    title: "Business Automation",
    problem: "Wasting hours on repetitive administrative tasks?",
    solution: "Custom workflows and API integrations that connect your disparate software tools, letting systems handle the busywork.",
    link: "/services/whatsapp-sms-marketing"
  },
  {
    title: "AI Customer Support",
    problem: "Unable to scale support during off-hours or peak times?",
    solution: "Intelligent AI chatbots trained on your business data to resolve common queries instantly, 24/7.",
    link: "/services/ai-chatbots"
  },
  {
    title: "Custom Business Software",
    problem: "Off-the-shelf software doesn't fit your unique operational model?",
    solution: "Bespoke web and mobile applications designed from the ground up to match your exact business logic and workflows.",
    link: "/services/website-app-development"
  }
]

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <AnimatedHeading text="Solutions Designed Around Business Problems" className="font-display font-bold text-4xl md:text-5xl text-black  mb-6" />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              We don't just sell services; we solve problems. Discover how our integrated approach tackles common growth bottlenecks.
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-background border border-border rounded-2xl p-8 flex flex-col justify-between hover:border-black/50 hover:shadow-md transition-all group"
            >
              <div>
                <h3 className="font-display font-bold text-2xl mb-4 text-foreground group-hover:text-black  transition-colors">{item.title}</h3>
                <div className="mb-6">
                  <span className="text-sm font-semibold text-black/70  uppercase tracking-wider block mb-2">The Problem</span>
                  <p className="text-muted-foreground">{item.problem}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-black  uppercase tracking-wider block mb-2">The Solution</span>
                  <p className="text-foreground/90">{item.solution}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <Link to={item.link}>
                  <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-black  text-black  font-semibold group/btn">
                    Learn more <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
