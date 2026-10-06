import React from 'react';

/**
 * Noise overlay component applying the transparent noise pattern at exactly 70% opacity
 * over the pure #000000 background as specified in the prompt.
 */
export const NoiseOverlay: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-50 overflow-hidden"
      style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/noisy.png")',
        opacity: 0.7,
        mixBlendMode: 'screen',
      }}
    />
  );
};
