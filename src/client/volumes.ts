import { AxiosInstance } from 'axios';
import { PaginationParams, PaginatedResponse } from './instances';

export interface Volume {
  id: number;
  label: string;
  status: string;
  region: string;
  size: number;
  linode_id: number | null;
  created: string;
  updated: string;
  filesystem_path: string;
  tags: string[];
}

export interface VolumeType {
  id: string;
  label: string;
  region: string;
  minimum: number;
  maximum: number;
}

export interface CreateVolumeRequest {
  label: string;
  size: number;
  region?: string;
  linode_id?: number;
  config_id?: number;
  tags?: string[];
  encryption?: 'enabled' | 'disabled';
}

export interface UpdateVolumeRequest {
  label?: string;
  tags?: string[];
}

export interface AttachVolumeRequest {
  linode_id: number;
  config_id?: number;
}

export interface ResizeVolumeRequest {
  size: number;
}

export interface CloneVolumeRequest {
  label: string;
}

export interface LinodeVolumesClient {
  // Volume operations
  getVolumes: (params?: PaginationParams) => Promise<PaginatedResponse<Volume>>;
  getVolumeById: (id: number) => Promise<Volume>;
  createVolume: (data: CreateVolumeRequest) => Promise<Volume>;
  updateVolume: (id: number, data: UpdateVolumeRequest) => Promise<Volume>;
  deleteVolume: (id: number) => Promise<{}>;
  attachVolume: (id: number, data: AttachVolumeRequest) => Promise<{}>;
  detachVolume: (id: number) => Promise<{}>;
  resizeVolume: (id: number, data: ResizeVolumeRequest) => Promise<{}>;
  cloneVolume: (id: number, data: CloneVolumeRequest) => Promise<Volume>;
  
  // Volume type operations
  getVolumeTypes: () => Promise<PaginatedResponse<VolumeType>>;
}

export function createVolumesClient(axios: AxiosInstance): LinodeVolumesClient {
  return {
    getVolumes: async (params?: PaginationParams) => {
      const response = await axios.get('/volumes', { params });
      return response.data;
    },
    getVolumeById: async (id: number) => {
      const response = await axios.get(`/volumes/${id}`);
      return response.data;
    },
    createVolume: async (data: CreateVolumeRequest) => {
      const response = await axios.post('/volumes', data);
      return response.data;
    },
    updateVolume: async (id: number, data: UpdateVolumeRequest) => {
      const response = await axios.put(`/volumes/${id}`, data);
      return response.data;
    },
    deleteVolume: async (id: number) => {
      const response = await axios.delete(`/volumes/${id}`);
      return response.data;
    },
    attachVolume: async (id: number, data: AttachVolumeRequest) => {
      const response = await axios.post(`/volumes/${id}/attach`, data);
      return response.data;
    },
    detachVolume: async (id: number) => {
      const response = await axios.post(`/volumes/${id}/detach`);
      return response.data;
    },
    resizeVolume: async (id: number, data: ResizeVolumeRequest) => {
      const response = await axios.post(`/volumes/${id}/resize`, data);
      return response.data;
    },
    cloneVolume: async (id: number, data: CloneVolumeRequest) => {
      const response = await axios.post(`/volumes/${id}/clone`, data);
      return response.data;
    },
    getVolumeTypes: async () => {
      const response = await axios.get('/volumes/types');
      return response.data;
    }
  };
}