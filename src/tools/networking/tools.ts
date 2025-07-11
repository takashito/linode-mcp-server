import { FastMCP } from 'fastmcp';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';

export function registerNetworkingTools(server: FastMCP, client: LinodeClient) {
  // IP Address operations
    server.addTool({
    name: 'get_ip_addresses',
    description: 'Get all IP addresses',
    parameters: schemas.getIPAddressesSchema,
    execute: async () => {
      const result = await client.networking.getIPAddresses();
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'get_ip_address',
    description: 'Get details for a specific IP address',
    parameters: schemas.getIPAddressSchema,
    execute: async (params) => {
      const result = await client.networking.getIPAddress(params.address);
      return JSON.stringify(result, null, 2);
    
    }
  });

  server.addTool({
    name: 'update_ip_address',
    description: 'Update reverse DNS for an IP address',
    parameters: schemas.updateIPSchema,
    execute: async (params) => {
      const result = await client.networking.updateIPAddress(params.address, { rdns: params.rdns });
      return JSON.stringify(result, null, 2);
    }
  });

    server.addTool({
    name: 'allocate_ip',
    description: 'Allocate a new IP address',
    parameters: schemas.allocateIPSchema,
    execute: async (params) => {
      const result = await client.networking.allocateIPAddress(params);
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'share_ips',
    description: 'Share IP addresses between Linodes',
    parameters: schemas.shareIPsSchema,
    execute: async (params) => {
      const result = await client.networking.shareIPAddresses(params);
      return JSON.stringify(result, null, 2);
    
    }
  });

  // IPv6 operations
    server.addTool({
    name: 'get_ipv6_ranges',
    description: 'Get all IPv6 ranges',
    parameters: schemas.getIPv6RangesSchema,
    execute: async () => {
      const result = await client.networking.getIPv6Ranges();
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'get_ipv6_range',
    description: 'Get a specific IPv6 range',
    parameters: schemas.getIPv6RangeSchema,
    execute: async (params) => {
      const result = await client.networking.getIPv6Range(params.range);
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'get_ipv6_pools',
    description: 'Get all IPv6 pools',
    parameters: schemas.getIPv6PoolsSchema,
    execute: async () => {
      const result = await client.networking.getIPv6Pools();
      return JSON.stringify(result, null, 2);
    
    }
  });

  // Firewall operations
    server.addTool({
    name: 'get_firewalls',
    description: 'Get all firewalls',
    parameters: schemas.getFirewallsSchema,
    execute: async (params) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.networking.getFirewalls(paginationParams);
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'get_firewall',
    description: 'Get details for a specific firewall',
    parameters: schemas.getFirewallSchema,
    execute: async (params) => {
      const result = await client.networking.getFirewall(params.id);
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'create_firewall',
    description: 'Create a new firewall',
    parameters: schemas.createFirewallSchema,
    execute: async (params) => {
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
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'update_firewall',
    description: 'Update a firewall',
    parameters: schemas.updateFirewallSchema,
    execute: async (params) => {
      const { id, ...updateData } = params;
      const result = await client.networking.updateFirewall(id, updateData);
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'delete_firewall',
    description: 'Delete a firewall',
    parameters: schemas.deleteFirewallSchema,
    execute: async (params) => {
      const result = await client.networking.deleteFirewall(params.id);
      return JSON.stringify(result, null, 2);
    
    }
  });

  // Firewall rules operations
    server.addTool({
    name: 'get_firewall_rules',
    description: 'Get all rules for a specific firewall',
    parameters: schemas.getFirewallRulesSchema,
    execute: async (params) => {
      const result = await client.networking.getFirewallRules(params.firewallId);
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'update_firewall_rules',
    description: 'Update rules for a specific firewall',
    parameters: schemas.updateFirewallRulesSchema,
    execute: async (params) => {
      const { firewallId, ...ruleData } = params;
      const result = await client.networking.updateFirewallRules(firewallId, ruleData);
      return JSON.stringify(result, null, 2);
    
    }
  });

  // Firewall device operations
    server.addTool({
    name: 'get_firewall_devices',
    description: 'Get all devices for a specific firewall',
    parameters: schemas.getFirewallDevicesSchema,
    execute: async (params) => {
      const { firewallId, page, page_size } = params;
      // The client doesn't accept pagination for this endpoint based on the interface
      const result = await client.networking.getFirewallDevices(firewallId);
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'create_firewall_device',
    description: 'Create a new device for a specific firewall',
    parameters: schemas.createFirewallDeviceSchema,
    execute: async (params) => {
      const { firewallId, ...deviceData } = params;
      const result = await client.networking.createFirewallDevice(firewallId, deviceData);
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'delete_firewall_device',
    description: 'Delete a device from a specific firewall',
    parameters: schemas.deleteFirewallDeviceSchema,
    execute: async (params) => {
      const result = await client.networking.deleteFirewallDevice(params.firewallId, params.deviceId);
      return JSON.stringify(result, null, 2);
    
    }
  });

  // VLAN operations
    server.addTool({
    name: 'get_vlans',
    description: 'Get all VLANs',
    parameters: schemas.getVLANsSchema,
    execute: async (params) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.networking.getVLANs(paginationParams);
      return JSON.stringify(result, null, 2);
    
    }
  });

    server.addTool({
    name: 'get_vlan',
    description: 'Get a specific VLAN',
    parameters: schemas.getVLANSchema,
    execute: async (params) => {
      const result = await client.networking.getVLAN(params.regionId, params.label);
      return JSON.stringify(result, null, 2);
    
    }
  });
}