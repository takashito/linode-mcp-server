import { FastMCP } from 'fastmcp';
import { createClient, LinodeClient, CreateVolumeRequest } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerVolumeTools(server: FastMCP, client: LinodeClient) {
  // Register volume tools
  server.addTool({
    name: 'list_volumes',
    description: 'Get a list of all volumes',
    parameters: schemas.listVolumesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).volumes.getVolumes(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_volume',
    description: 'Get details for a specific volume',
    parameters: schemas.getVolumeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).volumes.getVolumeById(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_volume',
    description: 'Create a new volume',
    parameters: schemas.createVolumeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const createData: CreateVolumeRequest = {
        region: String(params.region),
        size: Number(params.size),
        label: String(params.label),
        linode_id: params.linode_id ? Number(params.linode_id) : undefined,
        tags: params.tags,
        config_id: params.config_id ? Number(params.config_id) : undefined,
        encryption: params.encryption
      };
      const result = await createClient(context, server).volumes.createVolume(createData);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_volume',
    description: 'Delete a volume',
    parameters: schemas.deleteVolumeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).volumes.deleteVolume(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'attach_volume',
    description: 'Attach a volume to a Linode instance',
    parameters: schemas.attachVolumeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).volumes.attachVolume(params.id, {
        linode_id: params.linode_id,
        config_id: params.config_id,
      });
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'detach_volume',
    description: 'Detach a volume from a Linode instance',
    parameters: schemas.detachVolumeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).volumes.detachVolume(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'resize_volume',
    description: 'Resize a volume',
    parameters: schemas.resizeVolumeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).volumes.resizeVolume(params.id, { size: params.size });
      return JSON.stringify(result, null, 2);
    })
  });
}
