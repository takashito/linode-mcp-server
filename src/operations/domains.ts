import { LinodeClient } from '../client';

/**
 * Operations for managing DNS domains
 */
export class DomainOperations {
  private client: LinodeClient;

  constructor(client: LinodeClient) {
    this.client = client;
  }

  /**
   * Get a list of all domains
   */
  async listDomains(params?: { page?: number; page_size?: number; }) {
    return this.client.domains.getDomains(params);
  }

  /**
   * Get details for a specific domain
   */
  async getDomain(id: number) {
    return this.client.domains.getDomain(id);
  }

  /**
   * Create a new domain
   */
  async createDomain(params: {
    domain: string;
    type: 'master' | 'slave';
    soa_email?: string;
    master_ips?: string[];
    tags?: string[];
  }) {
    return this.client.domains.createDomain(params);
  }

  /**
   * Delete a domain
   */
  async deleteDomain(id: number) {
    return this.client.domains.deleteDomain(id);
  }

  /**
   * Get a list of all domain records for a domain
   */
  async listDomainRecords(domainId: number) {
    return this.client.domains.getDomainRecords(domainId);
  }

  /**
   * Create a new domain record
   */
  async createDomainRecord(domainId: number, params: {
    type: string;
    name: string;
    target: string;
    priority?: number;
    weight?: number;
    port?: number;
    service?: string;
    protocol?: string;
    ttl_sec?: number;
    tag?: string;
  }) {
    return this.client.domains.createDomainRecord(domainId, params);
  }

  /**
   * Update a domain record
   */
  async updateDomainRecord(domainId: number, recordId: number, params: {
    type?: string;
    name?: string;
    target?: string;
    priority?: number;
    weight?: number;
    port?: number;
    service?: string;
    protocol?: string;
    ttl_sec?: number;
    tag?: string;
  }) {
    return this.client.domains.updateDomainRecord(domainId, recordId, params);
  }

  /**
   * Delete a domain record
   */
  async deleteDomainRecord(domainId: number, recordId: number) {
    return this.client.domains.deleteDomainRecord(domainId, recordId);
  }
}
