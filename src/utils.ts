import { Brewery } from './types.js';


export function formatBrewery(brewery: Brewery): string {
	const address = [
		brewery.address_1,
		brewery.address_2,
		brewery.address_3,
	].filter(Boolean).join(", ");

	const location = [
		brewery.city,
		brewery.state_province || brewery.state,
		brewery.postal_code,
		brewery.country,
	].filter(Boolean).join(", ");

	const lines = [
		`🍺 **${brewery.name}**`,
		`**Type:** ${brewery.brewery_type}`,
		`**ID:** ${brewery.id}`,
		address ? `**Address:** ${address}` : null,
		location ? `**Location:** ${location}` : null,
		brewery.phone ? `**Phone:** ${brewery.phone}` : null,
		brewery.website_url ? `**Website:** ${brewery.website_url}` : null,
		brewery.longitude && brewery.latitude ? `**Coordinates:** ${brewery.latitude}, ${brewery.longitude}` : null
	].filter(Boolean);

	return lines.join('\n');
}

export function formatBreweries(breweries: Brewery[]): string {
	if (breweries.length === 0) {
		return "No breweries found.";
	}

	return `Found ${breweries.length} brewer${breweries.length > 1 ? 'ies' : 'y'}:\n\n` +
		breweries.map(brewery => formatBrewery(brewery)).join("\n\n---\n\n");
}