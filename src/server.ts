import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createClient } from './client';
import { registerAllTools, ToolCategory } from './tools';
import { ListPromptsRequestSchema, ListResourcesRequestSchema } from '@modelcontextprotocol/sdk/types.js';

export interface ServerOptions {
  token: string;
  enabledCategories?: ToolCategory[];
}

/**
 * Creates and starts a Linode MCP Server
 * @param options Server configuration options
 * @returns Configured and running MCP server instance
 */
export function startServer(options: ServerOptions) {
  console.error('Starting Linode MCP server...');
  
  // Initialize the server
  try {
    const server = new McpServer({
      name: 'linode-mcp-server',
      version: '0.1.6',
      description: 'MCP server for Linode API integration'
    });

    server.server.registerCapabilities({
      resources: {},
      prompts: {}
    });
    
    console.error('MCP Server initialized successfully');

    // Create Linode client with the provided token
    const client = createClient(options.token);

    // Register tools with direct client access (only enabled categories)
    try {
      console.error(`Registering tool categories: ${options.enabledCategories?.join(', ') || 'all'}`);
      registerAllTools(server, client, options.enabledCategories);
      
      // Show debugging info
      console.error(`Successfully registered tools`);
    } catch (error) {
      console.error(`Failed to register tools: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }

    server.server.setRequestHandler(ListResourcesRequestSchema, async () => { return { resources:[] } });
    server.server.setRequestHandler(ListPromptsRequestSchema, async () => { return { prompts:[] } });
    
    // Start the server with stdio transport
    try {
      const transport = new StdioServerTransport();
      server.connect(transport);
      console.error('Linode MCP server started');
    } catch (error) {
      console.error(`Failed to start server: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }

    return server;
  } catch (error) {
    console.error(`Failed to initialize MCP server: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
