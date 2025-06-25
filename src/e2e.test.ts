import { describe, test, beforeEach, expect } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import {
	ListToolsResultSchema,
	CallToolResultSchema,
	GetPromptResultSchema,
	ListResourcesResultSchema,
	ListPromptsResultSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { createServer } from "./mcp.js";

// E2E tests using in-memory transport and SDK client

describe("MCP Server E2E (in-memory)", () => {
	let mcpServer: ReturnType<typeof createServer>;
	let client: Client;
	let clientTransport: ReturnType<typeof InMemoryTransport.createLinkedPair>[0];
	let serverTransport: ReturnType<typeof InMemoryTransport.createLinkedPair>[1];

	beforeEach(async () => {
		mcpServer = createServer();
		client = new Client({ name: "test client", version: "1.0" });
		[clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
		await Promise.all([
			mcpServer.connect(serverTransport),
			client.connect(clientTransport),
		]);
	});

	test("tools/list returns all tools", async () => {
		const res = await client.request(
			{ method: "tools/list", params: {} },
			ListToolsResultSchema
		);
		expect(Array.isArray(res.tools)).toBe(true);
		expect(res.tools.length).toBeGreaterThan(0);
		// Check for known tool names from mcp.ts
		const toolNames = res.tools.map((t) => t.name);
		expect(toolNames).toEqual(
			expect.arrayContaining([
				"brewery/by-id",
				"brewery/search",
				"brewery/random",
			])
		);
	});

	test("resources/list returns all resources", async () => {
		const res = await client.request(
			{ method: "resources/list", params: {} },
			ListResourcesResultSchema
		);
		expect(Array.isArray(res.resources)).toBe(true);
		// Check for known resource URIs
		const uris = res.resources.map((r) => r.uri);
		expect(uris).toEqual(expect.arrayContaining(["brewery://types"]));
	});

	test("prompts/list returns all prompts", async () => {
		const res = await client.request(
			{ method: "prompts/list", params: {} },
			ListPromptsResultSchema
		);
		expect(Array.isArray(res.prompts)).toBe(true);
		const promptNames = res.prompts.map((p) => p.name);
		expect(promptNames).toEqual(
			expect.arrayContaining(["brewery/by-state"])
		);
	});

	test("tools/call brewery/search works", async () => {
		const res = await client.request(
			{
				method: "tools/call",
				params: { name: "brewery/search", arguments: { query: "dog" } },
			},
			CallToolResultSchema
		);
		expect(res.content[0].text).toMatch(/dog/i);
	});

	test("tools/call brewery/random works", async () => {
		const res = await client.request(
			{
				method: "tools/call",
				params: { name: "brewery/random", arguments: { size: 1 } },
			},
			CallToolResultSchema
		);
		expect(res.content.length).toBeGreaterThan(0);
		// Should contain brewery info
		expect(res.content[0].text).toMatch(/Brewery|Type|City|State/i);
	});

	test("tools/call brewery/by-id works", async () => {
		const res = await client.request(
			{
				method: "tools/call",
				params: {
					name: "brewery/by-id",
					arguments: { id: "13677292-c029-4542-9335-497bcd8d515d" },
				},
			},
			CallToolResultSchema
		);
		expect(res.content[0].text).toMatch(/Ever Grain Brewing Co/i);
		expect(res.content[0].text).toMatch(/Pennsylvania/i);
		expect(res.content[0].text).toMatch(/Camp Hill/i);
	});

	test("prompts/get brewery/by-state works", async () => {
		const res = await client.request(
			{
				method: "prompts/get",
				params: { name: "brewery/by-state", arguments: { state: "California" } },
			},
			GetPromptResultSchema
		);
		expect(res.messages[0].content.text).toContain("California");
	});

	test("multiple tool calls return valid results", async () => {
		const searchRes = await client.request(
			{
				method: "tools/call",
				params: { name: "brewery/search", arguments: { by_city: "Portland" } },
			},
			CallToolResultSchema
		);
		expect(searchRes.content[0].text).toMatch(/Portland/i);

		const randomRes = await client.request(
			{
				method: "tools/call",
				params: { name: "brewery/random", arguments: { size: 2 } },
			},
			CallToolResultSchema
		);
		expect(randomRes.content.length).toBe(2);
	});
});
