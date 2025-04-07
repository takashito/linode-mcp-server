import { AxiosInstance } from 'axios';
import { PaginationParams, PaginatedResponse } from './instances';

export interface NodeBalancer {
  id: number;
  label: string;
  hostname: string;
  client_conn_throttle: number;
  region: string;
  ipv4: string;
  ipv6: string | null;
  created: string;
  updated: string;
  transfer: {
    total: number;
    out: number;
    in: number;
  };
  tags: string[];
}

export interface NodeBalancerConfig {
  id: number;
  port: number;
  protocol: string;
  algorithm: string;
  stickiness: string;
  check: string;
  check_interval: number;
  check_timeout: number;
  check_attempts: number;
  check_path: string;
  check_body: string;
  check_passive: boolean;
  cipher_suite: string;
  ssl_cert: string | null;
  ssl_key: string | null;
  nodes_status: {
    up: number;
    down: number;
  };
}

export interface NodeBalancerNode {
  id: number;
  address: string;
  label: string;
  status: string;
  weight: number;
  mode: string;
  config_id: number;
  nodebalancer_id: number;
}

export interface NodeBalancerType {
  id: string;
  label: string;
  price: {
    hourly: number;
    monthly: number;
  };
  transfer: number;
  client_conn_throttle: number;
}

export interface CreateNodeBalancerRequest {
  region: string;
  label?: string;
  client_conn_throttle?: number;
  configs?: CreateNodeBalancerConfigRequest[];
  tags?: string[];
}

export interface UpdateNodeBalancerRequest {
  label?: string;
  client_conn_throttle?: number;
  tags?: string[];
}

export interface CreateNodeBalancerConfigRequest {
  port: number;
  protocol: string;
  algorithm?: string;
  stickiness?: string;
  check?: string;
  check_interval?: number;
  check_timeout?: number;
  check_attempts?: number;
  check_path?: string;
  check_body?: string;
  check_passive?: boolean;
  cipher_suite?: string;
  ssl_cert?: string;
  ssl_key?: string;
  nodes?: CreateNodeBalancerNodeRequest[];
}

export interface UpdateNodeBalancerConfigRequest {
  port?: number;
  protocol?: string;
  algorithm?: string;
  stickiness?: string;
  check?: string;
  check_interval?: number;
  check_timeout?: number;
  check_attempts?: number;
  check_path?: string;
  check_body?: string;
  check_passive?: boolean;
  cipher_suite?: string;
  ssl_cert?: string;
  ssl_key?: string;
}

export interface CreateNodeBalancerNodeRequest {
  address: string;
  label: string;
  weight?: number;
  mode?: string;
}

export interface UpdateNodeBalancerNodeRequest {
  address?: string;
  label?: string;
  weight?: number;
  mode?: string;
}

export interface LinodeNodeBalancersClient {
  // NodeBalancer operations
  getNodeBalancers: (params?: PaginationParams) => Promise<PaginatedResponse<NodeBalancer>>;
  getNodeBalancer: (id: number) => Promise<NodeBalancer>;
  createNodeBalancer: (data: CreateNodeBalancerRequest) => Promise<NodeBalancer>;
  updateNodeBalancer: (id: number, data: UpdateNodeBalancerRequest) => Promise<NodeBalancer>;
  deleteNodeBalancer: (id: number) => Promise<{}>;
  
  // NodeBalancer Config operations
  getNodeBalancerConfigs: (nodeBalancerId: number) => Promise<PaginatedResponse<NodeBalancerConfig>>;
  getNodeBalancerConfig: (nodeBalancerId: number, configId: number) => Promise<NodeBalancerConfig>;
  createNodeBalancerConfig: (nodeBalancerId: number, data: CreateNodeBalancerConfigRequest) => Promise<NodeBalancerConfig>;
  updateNodeBalancerConfig: (nodeBalancerId: number, configId: number, data: UpdateNodeBalancerConfigRequest) => Promise<NodeBalancerConfig>;
  deleteNodeBalancerConfig: (nodeBalancerId: number, configId: number) => Promise<{}>;
  rebuildNodeBalancerConfig: (nodeBalancerId: number, configId: number) => Promise<{}>;
  
  // NodeBalancer Node operations
  getNodeBalancerConfigNodes: (nodeBalancerId: number, configId: number) => Promise<PaginatedResponse<NodeBalancerNode>>;
  getNodeBalancerConfigNode: (nodeBalancerId: number, configId: number, nodeId: number) => Promise<NodeBalancerNode>;
  createNodeBalancerConfigNode: (nodeBalancerId: number, configId: number, data: CreateNodeBalancerNodeRequest) => Promise<NodeBalancerNode>;
  updateNodeBalancerConfigNode: (nodeBalancerId: number, configId: number, nodeId: number, data: UpdateNodeBalancerNodeRequest) => Promise<NodeBalancerNode>;
  deleteNodeBalancerConfigNode: (nodeBalancerId: number, configId: number, nodeId: number) => Promise<{}>;
  
  // NodeBalancer Stats operations
  getNodeBalancerStats: (id: number) => Promise<any>; // Define stats type if needed
  
  // NodeBalancer Types operations
  getNodeBalancerTypes: () => Promise<PaginatedResponse<NodeBalancerType>>;
}

export function createNodeBalancersClient(axios: AxiosInstance): LinodeNodeBalancersClient {
  return {
    // NodeBalancer operations
    getNodeBalancers: async (params?: PaginationParams) => {
      const response = await axios.get('/nodebalancers', { params });
      return response.data;
    },
    getNodeBalancer: async (id: number) => {
      const response = await axios.get(`/nodebalancers/${id}`);
      return response.data;
    },
    createNodeBalancer: async (data: CreateNodeBalancerRequest) => {
      const response = await axios.post('/nodebalancers', data);
      return response.data;
    },
    updateNodeBalancer: async (id: number, data: UpdateNodeBalancerRequest) => {
      const response = await axios.put(`/nodebalancers/${id}`, data);
      return response.data;
    },
    deleteNodeBalancer: async (id: number) => {
      const response = await axios.delete(`/nodebalancers/${id}`);
      return response.data;
    },
    
    // NodeBalancer Config operations
    getNodeBalancerConfigs: async (nodeBalancerId: number) => {
      const response = await axios.get(`/nodebalancers/${nodeBalancerId}/configs`);
      return response.data;
    },
    getNodeBalancerConfig: async (nodeBalancerId: number, configId: number) => {
      const response = await axios.get(`/nodebalancers/${nodeBalancerId}/configs/${configId}`);
      return response.data;
    },
    createNodeBalancerConfig: async (nodeBalancerId: number, data: CreateNodeBalancerConfigRequest) => {
      const response = await axios.post(`/nodebalancers/${nodeBalancerId}/configs`, data);
      return response.data;
    },
    updateNodeBalancerConfig: async (nodeBalancerId: number, configId: number, data: UpdateNodeBalancerConfigRequest) => {
      const response = await axios.put(`/nodebalancers/${nodeBalancerId}/configs/${configId}`, data);
      return response.data;
    },
    deleteNodeBalancerConfig: async (nodeBalancerId: number, configId: number) => {
      const response = await axios.delete(`/nodebalancers/${nodeBalancerId}/configs/${configId}`);
      return response.data;
    },
    rebuildNodeBalancerConfig: async (nodeBalancerId: number, configId: number) => {
      const response = await axios.post(`/nodebalancers/${nodeBalancerId}/configs/${configId}/rebuild`);
      return response.data;
    },
    
    // NodeBalancer Node operations
    getNodeBalancerConfigNodes: async (nodeBalancerId: number, configId: number) => {
      const response = await axios.get(`/nodebalancers/${nodeBalancerId}/configs/${configId}/nodes`);
      return response.data;
    },
    getNodeBalancerConfigNode: async (nodeBalancerId: number, configId: number, nodeId: number) => {
      const response = await axios.get(`/nodebalancers/${nodeBalancerId}/configs/${configId}/nodes/${nodeId}`);
      return response.data;
    },
    createNodeBalancerConfigNode: async (nodeBalancerId: number, configId: number, data: CreateNodeBalancerNodeRequest) => {
      const response = await axios.post(`/nodebalancers/${nodeBalancerId}/configs/${configId}/nodes`, data);
      return response.data;
    },
    updateNodeBalancerConfigNode: async (nodeBalancerId: number, configId: number, nodeId: number, data: UpdateNodeBalancerNodeRequest) => {
      const response = await axios.put(`/nodebalancers/${nodeBalancerId}/configs/${configId}/nodes/${nodeId}`, data);
      return response.data;
    },
    deleteNodeBalancerConfigNode: async (nodeBalancerId: number, configId: number, nodeId: number) => {
      const response = await axios.delete(`/nodebalancers/${nodeBalancerId}/configs/${configId}/nodes/${nodeId}`);
      return response.data;
    },
    
    // NodeBalancer Stats operations
    getNodeBalancerStats: async (id: number) => {
      const response = await axios.get(`/nodebalancers/${id}/stats`);
      return response.data;
    },
    
    // NodeBalancer Types operations
    getNodeBalancerTypes: async () => {
      const response = await axios.get('/nodebalancers/types');
      return response.data;
    }
  };
}