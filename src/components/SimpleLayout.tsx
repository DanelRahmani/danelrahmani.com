import React from 'react';

import { Container } from './Container';

export const SimpleLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-3xl mx-auto">{children}</div>
    </Container>
  );
};
