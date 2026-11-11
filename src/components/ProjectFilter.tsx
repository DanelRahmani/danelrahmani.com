import clsx from 'clsx';
import { motion } from 'framer-motion';

import { CATEGORY_LABELS, PROJECT_CATEGORIES, ProjectFilterValue } from '../lib/projects';

const OPTIONS: ProjectFilterValue[] = ['all', ...PROJECT_CATEGORIES];

/**
 * Filter chips for the projects grid. The active chip carries the site's
 * dashed thread, which slides between chips (shared layout) on change.
 */
export const ProjectFilter = ({
  value,
  onChange,
}: {
  value: ProjectFilterValue;
  onChange: (value: ProjectFilterValue) => void;
}) => (
  <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-x-2 gap-y-3">
    {OPTIONS.map((option) => {
      const active = option === value;
      return (
        <button
          key={option}
          type="button"
          aria-pressed={active}
          onClick={() => onChange(option)}
          className={clsx(
            'relative rounded-full px-3 py-1.5 font-mono text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-dark-accent',
            active
              ? 'bg-primary/[0.08] text-primary dark:bg-dark-accent/15 dark:text-dark-accent-hover'
              : 'text-stone-600 hover:bg-primary/[0.05] hover:text-primary dark:text-stone-400 dark:hover:bg-dark-accent/10 dark:hover:text-dark-accent-hover',
          )}
        >
          {CATEGORY_LABELS[option]}
          {active && (
            <motion.span
              layoutId="project-filter-thread"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
              className="seam absolute inset-x-3 -bottom-1 h-0"
              style={{ borderTopColor: 'currentColor' }}
            />
          )}
        </button>
      );
    })}
  </div>
);
