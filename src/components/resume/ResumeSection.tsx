import React from 'react';

import { Seam } from '../Stitch';

/** A résumé section: display-serif heading, a stitched seam, then content. */
export const ResumeSection = ({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) => (
  <section className="resume-section mt-14">
    <h2 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
      {title}
    </h2>
    <Seam draw className="mt-3" />
    <div className="mt-1">{children}</div>
  </section>
);
