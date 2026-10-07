import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function AnimatedHeading({ text, className = "", Component = "h2" }) {
  const prefersReducedMotion = useReducedMotion();
  
  if (typeof text !== 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Component className={className}>{text}</Component>
      </motion.div>
    );
  }

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={`${className} relative inline-block w-fit overflow-hidden text-black`}>
      {/* The text container */}
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.01, delay: 0.4 }} // Text appears right when box covers it
        className="inline-block"
      >
        {text}
      </motion.span>

      {/* The sliding box */}
      <motion.span
        variants={{
          hidden: { left: "0%", right: "100%" },
          visible: { 
            left: ["0%", "0%", "100%"],
            right: ["100%", "0%", "0%"]
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeInOut", times: [0, 0.5, 1] }}
        className="absolute top-0 bottom-0 bg-[#C5FA01] z-20 block"
      />
    </Component>
  );
}
