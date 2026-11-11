import { AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useState } from 'react';

import { Lightbox, photoPill } from '../components/Lightbox';
import { PageLayout } from '../components/PageLayout';
import { travelImages } from '../images/travel';
import { buildOpenGraphUrl } from '../lib/og';

const seoTitle = 'Images';
const seoDescription = 'Photos from Japan, Switzerland and closer to home.';

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
        intro="Photos I have taken along the way: Tokyo, Kyoto and Osaka, CERN, Geneva and Bern, and the occasional cat. Click any of them to see it larger."
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
                <span
                  className={`pointer-events-none absolute bottom-3 left-3 right-3 w-fit max-w-[calc(100%-1.5rem)] truncate text-left ${photoPill}`}
                >
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
            photos={travelImages}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
