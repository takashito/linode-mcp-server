import { FastMCP } from 'fastmcp';
import { createClient, LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerLongviewTools(server: FastMCP, client: LinodeClient) {
  // Longview client operations
  server.addTool({
    name: 'list_longview_clients',
    description: 'Get a list of all Longview clients',
    parameters: schemas.listLongviewClientsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).longview.getLongviewClients(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_longview_client',
    description: 'Get details for a specific Longview client',
    parameters: schemas.getLongviewClientSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).longview.getLongviewClient(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_longview_client',
    description: 'Create a new Longview client',
    parameters: schemas.createLongviewClientSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).longview.createLongviewClient(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_longview_client',
    description: 'Update a Longview client',
    parameters: schemas.updateLongviewClientSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...updateData } = params;
      const result = await createClient(context, server).longview.updateLongviewClient(id, updateData);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_longview_client',
    description: 'Delete a Longview client',
    parameters: schemas.deleteLongviewClientSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).longview.deleteLongviewClient(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Longview subscription operations
  server.addTool({
    name: 'list_longview_subscriptions',
    description: 'Get a list of all Longview subscription plans',
    parameters: schemas.listLongviewSubscriptionsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).longview.getLongviewSubscriptions(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_longview_subscription',
    description: 'Get details for a specific Longview subscription plan',
    parameters: schemas.getLongviewSubscriptionSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).longview.getLongviewSubscription(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  // Longview data operations
  server.addTool({
    name: 'get_longview_data',
    description: 'Get monitoring data from a Longview client',
    parameters: schemas.getLongviewDataSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).longview.getLongviewData(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
}