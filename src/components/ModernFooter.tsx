'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Check, Copy, Clock, Globe } from 'lucide-react';

export const ModernFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const istTime = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setCurrentTime(istTime);
      } catch {
        setCurrentTime('12:00 PM');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rahul@karnekar.design');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="portfolio-footer" className="relative w-full bg-black border-t border-zinc-900 text-zinc-400 pt-16 sm:pt-20 pb-12 overflow-hidden">

      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent pointer-events-none rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-1.5 sm:px-2 md:px-3 relative z-10">

        {/* Top CTA Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-zinc-900">
          <div className="space-y-4 max-w-xl">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-medium text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Select Consulting & Design Leadership</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
              Let's design clear, useful, and enduring systems together.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              Specialized in architecting complex B2B platforms, enterprise design systems, and data-dense fintech tooling where precision is non-negotiable.
            </p>
          </div>

          {/* Quick Contact Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="footer-copy-email-btn"
              onClick={handleCopyEmail}
              className="flex items-center justify-between sm:justify-center gap-3 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800/90 text-white text-xs sm:text-sm font-semibold tracking-wide border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer shadow-lg"
            >
              <span>rahul@karnekar.design</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-zinc-400 shrink-0" />
              )}
            </button>

            <a
              id="footer-mail-btn"
              href="mailto:rahul@karnekar.design"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-black text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg"
            >
              <span>Send An Email</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-12 border-b border-zinc-900/80 text-xs">

          {/* Col 1: Specialization */}
          <div className="space-y-3.5">
            <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
              Expertise
            </h5>
            <ul className="space-y-2 text-zinc-400">
              <li>Design Systems Architecture</li>
              <li>B2B SaaS Complex Workflows</li>
              <li>FinTech & Financial Data Vis</li>
              <li>AI Agent Interaction UX</li>
              <li>Full Product Audits & Strategy</li>
            </ul>
          </div>

          {/* Col 2: Case Studies */}
          <div className="space-y-3.5">
            <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
              Work
            </h5>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  iBricks ERP (2024–Present)
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  Deal Direct Property Audit
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  Apex Tender Intelligence
                </a>
              </li>
              <li>
                <span className="text-zinc-600">Enterprise Stealth AI (NDA)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Network & Credentials */}
          <div className="space-y-3.5">
            <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
              Network
            </h5>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a
                  href="https://linkedin.com/in/rahulkarnekar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://toptal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Toptal Verified (Top 3%)</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://read.cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Read.cv</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>X / Twitter</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Timezone */}
          <div className="space-y-3.5">
            <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-300">
              Location
            </h5>
            <div className="space-y-2 text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-zinc-500" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>IST (UTC+5:30) • {currentTime || 'Live'}</span>
              </div>
              <p className="text-[11px] text-zinc-500 pt-1">
                Collaborates globally across PST, EST, and GMT timezones.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Colophon & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© 2026 Rahul Karnekar. All rights reserved.</span>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <span className="text-zinc-400">He thinks in systems, not pixels.</span>
          </div>

          <button
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-zinc-800/80"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
