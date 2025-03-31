import { LinodeClient } from '../client';

/**
 * Operations for retrieving Linode metadata like regions and instance types
 */
export class MetaOperations {
  private client: LinodeClient;

  constructor(client: LinodeClient) {
    this.client = client;
  }

  /**
   * Get a list of all available regions
   */
  async listRegions() {
    return this.client.regions.getRegions();
  }

  /**
   * Get details for a specific region
   */
  async getRegion(id: string) {
    return this.client.regions.getRegion(id);
  }

  /**
   * Get a list of all available Linode types
   */
  async listTypes() {
    return this.client.linodeTypes.getTypes();
  }

  /**
   * Get details for a specific Linode type
   */
  async getType(id: string) {
    return this.client.linodeTypes.getType(id);
  }

  /**
   * Get a list of all available images
   */
  async listImages(params?: { page?: number; page_size?: number; }) {
    return this.client.images.getImages(params);
  }

  /**
   * Get details for a specific image
   */
  async getImage(id: string) {
    return this.client.images.getImage(id);
  }
}
