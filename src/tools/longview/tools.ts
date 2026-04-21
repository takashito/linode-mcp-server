import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerLongviewTools(server: FastMCP) {
  // Longview client operations
  server.addTool({
    name: 'list_longview_clients',
    description: 'Get a list of all Longview clients',
    parameters: mcpInput(schemas.listLongviewClientsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).longview.getLongviewClients(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_longview_client',
    description: 'Get details for a specific Longview client',
    parameters: mcpInput(schemas.getLongviewClientSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).longview.getLongviewClient(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_longview_client',
    description: 'Create a new Longview client',
    parameters: mcpInput(schemas.createLongviewClientSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).longview.createLongviewClient(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_longview_client',
    description: 'Update a Longview client',
    parameters: mcpInput(schemas.updateLongviewClientSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...updateData } = params;
      const result = await createClient(context).longview.updateLongviewClient(id, updateData);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_longview_client',
    description: 'Delete a Longview client',
    parameters: mcpInput(schemas.deleteLongviewClientSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).longview.deleteLongviewClient(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Longview subscription operations
  server.addTool({
    name: 'list_longview_subscriptions',
    description: 'Get a list of all Longview subscription plans',
    parameters: mcpInput(schemas.listLongviewSubscriptionsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).longview.getLongviewSubscriptions(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_longview_subscription',
    description: 'Get details for a specific Longview subscription plan',
    parameters: mcpInput(schemas.getLongviewSubscriptionSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).longview.getLongviewSubscription(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  // Longview data operations
  server.addTool({
    name: 'get_longview_data',
    description: 'Get monitoring data from a Longview client',
    parameters: mcpInput(schemas.getLongviewDataSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).longview.getLongviewData(params.id);
      return JSON.stringify(result, null, 2);
    })
  });

  // Longview plan operations
  server.addTool({
    name: 'get_longview_plan',
    description: 'Get the current Longview plan',
    parameters: mcpInput(schemas.getLongviewPlanSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).longview.getLongviewPlan();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_longview_plan',
    description: 'Update the Longview plan',
    parameters: mcpInput(schemas.updateLongviewPlanSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).longview.updateLongviewPlan(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Longview types operations
  server.addTool({
    name: 'list_longview_types',
    description: 'List all available Longview types',
    parameters: mcpInput(schemas.listLongviewTypesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).longview.getLongviewTypes(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
}