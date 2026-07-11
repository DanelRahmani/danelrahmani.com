import Link from 'next/link';
import React from 'react';

import { PageTitle } from '../components/PageTitle';
import { SimpleLayout } from '../components/SimpleLayout';

export default function ServerError() {
  return (
    <SimpleLayout>
      <div className="text-center">
        <p className="text-base font-semibold text-primary">500</p>
        <PageTitle>Internal Server Error</PageTitle>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Sorry, something went wrong on our end.
        </p>
        <div className="mt-6">
          <Link href="/" className="text-base font-medium hover:text-primary">
            Go back home
          </Link>
        </div>
      </div>
    </SimpleLayout>
  );
}
