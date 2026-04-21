import { z } from "zod";
import { pagingParamsSchema, tagsSchema, coerceBoolean } from '../common/schemas';

// Kubernetes cluster schemas
export const listKubernetesClustersSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getClusterSchema = z.object({
  id: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

export const createClusterSchema = z.object({
  label: z.string().describe('A unique label for the cluster (1-32 alphanumeric characters, hyphen, and underscore)'),
  region: z.string().describe('The region where the Kubernetes cluster will be deployed'),
  k8s_version: z.string().describe('The Kubernetes version to use for this cluster'),
  tags: tagsSchema,
  node_pools: z.array(z.object({
    type: z.string().describe('The Linode Type ID for nodes in this pool'),
    count: z.coerce.number().describe('The number of nodes in this pool (minimum: 1)'),
    tags: tagsSchema,
    autoscaler: z.object({
      enabled: coerceBoolean().describe('Whether autoscaling is enabled for this node pool'),
      min: z.coerce.number().optional().describe('The minimum number of nodes to autoscale to'),
      max: z.coerce.number().optional().describe('The maximum number of nodes to autoscale to')
    }).optional().describe('Node pool autoscaler settings')
  })).describe('An array of node pools for the cluster (minimum: 1)'),
  control_plane: z.object({
    high_availability: coerceBoolean().optional().describe('Whether High Availability is enabled for the control plane')
  }).optional().describe('Control plane settings')
});

export const updateClusterSchema = z.object({
  id: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  label: z.string().optional().describe('A unique label for the cluster'),
  k8s_version: z.string().optional().describe('The Kubernetes version to upgrade to'),
  tags: tagsSchema,
  control_plane: z.object({
    high_availability: coerceBoolean().optional().describe('Whether High Availability is enabled for the control plane')
  }).optional().describe('Control plane settings')
});

export const deleteClusterSchema = z.object({
  id: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

// Node pool schemas
export const getNodePoolsSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

export const getNodePoolSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  poolId: z.coerce.number().describe('The ID of the node pool')
});

export const createNodePoolSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  type: z.string().describe('The Linode Type ID for nodes in this pool'),
  count: z.coerce.number().describe('The number of nodes in this pool (minimum: 1)'),
  tags: tagsSchema,
  autoscaler: z.object({
    enabled: coerceBoolean().describe('Whether autoscaling is enabled for this node pool'),
    min: z.coerce.number().optional().describe('The minimum number of nodes to autoscale to'),
    max: z.coerce.number().optional().describe('The maximum number of nodes to autoscale to')
  }).optional().describe('Node pool autoscaler settings')
});

export const updateNodePoolSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  poolId: z.coerce.number().describe('The ID of the node pool'),
  count: z.coerce.number().optional().describe('The number of nodes in this pool'),
  tags: tagsSchema,
  autoscaler: z.object({
    enabled: coerceBoolean().describe('Whether autoscaling is enabled for this node pool'),
    min: z.coerce.number().optional().describe('The minimum number of nodes to autoscale to'),
    max: z.coerce.number().optional().describe('The maximum number of nodes to autoscale to')
  }).optional().describe('Node pool autoscaler settings')
});

export const deleteNodePoolSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  poolId: z.coerce.number().describe('The ID of the node pool')
});

export const recycleNodesSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  poolId: z.coerce.number().describe('The ID of the node pool'),
  nodes: z.array(z.string()).describe('An array of node IDs to recycle')
});

// Node operations
export const deleteNodeSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  nodeId: z.string().describe('The ID of the node to delete')
});

export const recycleNodeSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  nodeId: z.string().describe('The ID of the node to recycle')
});

// Cluster access schemas
export const getKubeconfigSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

export const getAPIEndpointsSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

export const getDashboardURLSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

export const deleteServiceTokenSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

// Cluster management schemas
export const recycleClusterSchema = z.object({
  id: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

// Version and type schemas
export const getVersionsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getVersionSchema = z.object({
  version: z.string().describe('The Kubernetes version to get details for')
});

export const getTypesSchema = z.object({
  ...pagingParamsSchema.shape
});

// Control Plane ACL schemas
export const getControlPlaneACLSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

export const updateControlPlaneACLSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  acl: z.object({
    enabled: coerceBoolean().optional().describe('Whether the Control Plane ACL is enabled'),
    'revision-id': z.string().optional().describe('The revision ID of the ACL for optimistic concurrency control'),
    addresses: z.object({
      ipv4: z.array(z.string()).optional().describe('A list of IPv4 addresses or CIDR ranges allowed to access the control plane'),
      ipv6: z.array(z.string()).optional().describe('A list of IPv6 addresses or CIDR ranges allowed to access the control plane')
    }).optional().describe('The allowed addresses for the control plane')
  }).describe('The ACL configuration for the control plane')
});

export const deleteControlPlaneACLSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

// Delete Kubeconfig schema
export const deleteKubeconfigSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

// Regenerate cluster schema
export const regenerateClusterSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster')
});

// Get node schema
export const getNodeSchema = z.object({
  clusterId: z.coerce.number().describe('The ID of the Kubernetes cluster'),
  nodeId: z.string().describe('The ID of the node')
});

// Tier version schemas
export const listTierVersionsSchema = z.object({
  tier: z.string().describe('The tier of the Kubernetes cluster (e.g., "standard", "enterprise")')
});

export const getTierVersionSchema = z.object({
  tier: z.string().describe('The tier of the Kubernetes cluster (e.g., "standard", "enterprise")'),
  version: z.string().describe('The Kubernetes version')
});