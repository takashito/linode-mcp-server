import axios from 'axios';
import { 
  LinodeClient,
  createInstancesClient,
  createVolumesClient,
  createNetworkingClient,
  createNodeBalancersClient,
  createRegionsClient,
  createPlacementClient,
  createVPCsClient,
  createObjectStorageClient,
  createDomainsClient,
  createDatabasesClient,
  createKubernetesClient,
  createImagesClient,
  createStackScriptsClient,
  createTagsClient
} from './client/index';
import { PaginatedResponse, PaginationParams } from './client/instances';

const API_ROOT = 'https://api.linode.com/v4';

export interface LinodeType {
  id: string;
  label: string;
  class: string;
  disk: number;
  memory: number;
  vcpus: number;
  network_out: number;
  transfer: number;
  gpus: number;
  price: {
    hourly: number;
    monthly: number;
  };
  addons: {
    backups: {
      price: {
        hourly: number;
        monthly: number;
      };
    };
  };
  successor: string | null;
}

export interface LinodeTypesClient {
  getTypes: (params?: PaginationParams) => Promise<PaginatedResponse<LinodeType>>;
  getType: (id: string) => Promise<LinodeType>;
}

/**
 * Creates and configures a Linode API client with the provided token
 */
export function createClient(token: string): LinodeClient {
  // Create an axios instance with the Linode API configuration
  const axiosInstance = axios.create({
    baseURL: API_ROOT,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  // Create category-specific clients
  const instances = createInstancesClient(axiosInstance);
  const volumes = createVolumesClient(axiosInstance);
  const networking = createNetworkingClient(axiosInstance);
  const nodeBalancers = createNodeBalancersClient(axiosInstance);
  const regions = createRegionsClient(axiosInstance);
  const placement = createPlacementClient(axiosInstance);
  const vpcs = createVPCsClient(axiosInstance);
  const objectStorage = createObjectStorageClient(axiosInstance);
  const domains = createDomainsClient(axiosInstance);
  const databases = createDatabasesClient(axiosInstance);
  const kubernetes = createKubernetesClient(axiosInstance);
  const images = createImagesClient(axiosInstance);
  const stackScripts = createStackScriptsClient(axiosInstance);
  const tags = createTagsClient(axiosInstance);

  // Return the combined client
  return {
    instances,
    volumes,
    networking,
    nodeBalancers,
    regions,
    placement,
    vpcs,
    objectStorage,
    domains,
    databases,
    kubernetes,
    images,
    stackScripts,
    tags,
    linodeTypes: {
      getTypes: async (params?: PaginationParams) => {
        const response = await axiosInstance.get('/linode/types', { params });
        return response.data;
      },
      getType: async (id: string) => {
        const response = await axiosInstance.get(`/linode/types/${id}`);
        return response.data;
      }
    }
  };
}

export type { LinodeClient } from './client/index';
export type { 
  PaginationParams, 
  PaginatedResponse, 
  LinodeInstance,
  CreateLinodeRequest,
  UpdateLinodeRequest,
  ResizeLinodeRequest,
  CloneLinodeRequest,
  RebuildLinodeRequest,
  LinodeConfig,
  LinodeDisk,
  Kernel
} from './client/instances';

export type {
  Volume,
  VolumeType,
  CreateVolumeRequest,
  UpdateVolumeRequest,
  AttachVolumeRequest,
  ResizeVolumeRequest,
  CloneVolumeRequest
} from './client/volumes';

export type {
  IPAddress,
  IPv6Range,
  IPv6Pool,
  AllocateIPRequest,
  UpdateIPRequest,
  ShareIPsRequest,
  Firewall,
  FirewallRule,
  CreateFirewallRequest,
  UpdateFirewallRequest,
  FirewallDevice,
  CreateFirewallDeviceRequest,
  UpdateFirewallRulesRequest,
  VLAN
} from './client/networking';

export type {
  NodeBalancer,
  NodeBalancerConfig,
  NodeBalancerNode,
  NodeBalancerType,
  CreateNodeBalancerRequest,
  UpdateNodeBalancerRequest,
  CreateNodeBalancerConfigRequest,
  UpdateNodeBalancerConfigRequest,
  CreateNodeBalancerNodeRequest,
  UpdateNodeBalancerNodeRequest
} from './client/nodebalancers';

export type {
  Region,
  RegionAvailability
} from './client/regions';

export type {
  PlacementGroup,
  CreatePlacementGroupRequest,
  UpdatePlacementGroupRequest,
  AssignInstancesRequest,
  UnassignInstancesRequest
} from './client/placement';

export type {
  VPC,
  VPCSubnet,
  CreateVPCRequest,
  UpdateVPCRequest,
  CreateSubnetRequest,
  UpdateSubnetRequest
} from './client/vpcs';

export type {
  ObjectStorageCluster,
  ObjectStorageBucket,
  ObjectStorageKey,
  ObjectStorageObject,
  BucketAccess,
  DefaultBucketAccess,
  BucketCertificate,
  CreateBucketRequest,
  CreateObjectStorageKeyRequest,
  UpdateObjectStorageKeyRequest,
  UpdateBucketAccessRequest,
  UploadCertificateRequest
} from './client/objectStorage';

export type {
  Domain,
  DomainRecord,
  CreateDomainRequest,
  UpdateDomainRequest,
  CreateDomainRecordRequest,
  UpdateDomainRecordRequest,
  ImportZoneRequest,
  CloneDomainRequest
} from './client/domains';

export type {
  DatabaseEngine,
  DatabaseType,
  DatabaseInstance,
  MySQLDatabaseInstance,
  PostgreSQLDatabaseInstance,
  DatabaseCredentials,
  SSLCertificate,
  CreateMySQLDatabaseRequest,
  UpdateMySQLDatabaseRequest,
  CreatePostgreSQLDatabaseRequest,
  UpdatePostgreSQLDatabaseRequest
} from './client/databases';

export type {
  KubernetesCluster,
  KubernetesNodePool,
  KubernetesNode,
  KubernetesVersion,
  KubeConfig,
  APIEndpoint,
  KubernetesDashboard,
  KubernetesType,
  CreateKubernetesClusterRequest,
  UpdateKubernetesClusterRequest,
  CreateNodePoolRequest,
  UpdateNodePoolRequest,
  RecycleNodePoolRequest
} from './client/kubernetes';

export type {
  Image,
  CreateImageRequest,
  UploadImageRequest,
  UpdateImageRequest,
  ReplicateImageRequest
} from './client/images';

export type {
  StackScript
} from './client/stackScripts';

export type {
  Tag,
  CreateTagRequest
} from './client/tags';

