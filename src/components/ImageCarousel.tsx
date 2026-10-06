'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  sizes?: string;
  className?: string;
}

/**
 * A project screenshot carousel: starts blurred and sharpens on scroll like a
 * single image, but when there's more than one screenshot it also shows
 * left/right arrow buttons (plus dots) to step through them with a crossfade.
 */
export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, sizes, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { filter, opacity } = useScrollReveal(ref);
  const [index, setIndex] = useState(0);

  const hasMultiple = images.length > 1;
  const current = images[index];

  const goPrev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div ref={ref} className={`relative group/carousel ${className}`}>
      <motion.div style={{ filter, opacity }} className="relative w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="w-full h-auto"
              sizes={sizes}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {hasMultiple && (
        <>
          {/* Left / Right navigation */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous screenshot"
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-sm border border-white/15 opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next screenshot"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-sm border border-white/15 opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Position dots */}
          <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
