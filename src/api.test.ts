import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpenBreweryDBApi } from './api.js';
import { BREWERY_TYPE_DETAILS } from './consts.js';

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('OpenBreweryDBApi', () => {
  let api: OpenBreweryDBApi;

  beforeEach(() => {
    api = new OpenBreweryDBApi();
    mockFetch.mockReset();
  });

  it('searchBreweries returns validated breweries', async () => {
    const breweries = [
      { id: '1', name: 'Test Brewery', brewery_type: 'micro', country: 'US' },
      { id: '2', name: 'Another Brewery', brewery_type: 'nano', country: 'US' },
    ];
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => breweries });
    const result = await api.searchBreweries({ query: 'Test' });
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ id: '1', name: 'Test Brewery' });
  });

  it('getBreweryById returns validated brewery', async () => {
    const brewery = { id: '1', name: 'Test Brewery', brewery_type: 'micro', country: 'US' };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => brewery });
    const result = await api.getBreweryById({ id: '1' });
    expect(result).toMatchObject({ id: '1', name: 'Test Brewery' });
  });

  it('getRandomBrewery returns validated breweries', async () => {
    const breweries = [
      { id: '1', name: 'Random Brewery', brewery_type: 'micro', country: 'US' },
    ];
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => breweries });
    const result = await api.getRandomBrewery({ size: 1 });
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: '1', name: 'Random Brewery' });
  });

  it('listBreweryTypes returns brewery type details', async () => {
    const result = await api.listBreweryTypes();
    expect(result).toEqual(BREWERY_TYPE_DETAILS);
  });

  it('throws on API error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' });
    await expect(api.getBreweryById({ id: 'bad' })).rejects.toThrow('API request failed: 404 Not Found');
  });

  it('validates brewery response shape', async () => {
    // Missing required field 'id'
    const badBrewery = { name: 'Bad Brewery', brewery_type: 'micro', country: 'US' };
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [badBrewery] });
    await expect(api.searchBreweries({})).rejects.toThrow();
  });

  describe.each([
    [
      'brewery missing id',
      [{ name: 'No ID', brewery_type: 'micro', country: 'US' }],
    ],
    [
      'brewery missing name',
      [{ id: '1', brewery_type: 'micro', country: 'US' }],
    ],
    [
      'brewery with wrong type for id',
      [{ id: 123, name: 'Wrong ID Type', brewery_type: 'micro', country: 'US' }],
    ],
    [
      'brewery with null fields',
      [{ id: null, name: null, brewery_type: null, country: null }],
    ],
  ])('searchBreweries edge case: %s', (_desc, breweries) => {
    it('throws on invalid brewery response', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => breweries });
      await expect(api.searchBreweries({})).rejects.toThrow();
    });
  });

  describe.each([
    ['404 Not Found', 404, 'Not Found'],
    ['500 Internal Server Error', 500, 'Internal Server Error'],
    ['403 Forbidden', 403, 'Forbidden'],
  ])('API error handling: %s', (_desc, status, statusText) => {
    it('throws on API error', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status, statusText });
      await expect(api.getBreweryById({ id: 'bad' })).rejects.toThrow(
        `API request failed: ${status} ${statusText}`,
      );
    });
  });

  it('searchBreweries returns empty array on empty API response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
    const result = await api.searchBreweries({ query: 'none' });
    expect(result).toEqual([]);
  });

  it('searchBreweries throws on null API response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => null });
    await expect(api.searchBreweries({ query: 'none' })).rejects.toThrow();
  });

  it('getBreweryById throws on null API response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => null });
    await expect(api.getBreweryById({ id: '1' })).rejects.toThrow();
  });

  it('getRandomBrewery throws on null API response', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => null });
    await expect(api.getRandomBrewery({ size: 1 })).rejects.toThrow();
  });

  describe.each([
    [{ query: 'Test', by_city: 'Austin' }],
    [{ by_state: 'TX', by_type: 'micro' }],
    [{ query: '', by_city: '', by_state: '', by_type: '' }],
    [{}],
  ])('searchBreweries param edge: %j', params => {
    it('handles various query param combinations', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
      const result = await api.searchBreweries(params);
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
