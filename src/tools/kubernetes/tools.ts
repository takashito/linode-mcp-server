import { FastMCP } from 'fastmcp';
import { createClient, LinodeClient, KubernetesCluster, KubernetesNodePool, KubernetesNode, KubernetesVersion, KubeConfig, APIEndpoint, KubernetesDashboard, KubernetesType } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

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
 * Formats Kubernetes dashboard URL for display
 */
function formatDashboardURL(dashboard: KubernetesDashboard): string {
      return `Dashboard URL: ${dashboard.url}`;
}

/**
 * Formats Kubernetes node for display
 */
function formatNode(node: KubernetesNode): string {
  const details = [
    `ID: ${node.id}`,
    `Instance ID: ${node.instance_id}`,
    `Status: ${node.status}`
  ];
  
  return details.join('\n');
}

/**
 * Formats Kubernetes types for display
 */
function formatKubernetesTypes(types: KubernetesType[]): string {
  if (types.length === 0) {
      return 'No Kubernetes types found.';
  }

  return types.map((type) => {
      return `${type.label} (ID: ${type.id}, Monthly: $${type.price.monthly}, Hourly: $${type.price.hourly})`;
    }).join('\n');
}

/**
 * Registers Kubernetes tools with the MCP server
 */
export function registerKubernetesTools(server: FastMCP, client: LinodeClient) {
  // Cluster operations
  server.addTool({
    name: 'list_kubernetes_clusters',
    description: 'List all Kubernetes clusters',
    parameters: schemas.listKubernetesClustersSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getClusters(params);
      return formatKubernetesClusters(result.data);
    })
  });
  server.addTool({
    name: 'get_kubernetes_cluster',
    description: 'Get details for a specific Kubernetes cluster',
    parameters: schemas.getClusterSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getCluster(params.id);
      return formatKubernetesCluster(result);
    })
  });
  server.addTool({
    name: 'create_kubernetes_cluster',
    description: 'Create a new Kubernetes cluster',
    parameters: schemas.createClusterSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.createCluster(params);
      return formatKubernetesCluster(result);
    })
  });
  server.addTool({
    name: 'update_kubernetes_cluster',
    description: 'Update an existing Kubernetes cluster',
    parameters: schemas.updateClusterSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...data } = params;
      const result = await createClient(context, server).kubernetes.updateCluster(id, data);
      return formatKubernetesCluster(result);
    })
  });
  server.addTool({
    name: 'delete_kubernetes_cluster',
    description: 'Delete a Kubernetes cluster',
    parameters: schemas.deleteClusterSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).kubernetes.deleteCluster(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Node pool operations
  server.addTool({
    name: 'list_kubernetes_node_pools',
    description: 'List all node pools in a Kubernetes cluster',
    parameters: schemas.getNodePoolsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getNodePools(params.clusterId);
      return formatNodePools(result);
    })
  });
  server.addTool({
    name: 'get_kubernetes_node_pool',
    description: 'Get details for a specific node pool in a Kubernetes cluster',
    parameters: schemas.getNodePoolSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getNodePool(params.clusterId, params.poolId);
      return formatNodePool(result);
    })
  });
  server.addTool({
    name: 'create_kubernetes_node_pool',
    description: 'Create a new node pool in a Kubernetes cluster',
    parameters: schemas.createNodePoolSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { clusterId, ...data } = params;
      const result = await createClient(context, server).kubernetes.createNodePool(clusterId, data);
      return formatNodePool(result);
    })
  });
  server.addTool({
    name: 'update_kubernetes_node_pool',
    description: 'Update an existing node pool in a Kubernetes cluster',
    parameters: schemas.updateNodePoolSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { clusterId, poolId, ...data } = params;
      const result = await createClient(context, server).kubernetes.updateNodePool(clusterId, poolId, data);
      return formatNodePool(result);
    })
  });
  server.addTool({
    name: 'delete_kubernetes_node_pool',
    description: 'Delete a node pool from a Kubernetes cluster',
    parameters: schemas.deleteNodePoolSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).kubernetes.deleteNodePool(params.clusterId, params.poolId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'recycle_kubernetes_nodes',
    description: 'Recycle specified nodes in a node pool',
    parameters: schemas.recycleNodesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { clusterId, poolId, nodes } = params;
      await createClient(context, server).kubernetes.recycleNodes(clusterId, poolId, { nodes });
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Other Kubernetes operations
  server.addTool({
    name: 'list_kubernetes_versions',
    description: 'List all available Kubernetes versions',
    parameters: schemas.getVersionsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getVersions();
      return formatKubernetesVersions(result);
    })
  });
  server.addTool({
    name: 'get_kubernetes_kubeconfig',
    description: 'Get the kubeconfig for a Kubernetes cluster',
    parameters: schemas.getKubeconfigSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getKubeconfig(params.id);
      return result.kubeconfig;
    })
  });
  server.addTool({
    name: 'get_kubernetes_api_endpoints',
    description: 'Get the API endpoints for a Kubernetes cluster',
    parameters: schemas.getAPIEndpointsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getAPIEndpoints(params.id);
      return formatAPIEndpoints(result);
    })
  });
  server.addTool({
    name: 'recycle_kubernetes_cluster',
    description: 'Recycle all nodes in a Kubernetes cluster',
    parameters: schemas.recycleClusterSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).kubernetes.recycleCluster(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'upgrade_kubernetes_cluster',
    description: 'Upgrade a Kubernetes cluster to the latest patch version',
    parameters: schemas.upgradeClusterSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).kubernetes.upgradeCluster(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Node operations
  server.addTool({
    name: 'delete_kubernetes_node',
    description: 'Delete a node from a Kubernetes cluster',
    parameters: schemas.deleteNodeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).kubernetes.deleteNode(params.clusterId, params.nodeId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'recycle_kubernetes_node',
    description: 'Recycle a node in a Kubernetes cluster',
    parameters: schemas.recycleNodeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).kubernetes.recycleNode(params.clusterId, params.nodeId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Dashboard and service token operations
  server.addTool({
    name: 'get_kubernetes_dashboard_url',
    description: 'Get the dashboard URL for a Kubernetes cluster',
    parameters: schemas.getDashboardURLSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getDashboardURL(params.id);
      return formatDashboardURL(result);
    })
  });
  server.addTool({
    name: 'delete_kubernetes_service_token',
    description: 'Delete the service token for a Kubernetes cluster',
    parameters: schemas.deleteServiceTokenSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).kubernetes.deleteServiceToken(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Version and type operations
  server.addTool({
    name: 'get_kubernetes_version',
    description: 'Get details for a specific Kubernetes version',
    parameters: schemas.getVersionSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getVersion(params.version);
      return result.id;
    })
  });
  server.addTool({
    name: 'list_kubernetes_types',
    description: 'List all available Kubernetes types',
    parameters: schemas.getTypesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).kubernetes.getTypes();
      return formatKubernetesTypes(result);
    })
  });
}