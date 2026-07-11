import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { Work, Education } from '../data/lifeApi';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { AcademicCapIcon } from './icons/AcademicCapIcon';

// The two ledger cards materialize in sequence as they scroll into view:
// Work first, Education a beat later. Once, softly, and the MotionConfig
// wrapper strips the rise under reduced motion.
const ledgerEnter = (delay: number) => ({
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

// The image optimizer rejects SVG unless dangerouslyAllowSVG is set, so vector
// logos are passed through untouched while raster logos get resized.
const isSvg = (logo: StaticImageData | string) =>
  (typeof logo === 'string' ? logo : logo.src).endsWith('.svg');

export const Resume = () => {
  return (
    <div className="max-w-[420px] space-y-6">
      <motion.div
        {...ledgerEnter(0)}
        className="card-shadow panel rounded-2xl border border-primary/10 p-6 dark:border-zinc-700/40"
      >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Work</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {Work.map((role, roleIndex) => (
            <li key={roleIndex} className="flex gap-4">
              <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 border border-zinc-200 dark:border-zinc-700/40 bg-zinc-50 dark:bg-zinc-800/40">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white overflow-hidden">
                  <Image
                    src={role.logo}
                    alt=""
                    sizes="32px"
                    className="h-full w-full object-cover"
                    unoptimized={isSvg(role.logo)}
                  />
                </div>
              </div>
              <dl className="flex flex-auto flex-wrap items-baseline gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="min-w-0 flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {role.company}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                  className="ml-auto flex-none whitespace-nowrap font-mono text-xs tabular-nums text-stone-500 dark:text-zinc-400"
                  aria-label={`${role.start} until ${role.end}`}
                >
                  <time dateTime={role.start}>{role.start}</time> <span aria-hidden="true">-</span>{' '}
                  <time dateTime={role.end}>{role.end}</time>
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="w-full text-xs text-zinc-500 dark:text-zinc-400">{role.title}</dd>
              </dl>
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.div
        {...ledgerEnter(0.12)}
        className="card-shadow panel rounded-2xl border border-primary/10 p-6 dark:border-zinc-700/40"
      >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <AcademicCapIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Education</span>
        </h2>
        <ol className="mt-6 space-y-4">
          {Education.map((entry, index) => (
            <li key={index} className="flex gap-4">
              <dl className="flex flex-auto flex-wrap items-baseline gap-x-2">
                <dt className="sr-only">School</dt>
                <dd className="min-w-0 flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {entry.school}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                  className="ml-auto flex-none whitespace-nowrap font-mono text-xs tabular-nums text-stone-500 dark:text-zinc-400"
                  aria-label={`${entry.start} until ${entry.end}`}
                >
                  <time dateTime={entry.start}>{entry.start}</time> <span aria-hidden="true">-</span>{' '}
                  <time dateTime={entry.end}>{entry.end}</time>
                </dd>
                <dt className="sr-only">Degree</dt>
                <dd className="w-full text-xs text-zinc-500 dark:text-zinc-400">{entry.degree}</dd>
                {entry.distinction && (
                  <>
                    <dt className="sr-only">Distinction</dt>
                    <dd className="w-full font-mono text-xs tabular-nums text-primary/80 dark:text-dark-accent/90">
                      {entry.distinction}
                    </dd>
                  </>
                )}
              </dl>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
};
