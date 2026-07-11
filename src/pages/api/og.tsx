import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

// Static instances: satori cannot consume variable fonts.
const displayFont = fetch(
  new URL('../../../public/assets/font/BodoniModa-SemiBold.ttf', import.meta.url),
).then((res) => res.arrayBuffer());
const displayItalicFont = fetch(
  new URL('../../../public/assets/font/BodoniModa-SemiBoldItalic.ttf', import.meta.url),
).then((res) => res.arrayBuffer());
const bodyFont = fetch(new URL('../../../public/assets/font/Inter.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const CREME = '#FDFBF6';
const INK = '#1C1917';
const MAROON = '#4A0E0E';
const STONE = '#57534E';

// The basting stitch, drawn as explicit dashes so it renders identically
// in satori regardless of border-style support.
const Stitch = ({ count }: { count: number }) => (
  <div tw="flex items-center">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        tw="h-1 w-6 rounded-full"
        style={{ backgroundColor: MAROON, opacity: 0.55, marginRight: 14 }}
      />
    ))}
  </div>
);

const generateImage = async (req: NextRequest) => {
  const [display, displayItalic, body] = await Promise.all([
    displayFont,
    displayItalicFont,
    bodyFont,
  ]);
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'Danel Rahmani';
  const description = searchParams.get('description');

  return new ImageResponse(
    (
      <main
        tw="flex h-full w-full flex-col p-16"
        style={{ backgroundColor: CREME, fontFamily: 'Inter' }}
      >
        <div tw="flex w-full items-center justify-between">
          <div
            tw="text-4xl"
            style={{ fontFamily: 'Bodoni Moda', fontStyle: 'italic', color: MAROON }}
          >
            DR
          </div>
          <div tw="text-2xl" style={{ color: STONE }}>
            danelrahmani.com
          </div>
        </div>
        <div tw="mt-auto flex w-full flex-col">
          <h1
            tw="max-w-4xl text-7xl leading-tight"
            style={{ fontFamily: 'Bodoni Moda', color: INK }}
          >
            {title}
          </h1>
          {description && (
            <h2 tw="mt-2 max-w-3xl text-3xl leading-snug" style={{ color: STONE }}>
              {description}
            </h2>
          )}
          <div tw="mt-10 flex flex-col">
            <Stitch count={16} />
            <div tw="mt-6 text-2xl" style={{ color: MAROON }}>
              Danel Rahmani, founder of Axiom Digital
            </div>
          </div>
        </div>
      </main>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Bodoni Moda', data: display, style: 'normal' },
        { name: 'Bodoni Moda', data: displayItalic, style: 'italic' },
        { name: 'Inter', data: body, style: 'normal' },
      ],
    },
  );
};

export default generateImage;
