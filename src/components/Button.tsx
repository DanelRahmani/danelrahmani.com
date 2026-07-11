import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, forwardRef } from 'react';

const variantStyles = {
  primary:
    'bg-primary font-semibold text-white hover:bg-primary-light active:scale-[0.98] dark:bg-dark-accent dark:hover:bg-dark-accent-hover',
  secondary:
    'bg-primary/[0.06] font-medium text-primary hover:bg-primary/10 active:scale-[0.98] dark:bg-dark-accent/10 dark:text-dark-accent-hover dark:hover:bg-dark-accent/20',
} as const;

type Props<T extends ElementType> = {
  as?: T;
  variant?: keyof typeof variantStyles;
} & ComponentPropsWithRef<T>;

export const Button = forwardRef(
  <T extends ElementType = 'button'>(
    { as: Component = 'button', ...props }: Props<T>,
    ref: React.Ref<T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : T>,
  ) => {
    const { className, variant = 'primary', children, ...rest } = props;

    return (
      <Component
        className={clsx(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full py-2 px-5 text-sm outline-offset-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-dark-accent',
          variantStyles[variant],
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';
