'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  // Use MotionValues to bypass React state and avoid re-renders for 60fps tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs
  const smoothX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  const largeSmoothX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.2 });
  const largeSmoothY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.2 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border-2 border-pink-400"
        style={{
          x: largeSmoothX,
          y: largeSmoothY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 15px rgba(233,30,99,0.3)',
          willChange: 'transform'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? '#e91e63' : '#f48fb1',
          backgroundColor: isHovering ? 'rgba(244,143,177,0.4)' : 'rgba(252,228,236,0.5)'
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-pink-500 rounded-full pointer-events-none z-[10000]"
        style={{ 
          x: smoothX, 
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 8px rgba(233,30,99,0.6)',
          willChange: 'transform'
        }}
      />
    </>
  );
}
