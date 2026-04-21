import { z } from "zod";
import { paginationSchema, tagsSchema, coerceBoolean } from '../common/schemas';

// Basic image schema
export const linodeImageSchema = z.object({
  id: z.string().describe('The unique ID of this Image'),
  label: z.string().describe('The Image\'s label'),
  description: z.string().nullable().describe('A description for this Image'),
  created: z.string().describe('The date this Image was created'),
  updated: z.string().describe('The last date this Image was updated'),
  type: z.enum(['manual', 'automatic']).describe('How the Image was created'),
  status: z.enum(['available', 'creating', 'pending_upload', 'deleted']).describe('The status of the Image'),
  is_public: coerceBoolean().describe('True if the Image is public'),
  size: z.coerce.number().describe('The size of the Image in MB'),
  created_by: z.string().describe('The name of the user who created this Image'),
  vendor: z.string().nullable().describe('The upstream distribution vendor'),
  deprecated: coerceBoolean().describe('Whether or not this Image is deprecated'),
  expiry: z.string().nullable().describe('Only Images with a non-null expiry will be automatically deleted')
});

// Schema for listing images
export const listImagesSchema = paginationSchema;

// Schema for getting a specific image
export const getImageSchema = z.object({
  imageId: z.string().describe('The ID of the Image')
});

// Schema for creating an image
export const createImageSchema = z.object({
  disk_id: z.coerce.number().describe('The ID of the Linode Disk to create an Image from'),
  label: z.string().describe('The label for the resulting Image'),
  description: z.string().optional().describe('A text description for the Image')
});

// Schema for uploading an image
export const uploadImageSchema = z.object({
  label: z.string().describe('The label for the resulting Image'),
  description: z.string().optional().describe('A text description for the Image'),
  region: z.string().describe('The region where the Image will be uploaded')
});

// Schema for updating an image
export const updateImageSchema = z.object({
  imageId: z.string().describe('The ID of the Image to update'),
  label: z.string().optional().describe('The new label for the Image'),
  description: z.string().optional().describe('The new description for the Image')
});

// Schema for deleting an image
export const deleteImageSchema = z.object({
  imageId: z.string().describe('The ID of the Image to delete')
});

// Schema for replicating an image
export const replicateImageSchema = z.object({
  imageId: z.string().describe('The ID of the Image to replicate'),
  regions: z.array(z.string()).describe('Array of regions to replicate the Image to')
});

// --- Sharegroups CRUD ---

export const listImageSharegroupsSchema = paginationSchema;

export const getImageSharegroupSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group')
});

export const createImageSharegroupSchema = z.object({
  label: z.string().describe('The label for the share group'),
  description: z.string().optional().describe('A description for the share group')
});

export const updateImageSharegroupSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group to update'),
  label: z.string().optional().describe('The new label for the share group'),
  description: z.string().optional().describe('The new description for the share group')
});

export const deleteImageSharegroupSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group to delete')
});

// --- Sharegroup Images ---

export const listSharegroupImagesSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group'),
  page: z.coerce.number().int().optional().describe('Page number to fetch (minimum: 1)'),
  page_size: z.coerce.number().int().optional().describe('Number of items per page (minimum: 1, maximum: 500)')
});

export const addSharegroupImagesSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group'),
  images: z.array(z.string()).describe('Array of Image IDs to add to the share group')
});

export const updateSharegroupImageSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group'),
  imageId: z.string().describe('The ID of the shared image to update')
});

export const removeSharegroupImageSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group'),
  imageId: z.string().describe('The ID of the shared image to remove')
});

// --- Sharegroup Members ---

export const listSharegroupMembersSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group'),
  page: z.coerce.number().int().optional().describe('Page number to fetch (minimum: 1)'),
  page_size: z.coerce.number().int().optional().describe('Number of items per page (minimum: 1, maximum: 500)')
});

export const getSharegroupMemberSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group'),
  tokenUuid: z.string().describe('The UUID of the membership token')
});

export const addSharegroupMembersSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group'),
  data: z.record(z.any()).optional().describe('Request body for adding members to the share group')
});

export const updateSharegroupMemberSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group'),
  tokenUuid: z.string().describe('The UUID of the membership token to update'),
  data: z.record(z.any()).optional().describe('Request body for updating the membership token')
});

export const removeSharegroupMemberSchema = z.object({
  sharegroupId: z.coerce.number().describe('The ID of the share group'),
  tokenUuid: z.string().describe('The UUID of the membership token to revoke')
});

// --- Sharegroup Tokens ---

export const listSharegroupTokensSchema = paginationSchema;

export const getSharegroupTokenSchema = z.object({
  tokenUuid: z.string().describe('The UUID of the token')
});

export const createSharegroupTokenSchema = z.object({
  data: z.record(z.any()).optional().describe('Request body for creating a sharegroup token')
});

export const updateSharegroupTokenSchema = z.object({
  tokenUuid: z.string().describe('The UUID of the token to update'),
  data: z.record(z.any()).optional().describe('Request body for updating the token')
});

export const deleteSharegroupTokenSchema = z.object({
  tokenUuid: z.string().describe('The UUID of the token to delete')
});

// --- Token Lookups ---

export const getTokenSharegroupSchema = z.object({
  tokenUuid: z.string().describe('The UUID of the token')
});

export const listTokenSharegroupImagesSchema = z.object({
  tokenUuid: z.string().describe('The UUID of the token'),
  page: z.coerce.number().int().optional().describe('Page number to fetch (minimum: 1)'),
  page_size: z.coerce.number().int().optional().describe('Number of items per page (minimum: 1, maximum: 500)')
});

// --- Image-to-Sharegroups Lookup ---

export const listImageSharegroupsByImageSchema = z.object({
  imageId: z.string().describe('The ID of the Image'),
  page: z.coerce.number().int().optional().describe('Page number to fetch (minimum: 1)'),
  page_size: z.coerce.number().int().optional().describe('Number of items per page (minimum: 1, maximum: 500)')
});