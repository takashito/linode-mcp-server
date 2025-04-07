import { AxiosInstance } from 'axios';
import { PaginationParams, PaginatedResponse } from './instances';

export interface Region {
  id: string;
  label: string;
  country: string;
  capabilities: string[];
  status: string;
  resolvers: {
    ipv4: string;
    ipv6: string;
  };
}

export interface RegionAvailability {
  region: string;
  unavailable: string[];
}

export interface LinodeRegionsClient {
  getRegions: (params?: PaginationParams) => Promise<PaginatedResponse<Region>>;
  getRegion: (id: string) => Promise<Region>;
  getRegionsAvailability: () => Promise<PaginatedResponse<RegionAvailability>>;
  getRegionAvailability: (regionId: string) => Promise<RegionAvailability>;
}

export function createRegionsClient(axios: AxiosInstance): LinodeRegionsClient {
  return {
    getRegions: async (params?: PaginationParams) => {
      const response = await axios.get('/regions', { params });
      return response.data;
    },
    getRegion: async (id: string) => {
      const response = await axios.get(`/regions/${id}`);
      return response.data;
    },
    getRegionsAvailability: async () => {
      const response = await axios.get('/regions/availability');
      return response.data;
    },
    getRegionAvailability: async (regionId: string) => {
      const response = await axios.get(`/regions/${regionId}/availability`);
      return response.data;
    }
  };
}