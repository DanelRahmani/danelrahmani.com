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
      'EconoSift',
      'Runway',
      'Axiom Digital',
      'Alefbe',
      'CraftyOS',
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
