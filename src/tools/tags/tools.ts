import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
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
export function registerTagsTools(server: McpServer, client: LinodeClient): void {
  // List Tags
  server.tool(
    'list_tags',
    'Get a list of all Tags',
    listTagsSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const result = await client.tags.getTags(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) }
        ]
      };
    })
  );

  // Get a specific Tag
  server.tool(
    'get_tag',
    'Get details for a specific Tag',
    getTagSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const { label } = params;
      const result = await client.tags.getTag(label);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) }
        ]
      };
    })
  );

  // Create a Tag
  server.tool(
    'create_tag',
    'Create a new Tag',
    createTagSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const result = await client.tags.createTag(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) }
        ]
      };
    })
  );

  // Delete a Tag
  server.tool(
    'delete_tag',
    'Delete a Tag',
    deleteTagSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const { label } = params;
      await client.tags.deleteTag(label);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) }
        ]
      };
    })
  );
}