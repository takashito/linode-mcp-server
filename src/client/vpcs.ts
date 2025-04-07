import { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationParams } from './instances';

export interface VPC {
  id: number;
  label: string;
  description?: string;
  region: string;
  subnets: VPCSubnet[];
  created: string;
  updated: string;
  tags?: string[];
}

export interface VPCSubnet {
  id: number;
  label: string;
  ipv4: string;
  created: string;
  updated: string;
  tags?: string[];
}

export interface CreateVPCRequest {
  label: string;
  region: string;
  description?: string;
  tags?: string[];
}

export interface UpdateVPCRequest {
  label?: string;
  description?: string;
  tags?: string[];
}

export interface CreateSubnetRequest {
  label: string;
  ipv4: string;
  tags?: string[];
}

export interface UpdateSubnetRequest {
  label?: string;
  tags?: string[];
}

export interface VPCIP {
  address: string;
  region: string;
  type: string;
  subnet_id: number;
  linode_id?: number;
  gateway?: boolean;
  vpc_id: number;
  created: string;
  updated: string;
}

export interface VPCsClient {
  getVPCs: (params?: PaginationParams) => Promise<PaginatedResponse<VPC>>;
  getVPC: (id: number) => Promise<VPC>;
  createVPC: (data: CreateVPCRequest) => Promise<VPC>;
  updateVPC: (id: number, data: UpdateVPCRequest) => Promise<VPC>;
  deleteVPC: (id: number) => Promise<void>;
  getSubnets: (vpcId: number, params?: PaginationParams) => Promise<PaginatedResponse<VPCSubnet>>;
  getSubnet: (vpcId: number, subnetId: number) => Promise<VPCSubnet>;
  createSubnet: (vpcId: number, data: CreateSubnetRequest) => Promise<VPCSubnet>;
  updateSubnet: (vpcId: number, subnetId: number, data: UpdateSubnetRequest) => Promise<VPCSubnet>;
  deleteSubnet: (vpcId: number, subnetId: number) => Promise<void>;
  getVPCIPs: (vpcId: number, params?: PaginationParams) => Promise<PaginatedResponse<VPCIP>>;
}

export function createVPCsClient(axios: AxiosInstance): VPCsClient {
  return {
    getVPCs: async (params?: PaginationParams) => {
      const response = await axios.get('/vpcs', { params });
      return response.data;
    },
    getVPC: async (id: number) => {
      const response = await axios.get(`/vpcs/${id}`);
      return response.data;
    },
    createVPC: async (data: CreateVPCRequest) => {
      const response = await axios.post('/vpcs', data);
      return response.data;
    },
    updateVPC: async (id: number, data: UpdateVPCRequest) => {
      const response = await axios.put(`/vpcs/${id}`, data);
      return response.data;
    },
    deleteVPC: async (id: number) => {
      await axios.delete(`/vpcs/${id}`);
    },
    getSubnets: async (vpcId: number, params?: PaginationParams) => {
      const response = await axios.get(`/vpcs/${vpcId}/subnets`, { params });
      return response.data;
    },
    getSubnet: async (vpcId: number, subnetId: number) => {
      const response = await axios.get(`/vpcs/${vpcId}/subnets/${subnetId}`);
      return response.data;
    },
    createSubnet: async (vpcId: number, data: CreateSubnetRequest) => {
      const response = await axios.post(`/vpcs/${vpcId}/subnets`, data);
      return response.data;
    },
    updateSubnet: async (vpcId: number, subnetId: number, data: UpdateSubnetRequest) => {
      const response = await axios.put(`/vpcs/${vpcId}/subnets/${subnetId}`, data);
      return response.data;
    },
    deleteSubnet: async (vpcId: number, subnetId: number) => {
      await axios.delete(`/vpcs/${vpcId}/subnets/${subnetId}`);
    },
    getVPCIPs: async (vpcId: number, params?: PaginationParams) => {
      const response = await axios.get(`/vpcs/${vpcId}/ips`, { params });
      return response.data;
    }
  };
}