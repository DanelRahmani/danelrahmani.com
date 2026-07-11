import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

import { formatDate } from '../../lib/date';
import { Container } from '../Container';
import { Prose } from '../Prose';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ReadingThread } from '../motion/ReadingThread';

interface Props {
  children: React.ReactNode;
  meta: {
    title: string;
    description: string;
    date: string;
    coverImage?: string | null;
  };
  previousPathname?: string;
}

export const NoteLayout = ({ children, meta, previousPathname }: Props) => {
  let router = useRouter();
  const articleRef = useRef<HTMLElement>(null);

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-3xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition active:scale-95 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-primary" />
            </button>
          )}
          <article ref={articleRef} className="relative">
            <ReadingThread target={articleRef} />
            <header className="flex flex-col">
              <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100 text-balance sm:text-5xl">
                {meta.title}
              </h1>
              <time
                dateTime={meta.date}
                className="order-first flex items-center font-mono text-sm text-stone-500 dark:text-zinc-400"
              >
                <span className="h-4 w-0.5 rounded-full bg-primary/30 dark:bg-dark-accent/40" />
                <span className="ml-3">{formatDate(meta.date)}</span>
              </time>
            </header>
            {meta.coverImage && (
              <div className="relative mt-8 aspect-[2/1] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={meta.coverImage}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <Prose className="mt-8">{children}</Prose>
          </article>
        </div>
      </div>
    </Container>
  );
};
