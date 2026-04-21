import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerVPCTools(server: FastMCP) {
  server.addTool({
    name: 'list_vpcs',
    description: 'List all VPCs',
    parameters: mcpInput(schemas.listVPCsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).vpcs.getVPCs();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_vpc',
    description: 'Get details for a specific VPC',
    parameters: mcpInput(schemas.getVPCSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).vpcs.getVPC(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_vpc',
    description: 'Create a new VPC',
    parameters: mcpInput(schemas.createVPCSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).vpcs.createVPC(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_vpc',
    description: 'Update an existing VPC',
    parameters: mcpInput(schemas.updateVPCSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...data } = params;
      const result = await createClient(context).vpcs.updateVPC(id, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_vpc',
    description: 'Delete a VPC',
    parameters: mcpInput(schemas.deleteVPCSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).vpcs.deleteVPC(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  // VPC Subnet tools
  server.addTool({
    name: 'list_vpc_subnets',
    description: 'List all subnets in a VPC',
    parameters: mcpInput(schemas.listSubnetsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).vpcs.getSubnets(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_vpc_subnet',
    description: 'Get details for a specific subnet in a VPC',
    parameters: mcpInput(schemas.getSubnetSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).vpcs.getSubnet(params.id, params.subnet_id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_vpc_subnet',
    description: 'Create a new subnet in a VPC',
    parameters: mcpInput(schemas.createSubnetSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...data } = params;
      const result = await createClient(context).vpcs.createSubnet(id, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_vpc_subnet',
    description: 'Update an existing subnet in a VPC',
    parameters: mcpInput(schemas.updateSubnetSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, subnet_id, ...data } = params;
      const result = await createClient(context).vpcs.updateSubnet(id, subnet_id, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_vpc_subnet',
    description: 'Delete a subnet in a VPC',
    parameters: mcpInput(schemas.deleteSubnetSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).vpcs.deleteSubnet(params.id, params.subnet_id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  // VPC IP tools
  server.addTool({
    name: 'list_vpc_ips',
    description: 'List all IP addresses in a VPC',
    parameters: mcpInput(schemas.listVPCIPsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).vpcs.getVPCIPs(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'list_all_vpc_ips',
    description: 'List all VPC IP addresses across all VPCs',
    parameters: mcpInput(schemas.listAllVPCIPsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).vpcs.getAllVPCIPs(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // NodeBalancer VPC tools
  server.addTool({
    name: 'list_nodebalancer_vpcs',
    description: 'List VPC configurations for a NodeBalancer',
    parameters: mcpInput(schemas.listNodeBalancerVPCsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { nodeBalancerId, page, page_size } = params;
      const result = await createClient(context).vpcs.getNodeBalancerVPCs(nodeBalancerId, { page, page_size });
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_nodebalancer_vpc',
    description: 'Get a specific VPC configuration for a NodeBalancer',
    parameters: mcpInput(schemas.getNodeBalancerVPCSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).vpcs.getNodeBalancerVPC(params.nodeBalancerId, params.nodeBalancerVpcConfigId);
      return JSON.stringify(result, null, 2);
    })
  });
}
