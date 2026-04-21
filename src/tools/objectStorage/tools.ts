import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';
import * as fs from 'fs';
import axios from 'axios';
import * as path from 'path';
import * as os from 'os';
import { URL } from 'url';
import * as mime from 'mime-types';

export function registerObjectStorageTools(server: FastMCP) {
  // Endpoints
  server.addTool({
    name: 'list_object_storage_endpoints',
    description: 'Get a list of all Object Storage endpoints with their types',
    parameters: mcpInput(schemas.listEndpointsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.getEndpoints(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Buckets
  server.addTool({
    name: 'list_object_storage_buckets',
    description: 'Get a list of all Object Storage buckets',
    parameters: mcpInput(schemas.listBucketsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.getBuckets(params);
      return JSON.stringify(result.data, null, 2);
    })
  });
  server.addTool({
    name: 'get_object_storage_bucket',
    description: 'Get details for a specific Object Storage bucket',
    parameters: mcpInput(schemas.getBucketSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      // The client implementation expects region (cluster in client code) and bucket name
      const result = await createClient(context).objectStorage.getBucket(
        params.region, 
        params.bucket  // Use bucket parameter from the schema for lookup
      );
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_object_storage_bucket',
    description: 'Create a new Object Storage bucket',
    parameters: mcpInput(schemas.createBucketSchema),
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
      const result = await createClient(context).objectStorage.createBucket(createParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_object_storage_bucket',
    description: 'Delete an Object Storage bucket',
    parameters: mcpInput(schemas.deleteBucketSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, ...data } = params;
      await createClient(context).objectStorage.deleteBucket(region, bucket);
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
    parameters: mcpInput(schemas.getBucketAccessSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, ...data } = params;
      const result = await createClient(context).objectStorage.getBucketAccess(region, bucket);
      return JSON.stringify(result, null, 2);
    })
  });
  // Objects
  server.addTool({
    name: 'list_object_storage_objects',
    description: 'List objects in an Object Storage bucket',
    parameters: mcpInput(schemas.listObjectsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, ...paginationParams } = params;
      const result = await createClient(context).objectStorage.getObjects(region, bucket, paginationParams);
      return JSON.stringify(result.data, null, 2);
    })
  });

  // SSL/TLS certificates
  server.addTool({
    name: 'get_object_storage_bucket_certificate',
    description: 'Get SSL/TLS certificate for an Object Storage bucket',
    parameters: mcpInput(schemas.getBucketCertificateSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
        const result = await createClient(context).objectStorage.getBucketCertificate(params.region, params.bucket);
        return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'upload_object_storage_bucket_certificate',
    description: 'Upload SSL/TLS certificate for an Object Storage bucket',
    parameters: mcpInput(schemas.uploadBucketCertificateSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, certificate, private_key } = params;
      const result = await createClient(context).objectStorage.uploadBucketCertificate(region, bucket, {
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
    parameters: mcpInput(schemas.deleteBucketCertificateSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).objectStorage.deleteBucketCertificate(params.region, params.bucket);
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
    parameters: mcpInput(schemas.listKeysSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.getKeys(params);
      return JSON.stringify(result.data, null, 2);
    })
  });
  server.addTool({
    name: 'get_object_storage_key',
    description: 'Get details for a specific Object Storage key',
    parameters: mcpInput(schemas.getKeySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.getKey(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_object_storage_key',
    description: 'Create a new Object Storage key',
    parameters: mcpInput(schemas.createKeySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.createKey(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_object_storage_key',
    description: 'Update an Object Storage key',
    parameters: mcpInput(schemas.updateKeySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...updateData } = params;
      const result = await createClient(context).objectStorage.updateKey(id, updateData);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_object_storage_key',
    description: 'Delete an Object Storage key',
    parameters: mcpInput(schemas.deleteKeySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).objectStorage.deleteKey(params.id);
      return {
        content: [
          { type: 'text', text: `Object Storage key with ID ${params.id} has been deleted.` },
        ],
      };
    })
  });

  // Object ACL Management
  server.addTool({
    name: 'update_object_acl',
    description: 'Update access control level (ACL) for an object in a bucket',
    parameters: mcpInput(schemas.updateObjectACLSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, name, acl } = params;
      await createClient(context).objectStorage.updateObjectACL(region, bucket, name, { acl });
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
    parameters: mcpInput(schemas.getObjectURLSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, name, ...urlParams } = params;
      
      // Ensure we're using the right parameter names for the API
      const apiParams = {
        name,
        ...urlParams
      };
      
      const result = await createClient(context).objectStorage.getObjectURL(region, bucket, apiParams);
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
    parameters: mcpInput(schemas.uploadObjectSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, object_path, source, content_type, acl, expires_in } = params;
      
      // Determine content type from file extension or parameter
      const determinedContentType = content_type || getContentType(object_path);
      
      // Get pre-signed URL for PUT operation
      const urlResult = await createClient(context).objectStorage.getObjectURL(region, bucket, {
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
        await createClient(context).objectStorage.updateObjectACL(region, bucket, object_path, { acl });
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
    parameters: mcpInput(schemas.downloadObjectSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, object_path, destination, expires_in } = params;
      
      // Get pre-signed URL for GET operation
      const result = await createClient(context).objectStorage.getObjectURL(region, bucket, {
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
    parameters: mcpInput(schemas.deleteObjectSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { region, bucket, object_path, expires_in } = params;
      
      // Get pre-signed URL for DELETE operation
      const result = await createClient(context).objectStorage.getObjectURL(region, bucket, {
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

  // Per-region bucket listing
  server.addTool({
    name: 'list_object_storage_buckets_in_region',
    description: 'List Object Storage buckets in a specific region',
    parameters: mcpInput(schemas.listBucketsInRegionSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { regionId, ...paginationParams } = params;
      const result = await createClient(context).objectStorage.getBucketsInRegion(regionId, paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  });

  // Object ACL Get
  server.addTool({
    name: 'get_object_acl',
    description: 'Get an Object Storage object ACL configuration',
    parameters: mcpInput(schemas.getObjectACLSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { regionId, bucket, name } = params;
      const result = await createClient(context).objectStorage.getObjectACL(regionId, bucket, name);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  });

  // Bucket Access Update (PUT)
  server.addTool({
    name: 'update_object_storage_bucket_access',
    description: 'Update access to an Object Storage bucket',
    parameters: mcpInput(schemas.putBucketAccessSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { regionId, bucket, ...data } = params;
      await createClient(context).objectStorage.putBucketAccess(regionId, bucket, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ status: 'success', message: `Bucket access updated for '${bucket}' in region '${regionId}'.` }, null, 2) },
        ],
      };
    })
  });

  // Object Storage Quotas
  server.addTool({
    name: 'list_object_storage_quotas',
    description: 'List Object Storage quotas',
    parameters: mcpInput(schemas.listObjectStorageQuotasSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.getQuotas(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  });

  server.addTool({
    name: 'get_object_storage_quota',
    description: 'Get an Object Storage quota',
    parameters: mcpInput(schemas.getObjectStorageQuotaSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.getQuota(params.objQuotaId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  });

  server.addTool({
    name: 'get_object_storage_quota_usage',
    description: 'Get Object Storage quota usage data',
    parameters: mcpInput(schemas.getObjectStorageQuotaUsageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.getQuotaUsage(params.objQuotaId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  });

  // Transfer Statistics
  server.addTool({
    name: 'get_object_storage_transfer',
    description: 'Get Object Storage transfer statistics',
    parameters: mcpInput(schemas.getTransferStatsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.getTransferStats();
      return JSON.stringify(result, null, 2);
    })
  });

  // Object Storage Types
  server.addTool({
    name: 'list_object_storage_types',
    description: 'Get a list of all available Object Storage types and prices, including any region-specific rates.',
    parameters: mcpInput(schemas.listObjectStorageTypesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).objectStorage.getTypes();
      return JSON.stringify(result, null, 2);
    })
  });
  
  // Service
  server.addTool({
    name: 'cancel_object_storage',
    description: 'Cancel Object Storage service',
    parameters: mcpInput(schemas.cancelObjectStorageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).objectStorage.cancelObjectStorage();
      return {
        content: [
          { type: 'text', text: 'Object Storage service has been cancelled.' },
        ],
      };
    })
  });
}

/**
 * Formats an Object Storage cluster for display
 */
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