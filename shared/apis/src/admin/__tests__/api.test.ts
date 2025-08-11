import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getAdminDashboardStats } from "../api";
import { api } from "@/shared/libs/axios/api";
import { ENDPOINTS } from "@/shared/commons/constants/endpoints";
import {
  mockSuccessResponse,
  mockInvalidResponse,
  mockMalformedResponse,
  mockNotFoundResponse,
  mockUnauthorizedResponse,
  mockForbiddenResponse,
  mockServerErrorResponse,
  mockNetworkErrorResponse,
  createMockZodError,
} from "./__mocks__/api-responses";
import { mockDashboardStats } from "./__mocks__/dashboard-data";

import { adminDashboardStatsSchema } from "../schema";

// Mock the API client
vi.mock("@/shared/libs/axios/api");
const mockedApi = vi.mocked(api);

// Mock the schema validation
vi.mock("../schema", () => ({
  adminDashboardStatsSchema: {
    parse: vi.fn(),
  },
}));
const mockedSchema = vi.mocked(adminDashboardStatsSchema);

describe("Admin API - getAdminDashboardStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Successful requests", () => {
    it("should fetch dashboard stats successfully", async () => {
      // Arrange
      mockedApi.mockResolvedValueOnce(mockSuccessResponse);
      mockedSchema.parse.mockReturnValueOnce(mockDashboardStats);

      // Act
      const result = await getAdminDashboardStats();

      // Assert
      expect(mockedApi).toHaveBeenCalledWith({
        url: ENDPOINTS.ADMIN.DASHBOARD_STATS,
        method: "GET",
      });
      expect(mockedSchema.parse).toHaveBeenCalledWith(mockSuccessResponse.data);
      expect(result).toEqual(mockDashboardStats);
    });

    it("should validate response data with schema", async () => {
      // Arrange
      mockedApi.mockResolvedValueOnce(mockSuccessResponse);
      mockedSchema.parse.mockReturnValueOnce(mockDashboardStats);

      // Act
      await getAdminDashboardStats();

      // Assert
      expect(mockedSchema.parse).toHaveBeenCalledWith(mockSuccessResponse.data);
      expect(mockedSchema.parse).toHaveBeenCalledTimes(1);
    });

    it("should call API with correct endpoint", async () => {
      // Arrange
      mockedApi.mockResolvedValueOnce(mockSuccessResponse);
      mockedSchema.parse.mockReturnValueOnce(mockDashboardStats);

      // Act
      await getAdminDashboardStats();

      // Assert
      expect(mockedApi).toHaveBeenCalledWith({
        url: "/admin/stats/dashboard",
        method: "GET",
      });
    });
  });

  describe("Error handling", () => {
    it("should handle 404 Not Found errors", async () => {
      // Arrange
      mockedApi.mockRejectedValueOnce(mockNotFoundResponse);

      // Act & Assert
      await expect(getAdminDashboardStats()).rejects.toMatchObject({
        message: "Request failed with status code 404",
      });
      expect(mockedSchema.parse).not.toHaveBeenCalled();
    });

    it("should handle 401 Unauthorized errors", async () => {
      // Arrange
      mockedApi.mockRejectedValueOnce(mockUnauthorizedResponse);

      // Act & Assert
      await expect(getAdminDashboardStats()).rejects.toMatchObject({
        message: "Request failed with status code 401",
      });
      expect(mockedSchema.parse).not.toHaveBeenCalled();
    });

    it("should handle 403 Forbidden errors", async () => {
      // Arrange
      mockedApi.mockRejectedValueOnce(mockForbiddenResponse);

      // Act & Assert
      await expect(getAdminDashboardStats()).rejects.toMatchObject({
        message: "Request failed with status code 403",
      });
      expect(mockedSchema.parse).not.toHaveBeenCalled();
    });

    it("should handle 500 Internal Server Error", async () => {
      // Arrange
      mockedApi.mockRejectedValueOnce(mockServerErrorResponse);

      // Act & Assert
      await expect(getAdminDashboardStats()).rejects.toMatchObject({
        message: "Request failed with status code 500",
      });
      expect(mockedSchema.parse).not.toHaveBeenCalled();
    });

    it("should handle network errors", async () => {
      // Arrange
      mockedApi.mockRejectedValueOnce(mockNetworkErrorResponse);

      // Act & Assert
      await expect(getAdminDashboardStats()).rejects.toMatchObject({
        message: "Network Error",
      });
      expect(mockedSchema.parse).not.toHaveBeenCalled();
    });
  });

  describe("Schema validation errors", () => {
    it("should handle Zod validation errors with better context", async () => {
      // Arrange
      const zodError = createMockZodError("Invalid data format");
      mockedApi.mockResolvedValueOnce(mockInvalidResponse);
      mockedSchema.parse.mockImplementationOnce(() => {
        throw zodError;
      });

      // Act & Assert
      await expect(getAdminDashboardStats()).rejects.toThrow(
        "Invalid admin dashboard stats response: Invalid data format"
      );
      expect(mockedApi).toHaveBeenCalledWith({
        url: ENDPOINTS.ADMIN.DASHBOARD_STATS,
        method: "GET",
      });
      expect(mockedSchema.parse).toHaveBeenCalledWith(mockInvalidResponse.data);
    });

    it("should handle malformed response data", async () => {
      // Arrange
      const zodError = createMockZodError("Expected object, received string");
      mockedApi.mockResolvedValueOnce(mockMalformedResponse);
      mockedSchema.parse.mockImplementationOnce(() => {
        throw zodError;
      });

      // Act & Assert
      await expect(getAdminDashboardStats()).rejects.toThrow(
        "Invalid admin dashboard stats response: Expected object, received string"
      );
    });

    it("should handle missing required fields", async () => {
      // Arrange
      const zodError = createMockZodError("Required field 'data' is missing");
      mockedApi.mockResolvedValueOnce(mockInvalidResponse);
      mockedSchema.parse.mockImplementationOnce(() => {
        throw zodError;
      });

      // Act & Assert
      await expect(getAdminDashboardStats()).rejects.toThrow(
        "Invalid admin dashboard stats response: Required field 'data' is missing"
      );
    });

    it("should re-throw non-Zod errors without modification", async () => {
      // Arrange
      const genericError = new Error("Some other error");
      genericError.name = "SomeOtherError";
      mockedApi.mockResolvedValueOnce(mockSuccessResponse);
      mockedSchema.parse.mockImplementationOnce(() => {
        throw genericError;
      });

      // Act & Assert
      await expect(getAdminDashboardStats()).rejects.toThrow("Some other error");
      await expect(getAdminDashboardStats()).rejects.not.toThrow(
        "Invalid admin dashboard stats response"
      );
    });
  });

  describe("Edge cases", () => {
    it("should handle empty response data", async () => {
      // Arrange
      const emptyResponse = { ...mockSuccessResponse, data: null };
      mockedApi.mockResolvedValueOnce(emptyResponse);
      mockedSchema.parse.mockReturnValueOnce(null as any);

      // Act
      const result = await getAdminDashboardStats();

      // Assert
      expect(mockedSchema.parse).toHaveBeenCalledWith(null);
      expect(result).toBeNull();
    });

    it("should handle undefined response data", async () => {
      // Arrange
      const undefinedResponse = { ...mockSuccessResponse, data: undefined };
      mockedApi.mockResolvedValueOnce(undefinedResponse);
      mockedSchema.parse.mockReturnValueOnce(undefined as any);

      // Act
      const result = await getAdminDashboardStats();

      // Assert
      expect(mockedSchema.parse).toHaveBeenCalledWith(undefined);
      expect(result).toBeUndefined();
    });
  });

  describe("Request configuration", () => {
    it("should use GET method", async () => {
      // Arrange
      mockedApi.mockResolvedValueOnce(mockSuccessResponse);
      mockedSchema.parse.mockReturnValueOnce(mockDashboardStats);

      // Act
      await getAdminDashboardStats();

      // Assert
      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
        })
      );
    });

    it("should use correct endpoint URL", async () => {
      // Arrange
      mockedApi.mockResolvedValueOnce(mockSuccessResponse);
      mockedSchema.parse.mockReturnValueOnce(mockDashboardStats);

      // Act
      await getAdminDashboardStats();

      // Assert
      expect(mockedApi).toHaveBeenCalledWith(
        expect.objectContaining({
          url: ENDPOINTS.ADMIN.DASHBOARD_STATS,
        })
      );
    });

    it("should not include request body for GET request", async () => {
      // Arrange
      mockedApi.mockResolvedValueOnce(mockSuccessResponse);
      mockedSchema.parse.mockReturnValueOnce(mockDashboardStats);

      // Act
      await getAdminDashboardStats();

      // Assert
      expect(mockedApi).toHaveBeenCalledWith(
        expect.not.objectContaining({
          data: expect.anything(),
        })
      );
    });
  });
});