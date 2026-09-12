'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import CustomCursor from './components/CustomCursor';

const FloatingPetals = dynamic(() => import('./components/FloatingPetals'), { ssr: false });
const Phase1 = dynamic(() => import('./components/Phase1'), { ssr: false });
const Phase2 = dynamic(() => import('./components/Phase2'), { ssr: false });
const Phase3 = dynamic(() => import('./components/Phase3'), { ssr: false });
const Phase4 = dynamic(() => import('./components/Phase4'), { ssr: false });
const Phase5 = dynamic(() => import('./components/Phase5'), { ssr: false });

export default function Home() {
  const [phase, setPhase] = useState(1);
  const goNext = () => setPhase((p) => Math.min(p + 1, 5));

  return (
    <main style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <CustomCursor />
      
      {/* ── High-Performance Ambient Background ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(244,143,177,0.4) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(206,147,216,0.3) 0%, transparent 60%), linear-gradient(135deg, #fce4ec 0%, #fdf6f0 50%, #fce4ec 100%)',
        }}
      />

      {/* ── Floating petals ── */}
      <FloatingPetals />

      {/* ── Phase content ── */}
      <AnimatePresence mode="wait">
        {phase === 1 && <Phase1 key="phase1" onNext={goNext} />}
        {phase === 2 && <Phase2 key="phase2" onNext={goNext} />}
        {phase === 3 && <Phase3 key="phase3" onNext={goNext} />}
        {phase === 4 && <Phase4 key="phase4" onNext={goNext} />}
        {phase === 5 && <Phase5 key="phase5" />}
      </AnimatePresence>

      {/* ── Phase progress indicator ── */}
      <div
        role="progressbar"
        aria-label={`Step ${phase} of 5`}
        aria-valuenow={phase}
        aria-valuemin={1}
        aria-valuemax={5}
        style={{
          position: 'fixed',
          bottom: '18px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 40,
          pointerEvents: 'none',
          padding: '8px 16px',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(12px)',
          borderRadius: '50px',
          border: '1px solid rgba(255,255,255,0.75)',
          boxShadow: '0 2px 12px rgba(233,30,99,0.10)',
        }}
      >
        {[1, 2, 3, 4, 5].map((p) => (
          <div
            key={p}
            style={{
              height: 8,
              borderRadius: 4,
              width: phase === p ? 28 : 8,
              background: phase >= p ? '#e91e63' : 'rgba(233,30,99,0.22)',
              transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />
        ))}
      </div>
    </main>
  );
}
