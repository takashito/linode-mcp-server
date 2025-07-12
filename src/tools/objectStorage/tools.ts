import { FastMCP } from 'fastmcp';
import { LinodeClient, ObjectStorageBucket, ObjectStorageCluster, ObjectStorageKey, ObjectStorageObject } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';
import * as fs from 'fs';
import axios from 'axios';
import * as path from 'path';
import * as os from 'os';
import { URL } from 'url';
import * as mime from 'mime-types';

export function registerObjectStorageTools(server: FastMCP, client: LinodeClient) {
  // Clusters
  server.addTool({
    name: 'list_object_storage_clusters',
    description: 'Get a list of all Object Storage clusters',
    parameters: schemas.listClustersSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const clusters = await client.objectStorage.getClusters();
      return {
        content: [
          { type: 'text', text: formatObjectStorageClusters(clusters) },
        ],
      };
    })
  });
  
  // Endpoints
  server.addTool({
    name: 'list_object_storage_endpoints',
    description: 'Get a list of all Object Storage endpoints with their types',
    parameters: schemas.listEndpointsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.objectStorage.getEndpoints(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageEndpoints(result.data) },
        ],
      };
    })
  });

  // Buckets
  server.addTool({
    name: 'list_object_storage_buckets',
    description: 'Get a list of all Object Storage buckets',
    parameters: schemas.listBucketsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.objectStorage.getBuckets(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageBuckets(result.data) },
        ],
      };
    })
  });
  server.addTool({
    name: 'get_object_storage_bucket',
    description: 'Get details for a specific Object Storage bucket',
    parameters: schemas.getBucketSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      // The client implementation expects region (cluster in client code) and bucket name
      const result = await client.objectStorage.getBucket(
        params.region, 
        params.bucket  // Use bucket parameter from the schema for lookup
      );
      return {
        content: [
          { type: 'text', text: formatObjectStorageBucket(result) },
        ],
      };
    })
  });
  server.addTool({
    name: 'create_object_storage_bucket',
    description: 'Create a new Object Storage bucket',
    parameters: schemas.createBucketSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      // Ensure parameters match the client's expectations
      // The Linode API expects 'label' for the bucket name and 'region' for the location
      const createParams = {
        label: params.label,
        region: params.region,
        endpoint_type: params.endpoint_type,
        acl: params.acl,
        cors_enabled: params.cors_enabled
      };
      const result = await client.objectStorage.createBucket(createParams);
      return {
        content: [
          { type: 'text', text: formatObjectStorageBucket(result) },
        ],
      };
    })
  });
  server.addTool({
    name: 'delete_object_storage_bucket',
    description: 'Delete an Object Storage bucket',
    parameters: schemas.deleteBucketSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, ...data } = params;
      await client.objectStorage.deleteBucket(region, bucket);
      return {
        content: [
          { type: 'text', text: `Bucket '${params.bucket}' in region '${params.region}' has been deleted.` },
        ],
      };
    })
  });
  server.addTool({
    name: 'get_object_storage_bucket_access',
    description: 'Get access configuration for an Object Storage bucket',
    parameters: schemas.getBucketAccessSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, ...data } = params;
      const result = await client.objectStorage.getBucketAccess(region, bucket);
      return {
        content: [
          { type: 'text', text: `Bucket Access for '${bucket}':
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
        ],
      };
    })
  });
  server.addTool({
    name: 'update_object_storage_bucket_access',
    description: 'Update access configuration for an Object Storage bucket',
    parameters: schemas.updateBucketAccessSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, ...data } = params;
      const result = await client.objectStorage.updateBucketAccess(region, bucket, data);
      return {
        content: [
          { type: 'text', text: `Updated Bucket Access for '${bucket}':
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
        ],
      };
    })
  });

  // Objects
  server.addTool({
    name: 'list_object_storage_objects',
    description: 'List objects in an Object Storage bucket',
    parameters: schemas.listObjectsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, ...paginationParams } = params;
      const result = await client.objectStorage.getObjects(region, bucket, paginationParams);
      return {
        content: [
          { type: 'text', text: formatObjectStorageObjects(result.data) },
        ],
      };
    })
  });

  // SSL/TLS certificates
  server.addTool({
    name: 'get_object_storage_bucket_certificate',
    description: 'Get SSL/TLS certificate for an Object Storage bucket',
    parameters: schemas.getBucketCertificateSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
        const result = await client.objectStorage.getBucketCertificate(params.region, params.bucket);
        return {
          content: [
            { type: 'text', text: `Certificate for '${params.bucket}':
Expires: ${new Date(result.expiry).toLocaleString()}` },
          ],
        };
    })
  });
  server.addTool({
    name: 'upload_object_storage_bucket_certificate',
    description: 'Upload SSL/TLS certificate for an Object Storage bucket',
    parameters: schemas.uploadBucketCertificateSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, certificate, private_key } = params;
      const result = await client.objectStorage.uploadBucketCertificate(region, bucket, {
        certificate,
        private_key,
      });
      return {
        content: [
          { type: 'text', text: `Certificate uploaded for bucket '${bucket}' in region '${region}'.
Expires: ${new Date(result.expiry).toLocaleString()}` },
        ],
      };
    })
  });
  server.addTool({
    name: 'delete_object_storage_bucket_certificate',
    description: 'Delete SSL/TLS certificate for an Object Storage bucket',
    parameters: schemas.deleteBucketCertificateSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.objectStorage.deleteBucketCertificate(params.region, params.bucket);
      return {
        content: [
          { type: 'text', text: `Certificate for bucket '${params.bucket}' in region '${params.region}' has been deleted.` },
        ],
      };
    })
  });

  // Access keys
  server.addTool({
    name: 'list_object_storage_keys',
    description: 'Get a list of all Object Storage keys',
    parameters: schemas.listKeysSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.objectStorage.getKeys(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKeys(result.data) },
        ],
      };
    })
  });
  server.addTool({
    name: 'get_object_storage_key',
    description: 'Get details for a specific Object Storage key',
    parameters: schemas.getKeySchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.objectStorage.getKey(params.id);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKey(result) },
        ],
      };
    })
  });
  server.addTool({
    name: 'create_object_storage_key',
    description: 'Create a new Object Storage key',
    parameters: schemas.createKeySchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.objectStorage.createKey(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKey(result) },
        ],
      };
    })
  });
  server.addTool({
    name: 'update_object_storage_key',
    description: 'Update an Object Storage key',
    parameters: schemas.updateKeySchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...updateData } = params;
      const result = await client.objectStorage.updateKey(id, updateData);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKey(result) },
        ],
      };
    })
  });
  server.addTool({
    name: 'delete_object_storage_key',
    description: 'Delete an Object Storage key',
    parameters: schemas.deleteKeySchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.objectStorage.deleteKey(params.id);
      return {
        content: [
          { type: 'text', text: `Object Storage key with ID ${params.id} has been deleted.` },
        ],
      };
    })
  });

  // Default access
  server.addTool({
    name: 'get_object_storage_default_bucket_access',
    description: 'Get default bucket access configuration',
    parameters: schemas.getDefaultBucketAccessSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.objectStorage.getDefaultBucketAccess();
      return {
        content: [
          { type: 'text', text: `Default Bucket Access:
Region: ${result.region}
Bucket: ${result.bucket_name}
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
        ],
      };
    })
  });
  server.addTool({
    name: 'update_object_storage_default_bucket_access',
    description: 'Update default bucket access configuration',
    parameters: schemas.updateDefaultBucketAccessSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.objectStorage.updateDefaultBucketAccess(params);
      return {
        content: [
          { type: 'text', text: `Updated Default Bucket Access:
Region: ${result.region}
Bucket: ${result.bucket_name}
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
        ],
      };
    })
  });

  // Object ACL Management
  server.addTool({
    name: 'update_object_acl',
    description: 'Update access control level (ACL) for an object in a bucket',
    parameters: schemas.updateObjectACLSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, name, acl } = params;
      await client.objectStorage.updateObjectACL(region, bucket, name, { acl });
      return {
        content: [
          { type: 'text', text: `ACL for object '${name}' in bucket '${bucket}' has been updated to '${acl}'.` },
        ],
      };
    })
  });

  // Object URL Generation
  server.addTool({
    name: 'generate_object_url',
    description: 'Generate a pre-signed URL for an object in a bucket',
    parameters: schemas.getObjectURLSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, name, ...urlParams } = params;
      
      // Ensure we're using the right parameter names for the API
      const apiParams = {
        name,
        ...urlParams
      };
      
      const result = await client.objectStorage.getObjectURL(region, bucket, apiParams);
      return {
        content: [
          { type: 'text', text: `Pre-signed URL for object '${name}' in bucket '${bucket}':

${result.url}

Note: This URL is temporary and will expire after ${params.expires_in || 3600} seconds.` },
        ],
      };
    })
  });

  // Upload Object
  server.addTool({
    name: 'upload_object',
    description: 'Upload and create an new object to an Object Storage bucket',
    parameters: schemas.uploadObjectSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, object_path, source, content_type, acl, expires_in } = params;
      
      // Determine content type from file extension or parameter
      const determinedContentType = content_type || getContentType(object_path);
      
      // Get pre-signed URL for PUT operation
      const urlResult = await client.objectStorage.getObjectURL(region, bucket, {
        name: object_path,
        method: 'PUT',
        expires_in: expires_in || 3600,
        content_type: determinedContentType
      });
      
      // Get data from source based on type
      let data: Buffer;
      let dataSource: string;
      
      if (isURL(source)) {
        data = await fetchFromURL(source);
        dataSource = 'URL';
      } else if (isFilePath(source)) {
        data = await readFromFile(source);
        dataSource = 'File';
      } else {
        // Treat as raw string content
        data = Buffer.from(source);
        dataSource = 'String content';
      }
      
      // Upload to pre-signed URL
      await axios.put(urlResult.url, data, {
        headers: {
          'Content-Type': determinedContentType
        }
      });
      
      // Set ACL if provided
      if (acl) {
        await client.objectStorage.updateObjectACL(region, bucket, object_path, { acl });
      }
      
      return {
        content: [
          { type: 'text', text: `Successfully uploaded object '${object_path}' to bucket '${bucket}'.
Source: ${dataSource}
Size: ${formatBytes(data.length)}
Content Type: ${determinedContentType}
ACL: ${acl || 'Default bucket ACL'}` },
        ],
      };
    })
  });

  // Download Object
  server.addTool({
    name: 'download_object',
    description: 'Download an object from a bucket and save it to a local file',
    parameters: schemas.downloadObjectSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, object_path, destination, expires_in } = params;
      
      // Get pre-signed URL for GET operation
      const result = await client.objectStorage.getObjectURL(region, bucket, {
        name: object_path,
        method: 'GET',
        expires_in: expires_in || 3600
      });
        
      // If destination is provided, download the file
      if (destination) {
        // Download the file to the specified location
        const downloadResult = await downloadToFile(result.url, destination);
        
        return {
          content: [
            { type: 'text', text: `Successfully downloaded '${object_path}' from bucket '${bucket}'.
Saved to: ${downloadResult.filePath}
Size: ${formatBytes(downloadResult.size)}
Content Type: ${getContentType(object_path)}` },
          ],
        };
      }
        
      // Get the appropriate download directory (Downloads folder or home directory)
      const downloadDir = getDownloadDirectory();
      const localFilename = path.basename(object_path);
      const localPath = path.join(downloadDir, localFilename);
      
      // Download the file
      const downloadResult = await downloadToFile(result.url, localPath);
      
      return {
        content: [
          { type: 'text', text: `Successfully downloaded '${object_path}' from bucket '${bucket}'.
Saved to: ${downloadResult.filePath}
Size: ${formatBytes(downloadResult.size)}
Content Type: ${getContentType(object_path)}` },
        ],
      };
    })
  });

  // Delete Object
  server.addTool({
    name: 'delete_object',
    description: 'Delete an object from an Object Storage bucket',
    parameters: schemas.deleteObjectSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, object_path, expires_in } = params;
      
      // Get pre-signed URL for DELETE operation
      const result = await client.objectStorage.getObjectURL(region, bucket, {
        name: object_path,
        method: 'DELETE',
        expires_in: expires_in || 3600
      });
      
      // Execute the DELETE request
      await axios.delete(result.url);
      
      return {
        content: [
          { type: 'text', text: `Successfully deleted object '${object_path}' from bucket '${bucket}'.` },
        ],
      };
    })
  });

  // Transfer Statistics
  server.addTool({
    name: 'get_object_storage_transfer',
    description: 'Get Object Storage transfer statistics',
    parameters: schemas.getTransferStatsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.objectStorage.getTransferStats();
      return {
        content: [
          { type: 'text', text: formatTransferStats(result) },
        ],
      };
    })
  });

  // Object Storage Types
  server.addTool({
    name: 'list_object_storage_types',
    description: 'Get a list of all available Object Storage types and prices, including any region-specific rates.',
    parameters: schemas.listObjectStorageTypesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.objectStorage.getTypes();
      return {
        content: [
          { type: 'text', text: formatObjectStorageTypes(result) },
        ],
      };
    })
  });
  
  // Service
  server.addTool({
    name: 'cancel_object_storage',
    description: 'Cancel Object Storage service',
    parameters: schemas.cancelObjectStorageSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.objectStorage.cancelObjectStorage();
      return {
        content: [
          { type: 'text', text: 'Object Storage service has been cancelled.' },
        ],
      };
    })
  });
}

/**
 * Formats transfer statistics for display
 */
function formatTransferStats(stats: {
  used: number;
  billable: number;
  quota: number;
  regions: {
    region: string;
    used: number;
    billable: number;
    quota: number;
  }[];
    }): string {
  const overall = [
    'Overall Transfer Statistics:',
    `Used: ${formatBytes(stats.used)}`,
    `Billable: ${formatBytes(stats.billable)}`,
    `Quota: ${formatBytes(stats.quota)}`,
    `Utilization: ${((stats.used / stats.quota) * 100).toFixed(2)}%`,
    '',
    'Transfer by Region:'
  ];

  if (stats.regions && stats.regions.length > 0) {
    stats.regions.forEach(region => {
      overall.push(`  Region: ${region.region}`);
      overall.push(`    Used: ${formatBytes(region.used)}`);
      overall.push(`    Billable: ${formatBytes(region.billable)}`);
      overall.push(`    Quota: ${formatBytes(region.quota)}`);
      overall.push(`    Utilization: ${((region.used / region.quota) * 100).toFixed(2)}%`);
    });
  } else {
    overall.push('  No region-specific data available.');
  }

  return overall.join('\n');
}

/**
 * Formats Object Storage types for display
 */
function formatObjectStorageTypes(types: {
  id: string;
  label: string;
  storage_price: number;
  transfer_price: number;
}[]): string {
  if (types.length === 0) {
      return 'No Object Storage types found.';
  }

  const headers = [
    'ID | Label | Storage Price | Transfer Price',
    '----|-------|--------------|---------------'
  ];

  const rows = types.map(type => {
      return `${type.id} | ${type.label} | $${type.storage_price.toFixed(4)}/GB | $${type.transfer_price.toFixed(4)}/GB`;
    });

  return headers.concat(rows).join('\n');
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
      return `${bucket.label} (Region: ${bucket.region}, Objects: ${bucket.objects}, Size: ${formatBytes(bucket.size)})`;
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
    `Secret Key: ${key.secret_key}`,
    `Limited: ${key.limited ? 'Yes' : 'No'}`,
    `Created: ${new Date(key.created).toLocaleString()}`
  ];

  if (key.bucket_access && key.bucket_access.length > 0) {
    details.push('Bucket Access:');
    key.bucket_access.forEach(access => {
      details.push(`  - ${access.region}/${access.bucket_name} (${access.permissions})`);
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
 * Formats an endpoint for display
 */
function formatEndpoint(endpoint: { region: string; endpoint_type: string; s3_endpoint: string | null }): string {
  const s3Endpoint = endpoint.s3_endpoint || 'Not available';
  return `Region: ${endpoint.region}, Type: ${endpoint.endpoint_type}, Endpoint: ${s3Endpoint}`;
}

/**
 * Formats a list of Object Storage endpoints for display
 */
function formatObjectStorageEndpoints(endpoints: { region: string; endpoint_type: string; s3_endpoint: string | null }[]): string {
  if (endpoints.length === 0) {
      return 'No Object Storage endpoints found.';
  }

  return endpoints.map(formatEndpoint).join('\n');
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

/**
 * Determines if a string is a URL
 */
function isURL(str: string): boolean {
  try {
    new URL(str);
    return str.startsWith('http://') || str.startsWith('https://');
  } catch {
      return false;
  }
}

/**
 * Determines if a string is likely a file path
 */
function isFilePath(str: string): boolean {
  // Check for Unix-like paths
  const unixPathPattern = str.startsWith('/') || str.includes('./') || str.includes('../');
  
  // Check for Windows paths (drive letter or UNC path)
  const windowsDrivePattern = /^[a-zA-Z]:[/\\]/.test(str);
  const windowsUNCPattern = /^\\\\/.test(str);
  
  return unixPathPattern || windowsDrivePattern || windowsUNCPattern;
}

/**
 * Gets data from a URL
 */
async function fetchFromURL(url: string): Promise<Buffer> {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } catch (error: any) {
    throw new Error(`Failed to fetch from URL: ${error.message}`);
  }
}

/**
 * Reads data from a file
 */
async function readFromFile(filePath: string): Promise<Buffer> {
  try {
      return await fs.promises.readFile(filePath);
  } catch (error: any) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}

/**
 * Downloads data from a URL and saves it to a file
 */
async function downloadToFile(url: string, destinationPath: string): Promise<{ filePath: string, size: number }> {
  try {
    // Get the data from the URL
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    
    // Make sure the directory exists
    const dirname = path.dirname(destinationPath);
    await fs.promises.mkdir(dirname, { recursive: true });
    
    // Write the file
    await fs.promises.writeFile(destinationPath, response.data);
    
    return {
      filePath: destinationPath,
      size: response.data.length
    };
  } catch (error: any) {
    throw new Error(`Failed to download file: ${error.message}`);
  }
}

/**
 * Gets content type based on file path or URL
 */
function getContentType(source: string): string {
  if (source.includes('.')) {
    const extension = source.split('.').pop()?.toLowerCase();
    if (extension) {
      const mimeType = mime.lookup(extension);
      if (mimeType) {
      return mimeType;
      }
    }
  }
  return 'application/octet-stream'; // Default if no extension or unknown type
}

/**
 * Gets the most appropriate download directory path based on OS
 */
function getDownloadDirectory(): string {
  const homeDir = os.homedir();
  
  // Try standard download directories based on OS
  if (process.platform === 'win32') {
    // Windows: First try Downloads folder in user's home directory
    const windowsDownloads = path.join(homeDir, 'Downloads');
    if (fs.existsSync(windowsDownloads)) {
      return windowsDownloads;
    }
  } else if (process.platform === 'darwin') {
    // macOS: Check standard Downloads directory
    const macDownloads = path.join(homeDir, 'Downloads');
    if (fs.existsSync(macDownloads)) {
      return macDownloads;
    }
  } else {
    // Linux/Unix: Check standard XDG downloads directory or fallback
    // Try XDG user directories first if defined
    try {
      // Check if XDG_DOWNLOAD_DIR is defined in user-dirs.dirs
      const xdgConfigPath = path.join(homeDir, '.config', 'user-dirs.dirs');
      if (fs.existsSync(xdgConfigPath)) {
        const content = fs.readFileSync(xdgConfigPath, 'utf-8');
        const match = content.match(/XDG_DOWNLOAD_DIR="([^"]+)"/);
        if (match && match[1]) {
          let downloadDir = match[1].replace('$HOME', homeDir);
          // Handle tilde expansion
          if (downloadDir.startsWith('~/')) {
            downloadDir = path.join(homeDir, downloadDir.substring(2));
          }
          if (fs.existsSync(downloadDir)) {
      return downloadDir;
          }
        }
      }
    } catch (error) {
      // Ignore errors reading XDG config and fall back
    }
    
    // Standard Linux fallback to ~/Downloads if it exists
    const linuxDownloads = path.join(homeDir, 'Downloads');
    if (fs.existsSync(linuxDownloads)) {
      return linuxDownloads;
    }
  }
  
  // Default fallback to user's home directory if no Downloads folder exists
  return homeDir;
}