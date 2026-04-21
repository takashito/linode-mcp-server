# Test Scenario 01: Regions, Types, and Static Data

**Category:** Static data (read-only)
**Cost:** Free
**Time:** ~2 minutes
**Prerequisites:** None

This scenario verifies all read-only endpoints that return static or semi-static data. No resources are created or modified.

---

### Test 1: List regions
**Tools:** list_regions
**New in 0.4.0:** no

**Steps:**
1. Call `list_regions` with `{}`
   - **Verify:** Returns an array of regions, each has `id`, `label`, `status` fields

---

### Test 2: Get specific region
**Tools:** get_region
**New in 0.4.0:** no

**Steps:**
1. Call `get_region` with `{ "id": "us-east" }`
   - **Verify:** Response has `id` equal to `"us-east"`, has `label`, `country`, `capabilities` array

---

### Test 3: List instance types
**Tools:** list_instance_types
**New in 0.4.0:** no

**Steps:**
1. Call `list_instance_types` with `{}`
   - **Verify:** Returns array of types, each has `id`, `label`, `price` with `hourly` and `monthly` fields

---

### Test 4: Get specific instance type
**Tools:** get_instance_type
**New in 0.4.0:** no

**Steps:**
1. Call `get_instance_type` with `{ "id": "g6-nanode-1" }`
   - **Verify:** Response has `id` equal to `"g6-nanode-1"`, has `label`, `price` object with `hourly` and `monthly`

---

### Test 5: List kernels
**Tools:** list_kernels
**New in 0.4.0:** no

**Steps:**
1. Call `list_kernels` with `{}`
   - **Verify:** Returns array of kernels, each has `id`, `label` fields

---

### Test 6: Get specific kernel
**Tools:** get_kernel
**New in 0.4.0:** no

**Steps:**
1. Call `get_kernel` with `{ "id": "linode/latest-64bit" }`
   - **Verify:** Response has `id` equal to `"linode/latest-64bit"`, has `label`

---

### Test 7: List Kubernetes versions
**Tools:** list_kubernetes_versions
**New in 0.4.0:** no

**Steps:**
1. Call `list_kubernetes_versions` with `{}`
   - **Verify:** Returns array of versions, each has `id` field

---

### Test 8: Get Kubernetes version
**Tools:** get_kubernetes_version
**New in 0.4.0:** no

**Steps:**
1. Call `list_kubernetes_versions` with `{}` to get the first version id
2. Call `get_kubernetes_version` with `{ "version": "<first_version_id>" }`
   - **Verify:** Response has `id` matching the requested version

---

### Test 9: List Kubernetes types
**Tools:** list_kubernetes_types
**New in 0.4.0:** no

**Steps:**
1. Call `list_kubernetes_types` with `{}`
   - **Verify:** Returns array with pricing information

---

### Test 10: List Kubernetes tier versions
**Tools:** list_kubernetes_tier_versions
**New in 0.4.0:** yes
**Note:** Endpoint is v4beta-only; client must target `/v4beta/lke/tiers/...`

**Steps:**
1. Call `list_kubernetes_tier_versions` with `{ "tier": "standard" }`
   - **Verify:** Returns array of versions for the standard tier

---

### Test 11: List network transfer prices
**Tools:** list_network_transfer_prices
**New in 0.4.0:** yes

**Steps:**
1. Call `list_network_transfer_prices` with `{}`
   - **Verify:** Returns pricing data with transfer cost information

---

### Test 12: List Longview types
**Tools:** list_longview_types
**New in 0.4.0:** yes

**Steps:**
1. Call `list_longview_types` with `{}`
   - **Verify:** Returns array of Longview types

---

### Test 13: List Longview subscriptions
**Tools:** list_longview_subscriptions
**New in 0.4.0:** no

**Steps:**
1. Call `list_longview_subscriptions` with `{}`
   - **Verify:** Returns array of subscription plans

---

### Test 14: List firewall templates
**Tools:** list_firewall_templates
**New in 0.4.0:** yes

**Steps:**
1. Call `list_firewall_templates` with `{}`
   - **Verify:** Returns array of templates, each has a slug identifier

---

### Test 15: Get firewall template
**Tools:** get_firewall_template
**New in 0.4.0:** yes

**Steps:**
1. Call `list_firewall_templates` with `{}` to get the first template slug
2. Call `get_firewall_template` with `{ "slug": "<first_template_slug>" }`
   - **Verify:** Response has slug matching the requested template, includes rules

---

### Test 16: List Object Storage endpoints
**Tools:** list_object_storage_endpoints
**New in 0.4.0:** no

**Steps:**
1. Call `list_object_storage_endpoints` with `{}`
   - **Verify:** Returns array of endpoints with region information

---

### Test 17: List Object Storage quotas
**Tools:** list_object_storage_quotas
**New in 0.4.0:** yes

**Steps:**
1. Call `list_object_storage_quotas` with `{}`
   - **Verify:** Returns quota information

---

### Test 18: List monitor services
**Tools:** list_monitor_services
**New in 0.4.0:** yes

**Steps:**
1. Call `list_monitor_services` with `{}`
   - **Verify:** Returns array of service types

---

### Test 19: Get monitor service
**Tools:** get_monitor_service, list_monitor_services
**New in 0.4.0:** yes

**Steps:**
1. Call `list_monitor_services` with `{}` to get first service type
2. Call `get_monitor_service` with `{ "serviceType": "<first_service_type>" }`
   - **Verify:** Response has details about the service type

---

### Test 20: List service metric definitions
**Tools:** list_service_metric_definitions, list_monitor_services
**New in 0.4.0:** yes

**Steps:**
1. Call `list_monitor_services` with `{}` to get first service type
2. Call `list_service_metric_definitions` with `{ "serviceType": "<first_service_type>" }`
   - **Verify:** Returns array of metric definitions

---

### Test 21: List monitor dashboards
**Tools:** list_monitor_dashboards
**New in 0.4.0:** yes

**Steps:**
1. Call `list_monitor_dashboards` with `{}`
   - **Verify:** Returns response structure (may be empty array or paginated result)

---

### Test 22: List IAM roles
**Tools:** list_iam_roles
**New in 0.4.0:** yes

**Steps:**
1. Call `list_iam_roles` with `{}`
   - **Verify:** Returns array of roles with names and permissions

---

### Test 23: List maintenance policies
**Tools:** list_maintenance_policies
**New in 0.4.0:** yes

**Steps:**
1. Call `list_maintenance_policies` with `{}`
   - **Verify:** Returns response structure with policy information

---

### Test 24: Get profile
**Tools:** get_profile
**New in 0.4.0:** no

**Steps:**
1. Call `get_profile` with `{}`
   - **Verify:** Response has `username`, `email` fields

---

### Test 25: List API scopes
**Tools:** list_api_scopes
**New in 0.4.0:** no

**Steps:**
1. Call `list_api_scopes` with `{}`
   - **Verify:** Returns scope categories

---

### Test 26: Get account
**Tools:** get_account
**New in 0.4.0:** no

**Steps:**
1. Call `get_account` with `{}`
   - **Verify:** Response has account information (company, email, etc.)

---

### Test 27: Get account settings
**Tools:** get_account_settings
**New in 0.4.0:** no

**Steps:**
1. Call `get_account_settings` with `{}`
   - **Verify:** Returns settings object

---

### Test 28: List notifications
**Tools:** list_notifications
**New in 0.4.0:** no

**Steps:**
1. Call `list_notifications` with `{}`
   - **Verify:** Returns array (may be empty)

---

### Test 29: List events
**Tools:** list_events
**New in 0.4.0:** no

**Steps:**
1. Call `list_events` with `{}`
   - **Verify:** Returns paginated response structure with `data` array

---

### Test 30: Get firewall settings
**Tools:** get_firewall_settings
**New in 0.4.0:** yes

**Steps:**
1. Call `get_firewall_settings` with `{}`
   - **Verify:** Returns default firewall settings
