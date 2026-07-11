import React from 'react';

import { Container } from './Container';
import { PageTitle } from './PageTitle';
import { Seam } from './Stitch';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  intro: string;
}

export const PageLayout = ({ title, intro, children, ...rest }: React.PropsWithChildren<Props>) => {
  return (
    <Container className="mt-16 sm:mt-32" {...rest}>
      <header className="max-w-3xl">
        <PageTitle>{title}</PageTitle>
        <p className="mt-6 max-w-2xl text-base text-stone-600 dark:text-zinc-400 text-balance">
          {intro}
        </p>
      </header>
      <Seam draw className="mt-10" />
      <div className="mt-10 sm:mt-14">{children}</div>
    </Container>
  );
};
