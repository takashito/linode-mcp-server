import { z } from 'zod';
import { pagingParamsSchema, tagSchema, tagsSchema } from '../common/schemas';

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
  tags: tagSchema,
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
