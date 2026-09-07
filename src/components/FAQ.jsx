import React from 'react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

const FAQS = [
  {
    question: "How do you price your web and software development projects?",
    answer: "Every project is unique. We provide a custom quote after a detailed discovery call where we understand your specific requirements, desired features, and timeline. We offer both fixed-price contracts for well-defined projects and retainer models for ongoing development."
  },
  {
    question: "What is your typical project timeline?",
    answer: "A standard corporate website usually takes 3-5 weeks from design to launch. Custom web apps or mobile apps can take anywhere from 2 to 6 months depending on complexity. Digital marketing campaigns start showing initial results within the first 30-60 days."
  },
  {
    question: "Do you provide maintenance after the project is launched?",
    answer: "Absolutely! We believe in long-term partnerships. We offer ongoing maintenance, security updates, and performance optimization packages to ensure your digital assets continue to perform at their best."
  },
  {
    question: "Can you help market a website or app you didn't build?",
    answer: "Yes. While we love full-cycle projects (Build → Market → Automate), our marketing team can audit your existing website or app and run highly effective SEO, PPC, and social media campaigns to drive traffic and conversions."
  },
  {
    question: "We already have a website but it looks outdated. Can you redesign it?",
    answer: "Definitely. We can perform a complete UI/UX overhaul of your existing platform. We'll improve the design, optimize the user journey, and upgrade the underlying technology to modern standards without losing your existing content or SEO rankings."
  },
  {
    question: "Do you work with startups on tight budgets?",
    answer: "We love working with ambitious startups. While we don't compromise on quality, we can help you prioritize core features to build a Minimum Viable Product (MVP) that fits your budget and helps you get to market faster."
  }
]

export default function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            Frequently Asked <span className="text-brand-rose">Questions</span>
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-border py-2">
                <AccordionTrigger className="text-left font-display font-semibold text-lg md:text-xl text-foreground hover:text-brand-rose hover:no-underline transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

      </div>
    </section>
  )
}
