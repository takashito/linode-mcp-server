import { z } from 'zod';
import { pagingParamsSchema } from '../common/schemas';

/**
 * Schema for listing Tags
 */
export const listTagsSchema = z.object({
  ...pagingParamsSchema.shape
});

/**
 * Schema for getting a specific Tag
 */
export const getTagSchema = z.object({
  label: z.string().describe('The label of the Tag')
});

/**
 * Schema for creating a Tag
 */
export const createTagSchema = z.object({
  label: z.string()
    .describe('The label of the Tag. length between 3 and 50 characters, can only contain alphanumeric characters, dashes (-), and underscores (_).'),
  linodes: z.array(z.number()).optional()
    .describe('Array of Linode IDs to apply this Tag to'),
  domains: z.array(z.number()).optional()
    .describe('Array of Domain IDs to apply this Tag to'),
  nodebalancers: z.array(z.number()).optional()
    .describe('Array of NodeBalancer IDs to apply this Tag to'),
  volumes: z.array(z.number()).optional()
    .describe('Array of Volume IDs to apply this Tag to')
});

/**
 * Schema for deleting a Tag
 */
export const deleteTagSchema = z.object({
  label: z.string().describe('The label of the Tag')
});