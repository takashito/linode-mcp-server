import { z } from "zod";
import { coerceBoolean } from "../common/schemas";

// Longview Client schemas
export const LongviewClientSchema = z.object({
  id: z.coerce.number(),
  label: z.string(),
  api_key: z.string(),
  install_code: z.string(),
  apps: z.object({
    apache: coerceBoolean(),
    nginx: coerceBoolean(),
    mysql: coerceBoolean()
  }),
  created: z.string(),
  updated: z.string()
});

// List clients schema
export const listLongviewClientsSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return.'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page.')
});

// Get client schema
export const getLongviewClientSchema = z.object({
  id: z.coerce.number().describe('ID of the Longview client to retrieve')
});

// Create client schema
export const createLongviewClientSchema = z.object({
  label: z.string().optional().describe('Label for the Longview client')
});

// Update client schema
export const updateLongviewClientSchema = z.object({
  id: z.coerce.number().describe('ID of the Longview client to update'),
  label: z.string().describe('New label for the Longview client')
});

// Delete client schema
export const deleteLongviewClientSchema = z.object({
  id: z.coerce.number().describe('ID of the Longview client to delete')
});

// Longview Subscription schemas
export const LongviewSubscriptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  clients_included: z.coerce.number(),
  price: z.object({
    hourly: z.coerce.number(),
    monthly: z.coerce.number()
  })
});

// List subscriptions schema
export const listLongviewSubscriptionsSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return.'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page.')
});

// Get subscription schema
export const getLongviewSubscriptionSchema = z.object({
  id: z.string().describe('ID of the Longview subscription to retrieve')
});

// Longview Data schemas
export const LongviewDataSchema = z.object({
  timestamp: z.coerce.number(),
  uptime: z.coerce.number(),
  packages: z.object({
    updates: z.coerce.number()
  }),
  load: z.tuple([z.coerce.number(), z.coerce.number(), z.coerce.number()]),
  cpu: z.object({
    user: z.coerce.number(),
    nice: z.coerce.number(),
    system: z.coerce.number(),
    wait: z.coerce.number(),
    idle: z.coerce.number()
  }),
  memory: z.object({
    total: z.coerce.number(),
    used: z.coerce.number(),
    free: z.coerce.number(),
    buffers: z.coerce.number(),
    cached: z.coerce.number(),
    swap_total: z.coerce.number(),
    swap_used: z.coerce.number(),
    swap_free: z.coerce.number()
  }),
  network: z.record(z.object({
    rx_bytes: z.coerce.number(),
    tx_bytes: z.coerce.number(),
    rx_packets: z.coerce.number(),
    tx_packets: z.coerce.number()
  })),
  disk: z.record(z.object({
    fs: z.string(),
    mount_point: z.string(),
    total: z.coerce.number(),
    used: z.coerce.number(),
    free: z.coerce.number()
  })),
  processes: z.record(z.object({
    user: z.string(),
    count: z.coerce.number(),
    cpu: z.coerce.number(),
    mem: z.coerce.number()
  }))
});

// Get data schema
export const getLongviewDataSchema = z.object({
  id: z.coerce.number().describe('ID of the Longview client to get data from')
});

// Longview Plan schemas
export const getLongviewPlanSchema = z.object({});

export const updateLongviewPlanSchema = z.object({
  longview_subscription: z.string().describe('The subscription ID for the Longview plan (e.g., longview-3, longview-10, longview-40, longview-100)')
});

// Longview Types schema
export const listLongviewTypesSchema = z.object({
  page: z.coerce.number().optional().describe('Page number of results to return.'),
  page_size: z.coerce.number().optional().describe('Number of results to return per page.')
});