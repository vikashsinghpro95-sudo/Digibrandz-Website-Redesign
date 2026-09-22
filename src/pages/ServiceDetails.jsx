import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { SERVICES } from '../data/content'
import PageHeader from '../components/PageHeader'
import LeadGenCTA from '../components/LeadGenCTA'
import { FaCircleCheck } from 'react-icons/fa6'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'

export default function ServiceDetails() {
  const { id } = useParams()
  const service = SERVICES.find(s => s.id === id)

  if (!service) {
    return <Navigate to="/services" replace />
  }

  // Generate Schema Markup (JSON-LD)
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "DigiBrandz IT Solutions",
      "telephone": "+91-8483082699",
      "image": "https://digibrandz.com/logo.png"
    },
    "description": service.description,
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Service Offerings",
      "itemListElement": service.offers.map((offer, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": offer
        },
        "position": index + 1
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{service.title} Services | DigiBrandz IT Solutions</title>
        <meta name="description" content={service.description.substring(0, 155) + '...'} />
        <meta name="keywords" content={`${service.title}, digital marketing, DigiBrandz, IT solutions`} />
        <link rel="canonical" href={`https://digibrandz.com/services/${service.id}`} />
        {/* Open Graph Tags */}
        <meta property="og:title" content={`${service.title} Services | DigiBrandz`} />
        <meta property="og:description" content={service.description.substring(0, 155) + '...'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://digibrandz.com/services/${service.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <PageHeader 
        title={service.title}
        subtitle="Expert solutions tailored for your business."
        breadcrumbs={['Services', service.title]}
      />

      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-rose/5 rounded-full blur-[80px] transform-gpu" />
            <h2 className="text-3xl font-bold mb-6 font-display text-foreground relative z-10">Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed relative z-10 mb-12">
              {service.description}
            </p>

            <h3 className="text-2xl font-bold mb-6 font-display text-foreground relative z-10">What We Offer</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {service.offers.map((offer, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <FaCircleCheck className="text-brand-rose mt-1 shrink-0" />
                  <span className="text-muted-foreground">{offer}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.faqs && service.faqs.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8 font-display text-center">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {service.faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-left text-base font-bold">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          )}
        </div>
      </section>

      <LeadGenCTA />
    </div>
  )
}
