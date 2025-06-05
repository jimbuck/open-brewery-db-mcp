import { BREWERY_TYPE_DETAILS } from './consts.js';
import { Brewery, BrewerySchema, GetBreweryByIdSchema, GetRandomBrewerySchema, SearchBreweriesSchema } from './types.js';
import { formatBreweries, formatBrewery } from './utils.js';


export class OpenBreweryDBApi {
	private readonly baseUrl = "https://api.openbrewerydb.org/v1/breweries";

	public async searchBreweries(args: any) {
		const validatedArgs = SearchBreweriesSchema.parse(args);
		const params = new URLSearchParams();

		if (validatedArgs.query) params.append("by_name", validatedArgs.query);
		if (validatedArgs.by_city) params.append("by_city", validatedArgs.by_city);
		if (validatedArgs.by_state) params.append("by_state", validatedArgs.by_state);
		if (validatedArgs.by_type) params.append("by_type", validatedArgs.by_type);
		if (validatedArgs.per_page) params.append("per_page", String(validatedArgs.per_page));
		if (validatedArgs.page) params.append("page", String(validatedArgs.page));

		const url = `${this.baseUrl}?${params.toString()}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status} ${response.statusText}`);
		}

		const breweries: Brewery[] = await response.json();
		// Validate the response data
		const validatedBreweries = breweries.map(brewery => BrewerySchema.parse(brewery));
		return validatedBreweries;
	}

	public async getBreweryById(args: any) {
		const validatedArgs = GetBreweryByIdSchema.parse(args);
		const url = `${this.baseUrl}/${validatedArgs.id}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status} ${response.statusText}`);
		}

		const brewery: Brewery = await response.json();
		// Validate the response data
		const validatedBrewery = BrewerySchema.parse(brewery);
		return validatedBrewery;
	}

	public async getRandomBrewery(args: any) {
		const validatedArgs = GetRandomBrewerySchema.parse(args);
		const size = validatedArgs.size || 1;
		const url = `${this.baseUrl}/random?size=${size}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status} ${response.statusText}`);
		}

		const breweries: Brewery[] = await response.json();
		// Validate the response data
		const validatedBreweries = breweries.map(brewery => BrewerySchema.parse(brewery));

		return validatedBreweries;
	}

	public async listBreweryTypes() {

		return BREWERY_TYPE_DETAILS;
	}
}