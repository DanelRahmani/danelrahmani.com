import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Badge } from './Badge';
import { LinkIcon } from './icons/LinkIcon';
import { Project } from '../data/lifeApi';

export const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group relative flex flex-col rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
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
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
    <p className="relative z-10 mt-4 flex flex-wrap gap-1">
      {project.techStack.map((techStackItem) => (
        <Badge key={techStackItem}>{techStackItem}</Badge>
      ))}
    </p>
    <div className="relative z-10 mt-auto flex text-sm font-medium text-zinc-400 transition group-hover:text-primary dark:text-zinc-200">
      {project.link ? (
        <p className="flex items-center">
          <LinkIcon className="h-6 w-6 flex-none" />
          <Link href={project.link.href} className="ml-2">
            {project.link.label}
          </Link>
        </p>
      ) : null}
    </div>
  </div>
);
