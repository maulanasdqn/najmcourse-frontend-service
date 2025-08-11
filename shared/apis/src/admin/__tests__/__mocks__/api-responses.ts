import { AxiosResponse } from "axios";
import { mockDashboardStats, mockEmptyDashboardStats, mockPartialDashboardStats } from "./dashboard-data";

// Mock successful responses
export const createMockAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {
    headers: {} as any,
  },
});

export const mockSuccessResponse = createMockAxiosResponse(mockDashboardStats);
export const mockEmptyResponse = createMockAxiosResponse(mockEmptyDashboardStats);
export const mockPartialResponse = createMockAxiosResponse(mockPartialDashboardStats);

// Mock error responses
export const mockNotFoundResponse = {
  response: {
    status: 404,
    statusText: "Not Found",
    data: {
      message: "Dashboard statistics not found",
      error: "Not Found",
    },
  },
  message: "Request failed with status code 404",
  name: "AxiosError",
  isAxiosError: true,
};

export const mockUnauthorizedResponse = {
  response: {
    status: 401,
    statusText: "Unauthorized", 
    data: {
      message: "Authentication required",
      error: "Unauthorized",
    },
  },
  message: "Request failed with status code 401",
  name: "AxiosError",
  isAxiosError: true,
};

export const mockForbiddenResponse = {
  response: {
    status: 403,
    statusText: "Forbidden",
    data: {
      message: "Insufficient permissions to access dashboard statistics",
      error: "Forbidden",
    },
  },
  message: "Request failed with status code 403",
  name: "AxiosError",
  isAxiosError: true,
};

export const mockServerErrorResponse = {
  response: {
    status: 500,
    statusText: "Internal Server Error",
    data: {
      message: "Internal server error occurred while fetching dashboard statistics",
      error: "Internal Server Error",
    },
  },
  message: "Request failed with status code 500",
  name: "AxiosError",
  isAxiosError: true,
};

export const mockNetworkErrorResponse = {
  message: "Network Error",
  name: "AxiosError",
  isAxiosError: true,
  code: "NETWORK_ERROR",
};

// Mock invalid response data (for schema validation testing)
export const mockInvalidResponse = createMockAxiosResponse({
  data: {
    userStats: {
      totalUsers: "invalid_number", // Should be number
      activeUsers: null, // Should be number
      // Missing required fields
    },
    // Missing required fields
  },
  // Missing message field
});

export const mockMalformedResponse = createMockAxiosResponse({
  invalidStructure: true,
  randomData: "this should not be here",
});

// Zod validation error mock
export const createMockZodError = (message: string) => {
  const error = new Error(message);
  error.name = 'ZodError';
  return error;
};