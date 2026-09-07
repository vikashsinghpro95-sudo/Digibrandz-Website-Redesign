import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaXmark, FaMoon, FaSun } from 'react-icons/fa6'
import { Link } from 'react-scroll'
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
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer">
          <Link to="hero" smooth={true} duration={500} offset={-80}>
            <span className="font-display font-bold text-2xl tracking-tight text-brand-plum dark:text-brand-cream">
              DigiBrandz
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-80}
              className="text-sm font-medium text-foreground/80 hover:text-brand-rose transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
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
          
          <Link to="contact" smooth={true} duration={500} offset={-80}>
            <Button className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full px-6">
              Get a Free Consultation
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-background flex flex-col pt-20 px-6"
          >
            <button
              className="absolute top-6 right-6 p-2 text-foreground bg-muted rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaXmark size={24} />
            </button>
            
            <div className="flex flex-col space-y-6 text-center mt-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium text-foreground hover:text-brand-rose transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 flex justify-center">
                <Link 
                  to="contact" 
                  smooth={true} 
                  duration={500} 
                  offset={-80}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button size="lg" className="bg-brand-rose hover:bg-brand-rose/90 text-white rounded-full w-full max-w-xs text-lg h-14">
                    Get a Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
