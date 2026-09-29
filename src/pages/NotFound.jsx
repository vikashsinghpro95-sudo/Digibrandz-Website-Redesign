import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHouseChimney, FaArrowLeft } from 'react-icons/fa6';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden py-24">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-rose/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-plum/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="relative"
        >
          <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-display font-black leading-none tracking-tighter select-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-rose via-white to-brand-plum drop-shadow-2xl">
              404
            </span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full whitespace-nowrap"
          >
            <div className="bg-background/80 backdrop-blur-md border border-white/10 px-6 py-2 sm:px-8 sm:py-3 rounded-full inline-block shadow-xl shadow-brand-rose/10 transform rotate-[-5deg]">
              <span className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-brand-rose">
                Page Not Found
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="max-w-xl mt-12 space-y-8"
        >
          <p className="text-lg sm:text-xl text-muted-foreground">
            Oops! It looks like you've wandered into the digital void. The page you're looking for has been moved, deleted, or never existed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-brand-rose to-brand-plum text-white hover:shadow-[0_0_20px_rgba(235,17,140,0.4)] transition-all">
              <Link to="/">
                <FaHouseChimney className="mr-2" /> Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-background/50 backdrop-blur-sm border-white/20 hover:bg-white/10 transition-all text-foreground">
              <button onClick={() => window.history.back()}>
                <FaArrowLeft className="mr-2" /> Go Back
              </button>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
