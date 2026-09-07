import React from 'react'
import { Link } from 'react-scroll'
import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube, FaGithub } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-plum text-brand-cream/90 pt-16 pb-8 border-t border-brand-rose/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-3xl mb-4 text-white">DigiBrandz</h3>
            <p className="mb-6 max-w-sm text-sm leading-relaxed">
              Your digital growth and technology partner based in Pune, India. 
              We build high-performance websites, custom software, and result-driven marketing campaigns.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-rose transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-brand-rose transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-brand-rose transition-colors"><FaLinkedin size={20} /></a>
              <a href="#" className="hover:text-brand-rose transition-colors"><FaYoutube size={20} /></a>
              <a href="#" className="hover:text-brand-rose transition-colors"><FaGithub size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="hero" smooth className="hover:text-brand-rose transition-colors cursor-pointer">Home</Link></li>
              <li><Link to="about" smooth className="hover:text-brand-rose transition-colors cursor-pointer">About Us</Link></li>
              <li><Link to="portfolio" smooth className="hover:text-brand-rose transition-colors cursor-pointer">Portfolio</Link></li>
              <li><Link to="pricing" smooth className="hover:text-brand-rose transition-colors cursor-pointer">Pricing</Link></li>
              <li><Link to="blog" smooth className="hover:text-brand-rose transition-colors cursor-pointer">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-white">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="services" smooth className="hover:text-brand-rose transition-colors cursor-pointer">Web Development</Link></li>
              <li><Link to="services" smooth className="hover:text-brand-rose transition-colors cursor-pointer">Software Development</Link></li>
              <li><Link to="services" smooth className="hover:text-brand-rose transition-colors cursor-pointer">Digital Marketing</Link></li>
              <li><Link to="services" smooth className="hover:text-brand-rose transition-colors cursor-pointer">AI & Automation</Link></li>
              <li><Link to="services" smooth className="hover:text-brand-rose transition-colors cursor-pointer">UI/UX Design</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>Pune, Maharashtra, India</li>
              <li><a href="mailto:hello@digibrandz.com" className="hover:text-brand-rose transition-colors">hello@digibrandz.com</a></li>
              <li><a href="tel:+910000000000" className="hover:text-brand-rose transition-colors">+91 0000 000 000</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-rose/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {currentYear} DigiBrandz. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-rose transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-rose transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-brand-rose transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
