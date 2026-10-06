'use client';

import React from 'react';
import { ScrollBlurImage } from './ScrollBlurImage';

export const IBricksShowcase: React.FC = () => {
  return (
    <div
      className="relative w-full rounded-sm overflow-hidden shadow-2xl p-3 sm:p-5 md:p-7 border border-white/10"
      style={{
        background: 'linear-gradient(125deg, #148A9C 0%, #2CB1BF 28%, #5FD4D0 52%, #F6C865 82%, #F19237 100%)',
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
        src="/hero-image.webp"
        alt="iBricks contractor operating system dashboard showing active projects, contract value trends, and a mobile project overview screen"
        width={1200}
        height={903}
        sizes="(min-width: 1024px) 70vw, 100vw"
        className="relative w-full rounded-sm overflow-hidden shadow-2xl border border-zinc-200/20"
      />
    </div>
  );
};
