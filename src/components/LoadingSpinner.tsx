import React from 'react';
import { motion } from 'motion/react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-outline-variant/20"
        />
        
        {/* Spinning inner ring segment */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        
        {/* Center decorative dot */}
        <motion.div
          className="absolute inset-0 m-auto w-3 h-3 bg-secondary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
      <motion.p
        className="font-sans text-xs uppercase tracking-widest text-on-surface-variant font-semibold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        Molding...
      </motion.p>
    </div>
  );
}
