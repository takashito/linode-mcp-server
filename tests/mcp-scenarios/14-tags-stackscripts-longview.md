# Test Scenario 14: Tags, StackScripts, Longview & Support

## Tag Lifecycle

### Test 1: Create Tag
**Tools:** create_tag
**New in 0.4.0:** no

**Steps:**
1. Call `create_tag` with `{ "label": "mcp-test-tag" }`
   - **Verify:** Response contains `label` equal to `"mcp-test-tag"`

### Test 2: List Tags
**Tools:** list_tags
**New in 0.4.0:** no

**Steps:**
1. Call `list_tags` with `{}`
   - **Verify:** Response `data` array contains a tag with label `"mcp-test-tag"`

### Test 3: Get Tag
**Tools:** get_tag
**New in 0.4.0:** no

**Steps:**
1. Call `get_tag` with `{ "label": "mcp-test-tag" }`
   - **Verify:** Response contains tag details with `label` field

### Test 4: Delete Tag
**Tools:** delete_tag
**New in 0.4.0:** no

**Steps:**
1. Call `delete_tag` with `{ "label": "mcp-test-tag" }`
   - **Verify:** Response confirms deletion (empty response or 200 status)

## StackScript Lifecycle

### Test 5: Create StackScript
**Tools:** create_stackscript
**New in 0.4.0:** no

**Steps:**
1. Call `create_stackscript` with `{ "label": "mcp-test-script", "images": ["linode/debian12"], "script": "#!/bin/bash\necho 'MCP Test'" }`
   - **Verify:** Response contains `id`, `label` equal to `"mcp-test-script"`, `images` array

### Test 6: List StackScripts
**Tools:** list_stackscripts
**New in 0.4.0:** no

**Steps:**
1. Call `list_stackscripts` with `{ "is_public": false }`
   - **Verify:** Response `data` array contains script with label `"mcp-test-script"`

### Test 7: Get StackScript
**Tools:** get_stackscript
**New in 0.4.0:** no

**Steps:**
1. Call `get_stackscript` with `{ "id": <id_from_test_5> }`
   - **Verify:** Response contains `id`, `label`, `script`, `images`, `created` fields

### Test 8: Update StackScript
**Tools:** update_stackscript
**New in 0.4.0:** no

**Steps:**
1. Call `update_stackscript` with `{ "id": <id_from_test_5>, "label": "mcp-test-script-updated" }`
   - **Verify:** Response shows `label` is `"mcp-test-script-updated"`

### Test 9: Delete StackScript
**Tools:** delete_stackscript
**New in 0.4.0:** no

**Steps:**
1. Call `delete_stackscript` with `{ "id": <id_from_test_5> }`
   - **Verify:** Response confirms deletion (cleanup)

## Support (read-only)

### Test 10: List Tickets
**Tools:** list_tickets
**New in 0.4.0:** no

**Steps:**
1. Call `list_tickets` with `{}`
   - **Verify:** Response contains `data` array with proper pagination structure (may be empty)

## Longview Lifecycle

### Test 11: Create Longview Client
**Tools:** create_longview_client
**New in 0.4.0:** no

**Steps:**
1. Call `create_longview_client` with `{ "label": "mcp-test-longview" }`
   - **Verify:** Response contains `id`, `label` equal to `"mcp-test-longview"`, `api_key`

### Test 12: List Longview Clients
**Tools:** list_longview_clients
**New in 0.4.0:** no

**Steps:**
1. Call `list_longview_clients` with `{}`
   - **Verify:** Response `data` array contains client with label `"mcp-test-longview"`

### Test 13: Get Longview Client
**Tools:** get_longview_client
**New in 0.4.0:** no

**Steps:**
1. Call `get_longview_client` with `{ "id": <id_from_test_11> }`
   - **Verify:** Response contains `id`, `label`, `api_key`, `created` fields

### Test 14: Update Longview Client
**Tools:** update_longview_client
**New in 0.4.0:** no

**Steps:**
1. Call `update_longview_client` with `{ "id": <id_from_test_11>, "label": "mcp-test-longview-updated" }`
   - **Verify:** Response shows `label` is `"mcp-test-longview-updated"`

### Test 15: Get Longview Plan
**Tools:** get_longview_plan
**New in 0.4.0:** yes

**Steps:**
1. Call `get_longview_plan` with `{}`
   - **Verify:** Response contains plan info with `id`, `label`, `clients_included` fields

### Test 16: Delete Longview Client
**Tools:** delete_longview_client
**New in 0.4.0:** no

**Steps:**
1. Call `delete_longview_client` with `{ "id": <id_from_test_11> }`
   - **Verify:** Response confirms deletion (cleanup)

## Placement Groups (read-only)

### Test 17: List Placement Groups
**Tools:** list_placement_groups
**New in 0.4.0:** no

**Steps:**
1. Call `list_placement_groups` with `{}`
   - **Verify:** Response contains `data` array with proper pagination structure (may be empty)
