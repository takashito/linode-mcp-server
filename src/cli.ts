#!/usr/bin/env node

import { Command } from 'commander';
import { config } from 'dotenv';
import { startServer } from './server';

// Load environment variables from .env file
config();

const program = new Command();

program
  .name('linode-mcp-server')
  .description('MCP server for Linode API integration with Claude Desktop')
  .version('1.0.0');

program
  .option('-t, --token <token>', 'Linode API token')
  .action((options) => {
    // Check for token in command line args, then env var, then .env file
    const token = options.token || process.env.LINODE_API_TOKEN;

    // Ensure the token is provided
    if (!token) {
      console.error('Error: Linode API token is required');
      console.error('Please provide a token with --token option or set LINODE_API_TOKEN environment variable');
      process.exit(1);
    }

    // Start the server
    try {
      startServer({ token });
      console.error('Linode MCP server started');
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  });

program.parse();
