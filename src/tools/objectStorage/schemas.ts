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
export const listBucketsSchema = z.object({});

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
    region: z.string().describe('The region of the bucket. Must be a valid region ID from List region.'),
    bucket_name: z.string().describe('The name of the bucket. Must be an existing bucket in the specified cluster.'),
    permissions: z.enum(['read_only', 'read_write']).describe('The permissions for this bucket. read_only allows GET operations only, read_write allows all operations.'),
  })).describe('Bucket access configuration for this key. When specified, the key will only have access to the listed buckets with the specified permissions. If not specified, the key will have full access to all buckets.'),
  regions: z.array(z.string()).optional().describe('The regions where the key will be allowed to create new buckets.'),
});

export const updateKeySchema = z.object({
  id: z.number().describe('The ID of the Object Storage key'),
  label: z.string().optional().describe('The new label for the Object Storage key'),
  bucket_access: z.array(z.object({
    region: z.string().describe('The region of the bucket. Must be a valid region ID from List region.'),
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

// Object ACL Management
export const updateObjectACLSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
  name: z.string().describe('The name of the object to update ACL for'),
  acl: z.enum(['private', 'public-read', 'authenticated-read', 'public-read-write', 'custom'])
    .describe('The Access Control Level for the object')
});

// Object URL Generation
export const getObjectURLSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
  name: z.string().describe('The name of the object to generate a URL for'),
  method: z.enum(['GET', 'PUT', 'POST', 'DELETE']).optional()
    .describe('The HTTP method for the URL. Defaults to GET.'),
  expires_in: z.number().optional()
    .describe('The number of seconds the URL will be valid. Defaults to 3600 (1 hour).'),
  content_type: z.string().optional()
    .describe('The Content-Type header for the object when using PUT. Only applies to PUT requests.'),
  content_disposition: z.string().optional()
    .describe('The Content-Disposition header for the object. Only applies to GET and PUT requests.')
});

// Upload Object
export const uploadObjectSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
  object_path: z.string().describe('The path for the object in the bucket (e.g., "folder/file.txt" or just "file.txt")'),
  source: z.string().describe('The source data: local file path, raw string content, or URL'),
  content_type: z.string().optional().describe('The content type of the object (e.g., "text/plain", "image/jpeg")'),
  acl: z.enum(['private', 'public-read', 'authenticated-read', 'public-read-write', 'custom']).optional()
    .describe('The Access Control Level for the object. If not provided, bucket default is used.'),
  expires_in: z.number().optional().describe('How long the signed URL should be valid in seconds. Default: 3600 (1 hour)')
});

// Download Object
export const downloadObjectSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
  object_path: z.string().describe('The path of the object to download (e.g., "folder/file.txt" or just "file.txt")'),
  destination: z.string().optional().describe('Local file path where the object should be saved. If not provided, saves to current working directory.'),
  expires_in: z.number().optional().describe('How long the signed URL should be valid in seconds. Default: 3600 (1 hour)')
});

// Delete Object
export const deleteObjectSchema = z.object({
  region: z.string().describe('The region where the bucket is located (e.g., us-east, us-west)'),
  bucket: z.string().describe('The name of the bucket'),
  object_path: z.string().describe('The path of the object to delete (e.g., "folder/file.txt" or just "file.txt")'),
  expires_in: z.number().optional().describe('How long the signed URL should be valid in seconds. Default: 3600 (1 hour)')
});

// Transfer Statistics
export const getTransferStatsSchema = z.object({});

// Object Storage Types
export const listObjectStorageTypesSchema = z.object({});

// Service
export const cancelObjectStorageSchema = z.object({
  id: z.number().describe('The ID of the Object Storage service to cancel')
});