import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import AvatarImage from '../../public/assets/blog/authors/danel.jpeg';
import { Container } from '../components/Container';
import { ExternalLink } from '../components/ExternalLink';
import { PageTitle } from '../components/PageTitle';
import { Section } from '../components/Section';
import { SocialLink } from '../components/SocialLink';
import { MailIcon } from '../components/icons/MailIcon';
import { buildOpenGraphUrl } from '../lib/og';
import {
  AboutExtended,
  Books,
  SocialMedia,
  Music,
  Series,
} from '../data/lifeApi';

const seoTitle = `About`;
const seoDescription = `A few words about me.`;

export default function AboutMe() {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/about`}
        openGraph={{
          images: [
            {
              url: buildOpenGraphUrl({ title: seoTitle, description: seoDescription }),
            },
          ],
        }}
      />
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={AvatarImage}
                alt="Portrait of Danel Rahmani"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="profile-glow aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <PageTitle>Hi, I am Danel Rahmani</PageTitle>
            <div className="mt-6 text-base">{AboutExtended}</div>
            <div className="mt-6 flex items-center gap-6">
              <ul role="list" className="flex items-center gap-6">
                {SocialMedia.map((socialProfile) => (
                  <SocialLink
                    key={socialProfile.name}
                    aria-label={`Follow on ${socialProfile.name}`}
                    href={socialProfile.link}
                    icon={socialProfile.icon}
                  />
                ))}
                {/* Email icon */}
                <SocialLink
                  aria-label="Send me an email"
                  href="mailto:danelrahmani@outlook.com"
                  icon={MailIcon}
                />
              </ul>
              <a
                href="/assets/resume.pdf"
                download
                aria-label="Download resume"
                className="inline-flex items-center rounded-md px-3 py-1 text-sm font-medium text-white bg-primary hover:bg-primary-light dark:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition"
              >
                Resume
              </a>
            </div>
            <Section>
              <Section.Title as="h2">Now</Section.Title>
              <Section.Content>
                In July 2026 I founded{' '}
                <ExternalLink href="https://axiomdigital.nl">Axiom Digital</ExternalLink>, a digital
                agency focused on AI integration and digital transformation. I help businesses work
                out where AI and automation actually pay off, then build and deliver it. If that
                sounds useful to you,{' '}
                <ExternalLink href="https://axiomdigital.nl">work with me</ExternalLink>.
              </Section.Content>
            </Section>
            <Section>
              <Section.Title as="h2">Study</Section.Title>
              <Section.Content>
                I study International Business at the University of Groningen (2024-2027), where I
                am also part of the Honours College. My GPA so far: 9.25 in year one and 9.00 in
                year two. This September I leave for an exchange semester at Waseda University in
                Tokyo, at the School of Political Science and Economics.
              </Section.Content>
            </Section>
            <Section>
              <Section.Title as="h2">The atelier</Section.Title>
              <Section.Content>
                Since 2020 I have worked in my family&apos;s business,{' '}
                <ExternalLink href="https://top-atelier.com/">
                  Rahmani&apos;s Gordijn Kledingatelier
                </ExternalLink>
                , a curtain and clothing atelier. It taught me what good work looks like up close:
                exact measurements, honest materials, and finishing the seams nobody sees. It is
                also why this site looks the way it does: the stitched rules and the maroon thread
                come from there.
              </Section.Content>
            </Section>
            <Section>
              <Section.Title as="h2">Books I recommend</Section.Title>
              <Section.Content>
                <ul className="mt-1 list-disc list-inside marker:text-primary/50 dark:marker:text-dark-accent/60">
                  {Books.map((book) => (
                    <li key={book.name}>
                      <ExternalLink href={book.link}>{book.name}</ExternalLink>
                    </li>
                  ))}
                </ul>
              </Section.Content>
            </Section>
             <Section>
              <Section.Title as="h2">Series I recommend</Section.Title>
              <Section.Content>
                <ul className="mt-1 list-disc list-inside marker:text-primary/50 dark:marker:text-dark-accent/60">
                  {Series.map((series) => (
                    <li key={series.name}>
                      <ExternalLink href={series.link}>{series.name}</ExternalLink>
                    </li>
                  ))}
                </ul>
              </Section.Content>
            </Section>
            <Section>
              <Section.Title as="h2">Music I Like</Section.Title>
              <Section.Content>
                A playlist of what I&apos;ve had on lately, over on{' '}
                <ExternalLink href="https://open.spotify.com/playlist/1K9MAIPAtNMpoNnGwnk9by">
                  Spotify
                </ExternalLink>
                .
              </Section.Content>
            </Section>
            <Section>
              <Section.Title as="h2">Photos</Section.Title>
              <Section.Content>
                When I travel I take pictures: Tokyo, Kyoto and Osaka, CERN, Geneva and Bern, and
                the occasional cat. The full set lives on the{' '}
                <Link
                  href="/images"
                  className="underline decoration-primary/40 underline-offset-2 transition hover:decoration-primary dark:decoration-dark-accent/50 dark:hover:decoration-dark-accent"
                >
                  images page
                </Link>
                .
              </Section.Content>
            </Section>
            <Section>
              <Section.Title as="h2">Get in touch</Section.Title>
              <Section.Content>
                The fastest way to reach me is email:{' '}
                <ExternalLink href="mailto:danelrahmani@outlook.com">
                  danelrahmani@outlook.com
                </ExternalLink>
                .
              </Section.Content>
            </Section>
          </div>
        </div>
      </Container>
    </>
  );
}
