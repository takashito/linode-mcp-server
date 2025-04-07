import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, KubernetesCluster, KubernetesNodePool, KubernetesNode, KubernetesVersion, KubeConfig, APIEndpoint } from '../../client';
import * as schemas from './schemas';
import { registerToolsWithErrorHandling, ToolRegistration } from '../common/errorHandler';

/**
 * Formats a Kubernetes cluster for display
 */
function formatKubernetesCluster(cluster: KubernetesCluster): string {
  const details = [
    `ID: ${cluster.id}`,
    `Label: ${cluster.label}`,
    `Kubernetes Version: ${cluster.k8s_version}`,
    `Region: ${cluster.region}`,
    `Status: ${cluster.status}`,
    `Created: ${new Date(cluster.created).toLocaleString()}`,
    `Updated: ${new Date(cluster.updated).toLocaleString()}`,
    `High Availability Control Plane: ${cluster.control_plane?.high_availability ? 'Yes' : 'No'}`
  ];

  if (cluster.tags && cluster.tags.length > 0) {
    details.push(`Tags: ${cluster.tags.join(', ')}`);
  }

  return details.join('\n');
}

/**
 * Formats Kubernetes clusters for display
 */
function formatKubernetesClusters(clusters: KubernetesCluster[]): string {
  if (clusters.length === 0) {
    return 'No Kubernetes clusters found.';
  }

  return clusters.map((cluster) => {
    return `${cluster.label} (ID: ${cluster.id}, Region: ${cluster.region}, K8s: ${cluster.k8s_version}, Status: ${cluster.status})`;
  }).join('\n');
}

/**
 * Formats a node pool for display
 */
function formatNodePool(pool: KubernetesNodePool): string {
  const details = [
    `ID: ${pool.id}`,
    `Type: ${pool.type}`,
    `Count: ${pool.count} nodes`
  ];

  if (pool.autoscaler) {
    details.push(`Autoscaler: ${pool.autoscaler.enabled ? 'Enabled' : 'Disabled'}`);
    if (pool.autoscaler.enabled) {
      if (pool.autoscaler.min !== undefined) {
        details.push(`Autoscaler Min: ${pool.autoscaler.min}`);
      }
      if (pool.autoscaler.max !== undefined) {
        details.push(`Autoscaler Max: ${pool.autoscaler.max}`);
      }
    }
  }

  if (pool.tags && pool.tags.length > 0) {
    details.push(`Tags: ${pool.tags.join(', ')}`);
  }

  if (pool.nodes && pool.nodes.length > 0) {
    details.push('\nNodes:');
    pool.nodes.forEach(node => {
      details.push(`  - ID: ${node.id}, Instance ID: ${node.instance_id}, Status: ${node.status}`);
    });
  }

  return details.join('\n');
}

/**
 * Formats node pools for display
 */
function formatNodePools(pools: KubernetesNodePool[]): string {
  if (pools.length === 0) {
    return 'No node pools found.';
  }

  return pools.map((pool) => {
    return `ID: ${pool.id}, Type: ${pool.type}, ${pool.count} nodes, ${pool.nodes.length} active`;
  }).join('\n');
}

/**
 * Formats Kubernetes versions for display
 */
function formatKubernetesVersions(versions: KubernetesVersion[]): string {
  if (versions.length === 0) {
    return 'No Kubernetes versions found.';
  }

  return versions.map((version) => version.id).join('\n');
}

/**
 * Formats API endpoints for display
 */
function formatAPIEndpoints(endpoints: APIEndpoint[]): string {
  if (endpoints.length === 0) {
    return 'No API endpoints found.';
  }

  return endpoints.map((endpoint) => endpoint.endpoint).join('\n');
}

/**
 * Registers Kubernetes tools with the MCP server
 */
export function registerKubernetesTools(server: McpServer, client: LinodeClient) {
  // Define all Kubernetes tools with error handling
  const kubernetesTools: ToolRegistration[] = [
    // Cluster operations
    {
      name: 'list_kubernetes_clusters',
      description: 'List all Kubernetes clusters',
      schema: schemas.listKubernetesClustersSchema.shape,
      handler: async (params, extra) => {
        const result = await client.kubernetes.getClusters(params);
        return {
          content: [
            { type: 'text', text: formatKubernetesClusters(result.data) },
          ],
        };
      }
    },
    {
      name: 'get_kubernetes_cluster',
      description: 'Get details for a specific Kubernetes cluster',
      schema: schemas.getClusterSchema.shape,
      handler: async (params, extra) => {
        const result = await client.kubernetes.getCluster(params.id);
        return {
          content: [
            { type: 'text', text: formatKubernetesCluster(result) },
          ],
        };
      }
    },
    {
      name: 'create_kubernetes_cluster',
      description: 'Create a new Kubernetes cluster',
      schema: schemas.createClusterSchema.shape,
      handler: async (params, extra) => {
        const result = await client.kubernetes.createCluster(params);
        return {
          content: [
            { type: 'text', text: formatKubernetesCluster(result) },
          ],
        };
      }
    },
    {
      name: 'update_kubernetes_cluster',
      description: 'Update an existing Kubernetes cluster',
      schema: schemas.updateClusterSchema.shape,
      handler: async (params, extra) => {
        const { id, ...data } = params;
        const result = await client.kubernetes.updateCluster(id, data);
        return {
          content: [
            { type: 'text', text: formatKubernetesCluster(result) },
          ],
        };
      }
    },
    {
      name: 'delete_kubernetes_cluster',
      description: 'Delete a Kubernetes cluster',
      schema: schemas.deleteClusterSchema.shape,
      handler: async (params, extra) => {
        await client.kubernetes.deleteCluster(params.id);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },

    // Node pool operations
    {
      name: 'list_kubernetes_node_pools',
      description: 'List all node pools in a Kubernetes cluster',
      schema: schemas.getNodePoolsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.kubernetes.getNodePools(params.clusterId);
        return {
          content: [
            { type: 'text', text: formatNodePools(result) },
          ],
        };
      }
    },
    {
      name: 'get_kubernetes_node_pool',
      description: 'Get details for a specific node pool in a Kubernetes cluster',
      schema: schemas.getNodePoolSchema.shape,
      handler: async (params, extra) => {
        const result = await client.kubernetes.getNodePool(params.clusterId, params.poolId);
        return {
          content: [
            { type: 'text', text: formatNodePool(result) },
          ],
        };
      }
    },
    {
      name: 'create_kubernetes_node_pool',
      description: 'Create a new node pool in a Kubernetes cluster',
      schema: schemas.createNodePoolSchema.shape,
      handler: async (params, extra) => {
        const { clusterId, ...data } = params;
        const result = await client.kubernetes.createNodePool(clusterId, data);
        return {
          content: [
            { type: 'text', text: formatNodePool(result) },
          ],
        };
      }
    },
    {
      name: 'update_kubernetes_node_pool',
      description: 'Update an existing node pool in a Kubernetes cluster',
      schema: schemas.updateNodePoolSchema.shape,
      handler: async (params, extra) => {
        const { clusterId, poolId, ...data } = params;
        const result = await client.kubernetes.updateNodePool(clusterId, poolId, data);
        return {
          content: [
            { type: 'text', text: formatNodePool(result) },
          ],
        };
      }
    },
    {
      name: 'delete_kubernetes_node_pool',
      description: 'Delete a node pool from a Kubernetes cluster',
      schema: schemas.deleteNodePoolSchema.shape,
      handler: async (params, extra) => {
        await client.kubernetes.deleteNodePool(params.clusterId, params.poolId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    {
      name: 'recycle_kubernetes_nodes',
      description: 'Recycle specified nodes in a node pool',
      schema: schemas.recycleNodesSchema.shape,
      handler: async (params, extra) => {
        const { clusterId, poolId, nodes } = params;
        await client.kubernetes.recycleNodes(clusterId, poolId, { nodes });
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },

    // Other Kubernetes operations
    {
      name: 'list_kubernetes_versions',
      description: 'List all available Kubernetes versions',
      schema: schemas.getVersionsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.kubernetes.getVersions();
        return {
          content: [
            { type: 'text', text: formatKubernetesVersions(result) },
          ],
        };
      }
    },
    {
      name: 'get_kubernetes_kubeconfig',
      description: 'Get the kubeconfig for a Kubernetes cluster',
      schema: schemas.getKubeconfigSchema.shape,
      handler: async (params, extra) => {
        const result = await client.kubernetes.getKubeconfig(params.id);
        return {
          content: [
            { type: 'text', text: result.kubeconfig },
          ],
        };
      }
    },
    {
      name: 'get_kubernetes_api_endpoints',
      description: 'Get the API endpoints for a Kubernetes cluster',
      schema: schemas.getAPIEndpointsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.kubernetes.getAPIEndpoints(params.id);
        return {
          content: [
            { type: 'text', text: formatAPIEndpoints(result) },
          ],
        };
      }
    },
    {
      name: 'recycle_kubernetes_cluster',
      description: 'Recycle all nodes in a Kubernetes cluster',
      schema: schemas.recycleClusterSchema.shape,
      handler: async (params, extra) => {
        await client.kubernetes.recycleCluster(params.id);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    {
      name: 'upgrade_kubernetes_cluster',
      description: 'Upgrade a Kubernetes cluster to the latest patch version',
      schema: schemas.upgradeClusterSchema.shape,
      handler: async (params, extra) => {
        await client.kubernetes.upgradeCluster(params.id);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    }
  ];
  
  // Register all tools with error handling
  registerToolsWithErrorHandling(server, kubernetesTools);
}