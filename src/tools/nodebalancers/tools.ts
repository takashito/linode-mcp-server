import { FastMCP } from 'fastmcp';
import { createClient, CreateNodeBalancerRequest, NodeBalancerConfig } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerNodeBalancerTools(server: FastMCP) {
  // Register NodeBalancer tools
  server.addTool({
    name: 'list_nodebalancers',
    description: 'Get a list of all NodeBalancers',
    parameters: mcpInput(schemas.listNodeBalancersSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).nodeBalancers.getNodeBalancers(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_nodebalancer',
    description: 'Get details for a specific NodeBalancer including its port configurations and nodes',
    parameters: mcpInput(schemas.getNodeBalancerSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const client = createClient(context).nodeBalancers;
      const result = await client.getNodeBalancer(params.id);
      result.configs = (await client.getNodeBalancerConfigs(result.id)).data;
      result.configs.forEach(async (config: NodeBalancerConfig) => {
        config.nodes = (await client.getNodeBalancerConfigNodes(result.id, config.id)).data;
      });
      
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_nodebalancer',
    description: 'Create a new NodeBalancer',
    parameters: mcpInput(schemas.createNodeBalancerSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const createParams: CreateNodeBalancerRequest = {
        region: String(params.region),
        label: params.label,
        client_conn_throttle: params.client_conn_throttle,
        tags: params.tags
      };
      const result = await createClient(context).nodeBalancers.createNodeBalancer(createParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_nodebalancer',
    description: 'Delete a NodeBalancer',
    parameters: mcpInput(schemas.deleteNodeBalancerSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).nodeBalancers.deleteNodeBalancer(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'add_nodebalancer_config',
    description: 'Add a port configuration to a NodeBalancer',
    parameters: mcpInput(schemas.createNodeBalancerConfigSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { nodebalancer_id, ...configParams } = params;
      const result = await createClient(context).nodeBalancers.createNodeBalancerConfig(nodebalancer_id, configParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'remove_nodebalancer_config',
    description: 'remove a port configuration from a NodeBalancer',
    parameters: mcpInput(schemas.deleteNodeBalancerConfigSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).nodeBalancers.deleteNodeBalancerConfig(params.nodebalancer_id, params.config_id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'add_nodebalancer_node',
    description: 'Add a node to a NodeBalancer port config',
    parameters: mcpInput(schemas.createNodeBalancerNodeSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { nodebalancer_id, config_id, ...nodeParams } = params;
      const result = await createClient(context).nodeBalancers.createNodeBalancerConfigNode(nodebalancer_id, config_id, nodeParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'remove_nodebalancer_node',
    description: 'Remove a node from a NodeBalancer port config',
    parameters: mcpInput(schemas.deleteNodeBalancerNodeSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).nodeBalancers.deleteNodeBalancerConfigNode(
        params.nodebalancer_id,
        params.config_id,
        params.node_id
      );
      return JSON.stringify(result, null, 2);
    })
  });

  // NodeBalancer Firewall operations
  server.addTool({
    name: 'list_nodebalancer_firewalls',
    description: 'List firewalls assigned to a NodeBalancer',
    parameters: mcpInput(schemas.listNodeBalancerFirewallsSchema),
    execute: withErrorHandling(async (params: { nodeBalancerId: number; page?: number; page_size?: number }, context?: any) => {
      const { nodeBalancerId, ...paginationParams } = params;
      const result = await createClient(context).nodeBalancers.getNodeBalancerFirewalls(nodeBalancerId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_nodebalancer_firewalls',
    description: 'Update the firewalls assigned to a NodeBalancer',
    parameters: mcpInput(schemas.updateNodeBalancerFirewallsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { nodeBalancerId, ...data } = params;
      const result = await createClient(context).nodeBalancers.updateNodeBalancerFirewalls(nodeBalancerId, data);
      return JSON.stringify(result, null, 2);
    })
  });
}
