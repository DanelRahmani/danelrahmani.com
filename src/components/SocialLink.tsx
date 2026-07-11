import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type SocialLinkProps = {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  children?: React.ReactNode;
  'aria-label'?: string;
};

export const SocialLink = ({
  className,
  href,
  children,
  icon: Icon,
  'aria-label': ariaLabel,
}: SocialLinkProps) => (
  <li className={clsx(className, 'flex')}>
    <Link
      href={href}
      aria-label={ariaLabel}
      className="group flex text-sm font-medium text-zinc-800 transition hover:text-primary dark:text-zinc-200"
    >
      <Icon
        aria-hidden
        className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-primary"
      />
      {children && <span className="ml-4">{children}</span>}
    </Link>
  </li>
);
