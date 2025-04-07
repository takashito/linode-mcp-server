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
  interfaces: any[]; // Define interface type if needed
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
  
  // Config operations
  getLinodeConfigs: (linodeId: number, params?: PaginationParams) => Promise<PaginatedResponse<LinodeConfig>>;
  getLinodeConfig: (linodeId: number, configId: number) => Promise<LinodeConfig>;
  createLinodeConfig: (linodeId: number, data: CreateLinodeConfigRequest) => Promise<LinodeConfig>;
  updateLinodeConfig: (linodeId: number, configId: number, data: Partial<CreateLinodeConfigRequest>) => Promise<LinodeConfig>;
  deleteLinodeConfig: (linodeId: number, configId: number) => Promise<{}>;
  
  // Disk operations
  getLinodeDisks: (linodeId: number, params?: PaginationParams) => Promise<PaginatedResponse<LinodeDisk>>;
  getLinodeDisk: (linodeId: number, diskId: number) => Promise<LinodeDisk>;
  createLinodeDisk: (linodeId: number, data: CreateLinodeDiskRequest) => Promise<LinodeDisk>;
  updateLinodeDisk: (linodeId: number, diskId: number, data: Partial<CreateLinodeDiskRequest>) => Promise<LinodeDisk>;
  deleteLinodeDisk: (linodeId: number, diskId: number) => Promise<{}>;
  resizeLinodeDisk: (linodeId: number, diskId: number, size: number) => Promise<{}>;
  
  // Kernel operations
  getKernels: (params?: PaginationParams) => Promise<PaginatedResponse<Kernel>>;
  getKernelById: (id: string) => Promise<Kernel>;
  
  // Stat operations
  getLinodeStats: (id: number) => Promise<any>; // Define stats type if needed
  getLinodeStatsByDate: (id: number, year: string, month: string) => Promise<any>; // Define stats type if needed
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
    
    // Kernel operations
    getKernels: async (params?: PaginationParams) => {
      const response = await axios.get('/linode/kernels', { params });
      return response.data;
    },
    getKernelById: async (id: string) => {
      const response = await axios.get(`/linode/kernels/${id}`);
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
    }
  };
}