import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useRef } from 'react';

import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { StitchUnderline } from '../components/Stitch';
import { ReadingThread } from '../components/motion/ReadingThread';
import { LanguageList } from '../components/resume/LanguageList';
import { ResumeRow } from '../components/resume/ResumeRow';
import { ResumeSection } from '../components/resume/ResumeSection';
import { MyCurrentProjects } from '../data/lifeApi';
import {
  awards,
  certifications,
  education,
  experience,
  interests,
  languages,
  leadership,
  profile,
  skills,
} from '../data/resume';
import { buildOpenGraphUrl } from '../lib/og';

const seoTitle = 'Résumé';
const seoDescription =
  'The résumé of Danel Rahmani: International Business at the University of Groningen, exchange at Waseda University, founder of Axiom Digital.';

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 14, filter: 'blur(5px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const contactLink =
  'link-thread text-primary transition hover:text-primary-light dark:text-dark-accent dark:hover:text-dark-accent-hover';

const plainItem = 'py-3 text-sm text-stone-700 dark:text-stone-300';

export default function ResumePage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}/resume`}
        openGraph={{
          images: [{ url: buildOpenGraphUrl({ title: seoTitle, description: seoDescription }) }],
        }}
      />
      <Container className="mt-16 sm:mt-24">
        <div className="max-w-3xl">
          <header className="resume-header">
            <motion.h1
              {...enter(0)}
              className="font-serif text-5xl italic leading-[1.1] tracking-tight text-stone-900 text-balance dark:text-stone-100 sm:text-6xl"
            >
              {profile.name}
            </motion.h1>
            <StitchUnderline className="no-print mt-4" />
            <motion.p {...enter(0.15)} className="mt-6 max-w-2xl text-base text-balance">
              {profile.summary}
            </motion.p>
            <motion.p
              {...enter(0.2)}
              className="mt-4 font-mono text-xs text-stone-600 dark:text-stone-400"
            >
              {profile.location}. {profile.relocation}.
            </motion.p>
            <motion.ul
              {...enter(0.25)}
              className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium"
            >
              <li>
                <a href={`mailto:${profile.email}`} className={contactLink}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={contactLink}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className={contactLink}>
                  GitHub
                </a>
              </li>
            </motion.ul>
            <motion.div {...enter(0.3)} className="no-print mt-8 flex flex-wrap gap-4">
              <Button as="a" href={profile.pdf} download="Danel_Rahmani_CV.pdf">
                Download PDF
              </Button>
              <Button variant="secondary" type="button" onClick={() => window.print()}>
                Print
              </Button>
            </motion.div>
          </header>

          <div ref={timelineRef} className="relative">
            <ReadingThread target={timelineRef} />

            <ResumeSection title="Education">
              <ul>
                {education.map((entry) => (
                  <ResumeRow key={entry.id} entry={entry} />
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Experience">
              <ul>
                {experience.map((entry) => (
                  <ResumeRow key={entry.id} entry={entry} />
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Leadership and activities">
              <ul>
                {leadership.map((entry) => (
                  <ResumeRow key={entry.id} entry={entry} />
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Projects">
              <ul className="divide-y divide-primary/10 dark:divide-dark-accent/15">
                {MyCurrentProjects.map((project) => (
                  <li key={project.title} className="py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="text-base font-medium text-stone-900 dark:text-stone-100">
                        {project.links?.[0] ? (
                          <a
                            href={project.links[0].href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-thread transition hover:text-primary dark:hover:text-dark-accent"
                          >
                            {project.title}
                          </a>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <span className="font-mono text-xs text-stone-600 dark:text-stone-400">
                        {project.techStack.join(', ')}
                      </span>
                    </div>
                    <p className="mt-1 max-w-[68ch] text-sm text-stone-600 dark:text-stone-400">
                      {project.description}
                    </p>
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Languages">
              <LanguageList languages={languages} />
            </ResumeSection>

            <ResumeSection title="Skills">
              <ul className="flex flex-wrap gap-2 py-4">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-primary/[0.06] px-2.5 py-0.5 font-mono text-xs leading-5 text-primary dark:bg-dark-accent/10 dark:text-dark-accent-hover"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Certification and awards">
              <ul className="divide-y divide-primary/10 dark:divide-dark-accent/15">
                {[...certifications, ...awards].map((item) => (
                  <li key={item} className={plainItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="Interests">
              <p className={plainItem}>{interests.join(', ')}</p>
            </ResumeSection>
          </div>
        </div>
      </Container>
    </>
  );
}
