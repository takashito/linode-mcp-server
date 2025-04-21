import { z } from 'zod';
import { pagingParamsSchema } from '../common/schemas';

/**
 * Schema for listing StackScripts
 */
export const listStackScriptsSchema = z.object({
  ...pagingParamsSchema.shape,
  is_mine: z.boolean().optional().describe('Only return StackScripts created by your account'),
  is_public: z.boolean().optional().describe('If true, returns only public StackScripts'),
});

/**
 * Schema for getting a specific StackScript
 */
export const getStackScriptSchema = z.object({
  id: z.number().describe('The ID of the StackScript')
});

/**
 * Schema for creating a StackScript
 */
export const createStackScriptSchema = z.object({
  script: z.string().describe('The script to execute when provisioning a new Linode with this StackScript'),
  label: z.string()
    .describe('The StackScript\'s label for display purposes only. length between 3 and 128'),
  images: z.array(z.string())
    .describe('An array of Image IDs. These are the Images that can be deployed with this StackScript'),
  description: z.string().optional()
    .describe('A description for the StackScript'),
  is_public: z.boolean().optional()
    .describe('This determines whether other users can use your StackScript. Once a StackScript is made public, it cannot be made private'),
  rev_note: z.string().optional()
    .describe('This field allows you to add notes for the set of revisions made to this StackScript')
});

/**
 * Schema for updating a StackScript
 */
export const updateStackScriptSchema = z.object({
  id: z.number().describe('The ID of the StackScript'),
  script: z.string().optional()
    .describe('The script to execute when provisioning a new Linode with this StackScript'),
  label: z.string()
    .optional()
    .describe('The StackScript\'s label for display purposes only. length between 3 and 128'),
  images: z.array(z.string())
    .optional()
    .describe('An array of Image IDs. These are the Images that can be deployed with this StackScript'),
  description: z.string().optional()
    .describe('A description for the StackScript'),
  is_public: z.boolean().optional()
    .describe('This determines whether other users can use your StackScript. Once a StackScript is made public, it cannot be made private'),
  rev_note: z.string().optional()
    .describe('This field allows you to add notes for the set of revisions made to this StackScript')
});

/**
 * Schema for deleting a StackScript
 */
export const deleteStackScriptSchema = z.object({
  id: z.number().describe('The ID of the StackScript')
});