import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaRegCalendar } from 'react-icons/fa6';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/blogs/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Blog not found');
        return res.json();
      })
      .then(data => {
        setBlog(data.blog);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center pt-24 text-muted-foreground">Loading...</div>;
  if (error || !blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center">
      <h1 className="text-4xl font-display font-bold text-foreground mb-4">Post Not Found</h1>
      <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or was removed.</p>
      <Link to="/blog" className="text-brand-rose hover:underline font-bold flex items-center gap-2"><FaArrowLeft /> Back to Blog</Link>
    </div>
  );

  // Sanitize the HTML content to prevent XSS
  const safeHTML = DOMPurify.sanitize(blog.content);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <article className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-rose transition-colors font-semibold text-sm mb-10">
          <FaArrowLeft /> Back to Insights
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
            <FaRegCalendar className="text-brand-rose" />
            {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight mb-8">
            {blog.title}
          </h1>
          
          {blog.coverImage && (
            <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-border">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}
        </header>

        {/* Content (Prose) */}
        <div 
          className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-brand-rose hover:prose-a:text-brand-rose/80 max-w-none"
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        />

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-border flex justify-between items-center">
          <div>
            <h4 className="font-bold text-foreground">Share this article</h4>
            <div className="flex gap-4 mt-4">
              <button className="text-muted-foreground hover:text-brand-rose">Twitter</button>
              <button className="text-muted-foreground hover:text-brand-rose">LinkedIn</button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
