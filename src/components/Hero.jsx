import React, { useState, useEffect } from 'react'
import { generateSeoReport } from '../lib/seoReport'
import { Typewriter } from 'react-simple-typewriter'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { turso } from '../lib/turso'
import { useSettings } from '../contexts/SettingsContext'
import { Button } from './ui/button'
import { 
  FaArrowRight, FaSpinner, FaFilePdf, FaCode, FaLaptopCode, FaBullhorn, FaPenNib, FaGears, FaRobot,
  FaShareNodes, FaGoogle, FaMagnifyingGlass, FaMapLocationDot, FaHouseChimney, FaCartShopping, FaChartLine, FaVideo, FaUserGroup, FaWandMagicSparkles, FaMessage, FaCamera
} from 'react-icons/fa6'
import { API_BASE } from '../lib/api'

const ICON_URLS = [
  "/icons/airtable.svg", "/icons/anthropic.svg", "/icons/asana.svg", "/icons/brevo.svg",
  "/icons/calendly.svg", "/icons/clickup.svg", "/icons/cloudflare.svg", "/icons/datadog.svg",
  "/icons/digitalocean.svg", "/icons/discord.svg", "/icons/docker.svg", "/icons/elevenlabs.svg",
  "/icons/facebook.svg", "/icons/figma.svg", "/icons/firebase.svg", "/icons/flutter.svg",
  "/icons/github.svg", "/icons/gmail.svg", "/icons/googleads.svg", "/icons/googleanalytics.svg",
  "/icons/googlecloud.svg", "/icons/googledocs.svg", "/icons/googledrive.svg", "/icons/googlegemini.svg",
  "/icons/googlemeet.svg", "/icons/googlesearchconsole.svg", "/icons/googlesheets.svg", "/icons/googletagmanager.svg",
  "/icons/hotjar.svg", "/icons/hubspot.svg", "/icons/instagram.svg", "/icons/intercom.svg",
  "/icons/jira.svg", "/icons/mailchimp.svg", "/icons/make.svg", "/icons/medium.svg",
  "/icons/meta.svg", "/icons/mixpanel.svg", "/icons/mongodb.svg", "/icons/mysql.svg",
  "/icons/n8n.svg", "/icons/netlify.svg", "/icons/nodedotjs.svg", "/icons/notion.svg",
  "/icons/pinterest.svg", "/icons/postgresql.svg", "/icons/python.svg", "/icons/quora.svg",
  "/icons/railway.svg", "/icons/razorpay.svg", "/icons/react.svg", "/icons/reddit.svg",
  "/icons/redis.svg", "/icons/render.svg", "/icons/semrush.svg", "/icons/shopify.svg",
  "/icons/snapchat.svg", "/icons/stripe.svg", "/icons/supabase.svg", "/icons/telegram.svg",
  "/icons/threads.svg", "/icons/tiktok.svg", "/icons/trello.svg", "/icons/typeform.svg",
  "/icons/vercel.svg", "/icons/webflow.svg", "/icons/whatsapp.svg", "/icons/wix.svg",
  "/icons/woocommerce.svg", "/icons/wordpress.svg", "/icons/x.svg", "/icons/yoast.svg",
  "/icons/youtube.svg", "/icons/zapier.svg", "/icons/zendesk.svg", "/icons/zoho.svg"
]

const HERO_SERVICES = [
  { id: "social-media-management", name: "Social Media Management", icon: <FaShareNodes /> },
  { id: "meta-ads", name: "Meta Ads", icon: <FaBullhorn /> },
  { id: "google-ads", name: "Google Ads / PPC", icon: <FaGoogle /> },
  { id: "website-seo", name: "Website SEO", icon: <FaMagnifyingGlass /> },
  { id: "google-my-business", name: "Local SEO", icon: <FaMapLocationDot /> },
  { id: "website-app-development", name: "Web & App Dev", icon: <FaLaptopCode /> },
  { id: "real-estate-lead-gen", name: "Real Estate Lead Gen", icon: <FaHouseChimney /> },
  { id: "ecommerce-quick-commerce", name: "E-Commerce", icon: <FaCartShopping /> },
  { id: "performance-marketing", name: "Performance Marketing", icon: <FaChartLine /> },
  { id: "ai-video-creation", name: "AI Video Creation", icon: <FaVideo /> },
  { id: "influencer-marketing", name: "Influencer Marketing", icon: <FaUserGroup /> },
  { id: "video-editing-creative-designing", name: "Video & Design", icon: <FaWandMagicSparkles /> },
  { id: "whatsapp-sms-marketing", name: "WhatsApp & SMS", icon: <FaMessage /> },
  { id: "videography-photography", name: "Photography", icon: <FaCamera /> }
];

const FACTS = [
  "Great Content Keeps People Engaged",
  "Right SEO Brings Consistent Traffic",
  "Data Leads to Better Decisions",
  "Social Media Strengthens Your Brand",
  "Effective Ads Show Quick Results",
  "Videos Grab More Attention",
  "Building Trust Increases Sales",
  "Consistency Drives Growth",
  "Reaching the Right Audience is Key",
  "Clear CTAs Encourage Action",
  "Email Marketing Retains Customers",
  "Retargeting Brings Back Interest",
  "Analytics Shows What Works",
  "Right Keywords Increase Search Traffic",
  "Strong Branding is Memorable",
  "Clean Code is Easy to Understand",
  "Testing Catches Bugs Early",
  "Git Keeps Code Changes Safe",
  "Good Documentation Saves Time",
  "Security Should Be Built-In",
  "Small Functions Simplify Code",
  "Reusable Code Saves Effort",
  "APIs Connect Different Systems",
  "Databases Secure Application Data",
  "Debugging Finds the Root Cause",
  "Automation Simplifies Repetitive Tasks",
  "Version Control Recovers Old Changes",
  "Good UI Makes Apps Easy to Use",
  "Fast Performance Improves UX",
  "AI is Transforming Software Development"
];

let lastFactIndex = 1;
const getRandomFact = () => {
  let idx = Math.floor(Math.random() * FACTS.length);
  while (idx === lastFactIndex) {
    idx = Math.floor(Math.random() * FACTS.length);
  }
  lastFactIndex = idx;
  return FACTS[idx];
};

const BackgroundIcons = () => {
  const getColClasses = (index) => {
    if (index < 3) return "flex";
    if (index < 7) return "hidden sm:flex";
    if (index < 9) return "hidden md:flex";
    return "hidden lg:flex";
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center bg-background">
       <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05]" />
       
       <div className="absolute inset-0 z-0 hidden md:grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 px-4">
          {Array.from({ length: 6 }).map((_, colIndex) => {
             const isEven = colIndex % 2 === 0;
             const startIdx = (colIndex * 13) % ICON_URLS.length;
             // Reduced from 30 to 10 to halve DOM nodes while still spanning the entire screen
             const columnIcons = Array.from({ length: 10 }).map((_, i) => ICON_URLS[(startIdx + i) % ICON_URLS.length]);
             
             return (
               <div key={colIndex} className={`col-span-1 justify-center items-start overflow-visible ${getColClasses(colIndex)}`}>
                  <motion.div
                    className="flex flex-col will-change-transform transform-gpu"
                    animate={{ y: isEven ? ["0%", "-50%"] : ["-50%", "0%"] }}
                    transition={{ duration: 40 + (colIndex % 3) * 5, ease: "linear", repeat: Infinity }}
                  >
                     <div className="flex flex-col gap-8 pb-8">
                       {columnIcons.map((url, i) => (
                         <img key={`a-${i}`} src={url} alt="" className="w-10 h-10 object-contain dark:invert opacity-40 flex-shrink-0" loading="lazy" />
                       ))}
                     </div>
                     <div className="flex flex-col gap-8 pb-8">
                       {columnIcons.map((url, i) => (
                         <img key={`b-${i}`} src={url} alt="" className="w-10 h-10 object-contain dark:invert opacity-40 flex-shrink-0" loading="lazy" />
                       ))}
                     </div>
                  </motion.div>
               </div>
             )
          })}
       </div>

       {/* Performant static overlay: solid background in center to hide icons behind text, fading to transparent at edges */}
       <div 
         className="absolute inset-0 z-10 pointer-events-none" 
         style={{ background: 'radial-gradient(ellipse at center, hsl(var(--background)) 40%, transparent 80%)' }}
       />
    </div>
  )
}

export default function Hero() {
  const settings = useSettings();
  const prefersReducedMotion = useReducedMotion();
  const getDynamicFontSize = (text) => {
    const len = text.length;
    if (len > 35) return "text-[20px] sm:text-[28px] md:text-[34px] lg:text-[45px]";
    if (len > 25) return "text-[26px] sm:text-[36px] md:text-[42px] lg:text-[55px]";
    return "text-[32px] sm:text-[45px] md:text-[50px] lg:text-[70px]";
  };

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [fact1, setFact1] = useState(FACTS[0]);
  const [fact2, setFact2] = useState(FACTS[1]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setRotation((prev) => {
        const nextRot = prev + 90;
        const normalized = nextRot % 360;
        
        // Randomize the completely hidden face that's pointing backwards
        if (normalized === 90) {
          setFact2(getRandomFact());
        } else if (normalized === 270) {
          setFact1(getRandomFact());
        }
        
        return nextRot;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const reportJsonString = await generateSeoReport(url, settings || {});
      
      try {
        await turso.execute({
          sql: 'INSERT INTO seo_audits (website_url, report_content) VALUES (?, ?)',
          args: [url, reportJsonString]
        });
      } catch (e) {
        console.error('Failed to log audit:', e);
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-16">
      
      {!prefersReducedMotion && <BackgroundIcons />}

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-sm text-sm font-semibold text-brand-plum dark:text-brand-cream">
            <span className="flex h-2 w-2 rounded-full bg-brand-rose animate-pulse"></span>
            Your Growth & Technology Partner
          </div>
        </motion.div>

        {/* Main Hero Text (Responsive) */}
        <div className="flex flex-col items-center">
          
          {/* 3D Box Infinite Roll Container */}
          <div className="h-[90px] sm:h-[120px] lg:h-[150px] flex justify-center items-center mb-6 sm:mb-10 relative w-full max-w-5xl" style={{ perspective: 1200 }}>
            <motion.div
              animate={{ rotateX: rotation }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Face (English) */}
              <div 
                className="absolute inset-0 flex items-center justify-center [transform:translateZ(45px)] sm:[transform:translateZ(60px)] lg:[transform:translateZ(75px)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h1 className="font-display font-bold text-[65px] sm:text-[90px] md:text-[100px] lg:text-[130px] leading-none tracking-tight select-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-plum to-brand-rose py-4 inline-block">
                    DigiBrandz
                  </span>
                </h1>
              </div>

              {/* Bottom Face (Hindi Fact 1) - Appears when rolling UP (+90deg) */}
              <div 
                className="absolute inset-0 flex items-center justify-center [transform:rotateX(-90deg)_translateZ(45px)] sm:[transform:rotateX(-90deg)_translateZ(60px)] lg:[transform:rotateX(-90deg)_translateZ(75px)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h1 className={`font-sans font-black ${getDynamicFontSize(fact1)} leading-[1.2] tracking-tight select-none w-full text-center px-2 transition-all duration-300`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-rose to-brand-plum drop-shadow-sm py-4 inline-block">
                    {fact1}
                  </span>
                </h1>
              </div>

              {/* Back Face (English) - Appears when rolling UP (+180deg) */}
              <div 
                className="absolute inset-0 flex items-center justify-center [transform:rotateX(-180deg)_translateZ(45px)] sm:[transform:rotateX(-180deg)_translateZ(60px)] lg:[transform:rotateX(-180deg)_translateZ(75px)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h1 className="font-display font-bold text-[65px] sm:text-[90px] md:text-[100px] lg:text-[130px] leading-none tracking-tight select-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-plum to-brand-rose py-4 inline-block">
                    DigiBrandz
                  </span>
                </h1>
              </div>

              {/* Top Face (Hindi Fact 2) - Appears when rolling UP (+270deg) */}
              <div 
                className="absolute inset-0 flex items-center justify-center [transform:rotateX(-270deg)_translateZ(45px)] sm:[transform:rotateX(-270deg)_translateZ(60px)] lg:[transform:rotateX(-270deg)_translateZ(75px)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h1 className={`font-sans font-black ${getDynamicFontSize(fact2)} leading-[1.2] tracking-tight select-none w-full text-center px-2 transition-all duration-300`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-rose to-brand-plum drop-shadow-sm py-4 inline-block">
                    {fact2}
                  </span>
                </h1>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground mb-6 max-w-4xl min-h-[80px] sm:min-h-[60px] leading-tight px-2"
          >
            {settings?.heroTitle || 'We Build Digital Experiences That Grow'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-brand-blush font-bold inline-block w-[7em] text-center relative px-1 sm:px-2">
              <span className="absolute inset-0 bg-brand-rose/10 dark:bg-brand-rose/20 rounded-lg -rotate-1 scale-105 pointer-events-none" />
              {!prefersReducedMotion ? (
                <Typewriter
                  words={['Websites.', 'Software.', 'Marketing.', 'Automation.']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={1500}
                />
              ) : (
                'Websites.'
              )}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mb-12 leading-relaxed px-4"
          >
            {settings?.heroSubtitle || "From high-performance websites and custom software to result-driven digital marketing campaigns, we help businesses build, launch, and scale their digital presence."}
          </motion.p>
        </div>

        {/* CTAs & SEO Audit Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto mb-16 flex flex-col items-center"
        >
          <form onSubmit={handleAudit} className="w-full relative flex flex-col sm:flex-row items-center gap-2 p-2 bg-background/80 backdrop-blur-xl border-2 border-brand-rose/50 rounded-3xl sm:rounded-full shadow-[0_0_40px_-10px_rgba(255,8,68,0.5)]">
            <input 
              type="text" 
              placeholder="Enter your website URL (e.g. apple.com)" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow w-full bg-transparent border-none text-foreground font-bold px-6 h-12 focus:ring-0 outline-none placeholder:text-muted-foreground/80 placeholder:font-semibold text-lg"
              disabled={loading}
            />
            <Button 
              type="submit"
              disabled={loading || !url}
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-[#ff0844] to-[#ffb199] hover:from-[#e0003b] hover:to-[#ff9b7d] text-white rounded-full px-8 h-14 sm:h-16 text-lg font-black tracking-wide shadow-xl shadow-brand-rose/30 transition-all hover:-translate-y-1 group disabled:opacity-70 disabled:hover:-translate-y-0"
            >
              {loading ? (
                <>
                  <FaSpinner className="mr-2 w-4 h-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FaFilePdf className="mr-2 w-4 h-4" />
                  Get a Free SEO Audit
                </>
              )}
            </Button>
          </form>
          {error && <p className="text-destructive text-sm mt-4 font-medium">{error}</p>}
          
          <div className="flex items-center justify-center gap-6 mt-12 mb-6">
            <span className="h-px w-12 bg-border"></span>
            <span className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">Explore Our Services</span>
            <span className="h-px w-12 bg-border"></span>
          </div>
        </motion.div>

        {/* Highlighted Service Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 w-full max-w-4xl mx-auto"
        >
          {HERO_SERVICES.map((service, idx) => (
            <Link to={`/services/${service.id}`} key={idx} className="block w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-background/50 backdrop-blur-xl border border-border/60 shadow-lg hover:shadow-brand-rose/20 hover:border-brand-rose/40 transition-all cursor-pointer h-full"
              >
                <div className="w-10 h-10 rounded-full bg-brand-plum/10 dark:bg-brand-cream/10 flex flex-shrink-0 items-center justify-center text-brand-plum dark:text-brand-cream group-hover:bg-brand-rose group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <span className="text-sm md:text-base font-bold text-foreground/90 group-hover:text-brand-rose transition-colors">
                  {service.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

      </div>
      
      {/* Bottom fade gradient for smooth transition */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
