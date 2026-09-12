'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

interface Phase3Props {
  onNext: () => void;
}

const TOTAL = 9;

const gradients = [
  'linear-gradient(135deg,#f48fb1,#fce4ec)',
  'linear-gradient(135deg,#ce93d8,#f3e5f5)',
  'linear-gradient(135deg,#ffab91,#ffddd2)',
  'linear-gradient(135deg,#f48fb1,#fce4ec)',
  'linear-gradient(135deg,#ef9a9a,#fce4ec)',
  'linear-gradient(135deg,#f06292,#f8bbd0)',
  'linear-gradient(135deg,#ba68c8,#e1bee7)',
  'linear-gradient(135deg,#ff80ab,#ffd7e9)',
  'linear-gradient(135deg,#e91e63,#f48fb1)',
];
const emojis = ['🌸', '🌺', '💕', '🌹', '💖', '🌷', '✨', '💗', '🥰'];

export default function Phase3({ onNext }: Phase3Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const [popup, setPopup] = useState<{ type: 'error' | 'success'; msg: string } | null>(null);
  const [shuffledIds, setShuffledIds] = useState<number[]>([]);

  useEffect(() => {
    const ids = Array.from({ length: TOTAL }, (_, i) => i + 1);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setShuffledIds(ids);
  }, []);

  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleVerify = () => {
    if (selected.size < TOTAL) {
      setPopup({
        type: 'error',
        msg: `Please select all the images of Zuzu! 🥺  (${selected.size}/${TOTAL} selected)`,
      });
      setTimeout(() => setPopup(null), 3000);
    } else {
      setPopup({
        type: 'success',
        msg: "Yes! All these images are officially Zuzu's images! 💕✨",
      });
      setTimeout(onNext, 2800);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative z-10 px-4 py-6"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.65, type: 'spring', stiffness: 95 }}
    >
      {/* ── Main card — scrollable if needed ── */}
      <TiltCard>
        <motion.div
          className="glass-card rounded-3xl w-full"
          style={{
            maxWidth: '560px',
            padding: 'clamp(20px, 4vw, 40px)',
            maxHeight: 'calc(100dvh - 48px)',
            overflowY: 'auto',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {/* Header */}
          <div className="text-center mb-5">
            <motion.div
              className="text-4xl mb-3 select-none"
              animate={{ y: [0, -8, 0], scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              🔍
            </motion.div>

            <p
              className="font-inter text-pink-400 uppercase tracking-widest mb-2"
              style={{ fontSize: '0.7rem', fontWeight: 600 }}
            >
              ✨ CAPTCHA Challenge ✨
            </p>

            <h2
              className="font-playfair text-gray-700 mb-1 leading-snug"
              style={{ fontSize: 'clamp(1.4rem, 5vw, 2.1rem)' }}
            >
              Select{' '}
              <span className="gradient-text italic font-bold">all</span>{' '}
              the images of Zuzu
            </h2>

            {/* Progress count */}
            <p className="font-inter text-gray-400 mt-1" style={{ fontSize: '0.82rem' }}>
              {selected.size}/{TOTAL} selected
            </p>
          </div>

          {/* ── 3 × 3 image grid ── */}
          <div
            className="grid gap-2.5 mb-5"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            {shuffledIds.map((id, i) => {
              const isSel = selected.has(id);
              const isErr = imgErrors.has(id);

              return (
                <motion.div
                  key={id}
                  id={`image-cell-${id}`}
                  className={`image-grid-item cursor-pointer`}
                  onClick={() => toggle(id)}
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.055, type: 'spring', stiffness: 220 }}
                  whileHover={{ scale: 1.05, zIndex: 10, boxShadow: '0 10px 25px rgba(233,30,99,0.3)' }}
                  whileTap={{ scale: 0.94 }}
                  style={{ borderRadius: '14px', overflow: 'hidden', position: 'relative', aspectRatio: '1' }}
                >
                  {/* Image / placeholder */}
                  {!isErr ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <motion.img
                      src={`/images/zuzu${id}.jpg`}
                      alt={`Zuzu ${id}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={() => setImgErrors((p) => new Set([...p, id]))}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <motion.div
                      style={{
                        background: gradients[i],
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)' }}>{emojis[i]}</span>
                      <span
                        className="font-inter font-semibold"
                        style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.88)' }}
                      >
                        zuzu{id}.jpg
                      </span>
                    </motion.div>
                  )}

                  {/* Selected overlay + tick */}
                  <AnimatePresence>
                    {isSel && (
                      <motion.div
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(233,30,99,0.25)',
                          backdropFilter: 'blur(2px)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          style={{
                            width: 44, height: 44, borderRadius: '50%',
                            background: '#e91e63',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 15px rgba(233,30,99,0.5)',
                          }}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                        >
                          <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700 }}>✓</span>
                        </motion.div>
                        
                        {/* Stardust burst */}
                        {[...Array(6)].map((_, idx) => (
                          <motion.div
                            key={idx}
                            style={{
                              position: 'absolute',
                              width: 6, height: 6,
                              borderRadius: '50%',
                              backgroundColor: '#fff',
                              boxShadow: '0 0 8px #e91e63'
                            }}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                            animate={{
                              x: Math.cos((idx * Math.PI * 2) / 6) * 40,
                              y: Math.sin((idx * Math.PI * 2) / 6) * 40,
                              opacity: 0,
                              scale: 1.5
                            }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: '100%', height: 8, borderRadius: 4,
              background: '#fce4ec', overflow: 'hidden', marginBottom: '24px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <motion.div
              style={{
                height: '100%', borderRadius: 4,
                background: 'linear-gradient(90deg,#f48fb1,#e91e63,#f06292)',
                backgroundSize: '200% 100%',
              }}
              animate={{ 
                width: `${(selected.size / TOTAL) * 100}%`,
                backgroundPosition: ['0% 0%', '100% 0%']
              }}
              transition={{ 
                width: { type: 'spring', stiffness: 150 },
                backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
              }}
            />
          </div>

          {/* Verify button */}
          <div className="text-center">
            <motion.button
              id="verify-btn"
              className="btn-yes relative overflow-hidden"
              onClick={handleVerify}
              whileHover={{ scale: 1.06, boxShadow: '0 8px 25px rgba(233,30,99,0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Verify ✨
            </motion.button>
          </div>
        </motion.div>
      </TiltCard>

      {/* ── Popup ── */}
      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-6"
            style={{
              background: 'rgba(252,228,236,0.78)',
              backdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`glass-card rounded-3xl text-center ${
                popup.type === 'success' ? 'border-2 border-pink-400' : 'border-2 border-pink-300'
              }`}
              style={{ padding: 'clamp(28px, 5vw, 48px)', maxWidth: '400px', width: '100%', boxShadow: '0 25px 50px -12px rgba(233,30,99,0.25)' }}
              initial={{ scale: 0.72, y: 32 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.82, y: 18 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div 
                style={{ fontSize: '3rem', marginBottom: '14px' }}
                animate={popup.type === 'success' ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {popup.type === 'success' ? '🎉' : '🥺'}
              </motion.div>
              <p
                className="font-playfair text-gray-700 leading-relaxed font-semibold"
                style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)' }}
              >
                {popup.msg}
              </p>
              {popup.type === 'success' && (
                <motion.div
                  className="flex justify-center gap-2 mt-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  {['💕', '🌸', '✨', '💖', '🌺'].map((e, i) => (
                    <motion.span
                      key={i}
                      style={{ fontSize: '1.5rem' }}
                      animate={{ y: [0, -12, 0], rotate: [0, 15, -15, 0] }}
                      transition={{ delay: i * 0.14, duration: 1.5, repeat: Infinity }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
