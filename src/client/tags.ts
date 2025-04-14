import { AxiosInstance } from 'axios';
import { PaginationParams, PaginatedResponse } from './instances';

/**
 * Interface for Tag
 */
export interface Tag {
  label: string;
}

/**
 * Interface for creating a Tag
 */
export interface CreateTagRequest {
  label: string;
  entities?: {
    linodes?: number[];
    domains?: number[];
    nodebalancers?: number[];
    volumes?: number[];
  };
}

/**
 * Client for Linode Tags API
 */
export interface TagsClient {
  /**
   * Get a list of Tags
   * @param params - Pagination parameters
   * @returns A paginated list of Tags
   */
  getTags(params?: PaginationParams): Promise<PaginatedResponse<Tag>>;

  /**
   * Get a specific Tag by label
   * @param label - The label of the Tag
   * @returns The Tag object
   */
  getTag(label: string): Promise<Tag>;

  /**
   * Create a new Tag
   * @param data - The data for the new Tag
   * @returns The newly created Tag
   */
  createTag(data: CreateTagRequest): Promise<Tag>;

  /**
   * Delete a Tag
   * @param label - The label of the Tag to delete
   * @returns Empty response on success
   */
  deleteTag(label: string): Promise<{}>;
}

/**
 * Create a new Tags client
 * @param axios - The Axios instance for API calls
 * @returns A new Tags client
 */
export function createTagsClient(axios: AxiosInstance): TagsClient {
  return {
    async getTags(params?: PaginationParams): Promise<PaginatedResponse<Tag>> {
      const response = await axios.get('/tags', { params });
      return response.data;
    },

    async getTag(label: string): Promise<Tag> {
      const response = await axios.get(`/tags/${encodeURIComponent(label)}`);
      return response.data;
    },

    async createTag(data: CreateTagRequest): Promise<Tag> {
      const response = await axios.post('/tags', data);
      return response.data;
    },

    async deleteTag(label: string): Promise<{}> {
      const response = await axios.delete(`/tags/${encodeURIComponent(label)}`);
      return response.data;
    }
  };
}