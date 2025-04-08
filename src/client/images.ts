import axios, { AxiosInstance } from 'axios';
import { PaginationParams, PaginatedResponse } from './index';

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
}

/**
 * Create a client for interacting with the Linode Images API
 */
export function createImagesClient(token: string, baseURL: string = 'https://api.linode.com/v4'): ImagesClient {
  const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return {
    /**
     * List all images
     */
    async getImages(params: PaginationParams = {}): Promise<PaginatedResponse<Image>> {
      const response = await instance.get('/images', { params });
      return response.data;
    },

    /**
     * Get a specific image by ID
     */
    async getImage(imageId: string): Promise<Image> {
      const response = await instance.get(`/images/${imageId}`);
      return response.data;
    },

    /**
     * Create a new image from an existing disk
     */
    async createImage(data: CreateImageRequest): Promise<Image> {
      const response = await instance.post('/images', data);
      return response.data;
    },

    /**
     * Upload a new image
     */
    async uploadImage(data: UploadImageRequest): Promise<{ image: Image; upload_url: string }> {
      const response = await instance.post('/images/upload', data);
      return response.data;
    },

    /**
     * Update an existing image
     */
    async updateImage(imageId: string, data: UpdateImageRequest): Promise<Image> {
      const response = await instance.put(`/images/${imageId}`, data);
      return response.data;
    },

    /**
     * Delete an image
     */
    async deleteImage(imageId: string): Promise<{}> {
      const response = await instance.delete(`/images/${imageId}`);
      return response.data;
    },

    /**
     * Replicate an image to other regions
     */
    async replicateImage(imageId: string, data: ReplicateImageRequest): Promise<{}> {
      const response = await instance.post(`/images/${imageId}/regions`, data);
      return response.data;
    },
  };
}