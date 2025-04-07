import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, DatabaseEngine, DatabaseType, DatabaseInstance, MySQLDatabaseInstance, PostgreSQLDatabaseInstance, DatabaseCredentials, SSLCertificate } from '../../client';
import * as schemas from './schemas';
import { registerToolsWithErrorHandling, ToolRegistration } from '../common/errorHandler';

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
export function registerDatabaseTools(server: McpServer, client: LinodeClient) {
  // Define all database tools with error handling
  const databaseTools: ToolRegistration[] = [
    // Engine operations
    {
      name: 'list_database_engines',
      description: 'Get a list of all available database engines',
      schema: schemas.listEnginesSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getEngines(params);
        return {
          content: [
            { type: 'text', text: formatDatabaseEngines(result.data) },
          ],
        };
      }
    },
    {
      name: 'get_database_engine',
      description: 'Get details for a specific database engine',
      schema: schemas.getEngineSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getEngine(params.engineId);
        return {
          content: [
            { type: 'text', text: formatDatabaseEngine(result) },
          ],
        };
      }
    },

    // Type operations
    {
      name: 'list_database_types',
      description: 'Get a list of all available database types',
      schema: schemas.listTypesSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getTypes(params);
        return {
          content: [
            { type: 'text', text: formatDatabaseTypes(result.data) },
          ],
        };
      }
    },
    {
      name: 'get_database_type',
      description: 'Get details for a specific database type',
      schema: schemas.getTypeSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getType(params.typeId);
        return {
          content: [
            { type: 'text', text: formatDatabaseType(result) },
          ],
        };
      }
    },

    // General database instances operations
    {
      name: 'list_database_instances',
      description: 'Get a list of all database instances',
      schema: schemas.listDatabaseInstancesSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getDatabaseInstances(params);
        return {
          content: [
            { type: 'text', text: formatDatabaseInstances(result.data) },
          ],
        };
      }
    },

    // MySQL specific operations
    {
      name: 'list_mysql_instances',
      description: 'Get a list of all MySQL database instances',
      schema: schemas.listMySQLInstancesSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getMySQLInstances(params);
        return {
          content: [
            { type: 'text', text: formatDatabaseInstances(result.data) },
          ],
        };
      }
    },
    {
      name: 'get_mysql_instance',
      description: 'Get details for a specific MySQL database instance',
      schema: schemas.getMySQLInstanceSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getMySQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: formatDatabaseInstance(result) },
          ],
        };
      }
    },
    {
      name: 'create_mysql_instance',
      description: 'Create a new MySQL database instance',
      schema: schemas.createMySQLInstanceSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.createMySQLInstance(params);
        return {
          content: [
            { type: 'text', text: formatDatabaseInstance(result) },
          ],
        };
      }
    },
    {
      name: 'update_mysql_instance',
      description: 'Update an existing MySQL database instance',
      schema: schemas.updateMySQLInstanceSchema.shape,
      handler: async (params, extra) => {
        const { instanceId, ...data } = params;
        const result = await client.databases.updateMySQLInstance(instanceId, data);
        return {
          content: [
            { type: 'text', text: formatDatabaseInstance(result) },
          ],
        };
      }
    },
    {
      name: 'delete_mysql_instance',
      description: 'Delete a MySQL database instance',
      schema: schemas.deleteMySQLInstanceSchema.shape,
      handler: async (params, extra) => {
        await client.databases.deleteMySQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    {
      name: 'get_mysql_credentials',
      description: 'Get credentials for a MySQL database instance',
      schema: schemas.getMySQLCredentialsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getMySQLCredentials(params.instanceId);
        return {
          content: [
            { type: 'text', text: formatDatabaseCredentials(result) },
          ],
        };
      }
    },
    {
      name: 'reset_mysql_credentials',
      description: 'Reset credentials for a MySQL database instance',
      schema: schemas.resetMySQLCredentialsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.resetMySQLCredentials(params.instanceId);
        return {
          content: [
            { type: 'text', text: formatDatabaseCredentials(result) },
          ],
        };
      }
    },
    {
      name: 'get_mysql_ssl_certificate',
      description: 'Get the SSL certificate for a MySQL database instance',
      schema: schemas.getMySQLSSLCertificateSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getMySQLSSLCertificate(params.instanceId);
        return {
          content: [
            { type: 'text', text: formatSSLCertificate(result) },
          ],
        };
      }
    },
    {
      name: 'patch_mysql_instance',
      description: 'Apply the latest updates to a MySQL database instance',
      schema: schemas.patchMySQLInstanceSchema.shape,
      handler: async (params, extra) => {
        await client.databases.patchMySQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    {
      name: 'suspend_mysql_instance',
      description: 'Suspend a MySQL database instance',
      schema: schemas.suspendMySQLInstanceSchema.shape,
      handler: async (params, extra) => {
        await client.databases.suspendMySQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    {
      name: 'resume_mysql_instance',
      description: 'Resume a suspended MySQL database instance',
      schema: schemas.resumeMySQLInstanceSchema.shape,
      handler: async (params, extra) => {
        await client.databases.resumeMySQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },

    // PostgreSQL specific operations
    {
      name: 'list_postgresql_instances',
      description: 'Get a list of all PostgreSQL database instances',
      schema: schemas.listPostgreSQLInstancesSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getPostgreSQLInstances(params);
        return {
          content: [
            { type: 'text', text: formatDatabaseInstances(result.data) },
          ],
        };
      }
    },
    {
      name: 'get_postgresql_instance',
      description: 'Get details for a specific PostgreSQL database instance',
      schema: schemas.getPostgreSQLInstanceSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getPostgreSQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: formatDatabaseInstance(result) },
          ],
        };
      }
    },
    {
      name: 'create_postgresql_instance',
      description: 'Create a new PostgreSQL database instance',
      schema: schemas.createPostgreSQLInstanceSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.createPostgreSQLInstance(params);
        return {
          content: [
            { type: 'text', text: formatDatabaseInstance(result) },
          ],
        };
      }
    },
    {
      name: 'update_postgresql_instance',
      description: 'Update an existing PostgreSQL database instance',
      schema: schemas.updatePostgreSQLInstanceSchema.shape,
      handler: async (params, extra) => {
        const { instanceId, ...data } = params;
        const result = await client.databases.updatePostgreSQLInstance(instanceId, data);
        return {
          content: [
            { type: 'text', text: formatDatabaseInstance(result) },
          ],
        };
      }
    },
    {
      name: 'delete_postgresql_instance',
      description: 'Delete a PostgreSQL database instance',
      schema: schemas.deletePostgreSQLInstanceSchema.shape,
      handler: async (params, extra) => {
        await client.databases.deletePostgreSQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    {
      name: 'get_postgresql_credentials',
      description: 'Get credentials for a PostgreSQL database instance',
      schema: schemas.getPostgreSQLCredentialsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getPostgreSQLCredentials(params.instanceId);
        return {
          content: [
            { type: 'text', text: formatDatabaseCredentials(result) },
          ],
        };
      }
    },
    {
      name: 'reset_postgresql_credentials',
      description: 'Reset credentials for a PostgreSQL database instance',
      schema: schemas.resetPostgreSQLCredentialsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.resetPostgreSQLCredentials(params.instanceId);
        return {
          content: [
            { type: 'text', text: formatDatabaseCredentials(result) },
          ],
        };
      }
    },
    {
      name: 'get_postgresql_ssl_certificate',
      description: 'Get the SSL certificate for a PostgreSQL database instance',
      schema: schemas.getPostgreSQLSSLCertificateSchema.shape,
      handler: async (params, extra) => {
        const result = await client.databases.getPostgreSQLSSLCertificate(params.instanceId);
        return {
          content: [
            { type: 'text', text: formatSSLCertificate(result) },
          ],
        };
      }
    },
    {
      name: 'patch_postgresql_instance',
      description: 'Apply the latest updates to a PostgreSQL database instance',
      schema: schemas.patchPostgreSQLInstanceSchema.shape,
      handler: async (params, extra) => {
        await client.databases.patchPostgreSQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    {
      name: 'suspend_postgresql_instance',
      description: 'Suspend a PostgreSQL database instance',
      schema: schemas.suspendPostgreSQLInstanceSchema.shape,
      handler: async (params, extra) => {
        await client.databases.suspendPostgreSQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    {
      name: 'resume_postgresql_instance',
      description: 'Resume a suspended PostgreSQL database instance',
      schema: schemas.resumePostgreSQLInstanceSchema.shape,
      handler: async (params, extra) => {
        await client.databases.resumePostgreSQLInstance(params.instanceId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    }
  ];
  
  // Register all tools with error handling
  registerToolsWithErrorHandling(server, databaseTools);
}