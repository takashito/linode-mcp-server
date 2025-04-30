import axios, { AxiosError } from 'axios';

/**
 * Error response format for Linode API errors
 */
export interface LinodeErrorResponse {
  errors: Array<{
    field?: string;
    reason: string;
  }>;
}

/**
 * Formats an error message from a Linode API error response
 * 
 * @param error The error from the Linode API
 * @returns A formatted error message
 */
export function formatLinodeError(error: any): string {
  // Default error message
  let errorMessage = 'An error occurred while processing your request.';

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<LinodeErrorResponse>;
    
    // Include status code and method/URL info
    const statusCode = axiosError.response?.status;
    const method = axiosError.config?.method?.toUpperCase() || 'REQUEST';
    const url = axiosError.config?.url || 'unknown endpoint';
    
    errorMessage = `API Error ${statusCode} [${method} ${url}]: `;
    
    // Format response data
    if (axiosError.response?.data?.errors && axiosError.response.data.errors.length > 0) {
      const errors = axiosError.response.data.errors;
      
      // Group errors by field
      const errorsByField: Record<string, string[]> = {};
      
      errors.forEach(err => {
        const field = err.field || 'general';
        if (!errorsByField[field]) {
          errorsByField[field] = [];
        }
        errorsByField[field].push(err.reason);
      });
      
      // Format the error message with details
      const formattedErrors = Object.entries(errorsByField).map(([field, reasons]) => {
        if (field === 'general') {
          return reasons.join('; ');
        }
        return `${field}: ${reasons.join('; ')}`;
      });
      
      // Add troubleshooting hints based on common errors
      let hints = '';
      
      // Rate limiting
      if (statusCode === 429) {
        hints += '\nHint: You have exceeded the API rate limit. Please wait before making more requests.';
      }
      
      // Authentication errors
      if (statusCode === 401) {
        hints += '\nHint: Check that your API token is valid and has the necessary permissions.';
      }
      
      errorMessage += formattedErrors.join(' | ') + hints;
    } else if (axiosError.response?.data) {
      // Try to include as much of the response data as possible
      try {
        errorMessage += JSON.stringify(axiosError.response.data);
      } catch (e) {
        errorMessage += axiosError.response.statusText || axiosError.message;
      }
    } else if (axiosError.response?.statusText) {
      // Use status text as fallback
      errorMessage += axiosError.response.statusText;
    } else if (axiosError.message) {
      // Use error message as fallback
      errorMessage += axiosError.message;
    }
    
    // Network errors
    if (axiosError.code === 'ECONNREFUSED') {
      errorMessage = 'Could not connect to the Linode API. Please check your internet connection.';
    } else if (axiosError.code === 'ENOTFOUND') {
      errorMessage = 'Could not resolve the Linode API domain. Please check your internet connection or DNS settings.';
    }
  } else if (error instanceof Error) {
    // Handle regular errors
    errorMessage = `Error: ${error.message}`;
    
    // Include stack trace for detailed debugging in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      errorMessage += `\nStack trace: ${error.stack}`;
    }
  }

  return errorMessage;
}

/**
 * Wraps a tool handler with error handling
 * 
 * @param handler The handler function to wrap
 * @returns A wrapped handler function with error handling
 */
export function withErrorHandling<P, R>(handler: (params: P, extra: any) => Promise<R>): (params: P, extra: any) => Promise<R> {
  return async (params: P, extra: any) => {
    try {
      return await handler(params, extra);
    } catch (error) {
      const errorMessage = formatLinodeError(error);
      // Throw an error with the formatted message
      throw new Error(errorMessage);
    }
  };
}

/**
 * Helper function to register a tool with error handling
 */
export interface ToolRegistration {
  name: string;
  description: string;
  schema: any;
  handler: (params: any, extra: any) => Promise<any>;
}

/**
 * Registers all tools with error handling
 * 
 * @param server The MCP server
 * @param tools Array of tool registrations
 */
export function registerToolsWithErrorHandling(server: any, tools: ToolRegistration[]): void {
  tools.forEach(tool => {
    server.tool(
      tool.name,
      tool.description,
      tool.schema,
      withErrorHandling(tool.handler)
    );
  });
}