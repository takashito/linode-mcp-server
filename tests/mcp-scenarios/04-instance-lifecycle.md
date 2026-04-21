# Test Scenario 04: Instance Lifecycle

**Category:** Linode Instances
**Cost:** ~$0.01
**Time:** ~5 minutes
**Prerequisites:** None

This scenario tests the full lifecycle of a Linode instance: create, inspect, update, power management, and delete.

---

### Test 1: Create instance
**Tools:** create_instance
**New in 0.4.0:** no

**Steps:**
1. Call `create_instance` with `{ "type": "g6-nanode-1", "region": "us-east", "image": "linode/debian12", "label": "mcp-test-instance", "root_pass": "T3stP@ssw0rd!Secure", "booted": true }`
   - **Verify:** Response has `id` (number), `label` equal to `"mcp-test-instance"`, `status` is one of `"provisioning"`, `"booting"`, or `"running"`, `region` is `"us-east"`, `type` is `"g6-nanode-1"`
   - **Save:** instance `id` as `INSTANCE_ID`

---

### Test 2: List instances
**Tools:** list_instances
**New in 0.4.0:** no

**Steps:**
1. Call `list_instances` with `{}`
   - **Verify:** Response contains an instance with `id` equal to `INSTANCE_ID` and `label` containing `"mcp-test-instance"`

---

### Test 3: Get instance
**Tools:** get_instance
**New in 0.4.0:** no

**Steps:**
1. Call `get_instance` with `{ "id": INSTANCE_ID }`
   - **Verify:** Response has `id`, `label`, `status`, `type`, `region`, `image`, `ipv4` array, `created` timestamp

---

### Test 4: Update instance
**Tools:** update_instance
**New in 0.4.0:** no

**Steps:**
1. Call `update_instance` with `{ "id": INSTANCE_ID, "label": "mcp-test-instance-updated" }`
   - **Verify:** Response has `label` equal to `"mcp-test-instance-updated"`

---

### Test 5: Get instance stats
**Tools:** get_instance_stats
**New in 0.4.0:** no

**Steps:**
1. Call `get_instance_stats` with `{ "id": INSTANCE_ID }`
   - **Verify:** Returns stats object (may fail if instance is still booting - retry after 30s if needed)

---

### Test 6: Get network transfer
**Tools:** get_network_transfer
**New in 0.4.0:** no

**Steps:**
1. Call `get_network_transfer` with `{ "id": INSTANCE_ID }`
   - **Verify:** Returns transfer info with `used`, `quota`, `billable` fields

---

### Test 7: List instance configs
**Tools:** list_instance_configs
**New in 0.4.0:** no

**Steps:**
1. Call `list_instance_configs` with `{ "linodeId": INSTANCE_ID }`
   - **Verify:** Returns array of configs, each has `id`, `label`
   - **Save:** first config `id` as `CONFIG_ID`

---

### Test 8: Get instance config
**Tools:** get_instance_config
**New in 0.4.0:** no

**Steps:**
1. Call `get_instance_config` with `{ "linodeId": INSTANCE_ID, "configId": CONFIG_ID }`
   - **Verify:** Response has `id`, `label`, `kernel`, `devices`

---

### Test 9: List instance disks
**Tools:** list_instance_disks
**New in 0.4.0:** no

**Steps:**
1. Call `list_instance_disks` with `{ "linodeId": INSTANCE_ID }`
   - **Verify:** Returns array of disks, each has `id`, `label`, `size`, `filesystem`

---

### Test 10: List backups
**Tools:** list_backups
**New in 0.4.0:** no

**Steps:**
1. Call `list_backups` with `{ "linodeId": INSTANCE_ID }`
   - **Verify:** Returns response structure with backup info (may have empty snapshots)

---

### Test 11: Get networking information
**Tools:** get_networking_information
**New in 0.4.0:** no

**Steps:**
1. Call `get_networking_information` with `{ "linodeId": INSTANCE_ID }`
   - **Verify:** Response has `ipv4` and `ipv6` objects with IP address info

---

### Test 12: List Linode firewalls
**Tools:** list_linode_firewalls
**New in 0.4.0:** no

**Steps:**
1. Call `list_linode_firewalls` with `{ "linodeId": INSTANCE_ID }`
   - **Verify:** Returns array (may be empty if no firewalls assigned)

---

### Test 13: List Linode interfaces
**Tools:** list_linode_interfaces
**New in 0.4.0:** yes

**Steps:**
1. Call `list_linode_interfaces` with `{ "linodeId": INSTANCE_ID }`
   - **Verify:** Returns response structure with interface information

---

### Test 14: Get Linode interface settings
**Tools:** get_linode_interface_settings
**New in 0.4.0:** yes

**Steps:**
1. Call `get_linode_interface_settings` with `{ "linodeId": INSTANCE_ID }`
   - **Verify:** Returns interface settings for the instance

---

### Test 15: Shutdown instance
**Tools:** shutdown_instance
**New in 0.4.0:** no

**Steps:**
1. Call `shutdown_instance` with `{ "id": INSTANCE_ID }`
   - **Verify:** Returns success response (instance begins shutting down)

---

### Test 16: Boot instance
**Tools:** boot_instance
**New in 0.4.0:** no

**Steps:**
1. Wait for instance to be in `"offline"` state (poll `get_instance` if needed)
2. Call `boot_instance` with `{ "id": INSTANCE_ID }`
   - **Verify:** Returns success response (instance begins booting)

---

### Test 17: Reboot instance
**Tools:** reboot_instance
**New in 0.4.0:** no

**Steps:**
1. Wait for instance to be in `"running"` state
2. Call `reboot_instance` with `{ "id": INSTANCE_ID }`
   - **Verify:** Returns success response

---

### Test 18: List instance volumes
**Tools:** list_instance_volumes
**New in 0.4.0:** no

**Steps:**
1. Call `list_instance_volumes` with `{ "linodeId": INSTANCE_ID }`
   - **Verify:** Returns array (empty since no volumes attached)

---

### Test 19: List instance NodeBalancers
**Tools:** list_instance_nodebalancers
**New in 0.4.0:** no

**Steps:**
1. Call `list_instance_nodebalancers` with `{ "linodeId": INSTANCE_ID }`
   - **Verify:** Returns array (empty since no NodeBalancers configured)

---

## Cleanup

### Delete instance
**Tools:** delete_instance

**Steps:**
1. Call `delete_instance` with `{ "id": INSTANCE_ID }`
   - **Verify:** Returns success response
2. Call `list_instances` with `{}`
   - **Verify:** Instance with `INSTANCE_ID` no longer appears
