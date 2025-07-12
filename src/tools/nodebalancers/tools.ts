import { FastMCP } from 'fastmcp';
import { createClient, LinodeClient, CreateNodeBalancerRequest } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerNodeBalancerTools(server: FastMCP, client: LinodeClient) {
  // Register NodeBalancer tools
  server.addTool({
    name: 'list_nodebalancers',
    description: 'Get a list of all NodeBalancers',
    parameters: schemas.listNodeBalancersSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).nodeBalancers.getNodeBalancers(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_nodebalancer',
    description: 'Get details for a specific NodeBalancer',
    parameters: schemas.getNodeBalancerSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).nodeBalancers.getNodeBalancer(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_nodebalancer',
    description: 'Create a new NodeBalancer',
    parameters: schemas.createNodeBalancerSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const createParams: CreateNodeBalancerRequest = {
        region: String(params.region),
        label: params.label,
        client_conn_throttle: params.client_conn_throttle,
        tags: params.tags
      };
      const result = await createClient(context, server).nodeBalancers.createNodeBalancer(createParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_nodebalancer',
    description: 'Delete a NodeBalancer',
    parameters: schemas.deleteNodeBalancerSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).nodeBalancers.deleteNodeBalancer(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'list_nodebalancer_configs',
    description: 'Get a list of config nodes for a NodeBalancer',
    parameters: schemas.listNodeBalancerConfigsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).nodeBalancers.getNodeBalancerConfigs(params.nodebalancer_id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_nodebalancer_config',
    description: 'Create a new config for a NodeBalancer',
    parameters: schemas.createNodeBalancerConfigSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { nodebalancer_id, ...configParams } = params;
      const result = await createClient(context, server).nodeBalancers.createNodeBalancerConfig(nodebalancer_id, configParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_nodebalancer_config',
    description: 'Delete a NodeBalancer config',
    parameters: schemas.deleteNodeBalancerConfigSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).nodeBalancers.deleteNodeBalancerConfig(params.nodebalancer_id, params.config_id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'list_nodebalancer_nodes',
    description: 'Get a list of nodes for a NodeBalancer config',
    parameters: schemas.listNodeBalancerNodesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).nodeBalancers.getNodeBalancerConfigNodes(params.nodebalancer_id, params.config_id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_nodebalancer_node',
    description: 'Create a new node for a NodeBalancer config',
    parameters: schemas.createNodeBalancerNodeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { nodebalancer_id, config_id, ...nodeParams } = params;
      const result = await createClient(context, server).nodeBalancers.createNodeBalancerConfigNode(nodebalancer_id, config_id, nodeParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_nodebalancer_node',
    description: 'Delete a node from a NodeBalancer config',
    parameters: schemas.deleteNodeBalancerNodeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).nodeBalancers.deleteNodeBalancerConfigNode(
        params.nodebalancer_id,
        params.config_id,
        params.node_id
      );
      return JSON.stringify(result, null, 2);
    })
  });
}
