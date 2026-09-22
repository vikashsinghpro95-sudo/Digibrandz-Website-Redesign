import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMessage, FaXmark, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa6';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am the DigiBrandz AI Assistant. How can I help you scale your business today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

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
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
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
                      {msg.content}
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

            {/* Chat Input */}
            <div className="p-4 border-t border-border/50 bg-background/50">
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
