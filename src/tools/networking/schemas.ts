import { z } from "zod";
import { pagingParamsSchema, coerceBoolean } from '../common/schemas';

// IP Address schemas
export const ipAddressSchema = z.object({
  address: z.string().describe('The IP address'),
  gateway: z.string().nullable().describe('The gateway'),
  subnet_mask: z.string().nullable().describe('The subnet mask'),
  prefix: z.coerce.number().nullable().describe('The prefix'),
  type: z.string().describe('The type of IP address'),
  public: coerceBoolean().describe('Whether the IP is public'),
  rdns: z.string().nullable().describe('The reverse DNS entry'),
  linode_id: z.coerce.number().nullable().describe('The ID of the Linode this IP is assigned to'),
  region: z.string().nullable().describe('The region this IP is in')
});

export const ipAddressesResponseSchema = z.object({
  ipv4: z.object({
    public: z.array(ipAddressSchema),
    private: z.array(ipAddressSchema),
    shared: z.array(ipAddressSchema)
  }),
  ipv6: z.object({
    slaac: ipAddressSchema,
    link_local: ipAddressSchema,
    ranges: z.array(z.object({
      range: z.string(),
      region: z.string(),
      prefix: z.coerce.number(),
      route_target: z.string().nullable()
    }))
  })
});

export const ipv6RangeSchema = z.object({
  range: z.string().describe('The IPv6 range'),
  prefix: z.coerce.number().describe('The prefix length'),
  region: z.string().describe('The region of the IPv6 range'),
  route_target: z.string().nullable().describe('The route target')
});

export const ipv6PoolSchema = z.object({
  range: z.string().describe('The IPv6 pool'),
  prefix: z.coerce.number().describe('The prefix length'),
  region: z.string().describe('The region of the IPv6 pool')
});

export const allocateIPSchema = z.object({
  type: z.literal('ipv4').describe('Type of IP address (currently only ipv4 is supported)'),
  public: coerceBoolean().describe('Whether the IP should be public'),
  linode_id: z.coerce.number().describe('The ID of the Linode to assign the IP to')
});

export const updateIPSchema = z.object({
  address: z.string().describe('The IP address'),
  rdns: z.string().nullable().describe('The reverse DNS entry')
});

export const shareIPsSchema = z.object({
  linode_id: z.coerce.number().describe('The ID of the Linode to share IPs with'),
  ips: z.array(z.string()).describe('The IPs to share')
});

// Firewall schemas
export const firewallRuleSchema = z.object({
  ports: z.string().describe('The ports this rule applies to'),
  protocol: z.enum(['TCP', 'UDP', 'ICMP']).describe('The network protocol'),
  addresses: z.object({
    ipv4: z.array(z.string()).optional().describe('IPv4 addresses or ranges'),
    ipv6: z.array(z.string()).optional().describe('IPv6 addresses or ranges')
  }).describe('The IPs and ranges this rule applies to'),
  action: z.enum(['ACCEPT', 'DROP']).describe('The action for this rule')
});

export const firewallRulesSchema = z.object({
  inbound_policy: z.enum(['ACCEPT', 'DROP']).describe('Default inbound policy'),
  outbound_policy: z.enum(['ACCEPT', 'DROP']).describe('Default outbound policy'),
  inbound: z.array(firewallRuleSchema).optional().describe('Inbound rules'),
  outbound: z.array(firewallRuleSchema).optional().describe('Outbound rules')
});

export const firewallSchema = z.object({
  id: z.coerce.number().describe('The ID of the Firewall'),
  label: z.string().describe('The label of the Firewall'),
  created: z.string().describe('When the Firewall was created'),
  updated: z.string().describe('When the Firewall was last updated'),
  status: z.string().describe('The status of the Firewall'),
  rules: firewallRulesSchema,
  tags: z.array(z.string()).describe('Tags applied to the Firewall')
});

export const firewallDeviceSchema = z.object({
  id: z.coerce.number().describe('The ID of the Firewall Device'),
  entity_id: z.coerce.number().describe('The ID of the entity'),
  type: z.enum(['linode', 'nodebalancer']).describe('The type of the entity'),
  label: z.string().describe('The label of the entity'),
  url: z.string().describe('The URL of the entity'),
  created: z.string().describe('When the Firewall Device was created'),
  updated: z.string().describe('When the Firewall Device was last updated')
});

export const vlanSchema = z.object({
  id: z.string().describe('The ID of the VLAN'),
  description: z.string().describe('The description of the VLAN'),
  region: z.string().describe('The region of the VLAN'),
  linodes: z.array(z.coerce.number()).describe('The Linodes attached to this VLAN'),
  created: z.string().describe('When the VLAN was created')
});

// Paginated responses
export const firewallsResponseSchema = z.object({
  data: z.array(firewallSchema),
  page: z.coerce.number(),
  pages: z.coerce.number(),
  results: z.coerce.number()
});

export const firewallDevicesResponseSchema = z.object({
  data: z.array(firewallDeviceSchema),
  page: z.coerce.number(),
  pages: z.coerce.number(),
  results: z.coerce.number()
});

export const ipv6RangesResponseSchema = z.object({
  data: z.array(ipv6RangeSchema),
  page: z.coerce.number(),
  pages: z.coerce.number(),
  results: z.coerce.number()
});

export const ipv6PoolsResponseSchema = z.object({
  data: z.array(ipv6PoolSchema),
  page: z.coerce.number(),
  pages: z.coerce.number(),
  results: z.coerce.number()
});

export const vlansResponseSchema = z.object({
  data: z.array(vlanSchema),
  page: z.coerce.number(),
  pages: z.coerce.number(),
  results: z.coerce.number()
});

// Request schemas
export const getIPAddressesSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getIPAddressSchema = z.object({
  address: z.string().describe('The IP address')
});

export const getIPv6RangesSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getIPv6RangeSchema = z.object({
  range: z.string().describe('The IPv6 range')
});

export const getIPv6PoolsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getVLANsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getVLANSchema = z.object({
  regionId: z.string().describe('The region ID'),
  label: z.string().describe('The VLAN label')
});

export const getFirewallsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getFirewallSchema = z.object({
  id: z.coerce.number().describe('The ID of the firewall')
});

export const createFirewallSchema = z.object({
  label: z.string().describe(
    `The label for the firewall. 
    Must begin and end with an alphanumeric character.
    May only consist of alphanumeric characters, hyphens (-), underscores (_) or periods (.). 
    Cannot have two hyphens (--), underscores (__) or periods (..) in a row.
    Must be between 3 and 32 characters.
    Must be unique.`),
  rules: firewallRulesSchema,
  devices: z.object({
    linodes: z.array(z.coerce.number()).optional().describe('Array of Linode IDs'),
    nodebalancers: z.array(z.coerce.number()).optional().describe('Array of NodeBalancer IDs')
  }).optional().describe('Devices to assign to this firewall'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the firewall')
});

export const updateFirewallSchema = z.object({
  id: z.coerce.number().describe('The ID of the firewall'),
  label: z.string().optional().describe('The label for the firewall'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the firewall'),
  status: z.enum(['enabled', 'disabled']).optional().describe('The status of the firewall')
});

export const deleteFirewallSchema = z.object({
  id: z.coerce.number().describe('The ID of the firewall')
});

export const getFirewallRulesSchema = z.object({
  firewallId: z.coerce.number().describe('The ID of the firewall')
});

export const updateFirewallRulesSchema = z.object({
  firewallId: z.coerce.number().describe('The ID of the firewall'),
  inbound_policy: z.enum(['ACCEPT', 'DROP']).optional().describe('Default inbound policy'),
  outbound_policy: z.enum(['ACCEPT', 'DROP']).optional().describe('Default outbound policy'),
  inbound: z.array(firewallRuleSchema).optional().describe('Inbound rules'),
  outbound: z.array(firewallRuleSchema).optional().describe('Outbound rules')
});

export const getFirewallDevicesSchema = z.object({
  firewallId: z.coerce.number().describe('The ID of the firewall'),
  ...pagingParamsSchema.shape
});

export const createFirewallDeviceSchema = z.object({
  firewallId: z.coerce.number().describe('The ID of the firewall'),
  id: z.coerce.number().describe('The ID of the entity'),
  type: z.enum(['linode', 'nodebalancer']).describe('The type of entity')
});

export const deleteFirewallDeviceSchema = z.object({
  firewallId: z.coerce.number().describe('The ID of the firewall'),
  deviceId: z.coerce.number().describe('The ID of the device')
});

export const getFirewallDeviceSchema = z.object({
  firewallId: z.coerce.number().describe('The ID of the firewall'),
  deviceId: z.coerce.number().describe('The ID of the device')
});

// Firewall history schemas
export const listFirewallHistorySchema = z.object({
  firewallId: z.coerce.number().describe('The ID of the firewall'),
  ...pagingParamsSchema.shape
});

export const getFirewallRuleVersionSchema = z.object({
  firewallId: z.coerce.number().describe('The ID of the firewall'),
  version: z.coerce.number().describe('The version number of the firewall rule')
});

// Firewall settings schemas
export const getFirewallSettingsSchema = z.object({});

export const updateFirewallSettingsSchema = z.object({
  settings: z.array(z.record(z.any())).describe('Array of default firewall settings to update')
});

// Firewall template schemas
export const listFirewallTemplatesSchema = z.object({});

export const getFirewallTemplateSchema = z.object({
  slug: z.string().describe('The slug identifier of the firewall template')
});

// IP assignment schema
export const assignIPsSchema = z.object({
  assignments: z.array(z.object({
    address: z.string().describe('The IP address to assign'),
    linode_id: z.coerce.number().describe('The ID of the Linode to assign the IP to'),
    region: z.string().describe('The region of the Linode')
  })).describe('Array of IP assignment objects')
});

// IPv4 operation schemas
export const assignIPv4AddressesSchema = z.object({
  assignments: z.array(z.object({
    address: z.string().describe('The IPv4 address to assign'),
    linode_id: z.coerce.number().describe('The ID of the Linode to assign the IP to'),
    region: z.string().describe('The region of the Linode')
  })).describe('Array of IPv4 assignment objects')
});

export const shareIPv4AddressesSchema = z.object({
  ips: z.array(z.string()).describe('Array of IPv4 addresses to share'),
  linode_id: z.coerce.number().describe('The ID of the Linode to share the IPs with')
});

// IPv6 range operation schemas
export const createIPv6RangeSchema = z.object({
  linode_id: z.coerce.number().describe('The ID of the Linode to create the IPv6 range for'),
  prefix_length: z.coerce.number().describe('The prefix length for the IPv6 range (e.g. 56 or 64)')
});

export const deleteIPv6RangeSchema = z.object({
  range: z.string().describe('The IPv6 range to delete')
});

// VLAN delete schema
export const deleteVLANSchema = z.object({
  regionId: z.string().describe('The region ID of the VLAN'),
  label: z.string().describe('The label of the VLAN')
});

// Network Transfer Prices schema
export const listNetworkTransferPricesSchema = z.object({});

// Linode Interface schemas
export const listLinodeInterfacesSchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode')
});

export const getLinodeInterfaceSchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode'),
  interfaceId: z.coerce.number().describe('The ID of the interface')
});

export const createLinodeInterfaceSchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode'),
  default_route: z.object({
    ipv4: coerceBoolean().optional().describe('Whether this interface is the default route for IPv4'),
    ipv6: coerceBoolean().optional().describe('Whether this interface is the default route for IPv6')
  }).optional().describe('Default route configuration'),
  subnet: z.object({
    id: z.coerce.number().optional().describe('The ID of the subnet')
  }).optional().describe('Subnet configuration'),
  public: z.record(z.any()).optional().describe('Public interface configuration with ipv4/ipv6 settings'),
  vpc: z.record(z.any()).optional().describe('VPC interface configuration with subnet and ipv4 settings')
});

export const updateLinodeInterfaceSchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode'),
  interfaceId: z.coerce.number().describe('The ID of the interface'),
  default_route: z.object({
    ipv4: coerceBoolean().optional().describe('Whether this interface is the default route for IPv4'),
    ipv6: coerceBoolean().optional().describe('Whether this interface is the default route for IPv6')
  }).optional().describe('Default route configuration'),
  subnet: z.object({
    id: z.coerce.number().optional().describe('The ID of the subnet')
  }).optional().describe('Subnet configuration'),
  public: z.record(z.any()).optional().describe('Public interface configuration with ipv4/ipv6 settings'),
  vpc: z.record(z.any()).optional().describe('VPC interface configuration with subnet and ipv4 settings')
});

export const deleteLinodeInterfaceSchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode'),
  interfaceId: z.coerce.number().describe('The ID of the interface')
});

export const listLinodeInterfaceHistorySchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode'),
  ...pagingParamsSchema.shape
});

export const getLinodeInterfaceSettingsSchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode')
});

export const updateLinodeInterfaceSettingsSchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode'),
  settings: z.record(z.any()).describe('Interface settings to update')
});

export const listLinodeInterfaceFirewallsSchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode'),
  interfaceId: z.coerce.number().describe('The ID of the interface')
});

export const upgradeLinodeInterfacesSchema = z.object({
  linodeId: z.coerce.number().describe('The ID of the Linode')
});