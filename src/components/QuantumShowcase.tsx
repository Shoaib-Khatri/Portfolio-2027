'use client';

import React from 'react';
import { ImageCarousel } from './ImageCarousel';

export const QuantumShowcase: React.FC = () => {
  return (
    <div
      className="relative w-full rounded-sm overflow-hidden shadow-2xl p-3 sm:p-5 md:p-7 border border-white/10"
      style={{
        background: 'linear-gradient(135deg, #0f2f2c 0%, #0d5c52 45%, #2fa88f 75%, #bfe6c8 100%)',
      }}
    >
      {/* Texture grain overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/noisy.png")',
        }}
      />

      {/* Screenshots — starts blurred, sharpens on scroll; arrows step between views */}
      <ImageCarousel
        className="relative w-full rounded-sm overflow-hidden shadow-2xl border border-zinc-200/20"
        sizes="(min-width: 1024px) 70vw, 100vw"
        images={[
          {
            src: '/hero-image-03.webp',
            alt: "Quantum2 admin panel showing an employee's attendance details, check-in locations, and punctuality breakdown",
            width: 1200,
            height: 904,
          },
          {
            src: '/hero-image-04.webp',
            alt: 'Quantum2 employee self-service dashboard for daily check-in, check-out, and attendance history',
            width: 1200,
            height: 904,
          },
        ]}
      />
    </div>
  );
};
