import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient } from '../../client';
import {
  listStackScriptsSchema,
  getStackScriptSchema,
  createStackScriptSchema,
  updateStackScriptSchema,
  deleteStackScriptSchema
} from './schemas';
import { withErrorHandling } from '../common/errorHandler';

/**
 * Register StackScripts tools with the MCP server
 */
export function registerStackScriptsTools(server: McpServer, client: LinodeClient): void {
  // List StackScripts
  server.tool(
    'list_stackscripts',
    'Get a list of all StackScripts',
    listStackScriptsSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const result = await client.stackScripts.getStackScripts(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) }
        ]
      };
    })
  );

  // Get a specific StackScript
  server.tool(
    'get_stackscript',
    'Get details for a specific StackScript',
    getStackScriptSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const { id } = params;
      const result = await client.stackScripts.getStackScript(id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) }
        ]
      };
    })
  );

  // Create a StackScript
  server.tool(
    'create_stackscript',
    'Create a new StackScript',
    createStackScriptSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const result = await client.stackScripts.createStackScript(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) }
        ]
      };
    })
  );

  // Update a StackScript
  server.tool(
    'update_stackscript',
    'Update an existing StackScript',
    updateStackScriptSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const { id, ...data } = params;
      const result = await client.stackScripts.updateStackScript(id, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) }
        ]
      };
    })
  );

  // Delete a StackScript
  server.tool(
    'delete_stackscript',
    'Delete a StackScript',
    deleteStackScriptSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const { id } = params;
      await client.stackScripts.deleteStackScript(id);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) }
        ]
      };
    })
  );
}