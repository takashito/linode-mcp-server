import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

/**
 * Registers domain tools with the MCP server
 */
export function registerDomainTools(server: FastMCP) {
  // Domain operations
  server.addTool({
    name: 'list_domains',
    description: 'Get a list of all domains',
    parameters: mcpInput(schemas.listDomainsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).domains.getDomains(params);
      return JSON.stringify(result.data, null, 2);
    })
  });
  server.addTool({
    name: 'get_domain',
    description: 'Get details for a specific domain',
    parameters: mcpInput(schemas.getDomainSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).domains.getDomain(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_domain',
    description: 'Create a new domain',
    parameters: mcpInput(schemas.createDomainSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).domains.createDomain(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_domain',
    description: 'Update an existing domain',
    parameters: mcpInput(schemas.updateDomainSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...data } = params;
      const result = await createClient(context).domains.updateDomain(id, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_domain',
    description: 'Delete a domain',
    parameters: mcpInput(schemas.deleteDomainSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).domains.deleteDomain(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'get_zone_file',
    description: 'Get DNS zone file for a domain',
    parameters: mcpInput(schemas.getZoneFileSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).domains.getZoneFile(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  // Domain record operations
  server.addTool({
    name: 'list_domain_records',
    description: 'Get a list of all records for a domain',
    parameters: mcpInput(schemas.listDomainRecordsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).domains.getDomainRecords(params.domainId, {
        page: params.page,
        page_size: params.page_size
      });
      return JSON.stringify(result.data, null, 2);
    })
  });
  server.addTool({
    name: 'get_domain_record',
    description: 'Get details for a specific domain record',
    parameters: mcpInput(schemas.getDomainRecordSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).domains.getDomainRecord(params.domainId, params.recordId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_domain_record',
    description: 'Create a new domain record',
    parameters: mcpInput(schemas.createDomainRecordSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { domainId, ...data } = params;
      const result = await createClient(context).domains.createDomainRecord(domainId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_domain_record',
    description: 'Update an existing domain record',
    parameters: mcpInput(schemas.updateDomainRecordSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { domainId, recordId, ...data } = params;
      const result = await createClient(context).domains.updateDomainRecord(domainId, recordId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_domain_record',
    description: 'Delete a domain record',
    parameters: mcpInput(schemas.deleteDomainRecordSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).domains.deleteDomainRecord(params.domainId, params.recordId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  // Domain import/clone operations
  server.addTool({
    name: 'import_domain_zone',
    description: 'Import a domain zone from a remote nameserver',
    parameters: mcpInput(schemas.importZoneSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).domains.importZone(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'clone_domain',
    description: 'Clone an existing domain to a new domain',
    parameters: mcpInput(schemas.cloneDomainSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, domain } = params;
      const result = await createClient(context).domains.cloneDomain(id, { domain });
      return JSON.stringify(result, null, 2);
    })
  });
}