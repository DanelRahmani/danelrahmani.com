import { describe, expect, it } from 'vitest';

import * as resume from './resume';

const everything = JSON.stringify(resume);

describe('résumé content rules', () => {
  it('never lists the planned MSc', () => expect(everything).not.toMatch(/MSc/i));
  it('never contains a phone number', () => expect(everything).not.toMatch(/\+31|\b06[ -]?\d/));
  it('uses no em or en dashes', () => expect(everything).not.toMatch(/[–—]/));
  it('lists education newest first, high school included', () =>
    expect(resume.education.map((e) => e.id)).toEqual(['waseda', 'rug-bsc', 'rsg-de-borgen']));
  it('marks the high school Cum Laude', () => expect(resume.education[2].note).toBe('Cum Laude'));
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
