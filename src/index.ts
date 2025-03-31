import { config } from 'dotenv';
import { startServer, ServerOptions } from './server';
import { createClient, LinodeClient } from './client';
import { OperationsManager } from './operations';

// Load environment variables from .env file
config();

export { startServer, ServerOptions };
export { createClient, LinodeClient };
export { OperationsManager };

// Auto-start server when this file is executed directly (not imported)
if (require.main === module) {
  // Check for token in command line args or env vars
  const args = process.argv.slice(2);
  let token: string | undefined;

  // Check for --token or -t parameter
  for (let i = 0; i < args.length - 1; i++) {
    if (args[i] === '--token' || args[i] === '-t') {
      token = args[i + 1];
      break;
    }
  }

  // If no token in args, try environment variable
  token = token || process.env.LINODE_API_TOKEN;

  if (!token) {
    console.error('Error: Linode API token is required');
    console.error('Please provide a token with --token option or set LINODE_API_TOKEN environment variable');
    process.exit(1);
  }

  try {
    startServer({ token });
    console.error('Linode MCP server started');
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}
