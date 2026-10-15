import Image from 'next/image';
import React from 'react';

import { Badge } from './Badge';
import { GitHubIcon } from './icons/GitHubIcon';
import { LinkIcon } from './icons/LinkIcon';
import { Project } from '../data/lifeApi';

export const ProjectCard = ({ project }: { project: Project }) => (
  <div className="card-hover panel group relative flex flex-col rounded-2xl border border-primary/10 p-6 dark:border-zinc-700/40">
    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-md shadow-zinc-800/5 dark:border-zinc-700/40 dark:bg-zinc-800">
      <Image
        src={project.logo}
        alt={project.title}
        className="h-8 w-8 rounded-full object-contain"
        width={32}
        height={32}
        unoptimized
      />
    </div>
    <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">{project.title}</h2>
    <p className="relative z-10 mt-2 text-sm text-stone-600 dark:text-zinc-400">{project.description}</p>
    <p className="relative z-10 mt-4 flex flex-wrap gap-1">
      {project.techStack.map((techStackItem) => (
        <Badge key={techStackItem}>{techStackItem}</Badge>
      ))}
    </p>
    <div className="relative z-10 mt-auto flex pt-4 text-sm font-medium text-stone-500 transition group-hover:text-primary dark:text-zinc-300 dark:group-hover:text-dark-accent">
      {project.links?.length ? (
        <ul className="flex flex-col gap-2">
          {project.links.map((link) => (
            <li key={link.href} className="flex items-center">
              {link.href.startsWith('https://github.com/') ? (
                <span className="flex h-6 w-6 flex-none items-center justify-center">
                  <GitHubIcon className="h-4 w-4 fill-current" />
                </span>
              ) : (
                <LinkIcon className="h-6 w-6 flex-none" />
              )}
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="ml-2">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  </div>
);
