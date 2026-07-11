import React from 'react';

import { Container } from './Container';
import { NavLink, NavigationItems } from './Navigation';

export const Footer = () => {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="seam pt-10 pb-16">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <span
                  aria-hidden="true"
                  className="font-serif text-lg italic leading-none text-primary/60 dark:text-dark-accent/60"
                >
                  DR
                </span>
                {NavigationItems.map((item) => (
                  <NavLink key={item.href} href={item.href}>
                    {item.name}
                  </NavLink>
                ))}
                <a
                  href="mailto:danelrahmani@outlook.com"
                  className="link-thread transition hover:text-primary dark:hover:text-dark-accent"
                >
                  Get in touch
                </a>
              </div>
              <p className="font-mono text-xs tabular-nums text-stone-500 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} Danel Rahmani
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
};
