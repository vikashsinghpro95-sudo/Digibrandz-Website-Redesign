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
import * as FaIcons from 'react-icons/fa6'
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
       <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] .05]" />
       
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
                         <img key={`a-${i}`} src={url} alt="" className="w-10 h-10 object-contain  opacity-40 flex-shrink-0" loading="lazy" />
                       ))}
                     </div>
                     <div className="flex flex-col gap-8 pb-8">
                       {columnIcons.map((url, i) => (
                         <img key={`b-${i}`} src={url} alt="" className="w-10 h-10 object-contain  opacity-40 flex-shrink-0" loading="lazy" />
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
  const [heroServices, setHeroServices] = useState([]);

  useEffect(() => {
    turso.execute('SELECT * FROM hero_services ORDER BY sort_order ASC')
      .then(res => setHeroServices(res.rows))
      .catch(console.error);
  }, []);

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border shadow-sm text-sm font-semibold text-black ">
            <span className="flex h-2 w-2 rounded-full bg-[#C5FA01] animate-pulse"></span>
            Your Growth & Technology Partner
          </div>
        </motion.div>

        {/* Main Hero Text (Responsive) */}
        <div className="flex flex-col items-center">
          
          {/* 3D Box Infinite Roll Container */}
          <div className="h-[70px] sm:h-[120px] lg:h-[150px] flex justify-center items-center mb-6 sm:mb-10 relative w-full max-w-5xl" style={{ perspective: 1200 }}>
            <motion.div
              animate={{ rotateX: rotation }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Face (English) */}
              <div 
                className="absolute inset-0 flex items-center justify-center [transform:translateZ(35px)] sm:[transform:translateZ(60px)] lg:[transform:translateZ(75px)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h1 className="font-display font-bold text-[45px] xs:text-[50px] sm:text-[90px] md:text-[100px] lg:text-[130px] leading-none tracking-tight select-none relative z-10 whitespace-nowrap">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[40px] sm:h-[60px] bg-[#C5FA01] -skew-x-12 z-[-1]"></div>
                  <span className="text-black py-4 inline-block relative z-10">
                    DigiBrandz
                  </span>
                </h1>
              </div>

              {/* Bottom Face (Hindi Fact 1) - Appears when rolling UP (+90deg) */}
              <div 
                className="absolute inset-0 flex items-center justify-center [transform:rotateX(-90deg)_translateZ(35px)] sm:[transform:rotateX(-90deg)_translateZ(60px)] lg:[transform:rotateX(-90deg)_translateZ(75px)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h1 className={`font-sans font-black ${getDynamicFontSize(fact1)} leading-[1.2] tracking-tight select-none w-full text-center px-2 transition-all duration-300 relative z-10 whitespace-nowrap`}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] h-[40px] sm:h-[60px] bg-[#C5FA01] -skew-x-12 z-[-1]"></div>
                  <span className="text-black drop-shadow-sm py-4 inline-block relative z-10">
                    {fact1}
                  </span>
                </h1>
              </div>

              {/* Back Face (English) - Appears when rolling UP (+180deg) */}
              <div 
                className="absolute inset-0 flex items-center justify-center [transform:rotateX(-180deg)_translateZ(35px)] sm:[transform:rotateX(-180deg)_translateZ(60px)] lg:[transform:rotateX(-180deg)_translateZ(75px)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h1 className="font-display font-bold text-[45px] xs:text-[50px] sm:text-[90px] md:text-[100px] lg:text-[130px] leading-none tracking-tight select-none relative z-10 whitespace-nowrap">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[40px] sm:h-[60px] bg-[#C5FA01] -skew-x-12 z-[-1]"></div>
                  <span className="text-black py-4 inline-block relative z-10">
                    DigiBrandz
                  </span>
                </h1>
              </div>

              {/* Top Face (Hindi Fact 2) - Appears when rolling UP (+270deg) */}
              <div 
                className="absolute inset-0 flex items-center justify-center [transform:rotateX(-270deg)_translateZ(45px)] sm:[transform:rotateX(-270deg)_translateZ(60px)] lg:[transform:rotateX(-270deg)_translateZ(75px)]"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h1 className={`font-sans font-black ${getDynamicFontSize(fact2)} leading-[1.2] tracking-tight select-none w-full text-center px-2 transition-all duration-300 relative z-10`}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40px] bg-[#C5FA01] -skew-x-12 z-[-1]"></div>
                  <span className="text-black drop-shadow-sm py-4 inline-block relative z-10">
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
            <span className="text-black relative z-10 font-bold inline-block w-[7em] text-center px-1 sm:px-2">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[40px] bg-[#C5FA01] -skew-x-12 z-[-1]" />
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
          <form onSubmit={handleAudit} className="w-full relative flex flex-col sm:flex-row items-center gap-2 p-2 bg-background/80 backdrop-blur-xl border-2 border-black/50 rounded-3xl sm:rounded-full shadow-[0_0_40px_-10px_rgba(255,8,68,0.5)]">
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
              className="w-full sm:w-auto bg-[#C5FA01] hover:from-white hover:to-[#C5FA01] text-black rounded-full px-8 h-14 sm:h-16 text-lg font-black tracking-wide shadow-xl shadow-brand-rose/30 transition-all hover:-translate-y-1 group disabled:opacity-70 disabled:hover:-translate-y-0"
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
          
          <div className="flex items-center justify-center gap-3 md:gap-6 mt-8 md:mt-12 mb-6 px-4">
            <span className="h-px w-8 md:w-12 bg-border shrink-0"></span>
            <span className="text-xs md:text-sm font-semibold text-muted-foreground tracking-widest uppercase text-center shrink-0">Explore Our Services</span>
            <span className="h-px w-8 md:w-12 bg-border shrink-0"></span>
          </div>
        </motion.div>

        {/* Highlighted Service Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 md:gap-4 w-full max-w-5xl mx-auto py-4 md:py-6 px-4"
        >
          {heroServices.map((service, idx) => {
            const IconComponent = FaIcons[service.icon] || FaIcons.FaBriefcase;
            return (
            <Link to={`/services/${service.id}`} key={idx} className="block w-full sm:w-auto">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="group flex items-center justify-center sm:justify-start gap-2 px-5 py-4 sm:py-3 rounded-xl bg-[#C5FA01] text-black shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300"
              >
                <div className="flex flex-shrink-0 items-center justify-center text-black/70 group-hover:text-black">
                  <IconComponent />
                </div>
                <span className="text-sm md:text-base font-bold whitespace-nowrap">
                  {service.name}
                </span>
              </motion.div>
            </Link>
          )})}
        </motion.div>

      </div>
      
      {/* Bottom fade gradient for smooth transition */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
