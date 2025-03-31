import { LinodeClient } from '../client';

/**
 * Operations for managing Object Storage
 */
export class ObjectStorageOperations {
  private client: LinodeClient;

  constructor(client: LinodeClient) {
    this.client = client;
  }

  /**
   * Get a list of all Object Storage clusters
   */
  async listClusters() {
    return this.client.objectStorage.getClusters();
  }

  /**
   * Get a list of all Object Storage buckets
   */
  async listBuckets(params?: { page?: number; page_size?: number }) {
    return this.client.objectStorage.getBuckets(params);
  }

  /**
   * Get details for a specific bucket
   */
  async getBucket(clusterId: string, bucketName: string) {
    return this.client.objectStorage.getBucket(clusterId, bucketName);
  }

  /**
   * Create a new bucket
   */
  async createBucket(params: {
    cluster: string;
    label: string;
    acl?: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write';
    cors_enabled?: boolean;
    versioning?: boolean;
  }) {
    return this.client.objectStorage.createBucket(params);
  }

  /**
   * Delete a bucket
   */
  async deleteBucket(clusterId: string, bucketName: string) {
    return this.client.objectStorage.deleteBucket(clusterId, bucketName);
  }

  /**
   * Get bucket access configuration
   */
  async getBucketAccess(clusterId: string, bucketName: string) {
    return this.client.objectStorage.getBucketAccess(clusterId, bucketName);
  }

  /**
   * Update bucket access configuration
   */
  async updateBucketAccess(
    clusterId: string,
    bucketName: string,
    params: {
      acl?: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write';
      cors_enabled?: boolean;
    }
  ) {
    return this.client.objectStorage.updateBucketAccess(clusterId, bucketName, params);
  }

  /**
   * List objects in a bucket
   */
  async listObjects(
    clusterId: string,
    bucketName: string,
    params?: {
      page?: number;
      page_size?: number;
      prefix?: string;
      delimiter?: string;
    }
  ) {
    return this.client.objectStorage.getObjects(clusterId, bucketName, params);
  }

  /**
   * Get bucket SSL/TLS certificate
   */
  async getBucketCertificate(clusterId: string, bucketName: string) {
    return this.client.objectStorage.getCert(clusterId, bucketName);
  }

  /**
   * Upload bucket SSL/TLS certificate
   */
  async uploadBucketCertificate(
    clusterId: string,
    bucketName: string,
    params: {
      certificate: string;
      private_key: string;
    }
  ) {
    return this.client.objectStorage.uploadCert(clusterId, bucketName, params);
  }

  /**
   * Delete bucket SSL/TLS certificate
   */
  async deleteBucketCertificate(clusterId: string, bucketName: string) {
    return this.client.objectStorage.deleteCert(clusterId, bucketName);
  }

  /**
   * Get a list of Object Storage keys
   */
  async listKeys(params?: { page?: number; page_size?: number }) {
    return this.client.objectStorage.getKeys(params);
  }

  /**
   * Get details for a specific Object Storage key
   */
  async getKey(keyId: number) {
    return this.client.objectStorage.getKey(keyId);
  }

  /**
   * Create a new Object Storage key
   */
  async createKey(params: { label: string }) {
    return this.client.objectStorage.createKey(params);
  }

  /**
   * Update an Object Storage key
   */
  async updateKey(keyId: number, params: { label: string }) {
    return this.client.objectStorage.updateKey(keyId, params);
  }

  /**
   * Delete an Object Storage key
   */
  async deleteKey(keyId: number) {
    return this.client.objectStorage.deleteKey(keyId);
  }

  /**
   * Get default bucket access configuration
   */
  async getDefaultBucketAccess() {
    return this.client.objectStorage.getDefaultBucketAccess();
  }

  /**
   * Update default bucket access configuration
   */
  async updateDefaultBucketAccess(params: {
    acl: 'private' | 'public-read' | 'authenticated-read' | 'public-read-write';
    cors_enabled?: boolean;
  }) {
    return this.client.objectStorage.updateDefaultBucketAccess(params);
  }

  /**
   * Cancel Object Storage
   */
  async cancelObjectStorage() {
    return this.client.objectStorage.cancelObjectStorage();
  }
}
