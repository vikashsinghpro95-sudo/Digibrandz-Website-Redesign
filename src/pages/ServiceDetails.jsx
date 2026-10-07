import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useContent } from '../contexts/ContentContext'
import PageHeader from '../components/PageHeader'
import LeadGenCTA from '../components/LeadGenCTA'
import { FaCircleCheck } from 'react-icons/fa6'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import AnimatedHeading from '../components/ui/AnimatedHeading'

export default function ServiceDetails() {
  const { id } = useParams()
  const { services } = useContent()
  const service = services.find(s => String(s.id) === String(id) || s.slug === id)

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const description = service.description || ''
  const offers = Array.isArray(service.offers) ? service.offers : []
  const faqs = Array.isArray(service.faqs) ? service.faqs : []
  const metaDescription = description.length > 155 ? description.substring(0, 155) + '...' : description

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
    "description": description,
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Service Offerings",
      "itemListElement": offers.map((offer, index) => ({
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
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>{service.title} Services | DigiBrandz IT Solutions</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${service.title}, digital marketing, DigiBrandz, IT solutions`} />
        <link rel="canonical" href={`https://digibrandz.com/services/${service.id}`} />
        <meta property="og:title" content={`${service.title} Services | DigiBrandz`} />
        <meta property="og:description" content={metaDescription} />
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

      <section className="py-20 relative bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C5FA01]/5 rounded-full blur-[80px] transform-gpu" />
            <AnimatedHeading text="Overview" className="text-3xl font-bold mb-6 font-display text-black relative z-10" />
            <p className="text-lg text-black/80 leading-relaxed relative z-10 mb-12">
              {description}
            </p>

            {offers.length > 0 && (
              <>
                <AnimatedHeading text="What We Offer" className="text-2xl font-bold mb-6 font-display text-black relative z-10" Component="h3" />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {offers.map((offer, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCircleCheck className="text-[#C5FA01]  mt-1 shrink-0" />
                      <span className="text-black/80">{offer}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {faqs.length > 0 && (
            <div className="mt-20">
              <div className="text-center"><AnimatedHeading text="Frequently Asked Questions" className="text-3xl font-bold mb-8 font-display text-center" /></div>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-left text-base font-bold">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-black/80 text-base leading-relaxed">
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
