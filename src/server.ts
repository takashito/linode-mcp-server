import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { startHTTPStreamServer, startSSEServer, InMemoryEventStore } from 'mcp-proxy';
import { createClient } from './client';
import { registerAllTools, ToolCategory } from './tools';
import { ListPromptsRequestSchema, ListResourcesRequestSchema } from '@modelcontextprotocol/sdk/types.js';

export const VERSION = '0.2.1';

export interface ServerOptions {
  token: string;
  enabledCategories?: ToolCategory[];
  transport?: 'stdio' | 'sse' | 'http';
  httpOptions?: HttpServerOptions;
  sseOptions?: SSEServerOptions;
}

export interface HttpServerOptions {
  port: number;
  endpoint: string;
}

export interface SSEServerOptions {
  port: number;
  endpoint: string;
  host: string;
}

/**
 * Creates and starts a Linode MCP Server
 * @param options Server configuration options
 * @returns Configured and running MCP server instance
 */
export async function startServer(options: ServerOptions) {
  console.error('Starting Linode MCP server...');
  
  // Initialize the server
  try {
    const server = new McpServer({
      name: 'linode-mcp-server',
      version: VERSION,
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
    
    // Start HTTP server if enabled
    if (options.transport === 'http' && options.httpOptions) {
      try {
        const { port, endpoint } = options.httpOptions;
        console.error(`Starting StreamableHTTP server on port ${port}, endpoint ${endpoint}`);
        
        const { close } = await startHTTPStreamServer({
          port,
          endpoint,
          createServer: async () => {
            // Return the already configured server
            return server;
          },
          eventStore: new InMemoryEventStore(),
        });
        
        console.error(`HTTP StreamableHTTP server started successfully`);
      } catch (error) {
        console.error(`Failed to start StreamableHTTP server: ${error instanceof Error ? error.message : String(error)}`);
        // Continue with stdio even if HTTP server fails
      }
    }
    
    // Start SSE server if enabled
    if (options.transport === 'sse' && options.sseOptions) {
      try {
        const { port, endpoint, host } = options.sseOptions;
        console.error(`Starting SSE server on ${host}:${port}, endpoint ${endpoint}`);
        
        // Remove host parameter as it's not supported by startSSEServer
        const { close } = await startSSEServer({
          port,
          endpoint,
          createServer: async () => {
            // Return the already configured server
            return server;
          },
        });
        
        console.error(`SSE server started successfully`);
      } catch (error) {
        console.error(`Failed to start SSE server: ${error instanceof Error ? error.message : String(error)}`);
        // Continue with stdio even if SSE server fails
      }
    }
    
    // Start the server with stdio transport
    if (options.transport === 'stdio' || !options.transport) {
      try {
        const transport = new StdioServerTransport();
        server.connect(transport);
        console.error('Stdio MCP server transport connected');
      } catch (error) {
        console.error(`Failed to start stdio server: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
      }
    }

    return server;
  } catch (error) {
    console.error(`Failed to initialize MCP server: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
