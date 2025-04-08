import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerImagesTools(server: McpServer, client: LinodeClient) {
  // List all images
  server.tool(
    'list_images',
    'Get a list of all available Images',
    schemas.listImagesSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.images.getImages(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Get a specific image
  server.tool(
    'get_image',
    'Get details for a specific Image',
    schemas.getImageSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.images.getImage(params.imageId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Create an image
  server.tool(
    'create_image',
    'Create a new Image from an existing Disk',
    schemas.createImageSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.images.createImage({
        disk_id: params.disk_id,
        label: params.label,
        description: params.description
      });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Upload an image
  server.tool(
    'upload_image',
    'Initiate an Image upload',
    schemas.uploadImageSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const result = await client.images.uploadImage({
        label: params.label,
        description: params.description,
        region: params.region
      });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Update an image
  server.tool(
    'update_image',
    'Update an existing Image',
    schemas.updateImageSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const { imageId, ...updateData } = params;
      const result = await client.images.updateImage(imageId, updateData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Delete an image
  server.tool(
    'delete_image',
    'Delete an Image',
    schemas.deleteImageSchema.shape,
    withErrorHandling(async (params, _extra) => {
      await client.images.deleteImage(params.imageId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  // Replicate an image
  server.tool(
    'replicate_image',
    'Replicate an Image to other regions',
    schemas.replicateImageSchema.shape,
    withErrorHandling(async (params, _extra) => {
      const { imageId, regions } = params;
      await client.images.replicateImage(imageId, { regions });
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );
}