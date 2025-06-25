import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { SearchBreweriesSchema, GetBreweryByIdSchema, GetRandomBrewerySchema } from './types.js';
import { OpenBreweryDBApi } from './api.js';
import { formatBreweries, formatBrewery } from './utils.js';
import { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import z from 'zod';

export function createServer({ openBreweryApi }: { openBreweryApi?: OpenBreweryDBApi } = {}): McpServer {
	// Create the MCP server
	const server = new McpServer({ name: "open-brewery-db-mcp", version: "1.0.0" });

	// Initialize the Open Brewery DB API
	openBreweryApi ??= new OpenBreweryDBApi();

	// Add resources for brewery types and brewery lookups
	server.resource("brewery/types", "brewery://types", async (uri) => {
		const breweryTypes = await openBreweryApi.listBreweryTypes();
		return {
			contents: [{
				uri: uri.href,
				text: "Available brewery types:\n\n" + breweryTypes.map(type => `• ${type}`).join("\n")
			}]
		};
	});

	server.tool("brewery/by-id", "Get detailed information about a specific brewery by ID", GetBreweryByIdSchema.shape, async (args) => {
		const brewery = await openBreweryApi.getBreweryById(args);
		return { content: [{ type: "text", text: formatBrewery(brewery) }] };
	});

	// Add tools using the high-level API
	server.tool("brewery/search", "Search for breweries by name, city, state, or type", SearchBreweriesSchema.shape, async (args) => {
		const breweries = await openBreweryApi.searchBreweries(args);
		return { content: [{ type: "text", text: formatBreweries(breweries) }] };
	});



	server.tool("brewery/random", "Get one or more random breweries.", GetRandomBrewerySchema.shape, async (args) => {
		const breweries = await openBreweryApi.getRandomBrewery(args);
		return { content: breweries.map(item => ({ type: "text", text: formatBrewery(item) })) };
	});

	server.prompt("brewery/by-state", "Search for breweries in a specified State", { state: z.string() }, ({ state }) => {
		return {
			messages: [
				{
					role: "user",
					content: {
						type: "text",
						text: `Search for breweries in ${state}. You can use the \`brewery/search\` tool with \`by_state\` set to '${state}'.`
					}
				}
			]
		} as GetPromptResult;
	});

	return server;
}