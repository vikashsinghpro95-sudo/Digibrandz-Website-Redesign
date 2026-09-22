import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaMoon, FaSun, FaHouse, FaLayerGroup, FaTag, FaEnvelope } from 'react-icons/fa6'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { scroller, Link as ScrollLink } from 'react-scroll'
import { useTheme } from './ThemeProvider'
import { Button } from './ui/button'

const NAV_LINKS = [
  { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Services', to: 'services' },
  { name: 'Solutions', to: 'solutions' },
  { name: 'Industries', to: 'industries' },
  { name: 'Portfolio', to: 'portfolio' },
  { name: 'Process', to: 'process' },
  { name: 'Pricing', to: 'pricing' },
  { name: 'Blog', to: '/blog', isRoute: true },
  { name: 'Team', to: '/team', isRoute: true },
  { name: 'Careers', to: '/careers', isRoute: true },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

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

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      scroller.scrollTo('hero', {
        duration: 500,
        smooth: true,
        offset: -80,
      })
    }
  }

  const handleContactClick = () => {
    handleNavClick('contact')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background border-b border-border ${
        isScrolled
          ? 'shadow-md py-3'
          : 'shadow-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer" onClick={handleLogoClick}>
          <span className="font-display font-bold text-2xl tracking-tight text-brand-plum dark:text-brand-cream">
            DigiBrandz
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {NAV_LINKS.map((link) => (
            link.isRoute ? (
              <RouterLink
                key={link.name}
                to={link.to}
                className={`text-sm font-medium hover:text-brand-rose transition-colors cursor-pointer ${location.pathname === link.to ? 'text-brand-rose' : 'text-foreground/80'}`}
              >
                {link.name}
              </RouterLink>
            ) : (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.to)}
                className="text-sm font-medium text-foreground/80 hover:text-brand-rose transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            )
          ))}
        </nav>

        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          
          <Button onClick={handleContactClick} className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full px-6">
            Get a Free Consultation
          </Button>
        </div>

        {/* Mobile Top Actions */}
        <div className="flex lg:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Bottom Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex lg:hidden items-center justify-between w-[90%] max-w-[400px] bg-background/90 backdrop-blur-2xl border border-border/50 rounded-full px-6 sm:px-8 py-3 shadow-2xl shadow-brand-rose/20">
        
        {[
          { id: 'hero', icon: FaHouse, label: 'Home' },
          { id: 'services', icon: FaLayerGroup, label: 'Services' },
          { id: 'pricing', icon: FaTag, label: 'Pricing' },
        ].map((item) => (
          location.pathname === '/' ? (
            <ScrollLink
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass="!text-brand-rose !opacity-100 scale-110"
              className="flex flex-col items-center gap-1 text-muted-foreground opacity-60 hover:opacity-100 transition-all cursor-pointer"
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </ScrollLink>
          ) : (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="flex flex-col items-center gap-1 text-muted-foreground opacity-60 hover:opacity-100 transition-all cursor-pointer"
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        ))}

        {location.pathname === '/' ? (
           <ScrollLink
             to="contact"
             spy={true}
             smooth={true}
             offset={-80}
             duration={500}
             activeClass="!text-brand-plum dark:!text-white scale-110"
             className="flex flex-col items-center gap-1 text-brand-rose hover:text-brand-rose/80 transition-all cursor-pointer group"
           >
             <div className="bg-brand-rose/10 p-2.5 rounded-full -mt-6 bg-background border border-brand-rose/30 shadow-lg group-hover:scale-110 transition-transform">
                <FaEnvelope size={22} className="text-brand-rose group-[.active]:text-brand-plum dark:group-[.active]:text-white transition-colors" />
             </div>
             <span className="text-[10px] font-bold mt-0.5">Contact</span>
           </ScrollLink>
        ) : (
           <button
             onClick={() => handleNavClick('contact')}
             className="flex flex-col items-center gap-1 text-brand-rose hover:text-brand-rose/80 transition-all cursor-pointer group"
           >
             <div className="bg-brand-rose/10 p-2.5 rounded-full -mt-6 bg-background border border-brand-rose/30 shadow-lg group-hover:scale-110 transition-transform">
                <FaEnvelope size={22} className="text-brand-rose" />
             </div>
             <span className="text-[10px] font-bold mt-0.5">Contact</span>
           </button>
        )}
      </div>
    </header>
  )
}
