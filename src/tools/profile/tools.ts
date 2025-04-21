import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerProfileTools(server: McpServer, client: LinodeClient) {
  // Profile operations
  server.tool(
    'get_profile',
    'Get your user profile information',
    schemas.getProfileSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.getProfile();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_profile',
    'Update your user profile information',
    schemas.updateProfileSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.updateProfile(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  // SSH Key operations
  server.tool(
    'list_ssh_keys',
    'List SSH keys associated with your profile',
    schemas.listSSHKeysSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.profile.getSSHKeys(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_ssh_key',
    'Get details for a specific SSH key',
    schemas.getSSHKeySchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.getSSHKey(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'create_ssh_key',
    'Add a new SSH key to your profile',
    schemas.createSSHKeySchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.createSSHKey(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_ssh_key',
    'Update an existing SSH key',
    schemas.updateSSHKeySchema.shape,
    withErrorHandling(async (params, extra) => {
      const { id, ...updateData } = params;
      const result = await client.profile.updateSSHKey(id, updateData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'delete_ssh_key',
    'Delete an SSH key from your profile',
    schemas.deleteSSHKeySchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.deleteSSHKey(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  // API Token operations
  server.tool(
    'list_api_tokens',
    'List API tokens associated with your profile',
    schemas.listAPITokensSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.profile.getAPITokens(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'get_api_token',
    'Get details for a specific API token',
    schemas.getAPITokenSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.getAPIToken(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'create_personal_access_token',
    'Create a new personal access token',
    schemas.createPersonalAccessTokenSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.createPersonalAccessToken(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'update_api_token',
    'Update an existing API token',
    schemas.updateTokenSchema.shape,
    withErrorHandling(async (params, extra) => {
      const { id, ...updateData } = params;
      const result = await client.profile.updateToken(id, updateData);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'delete_api_token',
    'Delete an API token',
    schemas.deleteTokenSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.deleteToken(params.id);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  // Two-Factor Authentication operations
  server.tool(
    'get_two_factor_secret',
    'Get a two-factor authentication secret and QR code',
    schemas.getTwoFactorSecretSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.getTwoFactorSecret();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'enable_two_factor',
    'Enable two-factor authentication for your account',
    schemas.enableTwoFactorSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.enableTwoFactor(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );

  server.tool(
    'disable_two_factor',
    'Disable two-factor authentication for your account',
    schemas.disableTwoFactorSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.disableTwoFactor(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );
  
  // Authorized Apps operations
  server.tool(
    'list_authorized_apps',
    'List OAuth apps authorized to access your account',
    schemas.listAuthorizedAppsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.profile.getAuthorizedApps(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  server.tool(
    'get_authorized_app',
    'Get details about a specific authorized OAuth app',
    schemas.getAuthorizedAppSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.getAuthorizedApp(params.appId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  server.tool(
    'revoke_authorized_app',
    'Revoke access for an authorized OAuth app',
    schemas.revokeAuthorizedAppSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.revokeAuthorizedApp(params.appId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );
  
  // Trusted Devices operations
  server.tool(
    'list_trusted_devices',
    'List devices trusted for two-factor authentication',
    schemas.listTrustedDevicesSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.profile.getTrustedDevices(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  server.tool(
    'get_trusted_device',
    'Get details about a specific trusted device',
    schemas.getTrustedDeviceSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.getTrustedDevice(params.deviceId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  server.tool(
    'revoke_trusted_device',
    'Revoke trusted status for a device',
    schemas.revokeTrustedDeviceSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.revokeTrustedDevice(params.deviceId);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );
  
  // Grants operations
  server.tool(
    'list_grants',
    'List grants for a restricted user',
    schemas.listGrantsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.profile.getGrants(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  // Logins operations
  server.tool(
    'list_logins',
    'List login history for your account',
    schemas.listLoginsSchema.shape,
    withErrorHandling(async (params: { page?: number; page_size?: number }, extra) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await client.profile.getLogins(paginationParams);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  server.tool(
    'get_login',
    'Get details about a specific login event',
    schemas.getLoginSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.getLogin(params.loginId);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  // Phone Number operations
  server.tool(
    'delete_phone_number',
    'Delete the phone number associated with your account',
    schemas.deletePhoneNumberSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.deletePhoneNumber();
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true }, null, 2) },
        ],
      };
    })
  );
  
  server.tool(
    'send_phone_verification',
    'Send a verification code to a phone number',
    schemas.sendPhoneVerificationSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.sendPhoneVerification(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true, message: "Verification code sent" }, null, 2) },
        ],
      };
    })
  );
  
  server.tool(
    'verify_phone_number',
    'Verify a phone number with a received code',
    schemas.verifyPhoneNumberSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.verifyPhoneNumber(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true, message: "Phone number verified" }, null, 2) },
        ],
      };
    })
  );
  
  // User Preferences operations
  server.tool(
    'get_user_preferences',
    'Get user interface preferences',
    schemas.getUserPreferencesSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.getUserPreferences();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  server.tool(
    'update_user_preferences',
    'Update user interface preferences',
    schemas.updateUserPreferencesSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.updateUserPreferences(params);
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  // Security Questions operations
  server.tool(
    'get_security_questions',
    'Get available security questions',
    schemas.getSecurityQuestionsSchema.shape,
    withErrorHandling(async (params, extra) => {
      const result = await client.profile.getSecurityQuestions();
      return {
        content: [
          { type: 'text', text: JSON.stringify(result, null, 2) },
        ],
      };
    })
  );
  
  server.tool(
    'answer_security_questions',
    'Answer security questions for account recovery',
    schemas.answerSecurityQuestionsSchema.shape,
    withErrorHandling(async (params, extra) => {
      await client.profile.answerSecurityQuestions(params.answers);
      return {
        content: [
          { type: 'text', text: JSON.stringify({ success: true, message: "Security questions answered" }, null, 2) },
        ],
      };
    })
  );
  
  // API Scopes operations
  server.tool(
    'list_api_scopes',
    'List all available API scopes for tokens and OAuth clients',
    schemas.listAPIScopesSchema.shape,
    withErrorHandling(async (params, extra) => {
      
      // Group by category if no specific category is requested
      let content;
      if (!params.category) {
        const groupedByCategory: Record<string, Array<{name: string, description: string}>> = {};
        
        for (const scope of schemas.API_SCOPES) {
          if (!groupedByCategory[scope.category]) {
            groupedByCategory[scope.category] = [];
          }
          groupedByCategory[scope.category].push({
            name: scope.name,
            description: scope.description
          });
        }
        
        content = JSON.stringify(groupedByCategory, null, 2);
      } else {
        content = JSON.stringify(schemas.API_SCOPES, null, 2);
      }
      
      return {
        content: [
          { type: 'text', text: content },
        ],
      };
    })
  );
}