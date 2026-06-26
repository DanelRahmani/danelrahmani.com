import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

// ── CardComponent ──────────────────────────────────────────────
type CardProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
  as?: T;
  href?: string;
  className?: string;
  children?: React.ReactNode;
};

const CardComponent = <T extends keyof JSX.IntrinsicElements = 'div'>({
  as,
  className,
  children,
  href,
}: CardProps<T>) => {
  const Tag = (as ?? 'div') as keyof JSX.IntrinsicElements;
  if (href) {
    return (
      <Link href={href} className={clsx('group relative flex flex-col items-start', className)}>
        {children}
      </Link>
    );
  }
  return (
    <Tag className={clsx('group relative flex flex-col items-start', className)}>
      {children}
    </Tag>
  );
};

// ── CardLink ───────────────────────────────────────────────────
const CardLink = ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
  <>
    <span className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
    <Link href={href}>
      <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
      <span className="relative z-10">{children}</span>
    </Link>
  </>
);

// ── CardTitle ──────────────────────────────────────────────────
type CardTitleProps<T extends keyof JSX.IntrinsicElements = 'h2'> = {
  as?: T;
  href?: string;
  children?: React.ReactNode;
};

const CardTitle = <T extends keyof JSX.IntrinsicElements = 'h2'>({
  as,
  children,
  href,
}: CardTitleProps<T>) => {
  const Tag = (as ?? 'h2') as keyof JSX.IntrinsicElements;
  return (
    <Tag className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <CardLink href={href}>{children}</CardLink> : children}
    </Tag>
  );
};

// ── CardDescription ────────────────────────────────────────────
const CardDescription = ({ children }: React.PropsWithChildren) => (
  <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">{children}</p>
);

// ── CardCta ────────────────────────────────────────────────────
const CardCta = ({ children }: React.PropsWithChildren) => (
  <div
    aria-hidden="true"
    className="relative z-10 mt-4 flex items-center text-sm font-medium text-primary dark:text-[#D43D55]"
  >
    {children}
    <span className="ml-1">→</span>
  </div>
);

// ── CardEyebrow ────────────────────────────────────────────────
type CardEyebrowProps<T extends keyof JSX.IntrinsicElements = 'p'> = {
  as?: T;
  dateTime?: string;
  className?: string;
  decorate?: boolean;
  children?: React.ReactNode;
};

const CardEyebrow = <T extends keyof JSX.IntrinsicElements = 'p'>({
  as,
  children,
  dateTime,
  className,
  decorate,
}: CardEyebrowProps<T>) => {
  const Tag = (as ?? 'p') as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={clsx(
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5',
        className,
      )}
      {...(dateTime ? { dateTime } : {})}
    >
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Tag>
  );
};

export const Card = Object.assign(CardComponent, {
  Link: CardLink,
  Title: CardTitle,
  Description: CardDescription,
  Cta: CardCta,
  Eyebrow: CardEyebrow,
});
