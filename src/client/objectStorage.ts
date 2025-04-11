import { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationParams } from './instances';

// Object Storage types
export interface ObjectStorageCluster {
  id: string;
  domain: string;
  region: string;
  status: string;
  static_site_enabled: boolean;
}

export interface ObjectStorageBucket {
  cluster: string;
  created: string;
  label: string;
  hostname: string;
  objects: number;
  size: number;
  region: string;
  cors_enabled: boolean;
  acl: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write';
}

export interface ObjectStorageKey {
  id: number;
  label: string;
  access_key: string;
  secret_key: string;
  limited: boolean;
  bucket_access: BucketAccess[];
  created: string;
}

export interface BucketAccess {
  cluster: string;
  bucket_name: string;
  permissions: 'read_only' | 'read_write';
}

export interface DefaultBucketAccess {
  cluster: string;
  bucket_name: string;
  region: string;
  cors_enabled: boolean;
  acl: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write';
}

export interface ObjectStorageObject {
  name: string;
  etag: string;
  last_modified: string;
  owner: string;
  size: number;
  url: string;
}

export interface BucketCertificate {
  certificate: string;
  expiry: string;
}

// Request interfaces
export interface CreateBucketRequest {
  label: string;
  cluster: string; // This is actually the region ID, but API implementation expects 'cluster'
  endpoint_type?: 'E0' | 'E1' | 'E2' | 'E3';
  acl?: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write';
  cors_enabled?: boolean;
}

export interface CreateObjectStorageKeyRequest {
  label: string;
  bucket_access?: BucketAccess[];
}

export interface UpdateObjectStorageKeyRequest {
  label?: string;
  bucket_access?: BucketAccess[];
}

export interface UpdateBucketAccessRequest {
  acl?: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write';
  cors_enabled?: boolean;
}

export interface UploadCertificateRequest {
  certificate: string;
  private_key: string;
}

export interface ObjectStorageClient {
  // Clusters
  getClusters: () => Promise<ObjectStorageCluster[]>;
  
  // Endpoints
  getEndpoints: (params?: PaginationParams) => Promise<PaginatedResponse<{
    region: string;
    endpoint_type: 'E0' | 'E1' | 'E2' | 'E3';
    s3_endpoint: string | null;
  }>>;
  
  // Buckets
  getBuckets: (params?: PaginationParams) => Promise<PaginatedResponse<ObjectStorageBucket>>;
  getBucket: (cluster: string, label: string) => Promise<ObjectStorageBucket>;
  createBucket: (data: CreateBucketRequest) => Promise<ObjectStorageBucket>;
  deleteBucket: (cluster: string, label: string) => Promise<void>;
  getBucketAccess: (cluster: string, label: string) => Promise<{ acl: string; cors_enabled: boolean }>;
  updateBucketAccess: (cluster: string, label: string, data: UpdateBucketAccessRequest) => Promise<{ acl: string; cors_enabled: boolean }>;
  
  // Objects
  getObjects: (cluster: string, bucket: string, params?: PaginationParams) => Promise<PaginatedResponse<ObjectStorageObject>>;
  
  // SSL/TLS certificates
  getBucketCertificate: (cluster: string, bucket: string) => Promise<BucketCertificate>;
  uploadBucketCertificate: (cluster: string, bucket: string, data: UploadCertificateRequest) => Promise<BucketCertificate>;
  deleteBucketCertificate: (cluster: string, bucket: string) => Promise<void>;
  
  // Access keys
  getKeys: (params?: PaginationParams) => Promise<PaginatedResponse<ObjectStorageKey>>;
  getKey: (id: number) => Promise<ObjectStorageKey>;
  createKey: (data: CreateObjectStorageKeyRequest) => Promise<ObjectStorageKey>;
  updateKey: (id: number, data: UpdateObjectStorageKeyRequest) => Promise<ObjectStorageKey>;
  deleteKey: (id: number) => Promise<void>;
  
  // Default bucket access
  getDefaultBucketAccess: () => Promise<DefaultBucketAccess>;
  updateDefaultBucketAccess: (data: UpdateBucketAccessRequest) => Promise<DefaultBucketAccess>;
  
  // Cancellation
  cancelObjectStorage: () => Promise<void>;
}

export function createObjectStorageClient(axios: AxiosInstance): ObjectStorageClient {
  return {
    // Clusters
    getClusters: async () => {
      const response = await axios.get('/object-storage/clusters');
      return response.data.data;
    },
    
    // Endpoints
    getEndpoints: async (params?: PaginationParams) => {
      const response = await axios.get('/object-storage/endpoints', { params });
      return response.data;
    },
    
    // Buckets
    getBuckets: async (params?: PaginationParams) => {
      const response = await axios.get('/object-storage/buckets', { params });
      return response.data;
    },
    
    getBucket: async (cluster: string, label: string) => {
      const response = await axios.get(`/object-storage/buckets/${cluster}/${label}`);
      return response.data;
    },
    
    createBucket: async (data: CreateBucketRequest) => {
      try {
        // The Linode API actually wants 'region' but our client interface uses 'cluster'
        // This inconsistency exists because of legacy Linode API compatibility
        const requestData = {
          label: data.label,
          region: data.cluster, // Map cluster to region for API consistency
          endpoint_type: data.endpoint_type,
          acl: data.acl,
          cors_enabled: data.cors_enabled
        };
        
        const response = await axios.post('/object-storage/buckets', requestData);
        return response.data;
      } catch (error: any) {
        console.error("Error creating bucket:", error?.message || error);
        if (error?.response?.data) {
          console.error("API error response:", JSON.stringify(error.response.data));
        }
        throw error;
      }
    },
    
    deleteBucket: async (cluster: string, label: string) => {
      await axios.delete(`/object-storage/buckets/${cluster}/${label}`);
    },
    
    getBucketAccess: async (cluster: string, label: string) => {
      const response = await axios.get(`/object-storage/buckets/${cluster}/${label}/access`);
      return response.data;
    },
    
    updateBucketAccess: async (cluster: string, label: string, data: UpdateBucketAccessRequest) => {
      const response = await axios.post(`/object-storage/buckets/${cluster}/${label}/access`, data);
      return response.data;
    },
    
    // Objects
    getObjects: async (cluster: string, bucket: string, params?: PaginationParams) => {
      const response = await axios.get(`/object-storage/buckets/${cluster}/${bucket}/object-list`, { params });
      return response.data;
    },
    
    // SSL/TLS certificates
    getBucketCertificate: async (cluster: string, bucket: string) => {
      const response = await axios.get(`/object-storage/buckets/${cluster}/${bucket}/ssl`);
      return response.data;
    },
    
    uploadBucketCertificate: async (cluster: string, bucket: string, data: UploadCertificateRequest) => {
      const response = await axios.post(`/object-storage/buckets/${cluster}/${bucket}/ssl`, data);
      return response.data;
    },
    
    deleteBucketCertificate: async (cluster: string, bucket: string) => {
      await axios.delete(`/object-storage/buckets/${cluster}/${bucket}/ssl`);
    },
    
    // Access keys
    getKeys: async (params?: PaginationParams) => {
      const response = await axios.get('/object-storage/keys', { params });
      return response.data;
    },
    
    getKey: async (id: number) => {
      const response = await axios.get(`/object-storage/keys/${id}`);
      return response.data;
    },
    
    createKey: async (data: CreateObjectStorageKeyRequest) => {
      const response = await axios.post('/object-storage/keys', data);
      return response.data;
    },
    
    updateKey: async (id: number, data: UpdateObjectStorageKeyRequest) => {
      const response = await axios.put(`/object-storage/keys/${id}`, data);
      return response.data;
    },
    
    deleteKey: async (id: number) => {
      await axios.delete(`/object-storage/keys/${id}`);
    },
    
    // Default bucket access
    getDefaultBucketAccess: async () => {
      const response = await axios.get('/object-storage/bucket-access');
      return response.data;
    },
    
    updateDefaultBucketAccess: async (data: UpdateBucketAccessRequest) => {
      const response = await axios.put('/object-storage/bucket-access', data);
      return response.data;
    },
    
    // Cancellation
    cancelObjectStorage: async () => {
      await axios.post('/object-storage/cancel');
    }
  };
}