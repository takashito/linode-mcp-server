import { z } from 'zod';
import { pagingParamsSchema, tagsSchema } from '../common/schemas';

// Domain tools schemas
export const listDomainsSchema = z.object({
  ...pagingParamsSchema.shape
});

export const getDomainSchema = z.object({
  id: z.number().describe('The ID of the domain')
});

export const createDomainSchema = z.object({
  domain: z.string().describe('The domain name. For example: example.com'),
  type: z.enum(['master', 'slave']).describe('The type of domain (master or slave)'),
  soa_email: z.string().optional().describe('Start of Authority (SOA) email address. Required for master domains.'),
  master_ips: z.array(z.string()).optional().describe('The IP addresses of the master DNS servers. Required for slave domains.'),
  description: z.string().optional().describe('A description for this domain'),
  axfr_ips: z.array(z.string()).optional().describe('The list of IPs allowed to AXFR the entire domain'),
  ttl_sec: z.number().optional().describe('Time to Live (TTL) for the domain, in seconds'),
  refresh_sec: z.number().optional().describe('The refresh interval for the domain, in seconds'),
  retry_sec: z.number().optional().describe('The retry interval for the domain, in seconds'),
  expire_sec: z.number().optional().describe('The expiry time for the domain, in seconds'),
  tags: tagsSchema
});

export const updateDomainSchema = z.object({
  id: z.number().describe('The ID of the domain'),
  domain: z.string().optional().describe('The domain name'),
  type: z.enum(['master', 'slave']).optional().describe('The type of domain (master or slave)'),
  soa_email: z.string().optional().describe('Start of Authority (SOA) email address'),
  master_ips: z.array(z.string()).optional().describe('The IP addresses of the master DNS servers'),
  description: z.string().optional().describe('A description for this domain'),
  axfr_ips: z.array(z.string()).optional().describe('The list of IPs allowed to AXFR the entire domain'),
  ttl_sec: z.number().optional().describe('Time to Live (TTL) for the domain, in seconds'),
  refresh_sec: z.number().optional().describe('The refresh interval for the domain, in seconds'),
  retry_sec: z.number().optional().describe('The retry interval for the domain, in seconds'),
  expire_sec: z.number().optional().describe('The expiry time for the domain, in seconds'),
  status: z.enum(['active', 'disabled', 'edit_mode', 'has_errors']).optional().describe('The status of the domain'),
  tags: tagsSchema
});

export const deleteDomainSchema = z.object({
  id: z.number().describe('The ID of the domain')
});

// Domain record schemas
export const listDomainRecordsSchema = z.object({
  id: z.number().describe('The ID of the domain'),
  ...pagingParamsSchema.shape
});

export const getDomainRecordSchema = z.object({
  domainId: z.number().describe('The ID of the domain'),
  recordId: z.number().describe('The ID of the record')
});

export const createDomainRecordSchema = z.object({
  domainId: z.number().describe('The ID of the domain'),
  name: z.string().describe('The name of this record, relative to the domain (e.g., "www" for www.example.com)'),
  target: z.string().describe('The target for this record (e.g., the IP address for an A record)'),
  type: z.string().describe('The type of record (A, AAAA, CAA, CNAME, MX, NS, SRV, TXT)'),
  priority: z.number().optional().describe('The priority of this record (required for MX and SRV records)'),
  weight: z.number().optional().describe('The weight for this record (required for SRV records)'),
  port: z.number().optional().describe('The port this record points to (required for SRV records)'),
  service: z.string().optional().describe('The service this record identifies (required for SRV records)'),
  protocol: z.string().optional().describe('The protocol this record uses (required for SRV records)'),
  ttl_sec: z.number().optional().describe('Time to Live (TTL) for this record, in seconds'),
  tag: z.string().optional().describe('The tag for CAA records')
});

export const updateDomainRecordSchema = z.object({
  domainId: z.number().describe('The ID of the domain'),
  recordId: z.number().describe('The ID of the record'),
  name: z.string().optional().describe('The name of this record, relative to the domain'),
  target: z.string().optional().describe('The target for this record'),
  priority: z.number().optional().describe('The priority of this record'),
  weight: z.number().optional().describe('The weight for this record'),
  port: z.number().optional().describe('The port this record points to'),
  service: z.string().optional().describe('The service this record identifies'),
  protocol: z.string().optional().describe('The protocol this record uses'),
  ttl_sec: z.number().optional().describe('Time to Live (TTL) for this record, in seconds'),
  tag: z.string().optional().describe('The tag for CAA records')
});

export const deleteDomainRecordSchema = z.object({
  domainId: z.number().describe('The ID of the domain'),
  recordId: z.number().describe('The ID of the record')
});

// Domain import/clone schemas
export const importZoneSchema = z.object({
  domain: z.string().describe('The domain name to import (e.g., example.com)'),
  remote_nameserver: z.string().describe('The remote nameserver that contains the zone to import')
});

export const cloneDomainSchema = z.object({
  id: z.number().describe('The ID of the source domain to clone'),
  domain: z.string().describe('The new domain name (e.g., clone-example.com)')
});