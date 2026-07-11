import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

import { PageLayout } from '../components/PageLayout';
import { ProjectCard } from '../components/ProjectCard';
import { MyCurrentProjects, MyPastProjects } from '../data/lifeApi';
import { ANIMATION_FROM_PROPS, ANIMATION_TO_PROPS } from '../lib/animation';
import { buildOpenGraphUrl } from '../lib/og';

const seoTitle = 'Projects';
const seoDescription = "Projects I've worked on";

export default function Creating() {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/creating`}
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
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
          Now
        </h2>
        <p className="mt-2 text-base text-stone-600 dark:text-zinc-400">
          Projects I currently work on.
        </p>
        <ul
          role="list"
          className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MyCurrentProjects.map((project) => (
            <motion.li
              key={project.title}
              initial={ANIMATION_FROM_PROPS}
              whileInView={ANIMATION_TO_PROPS}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </ul>

        <h2 className="mt-24 font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100">
          Past
        </h2>
        <p className="mt-2 text-base text-stone-600 dark:text-zinc-400">
          Projects I have finished or retired.
        </p>
        <ul
          role="list"
          className="mt-12 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {MyPastProjects.map((project) => (
            <motion.li
              key={project.title}
              initial={ANIMATION_FROM_PROPS}
              whileInView={ANIMATION_TO_PROPS}
              viewport={{ once: true }}
            >
              <ProjectCard key={project.title} project={project} />
            </motion.li>
          ))}
        </ul>
      </PageLayout>
    </>
  );
}
