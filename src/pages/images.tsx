import { NextSeo } from 'next-seo';
import Image from 'next/image';

import { PageLayout } from '../components/PageLayout';
import { travelImages } from '../images/travel';
import { buildOpenGraphUrl } from '../lib/og';

const seoTitle = 'Images';
const seoDescription = 'Photos from Japan, Switzerland and closer to home.';

export default function Images() {
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
        intro="Photos I have taken along the way — Tokyo, Kyoto and Osaka, CERN and Switzerland, and the occasional cat. Shown in full, uncropped."
      >
        {/* A columns-based masonry: each photo keeps its own aspect ratio, so portraits and
            wide panoramas both appear whole rather than being cropped to a common shape. */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {travelImages.map(({ img, title, alt }) => (
            <figure
              key={img.src}
              className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10"
            >
              <Image
                src={img}
                alt={alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 21rem, (min-width: 640px) 45vw, 90vw"
                className="w-full h-auto transition duration-300 motion-safe:group-hover:scale-[1.03]"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-2 pt-8 font-mono text-xs font-medium text-white">
                {title}
              </figcaption>
            </figure>
          ))}
        </div>
      </PageLayout>
    </>
  );
}
