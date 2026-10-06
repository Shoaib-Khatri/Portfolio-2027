"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Check, X, ZoomIn } from "lucide-react";
import type { ProjectCaseStudy, CaseStudyImage } from "@/data/projectsData";
import { NoiseOverlay } from "@/components/NoiseOverlay";

interface CaseStudyClientViewProps {
  project: ProjectCaseStudy;
}

export const CaseStudyClientView: React.FC<CaseStudyClientViewProps> = ({
  project,
}) => {
  const [activeLightboxImg, setActiveLightboxImg] =
    useState<CaseStudyImage | null>(null);

  const rightColumnRef = useRef<HTMLDivElement>(null);
  const zigzagPatternRef = useRef<SVGPatternElement>(null);
  const zigzagPathRef = useRef<SVGPathElement>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightboxImg(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Tie the zigzag divider's pattern offset to scroll: scrolling down slides
  // the stripe downward, scrolling up slides it back up. The chevrons also
  // flip to point the way you're scrolling, animated via the `d` transition.
  useEffect(() => {
    const scrollEl = rightColumnRef.current;
    const patternEl = zigzagPatternRef.current;
    const pathEl = zigzagPathRef.current;
    if (!scrollEl || !patternEl || !pathEl) return;

    const TILE_HEIGHT = 14;
    const CHEVRON_UP = "M0 14 L16 0 L32 14";
    const CHEVRON_DOWN = "M0 0 L16 14 L32 0";

    let lastScrollTop = scrollEl.scrollTop;
    let direction: "up" | "down" = "down";

    const handleScroll = () => {
      const currentScrollTop = scrollEl.scrollTop;
      const offset = currentScrollTop % TILE_HEIGHT;
      patternEl.setAttribute("patternTransform", `translate(0, ${offset})`);

      const delta = currentScrollTop - lastScrollTop;
      if (delta > 0 && direction !== "down") {
        direction = "down";
        pathEl.setAttribute("d", CHEVRON_DOWN);
      } else if (delta < 0 && direction !== "up") {
        direction = "up";
        pathEl.setAttribute("d", CHEVRON_UP);
      }
      lastScrollTop = currentScrollTop;
    };

    handleScroll();
    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen lg:h-dvh bg-black text-zinc-300 font-sans selection:bg-zinc-800 selection:text-white relative overflow-hidden">
      {/* 70% opacity noise overlay */}
      <NoiseOverlay />

      {/* Background radial highlight matching the portfolio hero glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-zinc-900/40 via-zinc-950/20 to-transparent pointer-events-none rounded-full blur-3xl opacity-50" />

      {/* Main Split Layout Container */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 relative z-10 lg:h-full">
        <div className="flex flex-col lg:flex-row lg:h-full items-start justify-between gap-6 sm:gap-8 lg:gap-0">
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: Pinned / Static Sticky in Viewport                          */}
          {/* ========================================================================= */}
          <aside className="w-full lg:w-[34%] xl:w-[30%] shrink-0 lg:h-full lg:overflow-y-auto no-scrollbar self-start border-x border-zinc-700/70 px-4 sm:px-5 lg:px-6 space-y-4 z-20">
            {/* Top Navigation Row: BACK and GO TO PROJECT */}
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-zinc-900/90 hover:bg-zinc-800 text-teal-400 hover:text-teal-300 font-mono-code font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl border border-zinc-800 hover:border-teal-500/40 shadow-xs transition-all active:scale-95"
              >
                <span>BACK</span>
              </Link>

              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-mono-code font-bold text-xs uppercase tracking-wider transition-colors px-2 py-1"
                >
                  <span>GO TO PROJECT</span>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-teal-400 font-mono-code font-bold text-xs uppercase tracking-wider">
                  <span>GO TO PROJECT</span>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </span>
              )}
            </div>

            {/* Title Card: SYNC SPACE */}
            <div className="border border-zinc-700/70 rounded-lg p-6 sm:p-7 shadow-xl backdrop-blur-xl">
              <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-none uppercase">
                {project.title}
              </h1>
            </div>

            {/* Middle Metadata 2-Column Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Sub-column: TIMELINE & COMPANY Stack */}
              <div className="space-y-4 flex flex-col justify-between">
                {/* TIMELINE Card */}
                <div className="border border-zinc-700/70 rounded-lg p-5 shadow-xl flex-1 backdrop-blur-xl">
                  <span className="block text-[11px] font-mono-code font-bold uppercase tracking-widest text-zinc-500">
                    TIMELINE
                  </span>
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-200">
                    <span className="text-teal-400 text-sm leading-none">
                      ✦
                    </span>
                    <span>{project.timeline}</span>
                  </div>
                </div>

                {/* COMPANY Card */}
                <div className="border border-zinc-700/70 rounded-lg p-5 shadow-xl flex-1 backdrop-blur-xl">
                  <span className="block text-[11px] font-mono-code font-bold uppercase tracking-widest text-zinc-500">
                    COMPANY
                  </span>
                  <div className="mt-2.5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-200">
                    <span className="text-teal-400 text-sm leading-none">
                      ✦
                    </span>
                    <span>{project.company}</span>
                  </div>
                </div>
              </div>

              {/* Right Sub-column: QUICK TAGS Card */}
              <div className="border border-zinc-700/70 rounded-lg p-5 shadow-xl flex flex-col backdrop-blur-xl">
                <span className="block text-[11px] font-mono-code font-bold uppercase tracking-widest text-zinc-500 mb-3">
                  QUICK TAGS
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-zinc-200 my-auto">
                  {project.quickTags.map((tag) => (
                    <li key={tag} className="flex items-center gap-1.5">
                      <span className="text-teal-400 text-sm leading-none">
                        ✦
                      </span>
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Card: Next Project Preview (e.g. NOTHING CHALLENGE) */}
            {project.nextProject && (
              <Link
                href={`/project/${project.nextProject.slug}`}
                className="group hover:bg-zinc-900/90 border border-zinc-700/70 hover:border-teal-500/50 rounded-lg p-5 sm:p-6 shadow-xl transition-all duration-200 block backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 text-white group-hover:text-teal-300 transition-colors">
                  <span className="text-teal-400 text-lg font-bold">➔</span>
                  <h3 className="font-display font-black text-base sm:text-lg tracking-wide uppercase">
                    {project.nextProject.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-normal">
                  {project.nextProject.description}
                </p>
              </Link>
            )}
          </aside>

          {/* Zigzag divider: horizontal chevrons stacked down the gap */}
          <div
            className="hidden lg:flex lg:h-full w-8 shrink-0 items-stretch justify-center text-zinc-700/70"
            aria-hidden="true"
          >
            <svg width="32" height="100%" className="overflow-visible">
              <defs>
                <pattern
                  ref={zigzagPatternRef}
                  id="case-study-zigzag"
                  width="32"
                  height="14"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    ref={zigzagPathRef}
                    d="M0 14 L16 0 L32 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transition: "d 0.3s ease" }}
                  />
                </pattern>
              </defs>
              <rect width="32" height="100%" fill="url(#case-study-zigzag)" />
            </svg>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: All Scrolling Content                                       */}
          {/* ========================================================================= */}
          <div
            ref={rightColumnRef}
            className="w-full lg:w-[66%] xl:w-[70%] min-w-0 flex-1 lg:h-full lg:overflow-y-auto lg:overscroll-contain no-scrollbar border-x border-zinc-700/70 px-4 sm:px-5 lg:px-6 space-y-8 sm:space-y-12 lg:space-y-14"
            data-lenis-prevent
          >
            {/* 1. Hero MacBook Mockup Card matching screenshot */}
            <div className="border border-zinc-700/70 rounded-lg p-3 sm:p-5 lg:p-6 shadow-xl flex items-center justify-center overflow-hidden backdrop-blur-xl">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-md overflow-hidden shadow-2xl flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 border border-zinc-800/50">
                <Image
                  src={project.heroImage.src}
                  alt={project.heroImage.alt}
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* 2. Overview Section */}
            <section className=" rounded-lg p-6 sm:p-10 lg:p-12 shadow-xl backdrop-blur-xl">
              <div className="space-y-5">
                <span className="inline-block text-xs font-mono-code font-bold uppercase tracking-widest text-teal-400">
                  {project.overview.kicker}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-display font-bold text-white tracking-tight leading-[1.2]">
                  {project.overview.heading}
                </h2>
                <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed pt-2">
                  {project.overview.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. 7 Feature Showcase Images (Title & Optional Description each) */}
            <section className="space-y-6 sm:space-y-8">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-teal-400">
                    CASE STUDY GALLERY
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight mt-1">
                    Visual Architecture & Production Features
                  </h3>
                </div>
                <span className="text-xs font-mono-code text-zinc-500 hidden sm:inline-block">
                  {project.images.length} FEATURED SCREENS
                </span>
              </div>

              <div className="space-y-8 sm:space-y-12">
                {project.images.map((item, index) => (
                  <article key={item.id} className="group">
                    {/* Image Container with Hover Zoom & Click Lightbox */}
                    <div
                      onClick={() => setActiveLightboxImg(item)}
                      className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-black cursor-pointer shadow-lg group/img border border-zinc-800/60"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover object-center group-hover/img:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 text-white text-xs font-mono-code font-semibold backdrop-blur-md border border-white/10">
                          <ZoomIn className="w-4 h-4 text-teal-400" />
                          <span>Click to enlarge</span>
                        </span>
                      </div>

                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-zinc-200 text-[11px] font-mono-code font-bold uppercase px-3 py-1 rounded-md border border-white/10">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Caption Row: Title & Optional Description */}
                    <div className="mt-5 sm:mt-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1.5 max-w-2xl">
                        <h4 className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-white tracking-tight">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <span className="text-xs font-mono-code font-bold text-zinc-400 shrink-0 self-start md:self-auto px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800">
                        0{index + 1} / 0{project.images.length}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* 4. Bottom Navigation Banner */}
            <section className="border border-zinc-700/70 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-xl">
              <div>
                <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-teal-400">
                  EXPLORE MORE WORK
                </span>
                <h4 className="font-display font-black text-xl text-white mt-1">
                  {project.nextProject
                    ? `Next: ${project.nextProject.title}`
                    : "Return to Portfolio"}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-mono-code font-bold text-xs uppercase tracking-wider border border-zinc-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Case Studies</span>
                </Link>

                {project.nextProject && (
                  <Link
                    href={`/project/${project.nextProject.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono-code font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                  >
                    <span>View Next Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* PHOTO LIGHTBOX MODAL                                                      */}
      {/* ========================================================================= */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black text-white rounded-full p-2 transition-colors cursor-pointer border border-white/10"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full aspect-[16/9] bg-black">
              <Image
                src={activeLightboxImg.src}
                alt={activeLightboxImg.alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-4 sm:p-5 bg-zinc-900 border-t border-zinc-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h5 className="font-display font-bold text-sm sm:text-base text-white">
                  {activeLightboxImg.title}
                </h5>
                {activeLightboxImg.description && (
                  <p className="text-xs text-zinc-400 mt-1 max-w-3xl">
                    {activeLightboxImg.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => setActiveLightboxImg(null)}
                className="self-end sm:self-center px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono-code text-zinc-300 transition-colors cursor-pointer border border-zinc-700"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
