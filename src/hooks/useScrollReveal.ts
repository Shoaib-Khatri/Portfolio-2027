import { RefObject } from 'react';
import { useScroll, useTransform } from 'motion/react';

/**
 * Shared scroll-linked reveal: given a ref to the element, returns motion
 * values that go from blurred/translucent to sharp/opaque as it scrolls up
 * from the bottom of the viewport into a comfortable reading position.
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'start 40%'],
  });

  const blurAmount = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const filter = useTransform(blurAmount, (v) => `blur(${v}px)`);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return { filter, opacity };
}
