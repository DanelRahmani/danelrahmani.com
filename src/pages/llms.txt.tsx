import { GetServerSideProps } from 'next';

import { notesApi } from '../lib/notesApi';

/**
 * https://llmstxt.org — an H1 is the only required section, followed by an optional
 * blockquote summary, free-form detail sections (no headings), and H2-delimited file
 * lists of `- [name](url): notes`. Anything under `## Optional` may be skipped when a
 * shorter context is needed.
 *
 * Generated per request rather than at build time so notes published through Notion
 * appear here immediately, the same way they do in the sitemap.
 */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = (process.env.NEXT_PUBLIC_URL || 'https://danelrahmani.com').replace(/\/$/, '');
  const notes = await notesApi.getNotes();

  const noteLinks = notes
    .map((note) => `- [${note.title}](${baseUrl}/notes/${note.slug}): ${note.description}`)
    .join('\n');

  const body = `# Danel Rahmani

> Personal site of Danel Rahmani, founder of Axiom Digital and International Business student at the University of Groningen. It holds his notes, projects and CV.

Danel writes about business and finance, AI and IT, and occasionally politics. From September 2026 to February 2027 he is on exchange at the School of Political Science and Economics at Waseda University in Tokyo.

Notes are written in Notion and published here, so this file changes as new ones appear.

## Notes

${noteLinks || '- No notes published yet.'}

## Pages

- [Home](${baseUrl}/): Introduction, recent notes and a summary of his work history and education.
- [About](${baseUrl}/about): Longer biography, plus the books, series and music he recommends.
- [Projects](${baseUrl}/projects): Things he has built, current and past.
- [Images](${baseUrl}/images): Photographs from Japan, CERN and Switzerland, and the Netherlands.
- [Notes](${baseUrl}/notes): Index of everything he has written.

## Optional

- [Full text of every page](${baseUrl}/llms-full.txt): This site's content in a single file.
- [RSS feed](${baseUrl}/api/rss.xml): Machine-readable feed of the notes.
- [Sitemap](${baseUrl}/sitemap.xml): Every indexable URL.
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  res.write(body);
  res.end();

  return { props: {} };
};

export default function LlmsTxt() {
  return null;
}
