#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

/**
 * Brewery interface based on Open Brewery DB API
 */
interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country: string;
  longitude?: string;
  latitude?: string;
  phone?: string;
  website_url?: string;
  state?: string;
  street?: string;
}

/**
 * Open Brewery DB MCP Server
 * Provides tools to search and retrieve brewery information
 */
class OpenBreweryDBServer {
  private server: Server;
  private readonly baseUrl = "https://api.openbrewerydb.org/v1/breweries";

  constructor() {
    this.server = new Server(
      {
        name: "open-brewery-db-mcp",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "search_breweries",
            description: "Search for breweries by name, city, state, or type",
            inputSchema: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "Search query (brewery name, city, etc.)",
                },
                by_city: {
                  type: "string",
                  description: "Filter by city name",
                },
                by_state: {
                  type: "string",
                  description: "Filter by state (full name or abbreviation)",
                },
                by_type: {
                  type: "string",
                  description: "Filter by brewery type (micro, nano, regional, brewpub, large, planning, bar, contract, proprietor, closed)",
                },
                per_page: {
                  type: "number",
                  description: "Number of results per page (default: 20, max: 50)",
                  minimum: 1,
                  maximum: 50,
                },
                page: {
                  type: "number",
                  description: "Page number (default: 1)",
                  minimum: 1,
                },
              },
              additionalProperties: false,
            },
          },
          {
            name: "get_brewery_by_id",
            description: "Get detailed information about a specific brewery by ID",
            inputSchema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "Brewery ID",
                },
              },
              required: ["id"],
              additionalProperties: false,
            },
          },
          {
            name: "get_random_brewery",
            description: "Get a random brewery",
            inputSchema: {
              type: "object",
              properties: {
                size: {
                  type: "number",
                  description: "Number of random breweries to return (default: 1, max: 10)",
                  minimum: 1,
                  maximum: 10,
                },
              },
              additionalProperties: false,
            },
          },
          {
            name: "list_brewery_types",
            description: "List all available brewery types",
            inputSchema: {
              type: "object",
              properties: {},
              additionalProperties: false,
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "search_breweries":
            return await this.searchBreweries(args);
          case "get_brewery_by_id":
            return await this.getBreweryById(args);
          case "get_random_brewery":
            return await this.getRandomBrewery(args);
          case "list_brewery_types":
            return await this.listBreweryTypes();
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
        };
      }
    });
  }

  private async searchBreweries(args: any) {
    const params = new URLSearchParams();

    if (args.query) params.append("by_name", args.query);
    if (args.by_city) params.append("by_city", args.by_city);
    if (args.by_state) params.append("by_state", args.by_state);
    if (args.by_type) params.append("by_type", args.by_type);
    if (args.per_page) params.append("per_page", String(args.per_page));
    if (args.page) params.append("page", String(args.page));

    const url = `${this.baseUrl}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const breweries: Brewery[] = await response.json();

    return {
      content: [
        {
          type: "text",
          text: this.formatBreweries(breweries),
        },
      ],
    };
  }

  private async getBreweryById(args: any) {
    const { id } = args;
    const url = `${this.baseUrl}/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const brewery: Brewery = await response.json();

    return {
      content: [
        {
          type: "text",
          text: this.formatBrewery(brewery),
        },
      ],
    };
  }

  private async getRandomBrewery(args: any) {
    const size = args.size || 1;
    const url = `${this.baseUrl}/random?size=${size}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const breweries: Brewery[] = await response.json();

    return {
      content: [
        {
          type: "text",
          text: this.formatBreweries(breweries),
        },
      ],
    };
  }

  private async listBreweryTypes() {
    const types = [
      "micro - Most craft breweries. For example, Samual Adams is still considered a micro brewery.",
      "nano - An extremely small brewery which typically only distributes locally.",
      "regional - A regional location of an expanded brewery. Ex. Sierra Nevada Asheville.",
      "brewpub - A beer-focused restaurant or restaurant/bar with a brewery on-premise.",
      "large - (DEPRECATED) A very large brewery. Likely not for visitors. Ex. Miller-Coors.",
      "planning - A brewery in planning or not yet opened to the public.",
      "bar - (DEPRECATED) A bar. No brewery equipment on premise.",
      "contract - A brewery that uses another brewery's equipment.",
      "proprietor - Similar to contract brewing but refers to a brewery incubator.",
      "closed - A location which has been closed."
    ];

    return {
      content: [
        {
          type: "text",
          text: "Available brewery types:\n\n" + types.map(type => `• ${type}`).join("\n"),
        },
      ],
    };
  }

  private formatBrewery(brewery: Brewery): string {
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

  private formatBreweries(breweries: Brewery[]): string {
    if (breweries.length === 0) {
      return "No breweries found.";
    }

    return `Found ${breweries.length} brewery(ies):\n\n` +
      breweries.map(brewery => this.formatBrewery(brewery)).join("\n\n---\n\n");
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Open Brewery DB MCP Server running on stdio");
  }
}

const server = new OpenBreweryDBServer();
server.run().catch(console.error);
