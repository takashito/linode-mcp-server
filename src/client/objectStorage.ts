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
  region: string;
  created: string;
  label: string;
  hostname: string;
  objects: number;
  size: number;
  cors_enabled: boolean;
  acl: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write' | 'custom';
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
  region: string;
  bucket_name: string;
  permissions: 'read_only' | 'read_write';
}

export interface DefaultBucketAccess {
  region: string;
  bucket_name: string;
  cors_enabled: boolean;
  acl: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write' | 'custom';
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
  region: string;
  endpoint_type?: 'E0' | 'E1' | 'E2' | 'E3';
  acl?: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write' | 'custom';
  cors_enabled?: boolean;
}

export interface CreateObjectStorageKeyRequest {
  label: string;
  bucket_access: BucketAccess[];
  regions?: string[];
}

export interface UpdateObjectStorageKeyRequest {
  label?: string;
  bucket_access?: BucketAccess[];
}

export interface UpdateBucketAccessRequest {
  acl?: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write' | 'custom';
  cors_enabled?: boolean;
}

export interface UploadCertificateRequest {
  certificate: string;
  private_key: string;
}

// Add new interfaces for the missing APIs
export interface ObjectACLRequest {
  acl: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write' | 'custom';
}

export interface ObjectURLRequest {
  name: string;
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE';
  expires_in?: number;
  content_type?: string;
}

export interface ObjectURLResponse {
  url: string;
}

export interface TransferStats {
  used: number;
  billable: number;
  quota: number;
  regions: {
    region: string;
    used: number;
    billable: number;
    quota: number;
  }[];
}

export interface ObjectStorageType {
  id: string;
  label: string;
  storage_price: number;
  transfer_price: number;
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
  getBucket: (region: string, label: string) => Promise<ObjectStorageBucket>;
  createBucket: (data: CreateBucketRequest) => Promise<ObjectStorageBucket>;
  deleteBucket: (region: string, label: string) => Promise<void>;
  getBucketAccess: (region: string, label: string) => Promise<{ acl: string; cors_enabled: boolean }>;
  updateBucketAccess: (region: string, label: string, data: UpdateBucketAccessRequest) => Promise<{ acl: string; cors_enabled: boolean }>;
  
  // Objects
  getObjects: (region: string, bucket: string, params?: PaginationParams) => Promise<PaginatedResponse<ObjectStorageObject>>;
  updateObjectACL: (region: string, bucket: string, name: string, data: ObjectACLRequest) => Promise<void>;
  getObjectURL: (region: string, bucket: string, data: ObjectURLRequest) => Promise<ObjectURLResponse>;
  
  // SSL/TLS certificates
  getBucketCertificate: (region: string, bucket: string) => Promise<BucketCertificate>;
  uploadBucketCertificate: (region: string, bucket: string, data: UploadCertificateRequest) => Promise<BucketCertificate>;
  deleteBucketCertificate: (region: string, bucket: string) => Promise<void>;
  
  // Access keys
  getKeys: (params?: PaginationParams) => Promise<PaginatedResponse<ObjectStorageKey>>;
  getKey: (id: number) => Promise<ObjectStorageKey>;
  createKey: (data: CreateObjectStorageKeyRequest) => Promise<ObjectStorageKey>;
  updateKey: (id: number, data: UpdateObjectStorageKeyRequest) => Promise<ObjectStorageKey>;
  deleteKey: (id: number) => Promise<void>;
  
  // Default bucket access
  getDefaultBucketAccess: () => Promise<DefaultBucketAccess>;
  updateDefaultBucketAccess: (data: UpdateBucketAccessRequest) => Promise<DefaultBucketAccess>;
  
  // Transfer statistics
  getTransferStats: () => Promise<TransferStats>;
  
  // Object Storage types
  getTypes: () => Promise<ObjectStorageType[]>;
  
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
    
    getBucket: async (region: string, label: string) => {
      const response = await axios.get(`/object-storage/buckets/${region}/${label}`);
      return response.data;
    },
    
    createBucket: async (data: CreateBucketRequest) => {
      
        const response = await axios.post('/object-storage/buckets', data);
        return response.data;
    },
    
    deleteBucket: async (region: string, label: string) => {
      const response = await axios.delete(`/object-storage/buckets/${region}/${label}`);
      return response.data;
    },
    
    getBucketAccess: async (region: string, label: string) => {
      const response = await axios.get(`/object-storage/buckets/${region}/${label}/access`);
      return response.data;
    },
    
    updateBucketAccess: async (region: string, label: string, data: UpdateBucketAccessRequest) => {
      const response = await axios.post(`/object-storage/buckets/${region}/${label}/access`, data);
      return response.data;
    },
    
    // Objects
    getObjects: async (region: string, bucket: string, params?: PaginationParams) => {
      const response = await axios.get(`/object-storage/buckets/${region}/${bucket}/object-list`, { params });
      return response.data;
    },
    
    // New Object ACL method
    updateObjectACL: async (region: string, bucket: string, name: string, data: ObjectACLRequest) => {
      const response = await axios.put(`/object-storage/buckets/${region}/${bucket}/object-acl`, {
        name,
        acl: data.acl
      });
      return response.data;
    },
    
    // New Object URL generation method
    getObjectURL: async (region: string, bucket: string, data: ObjectURLRequest) => {
      // Create a new object with all properties except 'name'
      const { ...requestData } = data;
      
      // According to OpenAPI spec, we need to include the object name in the path for some methods
      const response = await axios.post(`/object-storage/buckets/${region}/${bucket}/object-url`, requestData);
      return response.data;
    },
    
    // SSL/TLS certificates
    getBucketCertificate: async (region: string, bucket: string) => {
      const response = await axios.get(`/object-storage/buckets/${region}/${bucket}/ssl`);
      return response.data;
    },
    
    uploadBucketCertificate: async (region: string, bucket: string, data: UploadCertificateRequest) => {
      const response = await axios.post(`/object-storage/buckets/${region}/${bucket}/ssl`, data);
      return response.data;
    },
    
    deleteBucketCertificate: async (region: string, bucket: string) => {
      const response = await axios.delete(`/object-storage/buckets/${region}/${bucket}/ssl`);
      return response.data;
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
      const response = await axios.delete(`/object-storage/keys/${id}`);
      return response.data;
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
    
    // New Transfer statistics method
    getTransferStats: async () => {
      const response = await axios.get('/object-storage/transfer');
      return response.data;
    },
    
    // New Object Storage types method
    getTypes: async () => {
      const response = await axios.get('/object-storage/types');
      return response.data;
    },
    
    // Cancellation
    cancelObjectStorage: async () => {
      const response = await axios.post('/object-storage/cancel');
      return response.data;
    }
  };
}