import clsx from 'clsx';
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, useState } from 'react';

import { milestones } from '../../data/home';

/**
 * The start page's timeline: one basting stitch that sews itself along as
 * the reader scrolls, tying a knot at each milestone and ending on an open
 * stitch (the internship). Horizontal on large screens, vertical below.
 * Scroll drives a clip-path over a static dashed rule, as in ReadingThread;
 * reduced motion gets the finished thread.
 */
export const ThreadSoFar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.3'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const remaining = useTransform(progress, (value) => (1 - value) * 100);
  const clipAcross = useMotionTemplate`inset(-4px ${remaining}% -4px 0)`;
  const clipDown = useMotionTemplate`inset(0 -4px ${remaining}% -4px)`;
  const needleLeft = useTransform(progress, (value) => `${value * 100}%`);
  const needleOpacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  // Knots are tied as the thread passes them. Only the count is state, so a
  // scroll frame re-renders nothing unless a new knot is reached.
  const [reached, setReached] = useState(0);
  useMotionValueEvent(progress, 'change', (value) => {
    const count = milestones.filter((_, index) => value >= index / milestones.length + 0.02).length;
    setReached((previous) => (previous === count ? previous : count));
  });
  const tied = reduceMotion ? milestones.length : reached;

  return (
    <section aria-labelledby="thread-title">
      <h2
        id="thread-title"
        className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100"
      >
        The thread so far
      </h2>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
        One line, sewn as you scroll. The last stitch is still open.
      </p>

      <div ref={ref} className="relative mt-12">
        {/* The stitch itself: across on large screens, down on small ones. */}
        <div aria-hidden="true" className="text-primary dark:text-dark-accent">
          {reduceMotion ? (
            <>
              <div className="absolute inset-x-0 top-[7px] hidden border-t-[1.5px] border-dashed border-current lg:block" />
              <div className="absolute bottom-0 left-[5px] top-0 border-l-[1.5px] border-dashed border-current lg:hidden" />
            </>
          ) : (
            <>
              <motion.div
                style={{ clipPath: clipAcross }}
                className="absolute inset-x-0 top-[7px] hidden border-t-[1.5px] border-dashed border-current lg:block"
              />
              <motion.div
                style={{ clipPath: clipDown }}
                className="absolute bottom-0 left-[5px] top-0 border-l-[1.5px] border-dashed border-current lg:hidden"
              />
              <motion.svg
                viewBox="0 0 46 20"
                fill="none"
                style={{ left: needleLeft, opacity: needleOpacity }}
                className="absolute -top-[3px] hidden h-5 w-[46px] -translate-x-1.5 -rotate-[8deg] lg:block"
              >
                <path d="M2 10H40" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M40 10l5 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <ellipse cx="6.5" cy="10" rx="3" ry="1.4" stroke="currentColor" strokeWidth="1" />
              </motion.svg>
            </>
          )}
        </div>

        <ol className="grid grid-cols-1 gap-7 lg:grid-cols-6 lg:gap-4">
          {milestones.map((milestone, index) => {
            const on = index < tied;
            return (
              <li
                key={milestone.title}
                className={clsx(
                  'relative pl-8 transition duration-500 ease-out lg:pl-0 lg:pt-8',
                  on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                )}
              >
                <span
                  aria-hidden="true"
                  className={clsx(
                    'absolute left-0 top-1 h-[11px] w-[11px] rounded-full border-[1.5px] border-primary transition-colors duration-300 dark:border-dark-accent lg:top-0.5',
                    milestone.open
                      ? 'border-dashed bg-[#FDFBF6] dark:bg-[#0F090E]'
                      : on
                        ? 'bg-primary dark:bg-dark-accent'
                        : 'bg-[#FDFBF6] dark:bg-[#0F090E]',
                  )}
                />
                <p className="font-mono text-xs font-medium text-primary dark:text-dark-accent">
                  {milestone.when}
                </p>
                <h3
                  className={clsx(
                    'mt-1 text-stone-900 dark:text-stone-100',
                    milestone.open
                      ? 'font-serif text-lg italic leading-snug'
                      : 'text-sm font-medium leading-snug',
                  )}
                >
                  {milestone.title}
                </h3>
                {milestone.open ? (
                  <a
                    href="#contact"
                    className="link-thread mt-1 inline-block text-sm font-medium text-primary dark:text-dark-accent"
                  >
                    {milestone.detail}
                  </a>
                ) : (
                  <p className="mt-1 text-[0.8125rem] leading-5 text-stone-600 dark:text-stone-400">
                    {milestone.detail}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
