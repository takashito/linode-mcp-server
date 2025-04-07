import { AxiosInstance } from 'axios';
import { PaginationParams, PaginatedResponse } from './instances';

export interface IPAddress {
  address: string;
  gateway: string | null;
  subnet_mask: string | null;
  prefix: number | null;
  type: string;
  public: boolean;
  rdns: string | null;
  linode_id: number | null;
  region: string | null;
}

export interface IPv6Range {
  range: string;
  prefix: number;
  region: string;
  route_target: string | null;
}

export interface IPv6Pool {
  range: string;
  prefix: number;
  region: string;
}

export interface AllocateIPRequest {
  type: 'ipv4';
  public: boolean;
  linode_id?: number;
}

export interface UpdateIPRequest {
  rdns: string | null;
}

export interface ShareIPsRequest {
  linode_id: number;
  ips: string[];
}

export interface Firewall {
  id: number;
  label: string;
  created: string;
  updated: string;
  status: string;
  rules: {
    inbound_policy: 'ACCEPT' | 'DROP';
    outbound_policy: 'ACCEPT' | 'DROP';
    inbound: FirewallRule[];
    outbound: FirewallRule[];
  };
  tags: string[];
}

export interface FirewallRule {
  ports: string;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  addresses: {
    ipv4?: string[];
    ipv6?: string[];
  };
  action: 'ACCEPT' | 'DROP';
}

export interface CreateFirewallRequest {
  label: string;
  rules: {
    inbound_policy: 'ACCEPT' | 'DROP';
    outbound_policy: 'ACCEPT' | 'DROP';
    inbound?: FirewallRule[];
    outbound?: FirewallRule[];
  };
  devices?: {
    linodes?: number[];
    nodebalancers?: number[];
  };
  tags?: string[];
}

export interface UpdateFirewallRequest {
  label?: string;
  tags?: string[];
  status?: 'enabled' | 'disabled';
}

export interface FirewallDevice {
  id: number;
  entity_id: number;
  type: 'linode' | 'nodebalancer';
  label: string;
  url: string;
  created: string;
  updated: string;
}

export interface CreateFirewallDeviceRequest {
  id: number;
  type: 'linode' | 'nodebalancer';
}

export interface UpdateFirewallRulesRequest {
  inbound_policy?: 'ACCEPT' | 'DROP';
  outbound_policy?: 'ACCEPT' | 'DROP';
  inbound?: FirewallRule[];
  outbound?: FirewallRule[];
}

export interface VLAN {
  id: string;
  description: string;
  region: string;
  linodes: number[];
  created: string;
}

export interface LinodeNetworkingClient {
  // IP Address operations
  getIPAddresses: () => Promise<{
    ipv4: {
      public: IPAddress[];
      private: IPAddress[];
      shared: IPAddress[];
    };
    ipv6: {
      slaac: IPAddress;
      link_local: IPAddress;
      ranges: IPv6Range[];
    };
  }>;
  getIPAddress: (address: string) => Promise<IPAddress>;
  updateIPAddress: (address: string, data: UpdateIPRequest) => Promise<IPAddress>;
  allocateIPAddress: (data: AllocateIPRequest) => Promise<IPAddress>;
  shareIPAddresses: (data: ShareIPsRequest) => Promise<{}>;
  
  // IPv6 operations
  getIPv6Ranges: () => Promise<PaginatedResponse<IPv6Range>>;
  getIPv6Range: (range: string) => Promise<IPv6Range>;
  getIPv6Pools: () => Promise<PaginatedResponse<IPv6Pool>>;
  
  // Firewall operations
  getFirewalls: (params?: PaginationParams) => Promise<PaginatedResponse<Firewall>>;
  getFirewall: (id: number) => Promise<Firewall>;
  createFirewall: (data: CreateFirewallRequest) => Promise<Firewall>;
  updateFirewall: (id: number, data: UpdateFirewallRequest) => Promise<Firewall>;
  deleteFirewall: (id: number) => Promise<{}>;
  getFirewallDevices: (firewallId: number) => Promise<PaginatedResponse<FirewallDevice>>;
  createFirewallDevice: (firewallId: number, data: CreateFirewallDeviceRequest) => Promise<FirewallDevice>;
  deleteFirewallDevice: (firewallId: number, deviceId: number) => Promise<{}>;
  getFirewallRules: (firewallId: number) => Promise<{
    inbound: FirewallRule[];
    outbound: FirewallRule[];
  }>;
  updateFirewallRules: (firewallId: number, data: UpdateFirewallRulesRequest) => Promise<{
    inbound: FirewallRule[];
    outbound: FirewallRule[];
  }>;
  
  // VLAN operations
  getVLANs: (params?: PaginationParams) => Promise<PaginatedResponse<VLAN>>;
  getVLAN: (regionId: string, label: string) => Promise<VLAN>;
}

export function createNetworkingClient(axios: AxiosInstance): LinodeNetworkingClient {
  return {
    // IP Address operations
    getIPAddresses: async () => {
      const response = await axios.get('/networking/ips');
      return response.data;
    },
    getIPAddress: async (address: string) => {
      const response = await axios.get(`/networking/ips/${address}`);
      return response.data;
    },
    updateIPAddress: async (address: string, data: UpdateIPRequest) => {
      const response = await axios.put(`/networking/ips/${address}`, data);
      return response.data;
    },
    allocateIPAddress: async (data: AllocateIPRequest) => {
      const response = await axios.post('/networking/ips', data);
      return response.data;
    },
    shareIPAddresses: async (data: ShareIPsRequest) => {
      const response = await axios.post('/networking/ips/share', data);
      return response.data;
    },
    
    // IPv6 operations
    getIPv6Ranges: async () => {
      const response = await axios.get('/networking/ipv6/ranges');
      return response.data;
    },
    getIPv6Range: async (range: string) => {
      const response = await axios.get(`/networking/ipv6/ranges/${range}`);
      return response.data;
    },
    getIPv6Pools: async () => {
      const response = await axios.get('/networking/ipv6/pools');
      return response.data;
    },
    
    // Firewall operations
    getFirewalls: async (params?: PaginationParams) => {
      const response = await axios.get('/networking/firewalls', { params });
      return response.data;
    },
    getFirewall: async (id: number) => {
      const response = await axios.get(`/networking/firewalls/${id}`);
      return response.data;
    },
    createFirewall: async (data: CreateFirewallRequest) => {
      // Ensure inbound_policy and outbound_policy are provided
      if (!data.rules.inbound_policy) {
        data.rules.inbound_policy = 'DROP';
      }
      if (!data.rules.outbound_policy) {
        data.rules.outbound_policy = 'ACCEPT';
      }
      const response = await axios.post('/networking/firewalls', data);
      return response.data;
    },
    updateFirewall: async (id: number, data: UpdateFirewallRequest) => {
      const response = await axios.put(`/networking/firewalls/${id}`, data);
      return response.data;
    },
    deleteFirewall: async (id: number) => {
      const response = await axios.delete(`/networking/firewalls/${id}`);
      return response.data;
    },
    getFirewallDevices: async (firewallId: number) => {
      const response = await axios.get(`/networking/firewalls/${firewallId}/devices`);
      return response.data;
    },
    createFirewallDevice: async (firewallId: number, data: CreateFirewallDeviceRequest) => {
      const response = await axios.post(`/networking/firewalls/${firewallId}/devices`, data);
      return response.data;
    },
    deleteFirewallDevice: async (firewallId: number, deviceId: number) => {
      const response = await axios.delete(`/networking/firewalls/${firewallId}/devices/${deviceId}`);
      return response.data;
    },
    getFirewallRules: async (firewallId: number) => {
      const response = await axios.get(`/networking/firewalls/${firewallId}/rules`);
      return response.data;
    },
    updateFirewallRules: async (firewallId: number, data: UpdateFirewallRulesRequest) => {
      const response = await axios.put(`/networking/firewalls/${firewallId}/rules`, data);
      return response.data;
    },
    
    // VLAN operations
    getVLANs: async (params?: PaginationParams) => {
      const response = await axios.get('/networking/vlans', { params });
      return response.data;
    },
    getVLAN: async (regionId: string, label: string) => {
      const response = await axios.get(`/networking/vlans/${regionId}/${label}`);
      return response.data;
    }
  };
}