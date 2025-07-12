import { FastMCP } from 'fastmcp';
import { LinodeClient, PlacementGroup } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerPlacementTools(server: FastMCP, client: LinodeClient) {
  // Register placement tools
  server.addTool({
    name: 'list_placement_groups',
    description: 'List all placement groups',
    parameters: schemas.listPlacementGroupsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const paginationParams = {
          page: params.page,
          page_size: params.page_size
        };
        const result = await client.placement.getPlacementGroups(paginationParams);
        
        // Check if result and result.data exist before accessing properties
        if (!result || !result.data) {
      return {
            content: [
              { type: 'text', text: "No placement groups found or empty response received." },
            ],
          };
        }
        
        return {
          content: [
            { type: 'text', text: formatPlacementGroups(result.data) },
          ],
        };
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
    parameters: schemas.getPlacementGroupSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        if (!params || params.id === undefined || params.id === null) {
      return {
            content: [
              { type: 'text', text: "Error: Placement group ID is required" },
            ],
          };
        }
        
        const result = await client.placement.getPlacementGroup(params.id);
        
        if (!result) {
      return {
            content: [
              { type: 'text', text: `No placement group found with ID ${params.id}` },
            ],
          };
        }
        
        return {
          content: [
            { type: 'text', text: formatPlacementGroup(result) },
          ],
        };
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
    parameters: schemas.createPlacementGroupSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const result = await client.placement.createPlacementGroup(params);
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
    parameters: schemas.updatePlacementGroupSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const { id, ...data } = params;
        const result = await client.placement.updatePlacementGroup(id, data);
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
    parameters: schemas.deletePlacementGroupSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        await client.placement.deletePlacementGroup(params.id);
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
    parameters: schemas.assignInstancesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const result = await client.placement.assignInstances(params.id, { linodes: params.linodes });
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
    parameters: schemas.unassignInstancesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      try {
        const result = await client.placement.unassignInstances(params.id, { linodes: params.linodes });
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

/**
 * Formats a placement group for display
 */
function formatPlacementGroup(group: PlacementGroup): string {
  // Handle null or undefined input
  if (!group) {
      return 'No placement group data available.';
  }

  // Safely access properties with null checks
  const details = [
    `ID: ${group.id || 'Unknown ID'}`,
    `Label: ${group.label || 'Unnamed'}`,
    `Type: ${group.placement_group_type || 'Unknown type'}`,
    `Policy: ${group.placement_group_policy || 'Unknown policy'}`,
    `Region: ${group.region || 'Unknown region'}`,
  ];
  
  // Safely handle linodes array
  if (group.linodes && Array.isArray(group.linodes)) {
    details.push(`Linodes: ${group.linodes.length > 0 ? group.linodes.join(', ') : 'None'}`);
  } else {
    details.push('Linodes: None');
  }
  
  // Safely handle dates
  if (group.created) {
    try {
      details.push(`Created: ${new Date(group.created).toLocaleString()}`);
    } catch (e) {
      details.push(`Created: ${group.created}`);
    }
  }
  
  if (group.updated) {
    try {
      details.push(`Updated: ${new Date(group.updated).toLocaleString()}`);
    } catch (e) {
      details.push(`Updated: ${group.updated}`);
    }
  }

  // Safely handle tags
  if (group.tags && Array.isArray(group.tags) && group.tags.length > 0) {
    details.push(`Tags: ${group.tags.join(', ')}`);
  }

  return details.join('\n');
}

/**
 * Formats placement groups for display
 */
function formatPlacementGroups(groups: PlacementGroup[]): string {
  // Handle null or undefined input
  if (!groups) {
      return 'No placement groups data available.';
  }
  
  // Handle empty array
  if (groups.length === 0) {
      return 'No placement groups found.';
  }

  const formattedGroups = groups.map((group) => {
    // Safely access properties with null checks
    const label = group.label || 'Unnamed';
    const id = group.id || 'Unknown ID';
    const region = group.region || 'Unknown region';
    const type = group.placement_group_type || 'Unknown type';
    const policy = group.placement_group_policy || 'Unknown policy';
    const linodesCount = group.linodes && Array.isArray(group.linodes) ? group.linodes.length : 0;
    
    return `${label} (ID: ${id}, Region: ${region}, Type: ${type}, Policy: ${policy}, Linodes: ${linodesCount})`;
    });

  return formattedGroups.join('\n');
}