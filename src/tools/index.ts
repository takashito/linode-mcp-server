import { z } from "zod";

// Common paging parameters
const pagingParamsSchema = z.object({
  page: z.number().optional().describe('Page number to fetch'),
  page_size: z.number().optional().describe('Number of items per page'),
});

// Instance tools
export const listInstancesSchema = z.object({
  ...pagingParamsSchema.shape,
});

export const getInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
});

export const createInstanceSchema = z.object({
  region: z.string().describe('The region where the Linode will be created'),
  type: z.string().describe('The Linode type ID'),
  label: z.string().optional().describe('The label for the Linode'),
  root_pass: z.string().describe('The root password for the Linode'),
  image: z.string().optional().describe('The image ID to deploy'),
  authorized_keys: z.array(z.string()).optional().describe('SSH keys to deploy'),
  backups_enabled: z.boolean().optional().describe('Whether backups are enabled'),
  private_ip: z.boolean().optional().describe('Whether to assign a private IP'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the Linode'),
});

export const rebootInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  config_id: z.number().optional().describe('The ID of the configuration profile to boot into'),
});

export const bootInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  config_id: z.number().optional().describe('The ID of the configuration profile to boot into'),
});

export const shutdownInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
});

export const deleteInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
});

export const resizeInstanceSchema = z.object({
  id: z.number().describe('The ID of the Linode instance'),
  type: z.string().describe('The new Linode type ID'),
  allow_auto_disk_resize: z.boolean().optional().default(true).describe('Whether to automatically resize disks'),
});

// Volume tools
export const listVolumesSchema = z.object({
  ...pagingParamsSchema.shape,
});

export const getVolumeSchema = z.object({
  id: z.number().describe('The ID of the volume'),
});

export const createVolumeSchema = z.object({
  region: z.string().describe('The region where the volume will be created'),
  size: z.number().describe('The size of the volume in GB'),
  label: z.string().describe('The label for the volume'),
  linode_id: z.number().optional().describe('The ID of the Linode to attach the volume to'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the volume'),
  config_id: z.number().optional().describe('The ID of the configuration profile to attach to'),
});

export const deleteVolumeSchema = z.object({
  id: z.number().describe('The ID of the volume'),
});

export const attachVolumeSchema = z.object({
  id: z.number().describe('The ID of the volume'),
  linode_id: z.number().describe('The ID of the Linode to attach the volume to'),
  config_id: z.number().optional().describe('The ID of the configuration profile to attach to'),
});

export const detachVolumeSchema = z.object({
  id: z.number().describe('The ID of the volume'),
});

export const resizeVolumeSchema = z.object({
  id: z.number().describe('The ID of the volume'),
  size: z.number().describe('The new size of the volume in GB'),
});

// Domain tools
export const listDomainsSchema = z.object({
  ...pagingParamsSchema.shape,
});

export const getDomainSchema = z.object({
  id: z.number().describe('The ID of the domain'),
});

export const createDomainSchema = z.object({
  domain: z.string().describe('The domain name'),
  type: z.enum(['master', 'slave']).describe('The type of domain'),
  soa_email: z.string().optional().describe('The email address for the SOA record'),
  master_ips: z.array(z.string()).optional().describe('The IPs of the master DNS server (required for slave zones)'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the domain'),
});

export const deleteDomainSchema = z.object({
  id: z.number().describe('The ID of the domain'),
});

export const listDomainRecordsSchema = z.object({
  domain_id: z.number().describe('The ID of the domain'),
});

export const createDomainRecordSchema = z.object({
  domain_id: z.number().describe('The ID of the domain'),
  type: z.string().describe('The type of record (A, AAAA, CNAME, etc.)'),
  name: z.string().describe('The name of the record relative to the domain'),
  target: z.string().describe('The target of the record'),
  priority: z.number().optional().describe('The priority of the record (MX, SRV)'),
  weight: z.number().optional().describe('The weight of the record (SRV)'),
  port: z.number().optional().describe('The port of the record (SRV)'),
  service: z.string().optional().describe('The service of the record (SRV)'),
  protocol: z.string().optional().describe('The protocol of the record (SRV)'),
  ttl_sec: z.number().optional().describe('The TTL of the record in seconds'),
  tag: z.string().optional().describe('The tag of the record (CAA)'),
});

export const updateDomainRecordSchema = z.object({
  domain_id: z.number().describe('The ID of the domain'),
  record_id: z.number().describe('The ID of the record'),
  type: z.string().optional().describe('The type of record (A, AAAA, CNAME, etc.)'),
  name: z.string().optional().describe('The name of the record relative to the domain'),
  target: z.string().optional().describe('The target of the record'),
  priority: z.number().optional().describe('The priority of the record (MX, SRV)'),
  weight: z.number().optional().describe('The weight of the record (SRV)'),
  port: z.number().optional().describe('The port of the record (SRV)'),
  service: z.string().optional().describe('The service of the record (SRV)'),
  protocol: z.string().optional().describe('The protocol of the record (SRV)'),
  ttl_sec: z.number().optional().describe('The TTL of the record in seconds'),
  tag: z.string().optional().describe('The tag of the record (CAA)'),
});

export const deleteDomainRecordSchema = z.object({
  domain_id: z.number().describe('The ID of the domain'),
  record_id: z.number().describe('The ID of the record'),
});

// NodeBalancer tools
export const listNodeBalancersSchema = z.object({
  ...pagingParamsSchema.shape,
});

export const getNodeBalancerSchema = z.object({
  id: z.number().describe('The ID of the NodeBalancer'),
});

export const createNodeBalancerSchema = z.object({
  region: z.string().describe('The region where the NodeBalancer will be created'),
  label: z.string().optional().describe('The label for the NodeBalancer'),
  client_conn_throttle: z.number().optional().describe('Connection throttle in seconds'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the NodeBalancer'),
});

export const deleteNodeBalancerSchema = z.object({
  id: z.number().describe('The ID of the NodeBalancer'),
});

export const listNodeBalancerConfigsSchema = z.object({
  nodebalancer_id: z.number().describe('The ID of the NodeBalancer'),
});

export const createNodeBalancerConfigSchema = z.object({
  nodebalancer_id: z.number().describe('The ID of the NodeBalancer'),
  port: z.number().describe('The port to serve traffic on'),
  protocol: z.string().describe('The protocol to use (http, https, tcp)'),
  algorithm: z.string().optional().describe('The load balancing algorithm'),
  stickiness: z.string().optional().describe('The session stickiness setting'),
  check: z.string().optional().describe('The health check method'),
  check_interval: z.number().optional().describe('How often to check backends in seconds'),
  check_timeout: z.number().optional().describe('How long to wait for a check in seconds'),
  check_attempts: z.number().optional().describe('How many check attempts before marking unhealthy'),
  check_path: z.string().optional().describe('The URL path for HTTP checks'),
  check_body: z.string().optional().describe('Body to expect from HTTP checks'),
  check_passive: z.boolean().optional().describe('Whether to use passive checks'),
  cipher_suite: z.string().optional().describe('The SSL cipher suite to use'),
  ssl_cert: z.string().optional().describe('The SSL certificate'),
  ssl_key: z.string().optional().describe('The SSL private key'),
});

export const deleteNodeBalancerConfigSchema = z.object({
  nodebalancer_id: z.number().describe('The ID of the NodeBalancer'),
  config_id: z.number().describe('The ID of the config'),
});

export const listNodeBalancerNodesSchema = z.object({
  nodebalancer_id: z.number().describe('The ID of the NodeBalancer'),
  config_id: z.number().describe('The ID of the config'),
});

export const createNodeBalancerNodeSchema = z.object({
  nodebalancer_id: z.number().describe('The ID of the NodeBalancer'),
  config_id: z.number().describe('The ID of the config'),
  address: z.string().describe('The IP:port combination of the node'),
  label: z.string().describe('The label for the node'),
  weight: z.number().optional().describe('The weight for the node'),
  mode: z.string().optional().describe('The mode of the node'),
});

export const deleteNodeBalancerNodeSchema = z.object({
  nodebalancer_id: z.number().describe('The ID of the NodeBalancer'),
  config_id: z.number().describe('The ID of the config'),
  node_id: z.number().describe('The ID of the node'),
});

// Meta tools
export const listRegionsSchema = z.object({});

export const getRegionSchema = z.object({
  id: z.string().describe('The ID of the region'),
});

export const listTypesSchema = z.object({});

export const getTypeSchema = z.object({
  id: z.string().describe('The ID of the Linode type'),
});

export const listImagesSchema = z.object({
  ...pagingParamsSchema.shape,
});

export const getImageSchema = z.object({
  id: z.string().describe('The ID of the image'),
});
