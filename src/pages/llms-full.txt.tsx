import { GetServerSideProps } from 'next';

import { notesApi } from '../lib/notesApi';
import { notionBlocksToMarkdown } from '../lib/notionToMarkdown';
import { Books, Music, Series, Work, Education } from '../data/lifeApi';

/**
 * The expanded companion to /llms.txt: the same structure, but with the full text of every
 * note inlined rather than linked, so a model can read the site in one request.
 *
 * The site's `About` export is JSX rather than a string, so it cannot be interpolated here;
 * the prose below is written for this file. Everything factual (work, education,
 * recommendations) comes from the same lifeApi source the pages render from.
 */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = (process.env.NEXT_PUBLIC_URL || 'https://danelrahmani.com').replace(/\/$/, '');
  const notes = await notesApi.getNotes();

  const noteSections = await Promise.all(
    notes.map(async (note) => {
      const blocks = await notesApi.getNote(note.id);
      const markdown = notionBlocksToMarkdown(blocks as any[]);
      const tags = note.tags.length ? `\nTags: ${note.tags.join(', ')}` : '';

      return `## ${note.title}

Source: ${baseUrl}/notes/${note.slug}
Published: ${note.publishedAt}${tags}

> ${note.description}

${markdown}`;
    }),
  );

  const list = (items: readonly { name: string; link: string }[]) =>
    items.map((item) => `- [${item.name}](${item.link})`).join('\n');

  const body = `# Danel Rahmani

> Personal site of Danel Rahmani, an International Business student at the University of Groningen and the founder of Axiom Digital. This file contains the full text of the site's content.

Danel Rahmani is a student at the University of Groningen with a wide range of interests. This is his personal website, featuring his resume, his thoughts, and projects he has worked on. He can be reached at danelrahmani@outlook.com.

From September 2026 to February 2027 he is on exchange at the School of Political Science and Economics at Waseda University in Tokyo. He also runs Axiom Digital (https://axiomdigital.nl), building websites and helping smaller businesses with the digital side of their work.

# Work

${Work.map((role) => `- ${role.title}, ${role.company} (${role.start} – ${role.end})`).join('\n')}

# Education

${Education.map((entry) => `- ${entry.degree}, ${entry.school} (${entry.start} – ${entry.end})`).join('\n')}

# Recommendations

## Books

${list(Books)}

## Series

${list(Series)}

## Music

${list(Music)}

# Notes

${noteSections.join('\n\n---\n\n') || 'No notes published yet.'}
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  res.write(body);
  res.end();

  return { props: {} };
};

export default function LlmsFullTxt() {
  return null;
}
