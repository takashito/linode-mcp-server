import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient, Domain, DomainRecord } from '../../client';
import * as schemas from './schemas';
import { registerToolsWithErrorHandling, ToolRegistration } from '../common/errorHandler';

/**
 * Formats a domain for display
 */
function formatDomain(domain: Domain): string {
  const details = [
    `ID: ${domain.id}`,
    `Domain: ${domain.domain}`,
    `Type: ${domain.type}`,
    `Status: ${domain.status}`,
    `Created: ${new Date(domain.created).toLocaleString()}`,
    `Updated: ${new Date(domain.updated).toLocaleString()}`
  ];

  if (domain.description) {
    details.push(`Description: ${domain.description}`);
  }

  if (domain.soa_email) {
    details.push(`SOA Email: ${domain.soa_email}`);
  }

  if (domain.ttl_sec) {
    details.push(`TTL: ${domain.ttl_sec} seconds`);
  }

  if (domain.refresh_sec) {
    details.push(`Refresh: ${domain.refresh_sec} seconds`);
  }

  if (domain.retry_sec) {
    details.push(`Retry: ${domain.retry_sec} seconds`);
  }

  if (domain.expire_sec) {
    details.push(`Expire: ${domain.expire_sec} seconds`);
  }

  if (domain.master_ips && domain.master_ips.length > 0) {
    details.push(`Master IPs: ${domain.master_ips.join(', ')}`);
  }

  if (domain.axfr_ips && domain.axfr_ips.length > 0) {
    details.push(`AXFR IPs: ${domain.axfr_ips.join(', ')}`);
  }

  if (domain.tags && domain.tags.length > 0) {
    details.push(`Tags: ${domain.tags.join(', ')}`);
  }

  return details.join('\n');
}

/**
 * Formats domains for display
 */
function formatDomains(domains: Domain[]): string {
  if (domains.length === 0) {
    return 'No domains found.';
  }

  const formattedDomains = domains.map((domain) => {
    return `${domain.domain} (ID: ${domain.id}, Type: ${domain.type}, Status: ${domain.status})`;
  });

  return formattedDomains.join('\n');
}

/**
 * Formats a domain record for display
 */
function formatDomainRecord(record: DomainRecord): string {
  const details = [
    `ID: ${record.id}`,
    `Name: ${record.name}`,
    `Type: ${record.type}`,
    `Target: ${record.target}`,
    `Created: ${new Date(record.created).toLocaleString()}`,
    `Updated: ${new Date(record.updated).toLocaleString()}`
  ];

  if (record.priority !== undefined) {
    details.push(`Priority: ${record.priority}`);
  }

  if (record.weight !== undefined) {
    details.push(`Weight: ${record.weight}`);
  }

  if (record.port !== undefined) {
    details.push(`Port: ${record.port}`);
  }

  if (record.service) {
    details.push(`Service: ${record.service}`);
  }

  if (record.protocol) {
    details.push(`Protocol: ${record.protocol}`);
  }

  if (record.ttl_sec) {
    details.push(`TTL: ${record.ttl_sec} seconds`);
  }

  if (record.tag) {
    details.push(`Tag: ${record.tag}`);
  }

  return details.join('\n');
}

/**
 * Formats domain records for display
 */
function formatDomainRecords(records: DomainRecord[]): string {
  if (records.length === 0) {
    return 'No domain records found.';
  }

  const formattedRecords = records.map((record) => {
    let recordInfo = `${record.name} (ID: ${record.id}, Type: ${record.type}, Target: ${record.target}`;
    
    if (record.priority !== undefined) {
      recordInfo += `, Priority: ${record.priority}`;
    }
    
    recordInfo += ')';
    return recordInfo;
  });

  return formattedRecords.join('\n');
}

/**
 * Registers domain tools with the MCP server
 */
export function registerDomainTools(server: McpServer, client: LinodeClient) {
  // Define all domain tools with error handling
  const domainTools: ToolRegistration[] = [
    // Domain operations
    {
      name: 'list_domains',
      description: 'Get a list of all domains',
      schema: schemas.listDomainsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.domains.getDomains(params);
        return {
          content: [
            { type: 'text', text: formatDomains(result.data) },
          ],
        };
      }
    },
    {
      name: 'get_domain',
      description: 'Get details for a specific domain',
      schema: schemas.getDomainSchema.shape,
      handler: async (params, extra) => {
        const result = await client.domains.getDomain(params.id);
        return {
          content: [
            { type: 'text', text: formatDomain(result) },
          ],
        };
      }
    },
    {
      name: 'create_domain',
      description: 'Create a new domain',
      schema: schemas.createDomainSchema.shape,
      handler: async (params, extra) => {
        const result = await client.domains.createDomain(params);
        return {
          content: [
            { type: 'text', text: formatDomain(result) },
          ],
        };
      }
    },
    {
      name: 'update_domain',
      description: 'Update an existing domain',
      schema: schemas.updateDomainSchema.shape,
      handler: async (params, extra) => {
        const { id, ...data } = params;
        const result = await client.domains.updateDomain(id, data);
        return {
          content: [
            { type: 'text', text: formatDomain(result) },
          ],
        };
      }
    },
    {
      name: 'delete_domain',
      description: 'Delete a domain',
      schema: schemas.deleteDomainSchema.shape,
      handler: async (params, extra) => {
        await client.domains.deleteDomain(params.id);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    // Domain record operations
    {
      name: 'list_domain_records',
      description: 'Get a list of all records for a domain',
      schema: schemas.listDomainRecordsSchema.shape,
      handler: async (params, extra) => {
        const result = await client.domains.getDomainRecords(params.id, {
          page: params.page,
          page_size: params.page_size
        });
        return {
          content: [
            { type: 'text', text: formatDomainRecords(result.data) },
          ],
        };
      }
    },
    {
      name: 'get_domain_record',
      description: 'Get details for a specific domain record',
      schema: schemas.getDomainRecordSchema.shape,
      handler: async (params, extra) => {
        const result = await client.domains.getDomainRecord(params.domainId, params.recordId);
        return {
          content: [
            { type: 'text', text: formatDomainRecord(result) },
          ],
        };
      }
    },
    {
      name: 'create_domain_record',
      description: 'Create a new domain record',
      schema: schemas.createDomainRecordSchema.shape,
      handler: async (params, extra) => {
        const { domainId, ...data } = params;
        const result = await client.domains.createDomainRecord(domainId, data);
        return {
          content: [
            { type: 'text', text: formatDomainRecord(result) },
          ],
        };
      }
    },
    {
      name: 'update_domain_record',
      description: 'Update an existing domain record',
      schema: schemas.updateDomainRecordSchema.shape,
      handler: async (params, extra) => {
        const { domainId, recordId, ...data } = params;
        const result = await client.domains.updateDomainRecord(domainId, recordId, data);
        return {
          content: [
            { type: 'text', text: formatDomainRecord(result) },
          ],
        };
      }
    },
    {
      name: 'delete_domain_record',
      description: 'Delete a domain record',
      schema: schemas.deleteDomainRecordSchema.shape,
      handler: async (params, extra) => {
        await client.domains.deleteDomainRecord(params.domainId, params.recordId);
        return {
          content: [
            { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
          ],
        };
      }
    },
    // Domain import/clone operations
    {
      name: 'import_domain_zone',
      description: 'Import a domain zone from a remote nameserver',
      schema: schemas.importZoneSchema.shape,
      handler: async (params, extra) => {
        const result = await client.domains.importZone(params);
        return {
          content: [
            { type: 'text', text: formatDomain(result) },
          ],
        };
      }
    },
    {
      name: 'clone_domain',
      description: 'Clone an existing domain to a new domain',
      schema: schemas.cloneDomainSchema.shape,
      handler: async (params, extra) => {
        const { id, domain } = params;
        const result = await client.domains.cloneDomain(id, { domain });
        return {
          content: [
            { type: 'text', text: formatDomain(result) },
          ],
        };
      }
    }
  ];
  
  // Register all tools with error handling
  registerToolsWithErrorHandling(server, domainTools);
}