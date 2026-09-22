import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRegCalendar } from 'react-icons/fa6';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data.blogs || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-brand-plum/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm font-semibold text-brand-rose mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-rose animate-pulse"></span>
            Insights & Ideas
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display font-bold text-5xl md:text-7xl mb-6 text-foreground tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-rose to-[#ff0844]">DigiBrandz</span> Blog
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert strategies, industry trends, and deep dives into everything digital marketing, software, and AI.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20 text-muted-foreground">Loading articles...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground text-xl">No articles published yet. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, idx) => (
                <motion.div 
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-card border border-border hover:border-brand-rose/30 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-brand-rose/5 transition-all duration-500 flex flex-col"
                >
                  <Link to={`/blog/${blog.slug}`} className="block h-56 overflow-hidden relative bg-muted">
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-plum to-[#130610] group-hover:scale-110 transition-transform duration-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </Link>
                  
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                        <FaRegCalendar className="text-brand-rose" />
                        {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <Link to={`/blog/${blog.slug}`}>
                        <h2 className="font-display font-bold text-2xl text-foreground group-hover:text-brand-rose transition-colors mb-3 line-clamp-2">
                          {blog.title}
                        </h2>
                      </Link>
                      <p className="text-muted-foreground line-clamp-3 mb-6">
                        {blog.excerpt}
                      </p>
                    </div>
                    
                    <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-brand-rose font-bold text-sm group/btn w-fit">
                      Read Article
                      <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
