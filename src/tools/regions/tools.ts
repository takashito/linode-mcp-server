import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerRegionTools(server: McpServer, client: LinodeClient) {
  // Register region tools
  server.tool(
    'list_regions',
    'Get a list of all available regions',
    schemas.listRegionsSchema.shape,
    async (_, extra) => {
      const result = await client.regions.getRegions();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_region',
    'Get details for a specific region',
    schemas.getRegionSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.regions.getRegion(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  ));
}
