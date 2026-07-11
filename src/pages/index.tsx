import { compareDesc } from 'date-fns';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Photos } from '../components/Photos';
import { Resume } from '../components/Resume';
import { SocialLink } from '../components/SocialLink';
import { Seam, StitchUnderline } from '../components/Stitch';
import { MagneticButton } from '../components/motion/MagneticButton';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { NotePreview } from '../components/notes/NotePreview';
import { About, AxiomDigital, Name, SocialMedia } from '../data/lifeApi';
import { Note, notesApi } from '../lib/notesApi';
import { buildOpenGraphUrl } from '../lib/og';

// One orchestrated page-load moment: the name settles in, the stitch sews
// itself underneath, then the introduction and social links follow. The
// MotionConfig wrapper in _app.tsx drops the transforms under reduced motion.
const heroEnter = (delay: number) => ({
  initial: { opacity: 0, y: 14, filter: 'blur(5px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const seoTitle = 'Danel Rahmani';
const seoDescription =
  'Founder of Axiom Digital. International Business student at the University of Groningen, heading to Waseda.';

type Props = {
  latestNotes: Note[];
};

// Person structured data: connects the name to Axiom Digital and the
// social profiles for search engines and knowledge panels.
const personJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Danel Rahmani',
  url: process.env.NEXT_PUBLIC_URL,
  email: 'mailto:danelrahmani@outlook.com',
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Axiom Digital',
    url: 'https://axiomdigital.nl',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Groningen',
  },
  sameAs: SocialMedia.map((profile) => profile.link),
});

export default function Home({ latestNotes }: Props) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: personJsonLd }}
        />
      </Head>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}`}
        openGraph={{
          images: [
            {
              url: buildOpenGraphUrl({ title: seoTitle, description: seoDescription }),
            },
          ],
        }}
      />
      <Container className="mt-9">
        <div aria-hidden="true" className="hero-vignette" />
        <div className="max-w-2xl">
          <motion.h1
            {...heroEnter(0)}
            className="font-serif text-5xl italic leading-[1.1] tracking-tight text-stone-900 dark:text-zinc-100 text-balance sm:text-6xl lg:text-[5.25rem] lg:leading-[1.05]"
          >
            {Name}
          </motion.h1>
          <StitchUnderline className="mt-4" />
          <motion.p {...heroEnter(0.15)} className="mt-6 max-w-2xl text-base text-balance">
            {About}
          </motion.p>
          <motion.div
            {...heroEnter(0.25)}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <MagneticButton>
              <Button as="a" href={AxiomDigital.href} target="_blank" rel="noopener noreferrer">
                Work with me
              </Button>
            </MagneticButton>
            <ul role="list" className="flex gap-6">
              {SocialMedia.map((socialProfile) => (
                <SocialLink
                  key={socialProfile.name}
                  aria-label={`Follow on ${socialProfile.name}`}
                  href={socialProfile.link}
                  icon={socialProfile.icon}
                />
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-16">
        <SpotlightCard>
          <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-5 sm:items-center">
              <Image
                src={AxiomDigital.logo}
                alt="Axiom Digital logo"
                width={48}
                height={48}
                unoptimized
                className="h-12 w-12 flex-none rounded-full object-contain"
              />
              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
                  {AxiomDigital.name}
                </h2>
                <p className="mt-1 max-w-md text-sm text-stone-600 dark:text-zinc-400">
                  {AxiomDigital.description}
                </p>
              </div>
            </div>
            <Button
              as="a"
              href={AxiomDigital.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none"
            >
              Work with me
            </Button>
          </div>
        </SpotlightCard>
        <Seam draw className="mt-16" />
      </Container>
      <Container className="mt-12">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <motion.div
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline justify-between"
            >
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
                Latest notes
              </h2>
              <Link
                href="/notes"
                className="link-thread text-sm font-medium text-primary dark:text-dark-accent"
              >
                All notes
              </Link>
            </motion.div>
            {latestNotes.map((blogPost, index) => (
              <NotePreview key={blogPost.slug} note={blogPost} dense delay={0.1 + index * 0.08} />
            ))}
          </div>
          <div className="lg:ml-auto space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}

const NEWEST_POSTS_TO_DISPLAY = 5;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const latestNotes = await notesApi.getNotes('desc', NEWEST_POSTS_TO_DISPLAY);

  return {
    props: { latestNotes },
    revalidate: 10,
  };
};
