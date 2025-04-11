import { z } from 'zod';
import { pagingParamsSchema } from '../common/schemas';

// Regions tools
export const listRegionsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getRegionSchema = z.object({
  id: z.string().describe('The ID of the region'),
});
