import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { CloseIcon } from './icons/CloseIcon';

export const NavigationItems = [
  { name: 'Home',     href: '/',         type: 'internal' },
  { name: 'Notes',    href: '/notes',    type: 'internal' },
  { name: 'Projects', href: '/projects', type: 'internal' },
  { name: 'About',    href: '/about',    type: 'internal' },
] as const;

export const NavLink = ({ href, children }: React.PropsWithChildren<{ href: string }>) => (
  <Link href={href} className="transition hover:text-primary dark:hover:text-[#D43D55]">
    {children}
  </Link>
);

const NavItem = ({ href, children }: React.PropsWithChildren<{ href: string }>) => {
  const isActive = useRouter().pathname === href;
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 text-sm transition',
          isActive
            ? 'text-primary font-semibold dark:text-[#D43D55]'
            : 'text-zinc-600 hover:text-primary dark:text-[#9CA3AF] dark:hover:text-[#D43D55]',
        )}
      >
        {children}
        {isActive && (
          // Light: burgundy gradient underline | Dark: full-opacity raspberry underline
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 dark:from-[#D43D55]/20 dark:via-[#D43D55] dark:to-[#D43D55]/20" />
        )}
      </Link>
    </li>
  );
};

export const MobileNavItem = ({ href, children }: React.PropsWithChildren<{ href: string }>) => (
  <li>
    <Popover.Button as={Link} href={href} className="block py-2 dark:text-[#9CA3AF] dark:hover:text-[#D43D55]">
      {children}
    </Popover.Button>
  </li>
);

// Light: floating glassmorphism pill | Dark: transparent bar with a faint raspberry outline so it reads against the dark bg
export const DesktopNavigation = (
  props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
) => (
  <nav {...props}>
    <ul className={
      'flex rounded-full nav-glass px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 ' +
      'dark:rounded-full dark:bg-[#1A0F18]/60 dark:shadow-none dark:ring-1 dark:ring-[#D43D55]/25 dark:text-[#9CA3AF] dark:px-3'
    }>
      {NavigationItems.map((item) =>
        item.type === 'internal' ? (
          <NavItem key={item.href} href={item.href}>
            {item.name}
          </NavItem>
        ) : (
          <a
            key={item.href}
            className="transition hover:text-primary dark:hover:text-[#D43D55] px-3 py-2"
            href={item.href}
            target="_blank"
          >
            {item.name}
          </a>
        ),
      )}
    </ul>
  </nav>
);

export const MobileNavigation = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <Popover {...props}>
    <Popover.Button className={
      'group flex items-center rounded-full nav-glass px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 ' +
      'dark:rounded-full dark:bg-[#1A0F18]/60 dark:shadow-none dark:ring-1 dark:ring-[#D43D55]/25 dark:text-[#9CA3AF] dark:hover:text-[#D43D55]'
    }>
      Menu
      <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:stroke-[#9CA3AF] dark:group-hover:stroke-[#D43D55]" />
    </Popover.Button>
    <Transition.Root>
      <Transition.Child
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-[#0F090E]/80" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-150 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5
            dark:rounded-2xl dark:bg-[#1A0F18] dark:ring-[#D43D55]/25"
        >
          <div className="flex flex-row-reverse items-center justify-between">
            <Popover.Button aria-label="Close menu" className="-m-1 p-1">
              <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-[#9CA3AF]" />
            </Popover.Button>
            <h2 className="text-sm font-medium dark:text-[#9CA3AF]">Navigation</h2>
          </div>
          <nav className="mt-6">
            <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-[#D43D55]/15 dark:text-[#9CA3AF]">
              {NavigationItems.map((item) => (
                <MobileNavItem key={item.href} href={item.href}>
                  {item.name}
                </MobileNavItem>
              ))}
            </ul>
          </nav>
        </Popover.Panel>
      </Transition.Child>
    </Transition.Root>
  </Popover>
);
