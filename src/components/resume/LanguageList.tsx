import { Language } from '../../data/resume';

/**
 * Languages with their level always visible. Hovering or focusing one fades
 * in a greeting in that language and script: decorative, so hidden from
 * assistive technology, which already reads the name and level.
 */
export const LanguageList = ({ languages }: { languages: Language[] }) => (
  <ul className="divide-y divide-primary/10 dark:divide-dark-accent/15">
    {languages.map((language) => (
      <li
        key={language.name}
        tabIndex={0}
        className="group flex flex-wrap items-baseline gap-x-4 gap-y-0.5 rounded-md py-3 outline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-dark-accent"
      >
        <span className="w-24 flex-none text-base font-medium text-stone-900 dark:text-stone-100">
          {language.name}
        </span>
        <span className="min-w-0 flex-1 basis-48 text-sm text-stone-600 dark:text-stone-400">
          {language.level}
        </span>
        <span
          aria-hidden="true"
          lang={language.lang}
          dir={language.dir}
          className="no-print flex-none translate-y-0.5 font-serif text-lg italic text-primary opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 dark:text-dark-accent"
        >
          {language.greeting}
        </span>
      </li>
    ))}
  </ul>
);
