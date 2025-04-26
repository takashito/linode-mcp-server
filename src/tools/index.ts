// Re-export all schemas and tools
import { registerInstanceTools } from './instances/tools';
import { registerVolumeTools } from './volumes/tools';
import { registerNetworkingTools } from './networking/tools';
import { registerNodeBalancerTools } from './nodebalancers/tools';
import { registerRegionTools } from './regions/tools';
import { registerPlacementTools } from './placement/tools';
import { registerVPCTools } from './vpcs/tools';
import { registerObjectStorageTools } from './objectStorage/tools';
import { registerDomainTools } from './domains/tools';
import { registerDatabaseTools } from './databases/tools';
import { registerKubernetesTools } from './kubernetes/tools';
import { registerImagesTools } from './images/tools';
import { registerStackScriptsTools } from './stackScripts/tools';
import { registerTagsTools } from './tags/tools';
import { registerSupportTools } from './support/tools';
import { registerLongviewTools } from './longview/tools';
import { registerProfileTools } from './profile/tools';
import { registerAccountTools } from './account/tools';
import { LinodeClient } from '../client';

// Define all available tool categories
export const TOOL_CATEGORIES = [
  'instances',
  'volumes',
  'networking',
  'nodebalancers',
  'regions',
  'placement',
  'vpcs',
  'objectStorage',
  'domains',
  'databases',
  'kubernetes',
  'images',
  'stackScripts',
  'tags',
  'support',
  'longview',
  'profile',
  'account'
] as const;

export type ToolCategory = typeof TOOL_CATEGORIES[number];

// Common schemas
export * from './common/schemas';

// Instances
export * from './instances/schemas';
export * from './instances/tools';

// Volumes
export * from './volumes/schemas';
export * from './volumes/tools';

// Networking
export * from './networking/schemas';
export * from './networking/tools';

// NodeBalancers
export * from './nodebalancers/schemas';
export * from './nodebalancers/tools';

// Regions
export * from './regions/schemas';
export * from './regions/tools';

// Placement
export * from './placement/schemas';
export * from './placement/tools';

// VPCs
export * from './vpcs/schemas';
export * from './vpcs/tools';

// Object Storage
export * from './objectStorage/schemas';
export * from './objectStorage/tools';

// Domains
export * from './domains/schemas';
export * from './domains/tools';

// Databases
export * from './databases/schemas';
export * from './databases/tools';

// Kubernetes
export * from './kubernetes/schemas';
export * from './kubernetes/tools';

// Images
export * from './images/schemas';
export * from './images/tools';

// StackScripts
export * from './stackScripts/schemas';
export * from './stackScripts/tools';

// Tags
export * from './tags/schemas';
export * from './tags/tools';

// Support
export * from './support/schemas';
export * from './support/tools';

// Longview
export * from './longview/schemas';
export * from './longview/tools';

// Profile
export * from './profile/schemas';
export * from './profile/tools';
export { ScopeDefinition } from './profile/schemas';

// Account
export * from './account/schemas';
export * from './account/tools';

// Register tools with direct client access
export const registerAllTools = (
  server: any, 
  client: LinodeClient, 
  enabledCategories?: ToolCategory[]
) => {
  // If no categories specified, enable all
  const categories = enabledCategories || [...TOOL_CATEGORIES];
  
  // Direct function mapping for better traceability
  const registerFunctions: Record<string, (server: any, client: LinodeClient) => void> = {
    'instances': registerInstanceTools,
    'volumes': registerVolumeTools,
    'networking': registerNetworkingTools,
    'nodebalancers': registerNodeBalancerTools,
    'regions': registerRegionTools,
    'placement': registerPlacementTools,
    'vpcs': registerVPCTools,
    'objectStorage': registerObjectStorageTools,
    'domains': registerDomainTools,
    'databases': registerDatabaseTools,
    'kubernetes': registerKubernetesTools,
    'images': registerImagesTools,
    'stackScripts': registerStackScriptsTools,
    'tags': registerTagsTools,
    'support': registerSupportTools,
    'longview': registerLongviewTools,
    'profile': registerProfileTools,
    'account': registerAccountTools
  };
  
  // Register only the enabled categories
  for (const category of categories) {
    registerFunctions[category](server, client);
  }
};