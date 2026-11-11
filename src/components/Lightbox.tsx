import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

export type LightboxPhoto = { img: StaticImageData; title: string; alt: string };

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 stroke-white">
    <path
      d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
      fill="none"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 stroke-white">
    <path d="M6 6l12 12M18 6L6 18" fill="none" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

// Solid enough to stay legible over a bright photo as well as a dark one.
const overlayButton =
  'pointer-events-auto flex h-11 w-11 flex-none items-center justify-center rounded-full bg-black/60 shadow-lg ring-1 ring-white/25 backdrop-blur transition hover:bg-black/80 hover:ring-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-25 disabled:hover:bg-black/60 disabled:hover:ring-white/25';

/** The shared look for text floating on top of a photograph. */
export const photoPill =
  'rounded-full bg-black/60 px-3 py-1 font-mono text-xs font-medium text-white shadow-lg ring-1 ring-white/20 backdrop-blur';

// Photos slide in from the side the visitor is heading toward; the exit
// drifts the opposite way and stays subtler than the enter.
const photoVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 24, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -12 }),
};

/**
 * Full-screen photo viewer shared by the images page and the home photo
 * strip. Render it inside <AnimatePresence> so it can fade out on close.
 */
export const Lightbox = ({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: readonly LightboxPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(0);
  const photo = photos[index];

  const goPrevious = useCallback(() => {
    if (index > 0) {
      setDirection(-1);
      onNavigate(index - 1);
    }
  }, [index, onNavigate]);

  const goNext = useCallback(() => {
    if (index < photos.length - 1) {
      setDirection(1);
      onNavigate(index + 1);
    }
  }, [index, onNavigate, photos.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goPrevious();
      if (event.key === 'ArrowRight') goNext();
    };

    window.addEventListener('keydown', onKeyDown);
    // Stop the page behind the lightbox from scrolling while it is open.
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose, goPrevious, goNext]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title}, photo ${index + 1} of ${photos.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
    >
      <div className="pointer-events-none flex items-center justify-between p-4">
        <span className={photoPill}>
          {index + 1} / {photos.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={overlayButton}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Clicking the backdrop closes; clicking the photo itself should not. */}
      <div
        className="flex min-h-0 flex-1 items-center gap-2 px-2 sm:gap-4 sm:px-4"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Previous photo"
          onClick={goPrevious}
          disabled={index === 0}
          className={overlayButton}
        >
          <ArrowIcon direction="left" />
        </button>

        <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={photo.img.src}
              variants={photoVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-0 max-w-full items-center justify-center"
            >
              <Image
                src={photo.img}
                alt={photo.alt}
                placeholder="blur"
                sizes="90vw"
                className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
              />
            </motion.div>
          </AnimatePresence>
          <figcaption className={photoPill}>{photo.title}</figcaption>
        </figure>

        <button
          type="button"
          aria-label="Next photo"
          onClick={goNext}
          disabled={index === photos.length - 1}
          className={overlayButton}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div className="h-8" />
    </motion.div>
  );
};
