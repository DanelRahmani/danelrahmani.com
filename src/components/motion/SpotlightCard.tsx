import clsx from 'clsx';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import React from 'react';

/**
 * A card whose border lights up with a cursor-tracked raspberry/maroon
 * highlight. The gradient layer sits behind an inset content panel, so only
 * a ~1px ring of it shows along the edge. Pointer position drives motion
 * values directly (no React state per move). Touch and reduced-motion
 * visitors get the static hairline border only.
 *
 * Used exactly once on the site (the home Axiom Digital section) on purpose;
 * repeated spotlights stop reading as a highlight.
 */
export const SpotlightCard = ({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glow = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, var(--spotlight-color), transparent 70%)`;

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    glow.set(1);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={() => glow.set(0)}
      className={clsx('card-shadow relative rounded-2xl', className)}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight, opacity: glow }}
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl border border-primary/15 dark:border-dark-accent/20"
      />
      {/* Opaque panel a step deeper than the page ground, so the card reads
          as its own surface; it also masks the spotlight gradient everywhere
          except the ~1px border ring. */}
      <div className="panel relative m-px rounded-[calc(1rem-1px)]">{children}</div>
    </div>
  );
};
