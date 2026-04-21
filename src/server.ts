import { FastMCP } from 'fastmcp';
import { IncomingMessage } from "http";
import { registerAllTools, ToolCategory } from './tools';

export const VERSION = '0.4.0';

export interface ServerOptions {
  token: string;
  enabledCategories?: ToolCategory[];
  transport?: 'stdio' | 'http';
  port?: number;
  host?: string;
  endpoint?: string;
}

export interface LinodeSession {
  token: string;
  [key: string]: unknown;
}

/**
 * Creates and starts a Linode MCP Server
 * @param options Server configuration options
 * @returns Configured and running MCP server instance
 */
export async function startServer(options: ServerOptions) {
  console.error('Starting Linode MCP server...');

  try {
    // Initialize FastMCP server with typed session
    const server = new FastMCP<LinodeSession>({
      name: 'linode-mcp-server',
      version: VERSION,
      authenticate: async (request: IncomingMessage): Promise<LinodeSession> => {
        // For HTTP transports: try to extract token from headers
        // For stdio transport: request is undefined, fall back to CLI token
        const headerToken = request?.headers?.['authorization']?.split(' ')[1]
          || request?.headers?.['x-be-api-token'] as string | undefined;
        return {
          token: headerToken || options.token,
        };
      }
    });

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
      const endpoint = (options.endpoint || '/mcp') as `/${string}`;
      console.error(`Starting HTTP server on ${options.host || '127.0.0.1'}:${port}${endpoint}`);

      server.start({
        transportType: 'httpStream',
        httpStream: { port, endpoint }
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
