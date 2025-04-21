import { z } from 'zod';

// Longview Client schemas
export const LongviewClientSchema = z.object({
  id: z.number(),
  label: z.string(),
  api_key: z.string(),
  install_code: z.string(),
  apps: z.object({
    apache: z.boolean(),
    nginx: z.boolean(),
    mysql: z.boolean()
  }),
  created: z.string(),
  updated: z.string()
});

// List clients schema
export const listLongviewClientsSchema = z.object({
  page: z.number().optional().describe('Page number of results to return.'),
  page_size: z.number().optional().describe('Number of results to return per page.')
});

// Get client schema
export const getLongviewClientSchema = z.object({
  id: z.number().describe('ID of the Longview client to retrieve')
});

// Create client schema
export const createLongviewClientSchema = z.object({
  label: z.string().optional().describe('Label for the Longview client')
});

// Update client schema
export const updateLongviewClientSchema = z.object({
  id: z.number().describe('ID of the Longview client to update'),
  label: z.string().describe('New label for the Longview client')
});

// Delete client schema
export const deleteLongviewClientSchema = z.object({
  id: z.number().describe('ID of the Longview client to delete')
});

// Longview Subscription schemas
export const LongviewSubscriptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  clients_included: z.number(),
  price: z.object({
    hourly: z.number(),
    monthly: z.number()
  })
});

// List subscriptions schema
export const listLongviewSubscriptionsSchema = z.object({
  page: z.number().optional().describe('Page number of results to return.'),
  page_size: z.number().optional().describe('Number of results to return per page.')
});

// Get subscription schema
export const getLongviewSubscriptionSchema = z.object({
  id: z.string().describe('ID of the Longview subscription to retrieve')
});

// Longview Data schemas
export const LongviewDataSchema = z.object({
  timestamp: z.number(),
  uptime: z.number(),
  packages: z.object({
    updates: z.number()
  }),
  load: z.tuple([z.number(), z.number(), z.number()]),
  cpu: z.object({
    user: z.number(),
    nice: z.number(),
    system: z.number(),
    wait: z.number(),
    idle: z.number()
  }),
  memory: z.object({
    total: z.number(),
    used: z.number(),
    free: z.number(),
    buffers: z.number(),
    cached: z.number(),
    swap_total: z.number(),
    swap_used: z.number(),
    swap_free: z.number()
  }),
  network: z.record(z.object({
    rx_bytes: z.number(),
    tx_bytes: z.number(),
    rx_packets: z.number(),
    tx_packets: z.number()
  })),
  disk: z.record(z.object({
    fs: z.string(),
    mount_point: z.string(),
    total: z.number(),
    used: z.number(),
    free: z.number()
  })),
  processes: z.record(z.object({
    user: z.string(),
    count: z.number(),
    cpu: z.number(),
    mem: z.number()
  }))
});

// Get data schema
export const getLongviewDataSchema = z.object({
  id: z.number().describe('ID of the Longview client to get data from')
});