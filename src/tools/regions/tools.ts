import { FastMCP } from 'fastmcp';
import { createClient, LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerRegionTools(server: FastMCP, client: LinodeClient) {
  // Register region tools
  server.addTool({
    name: 'list_regions',
    description: 'Get a list of all available regions',
    parameters: schemas.listRegionsSchema,
    execute: async (params: any, context?: any) => {
      const result = await createClient(context, server).regions.getRegions();
      return JSON.stringify(result, null, 2);
    }
  });
  server.addTool({
    name: 'get_region',
    description: 'Get details for a specific region',
    parameters: schemas.getRegionSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).regions.getRegion(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
}
