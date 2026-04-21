import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerImagesTools(server: FastMCP) {
  // List all images
  server.addTool({
    name: 'list_images',
    description: 'Get a list of all available Images',
    parameters: mcpInput(schemas.listImagesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).images.getImages(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Get a specific image
  server.addTool({
    name: 'get_image',
    description: 'Get details for a specific Image',
    parameters: mcpInput(schemas.getImageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.getImage(params.imageId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Create an image
  server.addTool({
    name: 'create_image',
    description: 'Create a new Image from an existing Disk',
    parameters: mcpInput(schemas.createImageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.createImage({
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
    parameters: mcpInput(schemas.uploadImageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.uploadImage({
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
    parameters: mcpInput(schemas.updateImageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { imageId, ...updateData } = params;
      const result = await createClient(context).images.updateImage(imageId, updateData);
      return JSON.stringify(result, null, 2);
    })
  });

  // Delete an image
  server.addTool({
    name: 'delete_image',
    description: 'Delete an Image',
    parameters: mcpInput(schemas.deleteImageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).images.deleteImage(params.imageId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Replicate an image
  server.addTool({
    name: 'replicate_image',
    description: 'Replicate an Image to other regions',
    parameters: mcpInput(schemas.replicateImageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { imageId, regions } = params;
      await createClient(context).images.replicateImage(imageId, { regions });
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // --- Sharegroups CRUD ---

  server.addTool({
    name: 'list_image_sharegroups',
    description: 'List all image share groups',
    parameters: mcpInput(schemas.listImageSharegroupsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.getSharegroups({
        page: params.page,
        page_size: params.page_size
      });
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_image_sharegroup',
    description: 'Get details for a specific image share group',
    parameters: mcpInput(schemas.getImageSharegroupSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.getSharegroup(params.sharegroupId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'create_image_sharegroup',
    description: 'Create a new image share group',
    parameters: mcpInput(schemas.createImageSharegroupSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.createSharegroup({
        label: params.label,
        description: params.description
      });
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_image_sharegroup',
    description: 'Update an existing image share group',
    parameters: mcpInput(schemas.updateImageSharegroupSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { sharegroupId, ...updateData } = params;
      const result = await createClient(context).images.updateSharegroup(sharegroupId, updateData);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'delete_image_sharegroup',
    description: 'Delete an image share group',
    parameters: mcpInput(schemas.deleteImageSharegroupSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).images.deleteSharegroup(params.sharegroupId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // --- Sharegroup Images ---

  server.addTool({
    name: 'list_sharegroup_images',
    description: 'List shared images in a share group',
    parameters: mcpInput(schemas.listSharegroupImagesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { sharegroupId, ...paginationParams } = params;
      const result = await createClient(context).images.getSharegroupImages(sharegroupId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'add_sharegroup_images',
    description: 'Add images to a share group',
    parameters: mcpInput(schemas.addSharegroupImagesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.addSharegroupImages(params.sharegroupId, {
        images: params.images
      });
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_sharegroup_image',
    description: 'Update a shared image in a share group',
    parameters: mcpInput(schemas.updateSharegroupImageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.updateSharegroupImage(params.sharegroupId, params.imageId);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'remove_sharegroup_image',
    description: 'Revoke access to a shared image in a share group',
    parameters: mcpInput(schemas.removeSharegroupImageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).images.removeSharegroupImage(params.sharegroupId, params.imageId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // --- Sharegroup Members ---

  server.addTool({
    name: 'list_sharegroup_members',
    description: 'List members in a share group',
    parameters: mcpInput(schemas.listSharegroupMembersSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { sharegroupId, ...paginationParams } = params;
      const result = await createClient(context).images.getSharegroupMembers(sharegroupId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_sharegroup_member',
    description: 'Get a membership token for a share group',
    parameters: mcpInput(schemas.getSharegroupMemberSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.getSharegroupMember(params.sharegroupId, params.tokenUuid);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'add_sharegroup_members',
    description: 'Add members to a share group',
    parameters: mcpInput(schemas.addSharegroupMembersSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.addSharegroupMembers(params.sharegroupId, params.data || {});
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_sharegroup_member',
    description: 'Update a membership token in a share group',
    parameters: mcpInput(schemas.updateSharegroupMemberSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.updateSharegroupMember(params.sharegroupId, params.tokenUuid, params.data || {});
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'remove_sharegroup_member',
    description: 'Revoke a membership token from a share group',
    parameters: mcpInput(schemas.removeSharegroupMemberSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).images.removeSharegroupMember(params.sharegroupId, params.tokenUuid);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // --- Sharegroup Tokens ---

  server.addTool({
    name: 'list_sharegroup_tokens',
    description: 'List a user\'s sharegroup tokens',
    parameters: mcpInput(schemas.listSharegroupTokensSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.getSharegroupTokens({
        page: params.page,
        page_size: params.page_size
      });
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'get_sharegroup_token',
    description: 'Get details for a specific sharegroup token',
    parameters: mcpInput(schemas.getSharegroupTokenSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.getSharegroupToken(params.tokenUuid);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'create_sharegroup_token',
    description: 'Create a new sharegroup token',
    parameters: mcpInput(schemas.createSharegroupTokenSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.createSharegroupToken(params.data || {});
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_sharegroup_token',
    description: 'Update an existing sharegroup token',
    parameters: mcpInput(schemas.updateSharegroupTokenSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.updateSharegroupToken(params.tokenUuid, params.data || {});
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'delete_sharegroup_token',
    description: 'Delete a sharegroup token',
    parameters: mcpInput(schemas.deleteSharegroupTokenSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).images.deleteSharegroupToken(params.tokenUuid);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // --- Token Lookups ---

  server.addTool({
    name: 'get_token_sharegroup',
    description: 'Get the share group associated with a token',
    parameters: mcpInput(schemas.getTokenSharegroupSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).images.getTokenSharegroup(params.tokenUuid);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'list_token_sharegroup_images',
    description: 'List images available through a token\'s share group',
    parameters: mcpInput(schemas.listTokenSharegroupImagesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { tokenUuid, ...paginationParams } = params;
      const result = await createClient(context).images.getTokenSharegroupImages(tokenUuid, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // --- Image-to-Sharegroups Lookup ---

  server.addTool({
    name: 'list_image_sharegroups_by_image',
    description: 'List share groups that contain a specific image',
    parameters: mcpInput(schemas.listImageSharegroupsByImageSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { imageId, ...paginationParams } = params;
      const result = await createClient(context).images.getImageSharegroups(imageId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
}