'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Confetti() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const emojis = ['💕', '🎉', '🌸', '✨', '💖', '🥳', '🌹', '💗'];
    const p = Array.from({ length: 60 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 200;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 150; // Bias upwards
      return {
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        vx,
        vy,
        rotate: Math.random() * 360,
        scale: 0.5 + Math.random(),
      };
    });
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[8000] flex items-center justify-center overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: p.vx * (2 + Math.random()), // End far away
            y: p.vy * (2 + Math.random()) + 500, // Gravity effect
            scale: p.scale,
            rotate: p.rotate + 720,
            opacity: 0,
          }}
          transition={{
            duration: 2.5 + Math.random(),
            ease: [0.1, 0.8, 0.3, 1], // Custom ease out
          }}
          style={{ position: 'absolute', fontSize: '2rem' }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
