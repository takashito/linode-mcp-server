import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';

export function registerNetworkingTools(server: McpServer, client: LinodeClient) {
  // IP Address operations
  server.tool(
    'get_ip_addresses',
    'Get all IP addresses',
    schemas.getIPAddressesSchema.shape,
    async (_, extra) => {
      const result = await client.networking.getIPAddresses();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_ip_address',
    'Get details for a specific IP address',
    schemas.getIPAddressSchema.shape,
    async (params, extra) => {
      const result = await client.networking.getIPAddress(params.address);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_ip_address',
    'Update reverse DNS for an IP address',
    schemas.updateIPSchema.shape,
    async (params, extra) => {
      const result = await client.networking.updateIPAddress(params.address, { rdns: params.rdns });
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'allocate_ip',
    'Allocate a new IP address',
    schemas.allocateIPSchema.shape,
    async (params, extra) => {
      const result = await client.networking.allocateIPAddress(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'share_ips',
    'Share IP addresses between Linodes',
    schemas.shareIPsSchema.shape,
    async (params, extra) => {
      const result = await client.networking.shareIPAddresses(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // IPv6 operations
  server.tool(
    'get_ipv6_ranges',
    'Get all IPv6 ranges',
    schemas.getIPv6RangesSchema.shape,
    async (_, extra) => {
      const result = await client.networking.getIPv6Ranges();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_ipv6_range',
    'Get a specific IPv6 range',
    schemas.getIPv6RangeSchema.shape,
    async (params, extra) => {
      const result = await client.networking.getIPv6Range(params.range);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_ipv6_pools',
    'Get all IPv6 pools',
    schemas.getIPv6PoolsSchema.shape,
    async (_, extra) => {
      const result = await client.networking.getIPv6Pools();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Firewall operations
  server.tool(
    'get_firewalls',
    'Get all firewalls',
    schemas.getFirewallsSchema.shape,
    async (params, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.networking.getFirewalls(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_firewall',
    'Get details for a specific firewall',
    schemas.getFirewallSchema.shape,
    async (params, extra) => {
      const result = await client.networking.getFirewall(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_firewall',
    'Create a new firewall',
    schemas.createFirewallSchema.shape,
    async (params, extra) => {
      // Create FirewallRequest with correct structure
      const firewall: any = {
        label: params.label,
        rules: {
          inbound_policy: params.rules?.inbound_policy || 'DROP',
          outbound_policy: params.rules?.outbound_policy || 'ACCEPT',
          inbound: params.rules?.inbound || [],
          outbound: params.rules?.outbound || []
        }
      };
      
      // Add optional fields if provided
      if (params.tags) {
        firewall.tags = params.tags;
      }
      
      if (params.devices) {
        firewall.devices = params.devices;
      }
      
      const result = await client.networking.createFirewall(firewall);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_firewall',
    'Update a firewall',
    schemas.updateFirewallSchema.shape,
    async (params, extra) => {
      const { id, ...updateData } = params;
      const result = await client.networking.updateFirewall(id, updateData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_firewall',
    'Delete a firewall',
    schemas.deleteFirewallSchema.shape,
    async (params, extra) => {
      const result = await client.networking.deleteFirewall(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Firewall rules operations
  server.tool(
    'get_firewall_rules',
    'Get all rules for a specific firewall',
    schemas.getFirewallRulesSchema.shape,
    async (params, extra) => {
      const result = await client.networking.getFirewallRules(params.firewallId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'update_firewall_rules',
    'Update rules for a specific firewall',
    schemas.updateFirewallRulesSchema.shape,
    async (params, extra) => {
      const { firewallId, ...ruleData } = params;
      const result = await client.networking.updateFirewallRules(firewallId, ruleData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // Firewall device operations
  server.tool(
    'get_firewall_devices',
    'Get all devices for a specific firewall',
    schemas.getFirewallDevicesSchema.shape,
    async (params, extra) => {
      const { firewallId, page, page_size } = params;
      // The client doesn't accept pagination for this endpoint based on the interface
      const result = await client.networking.getFirewallDevices(firewallId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'create_firewall_device',
    'Create a new device for a specific firewall',
    schemas.createFirewallDeviceSchema.shape,
    async (params, extra) => {
      const { firewallId, ...deviceData } = params;
      const result = await client.networking.createFirewallDevice(firewallId, deviceData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'delete_firewall_device',
    'Delete a device from a specific firewall',
    schemas.deleteFirewallDeviceSchema.shape,
    async (params, extra) => {
      const result = await client.networking.deleteFirewallDevice(params.firewallId, params.deviceId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  // VLAN operations
  server.tool(
    'get_vlans',
    'Get all VLANs',
    schemas.getVLANsSchema.shape,
    async (params, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.networking.getVLANs(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );

  server.tool(
    'get_vlan',
    'Get a specific VLAN',
    schemas.getVLANSchema.shape,
    async (params, extra) => {
      const result = await client.networking.getVLAN(params.regionId, params.label);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    }
  );
}