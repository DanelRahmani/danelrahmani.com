import { LayoutGroup, motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useMemo, useState } from 'react';

import { PageLayout } from '../components/PageLayout';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectFilter } from '../components/ProjectFilter';
import { MyCurrentProjects, MyPastProjects, Project } from '../data/lifeApi';
import { ProjectFilterValue, filterProjects, sortProjects } from '../lib/projects';
import { buildOpenGraphUrl } from '../lib/og';

const seoTitle = 'Projects';
const seoDescription = "Projects I've worked on";

const EASE = [0.22, 1, 0.36, 1] as const;

// Filtered-out cards leave at once (so the list is never stale); the ones
// that stay glide to their new grid position and newcomers fade in.
const ProjectGrid = ({ projects }: { projects: Project[] }) => (
  <ul role="list" className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
    {projects.map((project) => (
      <motion.li
        key={project.title}
        layout="position"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="flex"
      >
        <ProjectCard project={project} />
      </motion.li>
    ))}
  </ul>
);

export default function Creating() {
  const [filter, setFilter] = useState<ProjectFilterValue>('all');

  const current = useMemo(() => filterProjects(sortProjects(MyCurrentProjects), filter), [filter]);
  const past = useMemo(() => filterProjects(sortProjects(MyPastProjects), filter), [filter]);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/projects`}
        openGraph={{
          images: [
            {
              url: buildOpenGraphUrl({ title: seoTitle, description: seoDescription }),
            },
          ],
        }}
      />
      <PageLayout
        title="Things I've made during my life"
        intro="A list of projects I've worked on, I'm working on and I will work on."
      >
        <LayoutGroup>
          <ProjectFilter value={filter} onChange={setFilter} />

          <h2 className="mt-12 font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
            Now
          </h2>
          <p className="mt-2 text-base text-stone-600 dark:text-zinc-400">
            Projects I currently work on.
          </p>
          <ProjectGrid projects={current} />

          {past.length > 0 && (
            <motion.div layout="position" transition={{ duration: 0.25, ease: EASE }}>
              <h2 className="mt-24 font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
                Past
              </h2>
              <p className="mt-2 text-base text-stone-600 dark:text-zinc-400">
                Projects I have finished or retired.
              </p>
              <ProjectGrid projects={past} />
            </motion.div>
          )}
        </LayoutGroup>
      </PageLayout>
    </>
  );
}
