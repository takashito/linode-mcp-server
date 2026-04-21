# Test Scenario 06: Volume Lifecycle

**Category:** Volumes
**Cost:** ~$0.01
**Time:** ~3 minutes
**Prerequisites:** None (creates its own instance for attach/detach)

This scenario tests the full lifecycle of a Block Storage volume: create, list, resize, attach, detach, and delete.

---

### Test 1: Create volume
**Tools:** create_volume
**New in 0.4.0:** no

**Steps:**
1. Call `create_volume` with `{ "label": "mcp-test-volume", "size": 10, "region": "us-east" }`
   - **Verify:** Response has `id`, `label` equal to `"mcp-test-volume"`, `size` equal to `10`, `region` is `"us-east"`, `status` is `"creating"` or `"active"`
   - **Save:** volume `id` as `VOLUME_ID`

---

### Test 2: List volumes
**Tools:** list_volumes
**New in 0.4.0:** no

**Steps:**
1. Call `list_volumes` with `{}`
   - **Verify:** Response contains a volume with `id` equal to `VOLUME_ID`

---

### Test 3: Get volume
**Tools:** get_volume
**New in 0.4.0:** no

**Steps:**
1. Call `get_volume` with `{ "id": VOLUME_ID }`
   - **Verify:** Response has `id`, `label`, `size`, `region`, `status`, `linode_id` (null when unattached)

---

### Test 4: Resize volume
**Tools:** resize_volume
**New in 0.4.0:** no

**Steps:**
1. Call `resize_volume` with `{ "id": VOLUME_ID, "size": 20 }`
   - **Verify:** Returns success response
2. Call `get_volume` with `{ "id": VOLUME_ID }`
   - **Verify:** `size` is `20`

---

### Test 5: Create instance for attach test
**Tools:** create_instance
**New in 0.4.0:** no

**Steps:**
1. Call `create_instance` with `{ "type": "g6-nanode-1", "region": "us-east", "image": "linode/debian12", "label": "mcp-test-vol-instance", "root_pass": "T3stP@ssw0rd!Secure", "booted": true }`
   - **Verify:** Response has `id`, `region` is `"us-east"`
   - **Save:** instance `id` as `INSTANCE_ID`

---

### Test 6: Attach volume
**Tools:** attach_volume
**New in 0.4.0:** no

**Steps:**
1. Wait for volume status to be `"active"` (poll `get_volume` if needed)
2. Call `attach_volume` with `{ "id": VOLUME_ID, "linode_id": INSTANCE_ID }`
   - **Verify:** Returns success response
3. Call `get_volume` with `{ "id": VOLUME_ID }`
   - **Verify:** `linode_id` equals `INSTANCE_ID`

---

### Test 7: Detach volume
**Tools:** detach_volume
**New in 0.4.0:** no

**Steps:**
1. Call `detach_volume` with `{ "id": VOLUME_ID }`
   - **Verify:** Returns success response
2. Wait briefly, then call `get_volume` with `{ "id": VOLUME_ID }`
   - **Verify:** `linode_id` is null

---

### Test 8: Delete volume
**Tools:** delete_volume
**New in 0.4.0:** no

**Steps:**
1. Wait for volume status to be `"active"` (not `"detaching"`)
2. Call `delete_volume` with `{ "id": VOLUME_ID }`
   - **Verify:** Returns success response
3. Call `list_volumes` with `{}`
   - **Verify:** Volume with `VOLUME_ID` no longer appears

---

## Cleanup

### Delete test instance
**Tools:** delete_instance

**Steps:**
1. Call `delete_instance` with `{ "id": INSTANCE_ID }`
   - **Verify:** Returns success response
