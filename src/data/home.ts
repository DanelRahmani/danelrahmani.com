// Start-page content that is not résumé data: the milestone thread and the
// selected-work rows. Pure data so the copy rules can be unit tested.

export type Milestone = {
  when: string;
  title: string;
  detail: string;
  /** The last, still-open stitch. */
  open?: boolean;
};

export const milestones: Milestone[] = [
  {
    when: '2020',
    title: "The atelier's books",
    detail: 'Bookkeeping and invoicing for the family business in Leek.',
  },
  { when: '2024', title: 'VWO, Cum Laude', detail: 'Rsg de Borgen, Economics and Society.' },
  {
    when: '2024',
    title: 'Groningen',
    detail: 'BSc International Business. Honours College from 2025.',
  },
  {
    when: 'Jul 2026',
    title: 'Axiom Digital',
    detail: 'Founded a consultancy for small businesses.',
  },
  {
    when: 'Sep 2026',
    title: 'Tokyo',
    detail: 'Waseda, economics and finance, on the NL Scholarship.',
  },
  {
    when: 'Summer 2027',
    title: 'An internship in finance',
    detail: 'This one is yours to fill in',
    open: true,
  },
];

export type SelectedWorkFigure = 'valuation' | 'runway' | 'islm';

export type SelectedWorkItem = {
  /** Must match a title in MyCurrentProjects; links are read from there. */
  project: string;
  kicker: string;
  shows: string;
  detail: string;
  figure: SelectedWorkFigure;
};

export const selectedWork: SelectedWorkItem[] = [
  {
    project: 'Valuation Models',
    kicker: 'Company valuation',
    shows:
      'Type an S&P 500 ticker and get eight valuation methods side by side, built from the company’s SEC filings.',
    detail:
      'Every number can be clicked to show its formula, and the whole model downloads as an Excel workbook with live formulas.',
    figure: 'valuation',
  },
  {
    project: 'Runway',
    kicker: 'Cash-flow forecasting',
    shows:
      'A day-by-day balance projection that shows when the cash runs out, and what changes if one assumption does.',
    detail: 'Private and browser-local, made for freelancers, students and small businesses.',
    figure: 'runway',
  },
  {
    project: 'EconoSim',
    kicker: 'Macroeconomics',
    shows: '21 textbook models, from Solow and IS-LM to Mundell-Fleming and game theory.',
    detail: 'With shocks, time paths and the exact step-by-step working behind every figure.',
    figure: 'islm',
  },
];

/** The Tokyo line in the hero disappears once the exchange is over. */
export const TOKYO_UNTIL = Date.UTC(2027, 3, 1);
