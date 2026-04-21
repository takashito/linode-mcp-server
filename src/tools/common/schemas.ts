import { z } from 'zod';

// MCP clients may serialize array/object parameters as JSON strings.
// This helper wraps a zod array schema so it accepts either a native array
// or a JSON-encoded string and parses the string before validation.
export const jsonArray = <T extends z.ZodTypeAny>(schema: z.ZodArray<T>) =>
  z.preprocess((v) => {
    if (typeof v === 'string') {
      try { return JSON.parse(v); } catch { return v; }
    }
    return v;
  }, schema);

// Safe boolean coercion: converts only the literal strings "true"/"false"
// (and numeric 0/1) to booleans. Unlike z.coerce.boolean() which treats any
// non-empty string as true, this preserves the intent when MCP clients
// stringify boolean params.
export const coerceBoolean = () =>
  z.preprocess((v) => {
    if (typeof v === 'string') {
      if (v === 'true') return true;
      if (v === 'false') return false;
    }
    if (v === 1) return true;
    if (v === 0) return false;
    return v;
  }, z.boolean());

// Universal MCP input preprocessor. MCP clients frequently serialize ALL
// parameters as strings — including arrays, objects, booleans, and numbers.
// This wraps a zod object schema with a preprocessor that inspects each field
// and JSON-parses string inputs whose target type is array/object/record/tuple,
// coerces numeric strings to numbers, and converts "true"/"false"/0/1 to bool.
// Wraps at registration time: `parameters: mcpInput(schemas.fooSchema)`.
export function mcpInput<T extends z.ZodObject<any>>(schema: T) {
  const shape = schema.shape;
  return z.preprocess((raw: any) => {
    if (typeof raw !== 'object' || raw === null) return raw;
    const result: any = { ...raw };
    for (const key of Object.keys(shape)) {
      const value = raw[key];
      if (value === undefined) continue;
      let inner: any = shape[key];
      // Unwrap wrapping zod types to find the ultimate target.
      while (inner?._def) {
        const t = inner._def.typeName;
        if (t === 'ZodOptional' || t === 'ZodNullable' || t === 'ZodEffects' || t === 'ZodDefault') {
          inner = inner._def.innerType ?? inner._def.schema ?? inner;
        } else {
          break;
        }
      }
      const name = inner?._def?.typeName;
      if (typeof value === 'string') {
        if (name === 'ZodArray' || name === 'ZodObject' || name === 'ZodRecord' || name === 'ZodTuple') {
          try { result[key] = JSON.parse(value); } catch { /* leave as-is */ }
        } else if (name === 'ZodNumber') {
          const n = Number(value);
          if (!Number.isNaN(n) && value.trim() !== '') result[key] = n;
        } else if (name === 'ZodBoolean') {
          if (value === 'true') result[key] = true;
          else if (value === 'false') result[key] = false;
        }
      }
    }
    return result;
  }, schema);
}

// Common schema definitions used across multiple tools

// Pagination schema for list endpoints
export const paginationSchema = z.object({
  page: z.coerce.number().int().optional().describe('Page number to fetch (minimum: 1)'),
  page_size: z.coerce.number().int().optional().describe('Number of items per page (minimum: 1, maximum: 500)')
});

// For backward compatibility
export const pagingParamsSchema = paginationSchema;

// For paginated response
export const paginatedResponseSchema = <T extends z.ZodType>(schema: T) => z.object({
  data: z.array(schema),
  page: z.coerce.number(),
  pages: z.coerce.number(),
  results: z.coerce.number()
});

// Tags schema used in many resources
export const tagsSchema = jsonArray(z.array(z.string())).optional()
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
export const idSchema = z.union([z.coerce.number().int(), z.string()])
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