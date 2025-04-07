import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, VPC, VPCSubnet } from '../../client';
import { VPCIP } from '../../client/vpcs';
import * as schemas from './schemas';
import { registerToolsWithErrorHandling, ToolRegistration } from '../common/errorHandler';

export function registerVPCTools(server: McpServer, client: LinodeClient) {
  // Define all VPC tools with error handling
  const vpcTools: ToolRegistration[] = [
    {
      name: 'list_vpcs',
      description: 'List all VPCs',
      schema: schemas.listVPCsSchema.shape,
      handler: async (_, extra) => {
        const result = await client.vpcs.getVPCs();
        return {
          content: [
            { type: 'text', text: formatVPCs(result.data) },
          ],
        };
      }
    },
    {
      name: 'get_vpc',
      description: 'Get details for a specific VPC',
      schema: schemas.getVPCSchema.shape,
      handler: async (params, extra) => {
        const result = await client.vpcs.getVPC(params.id);
        return {
          content: [
            { type: 'text', text: formatVPC(result) },
          ],
        };
      }
    },
    {
      name: 'create_vpc',
      description: 'Create a new VPC',
      schema: schemas.createVPCSchema.shape,
      handler: async (params, extra) => {
        const result = await client.vpcs.createVPC(params);
        return {
          content: [
            { type: 'text', text: JSON.stringify(result, null, 2) },
          ],
        };
      }
    },
    {
      name: 'update_vpc',
      description: 'Update an existing VPC',
      schema: schemas.updateVPCSchema.shape,
      handler: async (params, extra) => {
        const { id, ...data } = params;
        const result = await client.vpcs.updateVPC(id, data);
        return {
          content: [
            { type: 'text', text: JSON.stringify(result, null, 2) },
          ],
        };
      }
    },
    {
      name: 'delete_vpc',
      description: 'Delete a VPC',
      schema: schemas.deleteVPCSchema.shape,
      handler: async (params, extra) => {
        await client.vpcs.deleteVPC(params.id);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    // VPC Subnet tools
    {
      name: 'list_vpc_subnets',
      description: 'List all subnets in a VPC',
      schema: schemas.listSubnetsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.vpcs.getSubnets(params.id);
        return {
          content: [
            { type: 'text', text: formatVPCSubnets(result.data) },
          ],
        };
      }
    },
    {
      name: 'get_vpc_subnet',
      description: 'Get details for a specific subnet in a VPC',
      schema: schemas.getSubnetSchema.shape,
      handler: async (params, extra) => {
        const result = await client.vpcs.getSubnet(params.id, params.subnet_id);
        return {
          content: [
            { type: 'text', text: formatVPCSubnet(result) },
          ],
        };
      }
    },
    {
      name: 'create_vpc_subnet',
      description: 'Create a new subnet in a VPC',
      schema: schemas.createSubnetSchema.shape,
      handler: async (params, extra) => {
        const { id, ...data } = params;
        const result = await client.vpcs.createSubnet(id, data);
        return {
          content: [
            { type: 'text', text: JSON.stringify(result, null, 2) },
          ],
        };
      }
    },
    {
      name: 'update_vpc_subnet',
      description: 'Update an existing subnet in a VPC',
      schema: schemas.updateSubnetSchema.shape,
      handler: async (params, extra) => {
        const { id, subnet_id, ...data } = params;
        const result = await client.vpcs.updateSubnet(id, subnet_id, data);
        return {
          content: [
            { type: 'text', text: JSON.stringify(result, null, 2) },
          ],
        };
      }
    },
    {
      name: 'delete_vpc_subnet',
      description: 'Delete a subnet in a VPC',
      schema: schemas.deleteSubnetSchema.shape,
      handler: async (params, extra) => {
        await client.vpcs.deleteSubnet(params.id, params.subnet_id);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    // VPC IP tools
    {
      name: 'list_vpc_ips',
      description: 'List all IP addresses in a VPC',
      schema: schemas.listVPCIPsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.vpcs.getVPCIPs(params.id);
        return {
          content: [
            { type: 'text', text: formatVPCIPs(result.data) },
          ],
        };
      }
    }
  ];
  
  // Register all tools with error handling
  registerToolsWithErrorHandling(server, vpcTools);
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