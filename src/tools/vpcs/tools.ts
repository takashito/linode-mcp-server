import { FastMCP } from 'fastmcp';
import { LinodeClient, VPC, VPCSubnet } from '../../client';
import { VPCIP } from '../../client/vpcs';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerVPCTools(server: FastMCP, client: LinodeClient) {
  server.addTool({
    name: 'list_vpcs',
    description: 'List all VPCs',
    parameters: schemas.listVPCsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.vpcs.getVPCs();
      return formatVPCs(result.data);
    })
  });
  server.addTool({
    name: 'get_vpc',
    description: 'Get details for a specific VPC',
    parameters: schemas.getVPCSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.vpcs.getVPC(params.id);
      return formatVPC(result);
    })
  });
  server.addTool({
    name: 'create_vpc',
    description: 'Create a new VPC',
    parameters: schemas.createVPCSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.vpcs.createVPC(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_vpc',
    description: 'Update an existing VPC',
    parameters: schemas.updateVPCSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...data } = params;
      const result = await client.vpcs.updateVPC(id, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_vpc',
    description: 'Delete a VPC',
    parameters: schemas.deleteVPCSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.vpcs.deleteVPC(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  // VPC Subnet tools
  server.addTool({
    name: 'list_vpc_subnets',
    description: 'List all subnets in a VPC',
    parameters: schemas.listSubnetsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.vpcs.getSubnets(params.id);
      return formatVPCSubnets(result.data);
    })
  });
  server.addTool({
    name: 'get_vpc_subnet',
    description: 'Get details for a specific subnet in a VPC',
    parameters: schemas.getSubnetSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.vpcs.getSubnet(params.id, params.subnet_id);
      return formatVPCSubnet(result);
    })
  });
  server.addTool({
    name: 'create_vpc_subnet',
    description: 'Create a new subnet in a VPC',
    parameters: schemas.createSubnetSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...data } = params;
      const result = await client.vpcs.createSubnet(id, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_vpc_subnet',
    description: 'Update an existing subnet in a VPC',
    parameters: schemas.updateSubnetSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, subnet_id, ...data } = params;
      const result = await client.vpcs.updateSubnet(id, subnet_id, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_vpc_subnet',
    description: 'Delete a subnet in a VPC',
    parameters: schemas.deleteSubnetSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.vpcs.deleteSubnet(params.id, params.subnet_id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  // VPC IP tools
  server.addTool({
    name: 'list_vpc_ips',
    description: 'List all IP addresses in a VPC',
    parameters: schemas.listVPCIPsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.vpcs.getVPCIPs(params.id);
      return formatVPCIPs(result.data);
    })
  });
}

/**
 * Formats a VPC for display
 */
function formatVPC(vpc: VPC): string {
  const details = [
    `ID: ${vpc.id}`,
    `Label: ${vpc.label}`,
    `Region: ${vpc.region}`,
    `Created: ${new Date(vpc.created).toLocaleString()}`,
    `Updated: ${new Date(vpc.updated).toLocaleString()}`,
  ];

  if (vpc.description) {
    details.push(`Description: ${vpc.description}`);
  }

  if (vpc.tags && vpc.tags.length > 0) {
    details.push(`Tags: ${vpc.tags.join(', ')}`);
  }

  if (vpc.subnets && vpc.subnets.length > 0) {
    details.push(`Subnets: ${vpc.subnets.length}`);
    vpc.subnets.forEach((subnet, index) => {
      details.push(`\n  Subnet ${index + 1}:`);
      details.push(`    ID: ${subnet.id}`);
      details.push(`    Label: ${subnet.label}`);
      details.push(`    CIDR: ${subnet.ipv4}`);
      details.push(`    Created: ${new Date(subnet.created).toLocaleString()}`);
      if (subnet.tags && subnet.tags.length > 0) {
        details.push(`    Tags: ${subnet.tags.join(', ')}`);
      }
    });
  } else {
    details.push('Subnets: None');
  }

  return details.join('\n');
}

/**
 * Formats a VPC subnet for display
 */
function formatVPCSubnet(subnet: VPCSubnet): string {
  const details = [
    `ID: ${subnet.id}`,
    `Label: ${subnet.label}`,
    `CIDR: ${subnet.ipv4}`,
    `Created: ${new Date(subnet.created).toLocaleString()}`,
    `Updated: ${new Date(subnet.updated).toLocaleString()}`,
  ];

  if (subnet.tags && subnet.tags.length > 0) {
    details.push(`Tags: ${subnet.tags.join(', ')}`);
  }

  return details.join('\n');
}

/**
 * Formats VPCs for display
 */
function formatVPCs(vpcs: VPC[]): string {
  if (vpcs.length === 0) {
      return 'No VPCs found.';
  }

  const formattedVPCs = vpcs.map((vpc) => {
      return `${vpc.label} (ID: ${vpc.id}, Region: ${vpc.region}, Subnets: ${vpc.subnets.length})`;
    });

  return formattedVPCs.join('\n');
}

/**
 * Formats VPC subnets for display
 */
function formatVPCSubnets(subnets: VPCSubnet[]): string {
  if (subnets.length === 0) {
      return 'No subnets found.';
  }

  const formattedSubnets = subnets.map((subnet) => {
      return `${subnet.label} (ID: ${subnet.id}, CIDR: ${subnet.ipv4})`;
    });

  return formattedSubnets.join('\n');
}

/**
 * Formats VPC IPs for display
 */
function formatVPCIPs(ips: VPCIP[]): string {
  if (ips.length === 0) {
      return 'No IP addresses found in this VPC.';
  }

  const formattedIPs = ips.map((ip) => {
    let ipInfo = `${ip.address} (Subnet ID: ${ip.subnet_id}, Type: ${ip.type}`;
    
    if (ip.linode_id) {
      ipInfo += `, Linode ID: ${ip.linode_id}`;
    }
    
    if (ip.gateway) {
      ipInfo += ', Gateway: Yes';
    }
    
    ipInfo += ')';
    return ipInfo;
    });

  return formattedIPs.join('\n');
}