import { z } from 'zod';

// Regions tools
export const listRegionsSchema = z.object({});

export const getRegionSchema = z.object({
  id: z.string().describe('The ID of the region'),
});
