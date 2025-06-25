import { Brewery } from './types.js';


/**
 * Formats a brewery object into a readable multi-line string with key details.
 *
 * Returns 'Unknown brewery!' if the brewery lacks a name or ID. Includes the brewery's name, type, ID, and, if available, address, location, phone, website, and coordinates.
 *
 * @returns A formatted string representing the brewery's details
 */
export function formatBrewery(brewery: Brewery): string {
  if (!brewery?.name || !brewery?.id) {
    return 'Unknown brewery!';
  }

  const address = [
    brewery.address_1,
    brewery.address_2,
    brewery.address_3,
  ].filter(Boolean).join(', ');

  const location = [
    brewery.city,
    brewery.state_province || brewery.state,
    brewery.postal_code,
    brewery.country,
  ].filter(Boolean).join(', ');

  const lines = [
    `🍺 **${brewery.name}**`,
    `**Type:** ${brewery.brewery_type}`,
    `**ID:** ${brewery.id}`,
    address ? `**Address:** ${address}` : null,
    location ? `**Location:** ${location}` : null,
    brewery.phone ? `**Phone:** ${brewery.phone}` : null,
    brewery.website_url ? `**Website:** ${brewery.website_url}` : null,
    brewery.longitude && brewery.latitude ? `**Coordinates:** ${brewery.latitude}, ${brewery.longitude}` : null,
  ].filter(Boolean);

  return lines.join('\n');
}

/**
 * Formats a list of breweries into a readable string.
 *
 * If the input array is empty or undefined, returns a message indicating no breweries were found. Otherwise, returns a string listing the number of breweries and their formatted details, separated by horizontal rules.
 *
 * @param breweries - The array of brewery objects to format
 * @returns A formatted string representing the list of breweries
 */
export function formatBreweries(breweries: Brewery[]): string {
  if (!breweries || breweries.length === 0) {
    return 'No breweries found.';
  }

  return `Found ${breweries.length} brewer${breweries.length > 1 ? 'ies' : 'y'}:\n\n` +
		breweries.map(brewery => formatBrewery(brewery)).join('\n\n---\n\n');
}