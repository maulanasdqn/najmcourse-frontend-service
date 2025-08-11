import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetDashboardStats } from "../use-get-dashboard-stats";
import { getAdminDashboardStats } from "@/shared/apis/admin/api";
import { mockDashboardStats } from "@/shared/apis/src/admin/__tests__/__mocks__/dashboard-data";
import type { ReactNode } from "react";

// Mock the API function
vi.mock("@/shared/apis/admin/api");
const mockedGetAdminDashboardStats = vi.mocked(getAdminDashboardStats);

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

// Wrapper component for React Query
const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGetDashboardStats Hook", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    queryClient.clear();
  });

  describe("Successful data fetching", () => {
    it("should fetch dashboard stats successfully", async () => {
      // Arrange
      mockedGetAdminDashboardStats.mockResolvedValueOnce(mockDashboardStats);

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      // Assert initial state
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeNull();

      // Wait for the query to complete
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Assert final state
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(mockDashboardStats);
      expect(result.current.error).toBeNull();
      expect(mockedGetAdminDashboardStats).toHaveBeenCalledTimes(1);
    });

    it("should use correct query key", async () => {
      // Arrange
      mockedGetAdminDashboardStats.mockResolvedValueOnce(mockDashboardStats);

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Assert
      const queryCache = queryClient.getQueryCache();
      const queries = queryCache.findAll();
      expect(queries).toHaveLength(1);
      expect(queries[0].queryKey).toEqual(["get-dashboard-stats"]);
    });

    it("should return the same data on subsequent renders", async () => {
      // Arrange
      mockedGetAdminDashboardStats.mockResolvedValueOnce(mockDashboardStats);

      // Act
      const { result, rerender } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const firstResult = result.current.data;

      // Re-render the hook
      rerender();

      // Assert
      expect(result.current.data).toBe(firstResult);
      expect(result.current.data).toEqual(mockDashboardStats);
      // API should only be called once due to caching
      expect(mockedGetAdminDashboardStats).toHaveBeenCalledTimes(1);
    });
  });

  describe("Error handling", () => {
    it("should handle API errors", async () => {
      // Arrange
      const apiError = new Error("Failed to fetch dashboard stats");
      mockedGetAdminDashboardStats.mockRejectedValueOnce(apiError);

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      // Assert initial state
      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBeNull();

      // Wait for the query to complete
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // Assert error state
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toEqual(apiError);
      expect(mockedGetAdminDashboardStats).toHaveBeenCalledTimes(1);
    });

    it("should handle network errors", async () => {
      // Arrange
      const networkError = new Error("Network Error");
      networkError.name = "AxiosError";
      mockedGetAdminDashboardStats.mockRejectedValueOnce(networkError);

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // Assert
      expect(result.current.error).toEqual(networkError);
      expect(result.current.data).toBeUndefined();
    });

    it("should handle validation errors", async () => {
      // Arrange
      const validationError = new Error("Invalid admin dashboard stats response");
      mockedGetAdminDashboardStats.mockRejectedValueOnce(validationError);

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // Assert
      expect(result.current.error).toEqual(validationError);
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("Loading states", () => {
    it("should show loading state initially", () => {
      // Arrange - Don't resolve the promise immediately
      mockedGetAdminDashboardStats.mockImplementationOnce(
        () => new Promise(() => {
          // Never resolving promise for testing loading state
        })
      );

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      // Assert
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isFetching).toBe(true);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.data).toBeUndefined();
    });

    it("should not be loading after successful fetch", async () => {
      // Arrange
      mockedGetAdminDashboardStats.mockResolvedValueOnce(mockDashboardStats);

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Assert
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });

    it("should not be loading after error", async () => {
      // Arrange
      mockedGetAdminDashboardStats.mockRejectedValueOnce(new Error("Test error"));

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // Assert
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });
  });

  describe("Refetch behavior", () => {
    beforeEach(() => {
      // Mock timers for testing intervals
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    });

    it("should refetch data automatically based on refetchInterval", async () => {
      // Arrange
      mockedGetAdminDashboardStats
        .mockResolvedValueOnce(mockDashboardStats)
        .mockResolvedValueOnce(mockDashboardStats);

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedGetAdminDashboardStats).toHaveBeenCalledTimes(1);

      // Fast forward time by 5 minutes (refetchInterval)
      vi.advanceTimersByTime(5 * 60 * 1000);

      await waitFor(() => {
        expect(mockedGetAdminDashboardStats).toHaveBeenCalledTimes(2);
      });
    });

    it("should respect staleTime configuration", async () => {
      // Arrange
      mockedGetAdminDashboardStats.mockResolvedValue(mockDashboardStats);

      // Act
      const { result, unmount } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      unmount();

      // Re-render within staleTime (2 minutes)
      vi.advanceTimersByTime(1 * 60 * 1000); // 1 minute

      const { result: result2 } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result2.current.isSuccess).toBe(true);
      });

      // Should not refetch as data is still fresh
      expect(mockedGetAdminDashboardStats).toHaveBeenCalledTimes(1);
    });

    it("should refetch after staleTime expires", async () => {
      // Arrange
      mockedGetAdminDashboardStats
        .mockResolvedValueOnce(mockDashboardStats)
        .mockResolvedValueOnce(mockDashboardStats);

      // Act
      const { result, unmount } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      unmount();

      // Fast forward beyond staleTime (2 minutes)
      vi.advanceTimersByTime(3 * 60 * 1000);

      const { result: result2 } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result2.current.isSuccess).toBe(true);
      });

      // Should refetch as data is stale
      expect(mockedGetAdminDashboardStats).toHaveBeenCalledTimes(2);
    });
  });

  describe("Manual refetch", () => {
    it("should support manual refetch", async () => {
      // Arrange
      mockedGetAdminDashboardStats
        .mockResolvedValueOnce(mockDashboardStats)
        .mockResolvedValueOnce(mockDashboardStats);

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedGetAdminDashboardStats).toHaveBeenCalledTimes(1);

      // Manual refetch
      await result.current.refetch();

      // Assert
      expect(mockedGetAdminDashboardStats).toHaveBeenCalledTimes(2);
    });

    it("should handle errors during manual refetch", async () => {
      // Arrange
      mockedGetAdminDashboardStats
        .mockResolvedValueOnce(mockDashboardStats)
        .mockRejectedValueOnce(new Error("Refetch failed"));

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Manual refetch that fails
      await result.current.refetch();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // Assert
      expect(result.current.error).toEqual(new Error("Refetch failed"));
    });
  });

  describe("Query status", () => {
    it("should have correct status flags for success", async () => {
      // Arrange
      mockedGetAdminDashboardStats.mockResolvedValueOnce(mockDashboardStats);

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.isError).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });

    it("should have correct status flags for error", async () => {
      // Arrange
      mockedGetAdminDashboardStats.mockRejectedValueOnce(new Error("Test error"));

      // Act
      const { result } = renderHook(() => useGetDashboardStats(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });
  });
});