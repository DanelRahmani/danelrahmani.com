import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import React from 'react';

const MAX_PULL_PX = 6;

/**
 * Wraps a single element with a gentle magnetic pull toward the cursor,
 * springing back on leave. Motion values only (no state per pointer move),
 * mouse pointers only, and inert under reduced motion. Reserved for the
 * hero's primary call to action; a page of magnets is a page of noise.
 */
export const MagneticButton = ({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const reduceMotion = useReducedMotion();

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_PULL_PX, Math.min(MAX_PULL_PX, offsetX * 0.2)));
    y.set(Math.max(-MAX_PULL_PX, Math.min(MAX_PULL_PX, offsetY * 0.2)));
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className ?? 'inline-block'}
    >
      {children}
    </motion.div>
  );
};
