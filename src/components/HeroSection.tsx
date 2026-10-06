'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RahulPortrait } from './RahulPortrait';
import { Check } from 'lucide-react';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = 'rahul@karnekar.design';
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="relative w-full pt-8 sm:pt-12 md:pt-16 pb-6 overflow-hidden flex flex-col items-center">
      {/* Top Meta & Center Photo Header */}
      <div className="w-full max-w-7xl mx-auto px-1.5 sm:px-2 md:px-3">
        <div className="grid grid-cols-3 items-center justify-between gap-4">

          {/* Top Left Metadata */}
          <div className="text-left">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-zinc-400 uppercase leading-relaxed">
              Based in Mumbai,
              <br />
              <span className="text-zinc-500">India</span>
            </p>
          </div>

          {/* Center Portrait Photo */}
          <div className="flex justify-center items-center">
            <RahulPortrait />
          </div>

          {/* Top Right Metadata */}
          <div className="text-right">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-zinc-400 uppercase leading-relaxed">
              Product Designer
              <br />
              <span className="text-zinc-500">Top 3% at Toptal</span>
            </p>
          </div>
        </div>

        {/* Center Bio / Value Proposition */}
        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto text-center px-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-sm sm:text-base md:text-lg lg:text-[19px] font-bold tracking-wide uppercase text-zinc-100 leading-[1.65] font-display">
            Independent product designer working across B2B SaaS, fintech, and AI products, designing experiences that are clear, useful, and thoughtfully crafted.
          </h2>
        </motion.div>

        {/* Action Links */}
        <motion.div
          className="mt-6 sm:mt-8 flex items-center justify-center gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <button
              id="hero-email-btn"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-zinc-200 hover:text-white transition-colors cursor-pointer"
            >
              <span>Email</span>
              <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </button>

            {/* Copied notification toast */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: -28, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute left-1/2 -translate-x-1/2 -top-2 bg-zinc-900 border border-zinc-700 text-white text-[11px] px-2.5 py-1 rounded shadow-xl whitespace-nowrap flex items-center gap-1.5 z-30"
                >
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>rahul@karnekar.design copied!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            id="hero-linkedin-link"
            href="https://linkedin.com/in/rahulkarnekar"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-zinc-200 hover:text-white transition-colors cursor-pointer"
          >
            <span>Linkedin</span>
            <span className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>

          <a
            id="hero-sync-space-link"
            href="/project/sync-space"
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/60 hover:bg-teal-900/80 border border-teal-800/80 text-teal-300 text-xs font-semibold tracking-wide transition-all shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>Sync Space Case Study</span>
            <span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </motion.div>
      </div>

      {/* Massive Display Title Spanning Full Width */}
      <motion.div
        className="w-full mt-10 sm:mt-14 md:mt-16 overflow-hidden select-none border-b border-white/[0.08]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <h1
          className="w-full text-center font-black tracking-tight uppercase leading-[0.88] text-[#F3EFE6] whitespace-nowrap px-2"
          style={{
            fontSize: 'clamp(3rem, 12.8vw, 14.5rem)',
            fontFamily: "'Syne', 'Space Grotesk', -apple-system, sans-serif",
            letterSpacing: '-0.035em',
            textShadow: '0 10px 40px rgba(0,0,0,0.8)'
          }}
        >
          Rahul Karnekar
        </h1>
      </motion.div>
    </section>
  );
};
