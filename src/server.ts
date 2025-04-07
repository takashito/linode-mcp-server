import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createClient } from './client';
import { registerAllTools } from './tools';

export interface ServerOptions {
  token: string;
}

/**
 * Creates and starts a Linode MCP Server
 */
export function startServer(options: ServerOptions) {
  const server = new McpServer({
    name: 'linode-mcp-server',
    version: '0.1.3',
    description: 'MCP server for Linode API integration',
  });

  // Create Linode client with the provided token
  const client = createClient(options.token);

  // Register all tools with direct client access
  registerAllTools(server, client);

  // Start the server with stdio transport
  const transport = new StdioServerTransport();
  server.connect(transport);

  return server;
}
