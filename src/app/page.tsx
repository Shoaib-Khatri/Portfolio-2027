'use client';

import { useState, useEffect, useRef } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { CaseStudySidebar } from '@/components/CaseStudySidebar';
import { IBricksShowcase } from '@/components/IBricksShowcase';
import { ApexInsightsShowcase } from '@/components/ApexInsightsShowcase';
import { QuantumShowcase } from '@/components/QuantumShowcase';
import { PopbShowcase } from '@/components/PopbShowcase';
import { LittleAmpsFooter } from '@/components/LittleAmpsFooter';
import { NoiseOverlay } from '@/components/NoiseOverlay';
import { useLenis } from '@/components/SmoothScroll';
import type { CaseStudy, Testimonial } from '@/types';

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ibricks',
    year: '2024 - Present',
    title: 'iBricks',
    subtitle: 'Contractor Operating System',
    tagline: 'Contractor operating system spanning projects, procurement, billing, approvals, and AI tender intelligence.',
    tags: ['B2B SaaS', 'Design System', 'Mobile App', 'FinTech'],
  },
  {
    id: 'deal-direct',
    year: '2026',
    title: 'Deal Direct',
    subtitle: 'Property Platform UX Audit',
    tagline: 'Pre-launch UX audit for a property platform where trust, verification, and revenue risk met in one flow.',
    tags: ['UX Audit', 'Risk Analysis', 'Analytics', 'Enterprise'],
  },
  {
    id: 'quantum',
    year: '2023 - 2024',
    title: 'Quantum²',
    subtitle: 'Workforce Attendance Platform',
    tagline: 'Admin and self-service attendance system spanning check-in geofencing, punctuality analytics, and leave tracking.',
    tags: ['B2B SaaS', 'Workforce Management', 'Dashboard', 'Analytics'],
  },
  {
    id: 'popb',
    year: '2022 - 2023',
    title: 'Popb',
    subtitle: 'Digital Business Card App',
    tagline: 'Shareable digital business cards with real-time view analytics, letting teams make better connections in one tap.',
    tags: ['Mobile App', 'Consumer', 'Branding', 'Growth'],
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: `“I had the pleasure of working with Rahul on iBricks for over 2.5 years. He <strong class="text-zinc-100 font-bold">completely re-architected our product</strong>, turning a cluttered 15+ module application into a clean, intuitive system.<br/><br/>His design system became the <strong class="text-zinc-100 font-bold">foundation of our entire product stack</strong> and saved our development team months of redundant effort.<br/><br/>What stands out most is that Rahul doesn't just design screens. <strong class="text-zinc-100 font-bold">He thinks in systems, not pixels, and that's rare.</strong>”`,
    highlightWords: ['completely re-architected our product', 'foundation of our entire product stack', 'He thinks in systems, not pixels, and that\'s rare.'],
    author: 'Suresh Patel',
    role: 'Founder & CEO',
    company: 'iBricks',
  },
  {
    id: 'test-2',
    quote: `“Rahul carried out our pre-launch UX audit with surgical precision. He uncovered critical bottlenecks in our property escrow and revenue risk verification flow, <strong class="text-zinc-100 font-bold">reducing user drop-off by 38%</strong> in initial beta pilots.”`,
    highlightWords: ['reducing user drop-off by 38%'],
    author: 'Ananya Sharma',
    role: 'VP of Product',
    company: 'Deal Direct',
  },
  {
    id: 'test-3',
    quote: `“Rahul is in the top tier of design thinkers I have had the privilege to work with. He seamlessly navigates heavy backend architectures, database constraints, and delivers <strong class="text-zinc-100 font-bold">modular, accessible interfaces that scale effortlessly</strong>.”`,
    highlightWords: ['modular, accessible interfaces that scale effortlessly'],
    author: 'Marcus Lindqvist',
    role: 'Design Director',
    company: 'Toptal Core',
  },
  {
    id: 'test-4',
    quote: `“Rahul redesigned our attendance platform end to end, admin panel and employee app alike. <strong class="text-zinc-100 font-bold">Support tickets around attendance disputes dropped by more than half</strong> within the first quarter of launch.”`,
    highlightWords: ['Support tickets around attendance disputes dropped by more than half'],
    author: 'Priya Nair',
    role: 'Head of Product',
    company: 'Quantum²',
  },
  {
    id: 'test-5',
    quote: `“We came to Rahul with a rough idea for a digital business card. He shaped it into <strong class="text-zinc-100 font-bold">a polished, brandable product our users actually enjoy sharing</strong>, and the view-analytics feature he proposed became our top retention driver.”`,
    highlightWords: ['a polished, brandable product our users actually enjoy sharing'],
    author: 'Devraj Shetty',
    role: 'Co-Founder',
    company: 'Popb',
  },
];

// Maps each case study to the testimonial that speaks to it (not a 1:1 positional
// match, since the testimonial list also carries a general Toptal endorsement).
const STUDY_TESTIMONIAL_INDEX: Record<string, number> = {
  ibricks: 0,
  'deal-direct': 1,
  quantum: 3,
  popb: 4,
};

export default function Home() {
  const [activeStudyId, setActiveStudyId] = useState<string>('ibricks');
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);
  const isAutoScrolling = useRef<boolean>(false);
  const lenis = useLenis();

  // Scroll spy: as the user scrolls, detect which project is in view and update left side text content
  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling.current) return;

      // Walk the studies in order; the last one that has crossed the threshold wins.
      let current = CASE_STUDIES[0].id;
      for (const study of CASE_STUDIES) {
        const el = document.getElementById(`project-${study.id}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          current = study.id;
        }
      }

      setActiveStudyId(current);
      setTestimonialIndex(STUDY_TESTIMONIAL_INDEX[current] ?? 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectStudy = (id: string) => {
    setActiveStudyId(id);
    setTestimonialIndex(STUDY_TESTIMONIAL_INDEX[id] ?? 0);

    const targetEl = document.getElementById(`project-${id}`);
    if (!targetEl) return;

    isAutoScrolling.current = true;

    if (lenis) {
      // Route through Lenis so click-navigation eases exactly like wheel scroll does.
      lenis.scrollTo(targetEl, {
        offset: 0,
        duration: 1.6,
        onComplete: () => {
          isAutoScrolling.current = false;
        },
      });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        isAutoScrolling.current = false;
      }, 700);
    }
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-zinc-700 selection:text-white flex flex-col justify-between font-sans">

      {/* 70% opacity noise overlay with pattern specified by prompt */}
      <NoiseOverlay />

      {/* Main Page Content */}
      <div className="relative z-10 w-full flex-1">

        {/* Hero Section (Screenshot 1) */}
        <HeroSection />

        {/* Selected Case Studies & Showcase Container (Screenshots 2 & 3) */}
        <section id="case-studies" className="w-full px-1.5 sm:px-2 md:px-3 lg:px-5 xl:px-7 pt-8 sm:pt-12 pb-14 sm:pb-20">

          <div className="w-full flex flex-col md:flex-row items-start gap-3 lg:gap-5 xl:gap-6 relative">

            {/* Left Column: Fixed / Sticky Case Studies Timeline + Hear What They Say (30%) */}
            <div className="w-full md:w-[26%] shrink-0 md:sticky md:top-8 md:self-start h-fit z-20">
              <CaseStudySidebar
                caseStudies={CASE_STUDIES}
                activeStudyId={activeStudyId}
                onSelectStudy={handleSelectStudy}
                testimonials={TESTIMONIALS}
                testimonialIndex={testimonialIndex}
                onPrevTestimonial={handlePrevTestimonial}
                onNextTestimonial={handleNextTestimonial}
              />
            </div>

            {/* Right Column: Stacked Project Images / Mockups (70%) */}
            <div className="w-full md:w-[74%] min-w-0 flex-1 space-y-24 sm:space-y-32 lg:space-y-40">

              {/* Project 1: iBricks OS & Mobile */}
              <div id="project-ibricks" className="scroll-mt-10 md:scroll-mt-12 w-full">
                <IBricksShowcase />
              </div>

              {/* Project 2: Deal Direct / Apex Tender Insights */}
              <div id="project-deal-direct" className="scroll-mt-10 md:scroll-mt-12 w-full">
                <ApexInsightsShowcase />
              </div>

              {/* Project 3: Quantum² Attendance Platform */}
              <div id="project-quantum" className="scroll-mt-10 md:scroll-mt-12 w-full">
                <QuantumShowcase />
              </div>

              {/* Project 4: Popb Digital Business Card App */}
              <div id="project-popb" className="scroll-mt-10 md:scroll-mt-12 w-full">
                <PopbShowcase />
              </div>

            </div>

          </div>
        </section>

      </div>

      {/* Interactive Retro Little Amps Footer */}
      <LittleAmpsFooter />

    </div>
  );
}
