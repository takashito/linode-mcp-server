import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerSupportTools(server: McpServer, client: LinodeClient) {
  // List support tickets
  server.tool(
    'list_tickets',
    'List support tickets for your account',
    schemas.listTicketsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.support.listTickets(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Get a support ticket
  server.tool(
    'get_ticket',
    'Get details of a specific support ticket',
    schemas.getTicketSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.support.getTicket(params.ticket_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Create a support ticket
  server.tool(
    'create_ticket',
    'Open a new support ticket',
    schemas.createTicketSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.support.createTicket(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Close a support ticket
  server.tool(
    'close_ticket',
    'Close a support ticket',
    schemas.closeTicketSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.support.closeTicket(params.ticket_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // List ticket replies
  server.tool(
    'list_replies',
    'List replies to a support ticket',
    schemas.listRepliesSchema.shape,
    withErrorHandling(async (params, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.support.listReplies(params.ticket_id, paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Create a reply
  server.tool(
    'create_reply',
    'Reply to a support ticket',
    schemas.createReplySchema.shape,
    withErrorHandling(async (params, extra) => {
      const { ticket_id, description } = params;
      const result = await client.support.createReply(ticket_id, { description });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Upload an attachment
  server.tool(
    'upload_attachment',
    'Upload an attachment to a support ticket',
    schemas.uploadAttachmentSchema.shape,
    withErrorHandling(async (params, extra) => {
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
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
}