import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerAccountTools(server: McpServer, client: LinodeClient) {
  // Account operations
  server.tool(
    'get_account',
    'Get your account information',
    schemas.getAccountSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getAccount();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_account',
    'Update your account information',
    schemas.updateAccountSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.updateAccount(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Agreements operations
  server.tool(
    'list_agreements',
    'List legal agreements',
    schemas.listAgreementsSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getAgreements();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'acknowledge_agreements',
    'Acknowledge legal agreements',
    schemas.acknowledgeAgreementsSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.account.acknowledgeAgreements(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  // Service availability operations
  server.tool(
    'list_available_services',
    'List available services by region',
    schemas.listServiceAvailabilitySchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getServiceAvailability();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_region_service_availability',
    'Get service availability for a specific region',
    schemas.getRegionServiceAvailabilitySchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getRegionServiceAvailability(params.regionId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Account cancellation
  server.tool(
    'cancel_account',
    'Cancel your account',
    schemas.cancelAccountSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.account.cancelAccount(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  // Child account operations
  server.tool(
    'list_child_accounts',
    'List child accounts',
    schemas.listChildAccountsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getChildAccounts(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_child_account',
    'Get a child account',
    schemas.getChildAccountSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getChildAccount(params.euuid);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'create_proxy_token',
    'Create a proxy user token for a child account',
    schemas.createProxyTokenSchema.shape,
    withErrorHandling(async (params, extra) => {
      const { euuid, ...data } = params;
      const result = await client.account.createProxyToken(euuid, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Event operations
  server.tool(
    'list_events',
    'List account events',
    schemas.listEventsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getEvents(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_event',
    'Get a specific event',
    schemas.getEventSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getEvent(params.eventId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'mark_event_as_read',
    'Mark an event as read',
    schemas.markEventAsReadSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.account.markEventAsRead(params.eventId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'mark_event_as_seen',
    'Mark an event as seen',
    schemas.markEventAsSeenSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.account.markEventAsSeen(params.eventId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  // Invoice operations
  server.tool(
    'list_invoices',
    'List invoices',
    schemas.listInvoicesSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getInvoices(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_invoice',
    'Get a specific invoice',
    schemas.getInvoiceSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getInvoice(params.invoiceId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'list_invoice_items',
    'List items for a specific invoice',
    schemas.listInvoiceItemsSchema.shape,
    withErrorHandling(async (params: { invoiceId: number; page?: number; page_size?: number }, extra) => {
      const { invoiceId, ...paginationParams } = params;
      const result = await client.account.getInvoiceItems(invoiceId, paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Login operations
  server.tool(
    'list_account_logins',
    'List account logins',
    schemas.listAccountLoginsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getLogins(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_account_login',
    'Get a specific account login',
    schemas.getAccountLoginSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getLogin(params.loginId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Maintenance operations
  server.tool(
    'list_maintenances',
    'List maintenance events',
    schemas.listMaintenancesSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getMaintenances(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Notification operations
  server.tool(
    'list_notifications',
    'List notifications',
    schemas.listNotificationsSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getNotifications();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // OAuth client operations
  server.tool(
    'list_oauth_clients',
    'List OAuth clients',
    schemas.listOAuthClientsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getOAuthClients(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'create_oauth_client',
    'Create an OAuth client',
    schemas.createOAuthClientSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.createOAuthClient(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_oauth_client',
    'Get an OAuth client',
    schemas.getOAuthClientSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getOAuthClient(params.clientId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_oauth_client',
    'Update an OAuth client',
    schemas.updateOAuthClientSchema.shape,
    withErrorHandling(async (params, extra) => {
      const { clientId, ...data } = params;
      const result = await client.account.updateOAuthClient(clientId, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'delete_oauth_client',
    'Delete an OAuth client',
    schemas.deleteOAuthClientSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.account.deleteOAuthClient(params.clientId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'reset_oauth_client_secret',
    'Reset an OAuth client secret',
    schemas.resetOAuthClientSecretSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.resetOAuthClientSecret(params.clientId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // Account settings operations
  server.tool(
    'get_account_settings',
    'Get account settings',
    schemas.getAccountSettingsSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getAccountSettings();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_account_settings',
    'Update account settings',
    schemas.updateAccountSettingsSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.updateAccountSettings(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'enable_managed_service',
    'Enable Linode Managed service',
    schemas.enableManagedServiceSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.account.enableManagedService();
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  // Network transfer operations
  server.tool(
    'get_network_transfer',
    'Get network transfer information',
    schemas.getAccountNetworkTransferSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getNetworkTransfer();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // User operations
  server.tool(
    'list_users',
    'List users',
    schemas.listUsersSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.account.getUsers(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'create_user',
    'Create a user',
    schemas.createUserSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.createUser(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_user',
    'Get a user',
    schemas.getUserSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getUser(params.username);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_user',
    'Update a user',
    schemas.updateUserSchema.shape,
    withErrorHandling(async (params, extra) => {
      const { username, ...data } = params;
      const result = await client.account.updateUser(username, data);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'delete_user',
    'Delete a user',
    schemas.deleteUserSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.account.deleteUser(params.username);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_user_grants',
    'Get a user\'s grants',
    schemas.getUserGrantsSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.account.getUserGrants(params.username);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_user_grants',
    'Update a user\'s grants',
    schemas.updateUserGrantsSchema.shape,
    withErrorHandling(async (params, extra) => {
      const { username, ...data } = params;
      const updateData = data as any; // Type assertion to resolve the type mismatch
      const result = await client.account.updateUserGrants(username, updateData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
}
