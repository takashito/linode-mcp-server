# Test Scenario 09: Object Storage Lifecycle

Tests object storage keys, buckets, objects, ACLs, and cleanup.

### Test 1: List Object Storage Endpoints
**Tools:** list_object_storage_endpoints
**New in 0.4.0:** no

**Steps:**
1. Call `list_object_storage_endpoints` with `{}`
   - **Verify:** Response contains endpoints array with region and endpoint URL information

### Test 2: Create Object Storage Key
**Tools:** create_object_storage_key
**New in 0.4.0:** no

**Steps:**
1. Call `create_object_storage_key` with `{ "label": "mcp-test-key" }`
   - **Verify:** Response contains `id`, `label` equals `"mcp-test-key"`, `access_key` (non-empty), `secret_key` (non-empty)

### Test 3: List Object Storage Keys
**Tools:** list_object_storage_keys
**New in 0.4.0:** no

**Steps:**
1. Call `list_object_storage_keys` with `{}`
   - **Verify:** Response data contains key with `label` equals `"mcp-test-key"`

### Test 4: Get Object Storage Key
**Tools:** get_object_storage_key
**New in 0.4.0:** no

**Steps:**
1. Call `get_object_storage_key` with `{ "id": <id from Test 2> }`
   - **Verify:** Response contains `label` equals `"mcp-test-key"`, `access_key` field present

### Test 5: Create Object Storage Bucket
**Tools:** create_object_storage_bucket
**New in 0.4.0:** no

**Steps:**
1. Call `create_object_storage_bucket` with `{ "label": "mcp-test-bucket", "region": "us-east" }`
   - **Verify:** Response contains `label` equals `"mcp-test-bucket"`, `region` equals `"us-east"`

### Test 6: List Object Storage Buckets
**Tools:** list_object_storage_buckets
**New in 0.4.0:** no

**Steps:**
1. Call `list_object_storage_buckets` with `{}`
   - **Verify:** Response data contains bucket with `label` equals `"mcp-test-bucket"`

### Test 7: List Object Storage Buckets in Region
**Tools:** list_object_storage_buckets_in_region
**New in 0.4.0:** yes

**Steps:**
1. Call `list_object_storage_buckets_in_region` with `{ "regionId": "us-east" }`
   - **Verify:** Response data contains bucket with `label` equals `"mcp-test-bucket"`

### Test 8: Get Object Storage Bucket
**Tools:** get_object_storage_bucket
**New in 0.4.0:** no

**Steps:**
1. Call `get_object_storage_bucket` with `{ "region": "us-east", "label": "mcp-test-bucket" }`
   - **Verify:** Response contains `label` equals `"mcp-test-bucket"`, `region` equals `"us-east"`, `created` field present

### Test 9: Get Object Storage Bucket Access
**Tools:** get_object_storage_bucket_access
**New in 0.4.0:** no

**Steps:**
1. Call `get_object_storage_bucket_access` with `{ "region": "us-east", "bucket": "mcp-test-bucket" }`
   - **Verify:** Response contains ACL information (e.g., `acl` field)

### Test 10: Update Object Storage Bucket Access
**Tools:** update_object_storage_bucket_access
**New in 0.4.0:** yes

**Steps:**
1. Call `update_object_storage_bucket_access` with `{ "regionId": "us-east", "bucket": "mcp-test-bucket", "acl": "public-read" }`
   - **Verify:** Response confirms update or returns updated ACL with `acl` equals `"public-read"`

### Test 11: Upload Object
**Tools:** upload_object
**New in 0.4.0:** no

**Steps:**
1. Call `upload_object` with `{ "region": "us-east", "bucket": "mcp-test-bucket", "object_path": "test.txt", "source": "Hello MCP Test" }`
   - **Verify:** Response confirms successful upload

### Test 12: List Object Storage Objects
**Tools:** list_object_storage_objects
**New in 0.4.0:** no

**Steps:**
1. Call `list_object_storage_objects` with `{ "region": "us-east", "bucket": "mcp-test-bucket" }`
   - **Verify:** Response data contains object with name `"test.txt"`

### Test 13: Get Object ACL
**Tools:** get_object_acl
**New in 0.4.0:** yes

**Steps:**
1. Call `get_object_acl` with `{ "regionId": "us-east", "bucket": "mcp-test-bucket", "name": "test.txt" }`
   - **Verify:** Response contains ACL information for the object

### Test 14: Generate Object URL
**Tools:** generate_object_url
**New in 0.4.0:** no

**Steps:**
1. Call `generate_object_url` with `{ "region": "us-east", "bucket": "mcp-test-bucket", "name": "test.txt", "method": "GET" }`
   - **Verify:** Response contains a valid URL string (starts with `"https://"`)

### Test 15: Delete Object
**Tools:** delete_object
**New in 0.4.0:** no

**Steps:**
1. Call `delete_object` with `{ "region": "us-east", "bucket": "mcp-test-bucket", "object_path": "test.txt" }`
   - **Verify:** Response confirms deletion

### Test 16: List Object Storage Quotas
**Tools:** list_object_storage_quotas
**New in 0.4.0:** yes

**Steps:**
1. Call `list_object_storage_quotas` with `{}`
   - **Verify:** Response contains quota information

### Test 17: Get Object Storage Transfer
**Tools:** get_object_storage_transfer
**New in 0.4.0:** no

**Steps:**
1. Call `get_object_storage_transfer` with `{}`
   - **Verify:** Response contains transfer usage statistics

### Test 18: List Object Storage Types
**Tools:** list_object_storage_types
**New in 0.4.0:** no

**Steps:**
1. Call `list_object_storage_types` with `{}`
   - **Verify:** Response contains storage type definitions

### Test 19: Delete Object Storage Bucket (Cleanup)
**Tools:** delete_object_storage_bucket
**New in 0.4.0:** no

**Steps:**
1. Call `delete_object_storage_bucket` with `{ "region": "us-east", "label": "mcp-test-bucket" }`
   - **Verify:** Response confirms deletion

### Test 20: Delete Object Storage Key (Cleanup)
**Tools:** delete_object_storage_key
**New in 0.4.0:** no

**Steps:**
1. Call `delete_object_storage_key` with `{ "id": <id from Test 2> }`
   - **Verify:** Response confirms deletion
