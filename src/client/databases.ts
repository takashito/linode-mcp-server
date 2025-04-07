import { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationParams } from './instances';

// Common Database interfaces
export interface DatabaseEngine {
  id: string;
  engine: string;
  version: string;
}

export interface DatabaseType {
  id: string;
  label: string;
  engines: DatabaseEngine[];
  class: string;
  memory_mb: number;
  disk_mb: number;
  vcpus: number;
  price: {
    hourly: number;
    monthly: number;
  };
  regions: string[];
}

export interface DatabaseInstance {
  id: number;
  status: 'provisioning' | 'active' | 'suspending' | 'suspended' | 'resuming' | 'restoring' | 'failed' | 'degraded';
  label: string;
  region: string;
  type: string;
  engine: string;
  version: string;
  cluster_size: number;
  replica_set?: boolean;
  encrypted: boolean;
  ssl_connection: boolean;
  allow_list: string[];
  port: number;
  hosts: {
    primary?: string;
    secondary?: string;
    primary_read_only?: string;
  };
  created: string;
  updated: string;
}

export interface MySQLDatabaseInstance extends DatabaseInstance {
  updates?: {
    day_of_week: number;
    duration: number;
    frequency: string;
    hour_of_day: number;
    week_of_month?: number;
  };
}

export interface PostgreSQLDatabaseInstance extends DatabaseInstance {
  updates?: {
    day_of_week: number;
    duration: number;
    frequency: string;
    hour_of_day: number;
    week_of_month?: number;
  };
}

export interface DatabaseCredentials {
  username: string;
  password: string;
}

export interface SSLCertificate {
  ca_certificate: string;
}

// Database request interfaces
export interface CreateMySQLDatabaseRequest {
  label: string;
  region: string;
  type: string;
  engine: string;
  allow_list?: string[];
  cluster_size?: number;
  encrypted?: boolean;
  ssl_connection?: boolean;
  tags?: string[];
  updates?: {
    day_of_week: number;
    duration: number;
    frequency: 'weekly' | 'monthly';
    hour_of_day: number;
    week_of_month?: number;
  };
}

export interface UpdateMySQLDatabaseRequest {
  label?: string;
  allow_list?: string[];
  updates?: {
    day_of_week?: number;
    duration?: number;
    frequency?: 'weekly' | 'monthly';
    hour_of_day?: number;
    week_of_month?: number;
  };
  tags?: string[];
}

export interface CreatePostgreSQLDatabaseRequest {
  label: string;
  region: string;
  type: string;
  engine: string;
  allow_list?: string[];
  cluster_size?: number;
  encrypted?: boolean;
  ssl_connection?: boolean;
  tags?: string[];
  updates?: {
    day_of_week: number;
    duration: number;
    frequency: 'weekly' | 'monthly';
    hour_of_day: number;
    week_of_month?: number;
  };
}

export interface UpdatePostgreSQLDatabaseRequest {
  label?: string;
  allow_list?: string[];
  updates?: {
    day_of_week?: number;
    duration?: number;
    frequency?: 'weekly' | 'monthly';
    hour_of_day?: number;
    week_of_month?: number;
  };
  tags?: string[];
}

// Client interface
export interface DatabasesClient {
  // Engine endpoints
  getEngines: (params?: PaginationParams) => Promise<PaginatedResponse<DatabaseEngine>>;
  getEngine: (engineId: string) => Promise<DatabaseEngine>;

  // Type endpoints
  getTypes: (params?: PaginationParams) => Promise<PaginatedResponse<DatabaseType>>;
  getType: (typeId: string) => Promise<DatabaseType>;

  // General database instances endpoint
  getDatabaseInstances: (params?: PaginationParams) => Promise<PaginatedResponse<DatabaseInstance>>;

  // MySQL specific endpoints
  getMySQLInstances: (params?: PaginationParams) => Promise<PaginatedResponse<MySQLDatabaseInstance>>;
  getMySQLInstance: (instanceId: number) => Promise<MySQLDatabaseInstance>;
  createMySQLInstance: (data: CreateMySQLDatabaseRequest) => Promise<MySQLDatabaseInstance>;
  updateMySQLInstance: (instanceId: number, data: UpdateMySQLDatabaseRequest) => Promise<MySQLDatabaseInstance>;
  deleteMySQLInstance: (instanceId: number) => Promise<void>;
  getMySQLCredentials: (instanceId: number) => Promise<DatabaseCredentials>;
  resetMySQLCredentials: (instanceId: number) => Promise<DatabaseCredentials>;
  getMySQLSSLCertificate: (instanceId: number) => Promise<SSLCertificate>;
  patchMySQLInstance: (instanceId: number) => Promise<void>;
  suspendMySQLInstance: (instanceId: number) => Promise<void>;
  resumeMySQLInstance: (instanceId: number) => Promise<void>;

  // PostgreSQL specific endpoints
  getPostgreSQLInstances: (params?: PaginationParams) => Promise<PaginatedResponse<PostgreSQLDatabaseInstance>>;
  getPostgreSQLInstance: (instanceId: number) => Promise<PostgreSQLDatabaseInstance>;
  createPostgreSQLInstance: (data: CreatePostgreSQLDatabaseRequest) => Promise<PostgreSQLDatabaseInstance>;
  updatePostgreSQLInstance: (instanceId: number, data: UpdatePostgreSQLDatabaseRequest) => Promise<PostgreSQLDatabaseInstance>;
  deletePostgreSQLInstance: (instanceId: number) => Promise<void>;
  getPostgreSQLCredentials: (instanceId: number) => Promise<DatabaseCredentials>;
  resetPostgreSQLCredentials: (instanceId: number) => Promise<DatabaseCredentials>;
  getPostgreSQLSSLCertificate: (instanceId: number) => Promise<SSLCertificate>;
  patchPostgreSQLInstance: (instanceId: number) => Promise<void>;
  suspendPostgreSQLInstance: (instanceId: number) => Promise<void>;
  resumePostgreSQLInstance: (instanceId: number) => Promise<void>;
}

/**
 * Creates a databases client for interfacing with the Linode Managed Databases API
 */
export function createDatabasesClient(axios: AxiosInstance): DatabasesClient {
  return {
    // Engine endpoints
    getEngines: async (params?: PaginationParams) => {
      const response = await axios.get('/databases/engines', { params });
      return response.data;
    },
    getEngine: async (engineId: string) => {
      const response = await axios.get(`/databases/engines/${engineId}`);
      return response.data;
    },

    // Type endpoints
    getTypes: async (params?: PaginationParams) => {
      const response = await axios.get('/databases/types', { params });
      return response.data;
    },
    getType: async (typeId: string) => {
      const response = await axios.get(`/databases/types/${typeId}`);
      return response.data;
    },

    // General database instances endpoint
    getDatabaseInstances: async (params?: PaginationParams) => {
      const response = await axios.get('/databases/instances', { params });
      return response.data;
    },

    // MySQL specific endpoints
    getMySQLInstances: async (params?: PaginationParams) => {
      const response = await axios.get('/databases/mysql/instances', { params });
      return response.data;
    },
    getMySQLInstance: async (instanceId: number) => {
      const response = await axios.get(`/databases/mysql/instances/${instanceId}`);
      return response.data;
    },
    createMySQLInstance: async (data: CreateMySQLDatabaseRequest) => {
      const response = await axios.post('/databases/mysql/instances', data);
      return response.data;
    },
    updateMySQLInstance: async (instanceId: number, data: UpdateMySQLDatabaseRequest) => {
      const response = await axios.put(`/databases/mysql/instances/${instanceId}`, data);
      return response.data;
    },
    deleteMySQLInstance: async (instanceId: number) => {
      await axios.delete(`/databases/mysql/instances/${instanceId}`);
    },
    getMySQLCredentials: async (instanceId: number) => {
      const response = await axios.get(`/databases/mysql/instances/${instanceId}/credentials`);
      return response.data;
    },
    resetMySQLCredentials: async (instanceId: number) => {
      const response = await axios.post(`/databases/mysql/instances/${instanceId}/credentials/reset`);
      return response.data;
    },
    getMySQLSSLCertificate: async (instanceId: number) => {
      const response = await axios.get(`/databases/mysql/instances/${instanceId}/ssl`);
      return response.data;
    },
    patchMySQLInstance: async (instanceId: number) => {
      await axios.post(`/databases/mysql/instances/${instanceId}/patch`);
    },
    suspendMySQLInstance: async (instanceId: number) => {
      await axios.post(`/databases/mysql/instances/${instanceId}/suspend`);
    },
    resumeMySQLInstance: async (instanceId: number) => {
      await axios.post(`/databases/mysql/instances/${instanceId}/resume`);
    },

    // PostgreSQL specific endpoints
    getPostgreSQLInstances: async (params?: PaginationParams) => {
      const response = await axios.get('/databases/postgresql/instances', { params });
      return response.data;
    },
    getPostgreSQLInstance: async (instanceId: number) => {
      const response = await axios.get(`/databases/postgresql/instances/${instanceId}`);
      return response.data;
    },
    createPostgreSQLInstance: async (data: CreatePostgreSQLDatabaseRequest) => {
      const response = await axios.post('/databases/postgresql/instances', data);
      return response.data;
    },
    updatePostgreSQLInstance: async (instanceId: number, data: UpdatePostgreSQLDatabaseRequest) => {
      const response = await axios.put(`/databases/postgresql/instances/${instanceId}`, data);
      return response.data;
    },
    deletePostgreSQLInstance: async (instanceId: number) => {
      await axios.delete(`/databases/postgresql/instances/${instanceId}`);
    },
    getPostgreSQLCredentials: async (instanceId: number) => {
      const response = await axios.get(`/databases/postgresql/instances/${instanceId}/credentials`);
      return response.data;
    },
    resetPostgreSQLCredentials: async (instanceId: number) => {
      const response = await axios.post(`/databases/postgresql/instances/${instanceId}/credentials/reset`);
      return response.data;
    },
    getPostgreSQLSSLCertificate: async (instanceId: number) => {
      const response = await axios.get(`/databases/postgresql/instances/${instanceId}/ssl`);
      return response.data;
    },
    patchPostgreSQLInstance: async (instanceId: number) => {
      await axios.post(`/databases/postgresql/instances/${instanceId}/patch`);
    },
    suspendPostgreSQLInstance: async (instanceId: number) => {
      await axios.post(`/databases/postgresql/instances/${instanceId}/suspend`);
    },
    resumePostgreSQLInstance: async (instanceId: number) => {
      await axios.post(`/databases/postgresql/instances/${instanceId}/resume`);
    }
  };
}