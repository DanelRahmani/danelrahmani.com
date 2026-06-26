import Link from 'next/link';
import React from 'react';

const CardComponent = ({ children, href }: React.PropsWithChildren<{ href?: string }>) => {
  if (href) {
    return (
      <Link href={href} className="group relative flex flex-col items-start">
        {children}
      </Link>
    );
  }
  return <div className="group relative flex flex-col items-start">{children}</div>;
};

const CardLink = ({ children, href }: React.PropsWithChildren<{ href: string }>) => (
  <>
    <span className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
    <Link href={href}>
      <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
      <span className="relative z-10">{children}</span>
    </Link>
  </>
);

const CardTitle = ({ children, href }: React.PropsWithChildren<{ href?: string }>) => (
  <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
    {href ? <CardLink href={href}>{children}</CardLink> : children}
  </h2>
);

const CardDescription = ({ children }: React.PropsWithChildren) => (
  <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">{children}</p>
);

const CardCta = ({ children }: React.PropsWithChildren) => (
  <div
    aria-hidden="true"
    className="relative z-10 mt-4 flex items-center text-sm font-medium text-primary dark:text-[#D43D55]"
  >
    {children}
    <span className="ml-1">→</span>
  </div>
);

const CardEyebrow = ({
  children,
  dateTime,
  className,
  decorate,
}: React.PropsWithChildren<{ dateTime?: string; className?: string; decorate?: boolean }>) => (
  <p
    className={`relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 ${
      decorate ? 'pl-3.5' : ''
    } ${className ?? ''}`}
    {...(dateTime ? { dateTime } : {})}
  >
    {decorate && (
      <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
      </span>
    )}
    {children}
  </p>
);

export const Card = Object.assign(CardComponent, {
  Link: CardLink,
  Title: CardTitle,
  Description: CardDescription,
  Cta: CardCta,
  Eyebrow: CardEyebrow,
});
