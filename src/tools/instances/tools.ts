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

  // Backup operations
  server.tool(
    'list_backups',
    'Get a list of all backups for a Linode instance',
    schemas.getBackupsSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getBackups(params.linodeId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_backup',
    'Get details for a specific backup',
    schemas.getBackupSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getBackup(params.linodeId, params.backupId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_snapshot',
    'Create a snapshot for a Linode instance',
    schemas.createSnapshotSchema.shape,
    async (params, extra) => {
      const { linodeId, ...data } = params;
      const result = await client.instances.createSnapshot(linodeId, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'cancel_backups',
    'Cancel backups for a Linode instance',
    schemas.cancelBackupsSchema.shape,
    async (params, extra) => {
      await client.instances.cancelBackups(params.linodeId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'enable_backups',
    'Enable backups for a Linode instance',
    schemas.enableBackupsSchema.shape,
    async (params, extra) => {
      await client.instances.enableBackups(params.linodeId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'restore_backup',
    'Restore a backup to a Linode instance',
    schemas.restoreBackupSchema.shape,
    async (params, extra) => {
      const { linodeId, backupId, ...data } = params;
      await client.instances.restoreBackup(linodeId, backupId, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  // IP operations
  server.tool(
    'get_networking_information',
    'Get networking information for a Linode instance',
    schemas.getLinodeIPsSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getLinodeIPs(params.linodeId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'allocate_ipv4_address',
    'Allocate an IPv4 address for a Linode instance',
    schemas.linodeAllocateIPSchema.shape,
    async (params, extra) => {
      const { linodeId, ...data } = params;
      const result = await client.instances.allocateIP(linodeId, data as any);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_instance_ip_address',
    'Get details for a specific IP address for a Linode instance',
    schemas.getLinodeIPSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getLinodeIP(params.linodeId, params.address);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_ip_address_rdns',
    'Update the RDNS for an IP address of a Linode instance',
    schemas.updateLinodeIPSchema.shape,
    async (params, extra) => {
      const { linodeId, address, ...data } = params;
      const result = await client.instances.updateLinodeIP(linodeId, address, data as any);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );
  
  server.tool(
    'delete_ipv4_address',
    'Delete an IPv4 address from a Linode instance',
    schemas.deleteLinodeIPSchema.shape,
    async (params, extra) => {
      await client.instances.deleteLinodeIP(params.linodeId, params.address);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  // Firewall operations
  server.tool(
    'list_linode_firewalls',
    'List firewalls for a Linode instance',
    schemas.getLinodeFirewallsSchema.shape,
    async (params, extra) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = { page, page_size };
      const result = await client.instances.getLinodeFirewalls(linodeId, paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'apply_linode_firewalls',
    'Apply firewalls to a Linode instance',
    schemas.applyFirewallsSchema.shape,
    async (params, extra) => {
      await client.instances.applyFirewalls(params.linodeId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  // Additional disk operations
  server.tool(
    'clone_disk',
    'Clone a disk for a Linode instance',
    schemas.cloneDiskSchema.shape,
    async (params, extra) => {
      const { linodeId, diskId, label } = params;
      const result = await client.instances.cloneDisk(linodeId, diskId, label ? { label } : undefined);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'reset_disk_root_password',
    'Reset the root password for a disk',
    schemas.resetDiskPasswordSchema.shape,
    async (params, extra) => {
      await client.instances.resetDiskPassword(params.linodeId, params.diskId, params.password);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  // Migration and upgrade operations
  server.tool(
    'initiate_migration',
    'Initiate a migration for a Linode instance',
    schemas.migrateLinodeSchema.shape,
    async (params, extra) => {
      const { id, region } = params;
      await client.instances.migrateLinode(id, region ? { region } : undefined);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'upgrade_linode',
    'Upgrade a Linode instance',
    schemas.mutateLinodeSchema.shape,
    async (params, extra) => {
      await client.instances.mutateLinode(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  // Reset root password operation
  server.tool(
    'reset_root_password',
    'Reset the root password for a Linode instance',
    schemas.resetRootPasswordSchema.shape,
    async (params, extra) => {
      const { id, ...data } = params;
      await client.instances.resetRootPassword(id, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  // Transfer operations
  server.tool(
    'get_network_transfer',
    'Get network transfer information for a Linode instance',
    schemas.getNetworkTransferSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getNetworkTransfer(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_monthly_network_transfer',
    'Get monthly network transfer stats for a Linode instance',
    schemas.getMonthlyTransferSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getMonthlyTransfer(params.id, params.year, params.month);
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
    'Get a list of all available Linode types, including pricing and specifications',
    schemas.listInstanceTypesSchema.shape,
    async (params: { page?: number; page_size?: number }, extra: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.instances.getTypes(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_instance_type',
    'Get details for a specific Linode type, including pricing and specifications',
    schemas.getInstanceTypeSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getType(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Config Interface operations
  server.tool(
    'list_config_interfaces',
    'List all interfaces for a configuration profile',
    schemas.getConfigInterfacesSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getConfigInterfaces(params.linodeId, params.configId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_config_interface',
    'Get details for a specific configuration profile interface',
    schemas.getConfigInterfaceSchema.shape,
    async (params, extra) => {
      const result = await client.instances.getConfigInterface(params.linodeId, params.configId, params.interfaceId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_config_interface',
    'Create a new interface for a configuration profile',
    schemas.createConfigInterfaceSchema.shape,
    async (params, extra) => {
      const { linodeId, configId, ...data } = params;
      const result = await client.instances.createConfigInterface(linodeId, configId, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_config_interface',
    'Update an interface for a configuration profile',
    schemas.updateConfigInterfaceSchema.shape,
    async (params, extra) => {
      const { linodeId, configId, interfaceId, ...data } = params;
      const result = await client.instances.updateConfigInterface(linodeId, configId, interfaceId, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_config_interface',
    'Delete an interface from a configuration profile',
    schemas.deleteConfigInterfaceSchema.shape,
    async (params, extra) => {
      await client.instances.deleteConfigInterface(params.linodeId, params.configId, params.interfaceId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'reorder_config_interfaces',
    'Reorder interfaces for a configuration profile',
    schemas.reorderConfigInterfacesSchema.shape,
    async (params, extra) => {
      const { linodeId, configId, ids } = params;
      await client.instances.reorderConfigInterfaces(linodeId, configId, { ids });
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    }
  );

  // NodeBalancer operations for instance
  server.tool(
    'list_instance_nodebalancers',
    'List NodeBalancers attached to a Linode instance',
    schemas.getLinodeNodeBalancersSchema.shape,
    async (params, extra) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = {
        page,
        page_size
      };
      const result = await client.instances.getLinodeNodeBalancers(linodeId, paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Volume operations for instance
  server.tool(
    'list_instance_volumes',
    'List volumes attached to a Linode instance',
    schemas.getLinodeVolumesSchema.shape,
    async (params, extra) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = {
        page,
        page_size
      };
      const result = await client.instances.getLinodeVolumes(linodeId, paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );
}