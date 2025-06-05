#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { SearchBreweriesSchema, GetBreweryByIdSchema, GetRandomBrewerySchema } from './types.js';
import { OpenBreweryDBApi } from './api.js';
import { formatBreweries, formatBrewery } from './utils.js';

// Create the MCP server
const server = new McpServer({ name: "open-brewery-db-mcp", version: "1.0.0" });

// Initialize the Open Brewery DB API
const api = new OpenBreweryDBApi();

// Add tools using the high-level API
server.tool("search_breweries", "Search for breweries by name, city, state, or type", SearchBreweriesSchema.shape, async (args) => {
  const breweries = await api.searchBreweries(args);
  return { content: [{ type: "text", text: formatBreweries(breweries) }] };
});

server.tool("get_brewery_by_id", "Get detailed information about a specific brewery by ID", GetBreweryByIdSchema.shape, async (args) => {
  const brewery = await api.getBreweryById(args);
  return { content: [{ type: "text", text: formatBrewery(brewery) }] };
});

server.tool("get_random_brewery", "Get one or more random breweries.", GetRandomBrewerySchema.shape, async (args) => {
  const breweries = await api.getRandomBrewery(args);
  return { content: breweries.map(item => ({ type: "text", text: formatBrewery(item) })) };
});

server.tool("list_brewery_types", "List all available brewery types", {}, async () => {
  const breweryTypes = await api.listBreweryTypes();
  return { content: [{ type: "text", text: "Available brewery types:\n\n" + breweryTypes.map(type => `• ${type}`).join("\n") }] };
});

// Set up error handling
process.on("SIGINT", async () => {
  await server.close();
  process.exit(0);
});


// Start the server
(async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Open Brewery DB MCP Server running on stdio");
})().catch(console.error);
