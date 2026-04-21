# Test Scenario 07: NodeBalancer Lifecycle

Tests NodeBalancer creation, config management, node management, firewall listing, and cleanup.

### Test 1: Create NodeBalancer
**Tools:** create_nodebalancer
**New in 0.4.0:** no

**Steps:**
1. Call `create_nodebalancer` with `{ "label": "mcp-test-nb", "region": "us-east" }`
   - **Verify:** Response contains `id` (number), `label` equals `"mcp-test-nb"`, `region` equals `"us-east"`

### Test 2: List NodeBalancers
**Tools:** list_nodebalancers
**New in 0.4.0:** no

**Steps:**
1. Call `list_nodebalancers` with `{}`
   - **Verify:** Response data contains NodeBalancer with `label` equals `"mcp-test-nb"`

### Test 3: Get NodeBalancer
**Tools:** get_nodebalancer
**New in 0.4.0:** no

**Steps:**
1. Call `get_nodebalancer` with `{ "id": <id from Test 1> }`
   - **Verify:** Response contains `label` equals `"mcp-test-nb"`, `region` equals `"us-east"`, `ipv4` field present

### Test 4: Add NodeBalancer Config
**Tools:** add_nodebalancer_config
**New in 0.4.0:** no

**Steps:**
1. Call `add_nodebalancer_config` with `{ "nodeBalancerId": <id>, "port": 80, "protocol": "http", "algorithm": "roundrobin" }`
   - **Verify:** Response contains `id` (configId), `port` equals `80`, `protocol` equals `"http"`, `algorithm` equals `"roundrobin"`

### Test 5: List NodeBalancer Configs
**Tools:** get_nodebalancer
**New in 0.4.0:** no

**Steps:**
1. Call `get_nodebalancer` with `{ "id": <id> }`
   - **Verify:** Response includes config information or use config list endpoint to verify config with `port` 80 exists

### Test 6: Add NodeBalancer Node
**Tools:** add_nodebalancer_node
**New in 0.4.0:** no

**Steps:**
1. Call `add_nodebalancer_node` with `{ "nodeBalancerId": <id>, "configId": <configId from Test 4>, "label": "mcp-test-node", "address": "192.168.1.1:80" }`
   - **Verify:** Response contains `id` (nodeId), `label` equals `"mcp-test-node"`, `address` equals `"192.168.1.1:80"`

### Test 7: List NodeBalancer Firewalls
**Tools:** list_nodebalancer_firewalls
**New in 0.4.0:** yes

**Steps:**
1. Call `list_nodebalancer_firewalls` with `{ "nodeBalancerId": <id> }`
   - **Verify:** Response contains `data` array (may be empty if no firewalls attached)

### Test 8: Remove NodeBalancer Node (Cleanup)
**Tools:** remove_nodebalancer_node
**New in 0.4.0:** no

**Steps:**
1. Call `remove_nodebalancer_node` with `{ "nodeBalancerId": <id>, "configId": <configId>, "nodeId": <nodeId from Test 6> }`
   - **Verify:** Response confirms deletion (empty response or success status)

### Test 9: Remove NodeBalancer Config (Cleanup)
**Tools:** remove_nodebalancer_config
**New in 0.4.0:** no

**Steps:**
1. Call `remove_nodebalancer_config` with `{ "nodeBalancerId": <id>, "configId": <configId> }`
   - **Verify:** Response confirms deletion (empty response or success status)

### Test 10: Delete NodeBalancer (Cleanup)
**Tools:** delete_nodebalancer
**New in 0.4.0:** no

**Steps:**
1. Call `delete_nodebalancer` with `{ "id": <id> }`
   - **Verify:** Response confirms deletion (empty response or success status)
