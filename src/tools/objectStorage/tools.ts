import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, ObjectStorageBucket, ObjectStorageCluster, ObjectStorageKey, ObjectStorageObject } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';
import * as fs from 'fs';
import axios from 'axios';
import * as path from 'path';
import * as os from 'os';
import { URL } from 'url';
import * as mime from 'mime-types';

export function registerObjectStorageTools(server: McpServer, client: LinodeClient) {
  // Clusters
  server.tool(
    'list_object_storage_clusters',
    'Get a list of all Object Storage clusters',
    schemas.listClustersSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const clusters = await client.objectStorage.getClusters();
      return {
        content: [
          { type: 'text', text: formatObjectStorageClusters(clusters) },
        ],
      };
    }
  ));
  
  // Endpoints
  server.tool(
    'list_object_storage_endpoints',
    'Get a list of all Object Storage endpoints with their types',
    schemas.listEndpointsSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.objectStorage.getEndpoints(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageEndpoints(result.data) },
        ],
      };
    }
  ));

  // Buckets
  server.tool(
    'list_object_storage_buckets',
    'Get a list of all Object Storage buckets',
    schemas.listBucketsSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.objectStorage.getBuckets(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageBuckets(result.data) },
        ],
      };
    }
  ));

  server.tool(
    'get_object_storage_bucket',
    'Get details for a specific Object Storage bucket',
    schemas.getBucketSchema.shape,
    withErrorHandling(async (params, _extra) => {
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
    }
  ));

  server.tool(
    'create_object_storage_bucket',
    'Create a new Object Storage bucket',
    schemas.createBucketSchema.shape,
    withErrorHandling(async (params, _extra) => {
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
    }
  ));

  server.tool(
    'delete_object_storage_bucket',
    'Delete an Object Storage bucket',
    schemas.deleteBucketSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const { region, bucket, ...data } = params;
      await client.objectStorage.deleteBucket(region, bucket);
      return {
        content: [
          { type: 'text', text: `Bucket '${params.bucket}' in region '${params.region}' has been deleted.` },
        ],
      };
    }
  ));

  server.tool(
    'get_object_storage_bucket_access',
    'Get access configuration for an Object Storage bucket',
    schemas.getBucketAccessSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const { region, bucket, ...data } = params;
      const result = await client.objectStorage.getBucketAccess(region, bucket);
      return {
        content: [
          { type: 'text', text: `Bucket Access for '${bucket}':
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
        ],
      };
    }
  ));

  server.tool(
    'update_object_storage_bucket_access',
    'Update access configuration for an Object Storage bucket',
    schemas.updateBucketAccessSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const { region, bucket, ...data } = params;
      const result = await client.objectStorage.updateBucketAccess(region, bucket, data);
      return {
        content: [
          { type: 'text', text: `Updated Bucket Access for '${bucket}':
ACL: ${result.acl}
CORS Enabled: ${result.cors_enabled ? 'Yes' : 'No'}` },
        ],
      };
    }
  ));

  // Objects
  server.tool(
    'list_object_storage_objects',
    'List objects in an Object Storage bucket',
    schemas.listObjectsSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const { region, bucket, ...paginationParams } = params;
      const result = await client.objectStorage.getObjects(region, bucket, paginationParams);
      return {
        content: [
          { type: 'text', text: formatObjectStorageObjects(result.data) },
        ],
      };
    }
  ));

  // SSL/TLS certificates
  server.tool(
    'get_object_storage_bucket_certificate',
    'Get SSL/TLS certificate for an Object Storage bucket',
    schemas.getBucketCertificateSchema.shape,
    withErrorHandling(async (params, _extra) => {
        const result = await client.objectStorage.getBucketCertificate(params.region, params.bucket);
        return {
          content: [
            { type: 'text', text: `Certificate for '${params.bucket}':
Expires: ${new Date(result.expiry).toLocaleString()}` },
          ],
        };
    }
  ));

  server.tool(
    'upload_object_storage_bucket_certificate',
    'Upload SSL/TLS certificate for an Object Storage bucket',
    schemas.uploadBucketCertificateSchema.shape,
    withErrorHandling(async (params, _extra) => {
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
    }
  ));

  server.tool(
    'delete_object_storage_bucket_certificate',
    'Delete SSL/TLS certificate for an Object Storage bucket',
    schemas.deleteBucketCertificateSchema.shape,
    withErrorHandling(async (params, _extra) => {
      await client.objectStorage.deleteBucketCertificate(params.region, params.bucket);
      return {
        content: [
          { type: 'text', text: `Certificate for bucket '${params.bucket}' in region '${params.region}' has been deleted.` },
        ],
      };
    }
  ));

  // Access keys
  server.tool(
    'list_object_storage_keys',
    'Get a list of all Object Storage keys',
    schemas.listKeysSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.objectStorage.getKeys(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKeys(result.data) },
        ],
      };
    }
  ));

  server.tool(
    'get_object_storage_key',
    'Get details for a specific Object Storage key',
    schemas.getKeySchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.objectStorage.getKey(params.id);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKey(result) },
        ],
      };
    }
  ));

  server.tool(
    'create_object_storage_key',
    'Create a new Object Storage key',
    schemas.createKeySchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.objectStorage.createKey(params);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKey(result) },
        ],
      };
    }
  ));

  server.tool(
    'update_object_storage_key',
    'Update an Object Storage key',
    schemas.updateKeySchema.shape,
    withErrorHandling(async (params, _extra) => {
      const { id, ...updateData } = params;
      const result = await client.objectStorage.updateKey(id, updateData);
      return {
        content: [
          { type: 'text', text: formatObjectStorageKey(result) },
        ],
      };
    }
  ));

  server.tool(
    'delete_object_storage_key',
    'Delete an Object Storage key',
    schemas.deleteKeySchema.shape,
    withErrorHandling(async (params, _extra) => {
      await client.objectStorage.deleteKey(params.id);
      return {
        content: [
          { type: 'text', text: `Object Storage key with ID ${params.id} has been deleted.` },
        ],
      };
    }
  ));

  // Default access
  server.tool(
    'get_object_storage_default_bucket_access',
    'Get default bucket access configuration',
    schemas.getDefaultBucketAccessSchema.shape,
    withErrorHandling(async (params, _extra) => {
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
    }
  ));

  server.tool(
    'update_object_storage_default_bucket_access',
    'Update default bucket access configuration',
    schemas.updateDefaultBucketAccessSchema.shape,
    withErrorHandling(async (params, _extra) => {
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
    }
  ));

  // Object ACL Management
  server.tool(
    'update_object_acl',
    'Update access control level (ACL) for an object in a bucket',
    schemas.updateObjectACLSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const { region, bucket, name, acl } = params;
      await client.objectStorage.updateObjectACL(region, bucket, name, { acl });
      return {
        content: [
          { type: 'text', text: `ACL for object '${name}' in bucket '${bucket}' has been updated to '${acl}'.` },
        ],
      };
    }
  ));

  // Object URL Generation
  server.tool(
    'generate_object_url',
    'Generate a pre-signed URL for an object in a bucket',
    schemas.getObjectURLSchema.shape,
    withErrorHandling(async (params, _extra) => {
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
    }
  ));

  // Upload Object
  server.tool(
    'upload_object',
    'Upload and create an new object to an Object Storage bucket',
    schemas.uploadObjectSchema.shape,
    withErrorHandling(async (params, _extra) => {
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
    }
  ));

  // Download Object
  server.tool(
    'download_object',
    'Download an object from a bucket and save it to a local file',
    schemas.downloadObjectSchema.shape,
    withErrorHandling(async (params, _extra) => {
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
    }
  ));

  // Delete Object
  server.tool(
    'delete_object',
    'Delete an object from an Object Storage bucket',
    schemas.deleteObjectSchema.shape,
    withErrorHandling(async (params, _extra) => {
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
    }
  ));

  // Transfer Statistics
  server.tool(
    'get_object_storage_transfer',
    'Get Object Storage transfer statistics',
    schemas.getTransferStatsSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.objectStorage.getTransferStats();
      return {
        content: [
          { type: 'text', text: formatTransferStats(result) },
        ],
      };
    }
  ));

  // Object Storage Types
  server.tool(
    'list_object_storage_types',
    'Get a list of all available Object Storage types and prices, including any region-specific rates.',
    schemas.listObjectStorageTypesSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.objectStorage.getTypes();
      return {
        content: [
          { type: 'text', text: formatObjectStorageTypes(result) },
        ],
      };
    }
  ));
  
  // Service
  server.tool(
    'cancel_object_storage',
    'Cancel Object Storage service',
    schemas.cancelObjectStorageSchema.shape,
    withErrorHandling(async (params, _extra) => {
      await client.objectStorage.cancelObjectStorage();
      return {
        content: [
          { type: 'text', text: 'Object Storage service has been cancelled.' },
        ],
      };
    }
  ));
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