'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Phase2Props {
  onNext: () => void;
}

const toastMessages: Record<number, string> = {
  1: 'Kya yaar, please pyaar bada na 😞💔',
  2: 'Yaar, Shakkar will be so disappointed if he knows this 🥺',
  3: 'Yaar thoda aur karo... sirf 3? 😢',
  4: 'Uff yaar, 4 hi? Shakkar deserves at least a 9! 🙈',
  5: 'Beech mein toh mat ruko yaar, pura do 💕',
  6: 'Arre 6 acha hai but... 10 toh de do naa 🥺✨',
  7: 'Saat toh lucky number hai, but 10 aur lucky hoga! 🌟',
  8: 'Itne kareeb aake ruk gaye? Ek aur kadam badao 💖',
  9: 'NINEEE?! Bas ek zyada karo yaarr 😭💕',
};

const celebLines = [
  'yayayayyaaaaa 🎉',
  'lets goo ganggg!! 🥳',
  'Zuzu loves Shakkar bohot bohot zyadaaa!! 💕',
  'je hui na baat... 😍',
  'ab chal aage chalte! ✨',
];

export default function Phase2({ onNext }: Phase2Props) {
  const [toast, setToast] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebLine, setCelebLine] = useState(0);

  useEffect(() => {
    if (!showCelebration) return;
    if (celebLine < celebLines.length - 1) {
      const t = setTimeout(() => setCelebLine((l) => l + 1), 550);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onNext, 2600);
      return () => clearTimeout(t);
    }
  }, [showCelebration, celebLine, onNext]);

  const handleRating = (n: number) => {
    if (n < 10) {
      setToast(toastMessages[n]);
      setTimeout(() => setToast(null), 3200);
    } else {
      setShowCelebration(true);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative z-10 px-5 py-8"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.65, type: 'spring', stiffness: 95 }}
    >
      {/* ── Card ── */}
      <motion.div
        className="glass-card rounded-3xl w-full max-w-xl text-center"
        style={{ padding: 'clamp(28px, 5vw, 56px)' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.55 }}
      >
        {/* Emoji header */}
        <motion.div
          className="text-5xl mb-5 select-none"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          🥰
        </motion.div>

        {/* Label */}
        <p
          className="font-inter text-pink-400 uppercase tracking-widest mb-3"
          style={{ fontSize: '0.7rem', fontWeight: 600 }}
        >
          ✨ Question Time ✨
        </p>

        {/* Heading */}
        <h2 className="font-playfair text-gray-700 mb-3 leading-snug"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.4rem)' }}>
          Hey <span className="gradient-text italic font-bold">Zuzu</span>,
        </h2>

        {/* Body text */}
        <p
          className="font-crimson text-gray-500 leading-relaxed mb-8"
          style={{ fontSize: 'clamp(1rem, 2.8vw, 1.22rem)' }}
        >
          Before proceeding, Shakkar wanted to ask you a question — please let him know{' '}
          <span className="text-pink-600 font-semibold">
            how much you love him out of 10
          </span>{' '}
          💕
        </p>

        {/* ── Rating buttons ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-5">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <motion.button
              key={n}
              id={`rating-${n}`}
              className="rating-btn"
              onClick={() => handleRating(n)}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + n * 0.045, type: 'spring', stiffness: 280 }}
              whileHover={{ scale: 1.22, y: -4 }}
              whileTap={{ scale: 0.9 }}
              style={
                n === 10
                  ? {
                      background: 'linear-gradient(135deg, #e91e63, #f06292)',
                      color: '#fff',
                      border: 'none',
                      boxShadow: '0 5px 20px rgba(233,30,99,0.42)',
                    }
                  : {}
              }
            >
              {n}
            </motion.button>
          ))}
        </div>

        {/* Hint */}
        <p className="font-inter text-pink-400 mt-1" style={{ fontSize: '0.8rem' }}>
          (psst&hellip; only the right answer moves forward 😉)
        </p>
      </motion.div>

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Celebration overlay ── */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(252,228,236,0.98) 0%, rgba(248,187,208,0.98) 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Scattered emojis */}
            {['💕','🎉','🌸','✨','💖','🥳','🌹','💗'].map((e, i) => (
              <motion.span
                key={i}
                className="fixed select-none"
                style={{
                  left: `${8 + i * 11}%`,
                  top: `${8 + (i % 3) * 28}%`,
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ opacity: 1, scale: 1.4, rotate: 360 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                {e}
              </motion.span>
            ))}

            {/* Lines */}
            <div className="relative z-10 flex flex-col gap-3">
              {celebLines.slice(0, celebLine + 1).map((line, idx) => (
                <motion.p
                  key={idx}
                  className="font-dancing text-pink-600"
                  style={{
                    fontSize: idx === 0
                      ? 'clamp(2.2rem, 9vw, 4.5rem)'
                      : 'clamp(1.5rem, 5vw, 2.8rem)',
                  }}
                  initial={{ opacity: 0, scale: 0.7, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 220 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
