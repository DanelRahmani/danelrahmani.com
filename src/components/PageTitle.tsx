import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const PageTitle = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <h1
      className={clsx(
        className,
        'font-serif text-4xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100 text-balance sm:text-5xl',
      )}
    >
      {children}
    </h1>
  );
};
