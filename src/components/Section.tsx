import React, { PropsWithChildren, ReactNode } from 'react';

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TitleProps {
  as?: Heading;
  action?: React.ReactNode;
  children?: ReactNode;
}

const Title = ({ as: TitleComponent = 'h1', action, children }: TitleProps) => {
  return (
    <header className="mt-16 flex flex-row items-center justify-between">
      <TitleComponent className="font-serif text-2xl font-semibold leading-none tracking-tight text-stone-900 dark:text-zinc-100">
        {children}
      </TitleComponent>
      {action}
    </header>
  );
};

const Content = ({ children }: PropsWithChildren) => {
  return <div className="mt-4 text-base text-wrap">{children}</div>;
};

const SectionRoot = ({ children }: PropsWithChildren) => {
  return <section className="text-wrap">{children}</section>;
};

export const Section = Object.assign(SectionRoot, { Title, Content });
