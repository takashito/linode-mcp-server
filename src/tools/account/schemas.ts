import { z } from "zod";
import { coerceBoolean } from "../common/schemas";

// Account schemas
export const AccountSchema = z.object({
  active_since: z.string(),
  address_1: z.string(),
  address_2: z.string().optional(),
  balance: z.coerce.number(),
  balances: z.object({
    uninvoiced: z.coerce.number(),
    past_due: coerceBoolean()
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
  services: z.record(z.string(), coerceBoolean())
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
  is_active: coerceBoolean(),
  billing_cycle: z.string(),
  state: z.string(),
  has_credit_card: coerceBoolean(),
  enterprise_data: z.object({
    credit_limit: z.coerce.number(),
    acl: z.record(z.string(), z.string())
  }).optional()
});

// Event schemas
export const AccountEventSchema = z.object({
  id: z.coerce.number(),
  action: z.string(),
  created: z.string(),
  entity: z.object({
    id: z.coerce.number(),
    label: z.string(),
    type: z.string(),
    url: z.string()
  }),
  percent_complete: z.coerce.number().optional(),
  rate: z.string().optional(),
  read: coerceBoolean(),
  seen: coerceBoolean(),
  status: z.string(),
  time_remaining: z.coerce.number().optional(),
  username: z.string(),
  message: z.string().optional(),
  secondary_entity: z.object({
    id: z.coerce.number(),
    label: z.string(),
    type: z.string(),
    url: z.string()
  }).optional()
});

// List Events schema
export const listEventsSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

// Get Event schema
export const getEventSchema = z.object({
  eventId: z.coerce.number().describe('ID of the event')
});

// Mark Event as Seen schema
export const markEventAsSeenSchema = z.object({
  eventId: z.coerce.number().describe('ID of the event')
});

// Invoice schemas
export const InvoiceSchema = z.object({
  id: z.coerce.number(),
  date: z.string(),
  label: z.string(),
  subtotal: z.coerce.number(),
  tax: z.coerce.number(),
  total: z.coerce.number()
});

// List Invoices schema
export const listInvoicesSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

// Get Invoice schema
export const getInvoiceSchema = z.object({
  invoiceId: z.coerce.number().describe('ID of the invoice')
});

// Invoice Item schema
export const InvoiceItemSchema = z.object({
  amount: z.coerce.number(),
  from: z.string(),
  to: z.string(),
  label: z.string(),
  quantity: z.coerce.number(),
  type: z.string(),
  unit_price: z.string(),
  tax: z.coerce.number(),
  total: z.coerce.number()
});

// List Invoice Items schema
export const listInvoiceItemsSchema = z.object({
  invoiceId: z.coerce.number().describe('ID of the invoice'),
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

// Login schemas
export const AccountLoginSchema = z.object({
  id: z.coerce.number(),
  datetime: z.string(),
  ip: z.string(),
  restricted: coerceBoolean(),
  status: z.string(),
  username: z.string()
});

// List Account Logins schema
export const listAccountLoginsSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

// Get Account Login schema
export const getAccountLoginSchema = z.object({
  loginId: z.coerce.number().describe('ID of the login')
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
  duration: z.coerce.number(),
  status: z.string(),
  type: z.string(),
  reason: z.string(),
  key: z.string(),
  created: z.string(),
  updated: z.string()
});

// List Maintenances schema
export const listMaintenancesSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

// Notification schemas
export const NotificationSchema = z.object({
  body: z.string(),
  entity: z.object({
    id: z.coerce.number(),
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
  public: coerceBoolean(),
  status: z.string(),
  thumbnail_url: z.string().optional()
});

// List OAuth Clients schema
export const listOAuthClientsSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

// Create OAuth Client schema
export const createOAuthClientSchema = z.object({
  label: z.string().describe('A name for the OAuth client'),
  redirect_uri: z.string().describe('The OAuth client callback URL'),
  public: coerceBoolean().optional().describe('Whether this client is public or not')
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
  public: coerceBoolean().optional().describe('Whether this client is public or not')
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
  managed: coerceBoolean(),
  longview_subscription: z.string().nullable(),
  network_helper: coerceBoolean(),
  backups_enabled: coerceBoolean(),
  object_storage: z.enum(['active', 'disabled', 'suspended'])
});

// Get Account Settings schema
export const getAccountSettingsSchema = z.object({});

// Update Account Settings schema
export const updateAccountSettingsSchema = z.object({
  network_helper: coerceBoolean().optional().describe('Enables automatic IP assignment for newly created Linodes'),
  backups_enabled: coerceBoolean().optional().describe('Enables automatic backups for all created Linodes')
});

// Enable Managed Service schema
export const enableManagedServiceSchema = z.object({});

// Account Network Transfer schemas
export const AccountNetworkTransferSchema = z.object({
  billable: z.coerce.number(),
  used: z.coerce.number(),
  quota: z.coerce.number()
});

// Get Account Network Transfer schema
export const getAccountNetworkTransferSchema = z.object({});

// User schemas
export const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  restricted: coerceBoolean(),
  ssh_keys: z.array(z.string()),
  two_factor_auth: coerceBoolean()
});

// List Users schema
export const listUsersSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

// Create User schema
export const createUserSchema = z.object({
  username: z.string().describe('The username for the user'),
  email: z.string().email().describe('The email address for the user'),
  restricted: coerceBoolean().describe('If true, the user has limited access to account features')
});

// Get User schema
export const getUserSchema = z.object({
  username: z.string().describe('The username of the user')
});

// Update User schema
export const updateUserSchema = z.object({
  username: z.string().describe('The username of the user'),
  email: z.string().email().optional().describe('The email address for the user'),
  restricted: coerceBoolean().optional().describe('If true, the user has limited access to account features')
});

// Delete User schema
export const deleteUserSchema = z.object({
  username: z.string().describe('The username of the user')
});

// User Grants schemas
export const UserGrantsSchema = z.object({
  global: z.object({
    account_access: z.string(),
    add_domains: coerceBoolean().optional(),
    add_databases: coerceBoolean().optional(),
    add_firewalls: coerceBoolean().optional(),
    add_images: coerceBoolean().optional(),
    add_linodes: coerceBoolean().optional(),
    add_longview: coerceBoolean().optional(),
    add_nodebalancers: coerceBoolean().optional(),
    add_stackscripts: coerceBoolean().optional(),
    add_volumes: coerceBoolean().optional(),
    cancel_account: coerceBoolean().optional(),
    longview_subscription: coerceBoolean().optional()
  }),
  database: z.record(z.string(), z.object({
    id: z.coerce.number(),
    permissions: z.string(),
    label: z.string()
  })),
  domain: z.record(z.string(), z.object({
    id: z.coerce.number(),
    permissions: z.string(),
    label: z.string()
  })),
  firewall: z.record(z.string(), z.object({
    id: z.coerce.number(),
    permissions: z.string(),
    label: z.string()
  })),
  image: z.record(z.string(), z.object({
    id: z.coerce.number(),
    permissions: z.string(),
    label: z.string()
  })),
  linode: z.record(z.string(), z.object({
    id: z.coerce.number(),
    permissions: z.string(),
    label: z.string()
  })),
  longview: z.record(z.string(), z.object({
    id: z.coerce.number(),
    permissions: z.string(),
    label: z.string()
  })),
  nodebalancer: z.record(z.string(), z.object({
    id: z.coerce.number(),
    permissions: z.string(),
    label: z.string()
  })),
  stackscript: z.record(z.string(), z.object({
    id: z.coerce.number(),
    permissions: z.string(),
    label: z.string()
  })),
  volume: z.record(z.string(), z.object({
    id: z.coerce.number(),
    permissions: z.string(),
    label: z.string()
  }))
});

// Get User Grants schema
export const getUserGrantsSchema = z.object({
  username: z.string().describe('The username of the user')
});

// Entity schemas
export const listEntitiesSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

// IAM Role Permission schemas
export const listIamRolesSchema = z.object({});

export const getUserRolePermissionsSchema = z.object({
  username: z.string().describe('The username of the user')
});

export const updateUserRolePermissionsSchema = z.object({
  username: z.string().describe('The username of the user'),
  roles: z.array(z.string()).describe('List of role names to assign to the user')
});

// Delegation Child Account schemas
export const listDelegationChildAccountsSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

export const getDelegationChildAccountUsersSchema = z.object({
  euuid: z.string().describe('Unique identifier for the child account')
});

export const updateDelegationChildAccountUsersSchema = z.object({
  euuid: z.string().describe('Unique identifier for the child account'),
  users: z.array(z.string()).describe('List of usernames to delegate to the child account')
});

// Delegation Default Roles schemas
export const getDelegationDefaultRolesSchema = z.object({});

export const updateDelegationDefaultRolesSchema = z.object({
  roles: z.array(z.string()).describe('List of default role names for delegate users')
});

// Delegation Profile schemas
export const listDelegationProfileAccountsSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

export const getDelegationProfileAccountSchema = z.object({
  euuid: z.string().describe('Unique identifier for the child account')
});

export const createDelegationTokenSchema = z.object({
  euuid: z.string().describe('Unique identifier for the child account')
});

// User Delegations schema
export const getUserDelegationsSchema = z.object({
  username: z.string().describe('The username of the user')
});

// Maintenance Policy schemas
export const listMaintenancePoliciesSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

// Resource Lock schemas
export const listResourceLocksSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page')
});

export const getResourceLockSchema = z.object({
  resourceLockId: z.coerce.number().describe('ID of the resource lock')
});

export const createResourceLockSchema = z.object({
  resource_id: z.coerce.number().describe('ID of the resource to lock'),
  resource_type: z.string().describe('Type of the resource to lock'),
  reason: z.string().optional().describe('Reason for locking the resource')
});

export const deleteResourceLockSchema = z.object({
  resourceLockId: z.coerce.number().describe('ID of the resource lock')
});

// Update User Grants schema
export const updateUserGrantsSchema = z.object({
  username: z.string().describe('The username of the user'),
  global: z.object({
    account_access: z.string().optional().describe('The level of access ("read_only" or "read_write")'),
    add_domains: coerceBoolean().optional().describe('Whether the user can add domains'),
    add_databases: coerceBoolean().optional().describe('Whether the user can add databases'),
    add_firewalls: coerceBoolean().optional().describe('Whether the user can add firewalls'),
    add_images: coerceBoolean().optional().describe('Whether the user can add images'),
    add_linodes: coerceBoolean().optional().describe('Whether the user can add Linodes'),
    add_longview: coerceBoolean().optional().describe('Whether the user can add Longview clients'),
    add_nodebalancers: coerceBoolean().optional().describe('Whether the user can add NodeBalancers'),
    add_stackscripts: coerceBoolean().optional().describe('Whether the user can add StackScripts'),
    add_volumes: coerceBoolean().optional().describe('Whether the user can add volumes'),
    cancel_account: coerceBoolean().optional().describe('Whether the user can cancel the account'),
    longview_subscription: coerceBoolean().optional().describe('Whether the user can manage the Longview subscription')
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
