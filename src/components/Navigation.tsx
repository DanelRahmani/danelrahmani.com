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
  { name: 'Images',   href: '/images',   type: 'internal' },
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
            ? 'text-primary dark:text-[#D43D55] font-semibold'
            : 'text-zinc-600 hover:text-primary dark:text-zinc-200 dark:hover:text-[#D43D55]',
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 dark:from-[#D43D55]/20 dark:via-[#D43D55] dark:to-[#D43D55]/20" />
        )}
      </Link>
    </li>
  );
};

export const MobileNavItem = ({ href, children }: React.PropsWithChildren<{ href: string }>) => (
  <li>
    <Popover.Button as={Link} href={href} className="block py-2 dark:text-zinc-200 dark:hover:text-[#D43D55]">
      {children}
    </Popover.Button>
  </li>
);

export const DesktopNavigation = (
  props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
) => (
  <nav {...props}>
    <ul className="flex rounded-full nav-glass px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
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
    <Popover.Button className="group flex items-center rounded-full nav-glass px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
      Menu
      <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
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
        <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
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
          className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
        >
          <div className="flex flex-row-reverse items-center justify-between">
            <Popover.Button aria-label="Close menu" className="-m-1 p-1">
              <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </Popover.Button>
            <h2 className="text-sm font-medium dark:text-zinc-200">Navigation</h2>
          </div>
          <nav className="mt-6">
            <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
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
