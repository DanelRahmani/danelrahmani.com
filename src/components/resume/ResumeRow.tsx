import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import { useId, useState } from 'react';

import { ResumeEntry } from '../../data/resume';

const EASE = [0.22, 1, 0.36, 1] as const;

const Heading = ({ entry }: { entry: ResumeEntry }) => (
  <span className="flex flex-auto flex-wrap items-baseline gap-x-4 gap-y-0.5 text-left">
    <span className="min-w-0 flex-1 basis-64">
      <span className="block text-base font-medium text-stone-900 dark:text-stone-100">
        {entry.title}
      </span>
      <span className="block text-sm text-stone-600 dark:text-stone-400">{entry.subtitle}</span>
      {entry.note && (
        <span className="block font-mono text-xs text-primary dark:text-dark-accent">
          {entry.note}
        </span>
      )}
    </span>
    <span className="flex-none font-mono text-xs tabular-nums text-stone-600 dark:text-stone-400">
      {entry.start} <span aria-hidden="true">-</span>
      <span className="sr-only">until</span> {entry.end}
      <span className="hidden sm:inline">, {entry.location}</span>
    </span>
  </span>
);

/**
 * One résumé entry. Entries with details unfold on click: the reader chooses
 * the depth, so coursework and grades are available without being shouted.
 * The panel is always in the DOM (server-rendered, printable, findable) and
 * only its height animates; print styles force it open via `.resume-panel`.
 */
export const ResumeRow = ({
  entry,
  defaultOpen = false,
}: {
  entry: ResumeEntry;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();
  const panelId = useId();
  const expandable = entry.details.length > 0 || Boolean(entry.coursework?.length);

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="resume-row border-b border-primary/10 last:border-b-0 dark:border-dark-accent/15"
    >
      {expandable ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full items-start gap-3 rounded-md py-5 outline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-dark-accent"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className={clsx(
              'no-print mt-1.5 h-3.5 w-3.5 flex-none stroke-primary/60 transition-transform duration-200 group-hover:stroke-primary dark:stroke-dark-accent/70 dark:group-hover:stroke-dark-accent',
              open && 'rotate-90',
            )}
          >
            <path d="M6 3l5 5-5 5" fill="none" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <Heading entry={entry} />
        </button>
      ) : (
        <div className="flex w-full items-start gap-3 py-5">
          <span aria-hidden="true" className="no-print mt-1.5 h-3.5 w-3.5 flex-none" />
          <Heading entry={entry} />
        </div>
      )}

      {expandable && (
        <motion.div
          id={panelId}
          aria-hidden={!open}
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE }}
          className="resume-panel overflow-hidden"
        >
          <div className="pb-6 pl-[1.625rem] pr-1">
            {entry.details.length > 0 && (
              <ul className="max-w-[68ch] list-disc space-y-1.5 pl-4 text-sm text-stone-700 marker:text-primary/50 dark:text-stone-300 dark:marker:text-dark-accent/60">
                {entry.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
            {entry.coursework && (
              <div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {entry.coursework.map((group) => (
                  <div key={group.group}>
                    <h4 className="font-mono text-xs text-primary dark:text-dark-accent">
                      {group.group}
                    </h4>
                    <ul className="mt-1.5 space-y-1 text-sm text-stone-700 dark:text-stone-300">
                      {group.courses.map((course) => (
                        <li key={course.name} className="flex items-baseline justify-between gap-4">
                          <span>{course.name}</span>
                          {course.grade && (
                            <span className="flex-none font-mono text-xs tabular-nums text-stone-600 dark:text-stone-400">
                              <span className="sr-only">grade </span>
                              {course.grade}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
};
