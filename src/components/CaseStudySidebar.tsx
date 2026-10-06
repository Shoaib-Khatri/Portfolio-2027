'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CaseStudy, Testimonial } from '@/types';

interface CaseStudySidebarProps {
  caseStudies: CaseStudy[];
  activeStudyId: string;
  onSelectStudy: (id: string) => void;
  testimonials: Testimonial[];
  testimonialIndex: number;
  onPrevTestimonial: () => void;
  onNextTestimonial: () => void;
}

export const CaseStudySidebar: React.FC<CaseStudySidebarProps> = ({
  caseStudies,
  activeStudyId,
  onSelectStudy,
  testimonials,
  testimonialIndex,
  onPrevTestimonial,
  onNextTestimonial,
}) => {
  const currentTestimonial = testimonials[testimonialIndex];
  const activeIndex = Math.max(0, caseStudies.findIndex((s) => s.id === activeStudyId));
  const activeStudy = caseStudies[activeIndex] ?? caseStudies[0];

  return (
    <div className="w-full flex flex-col justify-between space-y-12 lg:space-y-16 pr-0 lg:pr-1">

      {/* Active Case Study Detail — swaps smoothly as the user scrolls between projects */}
      <div>
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h3 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500">
            Selected Case Study
          </h3>
          <span className="text-[11px] font-mono tabular-nums text-zinc-600">
            {String(activeIndex + 1).padStart(2, '0')} / {String(caseStudies.length).padStart(2, '0')}
          </span>
        </div>

        <div className="min-h-[230px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStudy.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              <span className="text-xs sm:text-sm font-medium tracking-wide text-zinc-500">
                {activeStudy.year}
              </span>

              <div className="flex items-center gap-1.5">
                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {activeStudy.title}
                </h4>
                <span className="text-lg text-cyan-400 translate-x-0.5 -translate-y-0.5">↗</span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-zinc-300">
                {activeStudy.subtitle}
              </p>

              <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-400 font-normal pt-1">
                {activeStudy.tagline}
              </p>

              {activeStudy.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-medium text-zinc-300 bg-zinc-800/80 rounded border border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Link to deep-dive project case study page */}
              <div className="pt-3">
                <a
                  href={`/project/${activeStudy.id === 'ibricks' ? 'ibricks' : 'sync-space'}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors group/link"
                >
                  <span>Explore Case Study</span>
                  <span className="text-xs transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots — click to jump straight to a project */}
        <div className="flex items-center gap-2 pt-8">
          {caseStudies.map((study) => {
            const isActive = study.id === activeStudyId;
            return (
              <button
                key={study.id}
                type="button"
                onClick={() => onSelectStudy(study.id)}
                aria-label={`View ${study.title}`}
                aria-current={isActive}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'w-7 bg-cyan-400' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Hear What They Say Section */}
      <div className="pt-6 border-t border-zinc-900">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-zinc-500">
            Hear What They Say
          </h3>

          {/* Slider Pagination Controls */}
          <div className="flex items-center gap-1.5">
            <button
              id="testimonial-prev-btn"
              onClick={onPrevTestimonial}
              aria-label="Previous testimonial"
              className="p-1.5 rounded bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={onNextTestimonial}
              aria-label="Next testimonial"
              className="p-1.5 rounded bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Animated Testimonial Card */}
        <div className="min-h-[190px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 text-xs sm:text-[13px] leading-relaxed text-zinc-400"
            >
              <div
                className="space-y-3 font-normal"
                dangerouslySetInnerHTML={{ __html: currentTestimonial.quote }}
              />

              <div className="pt-2 text-[11px] text-zinc-500 font-medium">
                <span className="text-zinc-300 font-semibold">{currentTestimonial.author}</span>
                {' — '}
                <span>{currentTestimonial.role}</span>, {currentTestimonial.company}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};
