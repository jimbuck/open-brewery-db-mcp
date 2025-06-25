# Open Brewery DB MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that provides access to the [Open Brewery DB](https://www.openbrewerydb.org/) API. This server enables AI assistants and other MCP clients to search for breweries, get detailed brewery information, and explore brewery data from around the world.

## Installation

### From npm (Recommended)

Install the package globally or as a dependency:

```bash
npm install -g @jimbuck/open-brewery-db-mcp
# or for local usage
npm install @jimbuck/open-brewery-db-mcp
```

## Quick Start

### Run with npx (no clone required)

```bash
npx open-brewery-db-mcp
```

### Or clone and run locally

```bash
git clone https://github.com/your-username/open-brewery-db-mcp.git
cd open-brewery-db-mcp
npm install
npm run dev
```

This will start the server with the **MCP Inspector** - a web-based interface for testing and exploring all the brewery tools interactively!

### As an MCP Server (for MCP clients)

The server communicates via stdio and follows the MCP protocol. To use it with an MCP client:

```bash
npm start
# or
node dist/index.js
```

### MCP Client Configuration Example

To connect this server to an MCP client like Claude Desktop, add the following configuration:

**macOS**: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "open-brewery-db": {
      "command": "npx",
      "args": ["@jimbuck/open-brewery-db-mcp"]
    }
  }
}
```

Or, if installed locally or cloned:

```json
{
  "mcpServers": {
    "open-brewery-db": {
      "command": "node",
      "args": ["/path/to/open-brewery-db-mcp/dist/index.js"]
    }
  }
}
```

## About Open Brewery DB

[Open Brewery DB](https://www.openbrewerydb.org/) is a free and open-source API that provides comprehensive information about breweries worldwide. The database includes:

- **40,000+ breweries** from around the globe
- Detailed brewery information including names, types, locations, and contact details
- Regular updates from community contributions
- No authentication required for basic usage

### Brewery Types

The API categorizes breweries into several types:

- **micro** - Most craft breweries. For example, Samuel Adams is still considered a micro brewery
- **nano** - An extremely small brewery which typically only distributes locally
- **regional** - A regional location of an expanded brewery. Ex. Sierra Nevada Asheville
- **brewpub** - A beer-focused restaurant or restaurant/bar with a brewery on-premise
- **large** - (DEPRECATED) A very large brewery. Likely not for visitors. Ex. Miller-Coors
- **planning** - A brewery in planning or not yet opened to the public
- **bar** - (DEPRECATED) A bar. No brewery equipment on premise
- **contract** - A brewery that uses another brewery's equipment
- **proprietor** - Similar to contract brewing but refers to a brewery incubator
- **closed** - A location which has been closed

## Features

This MCP server provides the following tools:

### 🔍 `search_breweries`
Search for breweries with flexible filtering options:
- **by name** - Search by brewery name
- **by city** - Filter by city name
- **by state** - Filter by state (full name or abbreviation)
- **by type** - Filter by brewery type (see types above)
- **pagination** - Control results with `page` and `per_page` parameters

### 🏭 `get_brewery_by_id`
Get detailed information about a specific brewery using its unique ID.

### 🎲 `get_random_brewery`
Discover new breweries by getting random brewery information. You can specify how many random breweries to retrieve (1-10).

### 📋 `list_brewery_types`
Get a complete list of all available brewery types with descriptions.

## Usage

### Development

For development with the **MCP Inspector** (recommended):

```bash
npm run dev
```

This command starts the server with the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which provides:
- 🔍 **Interactive testing** of all MCP tools
- 📊 **Real-time debugging** of server responses  
- 🎯 **Visual tool exploration** with a web-based interface
- 🚀 **Instant feedback** without needing to configure a full MCP client

The inspector will automatically open in your browser, allowing you to test brewery searches, explore random breweries, and validate all functionality in real-time.

To watch for changes and rebuild (production mode):

```bash
npm run watch
```

## API Examples

### Search for breweries in Portland
```json
{
  "name": "search_breweries",
  "arguments": {
    "by_city": "Portland",
    "by_state": "Oregon",
    "per_page": 10
  }
}
```

### Get a specific brewery
```json
{
  "name": "get_brewery_by_id",
  "arguments": {
    "id": "11590"
  }
}
```

### Get 3 random breweries
```json
{
  "name": "get_random_brewery",
  "arguments": {
    "size": 3
  }
}
```

## Data Schema

Each brewery object includes the following information:

```typescript
{
  id: string;                    // Unique identifier
  name: string;                  // Brewery name
  brewery_type: BreweryType;     // Type of brewery
  address_1?: string;            // Street address
  address_2?: string;            // Additional address info
  address_3?: string;            // Additional address info
  city?: string;                 // City name
  state_province?: string;       // State or province
  postal_code?: string;          // Postal/ZIP code
  country?: string;              // Country
  longitude?: string;            // GPS longitude
  latitude?: string;             // GPS latitude
  phone?: string;                // Phone number
  website_url?: string;          // Website URL
  state?: string;                // US state code
  street?: string;               // Street address (alternative)
}
```

## Rate Limiting

Open Brewery DB has reasonable rate limits:
- No authentication required for basic usage
- Please be respectful with API calls
- For high-volume usage, consider caching responses

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes (`git commit -m 'feat: Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

**Want to help improve the brewery data itself?**  
Contributions to the brewery listings and data are welcome! Check out the [Open Brewery DB GitHub repository](https://github.com/openbrewerydb/openbrewerydb) to suggest changes, add new breweries, or help maintain the dataset.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Open Brewery DB](https://www.openbrewerydb.org/) for providing the excellent brewery API
- [Model Context Protocol](https://modelcontextprotocol.io) for the protocol specification
- All contributors to the brewery data

## Support

If you encounter any issues or have questions:

1. Check the [Open Brewery DB documentation](https://www.openbrewerydb.org/documentation)
2. Open an issue in this repository
3. Check existing issues for similar problems

---

**Note**: This is an unofficial MCP server for Open Brewery DB. It is not affiliated with or endorsed by Open Brewery DB.
