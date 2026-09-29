import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaRocket, FaBullseye, FaUsers, FaBuilding, FaTrophy } from 'react-icons/fa6';
import { useSettings } from '../contexts/SettingsContext';

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
      ['Delivers', 'Websites · SEO · Ads · Branding · AI Video'],
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

export default function AboutUs() {
  const settings = useSettings() || {};
  const [active, setActive] = useState(ABOUT_TABS[0].id);
  const [direction, setDirection] = useState(1);

  const activeIndex = ABOUT_TABS.findIndex((t) => t.id === active);
  const activeTab = ABOUT_TABS[activeIndex];

  const switchTab = (id) => {
    if (id === active) return;
    const nextIdx = ABOUT_TABS.findIndex((t) => t.id === id);
    setDirection(nextIdx > activeIndex ? 1 : -1);
    setActive(id);
  };

  return (
    <section id="about" className="relative py-24 bg-background overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-rose/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-plum/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-4"
          >
            {settings.aboutTitle || 'About DigiBrandz'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {settings.aboutText ||
              'A results-driven Digital Marketing & IT Solutions Company empowering startups, SMEs, and enterprises worldwide.'}
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* MOBILE — horizontal pill tabs */}
          <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 min-w-max pb-1">
              {ABOUT_TABS.map((t) => {
                const Icon = t.icon;
                const isActive = active === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => switchTab(t.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${isActive
                        ? 'text-white'
                        : 'text-muted-foreground hover:text-foreground bg-card border border-border'
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="about-pill-mobile"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-plum to-brand-rose shadow-md"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="text-base" />
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
            {/* DESKTOP — vertical tab sidebar */}
            <div className="hidden lg:flex flex-col gap-2">
              {ABOUT_TABS.map((t) => {
                const Icon = t.icon;
                const isActive = active === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => switchTab(t.id)}
                    className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl text-left text-sm font-semibold transition-colors ${isActive
                        ? 'text-white'
                        : 'text-muted-foreground hover:text-foreground bg-card border border-border hover:border-brand-rose/30'
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="about-pill-desktop"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-plum to-brand-rose shadow-lg"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                      <Icon className={`text-lg ${isActive ? 'text-white' : 'text-brand-rose'}`} />
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CONTENT PANEL */}
            <div className="relative rounded-3xl border border-border bg-card p-7 md:p-10 shadow-sm overflow-hidden min-h-[420px] md:min-h-[380px]">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-rose/10 rounded-full blur-[80px] pointer-events-none" />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTab.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  {/* Panel header */}
                  <div className="flex items-start gap-4 mb-8">
                    <motion.div
                      initial={{ scale: 0.7, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-brand-plum to-brand-rose text-white flex items-center justify-center text-2xl shadow-lg shadow-brand-rose/20"
                    >
                      {React.createElement(activeTab.icon)}
                    </motion.div>
                    <div>
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground leading-tight">
                        {activeTab.label}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mt-1.5 leading-relaxed max-w-xl">
                        {activeTab.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Tabular content */}
                  <dl className="divide-y divide-border">
                    {activeTab.rows.map(([label, value], i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.15 + i * 0.07,
                          duration: 0.4,
                          ease: 'easeOut',
                        }}
                        className="grid grid-cols-[110px_1fr] md:grid-cols-[170px_1fr] gap-4 py-4 items-baseline"
                      >
                        <dt className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {label}
                        </dt>
                        <dd className="text-sm md:text-base text-foreground font-medium leading-relaxed">
                          {value}
                        </dd>
                      </motion.div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}