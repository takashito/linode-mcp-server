import { FastMCP } from 'fastmcp';
import { LinodeClient } from '../../client';
import {
  listTagsSchema,
  getTagSchema,
  createTagSchema,
  deleteTagSchema
} from './schemas';
import { withErrorHandling } from '../common/errorHandler';

/**
 * Register Tags tools with the MCP server
 */
export function registerTagsTools(server: FastMCP, client: LinodeClient): void {
  // List Tags
  server.addTool({
    name: 'list_tags',
    description: 'Get a list of all Tags',
    parameters: listTagsSchema,
    execute: withErrorHandling(async (params: any) => {
      const result = await client.tags.getTags(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Get a specific Tag
    server.addTool({
    name: 'get_tag',
    description: 'Get details for a specific Tag',
    parameters: getTagSchema,
    execute: withErrorHandling(async (params: any) => {
      const { label } = params;
      const result = await client.tags.getTag(label);
      return JSON.stringify(result, null, 2);
    })
  });

  // Create a Tag
    server.addTool({
    name: 'create_tag',
    description: 'Create a new Tag',
    parameters: createTagSchema,
    execute: withErrorHandling(async (params: any) => {
      const result = await client.tags.createTag(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Delete a Tag
    server.addTool({
    name: 'delete_tag',
    description: 'Delete a Tag',
    parameters: deleteTagSchema,
    execute: withErrorHandling(async (params: any) => {
      const { label } = params;
      await client.tags.deleteTag(label);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
}