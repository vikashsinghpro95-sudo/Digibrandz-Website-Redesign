import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaQuoteRight } from 'react-icons/fa6'
import PageHeader from '../components/PageHeader'
import LeadGenCTA from '../components/LeadGenCTA'
import { TESTIMONIALS } from '../data/testimonials'

export default function TestimonialsPage() {
  return (
    <>
      <Helmet>
        <title>Client Testimonials & Reviews | DigiBrandz</title>
        <meta name="description" content="Read 50+ real reviews from businesses that scaled their revenue and growth with DigiBrandz. See how our web development and digital marketing services deliver actual results." />
      </Helmet>

      <PageHeader 
        title="What Our Clients Say"
        description="Don't just take our word for it. Read the success stories of businesses that chose DigiBrandz as their growth partner."
      />

      <section className="py-24 bg-muted/30 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-plum dark:text-brand-cream mb-4">
              Real Impact. <span className="text-brand-rose">Real Results.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We measure our success by the success of our clients. Here is what they have to say about working with us.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="bg-background border border-border p-8 rounded-3xl break-inside-avoid shadow-sm hover:shadow-md transition-shadow relative group transform-gpu"
              >
                <div className="absolute top-6 right-6 text-brand-plum/5 dark:text-brand-cream/5 group-hover:text-brand-rose/10 transition-colors transform-gpu">
                  <FaQuoteRight size={48} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex gap-1 text-brand-rose mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-foreground/90 leading-relaxed text-lg mb-8 font-medium">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-display font-bold text-muted-foreground uppercase">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <LeadGenCTA />
    </>
  )
}
