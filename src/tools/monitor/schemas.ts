import { z } from "zod";
import { pagingParamsSchema, coerceBoolean } from '../common/schemas';

// Alert channel schemas
export const listNotificationChannelsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getNotificationChannelSchema = z.object({
  channelId: z.coerce.number().describe('The ID of the notification channel')
});

export const createNotificationChannelSchema = z.object({
  label: z.string().describe('The label for the notification channel'),
  channel_type: z.string().describe('The type of notification channel (e.g., email, slack, webhook)'),
  details: z.record(z.any()).describe('The channel-specific configuration details. For email: { email: { usernames: [...], email_addresses: [...], recipient_type: "..." } }')
});

export const updateNotificationChannelSchema = z.object({
  channelId: z.coerce.number().describe('The ID of the notification channel'),
  label: z.string().optional().describe('The label for the notification channel'),
  channel_type: z.string().optional().describe('The type of notification channel'),
  details: z.record(z.any()).optional().describe('The channel-specific configuration details')
});

export const deleteNotificationChannelSchema = z.object({
  channelId: z.coerce.number().describe('The ID of the notification channel')
});

export const listChannelAlertsSchema = z.object({
  channelId: z.coerce.number().describe('The ID of the notification channel'),
  ...pagingParamsSchema.shape
});

// Alert definition schemas
export const listAlertDefinitionsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const listServiceAlertDefinitionsSchema = z.object({
  serviceType: z.string().describe('The service type (e.g., linode, dbaas, lke)'),
  ...pagingParamsSchema.shape
});

export const getAlertDefinitionSchema = z.object({
  serviceType: z.string().describe('The service type (e.g., linode, dbaas, lke)'),
  alertId: z.coerce.number().describe('The ID of the alert definition')
});

export const createAlertDefinitionSchema = z.object({
  serviceType: z.string().describe('The service type (e.g., linode, dbaas, lke)'),
  label: z.string().describe('The label for the alert definition'),
  description: z.string().optional().describe('A description of the alert definition'),
  severity: z.coerce.number().optional().describe('The severity level of the alert (0-3)'),
  trigger_conditions: z.record(z.any()).describe('The conditions that trigger the alert'),
  channel_ids: z.array(z.coerce.number()).optional().describe('Array of notification channel IDs'),
  entity_ids: z.array(z.string()).optional().describe('Array of entity IDs to monitor'),
  enabled: coerceBoolean().optional().describe('Whether the alert definition is enabled')
});

export const updateAlertDefinitionSchema = z.object({
  serviceType: z.string().describe('The service type (e.g., linode, dbaas, lke)'),
  alertId: z.coerce.number().describe('The ID of the alert definition'),
  label: z.string().optional().describe('The label for the alert definition'),
  description: z.string().optional().describe('A description of the alert definition'),
  severity: z.coerce.number().optional().describe('The severity level of the alert (0-3)'),
  trigger_conditions: z.record(z.any()).optional().describe('The conditions that trigger the alert'),
  channel_ids: z.array(z.coerce.number()).optional().describe('Array of notification channel IDs'),
  entity_ids: z.array(z.string()).optional().describe('Array of entity IDs to monitor'),
  enabled: coerceBoolean().optional().describe('Whether the alert definition is enabled')
});

export const deleteAlertDefinitionSchema = z.object({
  serviceType: z.string().describe('The service type (e.g., linode, dbaas, lke)'),
  alertId: z.coerce.number().describe('The ID of the alert definition')
});

// Log stream schemas
export const listLogStreamsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getLogStreamSchema = z.object({
  streamId: z.coerce.number().describe('The ID of the log stream')
});

export const createLogStreamSchema = z.object({
  label: z.string().describe('The label for the log stream'),
  filters: z.record(z.any()).describe('The filters configuration for the log stream'),
  aggregation: z.record(z.any()).describe('The aggregation configuration for the log stream')
});

export const updateLogStreamSchema = z.object({
  streamId: z.coerce.number().describe('The ID of the log stream to update'),
  label: z.string().optional().describe('The label for the log stream'),
  filters: z.record(z.any()).optional().describe('The filters configuration'),
  aggregation: z.record(z.any()).optional().describe('The aggregation configuration')
});

export const deleteLogStreamSchema = z.object({
  streamId: z.coerce.number().describe('The ID of the log stream to delete')
});

export const getLogStreamHistorySchema = z.object({
  streamId: z.coerce.number().describe('The ID of the log stream'),
  ...pagingParamsSchema.shape
});

// Log destination schemas
export const listLogDestinationsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getLogDestinationSchema = z.object({
  destinationId: z.coerce.number().describe('The ID of the log destination')
});

export const createLogDestinationSchema = z.object({
  label: z.string().describe('The label for the log destination'),
  type: z.string().describe('The type of the log destination'),
  config: z.record(z.any()).describe('The configuration for the log destination')
});

export const updateLogDestinationSchema = z.object({
  destinationId: z.coerce.number().describe('The ID of the log destination to update'),
  label: z.string().optional().describe('The label for the log destination'),
  type: z.string().optional().describe('The type of the log destination'),
  config: z.record(z.any()).optional().describe('The configuration for the log destination')
});

export const deleteLogDestinationSchema = z.object({
  destinationId: z.coerce.number().describe('The ID of the log destination to delete')
});

export const getLogDestinationHistorySchema = z.object({
  destinationId: z.coerce.number().describe('The ID of the log destination'),
  ...pagingParamsSchema.shape
});

// Dashboard schemas
export const listMonitorDashboardsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getMonitorDashboardSchema = z.object({
  dashboardId: z.coerce.number().describe('The ID of the dashboard')
});

// Service & metrics schemas
export const listMonitorServicesSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getMonitorServiceSchema = z.object({
  serviceType: z.string().describe('The service type to get details for')
});

export const listServiceDashboardsSchema = z.object({
  serviceType: z.string().describe('The service type to list dashboards for'),
  ...pagingParamsSchema.shape
});

export const listServiceMetricDefinitionsSchema = z.object({
  serviceType: z.string().describe('The service type to list metric definitions for')
});

export const getServiceMetricsSchema = z.object({
  serviceType: z.string().describe('The service type to get metrics for'),
  entity_ids: z.array(z.coerce.number()).describe('Array of entity IDs to get metrics for'),
  start_time: z.string().describe('The start time in ISO 8601 format'),
  end_time: z.string().describe('The end time in ISO 8601 format'),
  time_granularity: z.record(z.any()).optional().describe('The time granularity for the metrics data')
});

export const createServiceTokenSchema = z.object({
  serviceType: z.string().describe('The service type to create a token for')
});
