import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaMoon, FaSun, FaHouse, FaLayerGroup, FaTag, FaEnvelope, FaCircleInfo, FaBriefcase, FaBuilding, FaWandMagicSparkles, FaBars } from 'react-icons/fa6'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
import { scroller, Link as ScrollLink } from 'react-scroll'
import { Button } from './ui/button'
import MobileDrawer from './MobileDrawer'
import { useContent } from '../contexts/ContentContext'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { navLinks } = useContent()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



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

  const handleContactClick = () => { navigate('/contact'); }

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
        <div className="flex-shrink-0 cursor-pointer relative z-10 group" onClick={handleLogoClick}>
          <div className="absolute inset-y-0 -left-2 -right-2 bg-[#C5FA01] -skew-x-12 z-[-1] transition-transform duration-300 group-hover:scale-105"></div>
          <span className="font-display font-bold text-2xl tracking-tight text-black">
            DigiBrandz
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {navLinks.map((link) => (
            link.isRoute ? (
              <RouterLink
                key={link.name}
                to={link.to}
                className={`text-xs xl:text-sm font-medium hover:text-black  transition-colors cursor-pointer whitespace-nowrap ${location.pathname === link.to ? 'text-black ' : 'text-foreground/80'}`}
              >
                {link.name}
              </RouterLink>
            ) : (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.to)}
                className="text-sm font-medium text-foreground/80 hover:text-black  transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            )
          ))}
        </nav>

        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          
          <Button onClick={handleContactClick} className="bg-[#C5FA01] hover:bg-[#C5FA01]/90 text-black rounded-full px-6">
            Get a Free Consultation
          </Button>
        </div>

        {/* Mobile Top Actions */}
        <div className="flex lg:hidden items-center space-x-4">
        </div>
      </div>

      {/* Mobile Floating Bottom Dock */}
      <div className="fixed bottom-6 left-0 right-0 mx-auto z-50 flex lg:hidden items-center justify-between w-[95%] max-w-[500px] bg-white/95 backdrop-blur-2xl border border-black/10 rounded-2xl px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
        
        {[
          { id: '/', icon: FaHouse, label: 'Home' },
          { id: '/about', icon: FaCircleInfo, label: 'About' },
          { id: '/services', icon: FaLayerGroup, label: 'Services' },
          { id: '/industries', icon: FaBuilding, label: 'Industries' },
          { id: '/portfolio', icon: FaBriefcase, label: 'Work' },
        ].map((item) => {
          const isActive = location.pathname === item.id;
          return (
            <motion.div key={item.id} whileTap={{ scale: 0.85 }}>
              <RouterLink
                to={item.id}
                onClick={() => setIsDrawerOpen(false)}
                className={`relative flex flex-col items-center justify-center gap-1 w-12 h-12 transition-colors ${isActive ? 'text-black ' : 'text-black/60 hover:text-black'}`}
              >
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-[#C5FA01]/10 rounded-xl"
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
            className={`flex flex-col items-center justify-center gap-1 w-12 h-12 transition-colors text-black/60 hover:text-black`}
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
