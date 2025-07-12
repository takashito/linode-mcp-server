import { FastMCP } from 'fastmcp';
import { createClient, LinodeClient, CreateLinodeRequest, UpdateLinodeRequest, PaginationParams } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerInstanceTools(server: FastMCP) {
  // Instance operations
  server.addTool({
    name: 'list_instances',
    description: 'Get a list of all Linode instances',
    parameters: schemas.listInstancesSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).instances.getLinodes(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_instance',
    description: 'Get details for a specific Linode instance',
    parameters: schemas.getInstanceSchema,
    execute: withErrorHandling(async (params: { id: number }, context?: any) => {
      const result = await createClient(context).instances.getLinodeById(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'create_instance',
    description: 'Create a new Linode instance',
    parameters: schemas.createInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
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
      const result = await createClient(context).instances.createLinode(createParams);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_instance',
    description: 'Update a Linode instance',
    parameters: schemas.updateInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...updateParams } = params;
      const updateData: UpdateLinodeRequest = { 
        label: updateParams.label,
        tags: updateParams.tags,
        group: updateParams.group,
        alerts: updateParams.alerts
      };
      const result = await createClient(context).instances.updateLinode(Number(id), updateData);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'reboot_instance',
    description: 'Reboot a Linode instance',
    parameters: schemas.rebootInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.rebootLinode(params.id, params.config_id);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'boot_instance',
    description: 'Power on a Linode instance',
    parameters: schemas.bootInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.bootLinode(params.id, params.config_id);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'shutdown_instance',
    description: 'Power off a Linode instance',
    parameters: schemas.shutdownInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.shutdownLinode(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'delete_instance',
    description: 'Delete a Linode instance',
    parameters: schemas.deleteInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.deleteLinode(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'resize_instance',
    description: 'Resize a Linode instance',
    parameters: schemas.resizeInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...resizeData } = params;
      const result = await createClient(context).instances.resizeLinode(id, resizeData);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'clone_instance',
    description: 'Clone a Linode instance',
    parameters: schemas.cloneInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...cloneData } = params;
      const result = await createClient(context).instances.cloneLinode(Number(id), cloneData);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'rebuild_instance',
    description: 'Rebuild a Linode instance',
    parameters: schemas.rebuildInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...rebuildData } = params;
      const result = await createClient(context).instances.rebuildLinode(id, rebuildData);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'rescue_instance',
    description: 'Boot a Linode instance into rescue mode',
    parameters: schemas.rescueInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, devices } = params;
      const result = await createClient(context).instances.rescueLinode(id, devices);
      return JSON.stringify(result, null, 2);
    })
  });

  // Config operations
  server.addTool({
    name: 'list_instance_configs',
    description: 'Get all configuration profiles for a Linode instance',
    parameters: schemas.getLinodeConfigsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = {
        page,
        page_size
      };
      const result = await createClient(context).instances.getLinodeConfigs(linodeId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_instance_config',
    description: 'Get a specific configuration profile for a Linode instance',
    parameters: schemas.getLinodeConfigSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getLinodeConfig(params.linodeId, params.configId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'create_instance_config',
    description: 'Create a new configuration profile for a Linode instance',
    parameters: schemas.createLinodeConfigSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, ...configData } = params;
      const result = await createClient(context).instances.createLinodeConfig(linodeId, configData);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_instance_config',
    description: 'Update a configuration profile for a Linode instance',
    parameters: schemas.updateLinodeConfigSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, configId, ...updateData } = params;
      const result = await createClient(context).instances.updateLinodeConfig(linodeId, configId, updateData);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'delete_instance_config',
    description: 'Delete a configuration profile for a Linode instance',
    parameters: schemas.deleteLinodeConfigSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.deleteLinodeConfig(params.linodeId, params.configId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Disk operations
  server.addTool({
    name: 'list_instance_disks',
    description: 'Get all disks for a Linode instance',
    parameters: schemas.getLinodeDisksSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = {
        page,
        page_size
      };
      const result = await createClient(context).instances.getLinodeDisks(linodeId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_instance_disk',
    description: 'Get a specific disk for a Linode instance',
    parameters: schemas.getLinodeDiskSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getLinodeDisk(params.linodeId, params.diskId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'create_instance_disk',
    description: 'Create a new disk for a Linode instance',
    parameters: schemas.createLinodeDiskSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, ...diskData } = params;
      const result = await createClient(context).instances.createLinodeDisk(linodeId, diskData);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_instance_disk',
    description: 'Update a disk for a Linode instance',
    parameters: schemas.updateLinodeDiskSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, diskId, ...updateData } = params;
      const result = await createClient(context).instances.updateLinodeDisk(linodeId, diskId, updateData);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'delete_instance_disk',
    description: 'Delete a disk for a Linode instance',
    parameters: schemas.deleteLinodeDiskSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.deleteLinodeDisk(params.linodeId, params.diskId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'resize_instance_disk',
    description: 'Resize a disk for a Linode instance',
    parameters: schemas.resizeLinodeDiskSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.resizeLinodeDisk(params.linodeId, params.diskId, params.size);
      return JSON.stringify(result, null, 2);
    })
  });

  // Stats operations
  server.addTool({
    name: 'get_instance_stats',
    description: 'Get current statistics for a Linode instance',
    parameters: schemas.getLinodeStatsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getLinodeStats(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_instance_stats_by_date',
    description: 'Get statistics for a Linode instance for a specific month',
    parameters: schemas.getLinodeStatsByDateSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getLinodeStatsByDate(params.id, params.year, params.month);
      return JSON.stringify(result, null, 2);
    })
  });

  // Backup operations
  server.addTool({
    name: 'list_backups',
    description: 'Get a list of all backups for a Linode instance',
    parameters: schemas.getBackupsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getBackups(params.linodeId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_backup',
    description: 'Get details for a specific backup',
    parameters: schemas.getBackupSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getBackup(params.linodeId, params.backupId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'create_snapshot',
    description: 'Create a snapshot for a Linode instance',
    parameters: schemas.createSnapshotSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, ...data } = params;
      const result = await createClient(context).instances.createSnapshot(linodeId, data);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'cancel_backups',
    description: 'Cancel backups for a Linode instance',
    parameters: schemas.cancelBackupsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).instances.cancelBackups(params.linodeId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  server.addTool({
    name: 'enable_backups',
    description: 'Enable backups for a Linode instance',
    parameters: schemas.enableBackupsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).instances.enableBackups(params.linodeId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  server.addTool({
    name: 'restore_backup',
    description: 'Restore a backup to a Linode instance',
    parameters: schemas.restoreBackupSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, backupId, ...data } = params;
      await createClient(context).instances.restoreBackup(linodeId, backupId, data);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // IP operations
  server.addTool({
    name: 'get_networking_information',
    description: 'Get networking information for a Linode instance',
    parameters: schemas.getLinodeIPsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getLinodeIPs(params.linodeId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'allocate_ipv4_address',
    description: 'Allocate an IPv4 address for a Linode instance',
    parameters: schemas.linodeAllocateIPSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, ...data } = params;
      const result = await createClient(context).instances.allocateIP(linodeId, data as any);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_instance_ip_address',
    description: 'Get details for a specific IP address for a Linode instance',
    parameters: schemas.getLinodeIPSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getLinodeIP(params.linodeId, params.address);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_ip_address_rdns',
    description: 'Update the RDNS for an IP address of a Linode instance',
    parameters: schemas.updateLinodeIPSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, address, ...data } = params;
      const result = await createClient(context).instances.updateLinodeIP(linodeId, address, data as any);
      return JSON.stringify(result, null, 2);
    })
  });
  
  server.addTool({
    name: 'delete_ipv4_address',
    description: 'Delete an IPv4 address from a Linode instance',
    parameters: schemas.deleteLinodeIPSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).instances.deleteLinodeIP(params.linodeId, params.address);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Firewall operations
  server.addTool({
    name: 'list_linode_firewalls',
    description: 'List firewalls for a Linode instance',
    parameters: schemas.getLinodeFirewallsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = { page, page_size };
      const result = await createClient(context).instances.getLinodeFirewalls(linodeId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'apply_linode_firewalls',
    description: 'Apply firewalls to a Linode instance',
    parameters: schemas.applyFirewallsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).instances.applyFirewalls(params.linodeId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Additional disk operations
  server.addTool({
    name: 'clone_disk',
    description: 'Clone a disk for a Linode instance',
    parameters: schemas.cloneDiskSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, diskId, label } = params;
      const result = await createClient(context).instances.cloneDisk(linodeId, diskId, label ? { label } : undefined);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'reset_disk_root_password',
    description: 'Reset the root password for a disk',
    parameters: schemas.resetDiskPasswordSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).instances.resetDiskPassword(params.linodeId, params.diskId, params.password);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Migration and upgrade operations
  server.addTool({
    name: 'initiate_migration',
    description: 'Initiate a migration for a Linode instance',
    parameters: schemas.migrateLinodeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, region } = params;
      await createClient(context).instances.migrateLinode(id, region ? { region } : undefined);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  server.addTool({
    name: 'upgrade_linode',
    description: 'Upgrade a Linode instance',
    parameters: schemas.mutateLinodeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).instances.mutateLinode(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Reset root password operation
  server.addTool({
    name: 'reset_root_password',
    description: 'Reset the root password for a Linode instance. Your Linode must be shut down for a password reset to complete.',
    parameters: schemas.resetRootPasswordSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...data } = params;
      await createClient(context).instances.resetRootPassword(id, data);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Transfer operations
  server.addTool({
    name: 'get_network_transfer',
    description: 'Get network transfer information for a Linode instance',
    parameters: schemas.getNetworkTransferSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getNetworkTransfer(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_monthly_network_transfer',
    description: 'Get monthly network transfer stats for a Linode instance',
    parameters: schemas.getMonthlyTransferSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getMonthlyTransfer(params.id, params.year, params.month);
      return JSON.stringify(result, null, 2);
    })
  });

  // Kernel operations
  server.addTool({
    name: 'list_kernels',
    description: 'Get a list of all available kernels',
    parameters: schemas.listKernelsSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).instances.getKernels(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_kernel',
    description: 'Get details for a specific kernel',
    parameters: schemas.getKernelSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getKernelById(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  // Instance Type operations
  server.addTool({
    name: 'list_instance_types',
    description: 'Get a list of all available Linode types, including pricing and specifications',
    parameters: schemas.listInstanceTypesSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).instances.getTypes(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_instance_type',
    description: 'Get details for a specific Linode type, including pricing and specifications',
    parameters: schemas.getInstanceTypeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getType(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  // Config Interface operations
  server.addTool({
    name: 'list_config_interfaces',
    description: 'List all interfaces for a configuration profile',
    parameters: schemas.getConfigInterfacesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getConfigInterfaces(params.linodeId, params.configId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_config_interface',
    description: 'Get details for a specific configuration profile interface',
    parameters: schemas.getConfigInterfaceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).instances.getConfigInterface(params.linodeId, params.configId, params.interfaceId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'create_config_interface',
    description: 'Create a new interface for a configuration profile',
    parameters: schemas.createConfigInterfaceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, configId, ...data } = params;
      const result = await createClient(context).instances.createConfigInterface(linodeId, configId, data);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_config_interface',
    description: 'Update an interface for a configuration profile',
    parameters: schemas.updateConfigInterfaceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, configId, interfaceId, ...data } = params;
      const result = await createClient(context).instances.updateConfigInterface(linodeId, configId, interfaceId, data);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'delete_config_interface',
    description: 'Delete an interface from a configuration profile',
    parameters: schemas.deleteConfigInterfaceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).instances.deleteConfigInterface(params.linodeId, params.configId, params.interfaceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  server.addTool({
    name: 'reorder_config_interfaces',
    description: 'Reorder interfaces for a configuration profile',
    parameters: schemas.reorderConfigInterfacesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, configId, ids } = params;
      await createClient(context).instances.reorderConfigInterfaces(linodeId, configId, { ids });
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // NodeBalancer operations for instance
  server.addTool({
    name: 'list_instance_nodebalancers',
    description: 'List NodeBalancers attached to a Linode instance',
    parameters: schemas.getLinodeNodeBalancersSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = {
        page,
        page_size
      };
      const result = await createClient(context).instances.getLinodeNodeBalancers(linodeId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Volume operations for instance
  server.addTool({
    name: 'list_instance_volumes',
    description: 'List volumes attached to a Linode instance',
    parameters: schemas.getLinodeVolumesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, page, page_size } = params;
      const paginationParams = {
        page,
        page_size
      };
      const result = await createClient(context).instances.getLinodeVolumes(linodeId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
}