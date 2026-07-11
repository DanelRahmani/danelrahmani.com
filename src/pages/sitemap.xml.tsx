import { GetServerSideProps } from 'next';

import { notesApi } from '../lib/notesApi';

const STATIC_PATHS = ['', '/about', '/projects', '/notes', '/images'];

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      default:
        return '&quot;';
    }
  });

const urlEntry = (loc: string, lastmod?: string) =>
  lastmod
    ? `  <url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod></url>`
    : `  <url><loc>${escapeXml(loc)}</loc></url>`;

const toDate = (value?: string) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : undefined;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = (process.env.NEXT_PUBLIC_URL || 'https://danelrahmani.com').replace(/\/$/, '');
  const notes = await notesApi.getNotes();

  const entries = [
    ...STATIC_PATHS.map((path) => urlEntry(`${baseUrl}${path}`)),
    ...notes.map((note) =>
      urlEntry(`${baseUrl}/notes/${note.slug}`, toDate(note.lastEditedAt || note.publishedAt)),
    ),
    ...Array.from(new Set(notes.flatMap((note) => note.tags))).map((tag) =>
      urlEntry(`${baseUrl}/tags/${encodeURIComponent(tag)}`),
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
