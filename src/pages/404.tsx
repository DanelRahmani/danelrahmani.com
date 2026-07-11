import Link from 'next/link';
import React from 'react';

import { PageTitle } from '../components/PageTitle';
import { SimpleLayout } from '../components/SimpleLayout';

export default function NotFound() {
  return (
    <SimpleLayout>
      <div className="text-center">
        <p className="font-mono text-base font-semibold text-primary dark:text-dark-accent">404</p>
        <PageTitle>Page not found.</PageTitle>
        <p className="mt-4 text-base text-stone-600 dark:text-zinc-400">
          Sorry, we couldn’t find the page you’re looking for.
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
