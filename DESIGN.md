# Design

Personal site of Danel Rahmani. Register: brand (portfolio — design IS the product). Aesthetic lane: **warm editorial minimalism with an atelier thread** — creme cloth, maroon thread, engraved-label typography. Named references: the woven label of a tailored garment; Bodoni-era fashion typography (Vogue lineage) at small, precise scale — not a magazine broadsheet.

## Color

Strategy: **Committed** — maroon/raspberry carries identity on every page (headings' display face, links, marks, seams), grounds stay creme/aubergine.

| Token | Light | Dark | Role |
|---|---|---|---|
| `bg` | `#FDFBF6` creme | `#0F090E` aubergine-black | page ground |
| `ink` | `#1C1917` (stone-900) | `#F4EFEA` warm white | primary text |
| `muted` | `#57534E` (stone-600, ≥4.5:1 on creme) | `#A8A29E` (stone-400) | secondary text |
| `accent` / `primary` | `#4A0E0E` maroon | `#D43D55` raspberry (`dark-accent`) | links, emphasis, thread |
| `accent-hover` | `#6B1515` (`primary-light`) | `#E8566A` (`dark-accent-hover`) | hover states |
| `seam` | `rgba(74,14,14,0.15)` | `rgba(212,61,85,0.18)` | hairline rules |

Rules: never gray-on-creme below 4.5:1; hairlines are tinted toward the accent hue, not neutral gray; shadows are maroon-tinted (`rgba(74,14,14,…)`) in light, raspberry-tinted in dark.

## Typography

- **Display**: Bodoni Moda (Google Fonts, variable + italic) — high-contrast didone, the atelier/fashion world made literal. Used for page titles, section headings, the name. `text-wrap: balance`.
- **Body/UI**: Geist Sans (existing, keep) — precise, quiet.
- **Meta/labels**: Geist Mono — dates, tags, photo captions, résumé ranges. Small sizes only (≤ 0.8125rem); mono is the "woven label" register, never body copy.
- Scale: modular, ≥1.25 between steps; hero name clamps to ≤ 5.5rem; display letter-spacing ≥ -0.02em (didones need no tightening).
- Body line length ≤ 72ch; prose uses `text-wrap: pretty`.

## Components

- `Container` — max-w-7xl shell with the fixed creme/aubergine panel behind (in `_app.tsx`).
- `PageTitle` / `SectionTitle` — display serif, ink color, balanced.
- `Card` (`src/components/Card.tsx`) — flat, no nesting; hover = background tint + hairline, not scale-everything.
- `Photos` — horizontal contact-sheet strip, snap-scroll, framer-motion captions; full set at `/images` with lightbox.
- `NotePreview`, `Resume`, `ProjectCard`, `Badge` (tag pills), `Navigation` (glass pill — the one sanctioned glass surface).
- Icons: existing hand-rolled SVG set in `src/components/icons/`.

## Layout

- Single readable column with two-column ledger sections (notes | résumé) on lg+.
- Rhythm: generous section separations (mt-16/24), tight intra-group spacing; hairline "seams" separate sections instead of eyebrow labels.
- Photo strip runs full-bleed past the container edge.

## Motion

- Library: framer-motion (installed). Energy: low — "barely seen, perfectly finished."
- Durations 150–250ms UI, ≤ 500ms entrances; easing ease-out (quart/expo), springs only where physical (lightbox), no bounce.
- One orchestrated moment per page max (home: name + photo strip settle). Link hover: underline draw in accent. Cards: tint/shadow, never uniform scale.
- Every animation has a `prefers-reduced-motion` alternative (crossfade or none).

## Voice

Copy is first-person, short, concrete. Meta text (dates, counts, captions) set in mono like garment labels: `Sep 2026 - Feb 2027` (plain hyphens; em/en dashes are banned in visible copy). No exclamation marks, no emoji in UI chrome.
