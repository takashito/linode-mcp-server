import axios, { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationParams } from './instances';

// Account interfaces
export interface Account {
  active_since: string;
  address_1: string;
  address_2?: string;
  balance: number;
  balances: {
    uninvoiced: number;
    past_due: boolean;
  };
  billing_source: string;
  capabilities: string[];
  city: string;
  company: string;
  country: string;
  credit_card: {
    expiry: string;
    last_four: string;
  };
  email: string;
  euuid: string;
  first_name: string;
  last_name: string;
  phone: string;
  state: string;
  tax_id: string;
  zip: string;
}

export interface UpdateAccountRequest {
  address_1?: string;
  address_2?: string;
  city?: string;
  company?: string;
  country?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  state?: string;
  tax_id?: string;
  zip?: string;
}

export interface Agreement {
  id: string;
  description: string;
  body: string;
  title: string;
  created: string;
  modified: string;
  expiry?: string;
  url?: string;
}

export interface AcknowledgeAgreementRequest {
  agreement_ids: string[];
}

export interface ServiceAvailability {
  region: string;
  services: Record<string, boolean>;
}

export interface RegionServiceAvailability {
  id: string;
  services: Record<string, boolean>;
}

export interface CancelAccountRequest {
  comments?: string;
}

export interface ChildAccount {
  euuid: string;
  company: string;
  email: string;
  is_active: boolean;
  billing_cycle: string;
  state: string;
  has_credit_card: boolean;
  enterprise_data?: {
    credit_limit: number;
    acl: Record<string, string>;
  };
}

export interface ProxyTokenRequest {
  expiry?: string;
  scopes?: string[];
}

export interface ProxyToken {
  token: string;
  scopes: string[];
  expiry: string;
}

export interface AccountEvent {
  id: number;
  action: string;
  created: string;
  entity: {
    id: number;
    label: string;
    type: string;
    url: string;
  };
  percent_complete?: number;
  rate?: string;
  read: boolean;
  seen: boolean;
  status: string;
  time_remaining?: number;
  username: string;
  message?: string;
  secondary_entity?: {
    id: number;
    label: string;
    type: string;
    url: string;
  };
}

export interface Invoice {
  id: number;
  date: string;
  label: string;
  subtotal: number;
  tax: number;
  total: number;
}

export interface InvoiceItem {
  amount: number;
  from: string;
  to: string;
  label: string;
  quantity: number;
  type: string;
  unit_price: string;
  tax: number;
  total: number;
}

export interface AccountLogin {
  id: number;
  datetime: string;
  ip: string;
  restricted: boolean;
  status: string;
  username: string;
}

export interface Maintenance {
  when: string;
  entity: {
    id: string;
    label: string;
    type: string;
    url: string;
  };
  duration: number;
  status: string;
  type: string;
  reason: string;
  key: string;
  created: string;
  updated: string;
}

export interface Notification {
  body: string;
  entity: {
    id: number;
    label: string;
    type: string;
    url: string;
  };
  label: string;
  message: string;
  severity: string;
  type: string;
  until: string;
  when: string;
}

export interface OAuthClient {
  id: string;
  label: string;
  redirect_uri: string;
  secret: string;
  public: boolean;
  status: string;
  thumbnail_url?: string;
}

export interface CreateOAuthClientRequest {
  label: string;
  redirect_uri: string;
  public?: boolean;
}

export interface UpdateOAuthClientRequest {
  label?: string;
  redirect_uri?: string;
  public?: boolean;
}

export interface OAuthClientSecret {
  secret: string;
}

export interface AccountSettings {
  managed: boolean;
  longview_subscription: string | null;
  network_helper: boolean;
  backups_enabled: boolean;
  object_storage: 'active' | 'disabled' | 'suspended';
}

export interface UpdateAccountSettingsRequest {
  network_helper?: boolean;
  backups_enabled?: boolean;
}

export interface AccountNetworkTransfer {
  billable: number;
  used: number;
  quota: number;
}

export interface User {
  username: string;
  email: string;
  restricted: boolean;
  ssh_keys: string[];
  two_factor_auth: boolean;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  restricted: boolean;
}

export interface UpdateUserRequest {
  email?: string;
  restricted?: boolean;
}

export interface UserGrants {
  global: {
    account_access: string;
    add_domains?: boolean;
    add_databases?: boolean;
    add_firewalls?: boolean;
    add_images?: boolean;
    add_linodes?: boolean;
    add_longview?: boolean;
    add_nodebalancers?: boolean;
    add_stackscripts?: boolean;
    add_volumes?: boolean;
    cancel_account?: boolean;
    longview_subscription?: boolean;
  };
  database: Record<string, {
    id: number;
    permissions: string;
    label: string;
  }>;
  domain: Record<string, {
    id: number;
    permissions: string;
    label: string;
  }>;
  firewall: Record<string, {
    id: number;
    permissions: string;
    label: string;
  }>;
  image: Record<string, {
    id: number;
    permissions: string;
    label: string;
  }>;
  linode: Record<string, {
    id: number;
    permissions: string;
    label: string;
  }>;
  longview: Record<string, {
    id: number;
    permissions: string;
    label: string;
  }>;
  nodebalancer: Record<string, {
    id: number;
    permissions: string;
    label: string;
  }>;
  stackscript: Record<string, {
    id: number;
    permissions: string;
    label: string;
  }>;
  volume: Record<string, {
    id: number;
    permissions: string;
    label: string;
  }>;
}

export interface UpdateUserGrantsRequest {
  global: {
    account_access?: string;
    add_domains?: boolean;
    add_databases?: boolean;
    add_firewalls?: boolean;
    add_images?: boolean;
    add_linodes?: boolean;
    add_longview?: boolean;
    add_nodebalancers?: boolean;
    add_stackscripts?: boolean;
    add_volumes?: boolean;
    cancel_account?: boolean;
    longview_subscription?: boolean;
  };
  database?: Record<string, { permissions: string }>;
  domain?: Record<string, { permissions: string }>;
  firewall?: Record<string, { permissions: string }>;
  image?: Record<string, { permissions: string }>;
  linode?: Record<string, { permissions: string }>;
  longview?: Record<string, { permissions: string }>;
  nodebalancer?: Record<string, { permissions: string }>;
  stackscript?: Record<string, { permissions: string }>;
  volume?: Record<string, { permissions: string }>;
}

export interface AccountClientInterface {
  // Account operations
  getAccount(): Promise<Account>;
  updateAccount(data: UpdateAccountRequest): Promise<Account>;
  
  // Agreements operations
  getAgreements(): Promise<Agreement[]>;
  acknowledgeAgreements(data: AcknowledgeAgreementRequest): Promise<{}>;
  
  // Service availability operations
  getServiceAvailability(): Promise<ServiceAvailability[]>;
  getRegionServiceAvailability(regionId: string): Promise<RegionServiceAvailability>;
  
  // Account cancellation
  cancelAccount(data: CancelAccountRequest): Promise<{}>;
  
  // Child account operations
  getChildAccounts(params?: PaginationParams): Promise<PaginatedResponse<ChildAccount>>;
  getChildAccount(euuid: string): Promise<ChildAccount>;
  createProxyToken(euuid: string, data: ProxyTokenRequest): Promise<ProxyToken>;
  
  // Event operations
  getEvents(params?: PaginationParams): Promise<PaginatedResponse<AccountEvent>>;
  getEvent(eventId: number): Promise<AccountEvent>;
  markEventAsRead(eventId: number): Promise<{}>;
  markEventAsSeen(eventId: number): Promise<{}>;
  
  // Invoice operations
  getInvoices(params?: PaginationParams): Promise<PaginatedResponse<Invoice>>;
  getInvoice(invoiceId: number): Promise<Invoice>;
  getInvoiceItems(invoiceId: number, params?: PaginationParams): Promise<PaginatedResponse<InvoiceItem>>;
  
  // Login operations
  getLogins(params?: PaginationParams): Promise<PaginatedResponse<AccountLogin>>;
  getLogin(loginId: number): Promise<AccountLogin>;
  
  // Maintenance operations
  getMaintenances(params?: PaginationParams): Promise<PaginatedResponse<Maintenance>>;
  
  // Notification operations
  getNotifications(): Promise<Notification[]>;
  
  // OAuth client operations
  getOAuthClients(params?: PaginationParams): Promise<PaginatedResponse<OAuthClient>>;
  createOAuthClient(data: CreateOAuthClientRequest): Promise<OAuthClient>;
  deleteOAuthClient(clientId: string): Promise<void>;
  getOAuthClient(clientId: string): Promise<OAuthClient>;
  updateOAuthClient(clientId: string, data: UpdateOAuthClientRequest): Promise<OAuthClient>;
  resetOAuthClientSecret(clientId: string): Promise<OAuthClientSecret>;
  getOAuthClientThumbnail(clientId: string): Promise<any>; // Binary data
  updateOAuthClientThumbnail(clientId: string, thumbnailData: any): Promise<{}>; // Binary data
  
  // Account settings operations
  getAccountSettings(): Promise<AccountSettings>;
  updateAccountSettings(data: UpdateAccountSettingsRequest): Promise<AccountSettings>;
  enableManagedService(): Promise<{}>;
  
  // Network transfer operations
  getNetworkTransfer(): Promise<AccountNetworkTransfer>;
  
  // User operations
  getUsers(params?: PaginationParams): Promise<PaginatedResponse<User>>;
  createUser(data: CreateUserRequest): Promise<User>;
  deleteUser(username: string): Promise<void>;
  getUser(username: string): Promise<User>;
  updateUser(username: string, data: UpdateUserRequest): Promise<User>;
  getUserGrants(username: string): Promise<UserGrants>;
  updateUserGrants(username: string, data: UpdateUserGrantsRequest): Promise<UserGrants>;
}

export function createAccountClient(axiosInstance: AxiosInstance): AccountClientInterface {
  return {
    // Account operations
    getAccount: async () => {
      const response = await axiosInstance.get('/account');
      return response.data;
    },

    updateAccount: async (data) => {
      const response = await axiosInstance.put('/account', data);
      return response.data;
    },

    // Agreements operations
    getAgreements: async () => {
      const response = await axiosInstance.get('/account/agreements');
      return response.data;
    },

    acknowledgeAgreements: async (data) => {
      const response = await axiosInstance.post('/account/agreements', data);
      return response.data;
    },

    // Service availability operations
    getServiceAvailability: async () => {
      const response = await axiosInstance.get('/account/availability');
      return response.data;
    },

    getRegionServiceAvailability: async (regionId) => {
      const response = await axiosInstance.get(`/account/availability/${regionId}`);
      return response.data;
    },

    // Account cancellation
    cancelAccount: async (data) => {
      const response = await axiosInstance.post('/account/cancel', data);
      return response.data;
    },

    // Child account operations
    getChildAccounts: async (params) => {
      const response = await axiosInstance.get('/account/child-accounts', { params });
      return response.data;
    },

    getChildAccount: async (euuid) => {
      const response = await axiosInstance.get(`/account/child-accounts/${euuid}`);
      return response.data;
    },

    createProxyToken: async (euuid, data) => {
      const response = await axiosInstance.post(`/account/child-accounts/${euuid}/token`, data);
      return response.data;
    },

    // Event operations
    getEvents: async (params) => {
      const response = await axiosInstance.get('/account/events', { params });
      return response.data;
    },

    getEvent: async (eventId) => {
      const response = await axiosInstance.get(`/account/events/${eventId}`);
      return response.data;
    },

    markEventAsRead: async (eventId) => {
      const response = await axiosInstance.post(`/account/events/${eventId}/read`);
      return response.data;
    },

    markEventAsSeen: async (eventId) => {
      const response = await axiosInstance.post(`/account/events/${eventId}/seen`);
      return response.data;
    },

    // Invoice operations
    getInvoices: async (params) => {
      const response = await axiosInstance.get('/account/invoices', { params });
      return response.data;
    },

    getInvoice: async (invoiceId) => {
      const response = await axiosInstance.get(`/account/invoices/${invoiceId}`);
      return response.data;
    },

    getInvoiceItems: async (invoiceId, params) => {
      const response = await axiosInstance.get(`/account/invoices/${invoiceId}/items`, { params });
      return response.data;
    },

    // Login operations
    getLogins: async (params) => {
      const response = await axiosInstance.get('/account/logins', { params });
      return response.data;
    },

    getLogin: async (loginId) => {
      const response = await axiosInstance.get(`/account/logins/${loginId}`);
      return response.data;
    },

    // Maintenance operations
    getMaintenances: async (params) => {
      const response = await axiosInstance.get('/account/maintenance', { params });
      return response.data;
    },

    // Notification operations
    getNotifications: async () => {
      const response = await axiosInstance.get('/account/notifications');
      return response.data;
    },

    // OAuth client operations
    getOAuthClients: async (params) => {
      const response = await axiosInstance.get('/account/oauth-clients', { params });
      return response.data;
    },

    createOAuthClient: async (data) => {
      const response = await axiosInstance.post('/account/oauth-clients', data);
      return response.data;
    },

    deleteOAuthClient: async (clientId) => {
      await axiosInstance.delete(`/account/oauth-clients/${clientId}`);
    },

    getOAuthClient: async (clientId) => {
      const response = await axiosInstance.get(`/account/oauth-clients/${clientId}`);
      return response.data;
    },

    updateOAuthClient: async (clientId, data) => {
      const response = await axiosInstance.put(`/account/oauth-clients/${clientId}`, data);
      return response.data;
    },

    resetOAuthClientSecret: async (clientId) => {
      const response = await axiosInstance.post(`/account/oauth-clients/${clientId}/reset-secret`);
      return response.data;
    },

    getOAuthClientThumbnail: async (clientId) => {
      const response = await axiosInstance.get(`/account/oauth-clients/${clientId}/thumbnail`, {
        responseType: 'arraybuffer'
      });
      return response.data;
    },

    updateOAuthClientThumbnail: async (clientId, thumbnailData) => {
      const response = await axiosInstance.put(`/account/oauth-clients/${clientId}/thumbnail`, thumbnailData, {
        headers: {
          'Content-Type': 'image/png' // Assuming PNG format, adjust as needed
        }
      });
      return response.data;
    },

    // Account settings operations
    getAccountSettings: async () => {
      const response = await axiosInstance.get('/account/settings');
      return response.data;
    },

    updateAccountSettings: async (data) => {
      const response = await axiosInstance.put('/account/settings', data);
      return response.data;
    },

    enableManagedService: async () => {
      const response = await axiosInstance.post('/account/settings/managed-enable');
      return response.data;
    },

    // Network transfer operations
    getNetworkTransfer: async () => {
      const response = await axiosInstance.get('/account/transfer');
      return response.data;
    },

    // User operations
    getUsers: async (params) => {
      const response = await axiosInstance.get('/account/users', { params });
      return response.data;
    },

    createUser: async (data) => {
      const response = await axiosInstance.post('/account/users', data);
      return response.data;
    },

    deleteUser: async (username) => {
      await axiosInstance.delete(`/account/users/${username}`);
    },

    getUser: async (username) => {
      const response = await axiosInstance.get(`/account/users/${username}`);
      return response.data;
    },

    updateUser: async (username, data) => {
      const response = await axiosInstance.put(`/account/users/${username}`, data);
      return response.data;
    },

    getUserGrants: async (username) => {
      const response = await axiosInstance.get(`/account/users/${username}/grants`);
      return response.data;
    },

    updateUserGrants: async (username, data) => {
      const response = await axiosInstance.put(`/account/users/${username}/grants`, data);
      return response.data;
    }
  };
}
