import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaRegCalendar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { API_BASE } from '../lib/api'
import AnimatedHeading from './ui/AnimatedHeading';

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/api/blogs.php`)
      .then(res => res.json())
      .then(data => {
        const blogsArray = Array.isArray(data) ? data : (data.blogs || []);
        setPosts(blogsArray.slice(0, 3)); // Get only latest 3
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch blogs', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="py-24 bg-background border-b border-border relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <AnimatedHeading text="Insights to Help Your Business Grow" className="font-display font-bold text-4xl md:text-5xl text-black  mb-4" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/blog" className="font-semibold text-black  hover:text-black :text-black transition-colors flex items-center group">
              View All Articles <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12 text-muted-foreground">Loading recent articles...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No articles published yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.div
                key={post.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col h-full bg-card border border-border hover:border-black/30 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-brand-rose/5 transition-all duration-500"
              >
                <Link to={`/blog/${post.slug}`} className="block h-48 relative overflow-hidden bg-muted shrink-0">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-[#C5FA01] to-[#130610] group-hover:scale-110 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] transform-gpu">
                    <span className="font-semibold text-[#C5FA01] uppercase tracking-widest text-sm bg-black/50 px-4 py-2 rounded-full border border-white/20">Read Article</span>
                  </div>
                </Link>
                
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black  mb-3">
                       <FaRegCalendar className="text-black " />
                       {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-black  transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-border flex items-center">
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-black  font-bold text-sm group/btn w-fit">
                      Read More
                      <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
