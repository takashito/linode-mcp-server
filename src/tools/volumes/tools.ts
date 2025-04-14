import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, CreateVolumeRequest } from '../../client';
import * as schemas from './schemas';

export function registerVolumeTools(server: McpServer, client: LinodeClient) {
  // Register volume tools
  server.tool(
    'list_volumes',
    'Get a list of all volumes',
    schemas.listVolumesSchema.shape,
    async (params, extra) => {
      const result = await client.volumes.getVolumes(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_volume',
    'Get details for a specific volume',
    schemas.getVolumeSchema.shape,
    async (params, extra) => {
      const result = await client.volumes.getVolumeById(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_volume',
    'Create a new volume',
    schemas.createVolumeSchema.shape,
    async (params: any, extra: any) => {
      const createData: CreateVolumeRequest = {
        region: String(params.region),
        size: Number(params.size),
        label: String(params.label),
        linode_id: params.linode_id ? Number(params.linode_id) : undefined,
        tags: params.tags,
        config_id: params.config_id ? Number(params.config_id) : undefined,
        encryption: params.encryption
      };
      const result = await client.volumes.createVolume(createData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_volume',
    'Delete a volume',
    schemas.deleteVolumeSchema.shape,
    async (params, extra) => {
      const result = await client.volumes.deleteVolume(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'attach_volume',
    'Attach a volume to a Linode instance',
    schemas.attachVolumeSchema.shape,
    async (params, extra) => {
      const result = await client.volumes.attachVolume(params.id, {
        linode_id: params.linode_id,
        config_id: params.config_id,
      });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'detach_volume',
    'Detach a volume from a Linode instance',
    schemas.detachVolumeSchema.shape,
    async (params, extra) => {
      const result = await client.volumes.detachVolume(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'resize_volume',
    'Resize a volume',
    schemas.resizeVolumeSchema.shape,
    async (params, extra) => {
      const result = await client.volumes.resizeVolume(params.id, { size: params.size });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );
}
