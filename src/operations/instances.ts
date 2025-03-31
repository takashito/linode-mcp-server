import { LinodeClient } from '../client';

/**
 * Operations for managing Linode instances
 */
export class InstanceOperations {
  private client: LinodeClient;

  constructor(client: LinodeClient) {
    this.client = client;
  }

  /**
   * Get a list of all Linode instances
   */
  async listInstances(params?: { page?: number; page_size?: number; }) {
    return this.client.linodes.getLinodes(params);
  }

  /**
   * Get details for a specific Linode instance
   */
  async getInstance(id: number) {
    return this.client.linodes.getLinodeById(id);
  }

  /**
   * Create a new Linode instance
   */
  async createInstance(params: {
    region: string;
    type: string;
    label?: string;
    root_pass: string;
    image?: string;
    authorized_keys?: string[];
    backups_enabled?: boolean;
    private_ip?: boolean;
    tags?: string[];
  }) {
    return this.client.linodes.createLinode(params);
  }

  /**
   * Reboot a Linode instance
   */
  async rebootInstance(id: number, configId?: number) {
    return this.client.linodes.rebootLinode(id, configId);
  }

  /**
   * Power on a Linode instance
   */
  async bootInstance(id: number, configId?: number) {
    return this.client.linodes.bootLinode(id, configId);
  }

  /**
   * Power off a Linode instance
   */
  async shutdownInstance(id: number) {
    return this.client.linodes.shutdownLinode(id);
  }

  /**
   * Delete a Linode instance
   */
  async deleteInstance(id: number) {
    return this.client.linodes.deleteLinode(id);
  }

  /**
   * Resize a Linode instance
   */
  async resizeInstance(id: number, type: string, allowAutoDiskResize = true) {
    return this.client.linodes.resizeLinode(id, { type, allow_auto_disk_resize: allowAutoDiskResize });
  }
}
