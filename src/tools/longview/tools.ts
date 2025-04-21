import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerLongviewTools(server: McpServer, client: LinodeClient) {
  // Longview client operations
  server.tool(
    'list_longview_clients',
    'Get a list of all Longview clients',
    schemas.listLongviewClientsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.longview.getLongviewClients(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_longview_client',
    'Get details for a specific Longview client',
    schemas.getLongviewClientSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.longview.getLongviewClient(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'create_longview_client',
    'Create a new Longview client',
    schemas.createLongviewClientSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.longview.createLongviewClient(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_longview_client',
    'Update a Longview client',
    schemas.updateLongviewClientSchema.shape,
    withErrorHandling(async (params, extra) => {
      const { id, ...updateData } = params;
      const result = await client.longview.updateLongviewClient(id, updateData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'delete_longview_client',
    'Delete a Longview client',
    schemas.deleteLongviewClientSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.longview.deleteLongviewClient(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  // Longview subscription operations
  server.tool(
    'list_longview_subscriptions',
    'Get a list of all Longview subscription plans',
    schemas.listLongviewSubscriptionsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.longview.getLongviewSubscriptions(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_longview_subscription',
    'Get details for a specific Longview subscription plan',
    schemas.getLongviewSubscriptionSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.longview.getLongviewSubscription(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Longview data operations
  server.tool(
    'get_longview_data',
    'Get monitoring data from a Longview client',
    schemas.getLongviewDataSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.longview.getLongviewData(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
}