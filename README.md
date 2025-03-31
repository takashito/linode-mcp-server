# Linode MCP Server

An MCP (Model Context Protocol) server that interfaces with the Linode API and works with Claude Desktop using stdio. This server acts as a bridge between Claude Desktop and Linode's services.

## Installation

```bash
# Install globally
npm install -g linode-mcp-server

# Or use with npx directly
npx linode-mcp-server --token YOUR_LINODE_API_TOKEN
```

## Usage

You need a Linode API token to use this server. You can create one in the Linode Cloud Manager under your profile settings.

```bash
# Start the server with your API token
linode-mcp-server --token YOUR_LINODE_API_TOKEN
```

### Using with Claude Desktop

Add this MCP server to Claude Desktop by configuring it in your Claude settings:

```json
{
  "mcpServers": {
    "linode": {
      "command": "npx",
      "args": ["linode-mcp-server", "--token", "YOUR_LINODE_API_TOKEN"]
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

### Meta
- `list_regions` - Get a list of all available regions
- `get_region` - Get details for a specific region
- `list_types` - Get a list of all available Linode types
- `get_type` - Get details for a specific Linode type
- `list_images` - Get a list of all available images
- `get_image` - Get details for a specific image

## License

MIT
