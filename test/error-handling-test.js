/**
 * Test script for error handling
 * 
 * This script tests the error handling functionality by attempting to create 
 * an instance with invalid parameters to ensure the error messages are properly formatted.
 * 
 * Usage:
 * 1. Set your Linode API token in one of two ways:
 *    - Environment variable: export LINODE_API_TOKEN=your_token_here
 *    - Create a .env file in the project root with: LINODE_API_TOKEN=your_token_here
 * 2. Run: node test/error-handling-test.js
 */

const { createClient } = require('../dist/client');
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { registerAllTools } = require('../dist/tools');
const fs = require('fs');
const path = require('path');

// Try to load token from .env file if it exists
let API_TOKEN = process.env.LINODE_API_TOKEN;
if (!API_TOKEN) {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envLines = envContent.split('\n');
      for (const line of envLines) {
        if (line.startsWith('LINODE_API_TOKEN=')) {
          API_TOKEN = line.split('=')[1].trim();
          break;
        }
      }
    }
  } catch (error) {
    console.error('Error loading .env file:', error.message);
  }
}

// Verify token is available
if (!API_TOKEN) {
  console.error('LINODE_API_TOKEN not found in environment or .env file');
  process.exit(1);
}

// Initialize client and server
const client = createClient(API_TOKEN);
const server = new McpServer({
  name: 'linode-mcp-server-test',
  version: '1.0.0',
  description: 'Testing Linode MCP Server Tools Error Handling',
});

// Store registered tools manually
const registeredTools = {};

// Override the tool registration method to store tools for testing
const originalToolMethod = server.tool.bind(server);
server.tool = function(name, description, schema, handler) {
  // Store the tool for our tests
  registeredTools[name] = { name, description, schema, handler };
  // Call the original method
  return originalToolMethod(name, description, schema, handler);
};

// Register all tools
registerAllTools(server, client);

// Mock implementation of the handler function
const mockHandler = async (toolName, params) => {
  try {
    // Debug info
    console.log(`Looking for tool: ${toolName}`);
    console.log(`Available tools: ${Object.keys(registeredTools).length}`);
    
    // Find the specific tool
    const tool = registeredTools[toolName];
    if (!tool) {
      console.log(`Tool '${toolName}' not found!`);
      return { error: `Tool '${toolName}' not found` };
    }
    
    // Call the tool handler directly
    const result = await tool.handler(params, {});
    console.log(`✅ Success: ${toolName}`);
    return result;
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { error: error.message };
  }
};

// Run tests
async function runTests() {
  console.log('=== Testing Error Handling ===\n');

  // Test 1: Create instance with invalid parameters (missing required fields)
  console.log('Test 1: Create instance with invalid parameters (missing required fields)');
  await mockHandler('create_instance', {
    label: 'test-instance',
    // Missing required region and type
  });
  console.log('');

  // Test 2: Create instance with invalid type
  console.log('Test 2: Create instance with invalid type');
  await mockHandler('create_instance', {
    label: 'test-instance',
    region: 'us-east',
    type: 'invalid-type',
    root_pass: 'Password123!',
    image: 'linode/debian11'
  });
  console.log('');

  // Test 3: Get non-existent instance
  console.log('Test 3: Get non-existent instance');
  await mockHandler('get_instance', {
    id: 99999999 // Non-existent instance ID
  });
  console.log('');

  // Test 4: Create VPC with duplicate label
  console.log('Test 4: Create VPC with duplicate label (if any exist in your account)');
  // First get existing VPCs
  const listVPCsResult = await mockHandler('list_vpcs', {});
  // If there are any VPCs, try to create a new one with the same label
  if (listVPCsResult.content && listVPCsResult.content[0].text && !listVPCsResult.content[0].text.includes('No VPCs found')) {
    // Try to parse the VPCs
    try {
      // Extract the first VPC label from the formatted text
      const vpcText = listVPCsResult.content[0].text;
      const match = vpcText.match(/(.+?)\s+\(ID:/);
      if (match && match[1]) {
        const existingLabel = match[1];
        await mockHandler('create_vpc', {
          label: existingLabel,
          region: 'us-east',
        });
      } else {
        console.log('Could not extract VPC label from result');
      }
    } catch (e) {
      console.log('Error parsing VPCs:', e.message);
    }
  } else {
    console.log('No existing VPCs found for this test');
  }
  
  // Test 5: Test password strength requirements
  console.log('\nTest 5: Test password strength requirements');
  await mockHandler('create_instance', {
    label: 'test-instance',
    region: 'us-east',
    type: 'g6-nanode-1',
    root_pass: 'weakpassword', // Too weak
    image: 'linode/debian11'
  });
  
  // Test 6: Test invalid region
  console.log('\nTest 6: Test invalid region');
  await mockHandler('create_instance', {
    label: 'test-instance',
    region: 'invalid-region',
    type: 'g6-nanode-1',
    root_pass: 'StrongP@ssw0rd123!',
    image: 'linode/debian11'
  });
  
  // Test 7: Test invalid image
  console.log('\nTest 7: Test invalid image');
  await mockHandler('create_instance', {
    label: 'test-instance',
    region: 'us-east',
    type: 'g6-nanode-1',
    root_pass: 'StrongP@ssw0rd123!',
    image: 'invalid/image'
  });

  console.log('\n=== Testing Complete ===');
}

// Run the tests
runTests().catch(console.error);