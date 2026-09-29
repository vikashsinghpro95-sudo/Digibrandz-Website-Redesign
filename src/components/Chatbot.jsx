import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMessage, FaXmark, FaPaperPlane, FaRobot, FaUser, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa6';
import { turso } from '../lib/turso';
import { useSettings } from '../contexts/SettingsContext';

export default function Chatbot() {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am the DigiBrandz AI Assistant. How can I help you scale your business today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1) {
      turso.execute({
        sql: `INSERT INTO chat_sessions (session_id, messages, last_updated) VALUES (?, ?, CURRENT_TIMESTAMP) 
              ON CONFLICT(session_id) DO UPDATE SET messages = excluded.messages, last_updated = CURRENT_TIMESTAMP`,
        args: [sessionId, JSON.stringify(messages)]
      }).catch(err => console.error('Failed to log chat:', err));
    }
  }, [messages, sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue.trim() };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href,
          'X-Title': 'DigiBrandz Chatbot'
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful customer support AI for DigiBrandz, a premium digital agency. You help solve user queries and answer questions about our web development, mobile apps, digital marketing, AI, and SEO services. Be polite, concise, and professional. CRITICAL INSTRUCTIONS: 1) NEVER provide any pricing information. 2) Format your responses clearly using paragraphs (separated by double newlines) and bullet points. Do not output unformatted walls of text. 3) If the user wants to contact us, direct them to use the quick contact buttons at the bottom of the chat.' 
            },
            ...updatedMessages
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I am having trouble connecting right now. Please try again later or contact our team directly.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] hidden md:flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[70vh] bg-background/90 backdrop-blur-3xl border border-border/50 shadow-2xl rounded-3xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-brand-plum/10 border-b border-border/50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-rose to-brand-plum flex items-center justify-center text-white shadow-md">
                  <FaRobot size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground leading-none mb-1">DigiBrandz AI</h3>
                  <div className="flex items-center gap-1.5 text-xs text-brand-rose font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center text-muted-foreground transition-colors"
              >
                <FaXmark size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 scroll-smooth"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs text-white ${msg.role === 'user' ? 'bg-muted-foreground' : 'bg-brand-plum'}`}>
                      {msg.role === 'user' ? <FaUser /> : <FaRobot />}
                    </div>
                    
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-brand-rose text-white rounded-br-none shadow-md shadow-brand-rose/10' 
                        : 'bg-muted/50 border border-border rounded-bl-none'
                    }`}>
                      {msg.content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i !== msg.content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-brand-plum flex items-center justify-center text-xs text-white">
                      <FaRobot />
                    </div>
                    <div className="px-4 py-4 rounded-2xl bg-muted/50 border border-border rounded-bl-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Contact Buttons */}
            <div className="px-4 pb-2 pt-3 bg-background/50 border-t border-border/50 flex items-center justify-around gap-2">
              <a href={`tel:${settings?.contactPhone || '+918483082699'}`} className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-muted/50 hover:bg-brand-rose hover:text-white transition-colors text-xs font-medium text-muted-foreground gap-1">
                <FaPhone size={14} />
                Call
              </a>
              <a href={`mailto:${settings?.contactEmail || 'Digibrandzitsolutions@gmail.com'}`} className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-muted/50 hover:bg-brand-rose hover:text-white transition-colors text-xs font-medium text-muted-foreground gap-1">
                <FaEnvelope size={14} />
                Email
              </a>
              <a href={`https://wa.me/${(settings?.contactPhone || '+918483082699').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-muted/50 hover:bg-green-500 hover:text-white transition-colors text-xs font-medium text-muted-foreground gap-1">
                <FaWhatsapp size={14} />
                WhatsApp
              </a>
            </div>

            {/* Chat Input */}
            <div className="p-4 pt-2 bg-background/50">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full bg-muted/50 border border-border rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:border-brand-rose/50 focus:ring-1 focus:ring-brand-rose/50 transition-all placeholder:text-muted-foreground/70"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 w-8 h-8 rounded-full bg-brand-rose text-white flex items-center justify-center disabled:opacity-50 hover:bg-brand-rose/90 transition-colors shadow-sm"
                >
                  <FaPaperPlane size={12} className="-ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-rose to-brand-plum text-white shadow-2xl shadow-brand-rose/30 flex items-center justify-center hover:shadow-brand-rose/40 transition-shadow relative z-50 group"
        >
          <FaMessage size={24} className="group-hover:-translate-y-0.5 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cream opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-cream border-2 border-brand-rose"></span>
          </span>
        </motion.button>
      )}
    </div>
  );
}
