import { z } from 'zod';

// Common schema definitions used across multiple tools

// Pagination schema for list endpoints
export const paginationSchema = z.object({
  page: z.number().int().optional().describe('Page number to fetch (minimum: 1)'),
  page_size: z.number().int().optional().describe('Number of items per page (minimum: 1, maximum: 500)')
});

// For backward compatibility
export const pagingParamsSchema = paginationSchema;

// For paginated response
export const paginatedResponseSchema = <T extends z.ZodType>(schema: T) => z.object({
  data: z.array(schema),
  page: z.number(),
  pages: z.number(),
  results: z.number()
});

// Tags schema used in many resources
export const tagsSchema = z.array(z.string()).optional()
  .describe('Array of user-defined tags for organization. Each tag can be up to 50 characters');

// For backward compatibility 
export const tagSchema = tagsSchema;

// Region schema used in many resources
export const regionSchema = z.string()
  .describe('Region where the resource will be created (e.g. us-east, ap-south)');

// Image schema for instances
export const imageSchema = z.string()
  .describe('The image to deploy the instance from (e.g. linode/debian11)');

// Simple IP address schema (string only, not the complex object)
export const ipAddressStringSchema = z.string().ip()
  .describe('A valid IPv4 or IPv6 address');

// CIDR block schema
export const cidrSchema = z.string()
  .describe('A CIDR block notation (e.g. 10.0.0.0/24 or 2001:db8::/64)');

// Date schema
export const dateSchema = z.string().datetime()
  .describe('ISO-8601 formatted date-time string');

// ID schema - can be number or string depending on resource
export const idSchema = z.union([z.number().int(), z.string()])
  .describe('Unique identifier for the resource');

// Common status values
export const statusSchema = z.enum([
  'active', 
  'creating', 
  'deleting', 
  'disabled', 
  'failed', 
  'pending', 
  'provisioning', 
  'rebooting', 
  'rebuilding', 
  'resizing', 
  'stopped', 
  'stopping'
]).describe('Current status of the resource');

// Common actions
export const actionSchema = z.enum([
  'boot',
  'reboot',
  'shutdown',
  'power_on',
  'power_off',
  'resize',
  'rebuild',
  'restore',
  'migrate'
]).describe('Action to perform on the resource');