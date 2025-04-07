import { z } from 'zod';
import { pagingParamsSchema, tagsSchema } from '../common/schemas';

// Kubernetes cluster schemas
export const listKubernetesClustersSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getClusterSchema = z.object({
  id: z.number().describe('The ID of the Kubernetes cluster')
});

export const createClusterSchema = z.object({
  label: z.string().describe('A unique label for the cluster (1-32 alphanumeric characters, hyphen, and underscore)'),
  region: z.string().describe('The region where the Kubernetes cluster will be deployed'),
  k8s_version: z.string().describe('The Kubernetes version to use for this cluster'),
  tags: tagsSchema,
  node_pools: z.array(z.object({
    type: z.string().describe('The Linode Type ID for nodes in this pool'),
    count: z.number().min(1).describe('The number of nodes in this pool'),
    tags: tagsSchema,
    autoscaler: z.object({
      enabled: z.boolean().describe('Whether autoscaling is enabled for this node pool'),
      min: z.number().optional().describe('The minimum number of nodes to autoscale to'),
      max: z.number().optional().describe('The maximum number of nodes to autoscale to')
    }).optional().describe('Node pool autoscaler settings')
  })).min(1).describe('An array of node pools for the cluster'),
  control_plane: z.object({
    high_availability: z.boolean().optional().describe('Whether High Availability is enabled for the control plane')
  }).optional().describe('Control plane settings')
});

export const updateClusterSchema = z.object({
  id: z.number().describe('The ID of the Kubernetes cluster'),
  label: z.string().optional().describe('A unique label for the cluster'),
  k8s_version: z.string().optional().describe('The Kubernetes version to upgrade to'),
  tags: tagsSchema,
  control_plane: z.object({
    high_availability: z.boolean().optional().describe('Whether High Availability is enabled for the control plane')
  }).optional().describe('Control plane settings')
});

export const deleteClusterSchema = z.object({
  id: z.number().describe('The ID of the Kubernetes cluster')
});

// Node pool schemas
export const getNodePoolsSchema = z.object({
  clusterId: z.number().describe('The ID of the Kubernetes cluster')
});

export const getNodePoolSchema = z.object({
  clusterId: z.number().describe('The ID of the Kubernetes cluster'),
  poolId: z.number().describe('The ID of the node pool')
});

export const createNodePoolSchema = z.object({
  clusterId: z.number().describe('The ID of the Kubernetes cluster'),
  type: z.string().describe('The Linode Type ID for nodes in this pool'),
  count: z.number().min(1).describe('The number of nodes in this pool'),
  tags: tagsSchema,
  autoscaler: z.object({
    enabled: z.boolean().describe('Whether autoscaling is enabled for this node pool'),
    min: z.number().optional().describe('The minimum number of nodes to autoscale to'),
    max: z.number().optional().describe('The maximum number of nodes to autoscale to')
  }).optional().describe('Node pool autoscaler settings')
});

export const updateNodePoolSchema = z.object({
  clusterId: z.number().describe('The ID of the Kubernetes cluster'),
  poolId: z.number().describe('The ID of the node pool'),
  count: z.number().optional().describe('The number of nodes in this pool'),
  tags: tagsSchema,
  autoscaler: z.object({
    enabled: z.boolean().describe('Whether autoscaling is enabled for this node pool'),
    min: z.number().optional().describe('The minimum number of nodes to autoscale to'),
    max: z.number().optional().describe('The maximum number of nodes to autoscale to')
  }).optional().describe('Node pool autoscaler settings')
});

export const deleteNodePoolSchema = z.object({
  clusterId: z.number().describe('The ID of the Kubernetes cluster'),
  poolId: z.number().describe('The ID of the node pool')
});

export const recycleNodesSchema = z.object({
  clusterId: z.number().describe('The ID of the Kubernetes cluster'),
  poolId: z.number().describe('The ID of the node pool'),
  nodes: z.array(z.string()).describe('An array of node IDs to recycle')
});

// Other Kubernetes schemas
export const getVersionsSchema = z.object({});

export const getKubeconfigSchema = z.object({
  id: z.number().describe('The ID of the Kubernetes cluster')
});

export const getAPIEndpointsSchema = z.object({
  id: z.number().describe('The ID of the Kubernetes cluster')
});

export const recycleClusterSchema = z.object({
  id: z.number().describe('The ID of the Kubernetes cluster')
});

export const upgradeClusterSchema = z.object({
  id: z.number().describe('The ID of the Kubernetes cluster')
});