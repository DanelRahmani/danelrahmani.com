import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type Props = {
  className?: string | null;
  href: string;
};

export const ExternalLink = ({
  className = 'underline decoration-primary/40 underline-offset-2 transition hover:decoration-primary dark:decoration-dark-accent/50 dark:hover:decoration-dark-accent',
  href,
  children,
  ...otherProps
}: PropsWithChildren<Props>) => {
  return (
    <a
      className={clsx(className)}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...otherProps}
    >
      {children}
    </a>
  );
};
