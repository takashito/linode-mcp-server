import { z } from 'zod';
import { pagingParamsSchema } from '../common/schemas';

// VPC tools
export const listVPCsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getVPCSchema = z.object({
  id: z.coerce.number().describe('The ID of the VPC'),
});

export const createVPCSchema = z.object({
  label: z.string().describe('A label for the VPC. Must be unique among your VPCs.'),
  region: z.string().describe('The region where the VPC will be created. The region must support VPCs - check region capabilities with List Regions.'),
  description: z.string().optional().describe('A description for the VPC'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the VPC'),
});

export const updateVPCSchema = z.object({
  id: z.coerce.number().describe('The ID of the VPC to update'),
  label: z.string().optional().describe('A label for the VPC. Must be unique among your VPCs.'),
  description: z.string().optional().describe('A description for the VPC'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the VPC'),
});

export const deleteVPCSchema = z.object({
  id: z.coerce.number().describe('The ID of the VPC to delete'),
});

// VPC Subnet schemas
export const listSubnetsSchema = z.object({
  id: z.coerce.number().describe('The ID of the VPC'),
});

export const getSubnetSchema = z.object({
  id: z.coerce.number().describe('The ID of the VPC'),
  subnet_id: z.coerce.number().describe('The ID of the subnet'),
});

export const createSubnetSchema = z.object({
  id: z.coerce.number().describe('The ID of the VPC'),
  label: z.string().describe('A label for the subnet. Must be unique within the VPC.'),
  ipv4: z.string().describe('The IPv4 range for the subnet in CIDR format (e.g., 10.0.0.0/24). Must be a valid private IPv4 range and not overlap with other subnets in the VPC.'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the subnet'),
});

export const updateSubnetSchema = z.object({
  id: z.coerce.number().describe('The ID of the VPC'),
  subnet_id: z.coerce.number().describe('The ID of the subnet to update'),
  label: z.string().optional().describe('A label for the subnet'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the subnet'),
});

export const deleteSubnetSchema = z.object({
  id: z.coerce.number().describe('The ID of the VPC'),
  subnet_id: z.coerce.number().describe('The ID of the subnet to delete'),
});

// VPC IPs schema
export const listVPCIPsSchema = z.object({
  id: z.coerce.number().describe('The ID of the VPC'),
});

// All VPC IPs schema
export const listAllVPCIPsSchema = z.object({
  ...pagingParamsSchema.shape
});

// NodeBalancer VPC schemas
export const listNodeBalancerVPCsSchema = z.object({
  nodeBalancerId: z.coerce.number().describe('The ID of the NodeBalancer'),
  ...pagingParamsSchema.shape
});

export const getNodeBalancerVPCSchema = z.object({
  nodeBalancerId: z.coerce.number().describe('The ID of the NodeBalancer'),
  nodeBalancerVpcConfigId: z.coerce.number().describe('The ID of the NodeBalancer VPC configuration')
});