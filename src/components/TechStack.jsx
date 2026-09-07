import React from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const TECH_CATEGORIES = {
  "Frontend": ["React", "Angular", "Vue", "HTML", "CSS", "JavaScript", "TypeScript"],
  "Backend": ["Node.js", "Python", "Django", "Flask", "PHP", "Laravel", "Java", "Spring Boot", ".NET"],
  "Mobile": ["Flutter", "React Native", "Android", "iOS"],
  "Database": ["MySQL", "PostgreSQL", "MongoDB", "SQL Server", "Firebase"],
  "Cloud & DevOps": ["AWS", "Google Cloud", "Azure", "Docker", "GitHub"],
  "AI": ["OpenAI", "Gemini", "Claude", "Hugging Face", "AI APIs"]
}

export default function TechStack() {
  return (
    <section className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-brand-plum dark:text-brand-cream mb-6"
          >
            Powered by <span className="text-brand-rose">Modern Technologies</span>
          </motion.h2>
        </div>

        <Tabs defaultValue="Frontend" className="w-full max-w-5xl mx-auto">
          <TabsList className="w-full flex flex-wrap h-auto justify-center gap-2 bg-transparent p-0 mb-12">
            {Object.keys(TECH_CATEGORIES).map(cat => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="rounded-full px-6 py-2.5 data-[state=active]:bg-brand-plum data-[state=active]:text-white dark:data-[state=active]:bg-brand-cream dark:data-[state=active]:text-brand-plum border border-transparent data-[state=inactive]:border-border hover:bg-muted transition-colors"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(TECH_CATEGORIES).map(([cat, techs]) => (
            <TabsContent key={cat} value={cat} className="outline-none">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap justify-center gap-4"
              >
                {techs.map(tech => (
                  <div 
                    key={tech} 
                    className="px-6 py-4 bg-background border border-border rounded-xl shadow-sm text-foreground font-medium hover:border-brand-rose hover:text-brand-rose transition-colors flex items-center justify-center min-w-[120px]"
                  >
                    {tech}
                  </div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

      </div>
    </section>
  )
}
