import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useId, useMemo, useState } from 'react';

import { SelectedWorkFigure, selectedWork } from '../../data/home';
import { MyCurrentProjects } from '../../data/lifeApi';

const EASE = [0.22, 1, 0.36, 1] as const;

const rowEnter = {
  initial: { opacity: 0, y: 14, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: EASE },
};

const label = 'font-mono text-xs text-stone-600 dark:text-stone-400';
const svgLabel = 'fill-stone-500 font-mono text-[11px] dark:fill-stone-400';

const Chip = ({
  pressed,
  onClick,
  children,
}: React.PropsWithChildren<{ pressed: boolean; onClick: () => void }>) => (
  <button
    type="button"
    aria-pressed={pressed}
    onClick={onClick}
    className={clsx(
      'flex-none whitespace-nowrap rounded-full border px-3 py-0.5 font-mono text-xs leading-5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-dark-accent',
      pressed
        ? 'border-dashed border-primary bg-primary/[0.06] text-primary dark:border-dark-accent dark:bg-dark-accent/10 dark:text-dark-accent'
        : 'border-primary/15 text-stone-600 hover:border-primary/50 hover:text-primary dark:border-dark-accent/20 dark:text-stone-400 dark:hover:text-dark-accent',
    )}
  >
    {children}
  </button>
);

/* ── Valuation Models: a football field. Each method gives a value range;
      a higher discount rate pulls every range down. Shapes only, no real
      company and no numbers. ── */
const METHODS: { name: string; from: number; to: number }[] = [
  { name: 'FCFF DCF', from: 46, to: 78 },
  { name: 'FCFE DCF', from: 42, to: 74 },
  { name: 'APV', from: 48, to: 80 },
  { name: 'Residual income', from: 38, to: 66 },
  { name: 'Dividend models', from: 30, to: 54 },
  { name: 'Multiples', from: 50, to: 88 },
];

const ValuationFigure = () => {
  const [higherRate, setHigherRate] = useState(false);
  const shift = higherRate ? -13 : 0;

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className={label}>Value per share, by method</span>
        <Chip pressed={higherRate} onClick={() => setHigherRate((value) => !value)}>
          {higherRate ? 'Reset' : 'Raise the discount rate'}
        </Chip>
      </div>
      <div className="relative mt-4">
        <ul className="space-y-2.5">
          {METHODS.map((method, index) => (
            <li key={method.name} className="grid grid-cols-[7.5rem_1fr] items-center gap-3">
              <span className={label}>{method.name}</span>
              <span className="relative block h-2.5">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.08 * index, ease: EASE }}
                  style={{
                    left: `${method.from + shift * (0.7 + index * 0.06)}%`,
                    width: `${method.to - method.from}%`,
                    transformOrigin: 'left',
                  }}
                  className="absolute inset-y-0 rounded-full bg-primary/80 transition-[left] duration-500 ease-out dark:bg-dark-accent/80"
                />
              </span>
            </li>
          ))}
        </ul>
        {/* The market price: where the ranges are read against. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[7.5rem] right-0 ml-3"
        >
          <div className="seam-l absolute -top-1 -bottom-1 left-[58%]" />
        </div>
      </div>
      <p className={clsx(label, 'mt-3 text-right')}>dashed line: share price. Illustrative.</p>
    </>
  );
};

/* ── Runway: the projected balance responds to one assumption. ── */
const DAYS = 120;

const RunwayFigure = () => {
  const [rent, setRent] = useState(620);
  const id = useId();

  const { points, emptyOn } = useMemo(() => {
    let balance = 1900;
    let firstNegative = -1;
    const path: string[] = [];
    for (let day = 0; day <= DAYS; day++) {
      if (day % 30 === 1) balance -= rent;
      if (day % 30 === 24) balance += 1150;
      balance -= 21;
      if (balance < 0 && firstNegative < 0) firstNegative = day;
      path.push(`${((day / DAYS) * 400).toFixed(1)},${(120 - (balance / 2400) * 110).toFixed(1)}`);
    }
    return { points: path.join(' '), emptyOn: firstNegative };
  }, [rent]);

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className={label}>Balance, next {DAYS} days</span>
        <output
          htmlFor={id}
          className="font-mono text-xs font-medium text-primary dark:text-dark-accent"
        >
          {emptyOn >= 0 ? `Runs out on day ${emptyOn}` : 'Stays above zero'}
        </output>
      </div>
      <svg
        viewBox="0 0 400 150"
        role="img"
        aria-label="Projected balance over the next 120 days"
        className="mt-3 block w-full overflow-visible text-primary dark:text-dark-accent"
      >
        <line
          x1="0"
          y1="120"
          x2="400"
          y2="120"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeDasharray="3 4"
        />
        <text x="0" y="135" className={svgLabel}>
          zero
        </text>
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {emptyOn >= 0 && <circle cx={(emptyOn / DAYS) * 400} cy="120" r="4" fill="currentColor" />}
      </svg>
      <div className="mt-2 flex items-center gap-3">
        <label htmlFor={id} className={label}>
          Monthly rent
        </label>
        <input
          id={id}
          type="range"
          min={450}
          max={950}
          step={10}
          value={rent}
          onChange={(event) => setRent(Number(event.target.value))}
          className="flex-1 accent-primary dark:accent-dark-accent"
        />
        <span className={clsx(label, 'w-8 text-right tabular-nums')}>{rent}</span>
      </div>
    </>
  );
};

/* ── EconoSim: IS-LM. Tightening the money supply shifts LM left; the
      equilibrium moves to a higher rate and lower output. ── */
const IsLmFigure = () => {
  const [tight, setTight] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className={label}>IS-LM</span>
        <Chip pressed={tight} onClick={() => setTight((value) => !value)}>
          {tight ? 'Reset' : 'Tighten money supply'}
        </Chip>
      </div>
      <svg
        viewBox="0 0 400 190"
        role="img"
        aria-label="IS-LM diagram"
        className="mt-3 block w-full overflow-visible"
      >
        <g className="stroke-stone-400 dark:stroke-stone-600" strokeWidth="1">
          <line x1="30" y1="10" x2="30" y2="170" />
          <line x1="30" y1="170" x2="390" y2="170" />
        </g>
        <text x="8" y="18" className={svgLabel}>
          i
        </text>
        <text x="382" y="186" className={svgLabel}>
          Y
        </text>
        <path
          d="M60 30Q200 90 360 150"
          fill="none"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="stroke-stone-800 dark:stroke-stone-200"
        />
        <text x="366" y="153" className={svgLabel}>
          IS
        </text>
        <g
          style={{ transform: tight ? 'translate(-62px, -6px)' : 'none' }}
          className="transition-transform duration-500 ease-out"
        >
          <path
            d="M70 155Q230 110 350 25"
            fill="none"
            strokeWidth="1.75"
            strokeLinecap="round"
            className="stroke-primary dark:stroke-dark-accent"
          />
          <text x="356" y="26" className={svgLabel}>
            LM
          </text>
        </g>
        <circle
          r="4.5"
          cx="0"
          cy="0"
          style={{ transform: tight ? 'translate(176px, 84px)' : 'translate(222px, 103px)' }}
          className="fill-primary transition-transform duration-500 ease-out dark:fill-dark-accent"
        />
      </svg>
    </>
  );
};

const FIGURES: Record<SelectedWorkFigure, () => JSX.Element> = {
  valuation: ValuationFigure,
  runway: RunwayFigure,
  islm: IsLmFigure,
};

const linkLabel = (text: string) => (text === 'GitHub Repository' ? 'Source on GitHub' : text);

/**
 * The finance projects, shown on the start page as editorial rows: what each
 * one shows, and a small figure that answers the reader. The figures are
 * sketches of what the apps do, not screenshots or real data.
 */
export const SelectedWork = () => (
  <section aria-labelledby="work-title" id="work">
    <div className="flex items-baseline justify-between gap-4">
      <h2
        id="work-title"
        className="font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-zinc-100"
      >
        Selected work
      </h2>
      <Link
        href="/projects"
        className="link-thread text-sm font-medium text-primary dark:text-dark-accent"
      >
        All projects
      </Link>
    </div>
    <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
      Three things I built to understand finance better. Each one runs in your browser.
    </p>

    <div className="mt-4 divide-y divide-dashed divide-primary/30 dark:divide-dark-accent/30">
      {selectedWork.map((item, index) => {
        const Figure = FIGURES[item.figure];
        const project = MyCurrentProjects.find((entry) => entry.title === item.project);
        return (
          <motion.article
            key={item.project}
            {...rowEnter}
            className="grid grid-cols-1 items-center gap-8 py-10 lg:grid-cols-[5fr_6fr] lg:gap-14"
          >
            <div>
              <p className={label}>{item.kicker}</p>
              <h3 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                {item.project}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-7 text-stone-900 dark:text-stone-200">
                {item.shows}
              </p>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{item.detail}</p>
              {project?.links && (
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-thread text-sm font-medium text-primary dark:text-dark-accent"
                      >
                        {linkLabel(link.label)}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div
              className={clsx(
                'card-shadow panel rounded-3xl border border-primary/10 p-6 dark:border-stone-700/40',
                index % 2 === 1 && 'lg:order-first',
              )}
            >
              <Figure />
            </div>
          </motion.article>
        );
      })}
    </div>
  </section>
);
