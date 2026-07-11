import Link from 'next/link';
import React from 'react';

import { PageTitle } from '../components/PageTitle';
import { SimpleLayout } from '../components/SimpleLayout';

export default function ServerError() {
  return (
    <SimpleLayout>
      <div className="text-center">
        <p className="font-mono text-base font-semibold text-primary dark:text-dark-accent">500</p>
        <PageTitle>Internal Server Error</PageTitle>
        <p className="mt-4 text-base text-stone-600 dark:text-zinc-400">
          Sorry, something went wrong on our end.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="link-thread text-base font-medium text-primary dark:text-dark-accent"
          >
            Go back home
          </Link>
        </div>
      </div>
    </SimpleLayout>
  );
}
