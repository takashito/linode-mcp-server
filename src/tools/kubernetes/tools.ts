import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

/**
 * Registers Kubernetes tools with the MCP server
 */
export function registerKubernetesTools(server: FastMCP) {
  // Cluster operations
  server.addTool({
    name: 'list_kubernetes_clusters',
    description: 'List all Kubernetes clusters',
    parameters: mcpInput(schemas.listKubernetesClustersSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getClusters(params);
      return JSON.stringify(result.data, null, 2);
    })
  });
  server.addTool({
    name: 'get_kubernetes_cluster',
    description: 'Get details for a specific Kubernetes cluster',
    parameters: mcpInput(schemas.getClusterSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getCluster(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_kubernetes_cluster',
    description: 'Create a new Kubernetes cluster',
    parameters: mcpInput(schemas.createClusterSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.createCluster(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_kubernetes_cluster',
    description: 'Update an existing Kubernetes cluster',
    parameters: mcpInput(schemas.updateClusterSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...data } = params;
      const result = await createClient(context).kubernetes.updateCluster(id, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_kubernetes_cluster',
    description: 'Delete a Kubernetes cluster',
    parameters: mcpInput(schemas.deleteClusterSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).kubernetes.deleteCluster(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Node pool operations
  server.addTool({
    name: 'list_kubernetes_node_pools',
    description: 'List all node pools in a Kubernetes cluster',
    parameters: mcpInput(schemas.getNodePoolsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getNodePools(params.clusterId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_kubernetes_node_pool',
    description: 'Get details for a specific node pool in a Kubernetes cluster',
    parameters: mcpInput(schemas.getNodePoolSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getNodePool(params.clusterId, params.poolId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_kubernetes_node_pool',
    description: 'Create a new node pool in a Kubernetes cluster',
    parameters: mcpInput(schemas.createNodePoolSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { clusterId, ...data } = params;
      const result = await createClient(context).kubernetes.createNodePool(clusterId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_kubernetes_node_pool',
    description: 'Update an existing node pool in a Kubernetes cluster',
    parameters: mcpInput(schemas.updateNodePoolSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { clusterId, poolId, ...data } = params;
      const result = await createClient(context).kubernetes.updateNodePool(clusterId, poolId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_kubernetes_node_pool',
    description: 'Delete a node pool from a Kubernetes cluster',
    parameters: mcpInput(schemas.deleteNodePoolSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).kubernetes.deleteNodePool(params.clusterId, params.poolId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'recycle_kubernetes_nodes',
    description: 'Recycle specified nodes in a node pool',
    parameters: mcpInput(schemas.recycleNodesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { clusterId, poolId, nodes } = params;
      await createClient(context).kubernetes.recycleNodes(clusterId, poolId, { nodes });
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Other Kubernetes operations
  server.addTool({
    name: 'list_kubernetes_versions',
    description: 'List all available Kubernetes versions',
    parameters: mcpInput(schemas.getVersionsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getVersions();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_kubernetes_kubeconfig',
    description: 'Get the kubeconfig for a Kubernetes cluster',
    parameters: mcpInput(schemas.getKubeconfigSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getKubeconfig(params.clusterId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_kubernetes_api_endpoints',
    description: 'Get the API endpoints for a Kubernetes cluster',
    parameters: mcpInput(schemas.getAPIEndpointsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getAPIEndpoints(params.clusterId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'recycle_kubernetes_cluster',
    description: 'Recycle all nodes in a Kubernetes cluster',
    parameters: mcpInput(schemas.recycleClusterSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).kubernetes.recycleCluster(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  // Node operations
  server.addTool({
    name: 'delete_kubernetes_node',
    description: 'Delete a node from a Kubernetes cluster',
    parameters: mcpInput(schemas.deleteNodeSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).kubernetes.deleteNode(params.clusterId, params.nodeId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'recycle_kubernetes_node',
    description: 'Recycle a node in a Kubernetes cluster',
    parameters: mcpInput(schemas.recycleNodeSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).kubernetes.recycleNode(params.clusterId, params.nodeId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Dashboard and service token operations
  server.addTool({
    name: 'get_kubernetes_dashboard_url',
    description: 'Get the dashboard URL for a Kubernetes cluster',
    parameters: mcpInput(schemas.getDashboardURLSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getDashboardURL(params.clusterId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_kubernetes_service_token',
    description: 'Delete the service token for a Kubernetes cluster',
    parameters: mcpInput(schemas.deleteServiceTokenSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).kubernetes.deleteServiceToken(params.clusterId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Version and type operations
  server.addTool({
    name: 'get_kubernetes_version',
    description: 'Get details for a specific Kubernetes version',
    parameters: mcpInput(schemas.getVersionSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getVersion(params.version);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'list_kubernetes_types',
    description: 'List all available Kubernetes types',
    parameters: mcpInput(schemas.getTypesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getTypes();
      return JSON.stringify(result, null, 2);
    })
  });

  // Control Plane ACL operations
  server.addTool({
    name: 'get_kubernetes_control_plane_acl',
    description: 'Get the control plane ACL configuration for a Kubernetes cluster',
    parameters: mcpInput(schemas.getControlPlaneACLSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getControlPlaneACL(params.clusterId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_kubernetes_control_plane_acl',
    description: 'Update the control plane ACL configuration for a Kubernetes cluster',
    parameters: mcpInput(schemas.updateControlPlaneACLSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { clusterId, ...data } = params;
      const result = await createClient(context).kubernetes.updateControlPlaneACL(clusterId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_kubernetes_control_plane_acl',
    description: 'Delete the control plane ACL configuration for a Kubernetes cluster',
    parameters: mcpInput(schemas.deleteControlPlaneACLSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).kubernetes.deleteControlPlaneACL(params.clusterId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Kubeconfig operations
  server.addTool({
    name: 'delete_kubernetes_kubeconfig',
    description: 'Delete (revoke) the kubeconfig for a Kubernetes cluster',
    parameters: mcpInput(schemas.deleteKubeconfigSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).kubernetes.deleteKubeconfig(params.clusterId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Cluster regeneration
  server.addTool({
    name: 'regenerate_kubernetes_cluster',
    description: 'Regenerate a Kubernetes cluster',
    parameters: mcpInput(schemas.regenerateClusterSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).kubernetes.regenerateCluster(params.clusterId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Get node
  server.addTool({
    name: 'get_kubernetes_node',
    description: 'Get details about a specific node in a Kubernetes cluster',
    parameters: mcpInput(schemas.getNodeSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getNode(params.clusterId, params.nodeId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Tier version operations
  server.addTool({
    name: 'list_kubernetes_tier_versions',
    description: 'List available Kubernetes versions for a specific tier',
    parameters: mcpInput(schemas.listTierVersionsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getTierVersions(params.tier);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_kubernetes_tier_version',
    description: 'Get details for a specific Kubernetes version for a tier',
    parameters: mcpInput(schemas.getTierVersionSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).kubernetes.getTierVersion(params.tier, params.version);
      return JSON.stringify(result, null, 2);
    })
  });
}