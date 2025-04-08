import { z } from 'zod';
import { paginationSchema, tagsSchema } from '../common/schemas';

// Basic image schema
export const linodeImageSchema = z.object({
  id: z.string().describe('The unique ID of this Image'),
  label: z.string().describe('The Image\'s label'),
  description: z.string().nullable().describe('A description for this Image'),
  created: z.string().describe('The date this Image was created'),
  updated: z.string().describe('The last date this Image was updated'),
  type: z.enum(['manual', 'automatic']).describe('How the Image was created'),
  status: z.enum(['available', 'creating', 'pending_upload', 'deleted']).describe('The status of the Image'),
  is_public: z.boolean().describe('True if the Image is public'),
  size: z.number().describe('The size of the Image in MB'),
  created_by: z.string().describe('The name of the user who created this Image'),
  vendor: z.string().nullable().describe('The upstream distribution vendor'),
  deprecated: z.boolean().describe('Whether or not this Image is deprecated'),
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
  disk_id: z.number().describe('The ID of the Linode Disk to create an Image from'),
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