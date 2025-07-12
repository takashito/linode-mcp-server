import { FastMCP } from 'fastmcp';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerImagesTools(server: FastMCP, client: LinodeClient) {
  // List all images
  server.addTool({
    name: 'list_images',
    description: 'Get a list of all available Images',
    parameters: schemas.listImagesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.images.getImages(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Get a specific image
  server.addTool({
    name: 'get_image',
    description: 'Get details for a specific Image',
    parameters: schemas.getImageSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.images.getImage(params.imageId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Create an image
  server.addTool({
    name: 'create_image',
    description: 'Create a new Image from an existing Disk',
    parameters: schemas.createImageSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.images.createImage({
        disk_id: params.disk_id,
        label: params.label,
        description: params.description
      });
      return JSON.stringify(result, null, 2);
    })
  });

  // Upload an image
  server.addTool({
    name: 'upload_image',
    description: 'Initiate an Image upload',
    parameters: schemas.uploadImageSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.images.uploadImage({
        label: params.label,
        description: params.description,
        region: params.region
      });
      return JSON.stringify(result, null, 2);
    })
  });

  // Update an image
  server.addTool({
    name: 'update_image',
    description: 'Update an existing Image',
    parameters: schemas.updateImageSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { imageId, ...updateData } = params;
      const result = await client.images.updateImage(imageId, updateData);
      return JSON.stringify(result, null, 2);
    })
  });

  // Delete an image
  server.addTool({
    name: 'delete_image',
    description: 'Delete an Image',
    parameters: schemas.deleteImageSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.images.deleteImage(params.imageId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Replicate an image
  server.addTool({
    name: 'replicate_image',
    description: 'Replicate an Image to other regions',
    parameters: schemas.replicateImageSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { imageId, regions } = params;
      await client.images.replicateImage(imageId, { regions });
      return JSON.stringify({ success: true }, null, 2);
    })
  });
}