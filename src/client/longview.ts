import axios, { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationParams } from './instances';

export interface LongviewClient {
  id: number;
  label: string;
  api_key: string;
  install_code: string;
  apps: {
    apache: boolean;
    nginx: boolean;
    mysql: boolean;
  };
  created: string;
  updated: string;
}

export interface LongviewSubscription {
  id: string;
  label: string;
  clients_included: number;
  price: {
    hourly: number;
    monthly: number;
  };
}

export interface LongviewData {
  timestamp: number;
  uptime: number;
  packages: {
    updates: number;
  };
  load: [number, number, number];
  cpu: {
    user: number;
    nice: number;
    system: number;
    wait: number;
    idle: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    buffers: number;
    cached: number;
    swap_total: number;
    swap_used: number;
    swap_free: number;
  };
  network: {
    [networkInterface: string]: {
      rx_bytes: number;
      tx_bytes: number;
      rx_packets: number;
      tx_packets: number;
    };
  };
  disk: {
    [device: string]: {
      fs: string;
      mount_point: string;
      total: number;
      used: number;
      free: number;
    };
  };
  processes: {
    [process: string]: {
      user: string;
      count: number;
      cpu: number;
      mem: number;
    };
  };
}

export interface CreateLongviewClientRequest {
  label?: string;
}

export interface UpdateLongviewClientRequest {
  label: string;
}

export interface LongviewClientInterface {
  getLongviewClients(params?: PaginationParams): Promise<PaginatedResponse<LongviewClient>>;
  getLongviewClient(id: number): Promise<LongviewClient>;
  createLongviewClient(data?: CreateLongviewClientRequest): Promise<LongviewClient>;
  updateLongviewClient(id: number, data: UpdateLongviewClientRequest): Promise<LongviewClient>;
  deleteLongviewClient(id: number): Promise<void>;
  getLongviewSubscriptions(params?: PaginationParams): Promise<PaginatedResponse<LongviewSubscription>>;
  getLongviewSubscription(id: string): Promise<LongviewSubscription>;
  getLongviewData(id: number): Promise<LongviewData>;
}

export function createLongviewClient(axiosInstance: AxiosInstance): LongviewClientInterface {
  return {
    // Longview Client operations
    getLongviewClients: async (params) => {
      const response = await axiosInstance.get('/longview/clients', { params });
      return response.data;
    },

    getLongviewClient: async (id) => {
      const response = await axiosInstance.get(`/longview/clients/${id}`);
      return response.data;
    },

    createLongviewClient: async (data) => {
      const response = await axiosInstance.post('/longview/clients', data || {});
      return response.data;
    },

    updateLongviewClient: async (id, data) => {
      const response = await axiosInstance.put(`/longview/clients/${id}`, data);
      return response.data;
    },

    deleteLongviewClient: async (id) => {
      await axiosInstance.delete(`/longview/clients/${id}`);
    },

    // Longview Subscription operations
    getLongviewSubscriptions: async (params) => {
      const response = await axiosInstance.get('/longview/subscriptions', { params });
      return response.data;
    },

    getLongviewSubscription: async (id) => {
      const response = await axiosInstance.get(`/longview/subscriptions/${id}`);
      return response.data;
    },

    // Longview Data operations
    getLongviewData: async (id) => {
      const response = await axiosInstance.get(`/longview/clients/${id}/data`);
      return response.data;
    }
  };
}