import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createClient } from './client';
import { OperationsManager } from './operations';
import * as schemas from './tools';

export interface ServerOptions {
  token: string;
}

/**
 * Creates and starts a Linode MCP Server
 */
export function startServer(options: ServerOptions) {
  const server = new McpServer({
    name: 'linode-mcp-server',
    version: '1.0.0',
    description: 'MCP server for Linode API integration',
  });

  // Create Linode client with the provided token
  const client = createClient(options.token);
  const operations = new OperationsManager(client);

  // Register instance tools
  server.tool(
    'list_instances',
    'Get a list of all Linode instances',
    schemas.listInstancesSchema.shape,
    async (params, extra) => {
      const result = await operations.instances.listInstances(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_instance',
    'Get details for a specific Linode instance',
    schemas.getInstanceSchema.shape,
    async (params, extra) => {
      const result = await operations.instances.getInstance(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_instance',
    'Create a new Linode instance',
    schemas.createInstanceSchema.shape,
    async (params, extra) => {
      const result = await operations.instances.createInstance(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'reboot_instance',
    'Reboot a Linode instance',
    schemas.rebootInstanceSchema.shape,
    async (params, extra) => {
      const result = await operations.instances.rebootInstance(params.id, params.config_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'boot_instance',
    'Power on a Linode instance',
    schemas.bootInstanceSchema.shape,
    async (params, extra) => {
      const result = await operations.instances.bootInstance(params.id, params.config_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'shutdown_instance',
    'Power off a Linode instance',
    schemas.shutdownInstanceSchema.shape,
    async (params, extra) => {
      const result = await operations.instances.shutdownInstance(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_instance',
    'Delete a Linode instance',
    schemas.deleteInstanceSchema.shape,
    async (params, extra) => {
      const result = await operations.instances.deleteInstance(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'resize_instance',
    'Resize a Linode instance',
    schemas.resizeInstanceSchema.shape,
    async (params, extra) => {
      const result = await operations.instances.resizeInstance(
        params.id,
        params.type,
        params.allow_auto_disk_resize
      );
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Register volume tools
  server.tool(
    'list_volumes',
    'Get a list of all volumes',
    schemas.listVolumesSchema.shape,
    async (params, extra) => {
      const result = await operations.volumes.listVolumes(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_volume',
    'Get details for a specific volume',
    schemas.getVolumeSchema.shape,
    async (params, extra) => {
      const result = await operations.volumes.getVolume(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_volume',
    'Create a new volume',
    schemas.createVolumeSchema.shape,
    async (params, extra) => {
      const result = await operations.volumes.createVolume(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_volume',
    'Delete a volume',
    schemas.deleteVolumeSchema.shape,
    async (params, extra) => {
      const result = await operations.volumes.deleteVolume(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'attach_volume',
    'Attach a volume to a Linode instance',
    schemas.attachVolumeSchema.shape,
    async (params, extra) => {
      const result = await operations.volumes.attachVolume(params.id, {
        linode_id: params.linode_id,
        config_id: params.config_id,
      });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'detach_volume',
    'Detach a volume from a Linode instance',
    schemas.detachVolumeSchema.shape,
    async (params, extra) => {
      const result = await operations.volumes.detachVolume(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'resize_volume',
    'Resize a volume',
    schemas.resizeVolumeSchema.shape,
    async (params, extra) => {
      const result = await operations.volumes.resizeVolume(params.id, params.size);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Register domain tools
  server.tool(
    'list_domains',
    'Get a list of all domains',
    schemas.listDomainsSchema.shape,
    async (params, extra) => {
      const result = await operations.domains.listDomains(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_domain',
    'Get details for a specific domain',
    schemas.getDomainSchema.shape,
    async (params, extra) => {
      const result = await operations.domains.getDomain(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_domain',
    'Create a new domain',
    schemas.createDomainSchema.shape,
    async (params, extra) => {
      const result = await operations.domains.createDomain(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_domain',
    'Delete a domain',
    schemas.deleteDomainSchema.shape,
    async (params, extra) => {
      const result = await operations.domains.deleteDomain(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_domain_records',
    'Get a list of all domain records for a domain',
    schemas.listDomainRecordsSchema.shape,
    async (params, extra) => {
      const result = await operations.domains.listDomainRecords(params.domain_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_domain_record',
    'Create a new domain record',
    schemas.createDomainRecordSchema.shape,
    async (params, extra) => {
      const { domain_id, ...recordParams } = params;
      const result = await operations.domains.createDomainRecord(domain_id, recordParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_domain_record',
    'Update a domain record',
    schemas.updateDomainRecordSchema.shape,
    async (params, extra) => {
      const { domain_id, record_id, ...recordParams } = params;
      const result = await operations.domains.updateDomainRecord(domain_id, record_id, recordParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_domain_record',
    'Delete a domain record',
    schemas.deleteDomainRecordSchema.shape,
    async (params, extra) => {
      const result = await operations.domains.deleteDomainRecord(params.domain_id, params.record_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Register NodeBalancer tools
  server.tool(
    'list_nodebalancers',
    'Get a list of all NodeBalancers',
    schemas.listNodeBalancersSchema.shape,
    async (params, extra) => {
      const result = await operations.nodeBalancers.listNodeBalancers(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_nodebalancer',
    'Get details for a specific NodeBalancer',
    schemas.getNodeBalancerSchema.shape,
    async (params, extra) => {
      const result = await operations.nodeBalancers.getNodeBalancer(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_nodebalancer',
    'Create a new NodeBalancer',
    schemas.createNodeBalancerSchema.shape,
    async (params, extra) => {
      const result = await operations.nodeBalancers.createNodeBalancer(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_nodebalancer',
    'Delete a NodeBalancer',
    schemas.deleteNodeBalancerSchema.shape,
    async (params, extra) => {
      const result = await operations.nodeBalancers.deleteNodeBalancer(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_nodebalancer_configs',
    'Get a list of config nodes for a NodeBalancer',
    schemas.listNodeBalancerConfigsSchema.shape,
    async (params, extra) => {
      const result = await operations.nodeBalancers.listNodeBalancerConfigs(params.nodebalancer_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_nodebalancer_config',
    'Create a new config for a NodeBalancer',
    schemas.createNodeBalancerConfigSchema.shape,
    async (params, extra) => {
      const { nodebalancer_id, ...configParams } = params;
      const result = await operations.nodeBalancers.createNodeBalancerConfig(nodebalancer_id, configParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_nodebalancer_config',
    'Delete a NodeBalancer config',
    schemas.deleteNodeBalancerConfigSchema.shape,
    async (params, extra) => {
      const result = await operations.nodeBalancers.deleteNodeBalancerConfig(params.nodebalancer_id, params.config_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_nodebalancer_nodes',
    'Get a list of nodes for a NodeBalancer config',
    schemas.listNodeBalancerNodesSchema.shape,
    async (params, extra) => {
      const result = await operations.nodeBalancers.listNodeBalancerNodes(params.nodebalancer_id, params.config_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_nodebalancer_node',
    'Create a new node for a NodeBalancer config',
    schemas.createNodeBalancerNodeSchema.shape,
    async (params, extra) => {
      const { nodebalancer_id, config_id, ...nodeParams } = params;
      const result = await operations.nodeBalancers.createNodeBalancerNode(nodebalancer_id, config_id, nodeParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_nodebalancer_node',
    'Delete a node from a NodeBalancer config',
    schemas.deleteNodeBalancerNodeSchema.shape,
    async (params, extra) => {
      const result = await operations.nodeBalancers.deleteNodeBalancerNode(
        params.nodebalancer_id,
        params.config_id,
        params.node_id
      );
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Register Object Storage tools
  server.tool(
    'list_object_storage_clusters',
    'Get a list of all Object Storage clusters',
    schemas.listClustersSchema.shape,
    async (_, extra) => {
      const result = await operations.objectStorage.listClusters();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_object_storage_buckets',
    'Get a list of all Object Storage buckets',
    schemas.listBucketsSchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.listBuckets(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_object_storage_bucket',
    'Get details for a specific Object Storage bucket',
    schemas.getBucketSchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.getBucket(params.cluster_id, params.bucket_name);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_object_storage_bucket',
    'Create a new Object Storage bucket',
    schemas.createBucketSchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.createBucket(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_object_storage_bucket',
    'Delete an Object Storage bucket',
    schemas.deleteBucketSchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.deleteBucket(params.cluster_id, params.bucket_name);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_object_storage_bucket_access',
    'Get access configuration for an Object Storage bucket',
    schemas.getBucketAccessSchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.getBucketAccess(params.cluster_id, params.bucket_name);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_object_storage_bucket_access',
    'Update access configuration for an Object Storage bucket',
    schemas.updateBucketAccessSchema.shape,
    async (params, extra) => {
      const { cluster_id, bucket_name, ...accessParams } = params;
      const result = await operations.objectStorage.updateBucketAccess(cluster_id, bucket_name, accessParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_object_storage_objects',
    'List objects in an Object Storage bucket',
    schemas.listObjectsSchema.shape,
    async (params, extra) => {
      const { cluster_id, bucket_name, ...listParams } = params;
      const result = await operations.objectStorage.listObjects(cluster_id, bucket_name, listParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_object_storage_bucket_certificate',
    'Get SSL/TLS certificate for an Object Storage bucket',
    schemas.getBucketCertificateSchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.getBucketCertificate(params.cluster_id, params.bucket_name);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'upload_object_storage_bucket_certificate',
    'Upload SSL/TLS certificate for an Object Storage bucket',
    schemas.uploadBucketCertificateSchema.shape,
    async (params, extra) => {
      const { cluster_id, bucket_name, ...certParams } = params;
      const result = await operations.objectStorage.uploadBucketCertificate(cluster_id, bucket_name, certParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_object_storage_bucket_certificate',
    'Delete SSL/TLS certificate for an Object Storage bucket',
    schemas.deleteBucketCertificateSchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.deleteBucketCertificate(params.cluster_id, params.bucket_name);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_object_storage_keys',
    'Get a list of all Object Storage keys',
    schemas.listKeysSchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.listKeys(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_object_storage_key',
    'Get details for a specific Object Storage key',
    schemas.getKeySchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.getKey(params.key_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_object_storage_key',
    'Create a new Object Storage key',
    schemas.createKeySchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.createKey(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_object_storage_key',
    'Update an Object Storage key',
    schemas.updateKeySchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.updateKey(params.key_id, { label: params.label });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_object_storage_key',
    'Delete an Object Storage key',
    schemas.deleteKeySchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.deleteKey(params.key_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_object_storage_default_bucket_access',
    'Get default bucket access configuration',
    schemas.getDefaultBucketAccessSchema.shape,
    async (_, extra) => {
      const result = await operations.objectStorage.getDefaultBucketAccess();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_object_storage_default_bucket_access',
    'Update default bucket access configuration',
    schemas.updateDefaultBucketAccessSchema.shape,
    async (params, extra) => {
      const result = await operations.objectStorage.updateDefaultBucketAccess(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'cancel_object_storage',
    'Cancel Object Storage service',
    schemas.cancelObjectStorageSchema.shape,
    async (_, extra) => {
      const result = await operations.objectStorage.cancelObjectStorage();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Register meta tools
  server.tool(
    'list_regions',
    'Get a list of all available regions',
    schemas.listRegionsSchema.shape,
    async (_, extra) => {
      const result = await operations.meta.listRegions();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_region',
    'Get details for a specific region',
    schemas.getRegionSchema.shape,
    async (params, extra) => {
      const result = await operations.meta.getRegion(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_types',
    'Get a list of all available Linode types',
    schemas.listTypesSchema.shape,
    async (_, extra) => {
      const result = await operations.meta.listTypes();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_type',
    'Get details for a specific Linode type',
    schemas.getTypeSchema.shape,
    async (params, extra) => {
      const result = await operations.meta.getType(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_images',
    'Get a list of all available images',
    schemas.listImagesSchema.shape,
    async (params, extra) => {
      const result = await operations.meta.listImages(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_image',
    'Get details for a specific image',
    schemas.getImageSchema.shape,
    async (params, extra) => {
      const result = await operations.meta.getImage(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Start the server with stdio transport
  const transport = new StdioServerTransport();
  server.connect(transport);

  return server;
}
