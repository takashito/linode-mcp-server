import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerMonitorTools(server: FastMCP): void {
  // Notification Channels
  server.addTool({
    name: 'list_notification_channels',
    description: 'List all notification channels for monitor alerts',
    parameters: mcpInput(schemas.listNotificationChannelsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getNotificationChannels(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_notification_channel',
    description: 'Get details for a specific notification channel',
    parameters: mcpInput(schemas.getNotificationChannelSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getNotificationChannel(params.channelId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_notification_channel',
    description: 'Create a new notification channel for monitor alerts',
    parameters: mcpInput(schemas.createNotificationChannelSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.createNotificationChannel(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_notification_channel',
    description: 'Update an existing notification channel',
    parameters: mcpInput(schemas.updateNotificationChannelSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { channelId, ...data } = params;
      const result = await createClient(context).monitor.updateNotificationChannel(channelId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_notification_channel',
    description: 'Delete a notification channel',
    parameters: mcpInput(schemas.deleteNotificationChannelSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).monitor.deleteNotificationChannel(params.channelId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'list_channel_alerts',
    description: 'List alerts associated with a specific notification channel',
    parameters: mcpInput(schemas.listChannelAlertsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { channelId, ...paginationParams } = params;
      const result = await createClient(context).monitor.getChannelAlerts(channelId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Alert Definitions
  server.addTool({
    name: 'list_alert_definitions',
    description: 'List all alert definitions across all service types',
    parameters: mcpInput(schemas.listAlertDefinitionsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getAlertDefinitions(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'list_service_alert_definitions',
    description: 'List alert definitions for a specific service type',
    parameters: mcpInput(schemas.listServiceAlertDefinitionsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { serviceType, ...paginationParams } = params;
      const result = await createClient(context).monitor.getServiceAlertDefinitions(serviceType, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_alert_definition',
    description: 'Get details for a specific alert definition',
    parameters: mcpInput(schemas.getAlertDefinitionSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getAlertDefinition(params.serviceType, params.alertId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_alert_definition',
    description: 'Create a new alert definition for a specific service type',
    parameters: mcpInput(schemas.createAlertDefinitionSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { serviceType, ...data } = params;
      const result = await createClient(context).monitor.createAlertDefinition(serviceType, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_alert_definition',
    description: 'Update an existing alert definition',
    parameters: mcpInput(schemas.updateAlertDefinitionSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { serviceType, alertId, ...data } = params;
      const result = await createClient(context).monitor.updateAlertDefinition(serviceType, alertId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_alert_definition',
    description: 'Delete an alert definition',
    parameters: mcpInput(schemas.deleteAlertDefinitionSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).monitor.deleteAlertDefinition(params.serviceType, params.alertId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Log Streams
  server.addTool({
    name: 'list_log_streams',
    description: 'Get a list of all log streams',
    parameters: mcpInput(schemas.listLogStreamsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getLogStreams(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_log_stream',
    description: 'Get details for a specific log stream',
    parameters: mcpInput(schemas.getLogStreamSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getLogStream(params.streamId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_log_stream',
    description: 'Create a new log stream',
    parameters: mcpInput(schemas.createLogStreamSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.createLogStream(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_log_stream',
    description: 'Update an existing log stream',
    parameters: mcpInput(schemas.updateLogStreamSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { streamId, ...data } = params;
      const result = await createClient(context).monitor.updateLogStream(streamId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_log_stream',
    description: 'Delete a log stream',
    parameters: mcpInput(schemas.deleteLogStreamSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).monitor.deleteLogStream(params.streamId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'get_log_stream_history',
    description: 'Get the history for a specific log stream',
    parameters: mcpInput(schemas.getLogStreamHistorySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { streamId, ...paginationParams } = params;
      const result = await createClient(context).monitor.getLogStreamHistory(streamId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Log Destinations
  server.addTool({
    name: 'list_log_destinations',
    description: 'Get a list of all log destinations',
    parameters: mcpInput(schemas.listLogDestinationsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getLogDestinations(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_log_destination',
    description: 'Get details for a specific log destination',
    parameters: mcpInput(schemas.getLogDestinationSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getLogDestination(params.destinationId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_log_destination',
    description: 'Create a new log destination',
    parameters: mcpInput(schemas.createLogDestinationSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.createLogDestination(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_log_destination',
    description: 'Update an existing log destination',
    parameters: mcpInput(schemas.updateLogDestinationSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { destinationId, ...data } = params;
      const result = await createClient(context).monitor.updateLogDestination(destinationId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_log_destination',
    description: 'Delete a log destination',
    parameters: mcpInput(schemas.deleteLogDestinationSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).monitor.deleteLogDestination(params.destinationId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'get_log_destination_history',
    description: 'Get the history for a specific log destination',
    parameters: mcpInput(schemas.getLogDestinationHistorySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { destinationId, ...paginationParams } = params;
      const result = await createClient(context).monitor.getLogDestinationHistory(destinationId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Dashboards
  server.addTool({
    name: 'list_monitor_dashboards',
    description: 'List all monitor dashboards',
    parameters: mcpInput(schemas.listMonitorDashboardsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.listDashboards(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_monitor_dashboard',
    description: 'Get details for a specific monitor dashboard',
    parameters: mcpInput(schemas.getMonitorDashboardSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getDashboard(params.dashboardId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Services & Metrics
  server.addTool({
    name: 'list_monitor_services',
    description: 'List all supported monitoring service types',
    parameters: mcpInput(schemas.listMonitorServicesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.listServices(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_monitor_service',
    description: 'Get details for a specific supported monitoring service type',
    parameters: mcpInput(schemas.getMonitorServiceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.getService(params.serviceType);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'list_service_dashboards',
    description: 'List dashboards for a specific monitoring service type',
    parameters: mcpInput(schemas.listServiceDashboardsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { serviceType, ...paginationParams } = params;
      const result = await createClient(context).monitor.listServiceDashboards(serviceType, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'list_service_metric_definitions',
    description: 'List metric definitions for a specific monitoring service type',
    parameters: mcpInput(schemas.listServiceMetricDefinitionsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.listServiceMetricDefinitions(params.serviceType);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_service_metrics',
    description: 'Get metrics for entities of a specific monitoring service type',
    parameters: mcpInput(schemas.getServiceMetricsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { serviceType, ...data } = params;
      const result = await createClient(context).monitor.getServiceMetrics(serviceType, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_service_token',
    description: 'Create a token for a specific monitoring service type',
    parameters: mcpInput(schemas.createServiceTokenSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).monitor.createServiceToken(params.serviceType);
      return JSON.stringify(result, null, 2);
    })
  });
}
