import { LinodeClient } from '../client';
import { DomainOperations } from './domains';
import { InstanceOperations } from './instances';
import { MetaOperations } from './meta';
import { NodeBalancerOperations } from './nodebalancers';
import { ObjectStorageOperations } from './objectStorage';
import { VolumeOperations } from './volumes';

/**
 * Operations manager that provides access to all Linode API operations
 */
export class OperationsManager {
  private client: LinodeClient;
  
  instances: InstanceOperations;
  volumes: VolumeOperations;
  domains: DomainOperations;
  nodeBalancers: NodeBalancerOperations;
  meta: MetaOperations;
  objectStorage: ObjectStorageOperations;

  constructor(client: LinodeClient) {
    this.client = client;
    
    this.instances = new InstanceOperations(client);
    this.volumes = new VolumeOperations(client);
    this.domains = new DomainOperations(client);
    this.nodeBalancers = new NodeBalancerOperations(client);
    this.meta = new MetaOperations(client);
    this.objectStorage = new ObjectStorageOperations(client);
  }
}

export * from './domains';
export * from './instances';
export * from './meta';
export * from './nodebalancers';
export * from './objectStorage';
export * from './volumes';
