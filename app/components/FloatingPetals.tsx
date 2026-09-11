'use client';

import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  emoji: string;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const emojis = ['🌸', '🌺', '💕', '💗', '🌹', '✨', '💖', '🌷'];
    const newPetals = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      size: 0.8 + Math.random() * 0.8,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}rem`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          {petal.emoji}
        </span>
      ))}
    </div>
  );
}
