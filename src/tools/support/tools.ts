import { FastMCP } from 'fastmcp';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerSupportTools(server: FastMCP, client: LinodeClient) {
  // List support tickets
  server.addTool({
    name: 'list_tickets',
    description: 'List support tickets for your account',
    parameters: schemas.listTicketsSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.support.listTickets(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Get a support ticket
  server.addTool({
    name: 'get_ticket',
    description: 'Get details of a specific support ticket',
    parameters: schemas.getTicketSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.support.getTicket(params.ticket_id);
      return JSON.stringify(result, null, 2);
    })
  });

  // Create a support ticket
  server.addTool({
    name: 'create_ticket',
    description: 'Open a new support ticket',
    parameters: schemas.createTicketSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.support.createTicket(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Close a support ticket
  server.addTool({
    name: 'close_ticket',
    description: 'Close a support ticket',
    parameters: schemas.closeTicketSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.support.closeTicket(params.ticket_id);
      return JSON.stringify(result, null, 2);
    })
  });

  // List ticket replies
  server.addTool({
    name: 'list_replies',
    description: 'List replies to a support ticket',
    parameters: schemas.listRepliesSchema,
    execute: withErrorHandling(async (params) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.support.listReplies(params.ticket_id, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Create a reply
  server.addTool({
    name: 'create_reply',
    description: 'Reply to a support ticket',
    parameters: schemas.createReplySchema,
    execute: withErrorHandling(async (params) => {
      const { ticket_id, description } = params;
      const result = await client.support.createReply(ticket_id, { description });
      return JSON.stringify(result, null, 2);
    })
  });

  // Upload an attachment
  server.addTool({
    name: 'upload_attachment',
    description: 'Upload an attachment to a support ticket',
    parameters: schemas.uploadAttachmentSchema,
    execute: withErrorHandling(async (params) => {
      const { ticket_id, file } = params;
      
      // Convert base64 string to File object
      const byteCharacters = atob(file.split(',')[1] || file);
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      
      const blob = new Blob(byteArrays);
      const fileObj = new File([blob], "attachment", { type: "application/octet-stream" });
      
      const result = await client.support.uploadAttachment(ticket_id, fileObj);
      return JSON.stringify(result, null, 2);
    })
  });
}