import { z } from 'zod';
import { pagingParamsSchema } from '../common/schemas';

// IP Address schemas
export const ipAddressSchema = z.object({
  address: z.string().describe('The IP address'),
  gateway: z.string().nullable().describe('The gateway'),
  subnet_mask: z.string().nullable().describe('The subnet mask'),
  prefix: z.number().nullable().describe('The prefix'),
  type: z.string().describe('The type of IP address'),
  public: z.boolean().describe('Whether the IP is public'),
  rdns: z.string().nullable().describe('The reverse DNS entry'),
  linode_id: z.number().nullable().describe('The ID of the Linode this IP is assigned to'),
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
      prefix: z.number(),
      route_target: z.string().nullable()
    }))
  })
});

export const ipv6RangeSchema = z.object({
  range: z.string().describe('The IPv6 range'),
  prefix: z.number().describe('The prefix length'),
  region: z.string().describe('The region of the IPv6 range'),
  route_target: z.string().nullable().describe('The route target')
});

export const ipv6PoolSchema = z.object({
  range: z.string().describe('The IPv6 pool'),
  prefix: z.number().describe('The prefix length'),
  region: z.string().describe('The region of the IPv6 pool')
});

export const allocateIPSchema = z.object({
  type: z.literal('ipv4').describe('Type of IP address (currently only ipv4 is supported)'),
  public: z.boolean().describe('Whether the IP should be public'),
  linode_id: z.number().describe('The ID of the Linode to assign the IP to')
});

export const updateIPSchema = z.object({
  address: z.string().describe('The IP address'),
  rdns: z.string().nullable().describe('The reverse DNS entry')
});

export const shareIPsSchema = z.object({
  linode_id: z.number().describe('The ID of the Linode to share IPs with'),
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
  id: z.number().describe('The ID of the Firewall'),
  label: z.string().describe('The label of the Firewall'),
  created: z.string().describe('When the Firewall was created'),
  updated: z.string().describe('When the Firewall was last updated'),
  status: z.string().describe('The status of the Firewall'),
  rules: firewallRulesSchema,
  tags: z.array(z.string()).describe('Tags applied to the Firewall')
});

export const firewallDeviceSchema = z.object({
  id: z.number().describe('The ID of the Firewall Device'),
  entity_id: z.number().describe('The ID of the entity'),
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
  linodes: z.array(z.number()).describe('The Linodes attached to this VLAN'),
  created: z.string().describe('When the VLAN was created')
});

// Paginated responses
export const firewallsResponseSchema = z.object({
  data: z.array(firewallSchema),
  page: z.number(),
  pages: z.number(),
  results: z.number()
});

export const firewallDevicesResponseSchema = z.object({
  data: z.array(firewallDeviceSchema),
  page: z.number(),
  pages: z.number(),
  results: z.number()
});

export const ipv6RangesResponseSchema = z.object({
  data: z.array(ipv6RangeSchema),
  page: z.number(),
  pages: z.number(),
  results: z.number()
});

export const ipv6PoolsResponseSchema = z.object({
  data: z.array(ipv6PoolSchema),
  page: z.number(),
  pages: z.number(),
  results: z.number()
});

export const vlansResponseSchema = z.object({
  data: z.array(vlanSchema),
  page: z.number(),
  pages: z.number(),
  results: z.number()
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
  id: z.number().describe('The ID of the firewall')
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
    linodes: z.array(z.number()).optional().describe('Array of Linode IDs'),
    nodebalancers: z.array(z.number()).optional().describe('Array of NodeBalancer IDs')
  }).optional().describe('Devices to assign to this firewall'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the firewall')
});

export const updateFirewallSchema = z.object({
  id: z.number().describe('The ID of the firewall'),
  label: z.string().optional().describe('The label for the firewall'),
  tags: z.array(z.string()).optional().describe('Tags to apply to the firewall'),
  status: z.enum(['enabled', 'disabled']).optional().describe('The status of the firewall')
});

export const deleteFirewallSchema = z.object({
  id: z.number().describe('The ID of the firewall')
});

export const getFirewallRulesSchema = z.object({
  firewallId: z.number().describe('The ID of the firewall')
});

export const updateFirewallRulesSchema = z.object({
  firewallId: z.number().describe('The ID of the firewall'),
  inbound_policy: z.enum(['ACCEPT', 'DROP']).optional().describe('Default inbound policy'),
  outbound_policy: z.enum(['ACCEPT', 'DROP']).optional().describe('Default outbound policy'),
  inbound: z.array(firewallRuleSchema).optional().describe('Inbound rules'),
  outbound: z.array(firewallRuleSchema).optional().describe('Outbound rules')
});

export const getFirewallDevicesSchema = z.object({
  firewallId: z.number().describe('The ID of the firewall'),
  ...pagingParamsSchema.shape
});

export const createFirewallDeviceSchema = z.object({
  firewallId: z.number().describe('The ID of the firewall'),
  id: z.number().describe('The ID of the entity'),
  type: z.enum(['linode', 'nodebalancer']).describe('The type of entity')
});

export const deleteFirewallDeviceSchema = z.object({
  firewallId: z.number().describe('The ID of the firewall'),
  deviceId: z.number().describe('The ID of the device')
});