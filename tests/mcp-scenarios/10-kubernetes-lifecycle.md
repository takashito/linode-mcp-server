# Test Scenario 10: Kubernetes (LKE) Lifecycle

**Category:** Linode Kubernetes Engine
**Cost:** ~$0.10
**Time:** ~10 minutes
**Prerequisites:** None

This scenario tests the full lifecycle of an LKE cluster: create, inspect, node pool management, kubeconfig, control plane ACL, and delete.

---

### Test 1: List Kubernetes versions
**Tools:** list_kubernetes_versions
**New in 0.4.0:** no

**Steps:**
1. Call `list_kubernetes_versions` with `{}`
   - **Verify:** Returns array of versions with `id` fields
   - **Save:** latest version `id` as `K8S_VERSION`

---

### Test 2: List Kubernetes tier versions
**Tools:** list_kubernetes_tier_versions
**New in 0.4.0:** yes

**Steps:**
1. Call `list_kubernetes_tier_versions` with `{ "tier": "standard" }`
   - **Verify:** Returns array of versions for the standard tier

---

### Test 3: Create Kubernetes cluster
**Tools:** create_kubernetes_cluster
**New in 0.4.0:** no

**Steps:**
1. Call `create_kubernetes_cluster` with `{ "label": "mcp-test-lke", "region": "us-east", "k8s_version": K8S_VERSION, "node_pools": [{ "type": "g6-nanode-1", "count": 1 }] }`
   - **Verify:** Response has `id`, `label` equal to `"mcp-test-lke"`, `region` is `"us-east"`, `k8s_version` matches requested version
   - **Save:** cluster `id` as `CLUSTER_ID`

---

### Test 4: List Kubernetes clusters
**Tools:** list_kubernetes_clusters
**New in 0.4.0:** no

**Steps:**
1. Call `list_kubernetes_clusters` with `{}`
   - **Verify:** Response contains a cluster with `id` equal to `CLUSTER_ID`

---

### Test 5: Get Kubernetes cluster
**Tools:** get_kubernetes_cluster
**New in 0.4.0:** no

**Steps:**
1. Call `get_kubernetes_cluster` with `{ "id": CLUSTER_ID }`
   - **Verify:** Response has `id`, `label`, `region`, `k8s_version`, `status`

---

### Test 6: List Kubernetes node pools
**Tools:** list_kubernetes_node_pools
**New in 0.4.0:** no

**Steps:**
1. Call `list_kubernetes_node_pools` with `{ "clusterId": CLUSTER_ID }`
   - **Verify:** Returns array with at least one pool, each has `id`, `type`, `count`, `nodes`
   - **Save:** first pool `id` as `POOL_ID`

---

### Test 7: Get Kubernetes node pool
**Tools:** get_kubernetes_node_pool
**New in 0.4.0:** no

**Steps:**
1. Call `get_kubernetes_node_pool` with `{ "clusterId": CLUSTER_ID, "poolId": POOL_ID }`
   - **Verify:** Response has `id`, `type` equal to `"g6-nanode-1"`, `count` equal to `1`, `nodes` array
   - **Save:** first node `id` from `nodes` array as `NODE_ID`

---

### Test 8: Get Kubernetes node
**Tools:** get_kubernetes_node
**New in 0.4.0:** yes

**Steps:**
1. Call `get_kubernetes_node` with `{ "clusterId": CLUSTER_ID, "nodeId": NODE_ID }`
   - **Verify:** Response has `id`, `status`, `instance_id`

---

### Test 9: Get Kubernetes kubeconfig
**Tools:** get_kubernetes_kubeconfig
**New in 0.4.0:** no

**Steps:**
1. Call `get_kubernetes_kubeconfig` with `{ "id": CLUSTER_ID }`
   - **Verify:** Returns kubeconfig data (base64 encoded or decoded YAML)

---

### Test 10: Get Kubernetes API endpoints
**Tools:** get_kubernetes_api_endpoints
**New in 0.4.0:** no

**Steps:**
1. Call `get_kubernetes_api_endpoints` with `{ "id": CLUSTER_ID }`
   - **Verify:** Returns array of endpoint URLs

---

### Test 11: Get Kubernetes dashboard URL
**Tools:** get_kubernetes_dashboard_url
**New in 0.4.0:** no

**Steps:**
1. Call `get_kubernetes_dashboard_url` with `{ "id": CLUSTER_ID }`
   - **Verify:** Returns a URL string for the dashboard

---

### Test 12: Get Kubernetes control plane ACL
**Tools:** get_kubernetes_control_plane_acl
**New in 0.4.0:** yes

**Steps:**
1. Call `get_kubernetes_control_plane_acl` with `{ "clusterId": CLUSTER_ID }`
   - **Verify:** Returns ACL structure with `enabled` field and `addresses` object

---

### Test 13: Update Kubernetes control plane ACL
**Tools:** update_kubernetes_control_plane_acl
**New in 0.4.0:** yes

**Steps:**
1. Call `update_kubernetes_control_plane_acl` with `{ "clusterId": CLUSTER_ID, "acl": { "enabled": true, "addresses": { "ipv4": ["0.0.0.0/0"] } } }`
   - **Verify:** Returns updated ACL with `enabled` as `true`

---

### Test 14: Delete Kubernetes control plane ACL
**Tools:** delete_kubernetes_control_plane_acl
**New in 0.4.0:** yes

**Steps:**
1. Call `delete_kubernetes_control_plane_acl` with `{ "clusterId": CLUSTER_ID }`
   - **Verify:** Returns success response

---

## Cleanup

### Test 15: Delete Kubernetes cluster
**Tools:** delete_kubernetes_cluster
**New in 0.4.0:** no

**Steps:**
1. Call `delete_kubernetes_cluster` with `{ "id": CLUSTER_ID }`
   - **Verify:** Returns success response
2. Call `list_kubernetes_clusters` with `{}`
   - **Verify:** Cluster with `CLUSTER_ID` no longer appears (or is in deleting state)
