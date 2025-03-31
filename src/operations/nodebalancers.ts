import { LinodeClient } from '../client';

/**
 * Operations for managing NodeBalancers
 */
export class NodeBalancerOperations {
  private client: LinodeClient;

  constructor(client: LinodeClient) {
    this.client = client;
  }

  /**
   * Get a list of all NodeBalancers
   */
  async listNodeBalancers(params?: { page?: number; page_size?: number; }) {
    return this.client.nodebalancers.getNodeBalancers(params);
  }

  /**
   * Get details for a specific NodeBalancer
   */
  async getNodeBalancer(id: number) {
    return this.client.nodebalancers.getNodeBalancer(id);
  }

  /**
   * Create a new NodeBalancer
   */
  async createNodeBalancer(params: {
    region: string;
    label?: string;
    client_conn_throttle?: number;
    tags?: string[];
    configs?: any[];
  }) {
    return this.client.nodebalancers.createNodeBalancer(params);
  }

  /**
   * Delete a NodeBalancer
   */
  async deleteNodeBalancer(id: number) {
    return this.client.nodebalancers.deleteNodeBalancer(id);
  }

  /**
   * Get a list of config nodes for a NodeBalancer
   */
  async listNodeBalancerConfigs(nodeBalancerId: number) {
    return this.client.nodebalancers.getNodeBalancerConfigs(nodeBalancerId);
  }

  /**
   * Create a new config for a NodeBalancer
   */
  async createNodeBalancerConfig(nodeBalancerId: number, params: {
    port: number;
    protocol: string;
    algorithm?: string;
    stickiness?: string;
    check?: string;
    check_interval?: number;
    check_timeout?: number;
    check_attempts?: number;
    check_path?: string;
    check_body?: string;
    check_passive?: boolean;
    cipher_suite?: string;
    ssl_cert?: string;
    ssl_key?: string;
  }) {
    return this.client.nodebalancers.createNodeBalancerConfig(nodeBalancerId, params);
  }

  /**
   * Delete a NodeBalancer config
   */
  async deleteNodeBalancerConfig(nodeBalancerId: number, configId: number) {
    return this.client.nodebalancers.deleteNodeBalancerConfig(nodeBalancerId, configId);
  }

  /**
   * Get a list of nodes for a NodeBalancer config
   */
  async listNodeBalancerNodes(nodeBalancerId: number, configId: number) {
    return this.client.nodebalancers.getNodeBalancerConfigNodes(nodeBalancerId, configId);
  }

  /**
   * Create a new node for a NodeBalancer config
   */
  async createNodeBalancerNode(nodeBalancerId: number, configId: number, params: {
    address: string;
    label: string;
    weight?: number;
    mode?: string;
  }) {
    return this.client.nodebalancers.createNodeBalancerConfigNode(nodeBalancerId, configId, params);
  }

  /**
   * Delete a node from a NodeBalancer config
   */
  async deleteNodeBalancerNode(nodeBalancerId: number, configId: number, nodeId: number) {
    return this.client.nodebalancers.deleteNodeBalancerConfigNode(nodeBalancerId, configId, nodeId);
  }
}
