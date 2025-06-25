import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { createServer } from './mcp.js';

const server = createServer();

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
