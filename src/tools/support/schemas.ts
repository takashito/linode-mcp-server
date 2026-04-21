import { z } from "zod";
import { coerceBoolean } from "../common/schemas";

// Ticket schemas
export const TicketStatus = z.enum(['new', 'open', 'closed']);
export const TicketSeverity = z.enum(['low', 'medium', 'high']);

export const TicketSchema = z.object({
  id: z.coerce.number(),
  summary: z.string(),
  description: z.string(),
  status: TicketStatus,
  severity: TicketSeverity,
  entity: z.object({
    id: z.coerce.number().optional(),
    type: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
  }).optional(),
  opened: z.string(),
  closed: z.string().optional(),
  updated: z.string().optional(),
  updated_by: z.string().optional(),
  gravatar_id: z.string().optional(),
  gravatar_url: z.string().optional(),
});

// List tickets schema
export const listTicketsSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return.'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page.'),
});

// Get ticket schema
export const getTicketSchema = z.object({
  ticket_id: z.coerce.number().describe('ID of the support ticket to retrieve'),
});

// Create ticket schema
export const createTicketSchema = z.object({
  summary: z.string().describe('The summary or title of the support ticket.'),
  description: z.string().describe('The full details of the support request.'),
  domain_id: z.coerce.number().optional().describe('The ID of a Domain to open a ticket about.'),
  linode_id: z.coerce.number().optional().describe('The ID of a Linode to open a ticket about.'),
  nodebalancer_id: z.coerce.number().optional().describe('The ID of a NodeBalancer to open a ticket about.'),
  volume_id: z.coerce.number().optional().describe('The ID of a Volume to open a ticket about.'),
});

// Close ticket schema
export const closeTicketSchema = z.object({
  ticket_id: z.coerce.number().describe('ID of the support ticket to close'),
});

// Reply schemas
export const ReplySchema = z.object({
  id: z.coerce.number(),
  ticket_id: z.coerce.number(),
  description: z.string(),
  created: z.string(),
  created_by: z.string(),
  from_linode: coerceBoolean(),
  gravatar_id: z.string().optional(),
  gravatar_url: z.string().optional(),
});

// List replies schema
export const listRepliesSchema = z.object({
  ticket_id: z.coerce.number().describe('ID of the support ticket'),
  page: z.coerce.number().optional().describe('Page number of results to return.'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page.'),
});

// Create reply schema
export const createReplySchema = z.object({
  ticket_id: z.coerce.number().describe('ID of the support ticket to reply to'),
  description: z.string().describe('The reply text'),
});

// Upload attachment schema
export const uploadAttachmentSchema = z.object({
  ticket_id: z.coerce.number().describe('ID of the support ticket'),
  file: z.string().describe('The file to be uploaded as a base64 encoded string'),
});