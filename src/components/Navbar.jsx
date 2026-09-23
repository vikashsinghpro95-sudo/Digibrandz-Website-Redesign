import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaMoon, FaSun, FaHouse, FaLayerGroup, FaTag, FaEnvelope, FaCircleInfo, FaBriefcase, FaBuilding, FaWandMagicSparkles, FaBars } from 'react-icons/fa6'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { scroller, Link as ScrollLink } from 'react-scroll'
import { useTheme } from './ThemeProvider'
import { Button } from './ui/button'
import MobileDrawer from './MobileDrawer'

const NAV_LINKS = [
  { name: 'Home', to: '/', isRoute: true },
  { name: 'About', to: '/about', isRoute: true },
  { name: 'Services', to: '/services', isRoute: true },
  { name: 'Solutions', to: '/solutions', isRoute: true },
  { name: 'Industries', to: '/industries', isRoute: true },
  { name: 'Portfolio', to: '/portfolio', isRoute: true },
  { name: 'Process', to: '/process', isRoute: true },
  { name: 'Blog', to: '/blog', isRoute: true },
  { name: 'Team', to: '/team', isRoute: true },
  { name: 'Careers', to: '/careers', isRoute: true },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
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

  const handleContactClick = () => { window.dispatchEvent(new CustomEvent('openConsultationModal')); }

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
      <div className="fixed bottom-6 left-0 right-0 mx-auto z-50 flex lg:hidden items-center justify-between w-[95%] max-w-[500px] bg-brand-darkPlum/95 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] shadow-brand-rose/10">
        
        {[
          { id: '/about', icon: FaCircleInfo, label: 'About' },
          { id: '/services', icon: FaLayerGroup, label: 'Services' },
          { id: '/solutions', icon: FaWandMagicSparkles, label: 'Solutions' },
          { id: '/industries', icon: FaBuilding, label: 'Industries' },
          { id: '/portfolio', icon: FaBriefcase, label: 'Portfolio' },
        ].map((item) => {
          const isActive = location.pathname === item.id;
          return (
            <motion.div key={item.id} whileTap={{ scale: 0.85 }}>
              <RouterLink
                to={item.id}
                onClick={() => setIsDrawerOpen(false)}
                className={`relative flex flex-col items-center justify-center gap-1 w-12 h-12 transition-colors ${isActive ? 'text-brand-rose' : 'text-brand-cream/60 hover:text-brand-cream'}`}
              >
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-brand-rose/10 rounded-xl"
                  />
                )}
                <item.icon size={18} className="relative z-10" />
                <span className="text-[9px] font-medium tracking-tight relative z-10">{item.label}</span>
              </RouterLink>
            </motion.div>
          )
        })}

        <motion.div whileTap={{ scale: 0.85 }}>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`flex flex-col items-center justify-center gap-1 w-12 h-12 transition-colors text-brand-cream/60 hover:text-brand-cream`}
          >
            <FaBars size={18} />
            <span className="text-[9px] font-medium tracking-tight">More</span>
          </button>
        </motion.div>
      </div>
      
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  )
}
