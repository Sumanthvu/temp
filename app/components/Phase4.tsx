'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Phase4Props {
  onNext: () => void;
}

export default function Phase4({ onNext }: Phase4Props) {
  const [noPos, setNoPos] = useState({ x: 270, y: 230 });
  const [noCount, setNoCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const dodge = useCallback(() => {
    const margin = 100;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = vw / 2;
    const cy = vh / 2;

    let nx: number, ny: number, attempts = 0;
    do {
      nx = margin + Math.random() * (vw - 2 * margin);
      ny = margin + Math.random() * (vh - 2 * margin);
      attempts++;
    } while (
      attempts < 10 &&
      Math.abs(nx - cx - noPos.x) < 110 &&
      Math.abs(ny - cy - noPos.y) < 110
    );

    setNoPos({ x: nx - cx, y: ny - cy });
    setNoCount((c) => c + 1);
  }, [noPos]);

  const hintText =
    noCount === 0 ? null
    : noCount < 3 ? 'The No button doesn\'t want to be clicked 😉'
    : noCount < 6 ? 'You really tried… but it keeps running 🏃‍♂️💨'
    : 'It\'s hopeless! Just say Yes! 🥺💕';

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative z-10 px-5 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65 }}
    >
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope"
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, transition: { duration: 0.5 } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '250px',
              position: 'relative',
            }}
          >
            {/* Back of envelope */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#f8bbd0',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(233,30,99,0.2)',
              }}
            />
            {/* Letter peek */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                bottom: '20px',
                background: '#fff',
                borderRadius: '8px',
              }}
            />
            {/* Front folds */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#f48fb1',
                clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% 60%, 0 0)',
                borderRadius: '16px',
              }}
            />
            {/* Flap closed */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: '#f06292',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                borderRadius: '16px 16px 0 0',
              }}
            />
            {/* Seal / Heart */}
            <motion.div
              style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '3rem',
                zIndex: 10,
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              💖
            </motion.div>
            
            <motion.p
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '0',
                right: '0',
                textAlign: 'center',
                color: '#e91e63',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Tap to open your mail! ✨
            </motion.p>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="letter"
            className="glass-card rounded-3xl w-full overflow-hidden relative"
            style={{ maxWidth: '480px', zIndex: 20 }}
            initial={{ scale: 0.5, y: 150, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
          >
            {/* Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg,#f8bbd0 0%,#fce4ec 50%,#f48fb1 100%)',
                padding: 'clamp(20px, 4vw, 36px)',
                textAlign: 'center',
              }}
            >
              <motion.div
                className="text-5xl select-none mb-2"
                animate={{ scale: [1, 1.14, 1], rotate: [0, 6, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌹
              </motion.div>
              <p
                className="font-inter text-pink-600 uppercase tracking-widest"
                style={{ fontSize: '0.7rem', fontWeight: 600 }}
              >
                ✨ An Invitation ✨
              </p>
            </div>

            {/* Gradient rule */}
            <div style={{ height: 3, background: 'linear-gradient(90deg,#f48fb1,#e91e63,#f48fb1)' }} />

            {/* Body */}
            <div
              className="text-center"
              style={{ padding: 'clamp(28px, 5vw, 52px)' }}
            >
              {/* Floating row */}
              <div className="flex justify-center gap-2 mb-5 select-none">
                {['🌸', '💕', '🌸'].map((e, i) => (
                  <motion.span
                    key={i}
                    style={{ fontSize: '1.5rem' }}
                    animate={{ y: [0, -7, 0] }}
                    transition={{ delay: i * 0.25, duration: 2, repeat: Infinity }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>

              <p
                className="font-inter text-pink-400 uppercase tracking-widest mb-4"
                style={{ fontSize: '0.7rem', fontWeight: 600 }}
              >
                Dear Zuzu
              </p>

              <h2
                className="font-playfair text-gray-700 leading-snug mb-4"
                style={{ fontSize: 'clamp(1.6rem, 5.5vw, 2.6rem)' }}
              >
                Will you come on a{' '}
                <span className="gradient-text font-bold italic">date</span>{' '}
                with me?
              </h2>

              <p
                className="font-dancing text-pink-500 mb-8"
                style={{ fontSize: 'clamp(1.3rem, 4vw, 1.9rem)' }}
              >
                Let&apos;s go eat Mandi together 🍖✨
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-8">
                <div style={{ flex: 1, height: 1, background: '#fce4ec' }} />
                <span style={{ color: '#f48fb1', fontSize: '1rem' }}>💕</span>
                <div style={{ flex: 1, height: 1, background: '#fce4ec' }} />
              </div>

              {/* Yes button */}
              <motion.button
                id="phase4-yes"
                className="btn-yes"
                style={{ fontSize: '1.08rem', padding: '16px 56px' }}
                onClick={onNext}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 6px 24px rgba(233,30,99,0.38)',
                    '0 6px 38px rgba(233,30,99,0.65)',
                    '0 6px 24px rgba(233,30,99,0.38)',
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                Yes, I&apos;d love to! 💕
              </motion.button>

              {/* Hint */}
              {hintText && (
                <motion.p
                  className="font-inter text-pink-400 mt-5"
                  style={{ fontSize: '0.78rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                >
                  {hintText}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating "No" button ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            key="btn-no"
            id="phase4-no"
            className="btn-no"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, x: noPos.x, y: noPos.y }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            onMouseEnter={dodge}
            onFocus={dodge}
            onClick={dodge}
            aria-label="No — runs away!"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 100 }}
          >
            No&nbsp;🙈
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
