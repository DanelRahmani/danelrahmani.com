// Single source of truth for résumé facts. The résumé page, the start-page
// ledger cards and the structured data all read from here, so they cannot
// drift apart. Pure data: no image imports, so it can be unit tested.
// Content rules are enforced in resume.test.ts.

export type Course = { name: string; grade?: string };
export type CourseGroup = { group: string; courses: Course[] };

export type ResumeEntry = {
  id: string;
  /** Organisation or school. */
  title: string;
  /** Role or degree. */
  subtitle: string;
  location: string;
  /** For example 'Sep 2026'. */
  start: string;
  /** For example 'Mar 2027' or 'Present'. */
  end: string;
  /** Short distinction shown beside the entry. */
  note?: string;
  details: string[];
  coursework?: CourseGroup[];
};

export type Language = {
  name: string;
  level: string;
  greeting: string;
  /** BCP 47 tag for the greeting. */
  lang: string;
  dir?: 'rtl';
};

export const profile = {
  name: 'Danel Rahmani',
  summary:
    'International Business student at the University of Groningen, on exchange at Waseda University in Tokyo. Looking for a summer 2027 internship in corporate finance, M&A or asset management.',
  location: 'Groningen, the Netherlands',
  relocation: 'Willing to relocate',
  email: 'danelrahmani@outlook.com',
  linkedin: 'https://www.linkedin.com/in/danelrahmani',
  github: 'https://github.com/DanelRahmani',
  pdf: '/assets/resume.pdf',
} as const;

export const education: ResumeEntry[] = [
  {
    id: 'waseda',
    title: 'Waseda University',
    subtitle: 'Exchange semester, School of Political Science and Economics',
    location: 'Tokyo, Japan',
    start: 'Sep 2026',
    end: 'Mar 2027',
    note: 'NL Scholarship',
    details: [
      'One-semester exchange in economics and finance, taught in English, as part of my bachelor at the University of Groningen.',
      'Awarded the merit-based NL Scholarship by the University of Groningen and the Dutch Ministry of Education, Culture and Science.',
    ],
    coursework: [
      {
        group: 'Money and macro',
        courses: [
          { name: 'Money and Banking I' },
          { name: 'Macroeconomics II' },
          { name: 'International Macroeconomics (graduate-level)' },
        ],
      },
      {
        group: 'Quantitative',
        courses: [
          { name: 'Econometrics I (regression and instrumental variables, in R)' },
          { name: 'Linear Algebra' },
          { name: 'Calculus' },
        ],
      },
      {
        group: 'Policy and markets',
        courses: [
          { name: 'Public Finance' },
          { name: 'Political Economics' },
          { name: 'Industrial Organization' },
        ],
      },
    ],
  },
  {
    id: 'rug-bsc',
    title: 'University of Groningen',
    subtitle: 'BSc International Business, Honours College',
    location: 'Groningen, the Netherlands',
    start: 'Sep 2024',
    end: 'Jun 2027',
    note: 'GPA 9.1/10',
    details: [
      'English-taught bachelor combining economics, finance, quantitative methods and management in an international context.',
      'Honours College (Apr 2025 - Jun 2027): a research-oriented, interdisciplinary programme taken alongside the degree, including a systematic literature review on mobile payments in China.',
    ],
    coursework: [
      {
        group: 'Finance and accounting',
        courses: [
          { name: 'Fundamentals of Finance', grade: '10' },
          { name: 'Financial Accounting', grade: '10' },
          { name: 'Sustainable Management Accounting', grade: '10' },
        ],
      },
      {
        group: 'Economics and quantitative',
        courses: [
          { name: 'Economics for International Business', grade: '10' },
          { name: 'Statistics I (Stata)', grade: '10' },
          { name: 'Statistics II (regression, ANOVA, time series)', grade: '9' },
          { name: 'International Trade and Competition', grade: '10' },
          { name: 'Firm Location and FDI', grade: '10' },
        ],
      },
      {
        group: 'Business and strategy',
        courses: [
          { name: 'Digital Transformation in International Business', grade: '10' },
          { name: 'Innovation Management in Multinationals', grade: '9' },
          { name: 'Global Supply Chain Management', grade: '9' },
          { name: 'International Business Law', grade: '9' },
          { name: 'Cross-cultural Management', grade: '9' },
          { name: 'Global Political Economy', grade: '8' },
        ],
      },
      {
        group: 'Honours College',
        courses: [
          { name: 'Honours Research Seminar II', grade: '9' },
          { name: 'Honours Research Practical', grade: '9.4' },
        ],
      },
    ],
  },
  {
    id: 'rsg-de-borgen',
    title: 'Rsg de Borgen, Lindenborg',
    subtitle: 'VWO, Economics and Society profile',
    location: 'Leek, the Netherlands',
    start: 'Sep 2018',
    end: 'Jul 2024',
    note: 'Cum Laude',
    details: [],
  },
];

export const experience: ResumeEntry[] = [
  {
    id: 'axiom-digital',
    title: 'Axiom Digital',
    subtitle: 'Founder',
    location: 'Groningen, the Netherlands',
    start: 'Jul 2026',
    end: 'Present',
    details: [
      'Founded an AI and digitalisation consultancy for small businesses in the Northern Netherlands. I advise owners on where AI and automation add real value, and where they do not.',
      'Build websites and digital tools for local businesses.',
      'Two active clients, now in the maintenance phase. I own client acquisition, delivery, brand and administration.',
      'Built a VAT-compliant invoicing system, an Excel ledger with quarterly VAT summaries, and a business plan with financial projections.',
    ],
  },
  {
    id: 'atelier',
    title: "Rahmani's Gordijn-Kledingatelier",
    subtitle: 'Operations and Digital Lead',
    location: 'Leek, the Netherlands',
    start: 'Sep 2020',
    end: 'Present',
    note: 'Family business, part-time',
    details: [
      'Run bookkeeping, invoicing and financial administration, keeping cash flow and records up to date.',
      'Handle procurement and supplier relations, sourcing fabrics and materials at the right price and quality.',
      'Improved internal processes and digitised administrative work, including bookkeeping, saving about 8 hours per week through automation.',
      'Built and maintain the company website and digital systems, and serve customers directly, from first consultation and fitting to the finished piece.',
    ],
  },
];

export const leadership: ResumeEntry[] = [
  {
    id: 'mep',
    title: 'Model European Parliament',
    subtitle: 'Delegate and mentor',
    location: 'Groningen and The Hague',
    start: '2022',
    end: '2023',
    details: [
      'Mentor, MEP Groningen (2023): coached new participants on debating, building arguments and policy writing, and managed delegation meetings.',
      'Delegate, MEP Nederland in The Hague and MEP Groningen (2022): represented a member state, and drafted, amended, negotiated and voted on resolutions. Researched cryptocurrency legislation in a transnational context.',
    ],
  },
  {
    id: 'generatie-aan-zet',
    title: 'Generatie aan Zet',
    subtitle: 'EU citizenship programme, participant',
    location: 'Brussels',
    start: 'Nov 2022',
    end: 'Jan 2023',
    details: [
      'Visited the European Parliament in Brussels, met a Member of the European Parliament and interviewed a journalist on EU politics.',
      'Ran sessions for fellow students on what the EU does and why it matters.',
    ],
  },
];

export const languages: Language[] = [
  { name: 'Dutch', level: 'Native', greeting: 'Hallo', lang: 'nl' },
  { name: 'Persian', level: 'Native', greeting: 'سلام', lang: 'fa', dir: 'rtl' },
  { name: 'English', level: 'Fluent, Cambridge C2 Proficiency', greeting: 'Hello', lang: 'en' },
  {
    name: 'Japanese',
    level: 'Conversational, studying toward fluency',
    greeting: 'こんにちは',
    lang: 'ja',
  },
  { name: 'French', level: 'Elementary', greeting: 'Bonjour', lang: 'fr' },
];

export const skills: string[] = [
  'Excel (advanced)',
  'PowerPoint',
  'Python',
  'R',
  'Stata',
  'GitHub',
  'Next.js, React and TypeScript',
  'FastAPI',
  'Docker and Linux',
];

export const certifications: string[] = ['Cambridge C2 Proficiency, score 204 (Jun 2023)'];

export const awards: string[] = [
  'NL Scholarship (Aug 2026): merit-based, awarded by the University of Groningen and the Dutch Ministry of Education, Culture and Science',
];

export const interests: string[] = [
  'Financial markets',
  'Japanese language and culture',
  'Piano',
  'History',
];
