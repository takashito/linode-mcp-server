import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, PlacementGroup } from '../../client';
import * as schemas from './schemas';

export function registerPlacementTools(server: McpServer, client: LinodeClient) {
  // Register placement tools
  server.tool(
    'list_placement_groups',
    'List all placement groups',
    schemas.listPlacementGroupsSchema.shape,
    async (_, extra) => {
      const result = await client.placement.getPlacementGroups();
      return {
        content: [
          { type: 'text', text: formatPlacementGroups(result.data) },
        ],
      };
    }
  );

  server.tool(
    'get_placement_group',
    'Get details for a specific placement group',
    schemas.getPlacementGroupSchema.shape,
    async (params, extra) => {
      const result = await client.placement.getPlacementGroup(params.id);
      return {
        content: [
          { type: 'text', text: formatPlacementGroup(result) },
        ],
      };
    }
  );

  server.tool(
    'create_placement_group',
    'Create a new placement group',
    schemas.createPlacementGroupSchema.shape,
    async (params, extra) => {
      const result = await client.placement.createPlacementGroup(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_placement_group',
    'Update an existing placement group',
    schemas.updatePlacementGroupSchema.shape,
    async (params, extra) => {
      const { id, ...data } = params;
      const result = await client.placement.updatePlacementGroup(id, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_placement_group',
    'Delete a placement group',
    schemas.deletePlacementGroupSchema.shape,
    async (params, extra) => {
      await client.placement.deletePlacementGroup(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'assign_instances',
    'Assign Linode instances to a placement group',
    schemas.assignInstancesSchema.shape,
    async (params, extra) => {
      const result = await client.placement.assignInstances(params.id, { linodes: params.linodes });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'unassign_instances',
    'Unassign Linode instances from a placement group',
    schemas.unassignInstancesSchema.shape,
    async (params, extra) => {
      const result = await client.placement.unassignInstances(params.id, { linodes: params.linodes });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );
}

/**
 * Formats a placement group for display
 */
function formatPlacementGroup(group: PlacementGroup): string {
  const details = [
    `ID: ${group.id}`,
    `Label: ${group.label}`,
    `Type: ${group.placement_group_type}`,
    `Policy: ${group.placement_group_policy}`,
    `Region: ${group.region}`,
    `Linodes: ${group.linodes.length > 0 ? group.linodes.join(', ') : 'None'}`,
    `Created: ${new Date(group.created).toLocaleString()}`,
    `Updated: ${new Date(group.updated).toLocaleString()}`,
  ];

  if (group.tags && group.tags.length > 0) {
    details.push(`Tags: ${group.tags.join(', ')}`);
  }

  return details.join('\n');
}

/**
 * Formats placement groups for display
 */
function formatPlacementGroups(groups: PlacementGroup[]): string {
  if (groups.length === 0) {
    return 'No placement groups found.';
  }

  const formattedGroups = groups.map((group) => {
    return `${group.label} (ID: ${group.id}, Region: ${group.region}, Type: ${group.placement_group_type}, Policy: ${group.placement_group_policy}, Linodes: ${group.linodes.length})`;
  });

  return formattedGroups.join('\n');
}