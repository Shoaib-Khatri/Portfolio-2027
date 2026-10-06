'use client';

import React from 'react';
import { ScrollBlurImage } from './ScrollBlurImage';

export const ApexInsightsShowcase: React.FC = () => {
  return (
    <div
      className="relative w-full rounded-sm overflow-hidden shadow-2xl p-4 sm:p-6 md:p-8 border border-white/10"
      style={{
        background: 'linear-gradient(135deg, #CFE8F3 0%, #D8EDF7 35%, #EAF5FA 70%, #F5F9FA 100%)',
      }}
    >
      {/* Texture grain overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/noisy.png")',
        }}
      />

      {/* Product Screenshot — starts blurred, sharpens on scroll */}
      <ScrollBlurImage
        src="/hero-image-02.webp"
        alt="Apex Infrastructure tender insights dashboard showing total bids, amount bid, win rate, bidding trends, and winning regions"
        width={1200}
        height={903}
        sizes="(min-width: 1024px) 70vw, 100vw"
        className="relative w-full rounded-sm overflow-hidden shadow-xl border border-zinc-200/40"
      />
    </div>
  );
};
