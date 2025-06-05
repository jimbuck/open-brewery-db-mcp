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

	return `🍺 **${brewery.name}**
**Type:** ${brewery.brewery_type}
**ID:** ${brewery.id}
${address ? `**Address:** ${address}` : ""}
${location ? `**Location:** ${location}` : ""}
${brewery.phone ? `**Phone:** ${brewery.phone}` : ""}
${brewery.website_url ? `**Website:** ${brewery.website_url}` : ""}
${brewery.longitude && brewery.latitude ? `**Coordinates:** ${brewery.latitude}, ${brewery.longitude}` : ""}`;
}

export function formatBreweries(breweries: Brewery[]): string {
	if (breweries.length === 0) {
		return "No breweries found.";
	}

	return `Found ${breweries.length} brewery(ies):\n\n` +
		breweries.map(brewery => formatBrewery(brewery)).join("\n\n---\n\n");
}