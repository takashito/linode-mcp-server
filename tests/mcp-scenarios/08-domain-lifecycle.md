# Test Scenario 08: Domain & DNS Lifecycle

**Category:** Domains
**Cost:** Free
**Time:** ~3 minutes
**Prerequisites:** None

This scenario tests the full lifecycle of DNS domains and records: create domain, add records, update, and delete.

---

### Test 1: Create domain
**Tools:** create_domain
**New in 0.4.0:** no

**Steps:**
1. Call `create_domain` with `{ "domain": "mcp-test-domain.com", "type": "master", "soa_email": "admin@mcp-test-domain.com" }`
   - **Verify:** Response has `id`, `domain` equal to `"mcp-test-domain.com"`, `type` equal to `"master"`, `status` is `"active"`
   - **Save:** domain `id` as `DOMAIN_ID`

---

### Test 2: List domains
**Tools:** list_domains
**New in 0.4.0:** no

**Steps:**
1. Call `list_domains` with `{}`
   - **Verify:** Response contains a domain with `id` equal to `DOMAIN_ID`

---

### Test 3: Get domain
**Tools:** get_domain
**New in 0.4.0:** no

**Steps:**
1. Call `get_domain` with `{ "id": DOMAIN_ID }`
   - **Verify:** Response has `id`, `domain`, `type`, `soa_email`, `status`

---

### Test 4: Update domain
**Tools:** update_domain
**New in 0.4.0:** no

**Steps:**
1. Call `update_domain` with `{ "id": DOMAIN_ID, "description": "MCP test domain" }`
   - **Verify:** Response has `description` equal to `"MCP test domain"`

---

### Test 5: Create A record
**Tools:** create_domain_record
**New in 0.4.0:** no

**Steps:**
1. Call `create_domain_record` with `{ "domainId": DOMAIN_ID, "type": "A", "name": "www", "target": "192.0.2.1", "ttl_sec": 300 }`
   - **Verify:** Response has `id`, `type` equal to `"A"`, `name` equal to `"www"`, `target` equal to `"192.0.2.1"`
   - **Save:** record `id` as `RECORD_A_ID`

---

### Test 6: Create CNAME record
**Tools:** create_domain_record
**New in 0.4.0:** no

**Steps:**
1. Call `create_domain_record` with `{ "domainId": DOMAIN_ID, "type": "CNAME", "name": "blog", "target": "www.mcp-test-domain.com", "ttl_sec": 300 }`
   - **Verify:** Response has `id`, `type` equal to `"CNAME"`, `name` equal to `"blog"`
   - **Save:** record `id` as `RECORD_CNAME_ID`

---

### Test 7: Create MX record
**Tools:** create_domain_record
**New in 0.4.0:** no

**Steps:**
1. Call `create_domain_record` with `{ "domainId": DOMAIN_ID, "type": "MX", "name": "", "target": "mail.mcp-test-domain.com", "priority": 10, "ttl_sec": 300 }`
   - **Verify:** Response has `id`, `type` equal to `"MX"`, `priority` equal to `10`
   - **Save:** record `id` as `RECORD_MX_ID`

---

### Test 8: List domain records
**Tools:** list_domain_records
**New in 0.4.0:** no

**Steps:**
1. Call `list_domain_records` with `{ "domainId": DOMAIN_ID }`
   - **Verify:** Returns array containing at least the 3 records created (A, CNAME, MX) plus default NS/SOA records

---

### Test 9: Get domain record
**Tools:** get_domain_record
**New in 0.4.0:** no

**Steps:**
1. Call `get_domain_record` with `{ "domainId": DOMAIN_ID, "recordId": RECORD_A_ID }`
   - **Verify:** Response has `id`, `type` equal to `"A"`, `name` equal to `"www"`, `target` equal to `"192.0.2.1"`

---

### Test 10: Update domain record
**Tools:** update_domain_record
**New in 0.4.0:** no

**Steps:**
1. Call `update_domain_record` with `{ "domainId": DOMAIN_ID, "recordId": RECORD_A_ID, "target": "192.0.2.2" }`
   - **Verify:** Response has `target` equal to `"192.0.2.2"`

---

### Test 11: Get zone file
**Tools:** get_zone_file
**New in 0.4.0:** no

**Steps:**
1. Call `get_zone_file` with `{ "id": DOMAIN_ID }`
   - **Verify:** Returns zone file content as text

---

### Test 12: Delete domain records
**Tools:** delete_domain_record
**New in 0.4.0:** no

**Steps:**
1. Call `delete_domain_record` with `{ "domainId": DOMAIN_ID, "recordId": RECORD_A_ID }`
   - **Verify:** Returns success response
2. Call `delete_domain_record` with `{ "domainId": DOMAIN_ID, "recordId": RECORD_CNAME_ID }`
   - **Verify:** Returns success response
3. Call `delete_domain_record` with `{ "domainId": DOMAIN_ID, "recordId": RECORD_MX_ID }`
   - **Verify:** Returns success response

---

## Cleanup

### Delete domain
**Tools:** delete_domain

**Steps:**
1. Call `delete_domain` with `{ "id": DOMAIN_ID }`
   - **Verify:** Returns success response
2. Call `list_domains` with `{}`
   - **Verify:** Domain with `DOMAIN_ID` no longer appears
