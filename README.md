[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/takashito-linode-mcp-server-badge.png)](https://mseep.ai/app/takashito-linode-mcp-server)

# Linode MCP Server

[![main version](https://img.shields.io/github/package-json/v/takashito/linode-mcp-server?color=blue)](https://github.com/takashito/linode-mcp-server)
[![npm version](https://img.shields.io/npm/v/%40takashito%2Flinode-mcp-server)](https://www.npmjs.com/package/@takashito/linode-mcp-server)
[![npm downloads](https://img.shields.io/npm/d18m/%40takashito%2Flinode-mcp-server)](https://www.npmjs.com/package/@takashito/linode-mcp-server)
[![smithery badge](https://smithery.ai/badge/@takashito/linode-mcp-server)](https://smithery.ai/server/@takashito/linode-mcp-server)

An MCP (Model Context Protocol) server that connects your AI Assistant or Agent to your Linode cloud infrastructure allowing you to manage your cloud resources through natural conversation. Now both SSE and StreamableHTTP transport support !

## What Can You Do With This?

Ask Claude Desktop or VSCode Copilot Agent to help you with tasks like:
- "Show me all my instances in the Frankfurt region"
- "Create a new instance in Osaka"
- "Create a load balancer for my web servers"
- "Set up a managed MySQL database"
etc

This server provides tools for the following Linode service categories:

- 🖥️ **instances** - Linode compute instances
- 💾 **volumes** - Block storage volumes 
- 🌐 **networking** - IP addresses, firewalls, VLANs
- ⚖️ **nodebalancers** - Load balancers for distributing traffic
- 🌎 **regions** - Data center locations
- 📊 **placement** - Instance placement policies
- 🔒 **vpcs** - Virtual Private Cloud networks
- 📦 **objectStorage** - S3-compatible object storage
- 🔤 **domains** - DNS management
- 🗄️ **databases** - Managed MySQL/PostgreSQL databases
- ☸️ **kubernetes** - Kubernetes container orchestration (LKE)
- 💿 **images** - Custom disk images for instances
- 📜 **stackScripts** - Deployment automation scripts
- 🏷️ **tags** - Resource organization labels
- 🎫 **support** - Support tickets and requests
- 📊 **longview** - System metrics and monitoring
- 👤 **profile** - User profile and security settings
- 🏢 **account** - Account management, users, and billing

## Getting Started

### Quick Start with npx

You'll need a Linode API token to use this server. Create one in your [Linode Cloud Manager profile settings](https://cloud.linode.com/profile/tokens).

```bash
# Start the server with your API token
npx @takashito/linode-mcp-server --token YOUR_LINODE_API_TOKEN
```

### Setting Your API Token

You can provide your token in several ways:

1. **Command line option:**
   ```bash
   npx @takashito/linode-mcp-server --token YOUR_LINODE_API_TOKEN
   ```

2. **Environment variable:**
   ```bash
   export LINODE_API_TOKEN=your_token_here
   npx @takashito/linode-mcp-server
   ```

3. **Environment file:**
   Create a `.env` file in your project directory with:
   ```
   LINODE_API_TOKEN=your_token_here
   ```
   Then run:
   ```bash
   npx @takashito/linode-mcp-server
   ```

### Connecting to Claude Desktop

To add this MCP server to Claude Desktop:

1. Open Claude settings > Developer > Edit Config
2. Add following lines to configure the MCP server:

```json
{
  "mcpServers": {
    "linode": {
      "command": "npx",
      "args": [
        "-y",
        "@takashito/linode-mcp-server",
        "--token", 
        "YOUR_LINODE_API_TOKEN"
      ]
    }
  }
}
```

Or with environment variables:

```json
{
  "mcpServers": {
    "linode": {
      "command": "npx",
      "args": [
        "-y",
        "@takashito/linode-mcp-server"
      ],
      "env": {
        "LINODE_API_TOKEN": "YOUR_LINODE_API_TOKEN"
      }
    }
  }
}
```

### Connecting to VSCode Copilot Agent

Add this MCP server to VSCode Copilot Agent in your VSCode settings (setting.json):

```json
{
  "mcpServers": {
    "linode": {
      "command": "npx",
      "args": [
        "-y",
        "@takashito/linode-mcp-server",
        "--token", 
        "YOUR_LINODE_API_TOKEN",
        "--categories",
        "instances,volumes,regions"
      ]
    }
  }
}
```

⚠️ **Important for GPT-4o users**: When using this server with GPT-4o, use the `--categories` parameter to limit the number of tools. Otherwise, you might get a 400 error in your chat responses.

![chat error](<./img/vscode-gpt-4o-error.png>)

### Automatic Installation via Smithery to Claude Desktop

For the easiest setup, use [Smithery](https://smithery.ai/server/@takashito/linode-mcp-server):

```bash
npx -y @smithery/cli install @takashito/linode-mcp-server --client claude
```

## Tools Category Selection

You can selectively enabled tools with --categories parameter:

```bash
# Enable only instances and volumes tools
npx @takashito/linode-mcp-server --token YOUR_TOKEN --categories instances,volumes
```

Or in Claude Desktop config:

```json
{
  "mcpServers": {
    "linode": {
      "command": "npx",
      "args": [
        "-y",
        "@takashito/linode-mcp-server",
        "--token", 
        "YOUR_LINODE_API_TOKEN",
        "--categories",
        "instances,volumes,regions"
      ]
    }
  }
}
```
Available categories: instances, volumes, networking, nodebalancers, regions, placement, vpcs, objectStorage, domains, databases, kubernetes, images, stackScripts, tags, support, longview, profile, account

To see all available categories:

```bash
npx @takashito/linode-mcp-server --list-categories
```

## Transport Options

By default, the server uses stdio transport which is compatible with Claude Desktop. The server now supports multiple transport options:

1. **stdio transport** - Default transport compatible with Claude Desktop
   ```bash
   # Default stdio transport
   npx @takashito/linode-mcp-server --token YOUR_TOKEN
   ```

2. **SSE transport** - Server-Sent Events transport
   ```bash
   # Start with SSE transport on port 3000 with /sse
   npx @takashito/linode-mcp-server --token YOUR_TOKEN --transport sse
   ```

3. **StreamableHTTP transport** - StreamableHTTP transport for web clients
   ```bash
   # Start with HTTP streaming transport on port 8080 with /mcp
   npx @takashito/linode-mcp-server --token YOUR_TOKEN --transport http
   ```

You can customize port and endpoint for both SSE and HTTP streaming transport:
- `--port` : HTTP/SSE server port (default: 8080 for HTTP, 3000 for SSE)
- `--endpoint` : HTTP/SSE server endpoint path (default: /mcp for HTTP, /sse for SSE)
- `--host` : HTTP/SSE server host (default: 127.0.0.1, SSE only)

## Available Tools

This MCP server provides the following tools for interacting with Linode API services:

### 🖥️ Instances
Manage Linode compute instances, including creation, deletion, and power operations.

#### Instance Operations
- `list_instances` - Get a list of all Linode instances
- `get_instance` - Get details for a specific Linode instance
- `create_instance` - Create a new Linode instance
- `update_instance` - Update a Linode instance
- `delete_instance` - Delete a Linode instance
- `reboot_instance` - Reboot a Linode instance
- `boot_instance` - Power on a Linode instance
- `shutdown_instance` - Power off a Linode instance
- `resize_instance` - Resize a Linode instance
- `clone_instance` - Clone a Linode instance to a new Linode
- `rebuild_instance` - Rebuild a Linode instance with a new image
- `rescue_instance` - Boot a Linode instance into rescue mode
- `reset_root_password` - Reset the root password for a Linode instance
- `initiate_migration` - Initiate a DC migration for a Linode instance
- `upgrade_linode` - Upgrade a Linode instance

#### Instance Configuration
- `list_instance_configs` - Get all configuration profiles for a Linode instance
- `get_instance_config` - Get a specific configuration profile for a Linode instance
- `create_instance_config` - Create a new configuration profile for a Linode instance
- `update_instance_config` - Update a configuration profile for a Linode instance
- `delete_instance_config` - Delete a configuration profile for a Linode instance

#### Configuration Profile Interfaces
- `list_config_interfaces` - List all interfaces for a configuration profile
- `get_config_interface` - Get details for a specific configuration profile interface
- `create_config_interface` - Create a new interface for a configuration profile
- `update_config_interface` - Update an interface for a configuration profile
- `delete_config_interface` - Delete an interface from a configuration profile
- `reorder_config_interfaces` - Reorder interfaces for a configuration profile

#### Instance Disks
- `list_instance_disks` - Get all disks for a Linode instance
- `get_instance_disk` - Get a specific disk for a Linode instance
- `create_instance_disk` - Create a new disk for a Linode instance
- `update_instance_disk` - Update a disk for a Linode instance
- `delete_instance_disk` - Delete a disk for a Linode instance
- `resize_instance_disk` - Resize a disk for a Linode instance
- `clone_disk` - Clone a disk to a new disk
- `reset_disk_root_password` - Reset a disk root password

#### Instance Backups
- `list_backups` - Get a list of all backups for a Linode instance
- `get_backup` - Get details for a specific backup
- `create_snapshot` - Create a snapshot for a Linode instance
- `cancel_backups` - Cancel backups for a Linode instance
- `enable_backups` - Enable backups for a Linode instance
- `restore_backup` - Restore a backup to a Linode instance

#### IP Management
- `get_networking_information` - Get networking information for a Linode instance
- `allocate_ipv4_address` - Allocate an IPv4 address for a Linode instance
- `get_ip_address` - Get details for a specific IP address
- `update_ip_address_rdns` - Update reverse DNS for an IP address
- `delete_ipv4_address` - Delete an IPv4 address

#### Firewall Management
- `list_linode_firewalls` - List firewalls for a Linode instance
- `apply_linode_firewalls` - Apply firewalls to a Linode instance

#### Instance Stats and Transfer
- `get_instance_stats` - Get current statistics for a Linode instance
- `get_instance_stats_by_date` - Get statistics for a Linode instance for a specific month
- `get_network_transfer` - Get network transfer information for a Linode instance
- `get_monthly_network_transfer` - Get monthly network transfer stats for a Linode instance

#### Related Resources
- `list_instance_nodebalancers` - List NodeBalancers attached to a Linode instance
- `list_instance_volumes` - List volumes attached to a Linode instance

#### Kernels and Instance Types
- `list_kernels` - Get a list of all available kernels
- `get_kernel` - Get details for a specific kernel
- `list_instance_types` - Get a list of all available Linode types
- `get_instance_type` - Get details for a specific Linode type

### 💾 Volumes
Manage block storage volumes that can be attached to Linode instances.

- `list_volumes` - Get a list of all volumes
- `get_volume` - Get details for a specific volume
- `create_volume` - Create a new volume
- `delete_volume` - Delete a volume
- `attach_volume` - Attach a volume to a Linode instance
- `detach_volume` - Detach a volume from a Linode instance
- `resize_volume` - Resize a volume

### 🌐 Networking
Manage IP addresses, firewalls, and network infrastructure.

#### IP Address Management
- `get_ip_addresses` - Get all IP addresses
- `get_ip_address` - Get details for a specific IP address
- `update_ip_address` - Update reverse DNS for an IP address
- `allocate_ip` - Allocate a new IP address
- `share_ips` - Share IP addresses between Linodes

#### IPv6 Management
- `get_ipv6_ranges` - Get all IPv6 ranges
- `get_ipv6_range` - Get a specific IPv6 range
- `get_ipv6_pools` - Get all IPv6 pools

#### Firewall Management
- `get_firewalls` - Get all firewalls
- `get_firewall` - Get details for a specific firewall
- `create_firewall` - Create a new firewall
- `update_firewall` - Update a firewall
- `delete_firewall` - Delete a firewall

#### Firewall Rules
- `get_firewall_rules` - Get all rules for a specific firewall
- `update_firewall_rules` - Update rules for a specific firewall

#### Firewall Devices
- `get_firewall_devices` - Get all devices for a specific firewall
- `create_firewall_device` - Create a new device for a specific firewall
- `delete_firewall_device` - Delete a device from a specific firewall

#### VLAN Management
- `get_vlans` - Get all VLANs
- `get_vlan` - Get a specific VLAN

### 🔤 Domains
Manage DNS domains and records hosted by Linode's DNS services.

- `list_domains` - Get a list of all domains
- `get_domain` - Get details for a specific domain
- `create_domain` - Create a new domain
- `update_domain` - Update an existing domain
- `delete_domain` - Delete a domain
- `list_domain_records` - Get a list of all domain records for a domain
- `get_domain_record` - Get details for a specific domain record
- `create_domain_record` - Create a new domain record
- `update_domain_record` - Update a domain record
- `delete_domain_record` - Delete a domain record
- `import_domain_zone` - Import a domain zone from a remote nameserver
- `clone_domain` - Clone an existing domain to a new domain
- `get_zone_file` - Get DNS zone file for a domain

### 🗄️ Databases
Manage Linode Managed Database services for MySQL and PostgreSQL.

#### General Database Operations
- `list_database_engines` - Get a list of all available database engines (MySQL, PostgreSQL versions)
- `get_database_engine` - Get details for a specific database engine version
- `list_database_types` - Get a list of all available database instance types (sizes)
- `get_database_type` - Get details for a specific database instance type
- `list_database_instances` - Get a list of all database instances (both MySQL and PostgreSQL)

#### MySQL Database Operations
- `list_mysql_instances` - Get a list of all MySQL database instances
- `get_mysql_instance` - Get details for a specific MySQL database instance
- `create_mysql_instance` - Create a new MySQL database instance
- `update_mysql_instance` - Update an existing MySQL database instance settings
- `delete_mysql_instance` - Delete a MySQL database instance
- `get_mysql_credentials` - Get admin credentials for a MySQL database instance
- `reset_mysql_credentials` - Reset admin credentials for a MySQL database instance
- `get_mysql_ssl_certificate` - Get the SSL certificate for a MySQL database instance
- `patch_mysql_instance` - Apply the latest software updates to a MySQL database instance
- `suspend_mysql_instance` - Suspend a MySQL database instance (billing continues)
- `resume_mysql_instance` - Resume a suspended MySQL database instance

#### PostgreSQL Database Operations
- `list_postgresql_instances` - Get a list of all PostgreSQL database instances
- `get_postgresql_instance` - Get details for a specific PostgreSQL database instance
- `create_postgresql_instance` - Create a new PostgreSQL database instance
- `update_postgresql_instance` - Update an existing PostgreSQL database instance settings
- `delete_postgresql_instance` - Delete a PostgreSQL database instance
- `get_postgresql_credentials` - Get admin credentials for a PostgreSQL database instance
- `reset_postgresql_credentials` - Reset admin credentials for a PostgreSQL database instance
- `get_postgresql_ssl_certificate` - Get the SSL certificate for a PostgreSQL database instance
- `patch_postgresql_instance` - Apply the latest software updates to a PostgreSQL database instance
- `suspend_postgresql_instance` - Suspend a PostgreSQL database instance (billing continues)
- `resume_postgresql_instance` - Resume a suspended PostgreSQL database instance

### ⚖️ NodeBalancers
Manage Linode's load balancing service to distribute traffic across multiple Linode instances.

- `list_nodebalancers` - Get a list of all NodeBalancers
- `get_nodebalancer` - Get details for a specific NodeBalancer
- `create_nodebalancer` - Create a new NodeBalancer
- `delete_nodebalancer` - Delete a NodeBalancer
- `list_nodebalancer_configs` - Get a list of config nodes for a NodeBalancer
- `create_nodebalancer_config` - Create a new config for a NodeBalancer
- `delete_nodebalancer_config` - Delete a NodeBalancer config
- `list_nodebalancer_nodes` - Get a list of nodes for a NodeBalancer config
- `create_nodebalancer_node` - Create a new node for a NodeBalancer config
- `delete_nodebalancer_node` - Delete a node from a NodeBalancer config

### 📦 Object Storage
Manage S3-compatible object storage for storing and retrieving files.

#### Bucket Management
- `list_object_storage_clusters` - Get a list of all Object Storage clusters
- `list_object_storage_buckets` - Get a list of all Object Storage buckets
- `get_object_storage_bucket` - Get details for a specific Object Storage bucket
- `create_object_storage_bucket` - Create a new Object Storage bucket
- `delete_object_storage_bucket` - Delete an Object Storage bucket
- `get_object_storage_bucket_access` - Get access configuration for an Object Storage bucket
- `update_object_storage_bucket_access` - Update access configuration for an Object Storage bucket

#### Object Operations
- `list_object_storage_objects` - List objects in an Object Storage bucket
- `upload_object` - Upload a new object to a bucket from various sources (string, file, or URL)
- `download_object` - Download an object from a bucket to your local file system
- `delete_object` - Delete an object from a bucket
- `update_object_acl` - Update access control level (ACL) for an object in a bucket
- `generate_object_url` - Generate a pre-signed URL for an object in a bucket

#### Certificate Management
- `get_object_storage_bucket_certificate` - Get SSL/TLS certificate for an Object Storage bucket
- `upload_object_storage_bucket_certificate` - Upload SSL/TLS certificate for an Object Storage bucket
- `delete_object_storage_bucket_certificate` - Delete SSL/TLS certificate for an Object Storage bucket

#### Access Key Management
- `list_object_storage_keys` - Get a list of all Object Storage keys
- `get_object_storage_key` - Get details for a specific Object Storage key
- `create_object_storage_key` - Create a new Object Storage key
- `update_object_storage_key` - Update an Object Storage key
- `delete_object_storage_key` - Delete an Object Storage key
- `get_object_storage_default_bucket_access` - Get default bucket access configuration
- `update_object_storage_default_bucket_access` - Update default bucket access configuration

#### Usage and Service Information
- `get_object_storage_transfer` - Get Object Storage transfer statistics
- `list_object_storage_types` - Get a list of all available Object Storage types with pricing
- `cancel_object_storage` - Cancel Object Storage service

### 🔒 VPCs
Manage Virtual Private Cloud networks to isolate and connect Linode resources.

- `list_vpcs` - Get a list of all VPCs
- `get_vpc` - Get details for a specific VPC
- `create_vpc` - Create a new VPC
- `update_vpc` - Update an existing VPC
- `delete_vpc` - Delete a VPC
- `list_vpc_subnets` - List all subnets in a VPC
- `get_vpc_subnet` - Get details for a specific subnet in a VPC
- `create_vpc_subnet` - Create a new subnet in a VPC
- `update_vpc_subnet` - Update an existing subnet in a VPC
- `delete_vpc_subnet` - Delete a subnet in a VPC
- `list_vpc_ips` - List all IP addresses in a VPC

### 📊 Placement Groups
Manage instance placement policies to control how instances are distributed across physical hardware.

- `list_placement_groups` - List all placement groups
- `get_placement_group` - Get details for a specific placement group
- `create_placement_group` - Create a new placement group
- `update_placement_group` - Update an existing placement group
- `delete_placement_group` - Delete a placement group
- `assign_instances` - Assign Linode instances to a placement group
- `unassign_instances` - Unassign Linode instances from a placement group

### 🌎 Regions
Retrieve information about Linode's global data center locations.

- `list_regions` - Get a list of all available regions
- `get_region` - Get details for a specific region

### ☸️ Kubernetes (LKE)
Manage Linode Kubernetes Engine clusters and node pools.

#### Cluster Operations
- `list_kubernetes_clusters` - List all Kubernetes clusters
- `get_kubernetes_cluster` - Get details for a specific Kubernetes cluster
- `create_kubernetes_cluster` - Create a new Kubernetes cluster
- `update_kubernetes_cluster` - Update an existing Kubernetes cluster
- `delete_kubernetes_cluster` - Delete a Kubernetes cluster
- `get_kubernetes_kubeconfig` - Get the kubeconfig for a Kubernetes cluster
- `get_kubernetes_api_endpoints` - Get the API endpoints for a Kubernetes cluster
- `get_kubernetes_dashboard_url` - Get the dashboard URL for a Kubernetes cluster
- `delete_kubernetes_service_token` - Delete the service token for a Kubernetes cluster
- `recycle_kubernetes_cluster` - Recycle all nodes in a Kubernetes cluster
- `upgrade_kubernetes_cluster` - Upgrade a Kubernetes cluster to the latest patch version
- `list_kubernetes_versions` - List all available Kubernetes versions
- `get_kubernetes_version` - Get details for a specific Kubernetes version
- `list_kubernetes_types` - List all available Kubernetes types

#### Node Pool Operations
- `list_kubernetes_node_pools` - List all node pools in a Kubernetes cluster
- `get_kubernetes_node_pool` - Get details for a specific node pool
- `create_kubernetes_node_pool` - Create a new node pool for a Kubernetes cluster
- `update_kubernetes_node_pool` - Update an existing node pool
- `delete_kubernetes_node_pool` - Delete a node pool from a Kubernetes cluster
- `recycle_kubernetes_nodes` - Recycle specific nodes in a Kubernetes node pool

#### Node Operations
- `delete_kubernetes_node` - Delete a node from a Kubernetes cluster
- `recycle_kubernetes_node` - Recycle a node in a Kubernetes cluster

### 💿 Images
Manage disk images that can be used to create Linode instances.

- `list_images` - Get a list of all available images
- `get_image` - Get details for a specific image
- `create_image` - Create a new image from an existing disk
- `upload_image` - Initialize an image upload
- `update_image` - Update an existing image
- `delete_image` - Delete an image
- `replicate_image` - Replicate an image to other regions

### 📜 StackScripts
Manage reusable scripts that automate the deployment of custom environments on Linode instances.

- `list_stackscripts` - Get a list of all StackScripts
- `get_stackscript` - Get details for a specific StackScript
- `create_stackscript` - Create a new StackScript
- `update_stackscript` - Update an existing StackScript
- `delete_stackscript` - Delete a StackScript

### 🏷️ Tags
Manage labels that help organize and categorize Linode resources.

- `list_tags` - Get a list of all Tags
- `get_tag` - Get details for a specific Tag
- `create_tag` - Create a new Tag
- `delete_tag` - Delete a Tag

### 🎫 Support
Manage support tickets and requests with Linode's support team.

- `list_tickets` - List support tickets for your account
- `get_ticket` - Get details of a specific support ticket
- `create_ticket` - Open a new support ticket
- `close_ticket` - Close a support ticket
- `list_replies` - List replies to a support ticket
- `create_reply` - Reply to a support ticket
- `upload_attachment` - Upload an attachment to a support ticket

### 📊 Longview
Manage Longview monitoring clients for collecting system metrics.

- `list_longview_clients` - Get a list of all Longview clients
- `get_longview_client` - Get details for a specific Longview client
- `create_longview_client` - Create a new Longview client
- `update_longview_client` - Update a Longview client
- `delete_longview_client` - Delete a Longview client
- `list_longview_subscriptions` - Get a list of all Longview subscription plans
- `get_longview_subscription` - Get details for a specific Longview subscription plan
- `get_longview_data` - Get monitoring data from a Longview client

### 👤 Profile
Manage user profile information, SSH keys, API tokens, and security settings.

#### Profile Operations
- `get_profile` - Get your user profile information
- `update_profile` - Update your user profile information

#### SSH Key Operations
- `list_ssh_keys` - List SSH keys associated with your profile
- `get_ssh_key` - Get details for a specific SSH key
- `create_ssh_key` - Add a new SSH key to your profile
- `update_ssh_key` - Update an existing SSH key
- `delete_ssh_key` - Delete an SSH key from your profile

#### API Token Operations
- `list_api_tokens` - List API tokens associated with your profile
- `get_api_token` - Get details for a specific API token
- `create_personal_access_token` - Create a new personal access token
- `update_api_token` - Update an existing API token
- `delete_api_token` - Delete an API token
- `list_api_scopes` - List available API scopes for tokens and OAuth clients

#### Two-Factor Authentication
- `get_two_factor_secret` - Get a two-factor authentication secret and QR code
- `enable_two_factor` - Enable two-factor authentication for your account
- `disable_two_factor` - Disable two-factor authentication for your account

#### Authorized Apps
- `list_authorized_apps` - List OAuth apps authorized to access your account
- `get_authorized_app` - Get details about a specific authorized OAuth app
- `revoke_authorized_app` - Revoke access for an authorized OAuth app

#### Trusted Devices
- `list_trusted_devices` - List devices trusted for two-factor authentication
- `get_trusted_device` - Get details about a specific trusted device
- `revoke_trusted_device` - Revoke trusted status for a device

#### Grants
- `list_grants` - List grants for a restricted user

#### Login History
- `list_logins` - List login history for your account
- `get_login` - Get details about a specific login event

#### Phone Verification
- `delete_phone_number` - Delete the phone number associated with your account
- `send_phone_verification` - Send a verification code to a phone number
- `verify_phone_number` - Verify a phone number with a received code

#### User Preferences
- `get_user_preferences` - Get user interface preferences
- `update_user_preferences` - Update user interface preferences

#### Security Questions
- `get_security_questions` - Get available security questions
- `answer_security_questions` - Answer security questions for account recovery

### 🏢 Account
Manage Linode account information, users, billing, and settings.

#### Account Operations
- `get_account` - Get your account information
- `update_account` - Update your account information

#### Agreements and Services
- `list_agreements` - List legal agreements
- `acknowledge_agreements` - Acknowledge legal agreements
- `list_available_services` - List available services by region
- `get_region_service_availability` - Get service availability for a specific region

#### Account Management
- `cancel_account` - Cancel your account
- `list_child_accounts` - List child accounts
- `get_child_account` - Get a child account
- `create_proxy_token` - Create a proxy user token for a child account

#### Events
- `list_events` - List account events
- `get_event` - Get a specific event
- `mark_event_as_read` - Mark an event as read
- `mark_event_as_seen` - Mark an event as seen

#### Billing
- `list_invoices` - List invoices
- `get_invoice` - Get a specific invoice
- `list_invoice_items` - List items for a specific invoice
- `get_account_network_transfer` - Get network transfer information for the entire account

#### Login & Maintenance
- `list_account_logins` - List account logins
- `get_account_login` - Get a specific account login
- `list_maintenances` - List maintenance events
- `list_notifications` - List notifications

#### OAuth Clients
- `list_oauth_clients` - List OAuth clients
- `create_oauth_client` - Create an OAuth client
- `get_oauth_client` - Get an OAuth client
- `update_oauth_client` - Update an OAuth client
- `delete_oauth_client` - Delete an OAuth client
- `reset_oauth_client_secret` - Reset an OAuth client secret

#### Account Settings
- `get_account_settings` - Get account settings
- `update_account_settings` - Update account settings
- `enable_managed_service` - Enable Linode Managed service

#### User Management
- `list_users` - List users
- `create_user` - Create a user
- `get_user` - Get a user
- `update_user` - Update a user
- `delete_user` - Delete a user
- `get_user_grants` - Get a user's grants
- `update_user_grants` - Update a user's grants

## License

MIT