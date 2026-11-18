import type { NextApiRequest, NextApiResponse } from 'next';

import { imageFingerprint, notesApi } from '../../../../lib/notesApi';

// Raster formats only: an SVG served from this origin could carry script.
const IMAGE_TYPE = /^image\/(png|jpe?g|gif|webp|avif)$/;

/**
 * A stable address for a note's thumbnail. Notion serves uploads from signed
 * links that expire after about an hour, which is too short for a link
 * preview that LinkedIn or WhatsApp fetches days later. This route looks up
 * the note's current image and returns its bytes.
 *
 * Links carry ?v=<fingerprint of the image>, so the same address always means
 * the same picture: Vercel's edge and browsers keep it for a year, and a new
 * picture gets a new address. Any other link (an old share) is cached for a
 * day.
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
    // Only the current image's own fingerprint earns the year-long cache, so
    // an old or made-up ?v= can never pin a picture at the edge.
    const versioned = req.query.v === imageFingerprint(source);
    res.setHeader(
      'Cache-Control',
      versioned
        ? 'public, max-age=31536000, s-maxage=31536000, immutable'
        : 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(body);
  } catch {
    return res.status(502).end();
  }
}
