import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * The site's signature device: a tailor's basting stitch, drawn in the
 * thread color. `Seam` is the static divider; `StitchUnderline` is the
 * hero variant that sews itself in on first load.
 */
export const Seam = ({ className, draw = false }: { className?: string; draw?: boolean }) => {
  if (!draw) {
    return <hr className={clsx('seam h-0 border-b-0', className)} aria-hidden="true" />;
  }

  // Drawn variant: the stitch sews itself in (left to right) the first time
  // it scrolls into view. clip-path stays off the layout thread, and the
  // MotionConfig reduced-motion wrapper is bypassed here on purpose: we swap
  // to the static rule instead so the seam never arrives clipped.
  return <DrawnSeam className={className} />;
};

const DrawnSeam = ({ className }: { className?: string }) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <hr className={clsx('seam h-0 border-b-0', className)} aria-hidden="true" />;
  }

  return (
    <motion.hr
      aria-hidden="true"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx('seam h-0 border-b-0', className)}
    />
  );
};

export const StitchUnderline = ({ className }: { className?: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 224 6"
      fill="none"
      aria-hidden="true"
      className={clsx('h-1.5 w-56 text-primary dark:text-dark-accent', className)}
    >
      <motion.line
        x1="2"
        y1="3"
        x2="222"
        y2="3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="9 7"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
};
