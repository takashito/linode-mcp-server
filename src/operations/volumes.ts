import { LinodeClient } from '../client';

/**
 * Operations for managing Linode volumes
 */
export class VolumeOperations {
  private client: LinodeClient;

  constructor(client: LinodeClient) {
    this.client = client;
  }

  /**
   * Get a list of all volumes
   */
  async listVolumes(params?: { page?: number; page_size?: number; }) {
    return this.client.volumes.getVolumes(params);
  }

  /**
   * Get details for a specific volume
   */
  async getVolume(id: number) {
    return this.client.volumes.getVolumeById(id);
  }

  /**
   * Create a new volume
   */
  async createVolume(params: {
    region: string;
    size: number;
    label: string;
    linode_id?: number;
    tags?: string[];
    config_id?: number;
  }) {
    return this.client.volumes.createVolume(params);
  }

  /**
   * Delete a volume
   */
  async deleteVolume(id: number) {
    return this.client.volumes.deleteVolume(id);
  }

  /**
   * Attach a volume to a Linode instance
   */
  async attachVolume(id: number, params: { linode_id: number; config_id?: number; }) {
    return this.client.volumes.attachVolume(id, params);
  }

  /**
   * Detach a volume from a Linode instance
   */
  async detachVolume(id: number) {
    return this.client.volumes.detachVolume(id);
  }

  /**
   * Resize a volume
   */
  async resizeVolume(id: number, size: number) {
    return this.client.volumes.resizeVolume(id, { size });
  }
}
