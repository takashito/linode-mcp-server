import { AxiosInstance } from 'axios';
import { PaginationParams, PaginatedResponse } from './instances';

/**
 * Interface for StackScript
 */
export interface StackScript {
  id: number;
  label: string;
  script: string;
  description: string;
  images: string[];
  deployments_active: number;
  deployments_total: number;
  is_public: boolean;
  created: string;
  updated: string;
  username: string;
  user_gravatar_id: string;
  rev_note: string;
  user_defined_fields: {
    name: string;
    label: string;
    example: string;
    default?: string;
    oneOf?: string;
    manyOf?: string;
  }[];
  mine: boolean;
}

/**
 * Client for Linode StackScripts API
 */
export interface StackScriptsClient {
  /**
   * Get a list of StackScripts
   * @param params - Pagination and filtering parameters
   * @returns A paginated list of StackScripts
   */
  getStackScripts(params?: PaginationParams & { 
    is_mine?: boolean; 
    is_public?: boolean;
  }): Promise<PaginatedResponse<StackScript>>;

  /**
   * Get a specific StackScript by ID
   * @param id - The ID of the StackScript
   * @returns The StackScript object
   */
  getStackScript(id: number): Promise<StackScript>;

  /**
   * Create a new StackScript
   * @param data - The data for the new StackScript
   * @returns The newly created StackScript
   */
  createStackScript(data: {
    script: string;
    label: string;
    images: string[];
    description?: string;
    is_public?: boolean;
    rev_note?: string;
  }): Promise<StackScript>;

  /**
   * Update an existing StackScript
   * @param id - The ID of the StackScript to update
   * @param data - The data to update
   * @returns The updated StackScript object
   */
  updateStackScript(id: number, data: {
    script?: string;
    label?: string;
    images?: string[];
    description?: string;
    is_public?: boolean;
    rev_note?: string;
  }): Promise<StackScript>;

  /**
   * Delete a StackScript
   * @param id - The ID of the StackScript to delete
   * @returns Empty response on success
   */
  deleteStackScript(id: number): Promise<{}>;
}

/**
 * Create a new StackScripts client
 * @param axios - The Axios instance for API calls
 * @returns A new StackScripts client
 */
export function createStackScriptsClient(axios: AxiosInstance): StackScriptsClient {
  return {
    async getStackScripts(params?: PaginationParams & { 
      is_mine?: boolean; 
      is_public?: boolean;
    }): Promise<PaginatedResponse<StackScript>> {
      const response = await axios.get('/linode/stackscripts', { params });
      return response.data;
    },

    async getStackScript(id: number): Promise<StackScript> {
      const response = await axios.get(`/linode/stackscripts/${id}`);
      return response.data;
    },

    async createStackScript(data: {
      script: string;
      label: string;
      images: string[];
      description?: string;
      is_public?: boolean;
      rev_note?: string;
    }): Promise<StackScript> {
      const response = await axios.post('/linode/stackscripts', data);
      return response.data;
    },

    async updateStackScript(id: number, data: {
      script?: string;
      label?: string;
      images?: string[];
      description?: string;
      is_public?: boolean;
      rev_note?: string;
    }): Promise<StackScript> {
      const response = await axios.put(`/linode/stackscripts/${id}`, data);
      return response.data;
    },

    async deleteStackScript(id: number): Promise<{}> {
      const response = await axios.delete(`/linode/stackscripts/${id}`);
      return response.data;
    }
  };
}