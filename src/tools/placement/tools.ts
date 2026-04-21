import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerPlacementTools(server: FastMCP) {
  // Register placement tools
  server.addTool({
    name: 'list_placement_groups',
    description: 'List all placement groups',
    parameters: mcpInput(schemas.listPlacementGroupsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const paginationParams = {
          page: params.page,
          page_size: params.page_size
        };
        const result = await createClient(context).placement.getPlacementGroups(paginationParams);
        
        // Check if result and result.data exist before accessing properties
        if (!result || !result.data) {
      return {
            content: [
              { type: 'text', text: "No placement groups found or empty response received." },
            ],
          };
        }
        
        return JSON.stringify(result, null, 2);
      } catch (error: any) {
        // Handle error gracefully
        const errorMessage = error?.message || 'Unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Error retrieving placement groups: ${errorMessage}` },
          ],
        };
      }    })
  });
  server.addTool({
    name: 'get_placement_group',
    description: 'Get details for a specific placement group',
    parameters: mcpInput(schemas.getPlacementGroupSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        if (!params || params.id === undefined || params.id === null) {
      return {
            content: [
              { type: 'text', text: "Error: Placement group ID is required" },
            ],
          };
        }
        
        const result = await createClient(context).placement.getPlacementGroup(params.id);
        
        if (!result) {
      return {
            content: [
              { type: 'text', text: `No placement group found with ID ${params.id}` },
            ],
          };
        }
        
        return JSON.stringify(result, null, 2);
      } catch (error: any) {
        const errorMessage = error?.message || 'Unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Error retrieving placement group: ${errorMessage}` },
          ],
        };
      }    })
  });
  server.addTool({
    name: 'create_placement_group',
    description: 'Create a new placement group',
    parameters: mcpInput(schemas.createPlacementGroupSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const result = await createClient(context).placement.createPlacementGroup(params);
        return JSON.stringify(result, null, 2);
      } catch (error: any) {
        const errorMessage = error?.message || 'Unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Error creating placement group: ${errorMessage}` },
          ],
        };
      }    })
  });
  server.addTool({
    name: 'update_placement_group',
    description: 'Update an existing placement group',
    parameters: mcpInput(schemas.updatePlacementGroupSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const { id, ...data } = params;
        const result = await createClient(context).placement.updatePlacementGroup(id, data);
        return JSON.stringify(result, null, 2);
      } catch (error: any) {
        const errorMessage = error?.message || 'Unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Error updating placement group: ${errorMessage}` },
          ],
        };
      }    })
  });
  server.addTool({
    name: 'delete_placement_group',
    description: 'Delete a placement group',
    parameters: mcpInput(schemas.deletePlacementGroupSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        await createClient(context).placement.deletePlacementGroup(params.id);
        return JSON.stringify({ success: true }, null, 2);
      } catch (error: any) {
        const errorMessage = error?.message || 'Unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Error deleting placement group: ${errorMessage}` },
          ],
        };
      }    })
  });
  server.addTool({
    name: 'assign_instances',
    description: 'Assign Linode instances to a placement group',
    parameters: mcpInput(schemas.assignInstancesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const result = await createClient(context).placement.assignInstances(params.id, { linodes: params.linodes });
        return JSON.stringify(result, null, 2);
      } catch (error: any) {
        const errorMessage = error?.message || 'Unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Error assigning instances to placement group: ${errorMessage}` },
          ],
        };
      }    })
  });
  server.addTool({
    name: 'unassign_instances',
    description: 'Unassign Linode instances from a placement group',
    parameters: mcpInput(schemas.unassignInstancesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const result = await createClient(context).placement.unassignInstances(params.id, { linodes: params.linodes });
        return JSON.stringify(result, null, 2);
      } catch (error: any) {
        const errorMessage = error?.message || 'Unknown error occurred';
        return {
          content: [
            { type: 'text', text: `Error unassigning instances from placement group: ${errorMessage}` },
          ],
        };
      }    })
  });
}
