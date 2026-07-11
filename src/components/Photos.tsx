import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { travelImages } from '../images/travel';

const ChevronIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-5 w-5 stroke-zinc-500 group-hover:stroke-primary dark:stroke-zinc-400"
  >
    <path
      d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
      fill="none"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Photo = ({
  img,
  title,
  alt,
  idx,
}: {
  img: StaticImageData;
  title: string;
  alt: string;
  idx: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div
      key={img.src}
      initial={{ scale: 1, opacity: 0 }}
      whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.2 } }}
      whileInView={{ opacity: 1, transition: { delay: idx / 100 } }}
      viewport={{ once: true }}
      onHoverStart={() => setIsVisible(true)}
      onHoverEnd={() => setIsVisible(false)}
      className={clsx(
        'relative aspect-[9/10] w-44 flex-none snap-start overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800',
      )}
    >
      <Image
        src={img}
        alt={alt}
        sizes="(min-width: 640px) 18rem, 11rem"
        className="absolute inset-0 h-full w-full object-cover"
        placeholder="blur"
      />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full bg-gradient-to-t from-black/75 via-black/0 flex items-end"
          >
            <h3 className="px-3 py-2 font-mono text-xs font-bold">{title}</h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ScrollButton = ({
  direction,
  disabled,
  onClick,
}: {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === 'left' ? 'Show previous photos' : 'Show more photos'}
    className={clsx(
      'group pointer-events-auto hidden h-10 w-10 items-center justify-center rounded-full',
      'bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur',
      'transition hover:ring-zinc-900/10 dark:bg-zinc-800/90 dark:ring-white/10',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      'disabled:pointer-events-none disabled:opacity-0 sm:flex',
    )}
  >
    <ChevronIcon direction={direction} />
  </button>
);

export const Photos = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // A 1px tolerance keeps the end buttons from flickering on fractional scroll offsets.
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    window.addEventListener('resize', updateScrollState);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Advance by a viewport of photos, leaving one card visible for continuity.
    const amount = Math.max(el.clientWidth * 0.8, 176);

    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="relative my-8">
      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="hide-scrollbar -my-4 flex snap-x snap-mandatory gap-8 overflow-x-auto overflow-y-hidden py-4 px-8"
      >
        {travelImages.map((travelImage, index) => (
          <Photo
            key={travelImage.img.src}
            img={travelImage.img}
            title={travelImage.title}
            alt={travelImage.alt}
            idx={index}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4">
        <ScrollButton direction="left" disabled={!canScrollLeft} onClick={() => scroll('left')} />
        <ScrollButton direction="right" disabled={!canScrollRight} onClick={() => scroll('right')} />
      </div>
    </div>
  );
};
