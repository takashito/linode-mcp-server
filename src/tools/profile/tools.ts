import { FastMCP } from 'fastmcp';
import { createClient, LinodeClient } from '../../client';
import * as schemas from './schemas';
import { withErrorHandling } from '../common/errorHandler';

export function registerProfileTools(server: FastMCP, client: LinodeClient) {
  // Profile operations
  server.addTool({
    name: 'get_profile',
    description: 'Get your user profile information',
    parameters: schemas.getProfileSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.getProfile();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_profile',
    description: 'Update your user profile information',
    parameters: schemas.updateProfileSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.updateProfile(params);
      return JSON.stringify(result, null, 2);
    })
  });

  // SSH Key operations
  server.addTool({
    name: 'list_ssh_keys',
    description: 'List SSH keys associated with your profile',
    parameters: schemas.listSSHKeysSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).profile.getSSHKeys(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_ssh_key',
    description: 'Get details for a specific SSH key',
    parameters: schemas.getSSHKeySchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.getSSHKey(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_ssh_key',
    description: 'Add a new SSH key to your profile',
    parameters: schemas.createSSHKeySchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.createSSHKey(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_ssh_key',
    description: 'Update an existing SSH key',
    parameters: schemas.updateSSHKeySchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...updateData } = params;
      const result = await createClient(context, server).profile.updateSSHKey(id, updateData);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_ssh_key',
    description: 'Delete an SSH key from your profile',
    parameters: schemas.deleteSSHKeySchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.deleteSSHKey(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // API Token operations
  server.addTool({
    name: 'list_api_tokens',
    description: 'List API tokens associated with your profile',
    parameters: schemas.listAPITokensSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).profile.getAPITokens(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_api_token',
    description: 'Get details for a specific API token',
    parameters: schemas.getAPITokenSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.getAPIToken(params.id);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'create_personal_access_token',
    description: 'Create a new personal access token',
    parameters: schemas.createPersonalAccessTokenSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.createPersonalAccessToken(params);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_api_token',
    description: 'Update an existing API token',
    parameters: schemas.updateTokenSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const { id, ...updateData } = params;
      const result = await createClient(context, server).profile.updateToken(id, updateData);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'delete_api_token',
    description: 'Delete an API token',
    parameters: schemas.deleteTokenSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.deleteToken(params.id);
      return JSON.stringify({ success: true }, null, 2);
    })
  });

  // Two-Factor Authentication operations
  server.addTool({
    name: 'get_two_factor_secret',
    description: 'Get a two-factor authentication secret and QR code',
    parameters: schemas.getTwoFactorSecretSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.getTwoFactorSecret();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'enable_two_factor',
    description: 'Enable two-factor authentication for your account',
    parameters: schemas.enableTwoFactorSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.enableTwoFactor(params);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'disable_two_factor',
    description: 'Disable two-factor authentication for your account',
    parameters: schemas.disableTwoFactorSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.disableTwoFactor(params);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  
  // Authorized Apps operations
  server.addTool({
    name: 'list_authorized_apps',
    description: 'List OAuth apps authorized to access your account',
    parameters: schemas.listAuthorizedAppsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).profile.getAuthorizedApps(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_authorized_app',
    description: 'Get details about a specific authorized OAuth app',
    parameters: schemas.getAuthorizedAppSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.getAuthorizedApp(params.appId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'revoke_authorized_app',
    description: 'Revoke access for an authorized OAuth app',
    parameters: schemas.revokeAuthorizedAppSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.revokeAuthorizedApp(params.appId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  
  // Trusted Devices operations
  server.addTool({
    name: 'list_trusted_devices',
    description: 'List devices trusted for two-factor authentication',
    parameters: schemas.listTrustedDevicesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).profile.getTrustedDevices(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_trusted_device',
    description: 'Get details about a specific trusted device',
    parameters: schemas.getTrustedDeviceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.getTrustedDevice(params.deviceId);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'revoke_trusted_device',
    description: 'Revoke trusted status for a device',
    parameters: schemas.revokeTrustedDeviceSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.revokeTrustedDevice(params.deviceId);
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  
  // Grants operations
  server.addTool({
    name: 'list_grants',
    description: 'List grants for a restricted user',
    parameters: schemas.listGrantsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).profile.getGrants(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  
  // Logins operations
  server.addTool({
    name: 'list_logins',
    description: 'List login history for your account',
    parameters: schemas.listLoginsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const paginationParams = {
        page: params.page,
        page_size: params.page_size
      };
      const result = await createClient(context, server).profile.getLogins(paginationParams);
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'get_login',
    description: 'Get details about a specific login event',
    parameters: schemas.getLoginSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.getLogin(params.loginId);
      return JSON.stringify(result, null, 2);
    })
  });
  
  // Phone Number operations
  server.addTool({
    name: 'delete_phone_number',
    description: 'Delete the phone number associated with your account',
    parameters: schemas.deletePhoneNumberSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.deletePhoneNumber();
      return JSON.stringify({ success: true }, null, 2);
    })
  });
  server.addTool({
    name: 'send_phone_verification',
    description: 'Send a verification code to a phone number',
    parameters: schemas.sendPhoneVerificationSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.sendPhoneVerification(params);
      return JSON.stringify({ success: true, message: "Verification code sent" }, null, 2);
    })
  });
  server.addTool({
    name: 'verify_phone_number',
    description: 'Verify a phone number with a received code',
    parameters: schemas.verifyPhoneNumberSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.verifyPhoneNumber(params);
      return JSON.stringify({ success: true, message: "Phone number verified" }, null, 2);
    })
  });
  
  // User Preferences operations
  server.addTool({
    name: 'get_user_preferences',
    description: 'Get user interface preferences',
    parameters: schemas.getUserPreferencesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.getUserPreferences();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'update_user_preferences',
    description: 'Update user interface preferences',
    parameters: schemas.updateUserPreferencesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.updateUserPreferences(params);
      return JSON.stringify(result, null, 2);
    })
  });
  
  // Security Questions operations
  server.addTool({
    name: 'get_security_questions',
    description: 'Get available security questions',
    parameters: schemas.getSecurityQuestionsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      const result = await createClient(context, server).profile.getSecurityQuestions();
      return JSON.stringify(result, null, 2);
    })
  });
  server.addTool({
    name: 'answer_security_questions',
    description: 'Answer security questions for account recovery',
    parameters: schemas.answerSecurityQuestionsSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      await createClient(context, server).profile.answerSecurityQuestions(params.answers);
      return JSON.stringify({ success: true, message: "Security questions answered" }, null, 2);
    })
  });
  
  // API Scopes operations
  server.addTool({
    name: 'list_api_scopes',
    description: 'List all available API scopes for tokens and OAuth clients',
    parameters: schemas.listAPIScopesSchema,
    execute: withErrorHandling(async (params: any, context?: any) => {
      
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
  });
}