import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { RefObject } from 'react';

/**
 * A vertical basting stitch in the article margin that sews itself downward
 * as the reader scrolls: reading progress rendered in the site's thread
 * motif. Scroll drives a clip-path (GPU-friendly, no layout work) over the
 * static dashed rule; a light spring keeps the stitch from feeling glued to
 * the scrollbar. Reduced motion gets the full static rule instead.
 */
export const ReadingThread = ({ target }: { target: RefObject<HTMLElement> }) => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start 0.35', 'end 0.85'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const remaining = useTransform(smoothProgress, (value) => (1 - value) * 100);
  const clip = useMotionTemplate`inset(0 0 ${remaining}% 0)`;

  return (
    <div aria-hidden="true" className="absolute -left-8 top-0 bottom-0 hidden lg:block">
      {reduceMotion ? (
        <div className="seam-l h-full w-0" />
      ) : (
        <motion.div style={{ clipPath: clip }} className="seam-l h-full w-0" />
      )}
    </div>
  );
};
