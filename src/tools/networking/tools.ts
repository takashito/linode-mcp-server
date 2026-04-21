import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerNetworkingTools(server: FastMCP) {
  // IP Address operations
    server.addTool({
    name: 'list_ip_addresses',
    description: 'list all IP addresses',
    parameters: mcpInput(schemas.getIPAddressesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getIPAddresses();
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_ip_address',
    description: 'Get details for a specific IP address',
    parameters: mcpInput(schemas.getIPAddressSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getIPAddress(params.address);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_ip_address',
    description: 'Update reverse DNS for an IP address',
    parameters: mcpInput(schemas.updateIPSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.updateIPAddress(params.address, { rdns: params.rdns });
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'allocate_ip',
    description: 'Allocate a new IP address',
    parameters: mcpInput(schemas.allocateIPSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.allocateIPAddress(params);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'share_ips',
    description: 'Share IP addresses between Linodes',
    parameters: mcpInput(schemas.shareIPsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.shareIPAddresses(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // IPv6 operations
    server.addTool({
    name: 'list_ipv6_ranges',
    description: 'List all IPv6 ranges',
    parameters: mcpInput(schemas.getIPv6RangesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getIPv6Ranges();
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_ipv6_range',
    description: 'Get a specific IPv6 range',
    parameters: mcpInput(schemas.getIPv6RangeSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getIPv6Range(params.range);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'list_ipv6_pools',
    description: 'List all IPv6 pools',
    parameters: mcpInput(schemas.getIPv6PoolsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getIPv6Pools();
      return JSON.stringify(result, null, 2);
    })
  });

  // Firewall operations
    server.addTool({
    name: 'list_firewalls',
    description: 'List all firewalls',
    parameters: mcpInput(schemas.getFirewallsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).networking.getFirewalls(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_firewall',
    description: 'Get details for a specific firewall',
    parameters: mcpInput(schemas.getFirewallSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getFirewall(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'create_firewall',
    description: 'Create a new firewall',
    parameters: mcpInput(schemas.createFirewallSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
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
      
      const result = await createClient(context).networking.createFirewall(firewall);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'update_firewall',
    description: 'Update a firewall',
    parameters: mcpInput(schemas.updateFirewallSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...updateData } = params;
      const result = await createClient(context).networking.updateFirewall(id, updateData);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'delete_firewall',
    description: 'Delete a firewall',
    parameters: mcpInput(schemas.deleteFirewallSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.deleteFirewall(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  // Firewall rules operations
    server.addTool({
    name: 'list_firewall_rules',
    description: 'List all rules for a specific firewall',
    parameters: mcpInput(schemas.getFirewallRulesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getFirewallRules(params.firewallId);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'update_firewall_rules',
    description: 'Update rules for a specific firewall',
    parameters: mcpInput(schemas.updateFirewallRulesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { firewallId, ...ruleData } = params;
      const result = await createClient(context).networking.updateFirewallRules(firewallId, ruleData);
      return JSON.stringify(result, null, 2);
    })
  });

  // Firewall device operations
    server.addTool({
    name: 'list_firewall_devices',
    description: 'List all devices for a specific firewall',
    parameters: mcpInput(schemas.getFirewallDevicesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { firewallId, page, page_size } = params;
      // The client doesn't accept pagination for this endpoint based on the interface
      const result = await createClient(context).networking.getFirewallDevices(firewallId);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'create_firewall_device',
    description: 'Create a new device for a specific firewall',
    parameters: mcpInput(schemas.createFirewallDeviceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { firewallId, ...deviceData } = params;
      const result = await createClient(context).networking.createFirewallDevice(firewallId, deviceData);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'delete_firewall_device',
    description: 'Delete a device from a specific firewall',
    parameters: mcpInput(schemas.deleteFirewallDeviceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.deleteFirewallDevice(params.firewallId, params.deviceId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Get a specific firewall device
    server.addTool({
    name: 'get_firewall_device',
    description: 'Get a specific device for a firewall',
    parameters: mcpInput(schemas.getFirewallDeviceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getFirewallDevice(params.firewallId, params.deviceId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Firewall history operations
    server.addTool({
    name: 'list_firewall_history',
    description: 'List firewall rule versions',
    parameters: mcpInput(schemas.listFirewallHistorySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { firewallId, page, page_size } = params;
      const result = await createClient(context).networking.getFirewallHistory(firewallId, { page, page_size });
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_firewall_rule_version',
    description: 'Get a specific firewall rule version',
    parameters: mcpInput(schemas.getFirewallRuleVersionSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getFirewallRuleVersion(params.firewallId, params.version);
      return JSON.stringify(result, null, 2);
    })
  });

  // Firewall settings operations
    server.addTool({
    name: 'get_firewall_settings',
    description: 'List default firewalls settings',
    parameters: mcpInput(schemas.getFirewallSettingsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getFirewallSettings();
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'update_firewall_settings',
    description: 'Update default firewalls settings',
    parameters: mcpInput(schemas.updateFirewallSettingsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.updateFirewallSettings(params.settings);
      return JSON.stringify(result, null, 2);
    })
  });

  // Firewall template operations
    server.addTool({
    name: 'list_firewall_templates',
    description: 'List firewall templates',
    parameters: mcpInput(schemas.listFirewallTemplatesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getFirewallTemplates();
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_firewall_template',
    description: 'Get a firewall template by slug',
    parameters: mcpInput(schemas.getFirewallTemplateSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getFirewallTemplate(params.slug);
      return JSON.stringify(result, null, 2);
    })
  });

  // IP assignment operations
    server.addTool({
    name: 'assign_ips',
    description: 'Assign IP addresses to Linodes',
    parameters: mcpInput(schemas.assignIPsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.assignIPs({ assignments: params.assignments });
      return JSON.stringify(result, null, 2);
    })
  });

  // IPv4 operations
    server.addTool({
    name: 'assign_ipv4_addresses',
    description: 'Assign IPv4 addresses to Linodes',
    parameters: mcpInput(schemas.assignIPv4AddressesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.assignIPv4Addresses({ assignments: params.assignments });
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'share_ipv4_addresses',
    description: 'Configure IPv4 address sharing',
    parameters: mcpInput(schemas.shareIPv4AddressesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.shareIPv4Addresses({ ips: params.ips, linode_id: params.linode_id });
      return JSON.stringify(result, null, 2);
    })
  });

  // IPv6 range operations
    server.addTool({
    name: 'create_ipv6_range',
    description: 'Create an IPv6 range',
    parameters: mcpInput(schemas.createIPv6RangeSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.createIPv6Range({ linode_id: params.linode_id, prefix_length: params.prefix_length });
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'delete_ipv6_range',
    description: 'Delete an IPv6 range',
    parameters: mcpInput(schemas.deleteIPv6RangeSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.deleteIPv6Range(params.range);
      return JSON.stringify(result, null, 2);
    })
  });

  // VLAN operations
    server.addTool({
    name: 'delete_vlan',
    description: 'Delete a VLAN',
    parameters: mcpInput(schemas.deleteVLANSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.deleteVLAN(params.regionId, params.label);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'list_vlans',
    description: 'List all VLANs',
    parameters: mcpInput(schemas.getVLANsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).networking.getVLANs(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_vlan',
    description: 'Get a specific VLAN',
    parameters: mcpInput(schemas.getVLANSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getVLAN(params.regionId, params.label);
      return JSON.stringify(result, null, 2);
    })
  });

  // Network Transfer Prices operations
    server.addTool({
    name: 'list_network_transfer_prices',
    description: 'List network transfer prices',
    parameters: mcpInput(schemas.listNetworkTransferPricesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getNetworkTransferPrices();
      return JSON.stringify(result, null, 2);
    })
  });

  // Linode Interface operations
    server.addTool({
    name: 'list_linode_interfaces',
    description: 'List all interfaces for a Linode',
    parameters: mcpInput(schemas.listLinodeInterfacesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getLinodeInterfaces(params.linodeId);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_linode_interface',
    description: 'Get a specific interface for a Linode',
    parameters: mcpInput(schemas.getLinodeInterfaceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getLinodeInterface(params.linodeId, params.interfaceId);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'create_linode_interface',
    description: 'Add an interface to a Linode',
    parameters: mcpInput(schemas.createLinodeInterfaceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, ...interfaceData } = params;
      const result = await createClient(context).networking.createLinodeInterface(linodeId, interfaceData);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'update_linode_interface',
    description: 'Update an interface for a Linode',
    parameters: mcpInput(schemas.updateLinodeInterfaceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, interfaceId, ...interfaceData } = params;
      const result = await createClient(context).networking.updateLinodeInterface(linodeId, interfaceId, interfaceData);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'delete_linode_interface',
    description: 'Delete an interface from a Linode',
    parameters: mcpInput(schemas.deleteLinodeInterfaceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.deleteLinodeInterface(params.linodeId, params.interfaceId);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'list_linode_interface_history',
    description: 'List a Linode\'s network interface history',
    parameters: mcpInput(schemas.listLinodeInterfaceHistorySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, page, page_size } = params;
      const result = await createClient(context).networking.getLinodeInterfaceHistory(linodeId, { page, page_size });
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'get_linode_interface_settings',
    description: 'List interface settings for a Linode',
    parameters: mcpInput(schemas.getLinodeInterfaceSettingsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getLinodeInterfaceSettings(params.linodeId);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'update_linode_interface_settings',
    description: 'Update interface settings for a Linode',
    parameters: mcpInput(schemas.updateLinodeInterfaceSettingsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { linodeId, settings } = params;
      const result = await createClient(context).networking.updateLinodeInterfaceSettings(linodeId, settings);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'list_linode_interface_firewalls',
    description: 'List firewalls for a Linode interface',
    parameters: mcpInput(schemas.listLinodeInterfaceFirewallsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.getLinodeInterfaceFirewalls(params.linodeId, params.interfaceId);
      return JSON.stringify(result, null, 2);
    })
  });

    server.addTool({
    name: 'upgrade_linode_interfaces',
    description: 'Upgrade a Linode to use the new interfaces',
    parameters: mcpInput(schemas.upgradeLinodeInterfacesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).networking.upgradeLinodeInterfaces(params.linodeId);
      return JSON.stringify(result, null, 2);
    })
  });
}