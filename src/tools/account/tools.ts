import { FastMCP } from 'fastmcp';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerAccountTools(server: FastMCP, client: LinodeClient) {
  // Account operations
  server.addTool({
    name: 'get_account',
    description: 'Get your account information',
    parameters: schemas.getAccountSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getAccount();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_account',
    description: 'Update your account information',
    parameters: schemas.updateAccountSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.updateAccount(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Agreements operations
  server.addTool({
    name: 'list_agreements',
    description: 'List legal agreements',
    parameters: schemas.listAgreementsSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getAgreements();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'acknowledge_agreements',
    description: 'Acknowledge legal agreements',
    parameters: schemas.acknowledgeAgreementsSchema,
    execute: withErrorHandling(async (params) => {
      await client.account.acknowledgeAgreements(params);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Service availability operations
  server.addTool({
    name: 'list_available_services',
    description: 'List available services by region',
    parameters: schemas.listServiceAvailabilitySchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getServiceAvailability();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_region_service_availability',
    description: 'Get service availability for a specific region',
    parameters: schemas.getRegionServiceAvailabilitySchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getRegionServiceAvailability(params.regionId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Account cancellation
  server.addTool({
    name: 'cancel_account',
    description: 'Cancel your account',
    parameters: schemas.cancelAccountSchema,
    execute: withErrorHandling(async (params) => {
      await client.account.cancelAccount(params);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Child account operations
  server.addTool({
    name: 'list_child_accounts',
    description: 'List child accounts',
    parameters: schemas.listChildAccountsSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getChildAccounts(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_child_account',
    description: 'Get a child account',
    parameters: schemas.getChildAccountSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getChildAccount(params.euuid);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_proxy_token',
    description: 'Create a proxy user token for a child account',
    parameters: schemas.createProxyTokenSchema,
    execute: withErrorHandling(async (params) => {
      const { euuid, ...data } = params;
      const result = await client.account.createProxyToken(euuid, data);
      return JSON.stringify(result, null, 2);
    })
  });

  // Event operations
  server.addTool({
    name: 'list_events',
    description: 'List account events',
    parameters: schemas.listEventsSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getEvents(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_event',
    description: 'Get a specific event',
    parameters: schemas.getEventSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getEvent(params.eventId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'mark_event_as_read',
    description: 'Mark an event as read',
    parameters: schemas.markEventAsReadSchema,
    execute: withErrorHandling(async (params) => {
      await client.account.markEventAsRead(params.eventId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'mark_event_as_seen',
    description: 'Mark an event as seen',
    parameters: schemas.markEventAsSeenSchema,
    execute: withErrorHandling(async (params) => {
      await client.account.markEventAsSeen(params.eventId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Invoice operations
  server.addTool({
    name: 'list_invoices',
    description: 'List invoices',
    parameters: schemas.listInvoicesSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getInvoices(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_invoice',
    description: 'Get a specific invoice',
    parameters: schemas.getInvoiceSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getInvoice(params.invoiceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'list_invoice_items',
    description: 'List items for a specific invoice',
    parameters: schemas.listInvoiceItemsSchema,
    execute: withErrorHandling(async (params: { invoiceId: number; page?: number; page_size?: number }) => {
      const { invoiceId, ...paginationParams } = params;
      const result = await client.account.getInvoiceItems(invoiceId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Login operations
  server.addTool({
    name: 'list_account_logins',
    description: 'List account logins',
    parameters: schemas.listAccountLoginsSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getLogins(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_account_login',
    description: 'Get a specific account login',
    parameters: schemas.getAccountLoginSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getLogin(params.loginId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Maintenance operations
  server.addTool({
    name: 'list_maintenances',
    description: 'List maintenance events',
    parameters: schemas.listMaintenancesSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getMaintenances(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Notification operations
  server.addTool({
    name: 'list_notifications',
    description: 'List notifications',
    parameters: schemas.listNotificationsSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getNotifications();
      return JSON.stringify(result, null, 2);
    })
  });

  // OAuth client operations
  server.addTool({
    name: 'list_oauth_clients',
    description: 'List OAuth clients',
    parameters: schemas.listOAuthClientsSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getOAuthClients(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_oauth_client',
    description: 'Create an OAuth client',
    parameters: schemas.createOAuthClientSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.createOAuthClient(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_oauth_client',
    description: 'Get an OAuth client',
    parameters: schemas.getOAuthClientSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getOAuthClient(params.clientId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_oauth_client',
    description: 'Update an OAuth client',
    parameters: schemas.updateOAuthClientSchema,
    execute: withErrorHandling(async (params) => {
      const { clientId, ...data } = params;
      const result = await client.account.updateOAuthClient(clientId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_oauth_client',
    description: 'Delete an OAuth client',
    parameters: schemas.deleteOAuthClientSchema,
    execute: withErrorHandling(async (params) => {
      await client.account.deleteOAuthClient(params.clientId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'reset_oauth_client_secret',
    description: 'Reset an OAuth client secret',
    parameters: schemas.resetOAuthClientSecretSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.resetOAuthClientSecret(params.clientId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Account settings operations
  server.addTool({
    name: 'get_account_settings',
    description: 'Get account settings',
    parameters: schemas.getAccountSettingsSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getAccountSettings();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_account_settings',
    description: 'Update account settings',
    parameters: schemas.updateAccountSettingsSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.updateAccountSettings(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'enable_managed_service',
    description: 'Enable Linode Managed service',
    parameters: schemas.enableManagedServiceSchema,
    execute: withErrorHandling(async (params) => {
      await client.account.enableManagedService();
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Network transfer operations
  server.addTool({
    name: 'get_account_network_transfer',
    description: 'Get network transfer information for the entire account',
    parameters: schemas.getAccountNetworkTransferSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getNetworkTransfer();
      return JSON.stringify(result, null, 2);
    })
  });

  // User operations
  server.addTool({
    name: 'list_users',
    description: 'List users',
    parameters: schemas.listUsersSchema,
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getUsers(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_user',
    description: 'Create a user',
    parameters: schemas.createUserSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.createUser(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_user',
    description: 'Get a user',
    parameters: schemas.getUserSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getUser(params.username);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_user',
    description: 'Update a user',
    parameters: schemas.updateUserSchema,
    execute: withErrorHandling(async (params) => {
      const { username, ...data } = params;
      const result = await client.account.updateUser(username, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_user',
    description: 'Delete a user',
    parameters: schemas.deleteUserSchema,
    execute: withErrorHandling(async (params) => {
      await client.account.deleteUser(params.username);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  server.addTool({
    name: 'get_user_grants',
    description: 'Get a user\'s grants',
    parameters: schemas.getUserGrantsSchema,
    execute: withErrorHandling(async (params) => {
      const result = await client.account.getUserGrants(params.username);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_user_grants',
    description: 'Update a user\'s grants',
    parameters: schemas.updateUserGrantsSchema,
    execute: withErrorHandling(async (params) => {
      const { username, ...data } = params;
      const updateData = data as any; // Type assertion to resolve the type mismatch
      const result = await client.account.updateUserGrants(username, updateData);
      return JSON.stringify(result, null, 2);
    })
  });
}
