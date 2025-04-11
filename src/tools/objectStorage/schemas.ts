import { z } from 'zod';
import { paginationSchema, tagsSchema, pagingParamsSchema } from '../common/schemas';

// Clusters
export const listClustersSchema = z.object({
  ...pagingParamsSchema.shape
});

// Endpoints
export const listEndpointsSchema = z.object({
  ...pagingParamsSchema.shape
});

// Buckets
export const listBucketsSchema = z.object({
  ...paginationSchema.shape
});

export const getBucketSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
});

export const createBucketSchema = z.object({
  label: z.string().describe('The label for the bucket. Must be 3-63 alphanumeric characters, dashes (-), or dots (.). Cannot end in a dash and cannot use two consecutive dashes. Cannot start or end with a dot, and cannot use two consecutive dots. Must be globally unique within the region.'),
  region: z.string().describe('The region where the bucket will be created (e.g., us-east, us-west). Use List Clusters to get available regions.'),
  endpoint_type: z.enum(['E0', 'E1', 'E2', 'E3']).optional()
    .describe('The type of S3 endpoint available to the user in this region. E0 typically provides public access, while E2/E3 may support additional features like HTTPS or custom domains. Check available endpoint types for your region with List Object Storage Endpoints.'),
  acl: z.enum(['private', 'public-read', 'authenticated-read', 'public-read-write']).optional()
    .describe('The Access Control Level for the bucket. Defaults to private.'),
  cors_enabled: z.boolean().optional().describe('Whether CORS is enabled for the bucket. Defaults to false.'),
});

export const deleteBucketSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
});

export const getBucketAccessSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
});

export const updateBucketAccessSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
  acl: z.enum(['private', 'public-read', 'authenticated-read', 'public-read-write']).optional()
    .describe('The Access Control Level for the bucket'),
  cors_enabled: z.boolean().optional().describe('Whether CORS is enabled for the bucket'),
});

// Objects
export const listObjectsSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
  ...paginationSchema.shape
});

// SSL/TLS certificates
export const getBucketCertificateSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
});

export const uploadBucketCertificateSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
  certificate: z.string().describe('The SSL/TLS certificate in PEM format. Must be a valid certificate that matches the bucket\'s domain.'),
  private_key: z.string().describe('The private key for the certificate in PEM format. Must be the corresponding private key for the certificate.'),
});

export const deleteBucketCertificateSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
});

// Access keys
export const listKeysSchema = z.object({
  ...paginationSchema.shape
});

export const getKeySchema = z.object({
  id: z.number().describe('The ID of the Object Storage key'),
});

export const createKeySchema = z.object({
  label: z.string().describe('The label for the Object Storage key. Used for identification and must be unique.'),
  bucket_access: z.array(z.object({
    cluster: z.string().describe('The cluster of the bucket. Must be a valid cluster ID from List Clusters.'),
    bucket_name: z.string().describe('The name of the bucket. Must be an existing bucket in the specified cluster.'),
    permissions: z.enum(['read_only', 'read_write']).describe('The permissions for this bucket. read_only allows GET operations only, read_write allows all operations.'),
  })).optional().describe('Bucket access configuration for this key. When specified, the key will only have access to the listed buckets with the specified permissions. If not specified, the key will have full access to all buckets.'),
});

export const updateKeySchema = z.object({
  id: z.number().describe('The ID of the Object Storage key'),
  label: z.string().optional().describe('The new label for the Object Storage key'),
  bucket_access: z.array(z.object({
    cluster: z.string().describe('The cluster of the bucket'),
    bucket_name: z.string().describe('The name of the bucket'),
    permissions: z.enum(['read_only', 'read_write']).describe('The permissions for this bucket'),
  })).optional().describe('Updated bucket access configuration for this key'),
});

export const deleteKeySchema = z.object({
  id: z.number().describe('The ID of the Object Storage key'),
});

// Default access
export const getDefaultBucketAccessSchema = z.object({
  id: z.number().describe('The ID of the Object Storage service')
});

export const updateDefaultBucketAccessSchema = z.object({
  acl: z.enum(['private', 'public-read', 'authenticated-read', 'public-read-write']).optional()
    .describe('The Access Control Level for the bucket'),
  cors_enabled: z.boolean().optional().describe('Whether CORS is enabled for the bucket'),
});

// Service
export const cancelObjectStorageSchema = z.object({
  id: z.number().describe('The ID of the Object Storage service to cancel')
});