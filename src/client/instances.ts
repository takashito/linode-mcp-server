import { AxiosInstance } from 'axios';

// Common parameter and response types
export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export interface LinodeInstance {
  id: number;
  label: string;
  region: string;
  type: string;
  status: string;
  ipv4: string[];
  ipv6: string;
  created: string;
  updated: string;
  hypervisor: string;
  specs: {
    disk: number;
    memory: number;
    vcpus: number;
    transfer: number;
  };
  alerts: {
    cpu: number;
    io: number;
    network_in: number;
    network_out: number;
    transfer_quota: number;
  };
  backups: {
    enabled: boolean;
    schedule: {
      day: string;
      window: string;
    };
    last_successful: string | null;
  };
  image: string | null;
  group: string;
  tags: string[];
  host_uuid: string;
  watchdog_enabled: boolean;
}

export interface LinodeType {
  id: string;
  label: string;
  class: string;
  disk: number;
  memory: number;
  vcpus: number;
  network_out: number;
  transfer: number;
  gpus: number;
  price: {
    hourly: number;
    monthly: number;
  };
  addons: {
    backups: {
      price: {
        hourly: number;
        monthly: number;
      };
    };
  };
  successor: string | null;
}

export interface Backup {
  id: number;
  label: string;
  status: string;
  type: 'auto' | 'snapshot';
  region: string;
  created: string;
  updated: string;
  finished: string;
  configs: string[];
  disks: Record<string, any>;
  available: boolean;
}

export interface NetworkTransfer {
  used: number;
  quota: number;
  billable: number;
}

export interface MonthlyTransfer {
  used: number;
  quota: number;
  billable: number;
}

export interface CreateLinodeRequest {
  region: string;
  type: string;
  label?: string;
  group?: string;
  root_pass?: string;
  image?: string;
  authorized_keys?: string[];
  authorized_users?: string[];
  backups_enabled?: boolean;
  booted?: boolean;
  private_ip?: boolean;
  tags?: string[];
  firewall_id?: number;
}

export interface UpdateLinodeRequest {
  label?: string;
  group?: string;
  tags?: string[];
  watchdog_enabled?: boolean;
  alerts?: {
    cpu?: number;
    io?: number;
    network_in?: number;
    network_out?: number;
    transfer_quota?: number;
  };
}

export interface ResizeLinodeRequest {
  type: string;
  allow_auto_disk_resize?: boolean;
}

export interface CloneLinodeRequest {
  region?: string;
  type?: string;
  label?: string;
  group?: string;
  backups_enabled?: boolean;
  private_ip?: boolean;
  tags?: string[];
}

export interface RebuildLinodeRequest {
  image: string;
  root_pass: string;
  authorized_keys?: string[];
  authorized_users?: string[];
  stackscript_id?: number;
  stackscript_data?: Record<string, any>;
  booted?: boolean;
}

export interface ConfigInterface {
  id: number;
  label: string;
  purpose: 'public' | 'vlan' | 'vpc';
  ipam_address: string | null;
  primary?: boolean;
  active?: boolean;
  subnet_id?: number;
  vpc_id?: number;
  ipv4?: {
    vpc?: string;
    nat_1_1?: string;
  };
}

export interface CreateConfigInterfaceRequest {
  purpose: 'public' | 'vlan' | 'vpc';
  label?: string;
  ipam_address?: string;
  primary?: boolean;
  subnet_id?: number;
  vpc_id?: number;
  ipv4?: {
    vpc?: string;
    nat_1_1?: string;
  };
}

export interface UpdateConfigInterfaceRequest {
  label?: string;
  ipam_address?: string;
  primary?: boolean;
  ipv4?: {
    vpc?: string;
    nat_1_1?: string;
  };
}

export interface ConfigInterfaceOrderRequest {
  ids: number[];
}

export interface LinodeConfig {
  id: number;
  label: string;
  comments: string;
  kernel: string;
  memory_limit: number;
  root_device: string;
  devices: Record<string, any>;
  initrd: string | null;
  created: string;
  updated: string;
  helpers: {
    updatedb_disabled: boolean;
    distro: boolean;
    network: boolean;
    modules_dep: boolean;
  };
  interfaces: ConfigInterface[];
}

export interface CreateLinodeConfigRequest {
  label: string;
  kernel?: string;
  comments?: string;
  memory_limit?: number;
  root_device?: string;
  devices?: Record<string, any>;
  initrd?: string | null;
  helpers?: {
    updatedb_disabled?: boolean;
    distro?: boolean;
    network?: boolean;
    modules_dep?: boolean;
  };
  interfaces?: any[]; // Define interface type if needed
}

export interface LinodeDisk {
  id: number;
  label: string;
  status: string;
  size: number;
  filesystem: string;
  created: string;
  updated: string;
}

export interface CreateLinodeDiskRequest {
  label: string;
  size: number;
  filesystem?: string;
  read_only?: boolean;
  image?: string;
  root_pass?: string;
  authorized_keys?: string[];
  authorized_users?: string[];
  stackscript_id?: number;
  stackscript_data?: Record<string, any>;
}

export interface CreateSnapshotRequest {
  label: string;
}

export interface RestoreBackupRequest {
  linode_id?: number;
  overwrite?: boolean;
}

export interface LinodeIPAllocationRequest {
  type: 'ipv4' | 'ipv6';
  public: boolean;
}

export interface LinodeIPUpdateRequest {
  rdns: string | null;
}

export interface ResetRootPasswordRequest {
  root_pass: string;
}

export interface MigrateLinodeRequest {
  region?: string;
}

export interface CloneDiskRequest {
  label?: string;
}

export interface Kernel {
  id: string;
  label: string;
  version: string;
  kvm: boolean;
  architecture: string;
  pvops: boolean;
  deprecated: boolean;
  built: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pages: number;
  results: number;
}

// Import necessary types
import { Volume } from './volumes';
import { NodeBalancer } from './nodebalancers';

export interface LinodeInstancesClient {
  // Instance operations
  getLinodes: (params?: PaginationParams) => Promise<PaginatedResponse<LinodeInstance>>;
  getLinodeById: (id: number) => Promise<LinodeInstance>;
  createLinode: (data: CreateLinodeRequest) => Promise<LinodeInstance>;
  updateLinode: (id: number, data: UpdateLinodeRequest) => Promise<LinodeInstance>;
  deleteLinode: (id: number) => Promise<{}>;
  bootLinode: (id: number, configId?: number) => Promise<{}>;
  rebootLinode: (id: number, configId?: number) => Promise<{}>;
  shutdownLinode: (id: number) => Promise<{}>;
  resizeLinode: (id: number, data: ResizeLinodeRequest) => Promise<{}>;
  cloneLinode: (id: number, data: CloneLinodeRequest) => Promise<LinodeInstance>;
  rebuildLinode: (id: number, data: RebuildLinodeRequest) => Promise<LinodeInstance>;
  rescueLinode: (id: number, devices: Record<string, number>) => Promise<{}>;
  migrateLinode: (id: number, data?: MigrateLinodeRequest) => Promise<{}>;
  mutateLinode: (id: number) => Promise<{}>;
  resetRootPassword: (id: number, data: ResetRootPasswordRequest) => Promise<{}>;
  
  // Config operations
  getLinodeConfigs: (linodeId: number, params?: PaginationParams) => Promise<PaginatedResponse<LinodeConfig>>;
  getLinodeConfig: (linodeId: number, configId: number) => Promise<LinodeConfig>;
  createLinodeConfig: (linodeId: number, data: CreateLinodeConfigRequest) => Promise<LinodeConfig>;
  updateLinodeConfig: (linodeId: number, configId: number, data: Partial<CreateLinodeConfigRequest>) => Promise<LinodeConfig>;
  deleteLinodeConfig: (linodeId: number, configId: number) => Promise<{}>;
  
  // Config Interface operations
  getConfigInterfaces: (linodeId: number, configId: number) => Promise<PaginatedResponse<ConfigInterface>>;
  getConfigInterface: (linodeId: number, configId: number, interfaceId: number) => Promise<ConfigInterface>;
  createConfigInterface: (linodeId: number, configId: number, data: CreateConfigInterfaceRequest) => Promise<ConfigInterface>;
  updateConfigInterface: (linodeId: number, configId: number, interfaceId: number, data: UpdateConfigInterfaceRequest) => Promise<ConfigInterface>;
  deleteConfigInterface: (linodeId: number, configId: number, interfaceId: number) => Promise<{}>;
  reorderConfigInterfaces: (linodeId: number, configId: number, data: ConfigInterfaceOrderRequest) => Promise<{}>;
  
  // Disk operations
  getLinodeDisks: (linodeId: number, params?: PaginationParams) => Promise<PaginatedResponse<LinodeDisk>>;
  getLinodeDisk: (linodeId: number, diskId: number) => Promise<LinodeDisk>;
  createLinodeDisk: (linodeId: number, data: CreateLinodeDiskRequest) => Promise<LinodeDisk>;
  updateLinodeDisk: (linodeId: number, diskId: number, data: Partial<CreateLinodeDiskRequest>) => Promise<LinodeDisk>;
  deleteLinodeDisk: (linodeId: number, diskId: number) => Promise<{}>;
  resizeLinodeDisk: (linodeId: number, diskId: number, size: number) => Promise<{}>;
  cloneDisk: (linodeId: number, diskId: number, data?: CloneDiskRequest) => Promise<LinodeDisk>;
  resetDiskPassword: (linodeId: number, diskId: number, password: string) => Promise<{}>;
  
  // Backup operations
  getBackups: (linodeId: number) => Promise<{ automatic: Backup[]; snapshot: { current: Backup | null; in_progress: Backup | null } }>;
  getBackup: (linodeId: number, backupId: number) => Promise<Backup>;
  createSnapshot: (linodeId: number, data: CreateSnapshotRequest) => Promise<Backup>;
  cancelBackups: (linodeId: number) => Promise<{}>;
  enableBackups: (linodeId: number) => Promise<{}>;
  restoreBackup: (linodeId: number, backupId: number, data?: RestoreBackupRequest) => Promise<{}>;
  
  // IP operations
  getLinodeIPs: (linodeId: number) => Promise<any>; // Define IP response type if needed
  allocateIP: (linodeId: number, data: LinodeIPAllocationRequest) => Promise<any>; // Define IP allocation response type if needed
  getLinodeIP: (linodeId: number, address: string) => Promise<any>; // Define IP response type if needed
  updateLinodeIP: (linodeId: number, address: string, data: LinodeIPUpdateRequest) => Promise<any>; // Define IP response type if needed
  deleteLinodeIP: (linodeId: number, address: string) => Promise<{}>;
  
  // Firewall operations
  getLinodeFirewalls: (linodeId: number, params?: PaginationParams) => Promise<PaginatedResponse<any>>; // Define Firewall type if needed
  applyFirewalls: (linodeId: number) => Promise<{}>;
  
  // Transfer and stats operations
  getLinodeStats: (id: number) => Promise<any>; // Define stats type if needed
  getLinodeStatsByDate: (id: number, year: string, month: string) => Promise<any>; // Define stats type if needed
  getNetworkTransfer: (id: number) => Promise<NetworkTransfer>;
  getMonthlyTransfer: (id: number, year: string, month: string) => Promise<MonthlyTransfer>;
  
  // Kernel operations
  getKernels: (params?: PaginationParams) => Promise<PaginatedResponse<Kernel>>;
  getKernelById: (id: string) => Promise<Kernel>;
  
  // Instance Type operations
  getTypes: (params?: PaginationParams) => Promise<PaginatedResponse<LinodeType>>;
  getType: (id: string) => Promise<LinodeType>;
  
  // NodeBalancer operations
  getLinodeNodeBalancers: (linodeId: number, params?: PaginationParams) => Promise<PaginatedResponse<NodeBalancer>>;
  
  // Volume operations
  getLinodeVolumes: (linodeId: number, params?: PaginationParams) => Promise<PaginatedResponse<Volume>>;
}

export function createInstancesClient(axios: AxiosInstance): LinodeInstancesClient {
  return {
    // Instance operations
    getLinodes: async (params?: PaginationParams) => {
      const response = await axios.get('/linode/instances', { params });
      return response.data;
    },
    getLinodeById: async (id: number) => {
      const response = await axios.get(`/linode/instances/${id}`);
      return response.data;
    },
    createLinode: async (data: CreateLinodeRequest) => {
      const response = await axios.post('/linode/instances', data);
      return response.data;
    },
    updateLinode: async (id: number, data: UpdateLinodeRequest) => {
      const response = await axios.put(`/linode/instances/${id}`, data);
      return response.data;
    },
    deleteLinode: async (id: number) => {
      const response = await axios.delete(`/linode/instances/${id}`);
      return response.data;
    },
    bootLinode: async (id: number, configId?: number) => {
      const data = configId ? { config_id: configId } : {};
      const response = await axios.post(`/linode/instances/${id}/boot`, data);
      return response.data;
    },
    rebootLinode: async (id: number, configId?: number) => {
      const data = configId ? { config_id: configId } : {};
      const response = await axios.post(`/linode/instances/${id}/reboot`, data);
      return response.data;
    },
    shutdownLinode: async (id: number) => {
      const response = await axios.post(`/linode/instances/${id}/shutdown`);
      return response.data;
    },
    resizeLinode: async (id: number, data: ResizeLinodeRequest) => {
      const response = await axios.post(`/linode/instances/${id}/resize`, data);
      return response.data;
    },
    cloneLinode: async (id: number, data: CloneLinodeRequest) => {
      const response = await axios.post(`/linode/instances/${id}/clone`, data);
      return response.data;
    },
    rebuildLinode: async (id: number, data: RebuildLinodeRequest) => {
      const response = await axios.post(`/linode/instances/${id}/rebuild`, data);
      return response.data;
    },
    rescueLinode: async (id: number, devices: Record<string, number>) => {
      const response = await axios.post(`/linode/instances/${id}/rescue`, { devices });
      return response.data;
    },
    migrateLinode: async (id: number, data?: MigrateLinodeRequest) => {
      const response = await axios.post(`/linode/instances/${id}/migrate`, data || {});
      return response.data;
    },
    mutateLinode: async (id: number) => {
      const response = await axios.post(`/linode/instances/${id}/mutate`);
      return response.data;
    },
    resetRootPassword: async (id: number, data: ResetRootPasswordRequest) => {
      const response = await axios.post(`/linode/instances/${id}/password`, data);
      return response.data;
    },
    
    // Config operations
    getLinodeConfigs: async (linodeId: number, params?: PaginationParams) => {
      const response = await axios.get(`/linode/instances/${linodeId}/configs`, { params });
      return response.data;
    },
    getLinodeConfig: async (linodeId: number, configId: number) => {
      const response = await axios.get(`/linode/instances/${linodeId}/configs/${configId}`);
      return response.data;
    },
    createLinodeConfig: async (linodeId: number, data: CreateLinodeConfigRequest) => {
      const response = await axios.post(`/linode/instances/${linodeId}/configs`, data);
      return response.data;
    },
    updateLinodeConfig: async (linodeId: number, configId: number, data: Partial<CreateLinodeConfigRequest>) => {
      const response = await axios.put(`/linode/instances/${linodeId}/configs/${configId}`, data);
      return response.data;
    },
    deleteLinodeConfig: async (linodeId: number, configId: number) => {
      const response = await axios.delete(`/linode/instances/${linodeId}/configs/${configId}`);
      return response.data;
    },
    
    // Disk operations
    getLinodeDisks: async (linodeId: number, params?: PaginationParams) => {
      const response = await axios.get(`/linode/instances/${linodeId}/disks`, { params });
      return response.data;
    },
    getLinodeDisk: async (linodeId: number, diskId: number) => {
      const response = await axios.get(`/linode/instances/${linodeId}/disks/${diskId}`);
      return response.data;
    },
    createLinodeDisk: async (linodeId: number, data: CreateLinodeDiskRequest) => {
      const response = await axios.post(`/linode/instances/${linodeId}/disks`, data);
      return response.data;
    },
    updateLinodeDisk: async (linodeId: number, diskId: number, data: Partial<CreateLinodeDiskRequest>) => {
      const response = await axios.put(`/linode/instances/${linodeId}/disks/${diskId}`, data);
      return response.data;
    },
    deleteLinodeDisk: async (linodeId: number, diskId: number) => {
      const response = await axios.delete(`/linode/instances/${linodeId}/disks/${diskId}`);
      return response.data;
    },
    resizeLinodeDisk: async (linodeId: number, diskId: number, size: number) => {
      const response = await axios.post(`/linode/instances/${linodeId}/disks/${diskId}/resize`, { size });
      return response.data;
    },
    cloneDisk: async (linodeId: number, diskId: number, data?: CloneDiskRequest) => {
      const response = await axios.post(`/linode/instances/${linodeId}/disks/${diskId}/clone`, data || {});
      return response.data;
    },
    resetDiskPassword: async (linodeId: number, diskId: number, password: string) => {
      const response = await axios.post(`/linode/instances/${linodeId}/disks/${diskId}/password`, { password });
      return response.data;
    },
    
    // Kernel operations
    getKernels: async (params?: PaginationParams) => {
      const response = await axios.get('/linode/kernels', { params });
      return response.data;
    },
    getKernelById: async (id: string) => {
      const response = await axios.get(`/linode/kernels/${id}`);
      return response.data;
    },
    
    // Instance Type operations
    getTypes: async (params?: PaginationParams) => {
      const response = await axios.get('/linode/types', { params });
      return response.data;
    },
    getType: async (id: string) => {
      const response = await axios.get(`/linode/types/${id}`);
      return response.data;
    },
    
    // Backup operations
    getBackups: async (linodeId: number) => {
      const response = await axios.get(`/linode/instances/${linodeId}/backups`);
      return response.data;
    },
    getBackup: async (linodeId: number, backupId: number) => {
      const response = await axios.get(`/linode/instances/${linodeId}/backups/${backupId}`);
      return response.data;
    },
    createSnapshot: async (linodeId: number, data: CreateSnapshotRequest) => {
      const response = await axios.post(`/linode/instances/${linodeId}/backups`, data);
      return response.data;
    },
    cancelBackups: async (linodeId: number) => {
      const response = await axios.post(`/linode/instances/${linodeId}/backups/cancel`);
      return response.data;
    },
    enableBackups: async (linodeId: number) => {
      const response = await axios.post(`/linode/instances/${linodeId}/backups/enable`);
      return response.data;
    },
    restoreBackup: async (linodeId: number, backupId: number, data?: RestoreBackupRequest) => {
      const response = await axios.post(`/linode/instances/${linodeId}/backups/${backupId}/restore`, data || {});
      return response.data;
    },
    
    // IP operations
    getLinodeIPs: async (linodeId: number) => {
      const response = await axios.get(`/linode/instances/${linodeId}/ips`);
      return response.data;
    },
    allocateIP: async (linodeId: number, data: LinodeIPAllocationRequest) => {
      const response = await axios.post(`/linode/instances/${linodeId}/ips`, data);
      return response.data;
    },
    getLinodeIP: async (linodeId: number, address: string) => {
      const response = await axios.get(`/linode/instances/${linodeId}/ips/${address}`);
      return response.data;
    },
    updateLinodeIP: async (linodeId: number, address: string, data: LinodeIPUpdateRequest) => {
      const response = await axios.put(`/linode/instances/${linodeId}/ips/${address}`, data);
      return response.data;
    },
    deleteLinodeIP: async (linodeId: number, address: string) => {
      const response = await axios.delete(`/linode/instances/${linodeId}/ips/${address}`);
      return response.data;
    },
    
    // Firewall operations
    getLinodeFirewalls: async (linodeId: number, params?: PaginationParams) => {
      const response = await axios.get(`/linode/instances/${linodeId}/firewalls`, { params });
      return response.data;
    },
    applyFirewalls: async (linodeId: number) => {
      const response = await axios.post(`/linode/instances/${linodeId}/firewalls/apply`);
      return response.data;
    },
    
    // Stat operations
    getLinodeStats: async (id: number) => {
      const response = await axios.get(`/linode/instances/${id}/stats`);
      return response.data;
    },
    getLinodeStatsByDate: async (id: number, year: string, month: string) => {
      const response = await axios.get(`/linode/instances/${id}/stats/${year}/${month}`);
      return response.data;
    },
    getNetworkTransfer: async (id: number) => {
      const response = await axios.get(`/linode/instances/${id}/transfer`);
      return response.data;
    },
    getMonthlyTransfer: async (id: number, year: string, month: string) => {
      const response = await axios.get(`/linode/instances/${id}/transfer/${year}/${month}`);
      return response.data;
    },
    
    // Config Interface operations
    getConfigInterfaces: async (linodeId: number, configId: number) => {
      const response = await axios.get(`/linode/instances/${linodeId}/configs/${configId}/interfaces`);
      return response.data;
    },
    getConfigInterface: async (linodeId: number, configId: number, interfaceId: number) => {
      const response = await axios.get(`/linode/instances/${linodeId}/configs/${configId}/interfaces/${interfaceId}`);
      return response.data;
    },
    createConfigInterface: async (linodeId: number, configId: number, data: CreateConfigInterfaceRequest) => {
      const response = await axios.post(`/linode/instances/${linodeId}/configs/${configId}/interfaces`, data);
      return response.data;
    },
    updateConfigInterface: async (linodeId: number, configId: number, interfaceId: number, data: UpdateConfigInterfaceRequest) => {
      const response = await axios.put(`/linode/instances/${linodeId}/configs/${configId}/interfaces/${interfaceId}`, data);
      return response.data;
    },
    deleteConfigInterface: async (linodeId: number, configId: number, interfaceId: number) => {
      const response = await axios.delete(`/linode/instances/${linodeId}/configs/${configId}/interfaces/${interfaceId}`);
      return response.data;
    },
    reorderConfigInterfaces: async (linodeId: number, configId: number, data: ConfigInterfaceOrderRequest) => {
      const response = await axios.post(`/linode/instances/${linodeId}/configs/${configId}/interfaces/order`, data);
      return response.data;
    },
    
    // NodeBalancer operations
    getLinodeNodeBalancers: async (linodeId: number, params?: PaginationParams) => {
      const response = await axios.get(`/linode/instances/${linodeId}/nodebalancers`, { params });
      return response.data;
    },
    
    // Volume operations
    getLinodeVolumes: async (linodeId: number, params?: PaginationParams) => {
      const response = await axios.get(`/linode/instances/${linodeId}/volumes`, { params });
      return response.data;
    }
  };
}