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
  createTagsClient,
  createSupportClient,
  createLongviewClient,
  createProfileClient,
  createAccountClient
} from './client/index';

const API_ROOT = 'https://api.linode.com/v4';

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
  const support = createSupportClient(API_ROOT, token);
  const longview = createLongviewClient(axiosInstance);
  const profile = createProfileClient(axiosInstance);
  const account = createAccountClient(axiosInstance);

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
    support,
    longview,
    profile,
    account
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

export type {
  SupportClient
} from './client/support';

export type {
  LongviewClientInterface,
  LongviewClient,
  LongviewSubscription,
  LongviewData,
  CreateLongviewClientRequest,
  UpdateLongviewClientRequest
} from './client/longview';

export type {
  ProfileClientInterface,
  UserProfile,
  SSHKey,
  APIToken,
  TwoFactorResponse,
  UpdateProfileRequest,
  CreateSSHKeyRequest,
  UpdateSSHKeyRequest,
  CreatePersonalAccessTokenRequest,
  UpdateTokenRequest,
  TwoFactorConfirmRequest,
  ScopeListResponse
} from './client/profile';

export type {
  AccountClientInterface,
  Account,
  UpdateAccountRequest,
  Agreement,
  AcknowledgeAgreementRequest,
  ServiceAvailability,
  RegionServiceAvailability,
  CancelAccountRequest,
  ChildAccount,
  ProxyTokenRequest,
  ProxyToken,
  AccountEvent,
  Invoice,
  InvoiceItem,
  AccountLogin,
  Maintenance,
  Notification,
  OAuthClient,
  CreateOAuthClientRequest,
  UpdateOAuthClientRequest,
  OAuthClientSecret,
  AccountSettings,
  UpdateAccountSettingsRequest,
  AccountNetworkTransfer,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserGrants,
  UpdateUserGrantsRequest
} from './client/account';

