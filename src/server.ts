import { FastMCP } from 'fastmcp';
import { IncomingHttpHeaders } from "http";
import { registerAllTools, ToolCategory } from './tools';
import { createClient, LinodeClient } from './client';

export const VERSION = '0.2.4';

export interface ServerOptions {
  token: string;
  enabledCategories?: ToolCategory[];
  transport?: 'stdio' | 'sse' | 'http';
  port?: number;
  host?: string;
  endpoint?: string;
}

export interface SessionData {
  headers: IncomingHttpHeaders;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

/**
 * Creates and starts a Linode MCP Server
 * @param options Server configuration options
 * @returns Configured and running MCP server instance
 */
export async function startServer(options: ServerOptions) {
  console.error('Starting Linode MCP server...');
  
  try {
    // Initialize FastMCP server
    const server = new FastMCP({
      name: 'linode-mcp-server',
      version: VERSION,
      authenticate: async (request: any): Promise<SessionData> => {
        return {
          headers: request.headers
        };
      }
    });

    // Save token in server options
    (server.options as any).token = options.token;

    console.error('Server initialized successfully');

    // Register tools with direct client access (only enabled categories)
    try {
      console.error(`Registering tool categories: ${options.enabledCategories?.join(', ') || 'all'}`);
      registerAllTools(server, options.enabledCategories);
      
      // Show debugging info
      console.error(`Successfully registered tools`);
    } catch (error) {
      console.error(`Failed to register tools: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }

    // Start the server with the specified transport
    const transport = options.transport || 'stdio';
    console.error(`Starting server with transport: ${transport}`);
    
    if (transport === 'http') {
      const port = options.port || 8080;
      const host = options.host || '127.0.0.1';
      const endpoint = (options.endpoint || '/mcp') as `/${string}`;
      console.error(`Starting HTTP server on ${host}:${port}${endpoint}`);
      
      server.start({
        transportType: 'httpStream',
        httpStream: { port, endpoint }
      });
    } else if (transport === 'sse') {
      const port = options.port || 3000;
      const host = options.host || '127.0.0.1';
      const endpoint = (options.endpoint || '/sse') as `/${string}`;
      console.error(`Starting SSE server on ${host}:${port}${endpoint}`);
      
      server.start({
        transportType: 'sse',
        sse: { port, endpoint }
      });
    } else {
      // Default to stdio
      console.error('Starting stdio server');
      server.start({
        transportType: 'stdio'
      });
    }

    console.error('Server started successfully');
    return server;
  } catch (error) {
    console.error(`Failed to initialize MCP server: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
