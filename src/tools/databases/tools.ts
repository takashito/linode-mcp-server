import { FastMCP } from 'fastmcp';
import { LinodeClient, DatabaseEngine, DatabaseType, DatabaseInstance, MySQLDatabaseInstance, PostgreSQLDatabaseInstance, DatabaseCredentials, SSLCertificate } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

/**
 * Formats a database engine for display
 */
function formatDatabaseEngine(engine: DatabaseEngine): string {
      return `Engine: ${engine.engine} v${engine.version} (ID: ${engine.id})`;
}

/**
 * Formats database engines for display
 */
function formatDatabaseEngines(engines: DatabaseEngine[]): string {
  if (engines.length === 0) {
      return 'No database engines found.';
  }

  return engines.map((engine) => {
      return formatDatabaseEngine(engine);
    }).join('\n');
}

/**
 * Formats a database type for display
 */
function formatDatabaseType(type: DatabaseType): string {
  const details = [
    `ID: ${type.id}`,
    `Label: ${type.label}`,
    `Class: ${type.class}`,
    `Memory: ${type.memory_mb} MB`,
    `Storage: ${type.disk_mb} MB`,
    `vCPUs: ${type.vcpus}`,
    `Price: $${type.price.monthly.toFixed(2)}/month ($${type.price.hourly.toFixed(6)}/hour)`
  ];

  if (type.engines && type.engines.length > 0) {
    details.push(`Engines: ${type.engines.map(e => `${e.engine} v${e.version}`).join(', ')}`);
  }

  if (type.regions && type.regions.length > 0) {
    details.push(`Available Regions: ${type.regions.join(', ')}`);
  }

  return details.join('\n');
}

/**
 * Formats database types for display
 */
function formatDatabaseTypes(types: DatabaseType[]): string {
  if (types.length === 0) {
      return 'No database types found.';
  }

  return types.map((type) => {
      return `${type.label} (ID: ${type.id}, Class: ${type.class}, vCPUs: ${type.vcpus}, Memory: ${type.memory_mb} MB)`;
    }).join('\n');
}

/**
 * Formats a database instance for display
 */
function formatDatabaseInstance(instance: DatabaseInstance): string {
  const details = [
    `ID: ${instance.id}`,
    `Label: ${instance.label}`,
    `Status: ${instance.status}`,
    `Engine: ${instance.engine} v${instance.version}`,
    `Region: ${instance.region}`,
    `Type: ${instance.type}`,
    `Cluster Size: ${instance.cluster_size}`,
    `Encrypted: ${instance.encrypted ? 'Yes' : 'No'}`,
    `SSL Connection: ${instance.ssl_connection ? 'Yes' : 'No'}`,
    `Port: ${instance.port}`,
    `Created: ${new Date(instance.created).toLocaleString()}`,
    `Updated: ${new Date(instance.updated).toLocaleString()}`
  ];

  if (instance.hosts) {
    if (instance.hosts.primary) {
      details.push(`Primary Host: ${instance.hosts.primary}`);
    }
    if (instance.hosts.secondary) {
      details.push(`Secondary Host: ${instance.hosts.secondary}`);
    }
    if (instance.hosts.primary_read_only) {
      details.push(`Primary Read-Only Host: ${instance.hosts.primary_read_only}`);
    }
  }

  if (instance.allow_list && instance.allow_list.length > 0) {
    details.push(`Allow List: ${instance.allow_list.join(', ')}`);
  }

  // Handle MySQL/PostgreSQL specific details with type checking
  const mysqlInstance = instance as MySQLDatabaseInstance;
  if (mysqlInstance.updates) {
    details.push('Maintenance Updates:');
    details.push(`  Frequency: ${mysqlInstance.updates.frequency}`);
    details.push(`  Day of Week: ${getDayName(mysqlInstance.updates.day_of_week)}`);
    details.push(`  Hour of Day: ${mysqlInstance.updates.hour_of_day}:00`);
    details.push(`  Duration: ${mysqlInstance.updates.duration} hour(s)`);
    if (mysqlInstance.updates.week_of_month) {
      details.push(`  Week of Month: ${mysqlInstance.updates.week_of_month}`);
    }
  }

  return details.join('\n');
}

/**
 * Formats database instances for display
 */
function formatDatabaseInstances(instances: DatabaseInstance[]): string {
  if (instances.length === 0) {
      return 'No database instances found.';
  }

  return instances.map((instance) => {
      return `${instance.label} (ID: ${instance.id}, Engine: ${instance.engine} v${instance.version}, Status: ${instance.status})`;
    }).join('\n');
}

/**
 * Formats database credentials for display
 */
function formatDatabaseCredentials(credentials: DatabaseCredentials): string {
      return `Username: ${credentials.username}\nPassword: ${credentials.password}`;
}

/**
 * Formats SSL certificate for display
 */
function formatSSLCertificate(certificate: SSLCertificate): string {
      return `CA Certificate:\n${certificate.ca_certificate}`;
}

/**
 * Helper to convert day number to name
 */
function getDayName(day: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day] || day.toString();
}

/**
 * Registers database tools with the MCP server
 */
export function registerDatabaseTools(server: FastMCP, client: LinodeClient) {
  // Engine operations
  server.addTool({
    name: 'list_database_engines',
    description: 'Get a list of all available database engines',
    parameters: schemas.listEnginesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getEngines(params);
      return formatDatabaseEngines(result.data);
    })
  });
  server.addTool({
    name: 'get_database_engine',
    description: 'Get details for a specific database engine',
    parameters: schemas.getEngineSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getEngine(params.engineId);
      return formatDatabaseEngine(result);
    })
  });

  // Type operations
  server.addTool({
    name: 'list_database_types',
    description: 'Get a list of all available database types',
    parameters: schemas.listTypesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getTypes(params);
      return formatDatabaseTypes(result.data);
    })
  });
  server.addTool({
    name: 'get_database_type',
    description: 'Get details for a specific database type',
    parameters: schemas.getTypeSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getType(params.typeId);
      return formatDatabaseType(result);
    })
  });

  // General database instances operations
  server.addTool({
    name: 'list_database_instances',
    description: 'Get a list of all database instances',
    parameters: schemas.listDatabaseInstancesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getDatabaseInstances(params);
      return formatDatabaseInstances(result.data);
    })
  });

  // MySQL specific operations
  server.addTool({
    name: 'list_mysql_instances',
    description: 'Get a list of all MySQL database instances',
    parameters: schemas.listMySQLInstancesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getMySQLInstances(params);
      return formatDatabaseInstances(result.data);
    })
  });
  server.addTool({
    name: 'get_mysql_instance',
    description: 'Get details for a specific MySQL database instance',
    parameters: schemas.getMySQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getMySQLInstance(params.instanceId);
      return formatDatabaseInstance(result);
    })
  });
  server.addTool({
    name: 'create_mysql_instance',
    description: 'Create a new MySQL database instance',
    parameters: schemas.createMySQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.createMySQLInstance(params);
      return formatDatabaseInstance(result);
    })
  });
  server.addTool({
    name: 'update_mysql_instance',
    description: 'Update an existing MySQL database instance',
    parameters: schemas.updateMySQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { instanceId, ...data } = params;
      const result = await client.databases.updateMySQLInstance(instanceId, data);
      return formatDatabaseInstance(result);
    })
  });
  server.addTool({
    name: 'delete_mysql_instance',
    description: 'Delete a MySQL database instance',
    parameters: schemas.deleteMySQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.databases.deleteMySQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'get_mysql_credentials',
    description: 'Get credentials for a MySQL database instance',
    parameters: schemas.getMySQLCredentialsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getMySQLCredentials(params.instanceId);
      return formatDatabaseCredentials(result);
    })
  });
  server.addTool({
    name: 'reset_mysql_credentials',
    description: 'Reset credentials for a MySQL database instance',
    parameters: schemas.resetMySQLCredentialsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.resetMySQLCredentials(params.instanceId);
      return formatDatabaseCredentials(result);
    })
  });
  server.addTool({
    name: 'get_mysql_ssl_certificate',
    description: 'Get the SSL certificate for a MySQL database instance',
    parameters: schemas.getMySQLSSLCertificateSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getMySQLSSLCertificate(params.instanceId);
      return formatSSLCertificate(result);
    })
  });
  server.addTool({
    name: 'patch_mysql_instance',
    description: 'Apply the latest updates to a MySQL database instance',
    parameters: schemas.patchMySQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.databases.patchMySQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'suspend_mysql_instance',
    description: 'Suspend a MySQL database instance',
    parameters: schemas.suspendMySQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.databases.suspendMySQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'resume_mysql_instance',
    description: 'Resume a suspended MySQL database instance',
    parameters: schemas.resumeMySQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.databases.resumeMySQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // PostgreSQL specific operations
  server.addTool({
    name: 'list_postgresql_instances',
    description: 'Get a list of all PostgreSQL database instances',
    parameters: schemas.listPostgreSQLInstancesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getPostgreSQLInstances(params);
      return formatDatabaseInstances(result.data);
    })
  });
  server.addTool({
    name: 'get_postgresql_instance',
    description: 'Get details for a specific PostgreSQL database instance',
    parameters: schemas.getPostgreSQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getPostgreSQLInstance(params.instanceId);
      return formatDatabaseInstance(result);
    })
  });
  server.addTool({
    name: 'create_postgresql_instance',
    description: 'Create a new PostgreSQL database instance',
    parameters: schemas.createPostgreSQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.createPostgreSQLInstance(params);
      return formatDatabaseInstance(result);
    })
  });
  server.addTool({
    name: 'update_postgresql_instance',
    description: 'Update an existing PostgreSQL database instance',
    parameters: schemas.updatePostgreSQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { instanceId, ...data } = params;
      const result = await client.databases.updatePostgreSQLInstance(instanceId, data);
      return formatDatabaseInstance(result);
    })
  });
  server.addTool({
    name: 'delete_postgresql_instance',
    description: 'Delete a PostgreSQL database instance',
    parameters: schemas.deletePostgreSQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.databases.deletePostgreSQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'get_postgresql_credentials',
    description: 'Get credentials for a PostgreSQL database instance',
    parameters: schemas.getPostgreSQLCredentialsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getPostgreSQLCredentials(params.instanceId);
      return formatDatabaseCredentials(result);
    })
  });
  server.addTool({
    name: 'reset_postgresql_credentials',
    description: 'Reset credentials for a PostgreSQL database instance',
    parameters: schemas.resetPostgreSQLCredentialsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.resetPostgreSQLCredentials(params.instanceId);
      return formatDatabaseCredentials(result);
    })
  });
  server.addTool({
    name: 'get_postgresql_ssl_certificate',
    description: 'Get the SSL certificate for a PostgreSQL database instance',
    parameters: schemas.getPostgreSQLSSLCertificateSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await client.databases.getPostgreSQLSSLCertificate(params.instanceId);
      return formatSSLCertificate(result);
    })
  });
  server.addTool({
    name: 'patch_postgresql_instance',
    description: 'Apply the latest updates to a PostgreSQL database instance',
    parameters: schemas.patchPostgreSQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.databases.patchPostgreSQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'suspend_postgresql_instance',
    description: 'Suspend a PostgreSQL database instance',
    parameters: schemas.suspendPostgreSQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.databases.suspendPostgreSQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'resume_postgresql_instance',
    description: 'Resume a suspended PostgreSQL database instance',
    parameters: schemas.resumePostgreSQLInstanceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await client.databases.resumePostgreSQLInstance(params.instanceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
}