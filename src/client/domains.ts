import { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationParams } from './instances';

// Domain interfaces
export interface Domain {
  id: number;
  domain: string;
  type: 'master' | 'slave';
  status: 'active' | 'disabled' | 'edit_mode' | 'has_errors';
  description?: string;
  soa_email?: string;
  retry_sec?: number;
  master_ips?: string[];
  axfr_ips?: string[];
  expire_sec?: number;
  refresh_sec?: number;
  ttl_sec?: number;
  tags?: string[];
  created: string;
  updated: string;
}

export interface DomainRecord {
  id: number;
  type: string;
  name: string;
  target: string;
  priority?: number;
  weight?: number;
  port?: number;
  service?: string;
  protocol?: string;
  ttl_sec?: number;
  tag?: string;
  created: string;
  updated: string;
}

// Request interfaces
export interface CreateDomainRequest {
  domain: string;
  type: 'master' | 'slave';
  soa_email?: string;
  master_ips?: string[];
  description?: string;
  axfr_ips?: string[];
  ttl_sec?: number;
  refresh_sec?: number;
  retry_sec?: number;
  expire_sec?: number;
  tags?: string[];
}

export interface UpdateDomainRequest {
  domain?: string;
  type?: 'master' | 'slave';
  soa_email?: string;
  master_ips?: string[];
  description?: string;
  axfr_ips?: string[];
  ttl_sec?: number;
  refresh_sec?: number;
  retry_sec?: number;
  expire_sec?: number;
  tags?: string[];
  status?: 'active' | 'disabled' | 'edit_mode' | 'has_errors';
}

export interface CreateDomainRecordRequest {
  name: string;
  target: string;
  type: string;
  priority?: number;
  weight?: number;
  port?: number;
  service?: string;
  protocol?: string;
  ttl_sec?: number;
  tag?: string;
}

export interface UpdateDomainRecordRequest {
  name?: string;
  target?: string;
  priority?: number;
  weight?: number;
  port?: number;
  service?: string;
  protocol?: string;
  ttl_sec?: number;
  tag?: string;
}

export interface ImportZoneRequest {
  domain: string;
  remote_nameserver: string;
}

export interface CloneDomainRequest {
  domain: string;
}

// Zone File response interface
export interface ZoneFileResponse {
  zone_file: string;
}

// Client interface
export interface DomainsClient {
  getDomains: (params?: PaginationParams) => Promise<PaginatedResponse<Domain>>;
  getDomain: (id: number) => Promise<Domain>;
  createDomain: (data: CreateDomainRequest) => Promise<Domain>;
  updateDomain: (id: number, data: UpdateDomainRequest) => Promise<Domain>;
  deleteDomain: (id: number) => Promise<void>;
  getDomainRecords: (id: number, params?: PaginationParams) => Promise<PaginatedResponse<DomainRecord>>;
  getDomainRecord: (domainId: number, recordId: number) => Promise<DomainRecord>;
  createDomainRecord: (domainId: number, data: CreateDomainRecordRequest) => Promise<DomainRecord>;
  updateDomainRecord: (domainId: number, recordId: number, data: UpdateDomainRecordRequest) => Promise<DomainRecord>;
  deleteDomainRecord: (domainId: number, recordId: number) => Promise<void>;
  importZone: (data: ImportZoneRequest) => Promise<Domain>;
  cloneDomain: (id: number, data: CloneDomainRequest) => Promise<Domain>;
  getZoneFile: (id: number) => Promise<ZoneFileResponse>;
}

/**
 * Creates a domains client for interfacing with the Linode Domains API
 */
export function createDomainsClient(axios: AxiosInstance): DomainsClient {
  return {
    getDomains: async (params?: PaginationParams) => {
      const response = await axios.get('/domains', { params });
      return response.data;
    },
    getDomain: async (id: number) => {
      const response = await axios.get(`/domains/${id}`);
      return response.data;
    },
    createDomain: async (data: CreateDomainRequest) => {
      const response = await axios.post('/domains', data);
      return response.data;
    },
    updateDomain: async (id: number, data: UpdateDomainRequest) => {
      const response = await axios.put(`/domains/${id}`, data);
      return response.data;
    },
    deleteDomain: async (id: number) => {
      await axios.delete(`/domains/${id}`);
    },
    getDomainRecords: async (id: number, params?: PaginationParams) => {
      const response = await axios.get(`/domains/${id}/records`, { params });
      return response.data;
    },
    getDomainRecord: async (domainId: number, recordId: number) => {
      const response = await axios.get(`/domains/${domainId}/records/${recordId}`);
      return response.data;
    },
    createDomainRecord: async (domainId: number, data: CreateDomainRecordRequest) => {
      const response = await axios.post(`/domains/${domainId}/records`, data);
      return response.data;
    },
    updateDomainRecord: async (domainId: number, recordId: number, data: UpdateDomainRecordRequest) => {
      const response = await axios.put(`/domains/${domainId}/records/${recordId}`, data);
      return response.data;
    },
    deleteDomainRecord: async (domainId: number, recordId: number) => {
      await axios.delete(`/domains/${domainId}/records/${recordId}`);
    },
    importZone: async (data: ImportZoneRequest) => {
      const response = await axios.post('/domains/import', data);
      return response.data;
    },
    cloneDomain: async (id: number, data: CloneDomainRequest) => {
      const response = await axios.post(`/domains/${id}/clone`, data);
      return response.data;
    },
    getZoneFile: async (id: number) => {
      const response = await axios.get(`/domains/${id}/zone-file`);
      return response.data;
    }
  };
}