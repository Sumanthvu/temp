'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.closest('.image-grid-item')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border-2 border-pink-400"
        style={{
          boxShadow: '0 0 15px rgba(233,30,99,0.3)',
          backgroundColor: 'rgba(252,228,236,0.5)'
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? '#e91e63' : '#f48fb1',
          backgroundColor: isHovering ? 'rgba(244,143,177,0.4)' : 'rgba(252,228,236,0.5)'
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-pink-500 rounded-full pointer-events-none z-[10000]"
        style={{ boxShadow: '0 0 8px rgba(233,30,99,0.6)' }}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{ type: 'spring', stiffness: 1500, damping: 40, mass: 0.05 }}
      />
    </>
  );
}
