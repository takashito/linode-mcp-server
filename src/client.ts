// Import the Linode API client
import axios from 'axios';

const API_ROOT = 'https://api.linode.com/v4';

/**
 * Creates and configures a Linode API client with the provided token
 */
export function createClient(token: string) {
  // Create an axios instance with the Linode API configuration
  const axiosInstance = axios.create({
    baseURL: API_ROOT,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return {
    // Instance methods
    linodes: {
      getLinodes: async (params?: { page?: number; page_size?: number }) => {
        const response = await axiosInstance.get('/linode/instances', { params });
        return response.data;
      },
      getLinodeById: async (id: number) => {
        const response = await axiosInstance.get(`/linode/instances/${id}`);
        return response.data;
      },
      createLinode: async (data: any) => {
        const response = await axiosInstance.post('/linode/instances', data);
        return response.data;
      },
      updateLinode: async (id: number, data: any) => {
        const response = await axiosInstance.put(`/linode/instances/${id}`, data);
        return response.data;
      },
      deleteLinode: async (id: number) => {
        const response = await axiosInstance.delete(`/linode/instances/${id}`);
        return response.data;
      },
      bootLinode: async (id: number, configId?: number) => {
        const data = configId ? { config_id: configId } : {};
        const response = await axiosInstance.post(`/linode/instances/${id}/boot`, data);
        return response.data;
      },
      rebootLinode: async (id: number, configId?: number) => {
        const data = configId ? { config_id: configId } : {};
        const response = await axiosInstance.post(`/linode/instances/${id}/reboot`, data);
        return response.data;
      },
      shutdownLinode: async (id: number) => {
        const response = await axiosInstance.post(`/linode/instances/${id}/shutdown`);
        return response.data;
      },
      resizeLinode: async (id: number, data: { type: string; allow_auto_disk_resize?: boolean }) => {
        const response = await axiosInstance.post(`/linode/instances/${id}/resize`, data);
        return response.data;
      }
    },
    
    // Volumes methods
    volumes: {
      getVolumes: async (params?: { page?: number; page_size?: number }) => {
        const response = await axiosInstance.get('/volumes', { params });
        return response.data;
      },
      getVolumeById: async (id: number) => {
        const response = await axiosInstance.get(`/volumes/${id}`);
        return response.data;
      },
      createVolume: async (data: any) => {
        const response = await axiosInstance.post('/volumes', data);
        return response.data;
      },
      updateVolume: async (id: number, data: any) => {
        const response = await axiosInstance.put(`/volumes/${id}`, data);
        return response.data;
      },
      deleteVolume: async (id: number) => {
        const response = await axiosInstance.delete(`/volumes/${id}`);
        return response.data;
      },
      attachVolume: async (id: number, data: { linode_id: number; config_id?: number }) => {
        const response = await axiosInstance.post(`/volumes/${id}/attach`, data);
        return response.data;
      },
      detachVolume: async (id: number) => {
        const response = await axiosInstance.post(`/volumes/${id}/detach`);
        return response.data;
      },
      resizeVolume: async (id: number, data: { size: number }) => {
        const response = await axiosInstance.post(`/volumes/${id}/resize`, data);
        return response.data;
      }
    },
    
    // Domain methods
    domains: {
      getDomains: async (params?: { page?: number; page_size?: number }) => {
        const response = await axiosInstance.get('/domains', { params });
        return response.data;
      },
      getDomain: async (id: number) => {
        const response = await axiosInstance.get(`/domains/${id}`);
        return response.data;
      },
      createDomain: async (data: any) => {
        const response = await axiosInstance.post('/domains', data);
        return response.data;
      },
      updateDomain: async (id: number, data: any) => {
        const response = await axiosInstance.put(`/domains/${id}`, data);
        return response.data;
      },
      deleteDomain: async (id: number) => {
        const response = await axiosInstance.delete(`/domains/${id}`);
        return response.data;
      },
      getDomainRecords: async (domainId: number) => {
        const response = await axiosInstance.get(`/domains/${domainId}/records`);
        return response.data;
      },
      createDomainRecord: async (domainId: number, data: any) => {
        const response = await axiosInstance.post(`/domains/${domainId}/records`, data);
        return response.data;
      },
      updateDomainRecord: async (domainId: number, recordId: number, data: any) => {
        const response = await axiosInstance.put(`/domains/${domainId}/records/${recordId}`, data);
        return response.data;
      },
      deleteDomainRecord: async (domainId: number, recordId: number) => {
        const response = await axiosInstance.delete(`/domains/${domainId}/records/${recordId}`);
        return response.data;
      }
    },
    
    // NodeBalancer methods
    nodebalancers: {
      getNodeBalancers: async (params?: { page?: number; page_size?: number }) => {
        const response = await axiosInstance.get('/nodebalancers', { params });
        return response.data;
      },
      getNodeBalancer: async (id: number) => {
        const response = await axiosInstance.get(`/nodebalancers/${id}`);
        return response.data;
      },
      createNodeBalancer: async (data: any) => {
        const response = await axiosInstance.post('/nodebalancers', data);
        return response.data;
      },
      updateNodeBalancer: async (id: number, data: any) => {
        const response = await axiosInstance.put(`/nodebalancers/${id}`, data);
        return response.data;
      },
      deleteNodeBalancer: async (id: number) => {
        const response = await axiosInstance.delete(`/nodebalancers/${id}`);
        return response.data;
      },
      getNodeBalancerConfigs: async (nodeBalancerId: number) => {
        const response = await axiosInstance.get(`/nodebalancers/${nodeBalancerId}/configs`);
        return response.data;
      },
      createNodeBalancerConfig: async (nodeBalancerId: number, data: any) => {
        const response = await axiosInstance.post(`/nodebalancers/${nodeBalancerId}/configs`, data);
        return response.data;
      },
      deleteNodeBalancerConfig: async (nodeBalancerId: number, configId: number) => {
        const response = await axiosInstance.delete(`/nodebalancers/${nodeBalancerId}/configs/${configId}`);
        return response.data;
      },
      getNodeBalancerConfigNodes: async (nodeBalancerId: number, configId: number) => {
        const response = await axiosInstance.get(`/nodebalancers/${nodeBalancerId}/configs/${configId}/nodes`);
        return response.data;
      },
      createNodeBalancerConfigNode: async (nodeBalancerId: number, configId: number, data: any) => {
        const response = await axiosInstance.post(`/nodebalancers/${nodeBalancerId}/configs/${configId}/nodes`, data);
        return response.data;
      },
      deleteNodeBalancerConfigNode: async (nodeBalancerId: number, configId: number, nodeId: number) => {
        const response = await axiosInstance.delete(`/nodebalancers/${nodeBalancerId}/configs/${configId}/nodes/${nodeId}`);
        return response.data;
      }
    },
    
    // Region and type methods
    regions: {
      getRegions: async () => {
        const response = await axiosInstance.get('/regions');
        return response.data;
      },
      getRegion: async (id: string) => {
        const response = await axiosInstance.get(`/regions/${id}`);
        return response.data;
      }
    },
    linodeTypes: {
      getTypes: async () => {
        const response = await axiosInstance.get('/linode/types');
        return response.data;
      },
      getType: async (id: string) => {
        const response = await axiosInstance.get(`/linode/types/${id}`);
        return response.data;
      }
    },
    images: {
      getImages: async (params?: { page?: number; page_size?: number }) => {
        const response = await axiosInstance.get('/images', { params });
        return response.data;
      },
      getImage: async (id: string) => {
        const response = await axiosInstance.get(`/images/${id}`);
        return response.data;
      }
    }
  };
}

export type LinodeClient = ReturnType<typeof createClient>;
