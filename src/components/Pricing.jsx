import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaXmark } from 'react-icons/fa6'
import { Button } from './ui/button'

const TIERS = [
  {
    name: "Starter",
    description: "For small businesses looking to establish a digital presence.",
    price: "$999",
    features: [
      "Basic SEO Setup",
      "Social Media Management (2 platforms)",
      "Monthly Performance Report",
      "Email Support",
      "Google My Business Optimization"
    ],
    missing: ["Paid Ads Management", "Custom Funnel Creation", "Advanced Analytics"],
    isPopular: false
  },
  {
    name: "Growth",
    description: "For growing brands ready to scale their customer acquisition.",
    price: "$2,499",
    features: [
      "Advanced SEO & Content Strategy",
      "Social Media Management (4 platforms)",
      "Google & Meta Ads Management",
      "Custom Landing Pages",
      "Bi-weekly Strategy Calls",
      "Advanced Analytics Dashboard"
    ],
    missing: [],
    isPopular: true
  },
  {
    name: "Performance",
    description: "Full-scale digital dominance for established enterprises.",
    price: "Custom",
    features: [
      "Enterprise SEO & Technical Audits",
      "Omnichannel Ads Management",
      "Marketing Automation Setup",
      "Dedicated Account Manager",
      "Weekly Strategy Calls",
      "Conversion Rate Optimization (CRO)",
      "Custom Dashboard & Reporting"
    ],
    missing: [],
    isPopular: false
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            Digital Marketing <span className="text-brand-rose">Packages</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed mb-4"
          >
            Transparent pricing for our marketing services.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-brand-plum/10 dark:bg-brand-cream/10 px-4 py-2 rounded-full border border-brand-plum/20 dark:border-brand-cream/20"
          >
            <span className="text-sm font-medium text-brand-plum dark:text-brand-cream">
              Note: Software & Web Development projects are custom quoted based on requirements.
            </span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative bg-background rounded-3xl p-8 border ${
                tier.isPopular ? 'border-brand-rose shadow-lg scale-105 z-10' : 'border-border shadow-sm mt-0 md:mt-4'
              } flex flex-col`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-rose text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                  Recommended
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm h-10">{tier.description}</p>
              </div>

              <div className="mb-8">
                <span className="font-display font-bold text-5xl text-brand-plum dark:text-brand-cream">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheck className="w-5 h-5 text-brand-rose shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{feature}</span>
                  </div>
                ))}
                {tier.missing.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-50">
                    <FaXmark className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground line-through">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                variant={tier.isPopular ? "default" : "outline"}
                className={`w-full rounded-full ${
                  tier.isPopular 
                    ? 'bg-brand-rose hover:bg-brand-rose/90 text-white' 
                    : 'border-brand-plum text-brand-plum hover:bg-brand-plum/5 dark:border-brand-cream dark:text-brand-cream dark:hover:bg-brand-cream/10'
                }`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
