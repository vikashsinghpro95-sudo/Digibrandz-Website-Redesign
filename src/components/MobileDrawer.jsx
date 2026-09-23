import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaXmark, FaHouse, FaTags, FaNewspaper, FaUsers, FaBriefcase, FaEnvelope, FaListCheck } from 'react-icons/fa6';

const DRAWER_LINKS = [
  { name: 'Home', to: '/', icon: FaHouse },
  { name: 'Process', to: '/process', icon: FaListCheck },
  { name: 'Blog', to: '/blog', icon: FaNewspaper },
  { name: 'Team', to: '/team', icon: FaUsers },
  { name: 'Careers', to: '/careers', icon: FaBriefcase },
  { name: 'Contact', to: '/contact', icon: FaEnvelope },
];

export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-brand-darkPlum/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[2.5rem] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] lg:hidden flex flex-col max-h-[85vh]"
          >
            <div className="flex justify-between items-center p-8 border-b border-white/10 shrink-0">
              <h2 className="font-display font-bold text-2xl text-brand-cream">More Options</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-cream hover:bg-brand-rose transition-colors"
              >
                <FaXmark size={18} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 flex-grow pb-32" data-lenis-prevent="true">
              <motion.div 
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-2 gap-4"
              >
                {DRAWER_LINKS.map((link) => (
                  <motion.div 
                    key={link.name}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className={`flex items-center gap-3 p-4 rounded-2xl border transition-colors block w-full h-full ${
                        location.pathname === link.to 
                          ? 'border-brand-rose bg-brand-rose/10 text-brand-rose shadow-sm' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10 text-brand-cream/80'
                      }`}
                    >
                      <link.icon size={20} className={location.pathname === link.to ? 'text-brand-rose' : 'text-brand-cream/60'} />
                      <span className="font-bold text-sm tracking-wide">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
