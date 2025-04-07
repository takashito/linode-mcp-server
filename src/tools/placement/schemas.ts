import { z } from 'zod';

// Placement tools
export const listPlacementGroupsSchema = z.object({});

export const getPlacementGroupSchema = z.object({
  id: z.number().describe('The ID of the placement group'),
});

export const createPlacementGroupSchema = z.object({
  label: z.string().describe('A label for the placement group'),
  placement_group_type: z.enum(['anti_affinity:local']).describe('The type of placement policy'),
  placement_group_policy: z.enum(['strict', 'flexible']).optional().describe('The policy of the placement group (defaults to flexible)'),
  region: z.string().describe('The region where the placement group will be created'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the placement group'),
});

export const updatePlacementGroupSchema = z.object({
  id: z.number().describe('The ID of the placement group to update'),
  label: z.string().describe('A label for the placement group (required even for updates)'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the placement group'),
});

export const deletePlacementGroupSchema = z.object({
  id: z.number().describe('The ID of the placement group to delete'),
});

export const assignInstancesSchema = z.object({
  id: z.number().describe('The ID of the placement group'),
  linodes: z.array(z.number()).describe('Array of Linode IDs to assign to the placement group'),
});

export const unassignInstancesSchema = z.object({
  id: z.number().describe('The ID of the placement group'),
  linodes: z.array(z.number()).describe('Array of Linode IDs to unassign from the placement group'),
});