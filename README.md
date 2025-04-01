# Linode MCP Server

[![smithery badge](https://smithery.ai/badge/@takashito/linode-mcp-server)](https://smithery.ai/server/@takashito/linode-mcp-server)

An MCP (Model Context Protocol) server that interfaces with the Linode API and works with Claude Desktop using stdio. This server acts as a bridge between Claude Desktop and Linode's services.

## Installation

### Installing via Smithery

To install linode-mcp-server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@takashito/linode-mcp-server):

```bash
npx -y @smithery/cli install @takashito/linode-mcp-server --client claude
```

### Use with npx

```bash
# Or use with npx directly
npx @takashito/linode-mcp-server --token YOUR_LINODE_API_TOKEN
```

## Usage

You need a Linode API token to use this server. You can create one in the Linode Cloud Manager under your profile settings.

```bash
# Start the server with your API token
linode-mcp-server --token YOUR_LINODE_API_TOKEN
```

You can also set the token using an environment variable:

```bash
# Set the token as an environment variable
export LINODE_API_TOKEN=your_token_here

# Then run the server
linode-mcp-server
```

Or by adding it to a .env file in the project directory:

```
LINODE_API_TOKEN=your_token_here
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

## Available Tools

This MCP server provides the following tools for interacting with Linode:

### Instances
- `list_instances` - Get a list of all Linode instances
- `get_instance` - Get details for a specific Linode instance
- `create_instance` - Create a new Linode instance
- `reboot_instance` - Reboot a Linode instance
- `boot_instance` - Power on a Linode instance
- `shutdown_instance` - Power off a Linode instance
- `delete_instance` - Delete a Linode instance
- `resize_instance` - Resize a Linode instance

### Volumes
- `list_volumes` - Get a list of all volumes
- `get_volume` - Get details for a specific volume
- `create_volume` - Create a new volume
- `delete_volume` - Delete a volume
- `attach_volume` - Attach a volume to a Linode instance
- `detach_volume` - Detach a volume from a Linode instance
- `resize_volume` - Resize a volume

### Domains
- `list_domains` - Get a list of all domains
- `get_domain` - Get details for a specific domain
- `create_domain` - Create a new domain
- `delete_domain` - Delete a domain
- `list_domain_records` - Get a list of all domain records for a domain
- `create_domain_record` - Create a new domain record
- `update_domain_record` - Update a domain record
- `delete_domain_record` - Delete a domain record

### NodeBalancers
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

### Meta
- `list_regions` - Get a list of all available regions
- `get_region` - Get details for a specific region
- `list_types` - Get a list of all available Linode types
- `get_type` - Get details for a specific Linode type
- `list_images` - Get a list of all available images
- `get_image` - Get details for a specific image

## License

MIT
