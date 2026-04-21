# Linode MCP Server - Test Scenarios

Reusable integration test scenarios for verifying Linode MCP Server tools against a live Linode API.

## Prerequisites
- Linode API token with full access
- MCP server running: `npm run dev -- --token YOUR_TOKEN`
- Claude Desktop or Claude Code connected to the MCP server

## How to Run
1. Start the MCP server
2. Open a conversation with Claude that has access to the Linode MCP tools
3. Ask Claude to execute a specific scenario file (e.g., "Run the tests in 01-static-data.md")
4. Claude will call the MCP tools and verify responses

## Test Organization

Scenarios are ordered by resource dependency. Run them in order for a full test, or run any individually (each is self-contained).

```
01 Static Data (read-only, no resources)
   ↓
02 Account & Profile (account-level, no compute)
   ↓
03 VPC & Subnet (network foundation)
   ↓
04 Instance Lifecycle (core compute - references VPC)
   ├─ 05 Firewall & Networking (attaches to instance)
   ├─ 06 Volume Lifecycle (attaches to instance)
   ├─ 07 NodeBalancer (nodes point to instance IPs)
   ↓
08 Domain & DNS (independent)
09 Object Storage (independent)
10 Kubernetes / LKE (independent)
11 Database (independent, slow ~15min)
   ↓
12 Monitor (alerts, logs, metrics - all new)
13 Image Sharing (sharegroups - all new)
14 Tags, StackScripts, Longview, Support (misc)
```

## Test Files

| # | File | Category | Cost | Time | Self-Contained |
|---|------|----------|------|------|----------------|
| 01 | static-data.md | Regions, types, reference data | Free | ~2 min | Yes |
| 02 | account-profile.md | Account, IAM, profile, tokens | Free | ~3 min | Yes |
| 03 | vpc-lifecycle.md | VPC, subnets, IPs | Free | ~2 min | Yes |
| 04 | instance-lifecycle.md | Instances, configs, disks, interfaces | ~$0.01 | ~5 min | Yes |
| 05 | firewall-networking.md | Firewalls, IPs, VLANs, interfaces | ~$0.01 | ~5 min | Yes (creates own instance) |
| 06 | volume-lifecycle.md | Volumes, attach/detach | ~$0.01 | ~3 min | Yes (creates own instance) |
| 07 | nodebalancer-lifecycle.md | NodeBalancers, configs, nodes | ~$0.01 | ~3 min | Yes |
| 08 | domain-lifecycle.md | Domains, DNS records | Free | ~3 min | Yes |
| 09 | object-storage-lifecycle.md | Buckets, objects, keys, quotas | ~$0.01 | ~5 min | Yes |
| 10 | kubernetes-lifecycle.md | LKE clusters, pools, ACL | ~$0.10 | ~10 min | Yes |
| 11 | database-lifecycle.md | PostgreSQL, connection pools | ~$0.50 | ~20 min | Yes |
| 12 | monitor-lifecycle.md | Alerts, logs, metrics (all new) | Free | ~5 min | Yes |
| 13 | image-sharing.md | Sharegroups, tokens (all new) | Free | ~5 min | Yes |
| 14 | tags-stackscripts-longview.md | Tags, StackScripts, Longview | Free | ~3 min | Yes |

## Naming Convention
All test resources use prefix `mcp-test-` for easy identification and cleanup.

## Region
All tests use `us-east` region.

## Cleanup
Each scenario includes a cleanup section at the end. If tests are interrupted, search for resources with `mcp-test-` prefix and delete them:
- Instances, Volumes, NodeBalancers, Firewalls, VPCs, Domains, Databases, LKE clusters
- Object Storage buckets/keys, Longview clients, StackScripts, Tags
