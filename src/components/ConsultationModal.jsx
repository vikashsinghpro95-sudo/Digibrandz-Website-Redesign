import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaWhatsapp } from 'react-icons/fa6';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export const openConsultation = () => window.dispatchEvent(new Event('openConsultationModal'));

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openConsultationModal', handleOpen);
    return () => window.removeEventListener('openConsultationModal', handleOpen);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onClose = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const phoneNumber = "918483082699";
    const text = `Hi DigiBrandz, I'd like a free consultation.\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}`;
    
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
    
    // Reset and close
    setFormData({ name: '', email: '', phone: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-plum/90 backdrop-blur-md z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-background w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden border border-border/50 pointer-events-auto relative"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-rose/20 rounded-full blur-[60px] pointer-events-none transform-gpu" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-brand-plum/10 rounded-full blur-[60px] pointer-events-none transform-gpu" />

              <div className="relative p-8 border-b border-border/50 bg-gradient-to-r from-muted/50 to-transparent">
                <button
                  onClick={onClose}
                  className="absolute right-6 top-8 p-2 rounded-full bg-background border border-border hover:bg-brand-rose hover:text-white hover:border-brand-rose text-muted-foreground transition-all z-10 shadow-sm"
                >
                  <FaXmark size={18} />
                </button>
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="text-brand-rose font-bold tracking-widest uppercase text-xs">Let's Talk</span>
                  <h2 className="font-display text-4xl font-black text-foreground">Connect to DigiBrandz</h2>
                  <p className="text-base text-muted-foreground mt-2">Fill out the details below and our experts will connect with you instantly via WhatsApp.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 relative z-10">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-bold text-foreground">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="E.g. John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                    className="h-14 bg-muted/30 border-border rounded-xl focus:ring-brand-rose focus:border-brand-rose text-base transition-all"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-bold text-foreground">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    required 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                    className="h-14 bg-muted/30 border-border rounded-xl focus:ring-brand-rose focus:border-brand-rose text-base transition-all"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-bold text-foreground">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel"
                    required 
                    placeholder="+91 XXXXX XXXXX" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-14 bg-muted/30 border-border rounded-xl focus:ring-brand-rose focus:border-brand-rose text-base transition-all"
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-95 text-white flex items-center justify-center gap-3 h-16 text-lg font-bold rounded-xl shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition-all"
                  >
                    <FaWhatsapp size={26} />
                    Connect on WhatsApp
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
