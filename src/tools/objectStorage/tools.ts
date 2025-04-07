import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, ObjectStorageBucket, ObjectStorageCluster, ObjectStorageKey, ObjectStorageObject } from '../../client';
import * as schemas from './schemas';

export function registerObjectStorageTools(server: McpServer, client: LinodeClient) {
  // Clusters
  server.tool(
    'list_object_storage_clusters',
    'Get a list of all Object Storage clusters',
    schemas.listClustersSchema.shape,
    async (_, extra) => {
      const clusters = await client.objectStorage.getClusters();
      return {
        content: [
          { type: 'text', text: formatObjectStorageClusters(clusters) },
        ],
      };
    }
  );

  // Buckets
  server.tool(
    'list_object_storage_buckets',
    'Get a list of all Object Storage buckets',
    schemas.listBucketsSchema.shape,
    async (params, extra) => {
      const result = await client.objectStorage.getBuckets(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageBuckets(result.data) },
        ],
      };
    }
  );

  server.tool(
    'get_object_storage_bucket',
    'Get details for a specific Object Storage bucket',
    schemas.getBucketSchema.shape,
    async (params, extra) => {
      const result = await client.objectStorage.getBucket(params.cluster, params.bucket);
      return {
        content: [
          { type: 'text', text: formatObjectStorageBucket(result) },
        ],
      };
    }
  );

  server.tool(
    'create_object_storage_bucket',
    'Create a new Object Storage bucket',
    schemas.createBucketSchema.shape,
    async (params, extra) => {
      const result = await client.objectStorage.createBucket(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageBucket(result) },
        ],
      };
    }
  );

  server.tool(
    'delete_object_storage_bucket',
    'Delete an Object Storage bucket',
    schemas.deleteBucketSchema.shape,
    async (params, extra) => {
      await client.objectStorage.deleteBucket(params.cluster, params.bucket);
      return {
        content: [
          { type: 'text', text: `Bucket '${params.bucket}' in cluster '${params.cluster}' has been deleted.` },
        ],
      };
    }
  );

  server.tool(
    'get_object_storage_bucket_access',
    'Get access configuration for an Object Storage bucket',
    schemas.getBucketAccessSchema.shape,
    async (params, extra) => {
      const result = await client.objectStorage.getBucketAccess(params.cluster, params.bucket);
      return {
        content: [
          { type: 'text', text: `Bucket Access for '${params.bucket}':
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
        ],
      };
    }
  );

  server.tool(
    'update_object_storage_bucket_access',
    'Update access configuration for an Object Storage bucket',
    schemas.updateBucketAccessSchema.shape,
    async (params, extra) => {
      const { cluster, bucket, ...data } = params;
      const result = await client.objectStorage.updateBucketAccess(cluster, bucket, data);
      return {
        content: [
          { type: 'text', text: `Updated Bucket Access for '${bucket}':
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
        ],
      };
    }
  );

  // Objects
  server.tool(
    'list_object_storage_objects',
    'List objects in an Object Storage bucket',
    schemas.listObjectsSchema.shape,
    async (params, extra) => {
      const { cluster, bucket, ...paginationParams } = params;
      const result = await client.objectStorage.getObjects(cluster, bucket, paginationParams);
      return {
        content: [
          { type: 'text', text: formatObjectStorageObjects(result.data) },
        ],
      };
    }
  );

  // SSL/TLS certificates
  server.tool(
    'get_object_storage_bucket_certificate',
    'Get SSL/TLS certificate for an Object Storage bucket',
    schemas.getBucketCertificateSchema.shape,
    async (params, extra) => {
      try {
        const result = await client.objectStorage.getBucketCertificate(params.cluster, params.bucket);
        return {
          content: [
            { type: 'text', text: `Certificate for '${params.bucket}':
Expires: ${new Date(result.expiry).toLocaleString()}` },
          ],
        };
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          return {
            content: [
              { type: 'text', text: `No certificate found for bucket '${params.bucket}' in cluster '${params.cluster}'.` },
            ],
          };
        }
        throw error;
      }
    }
  );

  server.tool(
    'upload_object_storage_bucket_certificate',
    'Upload SSL/TLS certificate for an Object Storage bucket',
    schemas.uploadBucketCertificateSchema.shape,
    async (params, extra) => {
      const { cluster, bucket, certificate, private_key } = params;
      const result = await client.objectStorage.uploadBucketCertificate(cluster, bucket, {
        certificate,
        private_key,
      });
      return {
        content: [
          { type: 'text', text: `Certificate uploaded for bucket '${bucket}' in cluster '${cluster}'.
Expires: ${new Date(result.expiry).toLocaleString()}` },
        ],
      };
    }
  );

  server.tool(
    'delete_object_storage_bucket_certificate',
    'Delete SSL/TLS certificate for an Object Storage bucket',
    schemas.deleteBucketCertificateSchema.shape,
    async (params, extra) => {
      await client.objectStorage.deleteBucketCertificate(params.cluster, params.bucket);
      return {
        content: [
          { type: 'text', text: `Certificate for bucket '${params.bucket}' in cluster '${params.cluster}' has been deleted.` },
        ],
      };
    }
  );

  // Access keys
  server.tool(
    'list_object_storage_keys',
    'Get a list of all Object Storage keys',
    schemas.listKeysSchema.shape,
    async (params, extra) => {
      const result = await client.objectStorage.getKeys(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKeys(result.data) },
        ],
      };
    }
  );

  server.tool(
    'get_object_storage_key',
    'Get details for a specific Object Storage key',
    schemas.getKeySchema.shape,
    async (params, extra) => {
      const result = await client.objectStorage.getKey(params.id);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKey(result) },
        ],
      };
    }
  );

  server.tool(
    'create_object_storage_key',
    'Create a new Object Storage key',
    schemas.createKeySchema.shape,
    async (params, extra) => {
      const result = await client.objectStorage.createKey(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKey(result) },
        ],
      };
    }
  );

  server.tool(
    'update_object_storage_key',
    'Update an Object Storage key',
    schemas.updateKeySchema.shape,
    async (params, extra) => {
      const { id, ...updateData } = params;
      const result = await client.objectStorage.updateKey(id, updateData);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKey(result) },
        ],
      };
    }
  );

  server.tool(
    'delete_object_storage_key',
    'Delete an Object Storage key',
    schemas.deleteKeySchema.shape,
    async (params, extra) => {
      await client.objectStorage.deleteKey(params.id);
      return {
        content: [
          { type: 'text', text: `Object Storage key with ID ${params.id} has been deleted.` },
        ],
      };
    }
  );

  // Default access
  server.tool(
    'get_object_storage_default_bucket_access',
    'Get default bucket access configuration',
    schemas.getDefaultBucketAccessSchema.shape,
    async (_, extra) => {
      try {
        const result = await client.objectStorage.getDefaultBucketAccess();
        return {
          content: [
            { type: 'text', text: `Default Bucket Access:
Cluster: ${result.cluster}
Bucket: ${result.bucket_name}
Region: ${result.region}
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
          ],
        };
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          return {
            content: [
              { type: 'text', text: 'No default bucket access configuration found.' },
            ],
          };
        }
        throw error;
      }
    }
  );

  server.tool(
    'update_object_storage_default_bucket_access',
    'Update default bucket access configuration',
    schemas.updateDefaultBucketAccessSchema.shape,
    async (params, extra) => {
      const result = await client.objectStorage.updateDefaultBucketAccess(params);
      return {
        content: [
          { type: 'text', text: `Updated Default Bucket Access:
Cluster: ${result.cluster}
Bucket: ${result.bucket_name}
Region: ${result.region}
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
        ],
      };
    }
  );

  // Service
  server.tool(
    'cancel_object_storage',
    'Cancel Object Storage service',
    schemas.cancelObjectStorageSchema.shape,
    async (_, extra) => {
      await client.objectStorage.cancelObjectStorage();
      return {
        content: [
          { type: 'text', text: 'Object Storage service has been cancelled.' },
        ],
      };
    }
  );
}

/**
 * Formats an Object Storage cluster for display
 */
function formatObjectStorageCluster(cluster: ObjectStorageCluster): string {
  return `${cluster.id} (${cluster.region}, Status: ${cluster.status})`;
}

/**
 * Formats a list of Object Storage clusters for display
 */
function formatObjectStorageClusters(clusters: ObjectStorageCluster[]): string {
  if (clusters.length === 0) {
    return 'No Object Storage clusters found.';
  }

  return clusters.map(formatObjectStorageCluster).join('\n');
}

/**
 * Formats an Object Storage bucket for display
 */
function formatObjectStorageBucket(bucket: ObjectStorageBucket): string {
  const details = [
    `Bucket: ${bucket.label}`,
    `Cluster: ${bucket.cluster}`,
    `Region: ${bucket.region}`,
    `Created: ${new Date(bucket.created).toLocaleString()}`,
    `Size: ${formatBytes(bucket.size)}`,
    `Objects: ${bucket.objects}`,
    `Access Control: ${bucket.acl}`,
    `CORS Enabled: ${bucket.cors_enabled ? 'Yes' : 'No'}`,
    `Hostname: ${bucket.hostname}`
  ];

  return details.join('\n');
}

/**
 * Formats a list of Object Storage buckets for display
 */
function formatObjectStorageBuckets(buckets: ObjectStorageBucket[]): string {
  if (buckets.length === 0) {
    return 'No Object Storage buckets found.';
  }

  const rows = buckets.map(bucket => {
    return `${bucket.label} (Cluster: ${bucket.cluster}, Region: ${bucket.region}, Objects: ${bucket.objects}, Size: ${formatBytes(bucket.size)})`;
  });

  return rows.join('\n');
}

/**
 * Formats an Object Storage key for display
 */
function formatObjectStorageKey(key: ObjectStorageKey): string {
  const details = [
    `ID: ${key.id}`,
    `Label: ${key.label}`,
    `Access Key: ${key.access_key}`,
    `Secret Key: ${key.secret_key ? '********' : 'Not available'}`,
    `Limited: ${key.limited ? 'Yes' : 'No'}`,
    `Created: ${new Date(key.created).toLocaleString()}`
  ];

  if (key.bucket_access && key.bucket_access.length > 0) {
    details.push('Bucket Access:');
    key.bucket_access.forEach(access => {
      details.push(`  - ${access.cluster}/${access.bucket_name} (${access.permissions})`);
    });
  } else {
    details.push('Bucket Access: Full access to all buckets');
  }

  return details.join('\n');
}

/**
 * Formats a list of Object Storage keys for display
 */
function formatObjectStorageKeys(keys: ObjectStorageKey[]): string {
  if (keys.length === 0) {
    return 'No Object Storage keys found.';
  }

  const rows = keys.map(key => {
    const accessType = key.limited ? 'Limited' : 'Full';
    return `${key.label} (ID: ${key.id}, Access: ${key.access_key}, Type: ${accessType})`;
  });

  return rows.join('\n');
}

/**
 * Formats an Object Storage object for display
 */
function formatObjectStorageObject(obj: ObjectStorageObject): string {
  return `${obj.name} (Size: ${formatBytes(obj.size)}, Modified: ${new Date(obj.last_modified).toLocaleString()})`;
}

/**
 * Formats a list of Object Storage objects for display
 */
function formatObjectStorageObjects(objects: ObjectStorageObject[]): string {
  if (objects.length === 0) {
    return 'No objects found in bucket.';
  }

  return objects.map(formatObjectStorageObject).join('\n');
}

/**
 * Formats bytes into a human-readable string
 */
function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}