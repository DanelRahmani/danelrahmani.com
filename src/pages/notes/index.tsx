import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { Badge } from '../../components/Badge';
import { PageLayout } from '../../components/PageLayout';
import { NotePreview } from '../../components/notes/NotePreview';
import { Note, notesApi } from '../../lib/notesApi';
import { buildOpenGraphUrl } from '../../lib/og';

const seoTitle = 'Notes';
const seoDescription =
  'All of my thoughts on programming, building products, leadership, and more. Not structured.';

interface Props {
  notes: Note[];
  tags: Array<string>;
}

export default function Notes({ notes, tags }: Props) {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/notes`}
        openGraph={{
          images: [{ url: buildOpenGraphUrl({ title: seoTitle, description: seoDescription }) }],
        }}
      />
      <PageLayout
        title="My Notes on various topics"
        intro="All of my thoughts on business, finance, the economy, technology, politics and much more"
      >
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
          Tags
        </h2>
        <div className="mt-4 flex max-w-xl flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} href={`/tags/${tag}`}>
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="mt-24 md:seam-l md:pl-6">
          <div className="flex max-w-3xl flex-col space-y-16">
            {notes.map((note) => (
              <NotePreview key={note.slug} note={note} />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const notes = await notesApi.getNotes('desc');

  return {
    props: {
      notes,
      tags: Array.from(new Set(notes.map((post) => post.tags).flat())),
    },
    revalidate: 10,
  };
};
