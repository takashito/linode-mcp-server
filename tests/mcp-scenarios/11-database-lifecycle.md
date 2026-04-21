# Test Scenario 11: Database Lifecycle

Tests database engine listing, PostgreSQL instance provisioning, connection pools, and cleanup.

> **Note:** Database provisioning takes ~15 minutes. Plan for polling/wait between creation and active status.

### Test 1: List Database Engines
**Tools:** list_database_engines
**New in 0.4.0:** no

**Steps:**
1. Call `list_database_engines` with `{}`
   - **Verify:** Response data contains engines including `"mysql"` and `"postgresql"`

### Test 2: List Database Types
**Tools:** list_database_types
**New in 0.4.0:** no

**Steps:**
1. Call `list_database_types` with `{}`
   - **Verify:** Response data contains types with `price` information

### Test 3: Get MySQL Config
**Tools:** get_mysql_config
**New in 0.4.0:** yes

**Steps:**
1. Call `get_mysql_config` with `{}`
   - **Verify:** Response contains MySQL advanced configuration parameters

### Test 4: Get PostgreSQL Config
**Tools:** get_postgresql_config
**New in 0.4.0:** yes

**Steps:**
1. Call `get_postgresql_config` with `{}`
   - **Verify:** Response contains PostgreSQL advanced configuration parameters

### Test 5: Create PostgreSQL Instance
**Tools:** create_postgresql_instance
**New in 0.4.0:** no

**Steps:**
1. Call `create_postgresql_instance` with `{ "label": "mcp-test-pg", "region": "us-east", "type": "g6-nanode-1", "engine": "postgresql/16" }`
   - **Verify:** Response contains `id` (number) and `status` equals `"provisioning"`

### Test 6: Wait for Instance Active
**Tools:** get_postgresql_instance
**New in 0.4.0:** no

**Steps:**
1. Poll `get_postgresql_instance` with `{ "instanceId": <id from Test 5> }` every 60 seconds
   - **Verify:** `status` transitions to `"active"` (timeout after 20 minutes)

### Test 7: List PostgreSQL Instances
**Tools:** list_postgresql_instances
**New in 0.4.0:** no

**Steps:**
1. Call `list_postgresql_instances` with `{}`
   - **Verify:** Response data contains instance with `label` equals `"mcp-test-pg"`

### Test 8: Get PostgreSQL Instance
**Tools:** get_postgresql_instance
**New in 0.4.0:** no

**Steps:**
1. Call `get_postgresql_instance` with `{ "instanceId": <id> }`
   - **Verify:** Response contains `label` equals `"mcp-test-pg"`, `status` equals `"active"`, `region` equals `"us-east"`

### Test 9: Get PostgreSQL Credentials
**Tools:** get_postgresql_credentials
**New in 0.4.0:** no

**Steps:**
1. Call `get_postgresql_credentials` with `{ "instanceId": <id> }`
   - **Verify:** Response contains `username` and `password` fields (non-empty strings)

### Test 10: Get PostgreSQL SSL Certificate
**Tools:** get_postgresql_ssl_certificate
**New in 0.4.0:** no

**Steps:**
1. Call `get_postgresql_ssl_certificate` with `{ "instanceId": <id> }`
   - **Verify:** Response contains `ca_certificate` field (non-empty string starting with `"-----BEGIN CERTIFICATE-----"`)

### Test 11: Create PostgreSQL Connection Pool
**Tools:** create_postgresql_connection_pool
**New in 0.4.0:** yes

**Steps:**
1. Call `create_postgresql_connection_pool` with `{ "instanceId": <id>, "name": "mcp-test-pool", "database": "defaultdb", "user": "linroot", "mode": "transaction", "size": 5 }`
   - **Verify:** Response contains pool with `name` equals `"mcp-test-pool"`, `size` equals `5`

### Test 12: List PostgreSQL Connection Pools
**Tools:** list_postgresql_connection_pools
**New in 0.4.0:** yes

**Steps:**
1. Call `list_postgresql_connection_pools` with `{ "instanceId": <id> }`
   - **Verify:** Response data contains pool with `name` equals `"mcp-test-pool"`

### Test 13: Get PostgreSQL Connection Pool
**Tools:** get_postgresql_connection_pool
**New in 0.4.0:** yes

**Steps:**
1. Call `get_postgresql_connection_pool` with `{ "instanceId": <id>, "poolName": "mcp-test-pool" }`
   - **Verify:** Response contains `name` equals `"mcp-test-pool"`, `mode` equals `"transaction"`, `size` equals `5`

### Test 14: Update PostgreSQL Connection Pool
**Tools:** update_postgresql_connection_pool
**New in 0.4.0:** yes

**Steps:**
1. Call `update_postgresql_connection_pool` with `{ "instanceId": <id>, "poolName": "mcp-test-pool", "size": 10 }`
   - **Verify:** Response contains `size` equals `10`

### Test 15: Delete PostgreSQL Connection Pool
**Tools:** delete_postgresql_connection_pool
**New in 0.4.0:** yes

**Steps:**
1. Call `delete_postgresql_connection_pool` with `{ "instanceId": <id>, "poolName": "mcp-test-pool" }`
   - **Verify:** Response confirms deletion (empty response or success status)

### Test 16: Delete PostgreSQL Instance (Cleanup)
**Tools:** delete_postgresql_instance
**New in 0.4.0:** no

**Steps:**
1. Call `delete_postgresql_instance` with `{ "instanceId": <id> }`
   - **Verify:** Response confirms deletion (empty response or success status)
