import {
  McpServer,
  // TODO: ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import * as cheerio from "cheerio";

const server = new McpServer({
  name: "dolar-hoje-mcp",
  version: "1.0.0",
});

const tools = {
  dolar_hoje: {
    name: "fetch_dolar_to_reais",
    schema: {},
  },
};

// Async tool with external API call
server.tool(
  tools.dolar_hoje.name,
  tools.dolar_hoje.schema,
  async () => {
    const response = await fetch(`https://dolarhoje.com`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const value = $("#nacional").attr("value");

    return {
      content: [{ type: "text", text: `R$ ${value}` }],
    };
  },
);

// Start receiving messages on stdin and sending messages on stdout
async function startMcpServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Connected to MCP client");
}

startMcpServer().catch((error) => {
  console.error("Error connecting to MCP client:", error);
});
