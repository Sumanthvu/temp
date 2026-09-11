'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Phase1Props {
  onNext: () => void;
}

export default function Phase1({ onNext }: Phase1Props) {
  // Start the "No" button far away from center (bottom-right quadrant)
  const [noPos, setNoPos] = useState({ x: 260, y: 220 });
  const [dodgeCount, setDodgeCount] = useState(0);

  const dodge = useCallback(() => {
    const margin = 100;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = vw / 2;
    const cy = vh / 2;

    // Pick a spot sufficiently far from current position
    let nx: number, ny: number;
    let attempts = 0;
    do {
      nx = margin + Math.random() * (vw - 2 * margin);
      ny = margin + Math.random() * (vh - 2 * margin);
      attempts++;
    } while (
      attempts < 10 &&
      Math.abs(nx - cx - noPos.x) < 120 &&
      Math.abs(ny - cy - noPos.y) < 120
    );

    setNoPos({ x: nx - cx, y: ny - cy });
    setDodgeCount((c) => c + 1);
  }, [noPos]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative z-10 px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* ── Card ── */}
      <motion.div
        className="glass-card rounded-3xl w-full max-w-lg text-center"
        style={{ padding: 'clamp(32px, 6vw, 64px)' }}
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 120 }}
      >
        {/* Floating heart */}
        <motion.div
          className="text-5xl mb-5 select-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          💕
        </motion.div>

        {/* Label */}
        <p
          className="font-inter text-pink-400 uppercase tracking-widest mb-4"
          style={{ fontSize: '0.7rem', fontWeight: 600 }}
        >
          ✨ A Special Message ✨
        </p>

        {/* Heading */}
        <h1 className="font-playfair text-gray-700 mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)' }}>
          Hey{' '}
          <span className="gradient-text font-bold italic">Zuzu</span>,
        </h1>

        {/* Sub-text */}
        <p
          className="font-crimson text-gray-500 leading-relaxed mb-10"
          style={{ fontSize: 'clamp(1.05rem, 3vw, 1.3rem)' }}
        >
          I really wanted you to play this little game with me&hellip;{' '}
          <span className="text-pink-500 font-semibold">shall we start?</span>&nbsp;🌸
        </p>

        {/* Yes button */}
        <motion.button
          id="phase1-yes"
          className="btn-yes"
          onClick={onNext}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          Yes! 💖
        </motion.button>

        {/* Decorative divider */}
        <p className="text-pink-300 mt-8 text-sm select-none" style={{ letterSpacing: '0.5em' }}>
          🌸 🌸 🌸
        </p>

        {/* Tiny hint after a few dodges */}
        <AnimatePresence>
          {dodgeCount > 2 && (
            <motion.p
              className="font-inter text-pink-400 mt-4"
              style={{ fontSize: '0.78rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
            >
              The No button keeps running away! 😂
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Floating "No" button (fixed, dodges cursor) ── */}
      <motion.button
        id="phase1-no"
        className="btn-no"
        animate={{ x: noPos.x, y: noPos.y }}
        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        onMouseEnter={dodge}
        onFocus={dodge}
        onClick={dodge}
        aria-label="No — but it runs away!"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        No&nbsp;😅
      </motion.button>
    </motion.div>
  );
}
