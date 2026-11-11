// Project categories, in display order: finance and economics lead because
// the site doubles as a résumé for finance roles; nothing is hidden.
export const PROJECT_CATEGORIES = ['finance', 'business', 'languages', 'tools'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectFilterValue = ProjectCategory | 'all';

export const CATEGORY_LABELS: Record<ProjectFilterValue, string> = {
  all: 'All',
  finance: 'Finance and economics',
  business: 'Business',
  languages: 'Languages',
  tools: 'Tools',
};

/** Orders by category (see PROJECT_CATEGORIES), stable within a category. */
export function sortProjects<T extends { category: ProjectCategory }>(projects: readonly T[]): T[] {
  return projects
    .map((project, index) => ({ project, index }))
    .sort(
      (a, b) =>
        PROJECT_CATEGORIES.indexOf(a.project.category) -
          PROJECT_CATEGORIES.indexOf(b.project.category) || a.index - b.index,
    )
    .map(({ project }) => project);
}

export function filterProjects<T extends { category: ProjectCategory }>(
  projects: readonly T[],
  filter: ProjectFilterValue,
): T[] {
  return filter === 'all' ? [...projects] : projects.filter((p) => p.category === filter);
}
