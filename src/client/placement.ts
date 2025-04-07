import { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationParams } from './instances';

export interface PlacementGroup {
  id: number;
  label: string;
  placement_group_type: string;
  placement_group_policy: string;
  region: string;
  linodes: number[];
  tags?: string[];
  created: string;
  updated: string;
}

export interface CreatePlacementGroupRequest {
  label: string;
  placement_group_type: 'anti_affinity:local';
  placement_group_policy?: 'strict' | 'flexible'; // Defaults to flexible if not specified
  region: string;
  tags?: string[];
}

export interface UpdatePlacementGroupRequest {
  label: string; // Label is required even for updates
  tags?: string[];
}

export interface AssignInstancesRequest {
  linodes: number[];
}

export interface UnassignInstancesRequest {
  linodes: number[];
}

export interface PlacementClient {
  getPlacementGroups: (params?: PaginationParams) => Promise<PaginatedResponse<PlacementGroup>>;
  getPlacementGroup: (id: number) => Promise<PlacementGroup>;
  createPlacementGroup: (data: CreatePlacementGroupRequest) => Promise<PlacementGroup>;
  updatePlacementGroup: (id: number, data: UpdatePlacementGroupRequest) => Promise<PlacementGroup>;
  deletePlacementGroup: (id: number) => Promise<void>;
  assignInstances: (id: number, data: AssignInstancesRequest) => Promise<PlacementGroup>;
  unassignInstances: (id: number, data: UnassignInstancesRequest) => Promise<PlacementGroup>;
}

export function createPlacementClient(axios: AxiosInstance): PlacementClient {
  return {
    getPlacementGroups: async (params?: PaginationParams) => {
      const response = await axios.get('/placement/groups', { params });
      return response.data;
    },
    getPlacementGroup: async (id: number) => {
      const response = await axios.get(`/placement/groups/${id}`);
      return response.data;
    },
    createPlacementGroup: async (data: CreatePlacementGroupRequest) => {
      const response = await axios.post('/placement/groups', data);
      return response.data;
    },
    updatePlacementGroup: async (id: number, data: UpdatePlacementGroupRequest) => {
      const response = await axios.put(`/placement/groups/${id}`, data);
      return response.data;
    },
    deletePlacementGroup: async (id: number) => {
      await axios.delete(`/placement/groups/${id}`);
    },
    assignInstances: async (id: number, data: AssignInstancesRequest) => {
      const response = await axios.post(`/placement/groups/${id}/assign`, data);
      return response.data;
    },
    unassignInstances: async (id: number, data: UnassignInstancesRequest) => {
      const response = await axios.post(`/placement/groups/${id}/unassign`, data);
      return response.data;
    }
  };
}