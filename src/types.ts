import { z } from 'zod';

// Replace enum with Zod enum
export const BreweryType = z.enum([
  'micro',
  'nano',
  'regional',
  'brewpub',
  'large',
  'planning',
  'bar',
  'contract',
  'proprietor',
  'closed',
]);

// Export the type derived from the Zod enum
export type BreweryType = z.infer<typeof BreweryType>;

/**
 * Brewery schema based on Open Brewery DB API
 */
export const BrewerySchema = z.object({
  id: z.string(),
  name: z.string(),
  brewery_type: BreweryType,
  address_1: z.string().optional().nullable(),
  address_2: z.string().optional().nullable(),
  address_3: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state_province: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
  country: z.string(),
  longitude: z.number().optional().nullable(),
  latitude: z.number().optional().nullable(),
  phone: z.string().optional().nullable(),
  website_url: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
});

export type Brewery = z.infer<typeof BrewerySchema>;

/**
 * Search breweries input schema
 */
export const SearchBreweriesSchema = z.object({
  query: z.string().trim().optional().describe('Search query (brewery name, city, etc.)'),
  by_city: z.string().optional().describe('Filter by city name'),
  by_state: z.string().optional().describe('Filter by state (full name or abbreviation)'),
  by_type: z.string().optional().describe('Filter by brewery type (micro, nano, regional, brewpub, large, planning, bar, contract, proprietor, closed)'),
  per_page: z.number().min(1).max(50).optional().describe('Number of results per page (default: 20, max: 50)'),
  page: z.number().min(1).optional().describe('Page number (default: 1)'),
});

export type SearchBreweriesInput = z.infer<typeof SearchBreweriesSchema>;

/**
 * Get brewery by ID input schema
 */
export const GetBreweryByIdSchema = z.object({
  id: z.string().trim().nonempty().describe('Brewery ID'),
});

export type GetBreweryByIdInput = z.infer<typeof GetBreweryByIdSchema>;

/**
 * Get random brewery input schema
 */
export const GetRandomBrewerySchema = z.object({
  size: z.number().min(1).max(10).optional().default(1).describe('Number of random breweries to return (default: 1, max: 10)'),
});

export type GetRandomBreweryInput = z.infer<typeof GetRandomBrewerySchema>;