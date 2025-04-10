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
import { LinodeClient } from '../client';

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

// Register all tools with direct client access
export const registerAllTools = (server: any, client: LinodeClient) => {
  registerInstanceTools(server, client);
  registerVolumeTools(server, client);
  registerNetworkingTools(server, client);
  registerNodeBalancerTools(server, client);
  registerRegionTools(server, client);
  registerPlacementTools(server, client);
  registerVPCTools(server, client);
  registerObjectStorageTools(server, client);
  registerDomainTools(server, client);
  registerDatabaseTools(server, client);
  registerKubernetesTools(server, client);
  registerImagesTools(server, client);
  registerStackScriptsTools(server, client);
};