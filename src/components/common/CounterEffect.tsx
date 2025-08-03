'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CounterEffectProps {
  trigger: boolean;
  value: number;
}

export default function CounterEffect({ trigger, value }: CounterEffectProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (trigger) {
      // Create particle explosion effect
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 200 - 100, // Random spread
        y: Math.random() * 200 - 100,
      }));
      setParticles(newParticles);

      // Clear particles after animation
      setTimeout(() => setParticles([]), 1000);
    }
  }, [trigger]);

  return (
    <div className="relative">
      {/* Particle explosion effect */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-primary rounded-full pointer-events-none"
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 1, 
              scale: 0 
            }}
            animate={{ 
              x: particle.x, 
              y: particle.y, 
              opacity: 0, 
              scale: 1 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              type: "spring",
              stiffness: 200
            }}
          />
        ))}
      </AnimatePresence>

      {/* Counter number animation */}
      <motion.div
        key={value}
        initial={{ scale: 1.2, y: -10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
        className="text-6xl font-bold text-primary break-all"
      >
        {value}
      </motion.div>
    </div>
  );
}
