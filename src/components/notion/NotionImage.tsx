import Image from 'next/image';

// Hosts next.config.mjs lets the image optimizer fetch from (Notion uploads).
// Anything else, such as an image linked from another site, is shown as is,
// because next/image throws on a host it has not been told about.
const OPTIMIZABLE = [
  /^prod-files-secure\.s3\.[^/]+\.amazonaws\.com$/,
  /^s3\.[^/]+\.amazonaws\.com$/,
  /(^|\.)notion\.so$/,
  /(^|\.)notionusercontent\.com$/,
  /^images\.unsplash\.com$/,
];

const canOptimize = (src: string) => {
  try {
    const { hostname, pathname } = new URL(src);
    return !pathname.toLowerCase().endsWith('.svg') && OPTIMIZABLE.some((re) => re.test(hostname));
  } catch {
    return false;
  }
};

type Props = {
  value: any;
};

export const NotionImage = ({ value }: Props) => {
  const src: string | undefined = value?.[value?.type]?.url;
  if (!src) return null;

  const caption: string = (value.caption ?? []).map((item: any) => item.plain_text).join('');
  const size = value.size as { width: number; height: number } | undefined;

  return (
    <figure>
      {size && canOptimize(src) ? (
        <Image
          src={src}
          alt={caption}
          width={size.width}
          height={size.height}
          sizes="(min-width: 1024px) 42rem, 100vw"
          className="rounded-2xl"
          {...(value.placeholder
            ? { placeholder: 'blur' as const, blurDataURL: value.placeholder }
            : {})}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={caption}
          loading="lazy"
          width={size?.width}
          height={size?.height}
          className="h-auto w-full rounded-2xl"
        />
      )}
      {caption && (
        <figcaption className="font-mono text-xs text-stone-600 dark:text-stone-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
