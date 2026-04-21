# Test Scenario 12: Monitor Lifecycle (All New)

All tools in this file are NEW in 0.4.0.

## Dashboards & Services (read-only)

### Test 1: List Monitor Dashboards
**Tools:** list_monitor_dashboards
**New in 0.4.0:** yes

**Steps:**
1. Call `list_monitor_dashboards` with `{}`
   - **Verify:** Response contains `data` array with dashboard objects

### Test 2: List Monitor Services
**Tools:** list_monitor_services
**New in 0.4.0:** yes

**Steps:**
1. Call `list_monitor_services` with `{}`
   - **Verify:** Response contains service types array with `service_type`, `label` fields

### Test 3: Get Monitor Service
**Tools:** get_monitor_service, list_monitor_services
**New in 0.4.0:** yes

**Steps:**
1. Call `list_monitor_services` with `{}` to get first service type
2. Call `get_monitor_service` with `{ "serviceType": "<first_service_type>" }`
   - **Verify:** Response contains service details with `service_type`, `label`, `description` fields

### Test 4: List Service Dashboards
**Tools:** list_service_dashboards
**New in 0.4.0:** yes

**Steps:**
1. Call `list_service_dashboards` with `{ "serviceType": "<type_from_test_2>" }`
   - **Verify:** Response contains `data` array of dashboards for that service

### Test 5: List Service Metric Definitions
**Tools:** list_service_metric_definitions
**New in 0.4.0:** yes

**Steps:**
1. Call `list_service_metric_definitions` with `{ "serviceType": "<type_from_test_2>" }`
   - **Verify:** Response contains metric definitions with `metric`, `label`, `unit` fields

## Notification Channel Lifecycle

### Test 6: Create Notification Channel
**Tools:** create_notification_channel
**New in 0.4.0:** yes

**Steps:**
1. Call `create_notification_channel` with `{ "label": "mcp-test-channel", "channel_type": "email", "details": { "email": { "email_addresses": ["test@example.com"], "recipient_type": "custom" } } }`
   - **Verify:** Response contains `id`, `label` equal to `"mcp-test-channel"`, `channel_type` equal to `"email"`

### Test 7: List Notification Channels
**Tools:** list_notification_channels
**New in 0.4.0:** yes

**Steps:**
1. Call `list_notification_channels` with `{}`
   - **Verify:** Response `data` array contains channel with label `"mcp-test-channel"`

### Test 8: Get Notification Channel
**Tools:** get_notification_channel
**New in 0.4.0:** yes

**Steps:**
1. Call `get_notification_channel` with `{ "channelId": <id_from_test_6> }`
   - **Verify:** Response contains `id`, `label`, `type`, `channel_data` fields

### Test 9: Update Notification Channel
**Tools:** update_notification_channel
**New in 0.4.0:** yes

**Steps:**
1. Call `update_notification_channel` with `{ "channelId": <id_from_test_6>, "label": "mcp-test-channel-updated" }`
   - **Verify:** Response shows `label` is `"mcp-test-channel-updated"`

### Test 10: List Channel Alerts
**Tools:** list_channel_alerts
**New in 0.4.0:** yes

**Steps:**
1. Call `list_channel_alerts` with `{ "channelId": <id_from_test_6> }`
   - **Verify:** Response contains `data` array (likely empty)

## Alert Definition Lifecycle

### Test 11: List Alert Definitions
**Tools:** list_alert_definitions
**New in 0.4.0:** yes

**Steps:**
1. Call `list_alert_definitions` with `{}`
   - **Verify:** Response contains `data` array with proper pagination structure

### Test 12: Create Alert Definition
**Tools:** create_alert_definition
**New in 0.4.0:** yes

**Steps:**
1. Call `create_alert_definition` with `{ "serviceType": "linode", "label": "mcp-test-alert", "trigger_conditions": { "type": "cpu_usage", "threshold": 90 }, "channel_ids": [<channelId_from_test_6>], "enabled": false }`
   - **Verify:** Response contains `id`, `label` equal to `"mcp-test-alert"`, `enabled` is `false`

### Test 13: List Service Alert Definitions
**Tools:** list_service_alert_definitions
**New in 0.4.0:** yes

**Steps:**
1. Call `list_service_alert_definitions` with `{ "serviceType": "linode" }`
   - **Verify:** Response `data` array contains alert with label `"mcp-test-alert"`

### Test 14: Get Alert Definition
**Tools:** get_alert_definition
**New in 0.4.0:** yes

**Steps:**
1. Call `get_alert_definition` with `{ "serviceType": "linode", "alertId": <id_from_test_12> }`
   - **Verify:** Response contains `id`, `label`, `trigger_conditions`, `channel_ids`, `enabled` fields

### Test 15: Update Alert Definition
**Tools:** update_alert_definition
**New in 0.4.0:** yes

**Steps:**
1. Call `update_alert_definition` with `{ "serviceType": "linode", "alertId": <id_from_test_12>, "label": "mcp-test-alert-updated" }`
   - **Verify:** Response shows `label` is `"mcp-test-alert-updated"`

### Test 16: Delete Alert Definition
**Tools:** delete_alert_definition
**New in 0.4.0:** yes

**Steps:**
1. Call `delete_alert_definition` with `{ "serviceType": "linode", "alertId": <id_from_test_12> }`
   - **Verify:** Response confirms deletion (cleanup)

## Log Stream Lifecycle

### Test 17: Create Log Stream
**Tools:** create_log_stream
**New in 0.4.0:** yes

**Steps:**
1. Call `create_log_stream` with `{ "label": "mcp-test-stream", "filters": { "severity": ["error"] }, "aggregation": { "interval": "1m" } }`
   - **Verify:** Response contains `id`, `label` equal to `"mcp-test-stream"`

### Test 18: List Log Streams
**Tools:** list_log_streams
**New in 0.4.0:** yes

**Steps:**
1. Call `list_log_streams` with `{}`
   - **Verify:** Response `data` array contains stream with label `"mcp-test-stream"`

### Test 19: Get Log Stream
**Tools:** get_log_stream
**New in 0.4.0:** yes

**Steps:**
1. Call `get_log_stream` with `{ "streamId": <id_from_test_17> }`
   - **Verify:** Response contains `id`, `label`, `filters`, `aggregation` fields

### Test 20: Update Log Stream
**Tools:** update_log_stream
**New in 0.4.0:** yes

**Steps:**
1. Call `update_log_stream` with `{ "streamId": <id_from_test_17>, "label": "mcp-test-stream-updated" }`
   - **Verify:** Response shows `label` is `"mcp-test-stream-updated"`

### Test 21: Get Log Stream History
**Tools:** get_log_stream_history
**New in 0.4.0:** yes

**Steps:**
1. Call `get_log_stream_history` with `{ "streamId": <id_from_test_17> }`
   - **Verify:** Response contains history data (may be empty for new stream)

### Test 22: Delete Log Stream
**Tools:** delete_log_stream
**New in 0.4.0:** yes

**Steps:**
1. Call `delete_log_stream` with `{ "streamId": <id_from_test_17> }`
   - **Verify:** Response confirms deletion (cleanup)

## Log Destination Lifecycle

### Test 23: Create Log Destination
**Tools:** create_log_destination
**New in 0.4.0:** yes

**Steps:**
1. Call `create_log_destination` with `{ "label": "mcp-test-dest", "type": "webhook", "config": { "url": "https://example.com/logs" } }`
   - **Verify:** Response contains `id`, `label` equal to `"mcp-test-dest"`, `type` equal to `"webhook"`

### Test 24: List Log Destinations
**Tools:** list_log_destinations
**New in 0.4.0:** yes

**Steps:**
1. Call `list_log_destinations` with `{}`
   - **Verify:** Response `data` array contains destination with label `"mcp-test-dest"`

### Test 25: Get Log Destination
**Tools:** get_log_destination
**New in 0.4.0:** yes

**Steps:**
1. Call `get_log_destination` with `{ "destinationId": <id_from_test_23> }`
   - **Verify:** Response contains `id`, `label`, `type`, `config` fields

### Test 26: Update Log Destination
**Tools:** update_log_destination
**New in 0.4.0:** yes

**Steps:**
1. Call `update_log_destination` with `{ "destinationId": <id_from_test_23>, "label": "mcp-test-dest-updated" }`
   - **Verify:** Response shows `label` is `"mcp-test-dest-updated"`

### Test 27: Get Log Destination History
**Tools:** get_log_destination_history
**New in 0.4.0:** yes

**Steps:**
1. Call `get_log_destination_history` with `{ "destinationId": <id_from_test_23> }`
   - **Verify:** Response contains history data (may be empty for new destination)

### Test 28: Delete Log Destination
**Tools:** delete_log_destination
**New in 0.4.0:** yes

**Steps:**
1. Call `delete_log_destination` with `{ "destinationId": <id_from_test_23> }`
   - **Verify:** Response confirms deletion (cleanup)

## Cleanup

### Test 29: Delete Notification Channel
**Tools:** delete_notification_channel
**New in 0.4.0:** yes

**Steps:**
1. Call `delete_notification_channel` with `{ "channelId": <id_from_test_6> }`
   - **Verify:** Response confirms deletion (final cleanup)
