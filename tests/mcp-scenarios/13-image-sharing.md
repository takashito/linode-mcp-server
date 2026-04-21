# Test Scenario 13: Image Sharing (All New)

All tools in this file are NEW in 0.4.0.
Note: requires a custom image. If none exist, create one from an instance disk first.

## Sharegroup Lifecycle

### Test 1: Create Image Sharegroup
**Tools:** create_image_sharegroup
**New in 0.4.0:** yes

**Steps:**
1. Call `create_image_sharegroup` with `{ "label": "mcp-test-sharegroup", "description": "Test sharegroup" }`
   - **Verify:** Response contains `id`, `label` equal to `"mcp-test-sharegroup"`, `description`

### Test 2: List Image Sharegroups
**Tools:** list_image_sharegroups
**New in 0.4.0:** yes

**Steps:**
1. Call `list_image_sharegroups` with `{}`
   - **Verify:** Response `data` array contains sharegroup with label `"mcp-test-sharegroup"`

### Test 3: Get Image Sharegroup
**Tools:** get_image_sharegroup
**New in 0.4.0:** yes

**Steps:**
1. Call `get_image_sharegroup` with `{ "sharegroupId": <id_from_test_1> }`
   - **Verify:** Response contains `id`, `label`, `description`, `created` fields

### Test 4: Update Image Sharegroup
**Tools:** update_image_sharegroup
**New in 0.4.0:** yes

**Steps:**
1. Call `update_image_sharegroup` with `{ "sharegroupId": <id_from_test_1>, "label": "mcp-test-sharegroup-updated" }`
   - **Verify:** Response shows `label` is `"mcp-test-sharegroup-updated"`

## Token Management

### Test 5: Create Sharegroup Token
**Tools:** create_sharegroup_token
**New in 0.4.0:** yes

**Steps:**
1. Call `create_sharegroup_token` with `{ "sharegroupId": <id_from_test_1> }`
   - **Verify:** Response contains token UUID

### Test 6: List Sharegroup Tokens
**Tools:** list_sharegroup_tokens
**New in 0.4.0:** yes

**Steps:**
1. Call `list_sharegroup_tokens` with `{ "sharegroupId": <id_from_test_1> }`
   - **Verify:** Response `data` array contains at least one token

### Test 7: Get Sharegroup Token
**Tools:** get_sharegroup_token
**New in 0.4.0:** yes

**Steps:**
1. Call `get_sharegroup_token` with `{ "tokenUuid": "<uuid_from_test_5>" }`
   - **Verify:** Response contains token details with UUID, created date

### Test 8: Get Token Sharegroup
**Tools:** get_token_sharegroup
**New in 0.4.0:** yes

**Steps:**
1. Call `get_token_sharegroup` with `{ "tokenUuid": "<uuid_from_test_5>" }`
   - **Verify:** Response contains sharegroup info matching `"mcp-test-sharegroup-updated"`

## Image & Member Operations (if a custom image exists)

### Test 9: Find Private Image
**Tools:** list_images
**New in 0.4.0:** no

**Steps:**
1. Call `list_images` with `{ "type": "manual" }` to find a private image
   - **Verify:** Response contains at least one image with `id`, `label`, `status` fields
   - **Note:** If no private images exist, skip tests 10-13

### Test 10: Add Sharegroup Images
**Tools:** add_sharegroup_images
**New in 0.4.0:** yes

**Steps:**
1. Call `add_sharegroup_images` with `{ "sharegroupId": <id_from_test_1>, "images": ["<imageId_from_test_9>"] }`
   - **Verify:** Response confirms image added to sharegroup

### Test 11: List Sharegroup Images
**Tools:** list_sharegroup_images
**New in 0.4.0:** yes

**Steps:**
1. Call `list_sharegroup_images` with `{ "sharegroupId": <id_from_test_1> }`
   - **Verify:** Response `data` array contains the added image

### Test 12: List Image Sharegroups by Image
**Tools:** list_image_sharegroups_by_image
**New in 0.4.0:** yes

**Steps:**
1. Call `list_image_sharegroups_by_image` with `{ "imageId": "<imageId_from_test_9>" }`
   - **Verify:** Response lists sharegroup `"mcp-test-sharegroup-updated"`

### Test 13: List Token Sharegroup Images
**Tools:** list_token_sharegroup_images
**New in 0.4.0:** yes

**Steps:**
1. Call `list_token_sharegroup_images` with `{ "tokenUuid": "<uuid_from_test_5>" }`
   - **Verify:** Response contains images associated with the sharegroup

## Member Operations

### Test 14: Add Sharegroup Members
**Tools:** add_sharegroup_members
**New in 0.4.0:** yes

**Steps:**
1. Call `add_sharegroup_members` with `{ "sharegroupId": <id_from_test_1>, "token": "<uuid_from_test_5>" }`
   - **Verify:** Response confirms member added

### Test 15: List Sharegroup Members
**Tools:** list_sharegroup_members
**New in 0.4.0:** yes

**Steps:**
1. Call `list_sharegroup_members` with `{ "sharegroupId": <id_from_test_1> }`
   - **Verify:** Response contains `data` array with member entries

## Cleanup

### Test 16: Remove Sharegroup Image
**Tools:** remove_sharegroup_image
**New in 0.4.0:** yes

**Steps:**
1. Call `remove_sharegroup_image` with `{ "sharegroupId": <id_from_test_1>, "imageId": "<imageId_from_test_9>" }`
   - **Verify:** Response confirms image removed from group

### Test 17: Delete Sharegroup Token
**Tools:** delete_sharegroup_token
**New in 0.4.0:** yes

**Steps:**
1. Call `delete_sharegroup_token` with `{ "sharegroupId": <id_from_test_1>, "tokenUuid": "<uuid_from_test_5>" }`
   - **Verify:** Response confirms token deleted

### Test 18: Delete Image Sharegroup
**Tools:** delete_image_sharegroup
**New in 0.4.0:** yes

**Steps:**
1. Call `delete_image_sharegroup` with `{ "sharegroupId": <id_from_test_1> }`
   - **Verify:** Response confirms sharegroup deleted
