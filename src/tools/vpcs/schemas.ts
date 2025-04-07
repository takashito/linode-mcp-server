import { z } from 'zod';

// VPC tools
export const listVPCsSchema = z.object({});

export const getVPCSchema = z.object({
  id: z.number().describe('The ID of the VPC'),
});

export const createVPCSchema = z.object({
  label: z.string().describe('A label for the VPC. Must be unique among your VPCs.'),
  region: z.string().describe('The region where the VPC will be created. The region must support VPCs - check region capabilities with List Regions.'),
  description: z.string().optional().describe('A description for the VPC'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the VPC'),
});

export const updateVPCSchema = z.object({
  id: z.number().describe('The ID of the VPC to update'),
  label: z.string().optional().describe('A label for the VPC. Must be unique among your VPCs.'),
  description: z.string().optional().describe('A description for the VPC'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the VPC'),
});

export const deleteVPCSchema = z.object({
  id: z.number().describe('The ID of the VPC to delete'),
});

// VPC Subnet schemas
export const listSubnetsSchema = z.object({
  id: z.number().describe('The ID of the VPC'),
});

export const getSubnetSchema = z.object({
  id: z.number().describe('The ID of the VPC'),
  subnet_id: z.number().describe('The ID of the subnet'),
});

export const createSubnetSchema = z.object({
  id: z.number().describe('The ID of the VPC'),
  label: z.string().describe('A label for the subnet. Must be unique within the VPC.'),
  ipv4: z.string().describe('The IPv4 range for the subnet in CIDR format (e.g., 10.0.0.0/24). Must be a valid private IPv4 range and not overlap with other subnets in the VPC.'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the subnet'),
});

export const updateSubnetSchema = z.object({
  id: z.number().describe('The ID of the VPC'),
  subnet_id: z.number().describe('The ID of the subnet to update'),
  label: z.string().optional().describe('A label for the subnet'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the subnet'),
});

export const deleteSubnetSchema = z.object({
  id: z.number().describe('The ID of the VPC'),
  subnet_id: z.number().describe('The ID of the subnet to delete'),
});

// VPC IPs schema
export const listVPCIPsSchema = z.object({
  id: z.number().describe('The ID of the VPC'),
});