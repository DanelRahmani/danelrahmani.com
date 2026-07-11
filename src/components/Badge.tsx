import classNames from 'classnames';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

const styles = `inline-flex items-center rounded-full bg-primary/[0.06] px-2.5 py-0.5 font-mono text-xs leading-4 text-primary transition hover:bg-primary/10 dark:bg-dark-accent/10 dark:text-dark-accent-hover dark:hover:bg-dark-accent/20`;

type Props = (
  | {
      onClick?: () => void;
    }
  | {
      href: string;
    }
) & { className?: string };

export const Badge = ({ className, children, ...otherProps }: PropsWithChildren<Props>) => {
  if ('href' in otherProps)
    return (
      <Link className={classNames(styles, className)} {...otherProps}>
        {children}
      </Link>
    );

  return (
    <button className={classNames(styles, className)} {...otherProps}>
      {children}
    </button>
  );
};
