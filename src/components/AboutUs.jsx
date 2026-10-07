import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaBookOpen, FaRocket, FaBullseye, FaUsers, FaBuilding, FaTrophy, FaCheck } from 'react-icons/fa6';

const ABOUT_TABS = [
  {
    id: 'story',
    icon: FaBookOpen,
    label: 'Our Story',
    tagline: 'Built in 2024 with one mission — help businesses grow digitally.',
    rows: [
      ['Founded', '2024'],
      ['Industry', 'Digital Marketing & IT Solutions'],
      ['Serves', 'Startups · SMEs · Enterprises'],
      ['Deliverables', 'Social Media, Meta Ads, Google Ads, Website, Seo, AI Video, and many more services.'],
    ],
  },
  {
    id: 'vision',
    icon: FaRocket,
    label: 'Our Vision',
    tagline: 'To become a globally recognized digital transformation partner.',
    rows: [
      ['Goal', 'Empower businesses with innovative technology'],
      ['Built On', 'Creativity · Transparency · Measurable results'],
      ['Impact', 'Lasting growth across industries'],
    ],
  },
  {
    id: 'mission',
    icon: FaBullseye,
    label: 'Our Mission',
    tagline: 'Deliver customer-centric strategies that generate real, lasting value.',
    rows: [
      ['Deliver', 'SEO websites · Branding · AI video · Performance marketing'],
      ['Promise', 'Measurable results on every engagement'],
      ['Approach', 'Data-driven, transparent, long-term partnerships'],
    ],
  },
  {
    id: 'team',
    icon: FaUsers,
    label: 'Our Team',
    tagline: 'A multidisciplinary crew of creators, engineers, and strategists.',
    rows: [
      ['Creatives', 'Designers · Developers · Content strategists'],
      ['Specialists', 'SEO · Meta Ads · GMB · AI video'],
      ['Media', 'Photography · Videography · Motion graphics'],
    ],
  },
  {
    id: 'office',
    icon: FaBuilding,
    label: 'Our Office',
    tagline: 'A workspace designed for creativity, collaboration, and continuous learning.',
    rows: [
      ['Location', 'Pune, Maharashtra — India'],
      ['Space', 'Open, collaborative, idea-first layout'],
      ['Culture', 'Teamwork · Innovation · Ownership'],
    ],
  },
  {
    id: 'awards',
    icon: FaTrophy,
    label: 'Awards',
    tagline: 'Recognized for delivering innovative digital solutions and measurable results.',
    rows: [
      ['Experience', '8+ years combined'],
      ['Projects', '60+ successfully delivered'],
      ['Industries', '20+ served globally'],
      ['Ad Spend Managed', '₹6 Cr+ across platforms'],
    ],
  },
];

const EASING = [0.22, 1, 0.36, 1];

export default function AboutUs() {
  const [active, setActive] = useState(ABOUT_TABS[0].id);
  const [direction, setDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  const activeIndex = ABOUT_TABS.findIndex((t) => t.id === active);
  const activeTab = ABOUT_TABS[activeIndex];

  const switchTab = (id) => {
    if (id === active) return;
    const nextIdx = ABOUT_TABS.findIndex((t) => t.id === id);
    setDirection(nextIdx > activeIndex ? 1 : -1);
    setActive(id);
  };

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      }
    }
  };

  const childVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASING } }
  };

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden text-black">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5FA01]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C5FA01]/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        {/* HERO / INTRO BLOCK */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start mb-24">
          <motion.div variants={childVariants}>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[64px] text-black leading-[1.05] tracking-tight relative w-fit mb-4">
              Driving Digital Innovation Since 2018
              <motion.span 
                initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASING }}
                className="absolute -bottom-2 left-0 right-0 h-3 bg-[#C5FA01] origin-left z-[-1] rounded-full"
              />
            </h2>
            <h3 className="font-display font-semibold text-2xl md:text-3xl text-black/80 leading-tight tracking-tight mb-2">
              Helping Businesses Grow, Innovate, and Lead in the Digital World.
            </h3>
          </motion.div>
          
          <motion.div variants={childVariants} className="flex flex-col gap-6">
            <p className="text-lg md:text-xl text-black/80 leading-relaxed font-medium">
              Established in 2024, DigiBrandz IT Solutions was built with one mission—to help businesses grow, innovate, and succeed in the digital world. What started as a vision has quickly evolved into a results-driven Digital Marketing & IT Solutions Company, empowering startups, SMEs, and enterprises with innovative digital strategies.
            </p>
            <p className="text-lg md:text-xl text-black/80 leading-relaxed font-medium">
              Today, we deliver end-to-end solutions including Website Development, Search Engine Optimization (SEO), Social Media Marketing, Google Ads, Meta Ads, Performance Marketing, Branding, AI Video Creation, and creative design services. Guided by innovation, transparency, and measurable results, we partner with businesses to build strong brands, generate quality leads, and achieve long-term digital success.
            </p>
          </motion.div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="max-w-6xl mx-auto">
          <motion.div variants={childVariants} className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {ABOUT_TABS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => switchTab(t.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${t.id}`}
                  id={`tab-${t.id}`}
                  className={`relative px-6 py-3 rounded-full text-sm md:text-base font-bold transition-colors z-10 ${
                    isActive ? 'text-black' : 'text-black/60 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {isActive && !prefersReducedMotion && (
                    <motion.span
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[#C5FA01] rounded-full shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && prefersReducedMotion && (
                    <span className="absolute inset-0 bg-[#C5FA01] rounded-full shadow-sm -z-10" />
                  )}
                  {t.label}
                </button>
              );
            })}
          </motion.div>

          {/* TAB CONTENT (MISSION BLOCK FORMAT) */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTab.id}
                custom={direction}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReducedMotion ? 0 : direction * -40 }}
                transition={{ duration: 0.5, ease: EASING }}
                id={`panel-${activeTab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab.id}`}
                className="w-full"
              >
                
                {/* Highlighted Tagline / Mission Statement Card */}
                <div className="bg-[#C5FA01] rounded-2xl p-8 md:p-12 mb-8 shadow-sm">
                  <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
                    {activeTab.tagline}
                  </h3>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {activeTab.rows.map(([label, value], i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : i * 0.1, duration: 0.5, ease: EASING }}
                      whileHover={{ y: prefersReducedMotion ? 0 : -6, scale: prefersReducedMotion ? 1 : 1.02 }}
                      className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all cursor-default flex flex-col"
                    >
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mb-4 shrink-0">
                        <FaCheck className="text-black" />
                      </div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-black/50 mb-2">
                        {label}
                      </h4>
                      <p className="font-semibold text-lg text-black leading-snug">
                        {value}
                      </p>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
