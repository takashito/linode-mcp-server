import { createInstancesClient, LinodeInstancesClient } from './instances';
import { createVolumesClient, LinodeVolumesClient } from './volumes';
import { createNetworkingClient, LinodeNetworkingClient } from './networking';
import { createNodeBalancersClient, LinodeNodeBalancersClient } from './nodebalancers';
import { createRegionsClient, LinodeRegionsClient } from './regions';
import { createPlacementClient, PlacementClient } from './placement';
import { createVPCsClient, VPCsClient } from './vpcs';
import { createObjectStorageClient, ObjectStorageClient } from './objectStorage';
import { createDomainsClient, DomainsClient } from './domains';
import { createDatabasesClient, DatabasesClient } from './databases';
import { createKubernetesClient, KubernetesClient } from './kubernetes';
import { createImagesClient, ImagesClient } from './images';
import { StackScriptsClient } from './stackScripts';
import { createTagsClient, TagsClient } from './tags';
import { LinodeTypesClient } from '../client';

export * from './instances';
export * from './volumes';
export * from './networking';
export * from './nodebalancers';
export * from './regions';
export * from './placement';
export * from './vpcs';
export * from './objectStorage';
export * from './domains';
export * from './databases';
export * from './kubernetes';
export * from './images';
export * from './stackScripts';
export * from './tags';

export interface LinodeClient {
  instances: LinodeInstancesClient;
  volumes: LinodeVolumesClient;
  networking: LinodeNetworkingClient;
  nodeBalancers: LinodeNodeBalancersClient;
  regions: LinodeRegionsClient;
  placement: PlacementClient;
  vpcs: VPCsClient;
  objectStorage: ObjectStorageClient;
  domains: DomainsClient;
  databases: DatabasesClient;
  kubernetes: KubernetesClient;
  images: ImagesClient;
  stackScripts: StackScriptsClient;
  tags: TagsClient;
  linodeTypes: LinodeTypesClient;
}