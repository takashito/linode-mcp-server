import axios, { AxiosInstance } from 'axios';

export interface SupportClient {
  listTickets(params?: { page?: number; page_size?: number }): Promise<any>;
  getTicket(ticketId: number): Promise<any>;
  createTicket(data: any): Promise<any>;
  closeTicket(ticketId: number): Promise<any>;
  listReplies(ticketId: number, params?: { page?: number; page_size?: number }): Promise<any>;
  createReply(ticketId: number, data: any): Promise<any>;
  uploadAttachment(ticketId: number, file: File): Promise<any>;
}

export function createSupportClient(baseURL: string, token: string): SupportClient {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return {
    listTickets: async (params) => {
      const response = await axiosInstance.get('/support/tickets', { params });
      return response.data;
    },

    getTicket: async (ticketId) => {
      const response = await axiosInstance.get(`/support/tickets/${ticketId}`);
      return response.data;
    },

    createTicket: async (data) => {
      const response = await axiosInstance.post('/support/tickets', data);
      return response.data;
    },

    closeTicket: async (ticketId) => {
      const response = await axiosInstance.post(`/support/tickets/${ticketId}/close`);
      return response.data;
    },

    listReplies: async (ticketId, params) => {
      const response = await axiosInstance.get(`/support/tickets/${ticketId}/replies`, { params });
      return response.data;
    },

    createReply: async (ticketId, data) => {
      const response = await axiosInstance.post(`/support/tickets/${ticketId}/replies`, data);
      return response.data;
    },

    uploadAttachment: async (ticketId, file) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axiosInstance.post(`/support/tickets/${ticketId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    },
  };
}