import { describe, it, expect } from 'vitest';
import { BreweryType, BrewerySchema, SearchBreweriesSchema, GetBreweryByIdSchema, GetRandomBrewerySchema } from './types.js';

describe('types', () => {

  it('BrewerySchema validates a valid brewery', () => {
    const valid = {
      id: '1',
      name: 'Brew',
      brewery_type: 'micro',
      country: 'US',
    };
    expect(() => BrewerySchema.parse(valid)).not.toThrow();
  });

  it('BrewerySchema rejects invalid brewery', () => {
    const invalid = { name: 'Brew', brewery_type: 'micro', country: 'US' };
    expect(() => BrewerySchema.parse(invalid)).toThrow();
  });

  it('SearchBreweriesSchema validates input', () => {
    expect(() => SearchBreweriesSchema.parse({ query: 'test', per_page: 10, page: 1 })).not.toThrow();
  });

  it('GetBreweryByIdSchema validates input', () => {
    expect(() => GetBreweryByIdSchema.parse({ id: 'abc' })).not.toThrow();
  });

  it('GetRandomBrewerySchema validates input', () => {
    expect(() => GetRandomBrewerySchema.parse({ size: 2 })).not.toThrow();
  });
});

describe.each([
  ['micro'],
  ['nano'],
  ['regional'],
  ['brewpub'],
  ['large'],
  ['planning'],
  ['bar'],
  ['contract'],
  ['proprietor'],
  ['closed'],
])('BreweryType enum edge cases', type => {
  it(`should include '${type}' as a valid option`, () => {
    expect(BreweryType.options).toContain(type);
  });
});

describe('BrewerySchema edge cases', () => {
  it('rejects missing required fields', () => {
    expect(() => BrewerySchema.parse({})).toThrow();
    expect(() => BrewerySchema.parse({ id: '1' })).toThrow();
    expect(() => BrewerySchema.parse({ name: 'Brew' })).toThrow();
  });

  it('rejects invalid brewery_type', () => {
    expect(() => BrewerySchema.parse({ id: '1', name: 'Brew', brewery_type: 'invalid', country: 'US' })).toThrow();
  });

  it('accepts extra fields (should ignore or allow)', () => {
    expect(() => BrewerySchema.parse({ id: '1', name: 'Brew', brewery_type: 'micro', country: 'US', extra: 123 })).not.toThrow();
  });
});

describe.each([
  { query: 'abc', per_page: 0, page: 1 },
  { query: 'abc', per_page: 51, page: 1 },
  { query: 'abc', per_page: 10, page: 0 },
  { query: 'abc', per_page: 10, page: -1 },
])('SearchBreweriesSchema edge cases', input => {
  it(`validates input: ${JSON.stringify(input)}`, () => {
    expect(() => SearchBreweriesSchema.parse(input)).toThrow();
  });
});

describe.each([
  { id: '' },
  { id: ' ' },
  {},
])('GetBreweryByIdSchema edge cases', input => {
  it(`validates input: ${JSON.stringify(input)}`, () => {
    expect(() => GetBreweryByIdSchema.parse(input)).toThrow();
  });
});

describe.each([
  { size: 0 },
  { size: -1 },
  { size: 10.0001 },
  { size: 11 },
])('GetRandomBrewerySchema edge cases', input => {
  it(`validates input: ${JSON.stringify(input)}`, () => {
    expect(() => GetRandomBrewerySchema.parse(input)).toThrow();
  });
});
