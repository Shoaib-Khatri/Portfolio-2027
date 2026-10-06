'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollBlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
}

/**
 * An image that starts blurred and sharpens as the user scrolls it into view,
 * used to reveal a project screenshot after the previous one.
 */
export const ScrollBlurImage: React.FC<ScrollBlurImageProps> = ({
  src,
  alt,
  width,
  height,
  sizes,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { filter, opacity } = useScrollReveal(ref);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ filter, opacity }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          sizes={sizes}
        />
      </motion.div>
    </div>
  );
};
