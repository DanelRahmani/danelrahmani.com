import { AnimatePresence, motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { PageLayout } from '../components/PageLayout';
import { travelImages } from '../images/travel';
import { buildOpenGraphUrl } from '../lib/og';

const seoTitle = 'Images';
const seoDescription = 'Photos from Japan, Switzerland and closer to home.';

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

// The shared look for text floating on top of a photograph.
const pill =
  'rounded-full bg-black/60 px-3 py-1 font-mono text-xs font-medium text-white shadow-lg ring-1 ring-white/20 backdrop-blur';

const Lightbox = ({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = travelImages[index];

  const goPrevious = useCallback(() => {
    if (index > 0) onNavigate(index - 1);
  }, [index, onNavigate]);

  const goNext = useCallback(() => {
    if (index < travelImages.length - 1) onNavigate(index + 1);
  }, [index, onNavigate]);

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
      aria-label={`${photo.title} — photo ${index + 1} of ${travelImages.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
    >
      <div className="pointer-events-none flex items-center justify-between p-4">
        <span className={pill}>
          {index + 1} / {travelImages.length}
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
          <Image
            key={photo.img.src}
            src={photo.img}
            alt={photo.alt}
            placeholder="blur"
            sizes="90vw"
            className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
          />
          <figcaption className={pill}>{photo.title}</figcaption>
        </figure>

        <button
          type="button"
          aria-label="Next photo"
          onClick={goNext}
          disabled={index === travelImages.length - 1}
          className={overlayButton}
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div className="h-8" />
    </motion.div>
  );
};

export default function Images() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/images`}
        openGraph={{
          images: [{ url: buildOpenGraphUrl({ title: seoTitle, description: seoDescription }) }],
        }}
      />
      <PageLayout
        title="Images"
        intro="Photos I have taken along the way — Tokyo, Kyoto and Osaka, CERN, Geneva and Bern, and the occasional cat. Click any of them to see it larger."
      >
        {/* A columns masonry: every photo keeps its own aspect ratio, so the wide shots and the
            upright ones both appear whole rather than cropped to a common shape. */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {travelImages.map(({ img, title, alt }, index) => (
            <figure key={img.src} className="mb-5 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`View ${title} larger`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-zinc-800 dark:ring-white/10"
              >
                <Image
                  src={img}
                  alt={alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 21rem, (min-width: 640px) 45vw, 90vw"
                  className="h-auto w-full transition duration-300 motion-safe:group-hover:scale-[1.03]"
                />
                <span className={`pointer-events-none absolute bottom-3 left-3 right-3 w-fit max-w-[calc(100%-1.5rem)] truncate text-left ${pill}`}>
                  {title}
                </span>
              </button>
            </figure>
          ))}
        </div>
      </PageLayout>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
