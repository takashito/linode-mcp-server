import { AxiosInstance } from 'axios';
import { PaginatedResponse, PaginationParams } from './common';

// Alert interfaces
export interface NotificationChannel {
  id: number;
  label: string;
  channel_type: string;
  details: Record<string, any>;
  created: string;
  updated: string;
}

export interface CreateNotificationChannelRequest {
  label: string;
  channel_type: string;
  details: Record<string, any>;
}

export interface UpdateNotificationChannelRequest {
  label?: string;
  channel_type?: string;
  details?: Record<string, any>;
}

export interface AlertDefinition {
  id: number;
  label: string;
  description: string;
  service_type: string;
  severity: number;
  trigger_conditions: Record<string, any>;
  channel_ids: number[];
  entity_ids: string[];
  created: string;
  updated: string;
  enabled: boolean;
}

export interface CreateAlertDefinitionRequest {
  label: string;
  description?: string;
  severity?: number;
  trigger_conditions: Record<string, any>;
  channel_ids?: number[];
  entity_ids?: string[];
  enabled?: boolean;
}

export interface UpdateAlertDefinitionRequest {
  label?: string;
  description?: string;
  severity?: number;
  trigger_conditions?: Record<string, any>;
  channel_ids?: number[];
  entity_ids?: string[];
  enabled?: boolean;
}

// Log interfaces
export interface LogStream {
  id: number;
  label: string;
  filters: Record<string, any>;
  aggregation: Record<string, any>;
  created: string;
  updated: string;
}

export interface CreateLogStreamRequest {
  label: string;
  filters: Record<string, any>;
  aggregation: Record<string, any>;
}

export interface UpdateLogStreamRequest {
  label?: string;
  filters?: Record<string, any>;
  aggregation?: Record<string, any>;
}

export interface LogStreamHistory {
  id: number;
  stream_id: number;
  timestamp: string;
  data: Record<string, any>;
}

export interface LogDestination {
  id: number;
  label: string;
  type: string;
  config: Record<string, any>;
  created: string;
  updated: string;
}

export interface CreateLogDestinationRequest {
  label: string;
  type: string;
  config: Record<string, any>;
}

export interface UpdateLogDestinationRequest {
  label?: string;
  type?: string;
  config?: Record<string, any>;
}

export interface LogDestinationHistory {
  id: number;
  destination_id: number;
  timestamp: string;
  data: Record<string, any>;
}

// Metrics interfaces
export interface MonitorDashboard {
  id: number;
  label: string;
  service_type: string;
  type: string;
  widgets: Record<string, any>[];
  created: string;
  updated: string;
}

export interface MonitorService {
  service_type: string;
  label: string;
}

export interface MetricDefinition {
  metric: string;
  label: string;
  metric_type: string;
  unit: string;
  scrape_interval: string;
  is_alertable: boolean;
  dimensions: Record<string, any>[];
  available_aggregate_functions: string[];
}

export interface GetServiceMetricsRequest {
  entity_ids: number[];
  start_time: string;
  end_time: string;
  time_granularity?: Record<string, any>;
}

export interface ServiceToken {
  token: string;
}

// Combined Monitor client interface
export interface MonitorClient {
  // Alert channels
  getNotificationChannels(params?: PaginationParams): Promise<PaginatedResponse<NotificationChannel>>;
  getNotificationChannel(channelId: number): Promise<NotificationChannel>;
  createNotificationChannel(data: CreateNotificationChannelRequest): Promise<NotificationChannel>;
  updateNotificationChannel(channelId: number, data: UpdateNotificationChannelRequest): Promise<NotificationChannel>;
  deleteNotificationChannel(channelId: number): Promise<void>;
  getChannelAlerts(channelId: number, params?: PaginationParams): Promise<PaginatedResponse<AlertDefinition>>;

  // Alert definitions
  getAlertDefinitions(params?: PaginationParams): Promise<PaginatedResponse<AlertDefinition>>;
  getServiceAlertDefinitions(serviceType: string, params?: PaginationParams): Promise<PaginatedResponse<AlertDefinition>>;
  getAlertDefinition(serviceType: string, alertId: number): Promise<AlertDefinition>;
  createAlertDefinition(serviceType: string, data: CreateAlertDefinitionRequest): Promise<AlertDefinition>;
  updateAlertDefinition(serviceType: string, alertId: number, data: UpdateAlertDefinitionRequest): Promise<AlertDefinition>;
  deleteAlertDefinition(serviceType: string, alertId: number): Promise<void>;

  // Log streams
  getLogStreams(params?: PaginationParams): Promise<PaginatedResponse<LogStream>>;
  getLogStream(streamId: number): Promise<LogStream>;
  createLogStream(data: CreateLogStreamRequest): Promise<LogStream>;
  updateLogStream(streamId: number, data: UpdateLogStreamRequest): Promise<LogStream>;
  deleteLogStream(streamId: number): Promise<void>;
  getLogStreamHistory(streamId: number, params?: PaginationParams): Promise<PaginatedResponse<LogStreamHistory>>;

  // Log destinations
  getLogDestinations(params?: PaginationParams): Promise<PaginatedResponse<LogDestination>>;
  getLogDestination(destinationId: number): Promise<LogDestination>;
  createLogDestination(data: CreateLogDestinationRequest): Promise<LogDestination>;
  updateLogDestination(destinationId: number, data: UpdateLogDestinationRequest): Promise<LogDestination>;
  deleteLogDestination(destinationId: number): Promise<void>;
  getLogDestinationHistory(destinationId: number, params?: PaginationParams): Promise<PaginatedResponse<LogDestinationHistory>>;

  // Dashboards
  listDashboards(params?: PaginationParams): Promise<PaginatedResponse<MonitorDashboard>>;
  getDashboard(dashboardId: number): Promise<MonitorDashboard>;

  // Services & metrics
  listServices(params?: PaginationParams): Promise<PaginatedResponse<MonitorService>>;
  getService(serviceType: string): Promise<MonitorService>;
  listServiceDashboards(serviceType: string, params?: PaginationParams): Promise<PaginatedResponse<MonitorDashboard>>;
  listServiceMetricDefinitions(serviceType: string): Promise<PaginatedResponse<MetricDefinition>>;
  getServiceMetrics(serviceType: string, data: GetServiceMetricsRequest): Promise<Record<string, any>>;
  createServiceToken(serviceType: string): Promise<ServiceToken>;
}

export function createMonitorClient(axios: AxiosInstance): MonitorClient {
  return {
    // Alert channels
    getNotificationChannels: async (params) => {
      const response = await axios.get('https://api.linode.com/v4beta/monitor/alert-channels', { params });
      return response.data;
    },
    getNotificationChannel: async (channelId) => {
      const response = await axios.get(`https://api.linode.com/v4beta/monitor/alert-channels/${channelId}`);
      return response.data;
    },
    createNotificationChannel: async (data) => {
      const response = await axios.post('https://api.linode.com/v4beta/monitor/alert-channels', data);
      return response.data;
    },
    updateNotificationChannel: async (channelId, data) => {
      const response = await axios.put(`https://api.linode.com/v4beta/monitor/alert-channels/${channelId}`, data);
      return response.data;
    },
    deleteNotificationChannel: async (channelId) => {
      await axios.delete(`https://api.linode.com/v4beta/monitor/alert-channels/${channelId}`);
    },
    getChannelAlerts: async (channelId, params) => {
      const response = await axios.get(`https://api.linode.com/v4beta/monitor/alert-channels/${channelId}/alerts`, { params });
      return response.data;
    },

    // Alert definitions
    getAlertDefinitions: async (params) => {
      const response = await axios.get('https://api.linode.com/v4beta/monitor/alert-definitions', { params });
      return response.data;
    },
    getServiceAlertDefinitions: async (serviceType, params) => {
      const response = await axios.get(`https://api.linode.com/v4beta/monitor/services/${serviceType}/alert-definitions`, { params });
      return response.data;
    },
    getAlertDefinition: async (serviceType, alertId) => {
      const response = await axios.get(`https://api.linode.com/v4beta/monitor/services/${serviceType}/alert-definitions/${alertId}`);
      return response.data;
    },
    createAlertDefinition: async (serviceType, data) => {
      const response = await axios.post(`https://api.linode.com/v4beta/monitor/services/${serviceType}/alert-definitions`, data);
      return response.data;
    },
    updateAlertDefinition: async (serviceType, alertId, data) => {
      const response = await axios.put(`https://api.linode.com/v4beta/monitor/services/${serviceType}/alert-definitions/${alertId}`, data);
      return response.data;
    },
    deleteAlertDefinition: async (serviceType, alertId) => {
      await axios.delete(`https://api.linode.com/v4beta/monitor/services/${serviceType}/alert-definitions/${alertId}`);
    },

    // Log streams
    getLogStreams: async (params) => {
      const response = await axios.get('/monitor/streams', { params });
      return response.data;
    },
    getLogStream: async (streamId) => {
      const response = await axios.get(`/monitor/streams/${streamId}`);
      return response.data;
    },
    createLogStream: async (data) => {
      const response = await axios.post('/monitor/streams', data);
      return response.data;
    },
    updateLogStream: async (streamId, data) => {
      const response = await axios.put(`/monitor/streams/${streamId}`, data);
      return response.data;
    },
    deleteLogStream: async (streamId) => {
      await axios.delete(`/monitor/streams/${streamId}`);
    },
    getLogStreamHistory: async (streamId, params) => {
      const response = await axios.get(`/monitor/streams/${streamId}/history`, { params });
      return response.data;
    },

    // Log destinations
    getLogDestinations: async (params) => {
      const response = await axios.get('/monitor/streams/destinations', { params });
      return response.data;
    },
    getLogDestination: async (destinationId) => {
      const response = await axios.get(`/monitor/streams/destinations/${destinationId}`);
      return response.data;
    },
    createLogDestination: async (data) => {
      const response = await axios.post('/monitor/streams/destinations', data);
      return response.data;
    },
    updateLogDestination: async (destinationId, data) => {
      const response = await axios.put(`/monitor/streams/destinations/${destinationId}`, data);
      return response.data;
    },
    deleteLogDestination: async (destinationId) => {
      await axios.delete(`/monitor/streams/destinations/${destinationId}`);
    },
    getLogDestinationHistory: async (destinationId, params) => {
      const response = await axios.get(`/monitor/streams/destinations/${destinationId}/history`, { params });
      return response.data;
    },

    // Dashboards
    listDashboards: async (params) => {
      const response = await axios.get('/monitor/dashboards', { params });
      return response.data;
    },
    getDashboard: async (dashboardId) => {
      const response = await axios.get(`/monitor/dashboards/${dashboardId}`);
      return response.data;
    },

    // Services & metrics
    listServices: async (params) => {
      const response = await axios.get('/monitor/services', { params });
      return response.data;
    },
    getService: async (serviceType) => {
      const response = await axios.get(`/monitor/services/${serviceType}`);
      return response.data;
    },
    listServiceDashboards: async (serviceType, params) => {
      const response = await axios.get(`/monitor/services/${serviceType}/dashboards`, { params });
      return response.data;
    },
    listServiceMetricDefinitions: async (serviceType) => {
      const response = await axios.get(`/monitor/services/${serviceType}/metric-definitions`);
      return response.data;
    },
    getServiceMetrics: async (serviceType, data) => {
      const response = await axios.post(`/monitor/services/${serviceType}/metrics`, data);
      return response.data;
    },
    createServiceToken: async (serviceType) => {
      const response = await axios.post(`/monitor/services/${serviceType}/token`);
      return response.data;
    },
  };
}
