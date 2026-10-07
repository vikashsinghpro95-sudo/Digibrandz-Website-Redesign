import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useContent } from '../contexts/ContentContext'
import PageHeader from '../components/PageHeader'
import LeadGenCTA from '../components/LeadGenCTA'
import { FaLinkedin, FaTwitter, FaGithub, FaCircleCheck } from 'react-icons/fa6'
import { motion } from 'framer-motion'

export default function TeamMemberDetails() {
  const { id } = useParams()
  const { team } = useContent()
  const member = team.find(m => String(m.id) === String(id) || m.slug === id)

  if (!member) {
    return <Navigate to="/team" replace />
  }

  // Generate Schema Markup (JSON-LD)
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.role,
    "description": member.fullBio || member.bio,
    "worksFor": {
      "@type": "Organization",
      "name": "DigiBrandz IT Solutions"
    },
    "sameAs": [
      member.socials?.linkedin,
      member.socials?.twitter,
      member.socials?.github
    ].filter(Boolean)
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{member.name} - {member.role} | DigiBrandz IT Solutions</title>
        <meta name="description" content={member.bio} />
        <link rel="canonical" href={`https://digibrandz.com/team/${member.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <PageHeader 
        title={member.name}
        subtitle={member.role}
        breadcrumbs={['Team', member.name]}
      />

      <section className="py-20 relative bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-border shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-12 items-start">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C5FA01]/5 rounded-full blur-[80px] transform-gpu pointer-events-none" />
            
            {/* Avatar Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center shrink-0 relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`h-48 w-48 md:h-64 md:w-64 rounded-full bg-gradient-to-br ${member.color} relative overflow-hidden flex items-center justify-center mb-8 shadow-xl`}
              >
                {member.image ? (
                  <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/10" />
                    <span className="text-7xl md:text-8xl font-display font-bold text-black drop-shadow-lg">
                      {member.initials}
                    </span>
                  </>
                )}
              </motion.div>
              
              <div className="flex gap-4">
                {member.socials?.linkedin && (
                  <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-black hover:bg-[#C5FA01] hover:text-black transition-colors shadow-sm">
                    <FaLinkedin size={20} />
                  </a>
                )}
                {member.socials?.twitter && (
                  <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-black hover:bg-[#C5FA01] hover:text-black transition-colors shadow-sm">
                    <FaTwitter size={20} />
                  </a>
                )}
                {member.socials?.github && (
                  <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-black hover:bg-[#C5FA01] hover:text-black transition-colors shadow-sm">
                    <FaGithub size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-2/3 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold mb-2 font-display text-black">{member.name}</h2>
                <p className="text-black  font-semibold text-lg uppercase tracking-wider mb-8">{member.role}</p>
                
                <h3 className="text-xl font-bold mb-4 font-display text-black">Biography</h3>
                <p className="text-lg text-black/80 leading-relaxed mb-10">
                  {member.fullBio || member.bio}
                </p>

                {member.expertise && member.expertise.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold mb-6 font-display text-black">Areas of Expertise</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {member.expertise.map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <FaCircleCheck className="text-black  shrink-0" />
                          <span className="text-black/80 font-medium">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      <LeadGenCTA />
    </div>
  )
}
