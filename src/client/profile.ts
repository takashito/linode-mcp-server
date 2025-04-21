import axios, { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationParams } from './instances';

// ScopeDefinition interface (duplicated from schemas.ts to avoid circular references)
export interface ScopeDefinition {
  name: string;
  description: string;
  category: string;
}

// Authorized App interfaces
export interface AuthorizedApp {
  id: number;
  label: string;
  thumbnail_url: string;
  access: string;
  scopes: string[];
  website: string;
  created: string;
  expiry: string;
}

// Trusted Device interfaces
export interface TrustedDevice {
  id: number;
  user_agent: string;
  last_remote_addr: string;
  last_authenticated: string;
  created: string;
  expiry: string;
}

// Grant interfaces
export interface Grant {
  id: number;
  permissions: string;
  label: string;
  entity: {
    id: number;
    type: string;
    label: string;
  };
}

// Login interfaces
export interface Login {
  id: number;
  ip: string;
  datetime: string;
  username: string;
  status: string;
}

// Preference interfaces
export interface UserPreferences {
  sortKeys?: Record<string, string>;
  timezone?: string;
  email_notifications?: boolean;
  default_from_email?: string;
  authorized_keys?: string[];
  theme?: string;
  editorMode?: string;
}

// Security Question interfaces
export interface SecurityQuestion {
  id: number;
  question: string;
}

export interface SecurityQuestionAnswer {
  question_id: number;
  answer: string;
}

// Phone Number interfaces
export interface PhoneVerificationPayload {
  phone_number: string;
}

export interface PhoneVerificationConfirmPayload {
  otp_code: string;
}

export interface UserProfile {
  username: string;
  email: string;
  timezone: string;
  email_notifications: boolean;
  restricted: boolean;
  two_factor_auth: boolean;
  referrals: {
    total: number;
    completed: number;
    pending: number;
    credit: number;
    code: string;
    url: string;
  };
  authorized_keys: string[];
}

export interface UpdateProfileRequest {
  email?: string;
  timezone?: string;
  email_notifications?: boolean;
  restricted?: boolean;
}

export interface SSHKey {
  id: number;
  label: string;
  ssh_key: string;
  created: string;
}

export interface CreateSSHKeyRequest {
  label: string;
  ssh_key: string;
}

export interface UpdateSSHKeyRequest {
  label?: string;
}

export interface APIToken {
  id: number;
  label: string;
  created: string;
  expiry: string | null;
  token?: string;
  scopes: string[];
  website?: string;
  thumbnail_url?: string;
}

export interface CreatePersonalAccessTokenRequest {
  label: string;
  expiry?: string;
  scopes: string[];
}

export interface UpdateTokenRequest {
  label?: string;
  expiry?: string;
  scopes?: string[];
}

export interface TwoFactorResponse {
  secret: string;
  service_name: string;
  qr_code: string;
}

export interface TwoFactorConfirmRequest {
  tfa_code: string;
  scratch_code?: string;
}

export interface ScopeListResponse {
  scopes: ScopeDefinition[];
}

export interface ProfileClientInterface {
  // Profile operations
  getProfile(): Promise<UserProfile>;
  updateProfile(data: UpdateProfileRequest): Promise<UserProfile>;
  
  // SSH Key operations
  getSSHKeys(params?: PaginationParams): Promise<PaginatedResponse<SSHKey>>;
  getSSHKey(id: number): Promise<SSHKey>;
  createSSHKey(data: CreateSSHKeyRequest): Promise<SSHKey>;
  updateSSHKey(id: number, data: UpdateSSHKeyRequest): Promise<SSHKey>;
  deleteSSHKey(id: number): Promise<void>;
  
  // API Token operations
  getAPITokens(params?: PaginationParams): Promise<PaginatedResponse<APIToken>>;
  getAPIToken(id: number): Promise<APIToken>;
  createPersonalAccessToken(data: CreatePersonalAccessTokenRequest): Promise<APIToken>;
  updateToken(id: number, data: UpdateTokenRequest): Promise<APIToken>;
  deleteToken(id: number): Promise<void>;
  
  // Two-Factor Auth operations
  getTwoFactorSecret(): Promise<TwoFactorResponse>;
  enableTwoFactor(data: TwoFactorConfirmRequest): Promise<{}>;
  disableTwoFactor(data: TwoFactorConfirmRequest): Promise<{}>;
  
  // Authorized Apps operations
  getAuthorizedApps(params?: PaginationParams): Promise<PaginatedResponse<AuthorizedApp>>;
  getAuthorizedApp(appId: number): Promise<AuthorizedApp>;
  revokeAuthorizedApp(appId: number): Promise<void>;
  
  // Trusted Devices operations
  getTrustedDevices(params?: PaginationParams): Promise<PaginatedResponse<TrustedDevice>>;
  getTrustedDevice(deviceId: number): Promise<TrustedDevice>;
  revokeTrustedDevice(deviceId: number): Promise<void>;
  
  // Grants operations
  getGrants(params?: PaginationParams): Promise<PaginatedResponse<Grant>>;
  
  // Logins operations
  getLogins(params?: PaginationParams): Promise<PaginatedResponse<Login>>;
  getLogin(loginId: number): Promise<Login>;
  
  // Phone Number operations
  deletePhoneNumber(): Promise<void>;
  sendPhoneVerification(data: PhoneVerificationPayload): Promise<{}>;
  verifyPhoneNumber(data: PhoneVerificationConfirmPayload): Promise<{}>;
  
  // User Preferences operations
  getUserPreferences(): Promise<UserPreferences>;
  updateUserPreferences(data: UserPreferences): Promise<UserPreferences>;
  
  // Security Questions operations
  getSecurityQuestions(): Promise<SecurityQuestion[]>;
  answerSecurityQuestions(data: SecurityQuestionAnswer[]): Promise<{}>;
}

export function createProfileClient(axiosInstance: AxiosInstance): ProfileClientInterface {
  return {
    // Profile operations
    getProfile: async () => {
      const response = await axiosInstance.get('/profile');
      return response.data;
    },

    updateProfile: async (data) => {
      const response = await axiosInstance.put('/profile', data);
      return response.data;
    },

    // SSH Key operations
    getSSHKeys: async (params) => {
      const response = await axiosInstance.get('/profile/sshkeys', { params });
      return response.data;
    },

    getSSHKey: async (id) => {
      const response = await axiosInstance.get(`/profile/sshkeys/${id}`);
      return response.data;
    },

    createSSHKey: async (data) => {
      const response = await axiosInstance.post('/profile/sshkeys', data);
      return response.data;
    },

    updateSSHKey: async (id, data) => {
      const response = await axiosInstance.put(`/profile/sshkeys/${id}`, data);
      return response.data;
    },

    deleteSSHKey: async (id) => {
      await axiosInstance.delete(`/profile/sshkeys/${id}`);
    },

    // API Token operations
    getAPITokens: async (params) => {
      const response = await axiosInstance.get('/profile/tokens', { params });
      return response.data;
    },

    getAPIToken: async (id) => {
      const response = await axiosInstance.get(`/profile/tokens/${id}`);
      return response.data;
    },

    createPersonalAccessToken: async (data) => {
      const response = await axiosInstance.post('/profile/tokens', data);
      return response.data;
    },

    updateToken: async (id, data) => {
      const response = await axiosInstance.put(`/profile/tokens/${id}`, data);
      return response.data;
    },

    deleteToken: async (id) => {
      await axiosInstance.delete(`/profile/tokens/${id}`);
    },

    // Two-Factor Auth operations
    getTwoFactorSecret: async () => {
      const response = await axiosInstance.post('/profile/tfa-enable');
      return response.data;
    },

    enableTwoFactor: async (data) => {
      const response = await axiosInstance.post('/profile/tfa-enable-confirm', data);
      return response.data;
    },

    disableTwoFactor: async (data) => {
      const response = await axiosInstance.post('/profile/tfa-disable', data);
      return response.data;
    },
    
    // Authorized Apps operations
    getAuthorizedApps: async (params) => {
      const response = await axiosInstance.get('/profile/apps', { params });
      return response.data;
    },

    getAuthorizedApp: async (appId) => {
      const response = await axiosInstance.get(`/profile/apps/${appId}`);
      return response.data;
    },

    revokeAuthorizedApp: async (appId) => {
      await axiosInstance.delete(`/profile/apps/${appId}`);
    },

    // Trusted Devices operations
    getTrustedDevices: async (params) => {
      const response = await axiosInstance.get('/profile/devices', { params });
      return response.data;
    },

    getTrustedDevice: async (deviceId) => {
      const response = await axiosInstance.get(`/profile/devices/${deviceId}`);
      return response.data;
    },

    revokeTrustedDevice: async (deviceId) => {
      await axiosInstance.delete(`/profile/devices/${deviceId}`);
    },

    // Grants operations
    getGrants: async (params) => {
      const response = await axiosInstance.get('/profile/grants', { params });
      return response.data;
    },

    // Logins operations
    getLogins: async (params) => {
      const response = await axiosInstance.get('/profile/logins', { params });
      return response.data;
    },

    getLogin: async (loginId) => {
      const response = await axiosInstance.get(`/profile/logins/${loginId}`);
      return response.data;
    },

    // Phone Number operations
    deletePhoneNumber: async () => {
      await axiosInstance.delete('/profile/phone');
    },

    sendPhoneVerification: async (data) => {
      const response = await axiosInstance.post('/profile/phone', data);
      return response.data;
    },

    verifyPhoneNumber: async (data) => {
      const response = await axiosInstance.post('/profile/phone/verify', data);
      return response.data;
    },

    // User Preferences operations
    getUserPreferences: async () => {
      const response = await axiosInstance.get('/profile/preferences');
      return response.data;
    },

    updateUserPreferences: async (data) => {
      const response = await axiosInstance.put('/profile/preferences', data);
      return response.data;
    },

    // Security Questions operations
    getSecurityQuestions: async () => {
      const response = await axiosInstance.get('/profile/security-questions');
      return response.data;
    },

    answerSecurityQuestions: async (data) => {
      const response = await axiosInstance.post('/profile/security-questions', data);
      return response.data;
    },
  };
}