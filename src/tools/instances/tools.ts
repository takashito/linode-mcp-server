import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, CreateLinodeRequest, UpdateLinodeRequest, PaginationParams } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerInstanceTools(server: McpServer, client: LinodeClient) {
  // Instance operations
  server.tool(
    'list_instances',
    'Get a list of all Linode instances',
    schemas.listInstancesSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.instances.getLinodes(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_instance',
    'Get details for a specific Linode instance',
    schemas.getInstanceSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.instances.getLinodeById(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'create_instance',
    'Create a new Linode instance',
    schemas.createInstanceSchema.shape,
    withErrorHandling(async (params: any, extra: any) => {
      const createParams: CreateLinodeRequest = {
        region: String(params.region),
        type: String(params.type),
        label: String(params.label),
        root_pass: params.root_pass,
        image: params.image,
        authorized_keys: params.authorized_keys,
        authorized_users: params.authorized_users,
        backups_enabled: params.backups_enabled,
        booted: params.booted,
        private_ip: params.private_ip,
        tags: params.tags,
        group: params.group,
        firewall_id: params.firewall_id
      };
      const result = await client.instances.createLinode(createParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_instance',
    'Update a Linode instance',
    schemas.updateInstanceSchema.shape,
    async (params: any, extra: any) => {
      const { id, ...updateParams } = params;
      const updateData: UpdateLinodeRequest = { 
        label: updateParams.label,
        tags: updateParams.tags,
        group: updateParams.group,
        alerts: updateParams.alerts
      };
      const result = await client.instances.updateLinode(Number(id), updateData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'reboot_instance',
    'Reboot a Linode instance',
    schemas.rebootInstanceSchema.shape,
    async (params, extra) => {
      const result = await client.instances.rebootLinode(params.id, params.config_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'boot_instance',
    'Power on a Linode instance',
    schemas.bootInstanceSchema.shape,
    async (params, extra) => {
      const result = await client.instances.bootLinode(params.id, params.config_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'shutdown_instance',
    'Power off a Linode instance',
    schemas.shutdownInstanceSchema.shape,
    async (params, extra) => {
      const result = await client.instances.shutdownLinode(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_instance',
    'Delete a Linode instance',
    schemas.deleteInstanceSchema.shape,
    async (params, extra) => {
      const result = await client.instances.deleteLinode(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'resize_instance',
    'Resize a Linode instance',
    schemas.resizeInstanceSchema.shape,
    async (params, extra) => {
      const { id, ...resizeData } = params;
      const result = await client.instances.resizeLinode(id, resizeData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'clone_instance',
    'Clone a Linode instance',
    schemas.cloneInstanceSchema.shape,
    async (params: any, extra: any) => {
      const { id, ...cloneData } = params;
      const result = await client.instances.cloneLinode(Number(id), cloneData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'rebuild_instance',
    'Rebuild a Linode instance',
    schemas.rebuildInstanceSchema.shape,
    async (params, extra) => {
      const { id, ...rebuildData } = params;
      const result = await client.instances.rebuildLinode(id, rebuildData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'rescue_instance',
    'Boot a Linode instance into rescue mode',
    schemas.rescueInstanceSchema.shape,
    async (params, extra) => {
      const { id, devices } = params;
      const result = await client.instances.rescueLinode(id, devices);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Config operations
  server.tool(
    'list_instance_configs',
    'Get all configuration profiles for a Linode instance',
    schemas.getLinodeConfigsSchema.shape,
    async (params, extra) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = {
        page,
        page_size
      };
      const result = await client.instances.getLinodeConfigs(linodeId, paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_instance_config',
    'Get a specific configuration profile for a Linode instance',
    schemas.getLinodeConfigSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getLinodeConfig(params.linodeId, params.configId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_instance_config',
    'Create a new configuration profile for a Linode instance',
    schemas.createLinodeConfigSchema.shape,
    async (params, extra) => {
      const { linodeId, ...configData } = params;
      const result = await client.instances.createLinodeConfig(linodeId, configData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_instance_config',
    'Update a configuration profile for a Linode instance',
    schemas.updateLinodeConfigSchema.shape,
    async (params, extra) => {
      const { linodeId, configId, ...updateData } = params;
      const result = await client.instances.updateLinodeConfig(linodeId, configId, updateData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_instance_config',
    'Delete a configuration profile for a Linode instance',
    schemas.deleteLinodeConfigSchema.shape,
    async (params, extra) => {
      const result = await client.instances.deleteLinodeConfig(params.linodeId, params.configId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Disk operations
  server.tool(
    'list_instance_disks',
    'Get all disks for a Linode instance',
    schemas.getLinodeDisksSchema.shape,
    async (params, extra) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = {
        page,
        page_size
      };
      const result = await client.instances.getLinodeDisks(linodeId, paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_instance_disk',
    'Get a specific disk for a Linode instance',
    schemas.getLinodeDiskSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getLinodeDisk(params.linodeId, params.diskId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_instance_disk',
    'Create a new disk for a Linode instance',
    schemas.createLinodeDiskSchema.shape,
    async (params, extra) => {
      const { linodeId, ...diskData } = params;
      const result = await client.instances.createLinodeDisk(linodeId, diskData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_instance_disk',
    'Update a disk for a Linode instance',
    schemas.updateLinodeDiskSchema.shape,
    async (params, extra) => {
      const { linodeId, diskId, ...updateData } = params;
      const result = await client.instances.updateLinodeDisk(linodeId, diskId, updateData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_instance_disk',
    'Delete a disk for a Linode instance',
    schemas.deleteLinodeDiskSchema.shape,
    async (params, extra) => {
      const result = await client.instances.deleteLinodeDisk(params.linodeId, params.diskId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'resize_instance_disk',
    'Resize a disk for a Linode instance',
    schemas.resizeLinodeDiskSchema.shape,
    async (params, extra) => {
      const result = await client.instances.resizeLinodeDisk(params.linodeId, params.diskId, params.size);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Stats operations
  server.tool(
    'get_instance_stats',
    'Get current statistics for a Linode instance',
    schemas.getLinodeStatsSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getLinodeStats(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_instance_stats_by_date',
    'Get statistics for a Linode instance for a specific month',
    schemas.getLinodeStatsByDateSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getLinodeStatsByDate(params.id, params.year, params.month);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Kernel operations
  server.tool(
    'list_kernels',
    'Get a list of all available kernels',
    schemas.listKernelsSchema.shape,
    async (params: { page?: number; page_size?: number }, extra: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.instances.getKernels(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_kernel',
    'Get details for a specific kernel',
    schemas.getKernelSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getKernelById(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Instance Type operations
  server.tool(
    'list_instance_types',
    'Get a list of all available Linode types',
    schemas.listInstanceTypesSchema.shape,
    async (params: { page?: number; page_size?: number }, extra: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.linodeTypes.getTypes(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_instance_type',
    'Get details for a specific Linode type',
    schemas.getInstanceTypeSchema.shape,
    async (params, extra) => {
      const result = await client.linodeTypes.getType(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );
}