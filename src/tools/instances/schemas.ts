import { z } from 'zod';
import { pagingParamsSchema, tagSchema, tagsSchema, paginationSchema, paginatedResponseSchema } from '../common/schemas';

// Config Interface schema (moved to the top for dependency resolution)
export const configInterfaceSchema = z.object({
  id: z.number().describe('The ID of the interface'),
  label: z.string().describe('The label for the interface'),
  purpose: z.enum(['public', 'vlan', 'vpc']).describe('The purpose of the interface (public, vlan, vpc)'),
  ipam_address: z.string().nullable().describe('The IPAM address for the interface'),
  primary: z.boolean().optional().describe('Whether this is the primary interface'),
  active: z.boolean().optional().describe('Whether the interface is active'),
  subnet_id: z.number().optional().describe('The subnet ID for VPC interfaces'),
  vpc_id: z.number().optional().describe('The VPC ID for VPC interfaces'),
  ipv4: z.object({
    vpc: z.string().optional().describe('The IPv4 address for VPC interfaces'),
    nat_1_1: z.string().optional().describe('The IPv4 1:1 NAT address')
  }).optional()
});

// Base types
const linodeSpecsSchema = z.object({
  disk: z.number().describe('The amount of storage space in MB'),
  memory: z.number().describe('The amount of RAM in MB'),
  vcpus: z.number().describe('The number of virtual CPUs'),
  transfer: z.number().describe('The amount of network transfer available in GB')
});

const linodeAlertsSchema = z.object({
  cpu: z.number().describe('CPU usage threshold percentage (0-400)'),
  io: z.number().describe('Disk IO threshold in ops/sec'),
  network_in: z.number().describe('Incoming network traffic threshold in Mbps'),
  network_out: z.number().describe('Outgoing network traffic threshold in Mbps'),
  transfer_quota: z.number().describe('Network transfer quota threshold in GB')
});

const linodeBackupsSchema = z.object({
  enabled: z.boolean().describe('Whether backups are enabled'),
  schedule: z.object({
    day: z.string().describe('The day that backups are taken'),
    window: z.string().describe('The window during which backups are taken')
  }),
  last_successful: z.string().nullable().describe('The last successful backup time')
});

// Response schemas
export const linodeInstanceSchema = z.object({
  id: z.number().describe('The unique identifier for this Linode'),
  label: z.string().describe('The Linode\'s display label'),
  region: z.string().describe('The region where the Linode is located'),
  type: z.string().describe('The Linode plan type'),
  status: z.string().describe('The current status of the Linode'),
  ipv4: z.array(z.string()).describe('IPv4 addresses for this Linode'),
  ipv6: z.string().describe('IPv6 addresses for this Linode'),
  created: z.string().describe('When this Linode was created'),
  updated: z.string().describe('When this Linode was last updated'),
  hypervisor: z.string().describe('The virtualization software used for this Linode'),
  specs: linodeSpecsSchema,
  alerts: linodeAlertsSchema,
  backups: linodeBackupsSchema,
  image: z.string().nullable().describe('The image used by this Linode'),
  group: z.string().describe('The display group of this Linode'),
  tags: z.array(z.string()).describe('Tags applied to this Linode'),
  host_uuid: z.string().describe('The UUID of the host for this Linode'),
  watchdog_enabled: z.boolean().describe('Whether the watchdog service is enabled')
});

export const linodeConfigSchema = z.object({
  id: z.number().describe('The config ID'),
  label: z.string().describe('The config\'s label'),
  comments: z.string().describe('User-supplied comments about this configuration'),
  kernel: z.string().describe('The kernel used in this configuration'),
  memory_limit: z.number().describe('The memory limit in MB for this configuration'),
  root_device: z.string().describe('The root device for this configuration'),
  devices: z.record(z.string()).describe('The devices attached to this configuration'),
  initrd: z.string().nullable().describe('The initial ramdisk file used for this configuration'),
  created: z.string().describe('When this configuration was created'),
  updated: z.string().describe('When this configuration was last updated'),
  helpers: z.object({
    updatedb_disabled: z.boolean().describe('Whether updatedb is disabled in this configuration'),
    distro: z.boolean().describe('Whether the distro helper is enabled'),
    network: z.boolean().describe('Whether the network helper is enabled'),
    modules_dep: z.boolean().describe('Whether the modules dependency helper is enabled')
  }),
  interfaces: z.array(configInterfaceSchema).describe('Network interfaces for this configuration')
});

export const linodeDiskSchema = z.object({
  id: z.number().describe('The disk ID'),
  label: z.string().describe('The disk\'s label'),
  status: z.string().describe('The disk\'s status'),
  size: z.number().describe('The disk size in MB'),
  filesystem: z.string().describe('The disk filesystem type'),
  created: z.string().describe('When this disk was created'),
  updated: z.string().describe('When this disk was last updated')
});

export const kernelSchema = z.object({
  id: z.string().describe('The kernel ID'),
  label: z.string().describe('The kernel\'s label'),
  version: z.string().describe('The kernel\'s version'),
  kvm: z.boolean().describe('Whether this kernel supports KVM virtualization'),
  architecture: z.string().describe('The architecture this kernel supports'),
  pvops: z.boolean().describe('Whether this kernel supports paravirtualized operations'),
  deprecated: z.boolean().describe('Whether this kernel is deprecated'),
  built: z.string().describe('When this kernel was built')
});

// List responses
export const linodeInstancesResponseSchema = paginatedResponseSchema(linodeInstanceSchema);
export const linodeConfigsResponseSchema = paginatedResponseSchema(linodeConfigSchema);
export const linodeDisksResponseSchema = paginatedResponseSchema(linodeDiskSchema);
export const kernelsResponseSchema = paginatedResponseSchema(kernelSchema);

// Request schemas
export const listInstancesSchema = pagingParamsSchema;

export const getInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance')
});

export const createInstanceSchema = z.object({
  region: z.string().describe('The region where the Linode will be created'),
  type: z.string().describe('The Linode type ID (e.g., g6-nanode-1, g6-standard-2)'),
  label: z.string().optional().describe('The label for the Linode. Must be unique among your Linodes.'),
  group: z.string().optional().describe('The group for the Linode'),
  root_pass: z.string().optional().describe('The root password for the Linode. Must be 7-128 characters and meet the strength requirements. Should include uppercase, lowercase, numbers, and special characters.'),
  image: z.string().optional().describe('The image ID to deploy (e.g., linode/debian11, linode/ubuntu22.04)'),
  authorized_keys: z.array(z.string()).optional().describe('SSH public keys to deploy to the root user (recommended for better security)'),
  authorized_users: z.array(z.string()).optional().describe('Linode usernames who can deploy their SSH keys to this Linode'),
  backups_enabled: z.boolean().optional().describe('Whether backups are enabled'),
  booted: z.boolean().optional().describe('Whether the Linode should be booted after creation'),
  private_ip: z.boolean().optional().describe('Whether to assign a private IP'),
  tags: tagSchema,
  firewall_id: z.number().optional().describe('ID of the firewall to assign this Linode to')
});

export const updateInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  label: z.string().optional().describe('The label for the Linode'),
  group: z.string().optional().describe('The group for the Linode'),
  tags: tagSchema,
  watchdog_enabled: z.boolean().optional().describe('Whether the watchdog service is enabled'),
  alerts: z.object({
    cpu: z.number().optional().describe('CPU usage threshold percentage (0-400)'),
    io: z.number().optional().describe('Disk IO threshold in ops/sec'),
    network_in: z.number().optional().describe('Incoming network traffic threshold in Mbps'),
    network_out: z.number().optional().describe('Outgoing network traffic threshold in Mbps'),
    transfer_quota: z.number().optional().describe('Network transfer quota threshold in GB')
  }).optional()
});

export const rebootInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  config_id: z.number().optional().describe('The ID of the configuration profile to boot into')
});

export const bootInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  config_id: z.number().optional().describe('The ID of the configuration profile to boot into')
});

export const shutdownInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance')
});

export const deleteInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance')
});

export const resizeInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  type: z.string().describe('The new Linode type ID'),
  allow_auto_disk_resize: z.boolean().optional().describe('Whether to automatically resize disks (default: true)')
});

export const cloneInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance to clone'),
  region: z.string().optional().describe('The region where the new Linode will be created'),
  type: z.string().optional().describe('The new Linode type ID'),
  label: z.string().optional().describe('The label for the new Linode'),
  group: z.string().optional().describe('The group for the new Linode'),
  backups_enabled: z.boolean().optional().describe('Whether backups are enabled for the new Linode'),
  private_ip: z.boolean().optional().describe('Whether to assign a private IP to the new Linode'),
  tags: tagSchema
});

export const rebuildInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  image: z.string().describe('The image ID to rebuild with (e.g., linode/debian11, linode/ubuntu22.04)'),
  root_pass: z.string().describe('The root password for the rebuilt Linode. Must be 7-128 characters and meet the strength requirements. Should include uppercase, lowercase, numbers, and special characters.'),
  authorized_keys: z.array(z.string()).optional().describe('SSH public keys to deploy to the root user (recommended for better security)'),
  authorized_users: z.array(z.string()).optional().describe('Linode usernames who can deploy their SSH keys to this Linode'),
  stackscript_id: z.number().optional().describe('StackScript ID to use for deployment. Run List StackScripts to get available IDs.'),
  stackscript_data: z.record(z.string()).optional().describe('StackScript data to use for deployment. Must be valid JSON with less than 65,535 characters.'),
  booted: z.boolean().optional().describe('Whether the Linode should be booted after rebuild')
});

export const rescueInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  devices: z.record(z.number()).describe('Block device assignments for /dev/sdX devices')
});

// Config operations
export const getLinodeConfigsSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  ...pagingParamsSchema.shape
});

export const getLinodeConfigSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  configId: z.number().describe('The ID of the configuration profile')
});

export const createLinodeConfigSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  label: z.string().describe('The label for the configuration profile'),
  kernel: z.string().optional().describe('The kernel to use'),
  comments: z.string().optional().describe('User comments for this configuration'),
  memory_limit: z.number().optional().describe('The memory limit in MB'),
  root_device: z.string().optional().describe('The root device'),
  devices: z.record(z.string()).optional().describe('Devices to map to this configuration'),
  initrd: z.string().nullable().optional().describe('The initial ramdisk file'),
  helpers: z.object({
    updatedb_disabled: z.boolean().optional().describe('Whether updatedb is disabled'),
    distro: z.boolean().optional().describe('Whether the distro helper is enabled'),
    network: z.boolean().optional().describe('Whether the network helper is enabled'),
    modules_dep: z.boolean().optional().describe('Whether the modules dependency helper is enabled')
  }).optional(),
  interfaces: z.array(configInterfaceSchema).optional().describe('Network interfaces for this configuration')
});

export const updateLinodeConfigSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  configId: z.number().describe('The ID of the configuration profile'),
  ...createLinodeConfigSchema.omit({ linodeId: true }).partial().shape
});

export const deleteLinodeConfigSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  configId: z.number().describe('The ID of the configuration profile')
});

// Disk operations
export const getLinodeDisksSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  ...pagingParamsSchema.shape
});

export const getLinodeDiskSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  diskId: z.number().describe('The ID of the disk')
});

export const createLinodeDiskSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  label: z.string().describe('The label for the disk'),
  size: z.number().describe('The size of the disk in MB'),
  filesystem: z.string().optional().describe('The filesystem type for the disk (e.g., ext4, raw, swap)'),
  read_only: z.boolean().optional().describe('Whether the disk is read-only'),
  image: z.string().optional().describe('The image ID to use (e.g., linode/debian11, linode/ubuntu22.04)'),
  root_pass: z.string().optional().describe('The root password to use. Required when deploying an image. Must be 7-128 characters and meet the strength requirements. Should include uppercase, lowercase, numbers, and special characters.'),
  authorized_keys: z.array(z.string()).optional().describe('SSH public keys to deploy to the root user (recommended for better security)'),
  authorized_users: z.array(z.string()).optional().describe('Linode usernames who can deploy their SSH keys to this disk'),
  stackscript_id: z.number().optional().describe('StackScript ID to use for deployment. Run List StackScripts to get available IDs.'),
  stackscript_data: z.record(z.string()).optional().describe('StackScript data to use for deployment. Must be valid JSON with less than 65,535 characters.')
});

export const updateLinodeDiskSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  diskId: z.number().describe('The ID of the disk'),
  label: z.string().optional().describe('The new label for the disk'),
  size: z.number().optional().describe('The new size of the disk in MB')
});

export const deleteLinodeDiskSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  diskId: z.number().describe('The ID of the disk')
});

export const resizeLinodeDiskSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  diskId: z.number().describe('The ID of the disk'),
  size: z.number().describe('The new size of the disk in MB')
});

// Kernel operations
export const listKernelsSchema = pagingParamsSchema;

export const getKernelSchema = z.object({
  id: z.string().describe('The ID of the kernel')
});

// Backup operations
export const backupSchema = z.object({
  id: z.number().describe('The ID of the backup'),
  label: z.string().describe('The label of the backup'),
  status: z.string().describe('The status of the backup'),
  type: z.enum(['auto', 'snapshot']).describe('The type of backup'),
  region: z.string().describe('The region where the backup is stored'),
  created: z.string().describe('When the backup was created'),
  updated: z.string().describe('When the backup was last updated'),
  finished: z.string().describe('When the backup finished'),
  configs: z.array(z.string()).describe('The configs included in the backup'),
  disks: z.record(z.string()).describe('The disks included in the backup'),
  available: z.boolean().describe('Whether the backup is available for restore')
});

export const getBackupsSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance')
});

export const getBackupSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  backupId: z.number().describe('The ID of the backup')
});

export const createSnapshotSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  label: z.string().describe('The label for the snapshot')
});

export const cancelBackupsSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance')
});

export const enableBackupsSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance')
});

export const restoreBackupSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  backupId: z.number().describe('The ID of the backup'),
  linode_id: z.number().optional().describe('Target Linode ID to restore to (defaults to the source Linode)'),
  overwrite: z.boolean().optional().describe('Whether to overwrite the target Linode')
});

// IP operations
export const getLinodeIPsSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance')
});

export const linodeAllocateIPSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  type: z.enum(['ipv4', 'ipv6']).describe('The type of IP address to allocate'),
  public: z.boolean().describe('Whether the IP address should be public')
});

export const getLinodeIPSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  address: z.string().describe('The IP address')
});

export const updateLinodeIPSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  address: z.string().describe('The IP address'),
  rdns: z.string().nullable().describe('The reverse DNS entry')
});

export const deleteLinodeIPSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  address: z.string().describe('The IP address')
});

// Firewall operations
export const getLinodeFirewallsSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  ...pagingParamsSchema.shape
});

export const applyFirewallsSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance')
});

// Disk special operations
export const cloneDiskSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  diskId: z.number().describe('The ID of the disk'),
  label: z.string().optional().describe('The label for the cloned disk')
});

export const resetDiskPasswordSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  diskId: z.number().describe('The ID of the disk'),
  password: z.string().describe('The new root password')
});

// Migration and upgrades
export const migrateLinodeSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  region: z.string().optional().describe('The target region for the migration')
});

export const mutateLinodeSchema = z.object({
  id: z.number().describe('The ID of the Linode instance')
});

// Reset root password
export const resetRootPasswordSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  root_pass: z.string().describe('The new root password')
});

// Transfer stats
export const getNetworkTransferSchema = z.object({
  id: z.number().describe('The ID of the Linode instance')
});

export const getMonthlyTransferSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  year: z.string().describe('The year (YYYY format)'),
  month: z.string().describe('The month (MM format)')
});

// Stats operations
export const getLinodeStatsSchema = z.object({
  id: z.number().describe('The ID of the Linode instance')
});

export const getLinodeStatsByDateSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  year: z.string().describe('The year (YYYY format)'),
  month: z.string().describe('The month (MM format)')
});

// Config Interface operations

export const getConfigInterfacesSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  configId: z.number().describe('The ID of the configuration profile'),
  ...pagingParamsSchema.shape
});

export const getConfigInterfaceSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  configId: z.number().describe('The ID of the configuration profile'),
  interfaceId: z.number().describe('The ID of the interface')
});

export const createConfigInterfaceSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  configId: z.number().describe('The ID of the configuration profile'),
  purpose: z.enum(['public', 'vlan', 'vpc']).describe('The purpose of the interface (public, vlan, vpc)'),
  label: z.string().optional().describe('The label for the interface'),
  ipam_address: z.string().optional().describe('The IPAM address for the interface'),
  primary: z.boolean().optional().describe('Whether this is the primary interface'),
  subnet_id: z.number().optional().describe('The subnet ID for VPC interfaces'),
  vpc_id: z.number().optional().describe('The VPC ID for VPC interfaces'),
  ipv4: z.object({
    vpc: z.string().optional().describe('The IPv4 address for VPC interfaces'),
    nat_1_1: z.string().optional().describe('The IPv4 1:1 NAT address')
  }).optional()
});

export const updateConfigInterfaceSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  configId: z.number().describe('The ID of the configuration profile'),
  interfaceId: z.number().describe('The ID of the interface'),
  label: z.string().optional().describe('The label for the interface'),
  ipam_address: z.string().optional().describe('The IPAM address for the interface'),
  primary: z.boolean().optional().describe('Whether this is the primary interface'),
  ipv4: z.object({
    vpc: z.string().optional().describe('The IPv4 address for VPC interfaces'),
    nat_1_1: z.string().optional().describe('The IPv4 1:1 NAT address')
  }).optional()
});

export const deleteConfigInterfaceSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  configId: z.number().describe('The ID of the configuration profile'),
  interfaceId: z.number().describe('The ID of the interface')
});

export const reorderConfigInterfacesSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  configId: z.number().describe('The ID of the configuration profile'),
  ids: z.array(z.number()).describe('The ordered list of interface IDs')
});

// Instance Types
export const listInstanceTypesSchema = pagingParamsSchema;

export const getInstanceTypeSchema = z.object({
  id: z.string().describe('The ID of the Linode type')
});

// NodeBalancer operations for instance
export const getLinodeNodeBalancersSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  ...pagingParamsSchema.shape
});

// Volume operations for instance
export const getLinodeVolumesSchema = z.object({
  linodeId: z.number().describe('The ID of the Linode instance'),
  ...pagingParamsSchema.shape
});