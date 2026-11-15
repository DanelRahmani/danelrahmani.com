import { describe, expect, it } from 'vitest';

import * as home from './home';

const everything = JSON.stringify(home);

describe('start-page content rules', () => {
  it('uses no em or en dashes', () => expect(everything).not.toMatch(/[–—]/));
  it('never lists the planned MSc', () => expect(everything).not.toMatch(/MSc/i));
  it('states no GPA (the résumé states it once)', () => expect(everything).not.toMatch(/9\.1/));
  it('ends the thread on the open stitch', () => {
    expect(home.milestones.filter((m) => m.open)).toHaveLength(1);
    expect(home.milestones[home.milestones.length - 1].open).toBe(true);
  });
});
