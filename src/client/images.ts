import { AxiosInstance } from 'axios';
import { PaginationParams, PaginatedResponse } from './common';

/**
 * Interface for image data
 */
export interface Image {
  id: string;
  label: string;
  description: string | null;
  created: string;
  updated: string;
  type: 'manual' | 'automatic';
  status: 'available' | 'creating' | 'pending_upload' | 'deleted';
  is_public: boolean;
  size: number;
  created_by: string;
  vendor: string | null;
  deprecated: boolean;
  expiry: string | null;
}

/**
 * Interface for creating an image
 */
export interface CreateImageRequest {
  disk_id: number;
  label: string;
  description?: string;
}

/**
 * Interface for uploading an image
 */
export interface UploadImageRequest {
  label: string;
  description?: string;
  region: string;
}

/**
 * Interface for updating an image
 */
export interface UpdateImageRequest {
  label?: string;
  description?: string;
}

/**
 * Interface for image replication to regions
 */
export interface ReplicateImageRequest {
  regions: string[];
}

/**
 * Interface for the Images client
 */
export interface ImagesClient {
  /**
   * List all images
   */
  getImages(params?: PaginationParams): Promise<PaginatedResponse<Image>>;

  /**
   * Get a specific image by ID
   */
  getImage(imageId: string): Promise<Image>;

  /**
   * Create a new image from an existing disk
   */
  createImage(data: CreateImageRequest): Promise<Image>;

  /**
   * Upload a new image
   */
  uploadImage(data: UploadImageRequest): Promise<{ image: Image; upload_url: string }>;

  /**
   * Update an existing image
   */
  updateImage(imageId: string, data: UpdateImageRequest): Promise<Image>;

  /**
   * Delete an image
   */
  deleteImage(imageId: string): Promise<{}>;

  /**
   * Replicate an image to other regions
   */
  replicateImage(imageId: string, data: ReplicateImageRequest): Promise<{}>;

  // Sharegroups CRUD
  getSharegroups(params?: PaginationParams): Promise<PaginatedResponse<any>>;
  getSharegroup(sharegroupId: number): Promise<any>;
  createSharegroup(data: { label: string; description?: string }): Promise<any>;
  updateSharegroup(sharegroupId: number, data: { label?: string; description?: string }): Promise<any>;
  deleteSharegroup(sharegroupId: number): Promise<{}>;

  // Sharegroup Images
  getSharegroupImages(sharegroupId: number, params?: PaginationParams): Promise<PaginatedResponse<any>>;
  addSharegroupImages(sharegroupId: number, data: { images: string[] }): Promise<any>;
  updateSharegroupImage(sharegroupId: number, imageId: string): Promise<any>;
  removeSharegroupImage(sharegroupId: number, imageId: string): Promise<{}>;

  // Sharegroup Members
  getSharegroupMembers(sharegroupId: number, params?: PaginationParams): Promise<PaginatedResponse<any>>;
  getSharegroupMember(sharegroupId: number, tokenUuid: string): Promise<any>;
  addSharegroupMembers(sharegroupId: number, data: Record<string, any>): Promise<any>;
  updateSharegroupMember(sharegroupId: number, tokenUuid: string, data: Record<string, any>): Promise<any>;
  removeSharegroupMember(sharegroupId: number, tokenUuid: string): Promise<{}>;

  // Sharegroup Tokens
  getSharegroupTokens(params?: PaginationParams): Promise<PaginatedResponse<any>>;
  getSharegroupToken(tokenUuid: string): Promise<any>;
  createSharegroupToken(data: Record<string, any>): Promise<any>;
  updateSharegroupToken(tokenUuid: string, data: Record<string, any>): Promise<any>;
  deleteSharegroupToken(tokenUuid: string): Promise<{}>;

  // Token Lookups
  getTokenSharegroup(tokenUuid: string): Promise<any>;
  getTokenSharegroupImages(tokenUuid: string, params?: PaginationParams): Promise<PaginatedResponse<any>>;

  // Image-to-Sharegroups Lookup
  getImageSharegroups(imageId: string, params?: PaginationParams): Promise<PaginatedResponse<any>>;
}

/**
 * Create a client for interacting with the Linode Images API
 */
export function createImagesClient(axios: AxiosInstance): ImagesClient {
  return {
    async getImages(params: PaginationParams = {}): Promise<PaginatedResponse<Image>> {
      const response = await axios.get('/images', { params });
      return response.data;
    },

    async getImage(imageId: string): Promise<Image> {
      const response = await axios.get(`/images/${imageId}`);
      return response.data;
    },

    async createImage(data: CreateImageRequest): Promise<Image> {
      const response = await axios.post('/images', data);
      return response.data;
    },

    async uploadImage(data: UploadImageRequest): Promise<{ image: Image; upload_url: string }> {
      const response = await axios.post('/images/upload', data);
      return response.data;
    },

    async updateImage(imageId: string, data: UpdateImageRequest): Promise<Image> {
      const response = await axios.put(`/images/${imageId}`, data);
      return response.data;
    },

    async deleteImage(imageId: string): Promise<{}> {
      const response = await axios.delete(`/images/${imageId}`);
      return response.data;
    },

    async replicateImage(imageId: string, data: ReplicateImageRequest): Promise<{}> {
      const response = await axios.post(`/images/${imageId}/regions`, data);
      return response.data;
    },

    // Sharegroups CRUD
    async getSharegroups(params: PaginationParams = {}): Promise<PaginatedResponse<any>> {
      const response = await axios.get('/images/sharegroups', { params });
      return response.data;
    },

    async getSharegroup(sharegroupId: number): Promise<any> {
      const response = await axios.get(`/images/sharegroups/${sharegroupId}`);
      return response.data;
    },

    async createSharegroup(data: { label: string; description?: string }): Promise<any> {
      const response = await axios.post('/images/sharegroups', data);
      return response.data;
    },

    async updateSharegroup(sharegroupId: number, data: { label?: string; description?: string }): Promise<any> {
      const response = await axios.put(`/images/sharegroups/${sharegroupId}`, data);
      return response.data;
    },

    async deleteSharegroup(sharegroupId: number): Promise<{}> {
      const response = await axios.delete(`/images/sharegroups/${sharegroupId}`);
      return response.data;
    },

    // Sharegroup Images
    async getSharegroupImages(sharegroupId: number, params: PaginationParams = {}): Promise<PaginatedResponse<any>> {
      const response = await axios.get(`/images/sharegroups/${sharegroupId}/images`, { params });
      return response.data;
    },

    async addSharegroupImages(sharegroupId: number, data: { images: string[] }): Promise<any> {
      const response = await axios.post(`/images/sharegroups/${sharegroupId}/images`, data);
      return response.data;
    },

    async updateSharegroupImage(sharegroupId: number, imageId: string): Promise<any> {
      const response = await axios.put(`/images/sharegroups/${sharegroupId}/images/${imageId}`);
      return response.data;
    },

    async removeSharegroupImage(sharegroupId: number, imageId: string): Promise<{}> {
      const response = await axios.delete(`/images/sharegroups/${sharegroupId}/images/${imageId}`);
      return response.data;
    },

    // Sharegroup Members
    async getSharegroupMembers(sharegroupId: number, params: PaginationParams = {}): Promise<PaginatedResponse<any>> {
      const response = await axios.get(`/images/sharegroups/${sharegroupId}/members`, { params });
      return response.data;
    },

    async getSharegroupMember(sharegroupId: number, tokenUuid: string): Promise<any> {
      const response = await axios.get(`/images/sharegroups/${sharegroupId}/members/${tokenUuid}`);
      return response.data;
    },

    async addSharegroupMembers(sharegroupId: number, data: Record<string, any>): Promise<any> {
      const response = await axios.post(`/images/sharegroups/${sharegroupId}/members`, data);
      return response.data;
    },

    async updateSharegroupMember(sharegroupId: number, tokenUuid: string, data: Record<string, any>): Promise<any> {
      const response = await axios.put(`/images/sharegroups/${sharegroupId}/members/${tokenUuid}`, data);
      return response.data;
    },

    async removeSharegroupMember(sharegroupId: number, tokenUuid: string): Promise<{}> {
      const response = await axios.delete(`/images/sharegroups/${sharegroupId}/members/${tokenUuid}`);
      return response.data;
    },

    // Sharegroup Tokens
    async getSharegroupTokens(params: PaginationParams = {}): Promise<PaginatedResponse<any>> {
      const response = await axios.get('/images/sharegroups/tokens', { params });
      return response.data;
    },

    async getSharegroupToken(tokenUuid: string): Promise<any> {
      const response = await axios.get(`/images/sharegroups/tokens/${tokenUuid}`);
      return response.data;
    },

    async createSharegroupToken(data: Record<string, any>): Promise<any> {
      const response = await axios.post('/images/sharegroups/tokens', data);
      return response.data;
    },

    async updateSharegroupToken(tokenUuid: string, data: Record<string, any>): Promise<any> {
      const response = await axios.put(`/images/sharegroups/tokens/${tokenUuid}`, data);
      return response.data;
    },

    async deleteSharegroupToken(tokenUuid: string): Promise<{}> {
      const response = await axios.delete(`/images/sharegroups/tokens/${tokenUuid}`);
      return response.data;
    },

    // Token Lookups
    async getTokenSharegroup(tokenUuid: string): Promise<any> {
      const response = await axios.get(`/images/sharegroups/tokens/${tokenUuid}/sharegroup`);
      return response.data;
    },

    async getTokenSharegroupImages(tokenUuid: string, params: PaginationParams = {}): Promise<PaginatedResponse<any>> {
      const response = await axios.get(`/images/sharegroups/tokens/${tokenUuid}/sharegroup/images`, { params });
      return response.data;
    },

    // Image-to-Sharegroups Lookup
    async getImageSharegroups(imageId: string, params: PaginationParams = {}): Promise<PaginatedResponse<any>> {
      const response = await axios.get(`/images/${imageId}/sharegroups`, { params });
      return response.data;
    }
  };
}