import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type SocialLinkProps = {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
};

export const SocialLink = ({ className, href, children, icon: Icon }: SocialLinkProps) => (
  <li className={clsx(className, 'flex')}>
    <Link
      href={href}
      className="group flex text-sm font-medium text-zinc-800 transition hover:text-primary dark:text-zinc-200 dark:hover:text-[#D43D55]"
    >
      <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-primary dark:group-hover:fill-[#D43D55]" />
      {children && <span className="ml-4">{children}</span>}
    </Link>
  </li>
);
