# Linode MCP Server

[![main version](https://img.shields.io/github/package-json/v/takashito/linode-mcp-server?color=blue)](https://github.com/takashito/linode-mcp-server)
[![npm version](https://img.shields.io/npm/v/%40takashito%2Flinode-mcp-server)](https://www.npmjs.com/package/@takashito/linode-mcp-server)
[![npm downloads](https://img.shields.io/npm/d18m/%40takashito%2Flinode-mcp-server)](https://www.npmjs.com/package/@takashito/linode-mcp-server)
[![smithery badge](https://smithery.ai/badge/@takashito/linode-mcp-server)](https://smithery.ai/server/@takashito/linode-mcp-server)

An MCP (Model Context Protocol) server that interfaces with the Linode API and works with Claude Desktop using stdio. This server acts as a bridge between Claude Desktop and Linode's cloud infrastructure services, including compute instances, block storage, managed databases, load balancers, and more.

## Installation & Uage with npx

You need a Linode API token to use this server. You can create one in the Linode Cloud Manager under your profile settings.

```bash
# Start the server with your API token
npx @takashito/linode-mcp-server --token YOUR_LINODE_API_TOKEN
```

You can also set the token using an environment variable:

```bash
# Set the token as an environment variable
export LINODE_API_TOKEN=your_token_here
```

Or by adding it to a .env file in the project directory:

```
LINODE_API_TOKEN=your_token_here
```

```
# Then run the server
npx @takashito/linode-mcp-server
```

### Using with Claude Desktop

Add this MCP server to Claude Desktop by configuring it in your Claude settings:

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

Or using environment variables:

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

## Installing via Smithery

To install linode-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@takashito/linode-mcp-server):

```bash
npx -y @smithery/cli install @takashito/linode-mcp-server --client claude
```

## Available Tools

This MCP server provides the following tools for interacting with Linode API services:

### Instances
Manage Linode compute instances, including creation, deletion, and power operations.

- `list_instances` - Get a list of all Linode instances
- `get_instance` - Get details for a specific Linode instance
- `create_instance` - Create a new Linode instance
- `reboot_instance` - Reboot a Linode instance
- `boot_instance` - Power on a Linode instance
- `shutdown_instance` - Power off a Linode instance
- `delete_instance` - Delete a Linode instance
- `resize_instance` - Resize a Linode instance
- `list_instance_types` - Get a list of all available Linode types
- `get_instance_type` - Get details for a specific Linode type

### Volumes
Manage block storage volumes that can be attached to Linode instances.

- `list_volumes` - Get a list of all volumes
- `get_volume` - Get details for a specific volume
- `create_volume` - Create a new volume
- `delete_volume` - Delete a volume
- `attach_volume` - Attach a volume to a Linode instance
- `detach_volume` - Detach a volume from a Linode instance
- `resize_volume` - Resize a volume

### Domains
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

### Databases
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

### NodeBalancers
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

### Object Storage
Manage S3-compatible object storage for storing and retrieving files.

- `list_object_storage_clusters` - Get a list of all Object Storage clusters
- `list_object_storage_buckets` - Get a list of all Object Storage buckets
- `get_object_storage_bucket` - Get details for a specific Object Storage bucket
- `create_object_storage_bucket` - Create a new Object Storage bucket
- `delete_object_storage_bucket` - Delete an Object Storage bucket
- `get_object_storage_bucket_access` - Get access configuration for an Object Storage bucket
- `update_object_storage_bucket_access` - Update access configuration for an Object Storage bucket
- `list_object_storage_objects` - List objects in an Object Storage bucket
- `get_object_storage_bucket_certificate` - Get SSL/TLS certificate for an Object Storage bucket
- `upload_object_storage_bucket_certificate` - Upload SSL/TLS certificate for an Object Storage bucket
- `delete_object_storage_bucket_certificate` - Delete SSL/TLS certificate for an Object Storage bucket
- `list_object_storage_keys` - Get a list of all Object Storage keys
- `get_object_storage_key` - Get details for a specific Object Storage key
- `create_object_storage_key` - Create a new Object Storage key
- `update_object_storage_key` - Update an Object Storage key
- `delete_object_storage_key` - Delete an Object Storage key
- `get_object_storage_default_bucket_access` - Get default bucket access configuration
- `update_object_storage_default_bucket_access` - Update default bucket access configuration
- `cancel_object_storage` - Cancel Object Storage service

### VPCs
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

### Placement Groups
Manage instance placement policies to control how instances are distributed across physical hardware.

- `list_placement_groups` - List all placement groups
- `get_placement_group` - Get details for a specific placement group
- `create_placement_group` - Create a new placement group
- `update_placement_group` - Update an existing placement group
- `delete_placement_group` - Delete a placement group
- `assign_instances` - Assign Linode instances to a placement group
- `unassign_instances` - Unassign Linode instances from a placement group

### Regions
Retrieve information about Linode's global data center locations.

- `list_regions` - Get a list of all available regions
- `get_region` - Get details for a specific region

### Kubernetes (LKE)
Manage Linode Kubernetes Engine clusters and node pools.

#### Cluster Operations
- `list_kubernetes_clusters` - List all Kubernetes clusters
- `get_kubernetes_cluster` - Get details for a specific Kubernetes cluster
- `create_kubernetes_cluster` - Create a new Kubernetes cluster
- `update_kubernetes_cluster` - Update an existing Kubernetes cluster
- `delete_kubernetes_cluster` - Delete a Kubernetes cluster
- `get_kubernetes_kubeconfig` - Get the kubeconfig for a Kubernetes cluster
- `get_kubernetes_api_endpoints` - Get the API endpoints for a Kubernetes cluster
- `recycle_kubernetes_cluster` - Recycle all nodes in a Kubernetes cluster
- `upgrade_kubernetes_cluster` - Upgrade a Kubernetes cluster to the latest patch version
- `list_kubernetes_versions` - List all available Kubernetes versions

#### Node Pool Operations
- `list_kubernetes_node_pools` - List all node pools in a Kubernetes cluster
- `get_kubernetes_node_pool` - Get details for a specific node pool
- `create_kubernetes_node_pool` - Create a new node pool for a Kubernetes cluster
- `update_kubernetes_node_pool` - Update an existing node pool
- `delete_kubernetes_node_pool` - Delete a node pool from a Kubernetes cluster
- `recycle_kubernetes_nodes` - Recycle specific nodes in a Kubernetes node pool

### Images
Manage disk images that can be used to create Linode instances.

- `list_images` - Get a list of all available images
- `get_image` - Get details for a specific image

## License

MIT
