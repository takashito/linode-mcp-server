# Test Scenario 05: Firewall & Networking

**Category:** Networking
**Cost:** Free+
**Time:** ~3 minutes
**Prerequisites:** None (creates its own instance)

This scenario tests firewall creation, rule management, device attachment, and network information retrieval.

---

## Setup

### Create test instance
**Tools:** create_instance

**Steps:**
1. Call `create_instance` with `{ "type": "g6-nanode-1", "region": "us-east", "image": "linode/debian12", "label": "mcp-test-fw-instance", "root_pass": "T3stP@ssw0rd!Secure", "booted": true }`
   - **Save:** instance `id` as `INSTANCE_ID`

---

### Test 1: Create firewall
**Tools:** create_firewall
**New in 0.4.0:** no

**Steps:**
1. Call `create_firewall` with `{ "label": "mcp-test-firewall", "rules": { "inbound": [{ "action": "ACCEPT", "protocol": "TCP", "ports": "22", "addresses": { "ipv4": ["0.0.0.0/0"] } }], "inbound_policy": "DROP", "outbound_policy": "ACCEPT" } }`
   - **Verify:** Response has `id`, `label` equal to `"mcp-test-firewall"`, `status` is `"enabled"`
   - **Save:** firewall `id` as `FIREWALL_ID`

---

### Test 2: List firewalls
**Tools:** list_firewalls
**New in 0.4.0:** no

**Steps:**
1. Call `list_firewalls` with `{}`
   - **Verify:** Response contains a firewall with `id` equal to `FIREWALL_ID`

---

### Test 3: Get firewall
**Tools:** get_firewall
**New in 0.4.0:** no

**Steps:**
1. Call `get_firewall` with `{ "id": FIREWALL_ID }`
   - **Verify:** Response has `id`, `label`, `status`, `rules`

---

### Test 4: List firewall rules
**Tools:** list_firewall_rules
**New in 0.4.0:** no

**Steps:**
1. Call `list_firewall_rules` with `{ "firewallId": FIREWALL_ID }`
   - **Verify:** Response has `inbound` array with one rule for port 22, `inbound_policy` is `"DROP"`, `outbound_policy` is `"ACCEPT"`

---

### Test 5: Update firewall rules
**Tools:** update_firewall_rules
**New in 0.4.0:** no

**Steps:**
1. Call `update_firewall_rules` with `{ "firewallId": FIREWALL_ID, "inbound": [{ "action": "ACCEPT", "protocol": "TCP", "ports": "22", "addresses": { "ipv4": ["0.0.0.0/0"] } }, { "action": "ACCEPT", "protocol": "TCP", "ports": "443", "addresses": { "ipv4": ["0.0.0.0/0"] } }], "inbound_policy": "DROP", "outbound_policy": "ACCEPT" }`
   - **Verify:** Response has `inbound` array with two rules (port 22 and port 443)

---

### Test 6: Create firewall device
**Tools:** create_firewall_device
**New in 0.4.0:** no

**Steps:**
1. Call `create_firewall_device` with `{ "firewallId": FIREWALL_ID, "id": INSTANCE_ID, "type": "linode" }`
   - **Verify:** Response has `id`, `entity` with `id` matching `INSTANCE_ID`
   - **Save:** device `id` as `DEVICE_ID`

---

### Test 7: List firewall devices
**Tools:** list_firewall_devices
**New in 0.4.0:** no

**Steps:**
1. Call `list_firewall_devices` with `{ "firewallId": FIREWALL_ID }`
   - **Verify:** Response contains a device with `id` equal to `DEVICE_ID`

---

### Test 8: Get firewall device
**Tools:** get_firewall_device
**New in 0.4.0:** yes

**Steps:**
1. Call `get_firewall_device` with `{ "firewallId": FIREWALL_ID, "deviceId": DEVICE_ID }`
   - **Verify:** Response has `id` equal to `DEVICE_ID`, `entity` with type `"linode"`

---

### Test 9: List firewall history
**Tools:** list_firewall_history
**New in 0.4.0:** yes

**Steps:**
1. Call `list_firewall_history` with `{ "firewallId": FIREWALL_ID }`
   - **Verify:** Returns response structure with history entries (may be empty initially)

---

### Test 10: List firewall templates
**Tools:** list_firewall_templates
**New in 0.4.0:** yes

**Steps:**
1. Call `list_firewall_templates` with `{}`
   - **Verify:** Returns array of templates with slug identifiers

---

### Test 11: Get firewall settings
**Tools:** get_firewall_settings
**New in 0.4.0:** yes

**Steps:**
1. Call `get_firewall_settings` with `{}`
   - **Verify:** Returns default firewall settings for the account

---

### Test 12: List IP addresses
**Tools:** list_ip_addresses
**New in 0.4.0:** no

**Steps:**
1. Call `list_ip_addresses` with `{}`
   - **Verify:** Returns array of IP addresses, each has `address`, `type`, `linode_id`

---

### Test 13: Delete firewall device
**Tools:** delete_firewall_device
**New in 0.4.0:** no

**Steps:**
1. Call `delete_firewall_device` with `{ "firewallId": FIREWALL_ID, "deviceId": DEVICE_ID }`
   - **Verify:** Returns success response

---

### Test 14: Delete firewall
**Tools:** delete_firewall
**New in 0.4.0:** no

**Steps:**
1. Call `delete_firewall` with `{ "id": FIREWALL_ID }`
   - **Verify:** Returns success response

---

## Cleanup

### Delete test instance
**Tools:** delete_instance

**Steps:**
1. Call `delete_instance` with `{ "id": INSTANCE_ID }`
   - **Verify:** Returns success response
