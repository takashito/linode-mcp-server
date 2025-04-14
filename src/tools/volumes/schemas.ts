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
  region: z.string().describe('The region where the volume will be created. This is only required if a linode_id is not given.'),
  size: z.number().describe('The size of the volume in GB. If the size is not specified, default will be 20 (20GB).'),
  label: z.string().describe('The label for the volume'),
  linode_id: z.number().optional().describe('The ID of the Linode to attach the volume to. If not given, the volume will be created without an attachment.'),
  tags: tagSchema,
  config_id: z.number().optional().describe('The ID of the configuration profile to attach to. When creating a Volume attached to a Linode, the ID of the Linode Config to include the new Volume in. This Config must belong to the Linode referenced by linode_id. Must not be provided if linode_id is not sent. If a linode_id is sent without a config_id, the volume will be attached to the Linode\'s only config if it only has one config. to the Linode\'s last used config, if possible. If no config can be selected for attachment, an error will be returned.'),
  encryption: z.enum(['enabled', 'disabled']).optional().describe('__Limited availability__ Enables encryption on the volume. Full disk encryption ensures the data stored on a block storage volume drive is secure. default is disabled.'),
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
