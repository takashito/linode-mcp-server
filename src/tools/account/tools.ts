import { FastMCP } from 'fastmcp';
import { createClient } from '../../client';
import { mcpInput } from "../common/schemas";
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerAccountTools(server: FastMCP) {
  // Account operations
  server.addTool({
    name: 'get_account',
    description: 'Get your account information',
    parameters: mcpInput(schemas.getAccountSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getAccount();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_account',
    description: 'Update your account information',
    parameters: mcpInput(schemas.updateAccountSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.updateAccount(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Agreements operations
  server.addTool({
    name: 'list_agreements',
    description: 'List legal agreements',
    parameters: mcpInput(schemas.listAgreementsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getAgreements();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'acknowledge_agreements',
    description: 'Acknowledge legal agreements',
    parameters: mcpInput(schemas.acknowledgeAgreementsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).account.acknowledgeAgreements(params);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Service availability operations
  server.addTool({
    name: 'list_available_services',
    description: 'List available services by region',
    parameters: mcpInput(schemas.listServiceAvailabilitySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getServiceAvailability();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_region_service_availability',
    description: 'Get service availability for a specific region',
    parameters: mcpInput(schemas.getRegionServiceAvailabilitySchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getRegionServiceAvailability(params.regionId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Account cancellation
  server.addTool({
    name: 'cancel_account',
    description: 'Cancel your account',
    parameters: mcpInput(schemas.cancelAccountSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).account.cancelAccount(params);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Event operations
  server.addTool({
    name: 'list_events',
    description: 'List account events',
    parameters: mcpInput(schemas.listEventsSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getEvents(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_event',
    description: 'Get a specific event',
    parameters: mcpInput(schemas.getEventSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getEvent(params.eventId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'mark_event_as_seen',
    description: 'Mark an event as seen',
    parameters: mcpInput(schemas.markEventAsSeenSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).account.markEventAsSeen(params.eventId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Invoice operations
  server.addTool({
    name: 'list_invoices',
    description: 'List invoices',
    parameters: mcpInput(schemas.listInvoicesSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getInvoices(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_invoice',
    description: 'Get a specific invoice',
    parameters: mcpInput(schemas.getInvoiceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getInvoice(params.invoiceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'list_invoice_items',
    description: 'List items for a specific invoice',
    parameters: mcpInput(schemas.listInvoiceItemsSchema),
    execute: withErrorHandling(async (params: { invoiceId: number; page?: number; page_size?: number }, context?: any) => {
      const { invoiceId, ...paginationParams } = params;
      const result = await createClient(context).account.getInvoiceItems(invoiceId, paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Login operations
  server.addTool({
    name: 'list_account_logins',
    description: 'List account logins',
    parameters: mcpInput(schemas.listAccountLoginsSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getLogins(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_account_login',
    description: 'Get a specific account login',
    parameters: mcpInput(schemas.getAccountLoginSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getLogin(params.loginId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Maintenance operations
  server.addTool({
    name: 'list_maintenances',
    description: 'List maintenance events',
    parameters: mcpInput(schemas.listMaintenancesSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getMaintenances(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Notification operations
  server.addTool({
    name: 'list_notifications',
    description: 'List notifications',
    parameters: mcpInput(schemas.listNotificationsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getNotifications();
      return JSON.stringify(result, null, 2);
    })
  });

  // OAuth client operations
  server.addTool({
    name: 'list_oauth_clients',
    description: 'List OAuth clients',
    parameters: mcpInput(schemas.listOAuthClientsSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getOAuthClients(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_oauth_client',
    description: 'Create an OAuth client',
    parameters: mcpInput(schemas.createOAuthClientSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.createOAuthClient(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_oauth_client',
    description: 'Get an OAuth client',
    parameters: mcpInput(schemas.getOAuthClientSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getOAuthClient(params.clientId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_oauth_client',
    description: 'Update an OAuth client',
    parameters: mcpInput(schemas.updateOAuthClientSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { clientId, ...data } = params;
      const result = await createClient(context).account.updateOAuthClient(clientId, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_oauth_client',
    description: 'Delete an OAuth client',
    parameters: mcpInput(schemas.deleteOAuthClientSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).account.deleteOAuthClient(params.clientId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'reset_oauth_client_secret',
    description: 'Reset an OAuth client secret',
    parameters: mcpInput(schemas.resetOAuthClientSecretSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.resetOAuthClientSecret(params.clientId);
      return JSON.stringify(result, null, 2);
    })
  });

  // Account settings operations
  server.addTool({
    name: 'get_account_settings',
    description: 'Get account settings',
    parameters: mcpInput(schemas.getAccountSettingsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getAccountSettings();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_account_settings',
    description: 'Update account settings',
    parameters: mcpInput(schemas.updateAccountSettingsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.updateAccountSettings(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'enable_managed_service',
    description: 'Enable Linode Managed service',
    parameters: mcpInput(schemas.enableManagedServiceSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).account.enableManagedService();
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Network transfer operations
  server.addTool({
    name: 'get_account_network_transfer',
    description: 'Get network transfer information for the entire account',
    parameters: mcpInput(schemas.getAccountNetworkTransferSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getNetworkTransfer();
      return JSON.stringify(result, null, 2);
    })
  });

  // User operations
  server.addTool({
    name: 'list_users',
    description: 'List users',
    parameters: mcpInput(schemas.listUsersSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getUsers(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_user',
    description: 'Create a user',
    parameters: mcpInput(schemas.createUserSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.createUser(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_user',
    description: 'Get a user',
    parameters: mcpInput(schemas.getUserSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getUser(params.username);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_user',
    description: 'Update a user',
    parameters: mcpInput(schemas.updateUserSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { username, ...data } = params;
      const result = await createClient(context).account.updateUser(username, data);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_user',
    description: 'Delete a user',
    parameters: mcpInput(schemas.deleteUserSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).account.deleteUser(params.username);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  server.addTool({
    name: 'get_user_grants',
    description: '[DEPRECATED] Get a user\'s grants. Use IAM role-permissions instead.',
    parameters: mcpInput(schemas.getUserGrantsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getUserGrants(params.username);
      return JSON.stringify(result, null, 2);
    })
  });

  server.addTool({
    name: 'update_user_grants',
    description: '[DEPRECATED] Update a user\'s grants. Use IAM role-permissions instead.',
    parameters: mcpInput(schemas.updateUserGrantsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { username, ...data } = params;
      const updateData = data as any; // Type assertion to resolve the type mismatch
      const result = await createClient(context).account.updateUserGrants(username, updateData);
      return JSON.stringify(result, null, 2);
    })
  });

  // Entity operations
  server.addTool({
    name: 'list_entities',
    description: 'List entities associated with your account',
    parameters: mcpInput(schemas.listEntitiesSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getEntities(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // IAM Role Permission operations
  server.addTool({
    name: 'list_iam_roles',
    description: 'List available IAM roles and their permissions',
    parameters: mcpInput(schemas.listIamRolesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getIamRoles();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_user_role_permissions',
    description: 'Get a user\'s IAM role permissions and access level',
    parameters: mcpInput(schemas.getUserRolePermissionsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getUserRolePermissions(params.username);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_user_role_permissions',
    description: 'Update a user\'s IAM role permissions and access level',
    parameters: mcpInput(schemas.updateUserRolePermissionsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { username, ...data } = params;
      const result = await createClient(context).account.updateUserRolePermissions(username, data);
      return JSON.stringify(result, null, 2);
    })
  });

  // Delegation Child Account operations
  server.addTool({
    name: 'list_delegation_child_accounts',
    description: 'List child accounts for delegation',
    parameters: mcpInput(schemas.listDelegationChildAccountsSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getDelegationChildAccounts(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_delegation_child_account_users',
    description: 'Get the account delegation for a child account',
    parameters: mcpInput(schemas.getDelegationChildAccountUsersSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getDelegationChildAccountUsers(params.euuid);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_delegation_child_account_users',
    description: 'Update the account delegation for a child account',
    parameters: mcpInput(schemas.updateDelegationChildAccountUsersSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { euuid, ...data } = params;
      const result = await createClient(context).account.updateDelegationChildAccountUsers(euuid, data);
      return JSON.stringify(result, null, 2);
    })
  });

  // Delegation Default Roles operations
  server.addTool({
    name: 'get_delegation_default_roles',
    description: 'Get the default role assignment for delegate users',
    parameters: mcpInput(schemas.getDelegationDefaultRolesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getDelegationDefaultRoles();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_delegation_default_roles',
    description: 'Update the default role assignment for delegate users',
    parameters: mcpInput(schemas.updateDelegationDefaultRolesSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.updateDelegationDefaultRoles(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // Delegation Profile operations
  server.addTool({
    name: 'list_delegation_profile_accounts',
    description: 'Get your account delegations',
    parameters: mcpInput(schemas.listDelegationProfileAccountsSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getDelegationProfileAccounts(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_delegation_profile_account',
    description: 'Get a child account from your delegations',
    parameters: mcpInput(schemas.getDelegationProfileAccountSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getDelegationProfileAccount(params.euuid);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_delegation_token',
    description: 'Create a delegate user token for a child account',
    parameters: mcpInput(schemas.createDelegationTokenSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.createDelegationToken(params.euuid);
      return JSON.stringify(result, null, 2);
    })
  });

  // User Delegations operations
  server.addTool({
    name: 'get_user_delegations',
    description: 'Get a user\'s account delegations',
    parameters: mcpInput(schemas.getUserDelegationsSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getUserDelegations(params.username);
      return JSON.stringify(result, null, 2);
    })
  });

  // Maintenance Policy operations
  server.addTool({
    name: 'list_maintenance_policies',
    description: 'List maintenance policies',
    parameters: mcpInput(schemas.listMaintenancePoliciesSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getMaintenancePolicies(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });

  // Resource Lock operations
  server.addTool({
    name: 'list_resource_locks',
    description: 'List resource locks on the account',
    parameters: mcpInput(schemas.listResourceLocksSchema),
    execute: withErrorHandling(async (params: { page?: number; page_size?: number }, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context).account.getResourceLocks(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_resource_lock',
    description: 'Get a specific resource lock',
    parameters: mcpInput(schemas.getResourceLockSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.getResourceLock(params.resourceLockId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_resource_lock',
    description: 'Create a resource lock',
    parameters: mcpInput(schemas.createResourceLockSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context).account.createResourceLock(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_resource_lock',
    description: 'Delete a resource lock',
    parameters: mcpInput(schemas.deleteResourceLockSchema),
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context).account.deleteResourceLock(params.resourceLockId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
}
