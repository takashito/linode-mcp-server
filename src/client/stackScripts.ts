/**
 * Basic HTTP client interface for StackScripts
 */
export interface ApiClient {
  get: (path: string, params?: any) => Promise<any>;
  post: (path: string, data: any) => Promise<any>;
  put: (path: string, data: any) => Promise<any>;
  delete: (path: string) => Promise<any>;
}

/**
 * Create a new StackScripts client
 * @param client - The API client
 * @returns A new StackScripts client
 */
export function createStackScriptsClient(client: ApiClient): StackScriptsClient {
  return new StackScriptsClient(client);
}

/**
 * Client for Linode StackScripts API
 * This client provides methods for managing StackScripts
 */
export class StackScriptsClient {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Get a list of StackScripts
   * @param params - Pagination and filtering parameters
   * @returns A paginated list of StackScripts
   */
  async getStackScripts(params?: { 
    page?: number; 
    page_size?: number; 
    is_mine?: boolean; 
    is_public?: boolean;
  }) {
    return this.client.get('/linode/stackscripts', params);
  }

  /**
   * Get a specific StackScript by ID
   * @param id - The ID of the StackScript
   * @returns The StackScript object
   */
  async getStackScript(id: number) {
    return this.client.get(`/linode/stackscripts/${id}`);
  }

  /**
   * Create a new StackScript
   * @param data - The data for the new StackScript
   * @returns The newly created StackScript
   */
  async createStackScript(data: {
    script: string;
    label: string;
    images: string[];
    description?: string;
    is_public?: boolean;
    rev_note?: string;
  }) {
    return this.client.post('/linode/stackscripts', data);
  }

  /**
   * Update an existing StackScript
   * @param id - The ID of the StackScript to update
   * @param data - The data to update
   * @returns The updated StackScript object
   */
  async updateStackScript(id: number, data: {
    script?: string;
    label?: string;
    images?: string[];
    description?: string;
    is_public?: boolean;
    rev_note?: string;
  }) {
    return this.client.put(`/linode/stackscripts/${id}`, data);
  }

  /**
   * Delete a StackScript
   * @param id - The ID of the StackScript to delete
   * @returns Empty response on success
   */
  async deleteStackScript(id: number) {
    return this.client.delete(`/linode/stackscripts/${id}`);
  }
}