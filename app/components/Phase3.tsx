'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
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
                className={`image-grid-item ${isSel ? 'selected' : ''}`}
                onClick={() => toggle(id)}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.055, type: 'spring', stiffness: 220 }}
                whileTap={{ scale: 0.94 }}
                style={{ borderRadius: '14px', overflow: 'hidden', position: 'relative', aspectRatio: '1' }}
              >
                {/* Image / placeholder */}
                {!isErr ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/images/zuzu${id}.jpg`}
                    alt={`Zuzu ${id}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={() => setImgErrors((p) => new Set([...p, id]))}
                  />
                ) : (
                  <div
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
                  >
                    <span style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)' }}>{emojis[i]}</span>
                    <span
                      className="font-inter font-semibold"
                      style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.88)' }}
                    >
                      zuzu{id}.jpg
                    </span>
                  </div>
                )}

                {/* Selected overlay + tick */}
                <AnimatePresence>
                  {isSel && (
                    <motion.div
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(233,30,99,0.17)',
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
                        padding: '7px',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        style={{
                          width: 26, height: 26, borderRadius: '50%',
                          background: '#e91e63',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 420 }}
                      >
                        <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700, lineHeight: 1 }}>✓</span>
                      </motion.div>
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
            width: '100%', height: 6, borderRadius: 3,
            background: '#fce4ec', overflow: 'hidden', marginBottom: '20px',
          }}
        >
          <motion.div
            style={{
              height: '100%', borderRadius: 3,
              background: 'linear-gradient(90deg,#e91e63,#f06292)',
            }}
            animate={{ width: `${(selected.size / TOTAL) * 100}%` }}
            transition={{ type: 'spring', stiffness: 180 }}
          />
        </div>

        {/* Verify button */}
        <div className="text-center">
          <motion.button
            id="verify-btn"
            className="btn-yes"
            onClick={handleVerify}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            Verify ✨
          </motion.button>
        </div>
      </motion.div>

      {/* ── Popup ── */}
      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-6"
            style={{
              background: 'rgba(252,228,236,0.78)',
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`glass-card rounded-3xl text-center ${
                popup.type === 'success' ? 'border-2 border-pink-400' : 'border-2 border-pink-300'
              }`}
              style={{ padding: 'clamp(28px, 5vw, 48px)', maxWidth: '400px', width: '100%' }}
              initial={{ scale: 0.72, y: 32 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.82, y: 18 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '14px' }}>
                {popup.type === 'success' ? '🎉' : '🥺'}
              </div>
              <p
                className="font-playfair text-gray-700 leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 3vw, 1.18rem)' }}
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
                      animate={{ y: [0, -10, 0] }}
                      transition={{ delay: i * 0.14, duration: 1.1, repeat: Infinity }}
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
