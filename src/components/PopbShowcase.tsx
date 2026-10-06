'use client';

import React from 'react';
import { ImageCarousel } from './ImageCarousel';

export const PopbShowcase: React.FC = () => {
  return (
    <div
      className="relative w-full rounded-sm overflow-hidden shadow-2xl p-3 sm:p-5 md:p-7 border border-white/10"
      style={{
        background: 'linear-gradient(135deg, #1c2b3a 0%, #2c4a5e 40%, #5fc9c1 75%, #dff3ee 100%)',
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
            src: '/hero-image-06.webp',
            alt: 'Popb digital business card app hero showing shareable contact cards and a mobile card preview',
            width: 1200,
            height: 904,
          },
          {
            src: '/hero-image-07.webp',
            alt: 'Grid of Popb digital business card designs shown across multiple phone mockups',
            width: 1200,
            height: 899,
          },
        ]}
      />
    </div>
  );
};
