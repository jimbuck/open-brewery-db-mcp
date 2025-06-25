import { describe, it, expect } from 'vitest';
import { formatBrewery, formatBreweries } from './utils.js';
import { Brewery } from './types.js';

describe('utils', () => {
	const brewery: Brewery = {
		id: '1',
		name: 'Test Brewery',
		brewery_type: 'micro',
		country: 'US',
		address_1: '123 Main St',
		city: 'Testville',
		state: 'TS',
		postal_code: '12345',
		longitude: 1.23,
		latitude: 4.56,
		phone: '555-1234',
		website_url: 'https://testbrewery.com',
		state_province: null,
		address_2: null,
		address_3: null,
		street: null
	};

	it('formatBrewery returns formatted string', () => {
		const result = formatBrewery(brewery);
		expect(result).toContain('Test Brewery');
		expect(result).toContain('123 Main St');
		expect(result).toContain('Testville');
		expect(result).toContain('555-1234');
		expect(result).toContain('https://testbrewery.com');
		expect(result).toContain('4.56, 1.23');
	});

	it('formatBreweries returns summary for multiple breweries', () => {
		const breweries = [brewery, { ...brewery, id: '2', name: 'Another Brewery' }];
		const result = formatBreweries(breweries);
		expect(result).toContain('Found 2 breweries');
		expect(result).toContain('Another Brewery');
	});

	it('formatBreweries returns message for empty array', () => {
		const result = formatBreweries([]);
		expect(result).toBe('No breweries found.');
	});

	describe.each([
		[null, 'No breweries found.'],
		[undefined, 'No breweries found.'],
		[[], 'No breweries found.'],
	])('formatBreweries edge cases', (input, expected) => {
		it(`returns "${expected}" for input: ${JSON.stringify(input)}`, () => {
			// @ts-expect-error testing edge cases
			expect(formatBreweries(input)).toBe(expected);
		});
	});

	describe('formatBrewery edge cases', () => {
		it('handles missing optional fields gracefully', () => {
			const minimalBrewery = {
				id: '3',
				name: 'Minimal',
				brewery_type: 'micro',
				country: 'US',
				address_1: '',
				city: '',
				state: '',
				postal_code: '',
				longitude: null,
				latitude: null,
				phone: '',
				website_url: '',
				state_province: null,
				address_2: null,
				address_3: null,
				street: null
			};
			const result = formatBrewery(minimalBrewery as any);
			expect(result).toContain('Minimal');
			expect(result).not.toContain('undefined');
			expect(result).not.toContain('null');
		});

		it('handles all fields null or undefined', () => {
			const nullBrewery = {
				id: undefined,
				name: undefined,
				brewery_type: undefined,
				country: undefined,
				address_1: undefined,
				city: undefined,
				state: undefined,
				postal_code: undefined,
				longitude: undefined,
				latitude: undefined,
				phone: undefined,
				website_url: undefined,
				state_province: undefined,
				address_2: undefined,
				address_3: undefined,
				street: undefined
			};
			const result = formatBrewery(nullBrewery as any);
			expect(typeof result).toBe('string');
			expect(result).not.toContain('undefined');
			expect(result).not.toContain('null');
		});
	});

	it.each([
		[[], 'No breweries found.'],
		[[{ ...brewery, name: '' }], 'Found 1 brewery'],
		[[{ ...brewery, name: null }], 'Found 1 brewery'],
		[[{ ...brewery, name: undefined }], 'Found 1 brewery'],
	])('formatBreweries with edge brewery data: %j', (input, expected) => {
		// @ts-expect-error testing edge cases
		expect(formatBreweries(input)).toContain(expected);
	});
});
