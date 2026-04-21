# Test Scenario 03: VPC Lifecycle

Tests VPC creation, subnet management, IP listing, and cleanup.

### Test 1: Create VPC
**Tools:** create_vpc
**New in 0.4.0:** no

**Steps:**
1. Call `create_vpc` with `{ "label": "mcp-test-vpc", "region": "us-iad", "description": "MCP test VPC" }`
   - **Verify:** Response contains `id` (number), `label` equals `"mcp-test-vpc"`, `region` equals `"us-iad"`

### Test 2: List VPCs
**Tools:** list_vpcs
**New in 0.4.0:** no

**Steps:**
1. Call `list_vpcs` with `{}`
   - **Verify:** Response data contains VPC with `label` equals `"mcp-test-vpc"`

### Test 3: Get VPC
**Tools:** get_vpc
**New in 0.4.0:** no

**Steps:**
1. Call `get_vpc` with `{ "id": <id from Test 1> }`
   - **Verify:** Response contains `label` equals `"mcp-test-vpc"`, `description` equals `"MCP test VPC"`, `region` equals `"us-iad"`

### Test 4: Update VPC
**Tools:** update_vpc
**New in 0.4.0:** no

**Steps:**
1. Call `update_vpc` with `{ "id": <id from Test 1>, "description": "Updated MCP test VPC" }`
   - **Verify:** Response contains `description` equals `"Updated MCP test VPC"`

### Test 5: Create VPC Subnet
**Tools:** create_vpc_subnet
**New in 0.4.0:** no

**Steps:**
1. Call `create_vpc_subnet` with `{ "id": <id>, "label": "mcp-test-subnet", "ipv4": "10.0.1.0/24" }`
   - **Verify:** Response contains `id` (number), `label` equals `"mcp-test-subnet"`, `ipv4` equals `"10.0.1.0/24"`

### Test 6: List VPC Subnets
**Tools:** list_vpc_subnets
**New in 0.4.0:** no

**Steps:**
1. Call `list_vpc_subnets` with `{ "id": <id> }`
   - **Verify:** Response data contains subnet with `label` equals `"mcp-test-subnet"`

### Test 7: Get VPC Subnet
**Tools:** get_vpc_subnet
**New in 0.4.0:** no

**Steps:**
1. Call `get_vpc_subnet` with `{ "id": <id>, "subnet_id": <subnetId from Test 5> }`
   - **Verify:** Response contains `label` equals `"mcp-test-subnet"`, `ipv4` equals `"10.0.1.0/24"`

### Test 8: Update VPC Subnet
**Tools:** update_vpc_subnet
**New in 0.4.0:** no

**Steps:**
1. Call `update_vpc_subnet` with `{ "id": <id>, "subnet_id": <subnetId>, "label": "mcp-test-subnet-updated" }`
   - **Verify:** Response contains `label` equals `"mcp-test-subnet-updated"`

### Test 9: List VPC IPs
**Tools:** list_vpc_ips
**New in 0.4.0:** no

**Steps:**
1. Call `list_vpc_ips` with `{ "id": <id> }`
   - **Verify:** Response contains IP list (may be empty if no Linodes attached)

### Test 10: List All VPC IPs
**Tools:** list_all_vpc_ips
**New in 0.4.0:** yes

**Steps:**
1. Call `list_all_vpc_ips` with `{}`
   - **Verify:** Response contains IP information across all VPCs (structure includes `data` array)

### Test 11: Delete VPC Subnet (Cleanup)
**Tools:** delete_vpc_subnet
**New in 0.4.0:** no

**Steps:**
1. Call `delete_vpc_subnet` with `{ "id": <id>, "subnet_id": <subnetId> }`
   - **Verify:** Response confirms deletion (empty response or success status)

### Test 12: Delete VPC (Cleanup)
**Tools:** delete_vpc
**New in 0.4.0:** no

**Steps:**
1. Call `delete_vpc` with `{ "id": <id> }`
   - **Verify:** Response confirms deletion (empty response or success status)
