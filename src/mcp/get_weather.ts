import {
  McpServer,
  // TODO: ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "marco-mcp",
  version: "1.0.0",
});

const tools = {
  weather: {
    name: "fetch_weather",
    schema: { city: z.string() },
  },
};

// Async tool with external API call
server.tool(
  tools.weather.name,
  tools.weather.schema,
  ({ city }) => {
    // const response = await fetch(`https://api.open-meteo.com/v1/${city}`);
    // const data = await response.text();
    return {
      content: [{ type: "text", text: city + "is hot" }],
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
