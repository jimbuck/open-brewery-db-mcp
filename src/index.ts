#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { SearchBreweriesSchema, GetBreweryByIdSchema, GetRandomBrewerySchema } from './types.js';
import { OpenBreweryDBApi } from './api.js';
import { formatBreweries, formatBrewery } from './utils.js';
import { GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import z from 'zod';

// Create the MCP server
const server = new McpServer({ name: "open-brewery-db-mcp", version: "1.0.0" });

// Initialize the Open Brewery DB API
const api = new OpenBreweryDBApi();

// Add resources for brewery types and brewery lookups
server.resource("brewery/types", "brewery://types", async (uri) => {
  const breweryTypes = await api.listBreweryTypes();
  return {
    contents: [{
      uri: uri.href,
      text: "Available brewery types:\n\n" + breweryTypes.map(type => `• ${type}`).join("\n")
    }]
  };
});

server.tool("brewery/by-id", "Get detailed information about a specific brewery by ID", GetBreweryByIdSchema.shape, async (args) => {
  const brewery = await api.getBreweryById(args);
  return { content: [{ type: "text", text: formatBrewery(brewery) }] };
});

// Add tools using the high-level API
server.tool("brewery/search", "Search for breweries by name, city, state, or type", SearchBreweriesSchema.shape, async (args) => {
  const breweries = await api.searchBreweries(args);
  return { content: [{ type: "text", text: formatBreweries(breweries) }] };
});



server.tool("brewery/random", "Get one or more random breweries.", GetRandomBrewerySchema.shape, async (args) => {
  const breweries = await api.getRandomBrewery(args);
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
