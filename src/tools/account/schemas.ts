import { z } from 'zod';

// Account schemas
export const AccountSchema = z.object({
  active_since: z.string(),
  address_1: z.string(),
  address_2: z.string().optional(),
  balance: z.number(),
  balances: z.object({
    uninvoiced: z.number(),
    past_due: z.boolean()
  }),
  billing_source: z.string(),
  capabilities: z.array(z.string()),
  city: z.string(),
  company: z.string(),
  country: z.string(),
  credit_card: z.object({
    expiry: z.string(),
    last_four: z.string()
  }),
  email: z.string().email(),
  euuid: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  state: z.string(),
  tax_id: z.string(),
  zip: z.string()
});

// Get Account schema
export const getAccountSchema = z.object({});

// Update Account schema
export const updateAccountSchema = z.object({
  address_1: z.string().optional().describe('First line of address'),
  address_2: z.string().optional().describe('Second line of address'),
  city: z.string().optional().describe('City'),
  company: z.string().optional().describe('Company name'),
  country: z.string().optional().describe('Country code (e.g., US)'),
  email: z.string().email().optional().describe('Email address'),
  first_name: z.string().optional().describe('First name'),
  last_name: z.string().optional().describe('Last name'),
  phone: z.string().optional().describe('Phone number'),
  state: z.string().optional().describe('State/province code (e.g., CA)'),
  tax_id: z.string().optional().describe('Tax ID'),
  zip: z.string().optional().describe('Zip/postal code')
});

// Agreement schemas
export const AgreementSchema = z.object({
  id: z.string(),
  description: z.string(),
  body: z.string(),
  title: z.string(),
  created: z.string(),
  modified: z.string(),
  expiry: z.string().optional(),
  url: z.string().optional()
});

// List Agreements schema
export const listAgreementsSchema = z.object({});

// Acknowledge Agreements schema
export const acknowledgeAgreementsSchema = z.object({
  agreement_ids: z.array(z.string()).describe('List of agreement IDs to acknowledge')
});

// Service Availability schemas
export const ServiceAvailabilitySchema = z.object({
  region: z.string(),
  services: z.record(z.string(), z.boolean())
});

// List Service Availability schema
export const listServiceAvailabilitySchema = z.object({});

// Get Region Service Availability schema
export const getRegionServiceAvailabilitySchema = z.object({
  regionId: z.string().describe('ID of the region')
});

// Cancel Account schema
export const cancelAccountSchema = z.object({
  comments: z.string().optional().describe('Comments about the reason for cancellation')
});

// Child Account schemas
export const ChildAccountSchema = z.object({
  euuid: z.string(),
  company: z.string(),
  email: z.string().email(),
  is_active: z.boolean(),
  billing_cycle: z.string(),
  state: z.string(),
  has_credit_card: z.boolean(),
  enterprise_data: z.object({
    credit_limit: z.number(),
    acl: z.record(z.string(), z.string())
  }).optional()
});

// List Child Accounts schema
export const listChildAccountsSchema = z.object({
  page: z.number().optional().describe('Page number of results to return'),
  page_size: z.number().optional().describe('Number of results to return per page')
});

// Get Child Account schema
export const getChildAccountSchema = z.object({
  euuid: z.string().describe('Unique identifier for the child account')
});

// Create Proxy Token schema
export const createProxyTokenSchema = z.object({
  euuid: z.string().describe('Unique identifier for the child account'),
  expiry: z.string().optional().describe('Token expiration date in ISO 8601 format'),
  scopes: z.array(z.string()).optional().describe('List of API scopes to grant to the token')
});

// Event schemas
export const AccountEventSchema = z.object({
  id: z.number(),
  action: z.string(),
  created: z.string(),
  entity: z.object({
    id: z.number(),
    label: z.string(),
    type: z.string(),
    url: z.string()
  }),
  percent_complete: z.number().optional(),
  rate: z.string().optional(),
  read: z.boolean(),
  seen: z.boolean(),
  status: z.string(),
  time_remaining: z.number().optional(),
  username: z.string(),
  message: z.string().optional(),
  secondary_entity: z.object({
    id: z.number(),
    label: z.string(),
    type: z.string(),
    url: z.string()
  }).optional()
});

// List Events schema
export const listEventsSchema = z.object({
  page: z.number().optional().describe('Page number of results to return'),
  page_size: z.number().optional().describe('Number of results to return per page')
});

// Get Event schema
export const getEventSchema = z.object({
  eventId: z.number().describe('ID of the event')
});

// Mark Event as Read schema
export const markEventAsReadSchema = z.object({
  eventId: z.number().describe('ID of the event')
});

// Mark Event as Seen schema
export const markEventAsSeenSchema = z.object({
  eventId: z.number().describe('ID of the event')
});

// Invoice schemas
export const InvoiceSchema = z.object({
  id: z.number(),
  date: z.string(),
  label: z.string(),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number()
});

// List Invoices schema
export const listInvoicesSchema = z.object({
  page: z.number().optional().describe('Page number of results to return'),
  page_size: z.number().optional().describe('Number of results to return per page')
});

// Get Invoice schema
export const getInvoiceSchema = z.object({
  invoiceId: z.number().describe('ID of the invoice')
});

// Invoice Item schema
export const InvoiceItemSchema = z.object({
  amount: z.number(),
  from: z.string(),
  to: z.string(),
  label: z.string(),
  quantity: z.number(),
  type: z.string(),
  unit_price: z.string(),
  tax: z.number(),
  total: z.number()
});

// List Invoice Items schema
export const listInvoiceItemsSchema = z.object({
  invoiceId: z.number().describe('ID of the invoice'),
  page: z.number().optional().describe('Page number of results to return'),
  page_size: z.number().optional().describe('Number of results to return per page')
});

// Login schemas
export const AccountLoginSchema = z.object({
  id: z.number(),
  datetime: z.string(),
  ip: z.string(),
  restricted: z.boolean(),
  status: z.string(),
  username: z.string()
});

// List Account Logins schema
export const listAccountLoginsSchema = z.object({
  page: z.number().optional().describe('Page number of results to return'),
  page_size: z.number().optional().describe('Number of results to return per page')
});

// Get Account Login schema
export const getAccountLoginSchema = z.object({
  loginId: z.number().describe('ID of the login')
});

// Maintenance schemas
export const MaintenanceSchema = z.object({
  when: z.string(),
  entity: z.object({
    id: z.string(),
    label: z.string(),
    type: z.string(),
    url: z.string()
  }),
  duration: z.number(),
  status: z.string(),
  type: z.string(),
  reason: z.string(),
  key: z.string(),
  created: z.string(),
  updated: z.string()
});

// List Maintenances schema
export const listMaintenancesSchema = z.object({
  page: z.number().optional().describe('Page number of results to return'),
  page_size: z.number().optional().describe('Number of results to return per page')
});

// Notification schemas
export const NotificationSchema = z.object({
  body: z.string(),
  entity: z.object({
    id: z.number(),
    label: z.string(),
    type: z.string(),
    url: z.string()
  }),
  label: z.string(),
  message: z.string(),
  severity: z.string(),
  type: z.string(),
  until: z.string(),
  when: z.string()
});

// List Notifications schema
export const listNotificationsSchema = z.object({});

// OAuth Client schemas
export const OAuthClientSchema = z.object({
  id: z.string(),
  label: z.string(),
  redirect_uri: z.string(),
  secret: z.string(),
  public: z.boolean(),
  status: z.string(),
  thumbnail_url: z.string().optional()
});

// List OAuth Clients schema
export const listOAuthClientsSchema = z.object({
  page: z.number().optional().describe('Page number of results to return'),
  page_size: z.number().optional().describe('Number of results to return per page')
});

// Create OAuth Client schema
export const createOAuthClientSchema = z.object({
  label: z.string().describe('A name for the OAuth client'),
  redirect_uri: z.string().describe('The OAuth client callback URL'),
  public: z.boolean().optional().describe('Whether this client is public or not')
});

// Get OAuth Client schema
export const getOAuthClientSchema = z.object({
  clientId: z.string().describe('ID of the OAuth client')
});

// Update OAuth Client schema
export const updateOAuthClientSchema = z.object({
  clientId: z.string().describe('ID of the OAuth client'),
  label: z.string().optional().describe('A name for the OAuth client'),
  redirect_uri: z.string().optional().describe('The OAuth client callback URL'),
  public: z.boolean().optional().describe('Whether this client is public or not')
});

// Delete OAuth Client schema
export const deleteOAuthClientSchema = z.object({
  clientId: z.string().describe('ID of the OAuth client')
});

// Reset OAuth Client Secret schema
export const resetOAuthClientSecretSchema = z.object({
  clientId: z.string().describe('ID of the OAuth client')
});

// Get OAuth Client Thumbnail schema
export const getOAuthClientThumbnailSchema = z.object({
  clientId: z.string().describe('ID of the OAuth client')
});

// Update OAuth Client Thumbnail schema
export const updateOAuthClientThumbnailSchema = z.object({
  clientId: z.string().describe('ID of the OAuth client'),
  thumbnailData: z.any().describe('Binary image data for the thumbnail')
});

// Account Settings schemas
export const AccountSettingsSchema = z.object({
  managed: z.boolean(),
  longview_subscription: z.string().nullable(),
  network_helper: z.boolean(),
  backups_enabled: z.boolean(),
  object_storage: z.enum(['active', 'disabled', 'suspended'])
});

// Get Account Settings schema
export const getAccountSettingsSchema = z.object({});

// Update Account Settings schema
export const updateAccountSettingsSchema = z.object({
  network_helper: z.boolean().optional().describe('Enables automatic IP assignment for newly created Linodes'),
  backups_enabled: z.boolean().optional().describe('Enables automatic backups for all created Linodes')
});

// Enable Managed Service schema
export const enableManagedServiceSchema = z.object({});

// Account Network Transfer schemas
export const AccountNetworkTransferSchema = z.object({
  billable: z.number(),
  used: z.number(),
  quota: z.number()
});

// Get Account Network Transfer schema
export const getAccountNetworkTransferSchema = z.object({});

// User schemas
export const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  restricted: z.boolean(),
  ssh_keys: z.array(z.string()),
  two_factor_auth: z.boolean()
});

// List Users schema
export const listUsersSchema = z.object({
  page: z.number().optional().describe('Page number of results to return'),
  page_size: z.number().optional().describe('Number of results to return per page')
});

// Create User schema
export const createUserSchema = z.object({
  username: z.string().describe('The username for the user'),
  email: z.string().email().describe('The email address for the user'),
  restricted: z.boolean().describe('If true, the user has limited access to account features')
});

// Get User schema
export const getUserSchema = z.object({
  username: z.string().describe('The username of the user')
});

// Update User schema
export const updateUserSchema = z.object({
  username: z.string().describe('The username of the user'),
  email: z.string().email().optional().describe('The email address for the user'),
  restricted: z.boolean().optional().describe('If true, the user has limited access to account features')
});

// Delete User schema
export const deleteUserSchema = z.object({
  username: z.string().describe('The username of the user')
});

// User Grants schemas
export const UserGrantsSchema = z.object({
  global: z.object({
    account_access: z.string(),
    add_domains: z.boolean().optional(),
    add_databases: z.boolean().optional(),
    add_firewalls: z.boolean().optional(),
    add_images: z.boolean().optional(),
    add_linodes: z.boolean().optional(),
    add_longview: z.boolean().optional(),
    add_nodebalancers: z.boolean().optional(),
    add_stackscripts: z.boolean().optional(),
    add_volumes: z.boolean().optional(),
    cancel_account: z.boolean().optional(),
    longview_subscription: z.boolean().optional()
  }),
  database: z.record(z.string(), z.object({
    id: z.number(),
    permissions: z.string(),
    label: z.string()
  })),
  domain: z.record(z.string(), z.object({
    id: z.number(),
    permissions: z.string(),
    label: z.string()
  })),
  firewall: z.record(z.string(), z.object({
    id: z.number(),
    permissions: z.string(),
    label: z.string()
  })),
  image: z.record(z.string(), z.object({
    id: z.number(),
    permissions: z.string(),
    label: z.string()
  })),
  linode: z.record(z.string(), z.object({
    id: z.number(),
    permissions: z.string(),
    label: z.string()
  })),
  longview: z.record(z.string(), z.object({
    id: z.number(),
    permissions: z.string(),
    label: z.string()
  })),
  nodebalancer: z.record(z.string(), z.object({
    id: z.number(),
    permissions: z.string(),
    label: z.string()
  })),
  stackscript: z.record(z.string(), z.object({
    id: z.number(),
    permissions: z.string(),
    label: z.string()
  })),
  volume: z.record(z.string(), z.object({
    id: z.number(),
    permissions: z.string(),
    label: z.string()
  }))
});

// Get User Grants schema
export const getUserGrantsSchema = z.object({
  username: z.string().describe('The username of the user')
});

// Update User Grants schema
export const updateUserGrantsSchema = z.object({
  username: z.string().describe('The username of the user'),
  global: z.object({
    account_access: z.string().optional().describe('The level of access ("read_only" or "read_write")'),
    add_domains: z.boolean().optional().describe('Whether the user can add domains'),
    add_databases: z.boolean().optional().describe('Whether the user can add databases'),
    add_firewalls: z.boolean().optional().describe('Whether the user can add firewalls'),
    add_images: z.boolean().optional().describe('Whether the user can add images'),
    add_linodes: z.boolean().optional().describe('Whether the user can add Linodes'),
    add_longview: z.boolean().optional().describe('Whether the user can add Longview clients'),
    add_nodebalancers: z.boolean().optional().describe('Whether the user can add NodeBalancers'),
    add_stackscripts: z.boolean().optional().describe('Whether the user can add StackScripts'),
    add_volumes: z.boolean().optional().describe('Whether the user can add volumes'),
    cancel_account: z.boolean().optional().describe('Whether the user can cancel the account'),
    longview_subscription: z.boolean().optional().describe('Whether the user can manage the Longview subscription')
  }).optional(),
  database: z.record(z.string(), z.object({
    permissions: z.string().describe('The level of access ("read_only" or "read_write")')
  })).optional(),
  domain: z.record(z.string(), z.object({
    permissions: z.string().describe('The level of access ("read_only" or "read_write")')
  })).optional(),
  firewall: z.record(z.string(), z.object({
    permissions: z.string().describe('The level of access ("read_only" or "read_write")')
  })).optional(),
  image: z.record(z.string(), z.object({
    permissions: z.string().describe('The level of access ("read_only" or "read_write")')
  })).optional(),
  linode: z.record(z.string(), z.object({
    permissions: z.string().describe('The level of access ("read_only" or "read_write")')
  })).optional(),
  longview: z.record(z.string(), z.object({
    permissions: z.string().describe('The level of access ("read_only" or "read_write")')
  })).optional(),
  nodebalancer: z.record(z.string(), z.object({
    permissions: z.string().describe('The level of access ("read_only" or "read_write")')
  })).optional(),
  stackscript: z.record(z.string(), z.object({
    permissions: z.string().describe('The level of access ("read_only" or "read_write")')
  })).optional(),
  volume: z.record(z.string(), z.object({
    permissions: z.string().describe('The level of access ("read_only" or "read_write")')
  })).optional()
});
