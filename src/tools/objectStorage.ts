import { z } from 'zod';

// Common paging parameters
const pagingParamsSchema = z.object({
  page: z.number().optional().describe('Page number to fetch'),
  page_size: z.number().optional().describe('Number of items per page'),
});

// Object Storage Clusters
export const listClustersSchema = z.object({});

// Object Storage Buckets
export const listBucketsSchema = z.object({
  ...pagingParamsSchema.shape,
});

export const getBucketSchema = z.object({
  cluster_id: z.string().describe('The ID of the Object Storage cluster'),
  bucket_name: z.string().describe('The name of the bucket'),
});

export const createBucketSchema = z.object({
  cluster: z.string().describe('The ID of the Object Storage cluster'),
  label: z.string().describe('The name of the bucket'),
  acl: z.enum(['private', 'public-read', 'authenticated-read', 'public-read-write']).optional()
    .describe('The Access Control Level of the bucket'),
  cors_enabled: z.boolean().optional().describe('Whether Cross-Origin Resource Sharing is enabled for the bucket'),
  versioning: z.boolean().optional().describe('Whether object versioning is enabled for the bucket'),
});

export const deleteBucketSchema = z.object({
  cluster_id: z.string().describe('The ID of the Object Storage cluster'),
  bucket_name: z.string().describe('The name of the bucket'),
});

// Object Storage Bucket Access
export const getBucketAccessSchema = z.object({
  cluster_id: z.string().describe('The ID of the Object Storage cluster'),
  bucket_name: z.string().describe('The name of the bucket'),
});

export const updateBucketAccessSchema = z.object({
  cluster_id: z.string().describe('The ID of the Object Storage cluster'),
  bucket_name: z.string().describe('The name of the bucket'),
  acl: z.enum(['private', 'public-read', 'authenticated-read', 'public-read-write']).optional()
    .describe('The Access Control Level for the bucket'),
  cors_enabled: z.boolean().optional().describe('Whether Cross-Origin Resource Sharing is enabled for the bucket'),
});

// Object Storage Objects
export const listObjectsSchema = z.object({
  cluster_id: z.string().describe('The ID of the Object Storage cluster'),
  bucket_name: z.string().describe('The name of the bucket'),
  prefix: z.string().optional().describe('Filter results to objects whose names begin with this prefix'),
  delimiter: z.string().optional().describe('The delimiter to use for grouping object names'),
  ...pagingParamsSchema.shape,
});

// Object Storage SSL/TLS Certificates
export const getBucketCertificateSchema = z.object({
  cluster_id: z.string().describe('The ID of the Object Storage cluster'),
  bucket_name: z.string().describe('The name of the bucket'),
});

export const uploadBucketCertificateSchema = z.object({
  cluster_id: z.string().describe('The ID of the Object Storage cluster'),
  bucket_name: z.string().describe('The name of the bucket'),
  certificate: z.string().describe('The PEM-formatted SSL/TLS certificate'),
  private_key: z.string().describe('The PEM-formatted private key for the certificate'),
});

export const deleteBucketCertificateSchema = z.object({
  cluster_id: z.string().describe('The ID of the Object Storage cluster'),
  bucket_name: z.string().describe('The name of the bucket'),
});

// Object Storage Keys
export const listKeysSchema = z.object({
  ...pagingParamsSchema.shape,
});

export const getKeySchema = z.object({
  key_id: z.number().describe('The ID of the Object Storage key'),
});

export const createKeySchema = z.object({
  label: z.string().describe('The label for the key'),
});

export const updateKeySchema = z.object({
  key_id: z.number().describe('The ID of the Object Storage key'),
  label: z.string().describe('The new label for the key'),
});

export const deleteKeySchema = z.object({
  key_id: z.number().describe('The ID of the Object Storage key'),
});

// Object Storage Default Bucket Access
export const getDefaultBucketAccessSchema = z.object({});

export const updateDefaultBucketAccessSchema = z.object({
  acl: z.enum(['private', 'public-read', 'authenticated-read', 'public-read-write'])
    .describe('The Access Control Level for new buckets'),
  cors_enabled: z.boolean().optional().describe('Whether Cross-Origin Resource Sharing is enabled for new buckets'),
});

// Cancel Object Storage
export const cancelObjectStorageSchema = z.object({});
