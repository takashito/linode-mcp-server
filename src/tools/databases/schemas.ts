import { z } from "zod";
import { pagingParamsSchema, tagsSchema, coerceBoolean } from '../common/schemas';

// Database engine schemas
export const listEnginesSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getEngineSchema = z.object({
  engineId: z.string().describe('The ID of the database engine')
});

// Database type schemas
export const listTypesSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getTypeSchema = z.object({
  typeId: z.string().describe('The ID of the database type')
});

// General database instances schema
export const listDatabaseInstancesSchema = z.object({
  ...pagingParamsSchema.shape
});

// MySQL database schemas
export const listMySQLInstancesSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getMySQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the MySQL database instance')
});

export const createMySQLInstanceSchema = z.object({
  label: z.string().describe('A label for easy identification of the MySQL database instance'),
  region: z.string().describe('The region where the MySQL database will be deployed'),
  type: z.string().describe('The Linode database instance type that determines RAM, CPU, and storage allocations'),
  engine: z.string().describe('The MySQL engine type and version to use'),
  allow_list: z.array(z.string()).optional().describe('A list of IP addresses that can access the database instance (CIDR notation)'),
  cluster_size: z.coerce.number().optional().describe('The number of nodes in the MySQL database cluster (1-3)'),
  encrypted: coerceBoolean().optional().describe('Whether the MySQL database disks are encrypted'),
  ssl_connection: coerceBoolean().optional().describe('Whether SSL/TLS connections to the MySQL database are enforced'),
  tags: tagsSchema,
  updates: z.object({
    day_of_week: z.coerce.number().describe('The day of the week when updates should be applied (0-6, where 0 is Sunday)'),
    duration: z.coerce.number().describe('The maximum maintenance window in hours'),
    frequency: z.enum(['weekly', 'monthly']).describe('How frequently the maintenance is performed'),
    hour_of_day: z.coerce.number().describe('The hour of the day when the maintenance window starts (0-23)'),
    week_of_month: z.coerce.number().optional().describe('The week of the month when updates should be applied (1-4, required for monthly frequency)')
  }).optional().describe('MySQL database maintenance and update configuration')
});

export const updateMySQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the MySQL database instance'),
  label: z.string().optional().describe('A label for easy identification of the MySQL database instance'),
  allow_list: z.array(z.string()).optional().describe('A list of IP addresses that can access the database instance (CIDR notation)'),
  tags: tagsSchema,
  updates: z.object({
    day_of_week: z.coerce.number().optional().describe('The day of the week when updates should be applied (0-6, where 0 is Sunday)'),
    duration: z.coerce.number().optional().describe('The maximum maintenance window in hours'),
    frequency: z.enum(['weekly', 'monthly']).optional().describe('How frequently the maintenance is performed'),
    hour_of_day: z.coerce.number().optional().describe('The hour of the day when the maintenance window starts (0-23)'),
    week_of_month: z.coerce.number().optional().describe('The week of the month when updates should be applied (1-4, required for monthly frequency)')
  }).optional().describe('MySQL database maintenance and update configuration')
});

export const deleteMySQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the MySQL database instance')
});

export const getMySQLCredentialsSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the MySQL database instance')
});

export const resetMySQLCredentialsSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the MySQL database instance')
});

export const getMySQLSSLCertificateSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the MySQL database instance')
});

export const patchMySQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the MySQL database instance')
});

export const suspendMySQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the MySQL database instance')
});

export const resumeMySQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the MySQL database instance')
});

// PostgreSQL database schemas
export const listPostgreSQLInstancesSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getPostgreSQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance')
});

export const createPostgreSQLInstanceSchema = z.object({
  label: z.string().describe('A label for easy identification of the PostgreSQL database instance'),
  region: z.string().describe('The region where the PostgreSQL database will be deployed'),
  type: z.string().describe('The Linode database instance type that determines RAM, CPU, and storage allocations'),
  engine: z.string().describe('The PostgreSQL engine type and version to use'),
  allow_list: z.array(z.string()).optional().describe('A list of IP addresses that can access the database instance (CIDR notation)'),
  cluster_size: z.coerce.number().optional().describe('The number of nodes in the PostgreSQL database cluster (1-3)'),
  encrypted: coerceBoolean().optional().describe('Whether the PostgreSQL database disks are encrypted'),
  ssl_connection: coerceBoolean().optional().describe('Whether SSL/TLS connections to the PostgreSQL database are enforced'),
  tags: tagsSchema,
  updates: z.object({
    day_of_week: z.coerce.number().describe('The day of the week when updates should be applied (0-6, where 0 is Sunday)'),
    duration: z.coerce.number().describe('The maximum maintenance window in hours'),
    frequency: z.enum(['weekly', 'monthly']).describe('How frequently the maintenance is performed'),
    hour_of_day: z.coerce.number().describe('The hour of the day when the maintenance window starts (0-23)'),
    week_of_month: z.coerce.number().optional().describe('The week of the month when updates should be applied (1-4, required for monthly frequency)')
  }).optional().describe('PostgreSQL database maintenance and update configuration')
});

export const updatePostgreSQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance'),
  label: z.string().optional().describe('A label for easy identification of the PostgreSQL database instance'),
  allow_list: z.array(z.string()).optional().describe('A list of IP addresses that can access the database instance (CIDR notation)'),
  tags: tagsSchema,
  updates: z.object({
    day_of_week: z.coerce.number().optional().describe('The day of the week when updates should be applied (0-6, where 0 is Sunday)'),
    duration: z.coerce.number().optional().describe('The maximum maintenance window in hours'),
    frequency: z.enum(['weekly', 'monthly']).optional().describe('How frequently the maintenance is performed'),
    hour_of_day: z.coerce.number().optional().describe('The hour of the day when the maintenance window starts (0-23)'),
    week_of_month: z.coerce.number().optional().describe('The week of the month when updates should be applied (1-4, required for monthly frequency)')
  }).optional().describe('PostgreSQL database maintenance and update configuration')
});

export const deletePostgreSQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance')
});

export const getPostgreSQLCredentialsSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance')
});

export const resetPostgreSQLCredentialsSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance')
});

export const getPostgreSQLSSLCertificateSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance')
});

export const patchPostgreSQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance')
});

export const suspendPostgreSQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance')
});

export const resumePostgreSQLInstanceSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance')
});

// PostgreSQL Connection Pool schemas
export const listPostgreSQLConnectionPoolsSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance'),
  ...pagingParamsSchema.shape
});

export const getPostgreSQLConnectionPoolSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance'),
  poolName: z.string().describe('The name of the connection pool')
});

export const createPostgreSQLConnectionPoolSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance'),
  name: z.string().describe('The name of the connection pool'),
  database: z.string().describe('The database name for the connection pool'),
  user: z.string().describe('The database user for the connection pool'),
  mode: z.string().describe('The pool mode (e.g., transaction, session, statement)'),
  size: z.coerce.number().describe('The number of connections in the pool')
});

export const updatePostgreSQLConnectionPoolSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance'),
  poolName: z.string().describe('The name of the connection pool to update'),
  database: z.string().optional().describe('The database name for the connection pool'),
  user: z.string().optional().describe('The database user for the connection pool'),
  mode: z.string().optional().describe('The pool mode (e.g., transaction, session, statement)'),
  size: z.coerce.number().optional().describe('The number of connections in the pool')
});

export const deletePostgreSQLConnectionPoolSchema = z.object({
  instanceId: z.coerce.number().describe('The ID of the PostgreSQL database instance'),
  poolName: z.string().describe('The name of the connection pool to delete')
});

// Database Config schemas
export const getMySQLConfigSchema = z.object({});

export const getPostgreSQLConfigSchema = z.object({});