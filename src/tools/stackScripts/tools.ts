import { FastMCP } from 'fastmcp';
import { createClient, LinodeClient } from '../../client';
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
export function registerStackScriptsTools(server: FastMCP, client: LinodeClient): void {
  // List StackScripts
    server.addTool({
    name: 'list_stackscripts',
    description: 'Get a list of all StackScripts',
    parameters: listStackScriptsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).stackScripts.getStackScripts(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Get a specific StackScript
    server.addTool({
    name: 'get_stackscript',
    description: 'Get details for a specific StackScript',
    parameters: getStackScriptSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id } = params;
      const result = await createClient(context).stackScripts.getStackScript(id);
      return JSON.stringify(result, null, 2);
    })
  });

  // Create a StackScript
    server.addTool({
    name: 'create_stackscript',
    description: 'Create a new StackScript',
    parameters: createStackScriptSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).stackScripts.createStackScript(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Update a StackScript
    server.addTool({
    name: 'update_stackscript',
    description: 'Update an existing StackScript',
    parameters: updateStackScriptSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...data } = params;
      const result = await createClient(context).stackScripts.updateStackScript(id, data);
      return JSON.stringify(result, null, 2);
    })
  });

  // Delete a StackScript
    server.addTool({
    name: 'delete_stackscript',
    description: 'Delete a StackScript',
    parameters: deleteStackScriptSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id } = params;
      await createClient(context).stackScripts.deleteStackScript(id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
}