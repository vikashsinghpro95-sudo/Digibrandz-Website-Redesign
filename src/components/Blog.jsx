import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa6'

const POSTS = [
  {
    title: "How AI & Automation Will Reshape Business Operations in 2026",
    category: "AI & Automation",
    date: "Sep 02, 2026",
    readTime: "5 min read",
    image: "bg-brand-plum/10",
  },
  {
    title: "The True Cost of Building a Custom Website (2026 Guide)",
    category: "Web Development",
    date: "Aug 28, 2026",
    readTime: "7 min read",
    image: "bg-brand-rose/10",
  },
  {
    title: "SEO vs. Google Ads: Where Should You Spend Your Marketing Budget?",
    category: "Digital Marketing",
    date: "Aug 15, 2026",
    readTime: "6 min read",
    image: "bg-brand-blush/10",
  }
]

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-background border-b border-border relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-4"
            >
              Insights to Help Your <span className="text-brand-rose">Business Grow</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a href="#" className="font-semibold text-brand-rose hover:text-brand-plum dark:hover:text-brand-cream transition-colors flex items-center group">
              View All Articles <FaArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className={`w-full aspect-video rounded-3xl mb-6 relative overflow-hidden ${post.image} border border-border`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20 backdrop-blur-[2px]">
                  <span className="font-semibold text-foreground uppercase tracking-widest text-sm bg-background/80 px-4 py-2 rounded-full">Read Article</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-brand-rose mb-3">
                <span>{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-muted-foreground">{post.readTime}</span>
              </div>
              
              <h3 className="font-display font-bold text-2xl text-foreground mb-4 group-hover:text-brand-rose transition-colors leading-tight">
                {post.title}
              </h3>
              
              <div className="mt-auto pt-4 flex items-center text-sm text-muted-foreground font-medium">
                {post.date}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
