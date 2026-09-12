'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingOrbs() {
  const [orbs, setOrbs] = useState<any[]>([]);

  useEffect(() => {
    const generateOrbs = () => {
      return Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 20 + Math.random() * 80,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 5,
      }));
    };
    setOrbs(generateOrbs());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-screen opacity-60">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,200,220,0.8) 0%, rgba(255,100,150,0) 70%)',
            filter: 'blur(10px)',
          }}
          animate={{
            y: [orb.y, orb.y - 300 - Math.random() * 200, orb.y],
            x: [orb.x, orb.x + (Math.random() > 0.5 ? 100 : -100), orb.x],
            scale: [1, 1.5, 1],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
