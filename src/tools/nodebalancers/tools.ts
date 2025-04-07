import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, CreateNodeBalancerRequest } from '../../client';
import * as schemas from './schemas';

export function registerNodeBalancerTools(server: McpServer, client: LinodeClient) {
  // Register NodeBalancer tools
  server.tool(
    'list_nodebalancers',
    'Get a list of all NodeBalancers',
    schemas.listNodeBalancersSchema.shape,
    async (params, extra) => {
      const result = await client.nodeBalancers.getNodeBalancers(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_nodebalancer',
    'Get details for a specific NodeBalancer',
    schemas.getNodeBalancerSchema.shape,
    async (params, extra) => {
      const result = await client.nodeBalancers.getNodeBalancer(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_nodebalancer',
    'Create a new NodeBalancer',
    schemas.createNodeBalancerSchema.shape,
    async (params: any, extra: any) => {
      const createParams: CreateNodeBalancerRequest = {
        region: String(params.region),
        label: params.label,
        client_conn_throttle: params.client_conn_throttle,
        tags: params.tags
      };
      const result = await client.nodeBalancers.createNodeBalancer(createParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_nodebalancer',
    'Delete a NodeBalancer',
    schemas.deleteNodeBalancerSchema.shape,
    async (params, extra) => {
      const result = await client.nodeBalancers.deleteNodeBalancer(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_nodebalancer_configs',
    'Get a list of config nodes for a NodeBalancer',
    schemas.listNodeBalancerConfigsSchema.shape,
    async (params, extra) => {
      const result = await client.nodeBalancers.getNodeBalancerConfigs(params.nodebalancer_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_nodebalancer_config',
    'Create a new config for a NodeBalancer',
    schemas.createNodeBalancerConfigSchema.shape,
    async (params, extra) => {
      const { nodebalancer_id, ...configParams } = params;
      const result = await client.nodeBalancers.createNodeBalancerConfig(nodebalancer_id, configParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_nodebalancer_config',
    'Delete a NodeBalancer config',
    schemas.deleteNodeBalancerConfigSchema.shape,
    async (params, extra) => {
      const result = await client.nodeBalancers.deleteNodeBalancerConfig(params.nodebalancer_id, params.config_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'list_nodebalancer_nodes',
    'Get a list of nodes for a NodeBalancer config',
    schemas.listNodeBalancerNodesSchema.shape,
    async (params, extra) => {
      const result = await client.nodeBalancers.getNodeBalancerConfigNodes(params.nodebalancer_id, params.config_id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_nodebalancer_node',
    'Create a new node for a NodeBalancer config',
    schemas.createNodeBalancerNodeSchema.shape,
    async (params, extra) => {
      const { nodebalancer_id, config_id, ...nodeParams } = params;
      const result = await client.nodeBalancers.createNodeBalancerConfigNode(nodebalancer_id, config_id, nodeParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_nodebalancer_node',
    'Delete a node from a NodeBalancer config',
    schemas.deleteNodeBalancerNodeSchema.shape,
    async (params, extra) => {
      const result = await client.nodeBalancers.deleteNodeBalancerConfigNode(
        params.nodebalancer_id,
        params.config_id,
        params.node_id
      );
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );
}
