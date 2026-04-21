import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

/**
 * Registers database tools with the MCP server
 */
export function registerDatabaseTools(server: FastMCP) {
  // Engine operations
  server.addTool({
    name: 'list_database_engines',
    description: 'Get a list of all available database engines',
    parameters: mcpInput(schemas.listEnginesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getEngines(params);
      return JSON.stringify(result.data, null, 2);
    })
  });
  server.addTool({
    name: 'get_database_engine',
    description: 'Get details for a specific database engine',
    parameters: mcpInput(schemas.getEngineSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getEngine(params.engineId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Type operations
  server.addTool({
    name: 'list_database_types',
    description: 'Get a list of all available database types',
    parameters: mcpInput(schemas.listTypesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getTypes(params);
      return JSON.stringify(result.data, null, 2);
    })
  });
  server.addTool({
    name: 'get_database_type',
    description: 'Get details for a specific database type',
    parameters: mcpInput(schemas.getTypeSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getType(params.typeId);
      return JSON.stringify(result, null, 2);
    })
  });

  // General database instances operations
  server.addTool({
    name: 'list_database_instances',
    description: 'Get a list of all database instances',
    parameters: mcpInput(schemas.listDatabaseInstancesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getDatabaseInstances(params);
      return JSON.stringify(result.data, null, 2);
    })
  });

  // MySQL specific operations
  server.addTool({
    name: 'list_mysql_instances',
    description: 'Get a list of all MySQL database instances',
    parameters: mcpInput(schemas.listMySQLInstancesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getMySQLInstances(params);
      return JSON.stringify(result.data, null, 2);
    })
  });
  server.addTool({
    name: 'get_mysql_instance',
    description: 'Get details for a specific MySQL database instance',
    parameters: mcpInput(schemas.getMySQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getMySQLInstance(params.instanceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_mysql_instance',
    description: 'Create a new MySQL database instance',
    parameters: mcpInput(schemas.createMySQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.createMySQLInstance(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_mysql_instance',
    description: 'Update an existing MySQL database instance',
    parameters: mcpInput(schemas.updateMySQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { instanceId, ...data } = params;
      const result = await createClient(context).databases.updateMySQLInstance(instanceId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_mysql_instance',
    description: 'Delete a MySQL database instance',
    parameters: mcpInput(schemas.deleteMySQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).databases.deleteMySQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'get_mysql_credentials',
    description: 'Get credentials for a MySQL database instance',
    parameters: mcpInput(schemas.getMySQLCredentialsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getMySQLCredentials(params.instanceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'reset_mysql_credentials',
    description: 'Reset credentials for a MySQL database instance',
    parameters: mcpInput(schemas.resetMySQLCredentialsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.resetMySQLCredentials(params.instanceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_mysql_ssl_certificate',
    description: 'Get the SSL certificate for a MySQL database instance',
    parameters: mcpInput(schemas.getMySQLSSLCertificateSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getMySQLSSLCertificate(params.instanceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'patch_mysql_instance',
    description: 'Apply the latest updates to a MySQL database instance',
    parameters: mcpInput(schemas.patchMySQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).databases.patchMySQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'suspend_mysql_instance',
    description: 'Suspend a MySQL database instance',
    parameters: mcpInput(schemas.suspendMySQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).databases.suspendMySQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'resume_mysql_instance',
    description: 'Resume a suspended MySQL database instance',
    parameters: mcpInput(schemas.resumeMySQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).databases.resumeMySQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // PostgreSQL specific operations
  server.addTool({
    name: 'list_postgresql_instances',
    description: 'Get a list of all PostgreSQL database instances',
    parameters: mcpInput(schemas.listPostgreSQLInstancesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getPostgreSQLInstances(params);
      return JSON.stringify(result.data, null, 2);
    })
  });
  server.addTool({
    name: 'get_postgresql_instance',
    description: 'Get details for a specific PostgreSQL database instance',
    parameters: mcpInput(schemas.getPostgreSQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getPostgreSQLInstance(params.instanceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_postgresql_instance',
    description: 'Create a new PostgreSQL database instance',
    parameters: mcpInput(schemas.createPostgreSQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.createPostgreSQLInstance(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_postgresql_instance',
    description: 'Update an existing PostgreSQL database instance',
    parameters: mcpInput(schemas.updatePostgreSQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { instanceId, ...data } = params;
      const result = await createClient(context).databases.updatePostgreSQLInstance(instanceId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_postgresql_instance',
    description: 'Delete a PostgreSQL database instance',
    parameters: mcpInput(schemas.deletePostgreSQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).databases.deletePostgreSQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'get_postgresql_credentials',
    description: 'Get credentials for a PostgreSQL database instance',
    parameters: mcpInput(schemas.getPostgreSQLCredentialsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getPostgreSQLCredentials(params.instanceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'reset_postgresql_credentials',
    description: 'Reset credentials for a PostgreSQL database instance',
    parameters: mcpInput(schemas.resetPostgreSQLCredentialsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.resetPostgreSQLCredentials(params.instanceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_postgresql_ssl_certificate',
    description: 'Get the SSL certificate for a PostgreSQL database instance',
    parameters: mcpInput(schemas.getPostgreSQLSSLCertificateSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getPostgreSQLSSLCertificate(params.instanceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'patch_postgresql_instance',
    description: 'Apply the latest updates to a PostgreSQL database instance',
    parameters: mcpInput(schemas.patchPostgreSQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).databases.patchPostgreSQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'suspend_postgresql_instance',
    description: 'Suspend a PostgreSQL database instance',
    parameters: mcpInput(schemas.suspendPostgreSQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).databases.suspendPostgreSQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'resume_postgresql_instance',
    description: 'Resume a suspended PostgreSQL database instance',
    parameters: mcpInput(schemas.resumePostgreSQLInstanceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).databases.resumePostgreSQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // PostgreSQL Connection Pool operations
  server.addTool({
    name: 'list_postgresql_connection_pools',
    description: 'List all connection pools for a PostgreSQL database instance',
    parameters: mcpInput(schemas.listPostgreSQLConnectionPoolsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { instanceId, page, page_size } = params;
      const result = await createClient(context).databases.getPostgreSQLConnectionPools(instanceId, { page, page_size });
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_postgresql_connection_pool',
    description: 'Get details for a specific connection pool of a PostgreSQL database instance',
    parameters: mcpInput(schemas.getPostgreSQLConnectionPoolSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getPostgreSQLConnectionPool(params.instanceId, params.poolName);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_postgresql_connection_pool',
    description: 'Create a new connection pool for a PostgreSQL database instance',
    parameters: mcpInput(schemas.createPostgreSQLConnectionPoolSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { instanceId, ...data } = params;
      const result = await createClient(context).databases.createPostgreSQLConnectionPool(instanceId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_postgresql_connection_pool',
    description: 'Update an existing connection pool for a PostgreSQL database instance',
    parameters: mcpInput(schemas.updatePostgreSQLConnectionPoolSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { instanceId, poolName, ...data } = params;
      const result = await createClient(context).databases.updatePostgreSQLConnectionPool(instanceId, poolName, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_postgresql_connection_pool',
    description: 'Delete a connection pool from a PostgreSQL database instance',
    parameters: mcpInput(schemas.deletePostgreSQLConnectionPoolSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).databases.deletePostgreSQLConnectionPool(params.instanceId, params.poolName);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Database Config operations
  server.addTool({
    name: 'get_mysql_config',
    description: 'List MySQL advanced configuration parameters',
    parameters: mcpInput(schemas.getMySQLConfigSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getMySQLConfig();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_postgresql_config',
    description: 'List PostgreSQL advanced configuration parameters',
    parameters: mcpInput(schemas.getPostgreSQLConfigSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).databases.getPostgreSQLConfig();
      return JSON.stringify(result, null, 2);
    })
  });
}