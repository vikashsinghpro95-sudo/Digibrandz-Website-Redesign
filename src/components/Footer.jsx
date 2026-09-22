import React from 'react'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { scroller } from 'react-scroll'
import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (to) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        scroller.scrollTo(to, {
          duration: 500,
          smooth: true,
          offset: -80,
        })
      }, 100)
    } else {
      scroller.scrollTo(to, {
        duration: 500,
        smooth: true,
        offset: -80,
      })
    }
  }

  return (
    <footer className="relative bg-[#130610] text-brand-cream/90 pt-32 pb-12 overflow-hidden border-t border-brand-rose/10">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-rose/5 blur-[150px] rounded-[100%] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-plum/10 blur-[150px] rounded-full pointer-events-none transform-gpu" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-4 lg:pr-8">
            <h3 className="font-display font-black text-4xl mb-6 text-white tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-rose to-brand-plum flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-black">D</span>
              </div>
              DigiBrandz
            </h3>
            <p className="mb-8 text-base text-brand-cream/60 leading-relaxed font-medium">
              Your digital growth and technology partner based in Pune, India. We architect high-performance digital ecosystems that turn attention into revenue.
            </p>
            
            {/* Newsletter */}
            <div className="mb-10">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Subscribe to our Insights</h4>
              <div className="relative group/input">
                <input 
                  type="email" 
                  placeholder="hello@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-brand-rose/50 focus:bg-white/10 transition-all text-white placeholder:text-white/30"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-brand-rose hover:bg-brand-rose/80 text-white px-6 rounded-full text-sm font-bold transition-colors shadow-md">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              {[
                { icon: FaInstagram, href: "https://www.instagram.com/digibrandzofficial?stkn=MWx4YjcwZ3hvc25weA==" },
                { icon: FaFacebook, href: "https://www.facebook.com/share/19VDexiDZh/" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/company/digibrandz-it-solutions-pvt-ltd/" },
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-rose hover:text-white hover:border-brand-rose transition-all duration-300 hover:-translate-y-1 group">
                  <social.icon size={18} className="text-brand-cream/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 hidden lg:block"></div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-lg mb-8 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-rose"></span>
              Navigation
            </h4>
            <ul className="space-y-4 text-base font-medium">
              <li><button onClick={() => handleNavClick('hero')} className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer text-left flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>Home</button></li>
              <li><button onClick={() => handleNavClick('about')} className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer text-left flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>About Us</button></li>
              <li><button onClick={() => handleNavClick('pricing')} className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer text-left flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>Pricing</button></li>
              <li><RouterLink to="/blog" className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>Blog</RouterLink></li>
              <li><RouterLink to="/team" className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>Our Team</RouterLink></li>
              <li><RouterLink to="/careers" className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>Careers <span className="ml-2 text-[10px] bg-brand-rose/20 text-brand-rose px-2 py-0.5 rounded-full border border-brand-rose/30">Hiring</span></RouterLink></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-lg mb-8 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-plum"></span>
              Expertise
            </h4>
            <ul className="space-y-4 text-base font-medium">
              <li><button onClick={() => handleNavClick('services')} className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer text-left flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>Web Development</button></li>
              <li><button onClick={() => handleNavClick('services')} className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer text-left flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>Software Development</button></li>
              <li><button onClick={() => handleNavClick('services')} className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer text-left flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>Digital Marketing</button></li>
              <li><button onClick={() => handleNavClick('services')} className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer text-left flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>AI & Automation</button></li>
              <li><button onClick={() => handleNavClick('services')} className="text-brand-cream/60 hover:text-brand-rose transition-colors cursor-pointer text-left flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-[1px] bg-brand-rose transition-all duration-300"></span>UI/UX Design</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-lg mb-8 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/50"></span>
              Contact
            </h4>
            <ul className="space-y-6 text-base font-medium">
              <li className="flex items-start gap-4 text-brand-cream/60">
                <div className="mt-1 w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <span>Office No. 323, Aston Plaza, Ambegaon Budruk, Pune, Maharashtra – 411046, India.</span>
              </li>
              <li className="flex items-start gap-4 text-brand-cream/60">
                <div className="mt-1 w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
                <a href="mailto:Digibrandzitsolutions@gmail.com" className="hover:text-brand-rose transition-colors break-all">Digibrandzitsolutions@gmail.com</a>
              </li>
              <li className="flex items-start gap-4 text-brand-cream/60">
                <div className="mt-1 w-8 h-8 shrink-0 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                <a href="tel:+918483082699" className="hover:text-brand-rose transition-colors">+91 8483082699</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-10 pb-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-brand-cream/40">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>&copy; {currentYear} DigiBrandz. All Rights Reserved.</p>
            <p>Designed and Made By <span className="text-brand-rose font-bold">DigiBrandz</span></p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="#" className="hover:text-brand-rose transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-rose transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-brand-rose transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
