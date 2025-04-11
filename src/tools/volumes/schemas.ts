import { z } from 'zod';
import { pagingParamsSchema, tagSchema, tagsSchema } from '../common/schemas';

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
  tags: tagSchema,
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

// Volume types
export const listVolumeTypesSchema = z.object({
  ...pagingParamsSchema.shape
});
