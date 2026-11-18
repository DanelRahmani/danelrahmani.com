import type { NextApiRequest, NextApiResponse } from 'next';

import { notesApi } from '../../../../lib/notesApi';

// Raster formats only: an SVG served from this origin could carry script.
const IMAGE_TYPE = /^image\/(png|jpe?g|gif|webp|avif)$/;

/**
 * A stable address for a note's thumbnail. Notion serves uploads from signed
 * links that expire after about an hour, which is too short for a link
 * preview that LinkedIn or WhatsApp fetches days later. This route looks up
 * the note's current image and returns its bytes, cached at the edge for an
 * hour and served stale for a day while it refreshes.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = typeof req.query.slug === 'string' ? req.query.slug : '';
  if (!slug) return res.status(404).end();

  try {
    const source = await notesApi.getThumbnailSource(slug);
    if (!source) return res.status(404).end();

    const upstream = await fetch(source);
    const type = upstream.headers.get('content-type')?.split(';')[0].trim() ?? '';
    if (!upstream.ok || !IMAGE_TYPE.test(type)) return res.status(502).end();

    const body = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', type);
    res.setHeader('Content-Length', body.length);
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(body);
  } catch {
    return res.status(502).end();
  }
}
