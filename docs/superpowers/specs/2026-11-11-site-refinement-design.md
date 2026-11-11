# danelrahmani.com refinement: design

Date: 2026-11-11. Status: draft, awaiting Danel's approval. Nothing is built yet.

## Intent

Keep the site Danel already likes (creme cloth, maroon thread, Bodoni Moda, the stitch motif, the photo strip) and refine it so that it also works as his digital résumé. A finance recruiter who lands on it should understand within a few seconds that he is a strong student who wants to work in finance, and should be able to read or download his résumé in one click. The site should feel more alive: more interaction and animation, all of it in the existing tailoring language.

This is a refinement, not a redesign. `PRODUCT.md` and `DESIGN.md` stay the source of truth for look and voice, with the two amendments listed under "Changes to the design rules".

## Decisions Danel made

- Refine the current design; do not replace it. The four canvas mockups (A to D) are rejected.
- Add a résumé page at `danelrahmani.com/resume`: the résumé as a web page, plus the downloadable PDF.
- Add a visible Résumé entry in the navigation.
- Keep the photo strip on the start page.
- Keep every project on the site.
- Location reads as Groningen, with a note that he is willing to relocate.
- Do not list the planned MSc Finance anywhere on the site.
- Keep the high school entry, with "Cum Laude".
- Japanese is described as conversational and actively studied, not as "limited".
- No billboard statistics. Achievements are stated once, small, in context.
- More interactive and more animated than today.

## Goals

1. Finance positioning on the start page, in his own voice.
2. A complete, readable, printable résumé page.
3. Correct, current facts everywhere.
4. Interaction and motion that make the site feel crafted.

## Non-goals

- No new colour palette, typeface, layout system or framework.
- No changes to the Notion notes pipeline.
- No new content types (no blog redesign, no case studies).

## Anti-goals

- Anything that reads as bragging: giant numbers, stat rows, "top X%" language.
- Stock landing-page patterns: three-card feature grids, status dots, gradient text.
- Motion that delays reading or runs on every scroll. Motion that ignores `prefers-reduced-motion`.
- Developer-portfolio clichés (terminal styling, command palettes).

## The pages

### Start page (`src/pages/index.tsx`)

Order stays: hero, photo strip, Axiom Digital card, notes and résumé columns.

- Hero text changes from "founder of a digital agency" to the finance story: International Business student at Groningen (Honours College), on exchange at Waseda in Tokyo, keeps the books of the family atelier, founder of Axiom Digital, looking for a summer 2027 internship in corporate finance, M&A or asset management. Based in Groningen, willing to relocate. Final wording is written during the build and shown to Danel before it ships.
- Primary button becomes "Résumé" and goes to `/resume`. "Work with me" stays, but only on the Axiom Digital card lower down (builder's call; see open questions).
- Photo strip stays directly under the hero.
- The résumé column keeps its two cards, with corrected data and a "Full résumé" link under them.

### Résumé page (`src/pages/resume.tsx`, new)

One readable column in the existing page shell. Sections, top to bottom:

1. Header: name in the display serif, one line of positioning, "Groningen, the Netherlands. Willing to relocate.", email, LinkedIn, GitHub, and two buttons: "Download PDF" and "Print".
2. Education: Waseda University (exchange, Sep 2026 to Mar 2027, NL Scholarship), University of Groningen BSc International Business with Honours College (GPA 9.1 stated once, in the row), Rsg de Borgen VWO (Cum Laude). No MSc.
3. Experience: Axiom Digital (Founder), Rahmani's Gordijn-Kledingatelier (Operations and Digital Lead), each with the CV's bullet points.
4. Leadership: Model European Parliament, Generatie aan Zet.
5. Projects: all eight current projects in compact rows with links, finance and economics ones first.
6. Skills, languages, certification, award, interests.

Content comes from `Danel_Rahmani_CV_Extended.pdf`, minus the phone number and the planned MSc.

### Projects page (`src/pages/projects.tsx`)

All projects stay. Each gets a category (Finance and economics, Languages, Tools, Business). Finance and economics sort first. A row of filter chips above the grid narrows the list.

### About page (`src/pages/about.tsx`)

Text refresh only: "Now" and "Study" are out of date (they still say he leaves for Tokyo "this September"). The résumé button points to `/resume`.

## Interaction and motion

Every item below uses framer-motion, which is already installed, animates only transform, opacity or clip-path, and has a reduced-motion fallback.

| Where | What happens | Why it earns its place |
|---|---|---|
| Résumé page | A stitched vertical thread runs down the left of the timeline and sews itself in as the reader scrolls; each entry settles as the thread reaches it. | The site's signature device, used as a real timeline. |
| Résumé page | Each role and degree is a row that unfolds on click to show its details. Coursework and grades sit inside the Groningen and Waseda rows, closed by default. | The reader chooses the depth. Grades are available without being shouted. |
| Résumé page | Hovering or focusing a language shows a greeting in that language and script (Dutch, Persian, English, Japanese, French). | Small, personal, and shows the five languages better than a list. |
| Résumé page | "Print" uses a print stylesheet: one clean black-on-white page, all rows expanded. | A recruiter can save exactly what they see. |
| Projects page | Filter chips; cards reflow with a shared-layout animation. | Lets a finance reader see the finance work first without hiding the rest. |
| Project cards | On hover or focus, a stitched outline draws around the card. | Replaces the generic hover tint with the site's own motif. |
| Photo strip | Drag to scroll with momentum; clicking a photo opens it in the lightbox with a shared-element transition from the strip. | The strip becomes something to play with, not only to look at. |
| All pages | A short crossfade between routes, while the navigation thread slides to the new item (the slide exists today). | Makes the site feel like one piece of cloth. |

Unfolded rows must work with the keyboard and announce their state to screen readers (`button` with `aria-expanded`).

## Changes to the design rules

1. `DESIGN.md` says "one orchestrated moment per page at most". This becomes: one orchestrated entrance per page, plus interactions that respond to the reader (hover, click, scroll position). Nothing loops or plays unprompted after the entrance.
2. Several components use Tailwind `zinc` greys (`Resume.tsx`, `Navigation.tsx`, `Photos.tsx`), which `PRODUCT.md` lists as an anti-reference. They move to the warm tokens in `DESIGN.md` (ink, muted, seam). This is the "refinement" of the visual layer: same design, fewer leftovers from the template.

## Facts to correct (`src/data/lifeApi.tsx`, `about.tsx`, `index.tsx`)

- Atelier role: "Employee" becomes "Operations and Digital Lead".
- Waseda: ends Mar 2027, not Feb 2027; "this September I'm off to Waseda" is now present tense.
- GPA: 9.1 over 120 ECTS (today the site shows the two yearly figures).
- Japanese: "conversational, studying toward fluency" (builder's wording; see open questions).
- SEO description and the `Person` structured data still say "Founder" and "heading to Waseda".
- `public/assets/resume.pdf` dates from January 2026 and is replaced.

## Constraints

- Next.js Pages Router, TypeScript, Tailwind, framer-motion, Yarn 4. No new dependencies unless the lightbox transition proves to need one.
- WCAG 2.2 AA as in `PRODUCT.md`.
- Voice rules in `DESIGN.md` hold: first person, short, no exclamation marks, plain hyphens in date ranges.
- Résumé content lives in one data file so the page, the start-page cards and the structured data cannot drift apart.

## Order of work

1. Facts and data: one résumé data file; corrections above.
2. Résumé page, navigation entry, PDF, print stylesheet.
3. Start-page hero and buttons.
4. Projects categories and filter.
5. Motion and interaction pass; grey-token cleanup.
6. Checks: `yarn typecheck`, `yarn lint`, `yarn build`, keyboard and reduced-motion pass, phone width, then a Vercel preview for Danel before anything goes to production.

## Left to the builder

Exact easing and durations within `DESIGN.md`'s ranges, component boundaries, the print layout details, and category assignment per project.

## Answers from Danel (2026-11-11)

1. PDF: publish `Danel_Rahmani_CV_Extended.pdf` with the phone number removed.
2. Grades: the Extended CV and `University_Transcript_Danel_Rahmani.pdf` agree; everything in `OneDrive\Career` is correct and may be used.
3. Axiom Digital must stay easy to reach: it is still a big part of the site. The hero keeps a secondary "Axiom Digital" button next to "Résumé", the start-page card stays, and the footer gains a link.
4. Approved as written otherwise.

## Future (not in this plan)

- Multilingual versions of the site with a language switch (Dutch, English, possibly Japanese and Persian).
