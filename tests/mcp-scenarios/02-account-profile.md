# Test Scenario 02: Account, Profile & Security

**Category:** Account, Profile, IAM
**Cost:** Free
**Time:** ~5 min
**Prerequisites:** None

---

## Part A: Account & Settings

### Test 1: Get Account Info
**Tools:** get_account
**New in 0.4.0:** no

**Steps:**
1. Call `get_account` with `{}`
   - **Verify:** Response contains `email`, `company`, `first_name`, `last_name`, `balance` fields

### Test 2: Get Account Settings
**Tools:** get_account_settings
**New in 0.4.0:** no

**Steps:**
1. Call `get_account_settings` with `{}`
   - **Verify:** Response contains `managed`, `network_helper`, `longview_subscription` fields

### Test 3: Get Account Network Transfer
**Tools:** get_account_network_transfer
**New in 0.4.0:** no

**Steps:**
1. Call `get_account_network_transfer` with `{}`
   - **Verify:** Response contains `used`, `quota`, `billable` fields

### Test 4: List Events
**Tools:** list_events
**New in 0.4.0:** no

**Steps:**
1. Call `list_events` with `{ "page_size": 25 }`  <!-- Linode API requires page_size 25-500 -->
   - **Verify:** Response contains `data` array, `page`, `pages`, `results` pagination fields

### Test 5: List Invoices
**Tools:** list_invoices
**New in 0.4.0:** no

**Steps:**
1. Call `list_invoices` with `{}`
   - **Verify:** Response contains `data` array with invoice objects

### Test 6: List Notifications & Maintenances
**Tools:** list_notifications, list_maintenances
**New in 0.4.0:** no

**Steps:**
1. Call `list_notifications` with `{}`
   - **Verify:** Response is an array (may be empty)
2. Call `list_maintenances` with `{}`
   - **Verify:** Response contains `data` array with pagination

---

## Part B: Users & IAM

### Test 7: List and Get Users
**Tools:** list_users, get_user
**New in 0.4.0:** no

**Steps:**
1. Call `list_users` with `{}` → save first `username`
   - **Verify:** Response contains `data` array with `username`, `email`, `restricted`
2. Call `get_user` with `{ "username": "<username>" }`
   - **Verify:** Response contains `username`, `email`, `restricted`, `ssh_keys`

### Test 8: Get User Grants (deprecated)
**Tools:** get_user_grants
**New in 0.4.0:** no (deprecated)

**Steps:**
1. Call `get_user_grants` with `{ "username": "<username>" }`
   - **Verify:** Response contains grant categories or 204 for unrestricted users

### Test 9: List IAM Roles
**Tools:** list_iam_roles
**New in 0.4.0:** yes

**Steps:**
1. Call `list_iam_roles` with `{}`
   - **Verify:** Response contains roles with `name`, `description`, `permissions`

### Test 10: Get User Role Permissions
**Tools:** get_user_role_permissions
**New in 0.4.0:** yes

**Steps:**
1. Call `get_user_role_permissions` with `{ "username": "<username>" }`
   - **Verify:** Response contains roles array

### Test 11: List Entities
**Tools:** list_entities
**New in 0.4.0:** yes

**Steps:**
1. Call `list_entities` with `{}`
   - **Verify:** Response contains paginated entity list

### Test 12: Delegation
**Tools:** get_delegation_default_roles, list_delegation_child_accounts, list_delegation_profile_accounts
**New in 0.4.0:** yes
**Note:** Delegation endpoints return 404 on accounts without parent/child delegation provisioned. Skip or expect 404 on such accounts.

**Steps:**
1. Call `get_delegation_default_roles` with `{}`
   - **Verify:** Response contains default role configuration (or 404 if not provisioned)
2. Call `list_delegation_child_accounts` with `{}`
   - **Verify:** Response contains `data` array (may be empty, or 404 if not provisioned)
3. Call `list_delegation_profile_accounts` with `{}`
   - **Verify:** Response contains `data` array (may be empty, or 404 if not provisioned)

### Test 13: Resource Locks
**Tools:** list_resource_locks
**New in 0.4.0:** yes
**Note:** Endpoint is v4beta-only; client must target `/v4beta/locks`

**Steps:**
1. Call `list_resource_locks` with `{}`
   - **Verify:** Response contains `data` array with pagination structure

### Test 14: Maintenance Policies
**Tools:** list_maintenance_policies
**New in 0.4.0:** yes

**Steps:**
1. Call `list_maintenance_policies` with `{}`
   - **Verify:** Response contains maintenance policy data

---

## Part C: Profile

### Test 15: Get and Update Profile
**Tools:** get_profile, update_profile
**New in 0.4.0:** no

**Steps:**
1. Call `get_profile` with `{}` → save original `timezone`
   - **Verify:** Response contains `username`, `email`, `timezone`, `two_factor_auth`
2. Call `update_profile` with `{ "timezone": "America/New_York" }`
   - **Verify:** `timezone` is `"America/New_York"`
3. Call `update_profile` with `{ "timezone": "<original>" }` to restore
   - **Verify:** Timezone restored

### Test 16: User Preferences
**Tools:** get_user_preferences, update_user_preferences
**New in 0.4.0:** no

**Steps:**
1. Call `get_user_preferences` with `{}` → save original
   - **Verify:** Returns preferences object
2. Call `update_user_preferences` with `{ "theme": "dark" }`
   - **Verify:** Updated
3. Restore original preferences

---

## Part D: SSH Key Lifecycle

### Test 17: SSH Key CRUD
**Tools:** create_ssh_key, list_ssh_keys, get_ssh_key, update_ssh_key, delete_ssh_key
**New in 0.4.0:** no

**Steps:**
1. Call `create_ssh_key` with `{ "label": "mcp-test-key", "ssh_key": "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAITest mcp-test" }` → save `KEY_ID`
   - **Verify:** Response contains `id`, `label`
2. Call `list_ssh_keys` with `{}`
   - **Verify:** Key with label `mcp-test-key` appears
3. Call `get_ssh_key` with `{ "id": KEY_ID }`
   - **Verify:** Contains `id`, `label`, `ssh_key`, `created`
4. Call `update_ssh_key` with `{ "id": KEY_ID, "label": "mcp-test-key-updated" }`
   - **Verify:** Label changed
5. Call `delete_ssh_key` with `{ "id": KEY_ID }`
   - **Verify:** Deletion confirmed

---

## Part E: API Token Lifecycle

### Test 18: API Token CRUD
**Tools:** create_personal_access_token, list_api_tokens, get_api_token, update_api_token, delete_api_token
**New in 0.4.0:** no

**Steps:**
1. Call `create_personal_access_token` with `{ "label": "mcp-test-token", "scopes": ["linodes:read_only"] }` → save `TOKEN_ID`
   - **Verify:** Response contains `id`, `token`, `label`
2. Call `list_api_tokens` with `{}`
   - **Verify:** Token with label `mcp-test-token` appears
3. Call `get_api_token` with `{ "id": TOKEN_ID }`
   - **Verify:** Contains `id`, `label`, `scopes`
4. Call `update_api_token` with `{ "id": TOKEN_ID, "label": "mcp-test-token-updated" }`
   - **Verify:** Label changed
5. Call `delete_api_token` with `{ "id": TOKEN_ID }`
   - **Verify:** Deletion confirmed

---

## Part F: Security (read-only)

### Test 19: Security Features
**Tools:** list_authorized_apps, list_trusted_devices, list_grants, list_logins, get_security_questions, list_api_scopes
**New in 0.4.0:** no

**Steps:**
1. Call `list_authorized_apps` with `{}` → verify response structure
2. Call `list_trusted_devices` with `{}` → verify response structure
3. Call `list_grants` with `{}` → verify response (may return 204 for unrestricted)
4. Call `list_logins` with `{}` → verify contains `data` array with `datetime`, `ip`, `status`
5. Call `get_security_questions` with `{}` → verify returns questions
6. Call `list_api_scopes` with `{}` → verify returns scopes by category

---

## Cleanup
- SSH key and API token are deleted within their test steps
- Profile/preferences are restored to original values
- No other resources to clean up
