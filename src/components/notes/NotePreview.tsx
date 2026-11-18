import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { formatDate } from '../../lib/date';
import { Note } from '../../lib/notesApi';
import { Card } from '../Card';
import { ANIMATION_FROM_PROPS, ANIMATION_TO_PROPS } from '../../lib/animation';

const StaticBadge = ({ className, children }: React.PropsWithChildren<{ className?: string }>) => (
  <span
    className={clsx(
      className,
      'inline-flex items-center rounded-md bg-primary px-2 py-0 text-xs font-medium text-white',
    )}
  >
    {children}
  </span>
);

interface Props {
  note: Note;
  dense?: boolean;
  /** Stagger offset in seconds, for lists that cascade in one by one. */
  delay?: number;
}

// The note's picture beside its entry. The card's own link already covers the
// text, so this is a second, unfocusable link to the same note: clicking the
// picture works, and keyboard and screen-reader users meet the note once.
const Thumbnail = ({ note, dense }: { note: Note; dense?: boolean }) => (
  <Link
    href={`/notes/${note.slug}`}
    tabIndex={-1}
    aria-hidden="true"
    className={clsx(
      'group/thumb relative block flex-none overflow-hidden rounded-2xl bg-primary/[0.06] dark:bg-dark-accent/10',
      dense ? 'mt-1 h-20 w-24' : 'mt-1 h-24 w-32 sm:h-28 sm:w-40',
    )}
  >
    <Image
      src={note.thumbnail!}
      alt=""
      fill
      sizes={dense ? '96px' : '160px'}
      className="object-cover transition duration-300 ease-out group-hover/thumb:scale-[1.03]"
    />
  </Link>
);

export const NotePreview = ({ note, dense, delay = 0 }: Props) => {
  return (
    <motion.div
      initial={ANIMATION_FROM_PROPS}
      whileInView={{
        ...ANIMATION_TO_PROPS,
        transition: { ...ANIMATION_TO_PROPS.transition, delay },
      }}
      viewport={{ once: true }}
    >
      <article className="md:grid md:grid-cols-4 md:items-baseline">
        <div className="flex items-start gap-6 md:col-span-3">
          <Card className="min-w-0 flex-1">
            <Card.Title href={`/notes/${note.slug}`}>{note.title}</Card.Title>
            <Card.Eyebrow
              as="time"
              dateTime={note.publishedAt}
              className={clsx(!dense && 'md:hidden')}
              decorate
            >
              {formatDate(note.publishedAt)}
              {note.inProgress && <StaticBadge className="ml-4">Work in progress</StaticBadge>}
            </Card.Eyebrow>
            <Card.Description>{note.description}</Card.Description>
            <Card.Cta>Read note</Card.Cta>
          </Card>
          {note.thumbnail && <Thumbnail note={note} dense={dense} />}
        </div>
        {!dense && (
          <Card.Eyebrow as="time" dateTime={note.publishedAt} className="mt-1 hidden md:block">
            {formatDate(note.publishedAt)}
            {note.inProgress && <StaticBadge className="mt-2">Work in progress</StaticBadge>}
          </Card.Eyebrow>
        )}
      </article>
    </motion.div>
  );
};
