# danelrahmani.com Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing site into Danel's digital résumé: a new `/resume` page, a finance-first start page, corrected facts, filterable projects, and more interaction in the existing stitch-and-thread language.

**Architecture:** Résumé facts move into one pure data file (`src/data/resume.ts`) that the résumé page, the start-page cards and the structured data all read. New UI is small components under `src/components/resume/`, built from the existing tokens, `Seam`/`ReadingThread` and framer-motion. Project filtering is a pure helper with unit tests; everything visual is verified in the browser.

**Tech Stack:** Next.js 16 Pages Router, TypeScript, Tailwind 3, framer-motion 10, Yarn 4, Vitest (new, dev-only).

**Spec:** `docs/superpowers/specs/2026-11-11-site-refinement-design.md`. Read it together with `PRODUCT.md` and `DESIGN.md`.

## Global Constraints

- Refinement only: no new palette, typeface, layout system or framework.
- No runtime dependencies added. Vitest is the one dev dependency (planner's call; the repo has no test runner).
- Do not list the planned MSc Finance anywhere on the site.
- Do not publish Danel's phone number anywhere on the site.
- Location copy: "Groningen, the Netherlands" plus "Willing to relocate".
- Japanese level copy: "Conversational, studying toward fluency".
- High school entry stays, with "Cum Laude".
- No billboard statistics: GPA appears once, in the Groningen education row.
- All projects stay; the photo strip stays on the start page.
- Motion animates only transform, opacity or clip-path; every animation has a `prefers-reduced-motion` fallback; durations 150-250ms for UI, at most 500ms for entrances, ease `[0.22, 1, 0.36, 1]`.
- Voice: first person, short, no exclamation marks, no emoji, plain hyphens in date ranges (`Sep 2026 - Mar 2027`), no em or en dashes in visible copy.
- WCAG 2.2 AA: text contrast at least 4.5:1 in both themes, visible focus, full keyboard operation.
- Work on a branch named `refine-resume`. Nothing goes to `main` or production without Danel's go-ahead.

## Review Focus

1. JavaScript disabled or slow: résumé details must be in the server-rendered HTML, not created on click. Pinned in Task 3 (verification step with JS off).
2. Printing with rows collapsed: the printed page must show every row expanded, black on white, in both themes. Pinned in Task 4.
3. Keyboard and screen reader on unfolding rows: Enter and Space toggle, `aria-expanded` reflects state. Pinned in Task 3.
4. Reduced motion: the résumé thread, stitched card outline and row unfolding must show their final state without animating. Pinned in Tasks 3 and 7.
5. Phone width (375px): long titles such as "Rahmani's Gordijn-Kledingatelier" and date ranges must wrap without horizontal scroll. Pinned in Tasks 3 and 6.

## File Structure

| File | Responsibility |
|---|---|
| `src/data/resume.ts` (new) | All résumé facts, pure data, no image imports |
| `src/data/resume.test.ts` (new) | Guards the content rules (no MSc, no phone, wording) |
| `src/data/lifeApi.tsx` (modify) | `Work`/`Education` derived from `resume.ts`; hero copy; project `category` |
| `src/lib/projects.ts` + `.test.ts` (new) | Category list, sort and filter helpers |
| `src/pages/resume.tsx` (new) | The résumé page |
| `src/components/resume/ResumeRow.tsx` (new) | One unfolding entry |
| `src/components/resume/ResumeSection.tsx` (new) | Section heading plus list |
| `src/components/resume/LanguageList.tsx` (new) | Languages with greeting on hover/focus |
| `src/components/ProjectFilter.tsx` (new) | Filter chips |
| `src/components/Lightbox.tsx` (new, extracted) | Lightbox shared by `/images` and the home strip |
| `src/styles/index.css` (modify) | Print rules, stitched card outline |
| `src/components/Navigation.tsx`, `Resume.tsx`, `Photos.tsx`, `ProjectCard.tsx`, `src/pages/index.tsx`, `about.tsx`, `projects.tsx`, `images.tsx` (modify) | As described per task |

Already done in the codebase, so no task: the route crossfade and sliding navigation thread (`src/pages/_app.tsx`, `Navigation.tsx`).

---

### Task 1: Résumé data and content guards

**Files:**
- Create: `src/data/resume.ts`, `src/data/resume.test.ts`
- Modify: `package.json` (add `vitest` dev dependency and `"test": "vitest run"`), `src/data/lifeApi.tsx`

**Interfaces:**
- Produces, from `src/data/resume.ts`:

```ts
export type Course = { name: string; grade?: string };
export type CourseGroup = { group: string; courses: Course[] };
export type ResumeEntry = {
  id: string;
  title: string;      // organisation or school
  subtitle: string;   // role or degree
  location: string;
  start: string;      // 'Sep 2026'
  end: string;        // 'Mar 2027' | 'Present'
  note?: string;      // 'GPA 9.1/10' | 'Cum Laude' | 'NL Scholarship'
  details: string[];
  coursework?: CourseGroup[];
};
export type Language = { name: string; level: string; greeting: string; lang: string; dir?: 'rtl' };
export const profile: { name: string; summary: string; location: string; relocation: string; email: string; linkedin: string; github: string; pdf: string };
export const education: ResumeEntry[];   // ids: 'waseda', 'rug-bsc', 'rsg-de-borgen'
export const experience: ResumeEntry[];  // ids: 'axiom-digital', 'atelier'
export const leadership: ResumeEntry[];  // ids: 'mep', 'generatie-aan-zet'
export const languages: Language[];
export const skills: string[];
export const certifications: string[];
export const awards: string[];
export const interests: string[];
```

- [ ] **Step 1: Create branch and add Vitest**

Run: `git checkout -b refine-resume` then `yarn add -D vitest`. Add `"test": "vitest run"` to `package.json` scripts.

- [ ] **Step 2: Write the failing test** in `src/data/resume.test.ts`

```ts
import { describe, expect, it } from 'vitest';
import * as resume from './resume';

const everything = JSON.stringify(resume);

describe('résumé content rules', () => {
  it('never lists the planned MSc', () => expect(everything).not.toMatch(/MSc/i));
  it('never contains a phone number', () => expect(everything).not.toMatch(/\+31|\b06[ -]?\d/));
  it('uses no em or en dashes', () => expect(everything).not.toMatch(/[\u2013\u2014]/));
  it('lists education newest first, high school included', () =>
    expect(resume.education.map((e) => e.id)).toEqual(['waseda', 'rug-bsc', 'rsg-de-borgen']));
  it('marks the high school Cum Laude', () =>
    expect(resume.education[2].note).toBe('Cum Laude'));
  it('states the GPA once', () => expect(everything.match(/9\.1/g)).toHaveLength(1));
  it('ends Waseda in March 2027', () => expect(resume.education[0].end).toBe('Mar 2027'));
  it('titles the atelier role correctly', () =>
    expect(resume.experience[1].subtitle).toBe('Operations and Digital Lead'));
  it('places him in Groningen, willing to relocate', () => {
    expect(resume.profile.location).toBe('Groningen, the Netherlands');
    expect(resume.profile.relocation).toBe('Willing to relocate');
  });
  it('describes Japanese as conversational', () =>
    expect(resume.languages.find((l) => l.name === 'Japanese')?.level).toBe(
      'Conversational, studying toward fluency',
    ));
});
```

- [ ] **Step 3: Run it to see it fail**

Run: `yarn test`. Expected: FAIL, cannot resolve `./resume`.

- [ ] **Step 4: Write `src/data/resume.ts`**

Transcribe from `C:\Users\danel\OneDrive\Career\Danel_Rahmani_CV_Extended.pdf`: bullet points become `details`, coursework lists become `coursework` groups with the grades the CV prints. Omit the phone number and the MSc line. Pinned values:
- `profile.summary`: "International Business student at the University of Groningen, on exchange at Waseda University in Tokyo. Looking for a summer 2027 internship in corporate finance, M&A or asset management."
- `profile.pdf`: `/assets/resume.pdf`
- `rug-bsc`: subtitle "BSc International Business, Honours College", `Sep 2024` - `Jun 2027`, note "GPA 9.1/10". Yearly averages and "eight courses graded 10/10" are not repeated in `details`; the grades are visible in `coursework`.
- `waseda`: note "NL Scholarship".
- `languages`, in order: Dutch ("Native", "Hallo", `nl`), Persian ("Native", "سلام", `fa`, `rtl`), English ("Fluent, Cambridge C2 Proficiency", "Hello", `en`), Japanese ("Conversational, studying toward fluency", "こんにちは", `ja`), French ("Elementary", "Bonjour", `fr`).

- [ ] **Step 5: Run the tests**

Run: `yarn test`. Expected: 10 passed.

- [ ] **Step 6: Derive the start-page cards from the new data**

In `src/data/lifeApi.tsx`, replace the hand-written `Work` and `Education` arrays with arrays mapped from `experience` and `education` (keeping the same shape `Resume.tsx` reads: `company`/`title`/`logo`/`start`/`end` and `school`/`degree`/`start`/`end`/`distinction`, with `distinction` taken from `note`). Logos stay in `lifeApi.tsx`, keyed by entry `id`. The separate "Honours College" education row disappears because it is now part of `rug-bsc`.

- [ ] **Step 7: Verify and commit**

Run: `yarn typecheck && yarn test`. Expected: no errors, 10 passed.

```bash
git add package.json yarn.lock src/data
git commit -m "Move résumé facts into one data file with content guards"
```

---

### Task 2: Start page and About copy

**Files:**
- Modify: `src/data/lifeApi.tsx` (`About`, `AboutExtended`), `src/pages/index.tsx`, `src/pages/about.tsx`, `src/pages/projects.tsx:22`

**Interfaces:**
- Consumes: `profile` from `src/data/resume.ts`.

- [ ] **Step 1: Replace the hero copy** (`About` in `lifeApi.tsx`)

> I study International Business at the University of Groningen and am spending this year at Waseda University in Tokyo, where I focus on finance and economics. I have kept the books of my family's atelier since 2020, and I founded [Axiom Digital](https://axiomdigital.nl). I am looking for a summer 2027 internship in corporate finance, M&A or asset management.

Below it in `index.tsx`, one line in the mono label style (`font-mono text-xs`): "Based in Groningen. Willing to relocate."

- [ ] **Step 2: Swap the hero button** in `index.tsx`

The `MagneticButton` in the hero becomes an internal `Link` to `/resume` labelled "Résumé". Next to it sits a `variant="secondary"` button "Axiom Digital" linking to `AxiomDigital.href`. The "Work with me" button on the Axiom Digital card stays, and `Footer.tsx` gains an "Axiom Digital" link. Under the `<Resume />` cards add a `link-thread` link "Full résumé" to `/resume`.

- [ ] **Step 3: Update SEO and structured data** in `index.tsx`

`seoDescription`: "International Business student at the University of Groningen, on exchange at Waseda University in Tokyo. Founder of Axiom Digital." In `personJsonLd`: drop `jobTitle: 'Founder'`, add `address: { '@type': 'PostalAddress', addressLocality: 'Groningen', addressCountry: 'NL' }`, keep `worksFor` and `alumniOf`.

- [ ] **Step 4: Refresh `about.tsx`**

"Study" section: present tense, GPA removed from this page (it lives on the résumé), Waseda described as current ("I am on exchange at Waseda University in Tokyo until March 2027"). "Now" section: keep Axiom Digital, add one sentence on the internship search. The "Resume" button becomes a `Link` to `/resume` labelled "Résumé".

- [ ] **Step 5: Fix the projects canonical URL**

`src/pages/projects.tsx:22`: `/creating` becomes `/projects`.

- [ ] **Step 6: Verify in the browser**

Run: `yarn dev`, open `http://localhost:3000/` and `/about`. Expected: new hero text, "Résumé" button (404 until Task 3), photo strip unchanged directly under the hero, no mention of an MSc or "this September".

- [ ] **Step 7: Commit**

```bash
git add src
git commit -m "Reposition the start page and About around the finance story"
```

---

### Task 3: The résumé page

**Files:**
- Create: `src/pages/resume.tsx`, `src/components/resume/ResumeRow.tsx`, `src/components/resume/ResumeSection.tsx`, `src/components/resume/LanguageList.tsx`
- Modify: `src/components/Navigation.tsx:11-17`

**Interfaces:**
- Consumes: everything exported by `src/data/resume.ts`; `ReadingThread` (`{ target: RefObject<HTMLElement> }`); `MyCurrentProjects` from `lifeApi.tsx`.
- Produces: `ResumeRow({ entry: ResumeEntry; defaultOpen?: boolean })`, `ResumeSection({ title: string; children })`, `LanguageList({ languages: Language[] })`.

- [ ] **Step 1: Add the navigation entry**

In `NavigationItems`, insert `{ name: 'Résumé', href: '/resume', type: 'internal' }` after Home.

- [ ] **Step 2: Build `ResumeRow`**

A `<li>` whose header is a `<button aria-expanded aria-controls>` showing title, subtitle, `note` (mono, accent colour) and the date range (mono, right-aligned, wraps under the title below `sm`). The panel holds `details` as a list and `coursework` as groups of "course name, grade" pairs in mono. The panel is always rendered in the DOM; closed state is `height: 0; overflow: hidden` animated with framer-motion `animate={{ height: open ? 'auto' : 0 }}` over 250ms. With `useReducedMotion()` true, switch instantly. A chevron rotates 90 degrees when open. Add class `resume-panel` to the panel for the print rule in Task 4.

- [ ] **Step 3: Build `ResumeSection` and `LanguageList`**

`ResumeSection`: `h2` in the display serif (same classes as "Latest notes" in `index.tsx`), then a `Seam`, then children. `LanguageList`: each language is a focusable `<li tabIndex={0}>` with name and level; on hover or focus the greeting fades in beside it (150ms) with the entry's `lang` and `dir` attributes; greetings are `aria-hidden` (decorative), levels are always visible.

- [ ] **Step 4: Build `src/pages/resume.tsx`**

Inside `Container`, one column `max-w-3xl`, with a `ref` on the timeline wrapper passed to `<ReadingThread target={ref} />`. Order: header (name in `font-serif italic` like the home hero, `profile.summary`, location and relocation line in mono, email/LinkedIn/GitHub links, buttons "Download PDF" (`<a href={profile.pdf} download>`) and "Print" (`<button onClick={() => window.print()}>`)), then sections Education, Experience, Leadership, Projects (all `MyCurrentProjects` as compact rows: title, description, first link), Skills, Languages, Certification and awards, Interests. `NextSeo` title "Résumé", canonical `/resume`. `ResumeRow` entries enter with the same `whileInView` rise used in `Resume.tsx`, once.

- [ ] **Step 5: Verify behaviour in the browser**

Run: `yarn dev`, open `http://localhost:3000/resume`. Expected:
- Tab reaches every row header; Enter and Space toggle it; `aria-expanded` flips (check in the accessibility tree).
- The thread on the left extends as the page scrolls (desktop width).
- At 375px width there is no horizontal scroll and dates wrap under titles.
- With OS reduced motion on: rows open instantly, the thread is fully drawn.
- View source (or disable JavaScript): every `details` bullet and course is present in the HTML.
- The page contains no "MSc" and no phone number.

- [ ] **Step 6: Verify build and commit**

Run: `yarn typecheck && yarn lint && yarn build`. Expected: all succeed, `/resume` listed as a static page.

```bash
git add src
git commit -m "Add the résumé page with unfolding rows and navigation entry"
```

---

### Task 4: Print stylesheet and PDF

**Files:**
- Modify: `src/styles/index.css`, `public/assets/resume.pdf`

- [ ] **Step 1: Add print rules** to `src/styles/index.css`

```css
@media print {
  header, footer, nav, .no-print { display: none !important; }
  html, body, .panel { background: #fff !important; color: #000 !important; }
  .resume-panel { height: auto !important; overflow: visible !important; }
  * { animation: none !important; transition: none !important; box-shadow: none !important; }
  a { color: #000 !important; text-decoration: none !important; }
  @page { margin: 16mm; }
}
```

Add `no-print` to the résumé page's button row and to the `ReadingThread` wrapper; hide the fixed background panel from `_app.tsx` the same way.

- [ ] **Step 2: Verify the print view**

In the browser on `/resume`, with every row collapsed and the dark theme on, open print preview. Expected: black text on white, all rows expanded, no navigation, buttons or thread, at most two pages.

- [ ] **Step 3: Replace the PDF**

Publish `C:\Users\danel\OneDrive\Career\Danel_Rahmani_CV_Extended.pdf` as `public/assets/resume.pdf` with the phone number redacted (true redaction, so the text is removed from the file, not covered). Verify by extracting the PDF text: no `+31` and no `288`. The source file in `Career` is not modified.

- [ ] **Step 4: Commit**

```bash
git add src/styles/index.css src/pages public/assets
git commit -m "Add print layout for the résumé page"
```

---

### Task 5: Project categories and filter

**Files:**
- Create: `src/lib/projects.ts`, `src/lib/projects.test.ts`, `src/components/ProjectFilter.tsx`
- Modify: `src/data/lifeApi.tsx` (`Project` type and data), `src/pages/projects.tsx`

**Interfaces:**
- Produces:

```ts
export const PROJECT_CATEGORIES = ['finance', 'business', 'languages', 'tools'] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export const CATEGORY_LABELS: Record<ProjectCategory | 'all', string>;
// { all: 'All', finance: 'Finance and economics', business: 'Business', languages: 'Languages', tools: 'Tools' }
export function sortProjects<T extends { category: ProjectCategory }>(projects: T[]): T[];
export function filterProjects<T extends { category: ProjectCategory }>(projects: T[], filter: ProjectCategory | 'all'): T[];
```
- `ProjectFilter({ value, onChange }: { value: ProjectCategory | 'all'; onChange: (v: ProjectCategory | 'all') => void })`.

- [ ] **Step 1: Write the failing test** in `src/lib/projects.test.ts`

```ts
import { describe, expect, it } from 'vitest';
import { filterProjects, sortProjects } from './projects';

const p = [
  { title: 'Alefbe', category: 'languages' },
  { title: 'EconoSift', category: 'finance' },
  { title: 'CraftyOS', category: 'tools' },
  { title: 'Runway', category: 'finance' },
  { title: 'Axiom Digital', category: 'business' },
] as const;

describe('projects', () => {
  it('sorts by category order, keeping the original order within a category', () =>
    expect(sortProjects([...p]).map((x) => x.title)).toEqual([
      'EconoSift', 'Runway', 'Axiom Digital', 'Alefbe', 'CraftyOS',
    ]));
  it('does not mutate its input', () => {
    const input = [...p];
    sortProjects(input);
    expect(input[0].title).toBe('Alefbe');
  });
  it("returns everything for 'all'", () => expect(filterProjects([...p], 'all')).toHaveLength(5));
  it('filters by category', () =>
    expect(filterProjects([...p], 'finance').map((x) => x.title)).toEqual(['EconoSift', 'Runway']));
});
```

- [ ] **Step 2: Run it to see it fail**

Run: `yarn test`. Expected: FAIL, cannot resolve `./projects`.

- [ ] **Step 3: Implement `src/lib/projects.ts`** with the signatures above.

- [ ] **Step 4: Run the tests**

Run: `yarn test`. Expected: 14 passed.

- [ ] **Step 5: Categorise the projects**

Add required `category: ProjectCategory` to the `Project` type. Assign: EconoSift, EconoSim, Runway = `finance`; Axiom Digital = `business`; Alefbe, Nihongo Path = `languages`; DeskSeek, CraftyOS, My personal website, Personal Minecraft Server = `tools`.

- [ ] **Step 6: Build the filter and wire the page**

`ProjectFilter`: a row of `<button aria-pressed>` chips styled like `Badge`, the active one in the accent colour with the dashed thread underline. In `projects.tsx`: state `filter` (default `'all'`), the "Now" grid renders `filterProjects(sortProjects(MyCurrentProjects), filter)`; wrap the `<ul>` in framer-motion `LayoutGroup`, give each `<motion.li>` `layout` and wrap the list in `AnimatePresence` so cards fade (150ms) and reflow (250ms). The "Past" section is unfiltered and hidden only when the filter excludes it.

- [ ] **Step 7: Verify in the browser**

Open `/projects`. Expected: all nine current projects under "All", finance ones first; each chip narrows the grid with a smooth reflow; chips work by keyboard; no layout jump at 375px.

- [ ] **Step 8: Commit**

```bash
git add src
git commit -m "Add project categories with a filter, finance first"
```

---

### Task 6: Photo strip interaction

**Files:**
- Create: `src/components/Lightbox.tsx` (moved out of `src/pages/images.tsx`)
- Modify: `src/pages/images.tsx`, `src/components/Photos.tsx`

**Interfaces:**
- Produces: `Lightbox({ photos, index, onClose, onNavigate }: { photos: { img: StaticImageData; title: string; alt: string }[]; index: number; onClose: () => void; onNavigate: (next: number) => void })`. Behaviour identical to today's, with `travelImages` replaced by the `photos` prop.

- [ ] **Step 1: Extract the lightbox**

Move `Lightbox`, its icons and style constants into `src/components/Lightbox.tsx`; `images.tsx` imports it and passes `photos={travelImages}`. Verify `/images` behaves exactly as before (open, arrows, Escape, backdrop click).

- [ ] **Step 2: Make strip photos open the lightbox**

In `Photos.tsx`, each photo becomes a `<button aria-label="View {title} larger">` that opens `Lightbox` with `photos={homeImages}`. The hover caption stays. The image wrapper in the strip and in the lightbox share `layoutId={'photo-' + img.src}` so the photo grows from its place; if the shared transition fights `next/image` sizing, fall back to the existing fade and say so in the commit message.

- [ ] **Step 3: Add drag to scroll**

On pointer devices with a fine pointer, pressing and dragging the strip scrolls it (pointer events on the scroller: track `clientX` delta into `scrollLeft`, `cursor-grab`/`cursor-grabbing`, release applies no custom momentum beyond native scroll snap). A drag of more than 5px must not trigger the photo's click. Touch scrolling stays native.

- [ ] **Step 4: Verify in the browser**

On `/`: drag scrolls the strip without opening a photo; a click opens the lightbox; Escape returns focus to the photo that opened it; arrow buttons still page; at 375px native swipe works; with reduced motion the lightbox simply fades.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "Make the home photo strip draggable and open photos in the lightbox"
```

---

### Task 7: Stitched card outline, warm greys, design rule

**Files:**
- Modify: `src/styles/index.css`, `src/components/ProjectCard.tsx`, `src/components/Resume.tsx`, `src/components/Navigation.tsx`, `src/components/Photos.tsx`, `DESIGN.md`

- [ ] **Step 1: Stitched outline on project cards**

In `ProjectCard.tsx`, add an absolutely positioned, `aria-hidden` SVG `<rect>` filling the card (`rx` matching `rounded-2xl`, `stroke="currentColor"` in the accent colour, `stroke-dasharray="9 7"`, `pathLength="1"`). In `index.css`, class `.card-stitch rect` has `stroke-dashoffset: 1; opacity: 0` and transitions to `0` / `1` over 500ms on `.group:hover` and `.group:focus-within`. Under `prefers-reduced-motion: reduce` it appears without the draw.

- [ ] **Step 2: Replace template greys**

In the four components, swap text and border colours: `zinc-900`→`stone-900`, `zinc-800`→`stone-800`, `zinc-600`→`stone-600`, `zinc-500`→`stone-500`, `zinc-400`→`stone-400`, `zinc-300`→`stone-300`, `zinc-200`→`stone-200`, `zinc-100`→`stone-100` (light and `dark:` variants alike). Leave background and ring utilities that define the glass navigation and dark panels unchanged.

- [ ] **Step 3: Amend `DESIGN.md`**

In "Motion", replace "One orchestrated moment per page max (...)" with: "One orchestrated entrance per page, plus interactions that respond to the reader (hover, click, scroll position). Nothing loops or plays unprompted after the entrance." Add `ResumeRow`, `LanguageList`, `ProjectFilter` and `Lightbox` to "Components".

- [ ] **Step 4: Verify in the browser**

Hover and Tab onto a project card: the dashed outline draws once. Compare `/`, `/projects` and the navigation in light and dark themes against `main`: text is slightly warmer, nothing lost contrast (spot-check `stone-500` on creme with the browser's contrast tool: at least 4.5:1).

- [ ] **Step 5: Commit**

```bash
git add src DESIGN.md
git commit -m "Add stitched card outline and move template greys to warm tokens"
```

---

### Task 8: Final checks and preview

- [ ] **Step 1: Run every check**

Run: `yarn test && yarn typecheck && yarn lint && yarn build`. Expected: all pass.

- [ ] **Step 2: Walk the site**

With `yarn start`, visit `/`, `/resume`, `/projects`, `/images`, `/about`, one note, in light and dark, at 1440px and 375px, once with reduced motion. Re-check the five Review Focus items. Search the built pages for "MSc" and "+31": zero hits.

- [ ] **Step 3: Hand over**

Push `refine-resume` and share the Vercel preview URL with Danel only after he says to push. Merging to `main` is his decision.
