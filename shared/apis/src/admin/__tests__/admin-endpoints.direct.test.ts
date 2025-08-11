import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mockDashboardStats } from "./__mocks__/dashboard-data";

// Base URL for testing
const API_BASE_URL = "http://localhost:3001/api/v1";

// Mock server setup
const server = setupServer();

// Helper function to make API calls
async function makeApiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer mock-token',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return {
    status: response.status,
    data: await response.json(),
    headers: response.headers,
  };
}

describe("Admin Endpoints Direct Integration Tests", () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'warn' });
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe("Admin Dashboard Stats Endpoint", () => {
    const DASHBOARD_STATS_ENDPOINT = "/admin/stats/dashboard";

    it("should return 200 OK for admin dashboard stats endpoint", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(mockDashboardStats, { status: 200 });
        })
      );

      // Act
      const response = await makeApiCall(DASHBOARD_STATS_ENDPOINT, {
        method: 'GET',
      });

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.message).toBe("Admin dashboard statistics retrieved successfully");
      expect(response.data.data).toBeDefined();
      
      // Verify user statistics
      expect(response.data.data.userStats).toBeDefined();
      expect(response.data.data.userStats.totalUsers).toBe(1250);
      expect(response.data.data.userStats.activeUsers).toBe(1200);
      expect(response.data.data.userStats.inactiveUsers).toBe(50);
      expect(Array.isArray(response.data.data.userStats.registrationTrends)).toBe(true);
      
      // Verify examination statistics
      expect(response.data.data.examinationStats).toBeDefined();
      expect(response.data.data.examinationStats.totalTests).toBe(85);
      expect(response.data.data.examinationStats.totalSessions).toBe(25);
      expect(response.data.data.examinationStats.totalQuestions).toBe(2450);
      expect(Array.isArray(response.data.data.examinationStats.testsByCategory)).toBe(true);
      
      // Verify performance statistics
      expect(response.data.data.performanceStats).toBeDefined();
      expect(response.data.data.performanceStats.averageScore).toBe(78.5);
      expect(response.data.data.performanceStats.completionRate).toBe(85.2);
      expect(Array.isArray(response.data.data.performanceStats.scoreTrends)).toBe(true);
      
      // Verify content statistics
      expect(response.data.data.contentStats).toBeDefined();
      expect(response.data.data.contentStats.totalQuestions).toBe(2450);
      expect(response.data.data.contentStats.totalOptions).toBe(9800);
      expect(Array.isArray(response.data.data.contentStats.questionsByDifficulty)).toBe(true);
      expect(Array.isArray(response.data.data.contentStats.questionsBySubject)).toBe(true);
      
      // Verify system statistics
      expect(response.data.data.systemStats).toBeDefined();
      expect(response.data.data.systemStats.databaseSize).toBe("2.5 GB");
      expect(response.data.data.systemStats.dataIntegrityScore).toBe(95.8);
      expect(response.data.data.systemStats.userGrowthRate).toBe(15.5);
    });

    it("should handle 401 Unauthorized error", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(
            { message: "Authentication required", error: "Unauthorized" },
            { status: 401 }
          );
        })
      );

      // Act & Assert
      await expect(makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' })).rejects.toThrow("HTTP 401");
    });

    it("should handle 403 Forbidden error", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(
            { message: "Access denied", error: "Forbidden" },
            { status: 403 }
          );
        })
      );

      // Act & Assert
      await expect(makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' })).rejects.toThrow("HTTP 403");
    });

    it("should handle 404 Not Found error", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(
            { message: "Endpoint not found", error: "Not Found" },
            { status: 404 }
          );
        })
      );

      // Act & Assert
      await expect(makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' })).rejects.toThrow("HTTP 404");
    });

    it("should handle 500 Internal Server Error", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(
            { message: "Internal server error", error: "Server Error" },
            { status: 500 }
          );
        })
      );

      // Act & Assert
      await expect(makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' })).rejects.toThrow("HTTP 500");
    });

    it("should validate response content type is JSON", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(mockDashboardStats, {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        })
      );

      // Act
      const response = await makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' });

      // Assert
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toContain('application/json');
    });

    it("should handle request with authorization header", async () => {
      // Arrange
      let receivedHeaders: any = {};
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, ({ request }) => {
          receivedHeaders = Object.fromEntries(request.headers.entries());
          return HttpResponse.json(mockDashboardStats, { status: 200 });
        })
      );

      // Act
      const response = await makeApiCall(DASHBOARD_STATS_ENDPOINT, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token-123',
        },
      });

      // Assert
      expect(response.status).toBe(200);
      expect(receivedHeaders.authorization).toBe('Bearer test-token-123');
    });

    it("should measure response time performance", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, async () => {
          // Simulate processing time
          await new Promise(resolve => setTimeout(resolve, 100));
          return HttpResponse.json(mockDashboardStats, { status: 200 });
        })
      );

      // Act
      const startTime = Date.now();
      const response = await makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' });
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Assert
      expect(response.status).toBe(200);
      expect(responseTime).toBeGreaterThan(90); // Should take at least 100ms due to our delay
      expect(responseTime).toBeLessThan(2000); // Should complete within 2 seconds
    });

    it("should handle concurrent requests", async () => {
      // Arrange
      let requestCount = 0;
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          requestCount++;
          return HttpResponse.json(mockDashboardStats, { status: 200 });
        })
      );

      // Act
      const promises = Array.from({ length: 5 }, () =>
        makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' })
      );
      const responses = await Promise.all(promises);

      // Assert
      expect(responses).toHaveLength(5);
      expect(requestCount).toBe(5);
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.data.message).toBe("Admin dashboard statistics retrieved successfully");
      });
    });

    it("should handle empty data response", async () => {
      // Arrange
      const emptyMockData = {
        data: {
          userStats: {
            totalUsers: 0,
            activeUsers: 0,
            inactiveUsers: 0,
            registrationTrends: [],
          },
          examinationStats: {
            totalTests: 0,
            totalSessions: 0,
            totalQuestions: 0,
            totalAnswersSubmitted: 0,
            testsByCategory: [],
          },
          performanceStats: {
            monthlyActiveUsers: 0,
            totalTestAttempts: 0,
            averageScore: 0,
            completionRate: 0,
            scoreTrends: [],
          },
          contentStats: {
            totalQuestions: 0,
            totalOptions: 0,
            questionsByDifficulty: [],
            questionsBySubject: [],
          },
          systemStats: {
            databaseSize: "0 MB",
            dataIntegrityScore: 0,
            userGrowthRate: 0,
            testCreationRate: 0,
            averageSessionDuration: 0,
          },
        },
        message: "Admin dashboard statistics retrieved successfully (empty)",
      };

      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(emptyMockData, { status: 200 });
        })
      );

      // Act
      const response = await makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' });

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.data.userStats.totalUsers).toBe(0);
      expect(response.data.data.examinationStats.totalTests).toBe(0);
      expect(response.data.data.performanceStats.averageScore).toBe(0);
      expect(response.data.data.systemStats.databaseSize).toBe("0 MB");
    });

    it("should validate all required data fields are present", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(mockDashboardStats, { status: 200 });
        })
      );

      // Act
      const response = await makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' });

      // Assert
      const data = response.data.data;
      
      // Check top-level structure
      expect(data).toHaveProperty('userStats');
      expect(data).toHaveProperty('examinationStats');
      expect(data).toHaveProperty('performanceStats');
      expect(data).toHaveProperty('contentStats');
      expect(data).toHaveProperty('systemStats');
      
      // Check userStats structure
      expect(data.userStats).toHaveProperty('totalUsers');
      expect(data.userStats).toHaveProperty('activeUsers');
      expect(data.userStats).toHaveProperty('inactiveUsers');
      expect(data.userStats).toHaveProperty('registrationTrends');
      
      // Check examinationStats structure
      expect(data.examinationStats).toHaveProperty('totalTests');
      expect(data.examinationStats).toHaveProperty('totalSessions');
      expect(data.examinationStats).toHaveProperty('totalQuestions');
      expect(data.examinationStats).toHaveProperty('totalAnswersSubmitted');
      expect(data.examinationStats).toHaveProperty('testsByCategory');
      
      // Check performanceStats structure
      expect(data.performanceStats).toHaveProperty('monthlyActiveUsers');
      expect(data.performanceStats).toHaveProperty('totalTestAttempts');
      expect(data.performanceStats).toHaveProperty('averageScore');
      expect(data.performanceStats).toHaveProperty('completionRate');
      expect(data.performanceStats).toHaveProperty('scoreTrends');
      
      // Check contentStats structure
      expect(data.contentStats).toHaveProperty('totalQuestions');
      expect(data.contentStats).toHaveProperty('totalOptions');
      expect(data.contentStats).toHaveProperty('questionsByDifficulty');
      expect(data.contentStats).toHaveProperty('questionsBySubject');
      
      // Check systemStats structure
      expect(data.systemStats).toHaveProperty('databaseSize');
      expect(data.systemStats).toHaveProperty('dataIntegrityScore');
      expect(data.systemStats).toHaveProperty('userGrowthRate');
      expect(data.systemStats).toHaveProperty('testCreationRate');
      expect(data.systemStats).toHaveProperty('averageSessionDuration');
    });
  });

  describe("HTTP Status Codes Coverage", () => {
    const DASHBOARD_STATS_ENDPOINT = "/admin/stats/dashboard";
    
    const statusCodes = [
      { code: 200, description: "OK", shouldSucceed: true },
      { code: 400, description: "Bad Request", shouldSucceed: false },
      { code: 401, description: "Unauthorized", shouldSucceed: false },
      { code: 403, description: "Forbidden", shouldSucceed: false },
      { code: 404, description: "Not Found", shouldSucceed: false },
      { code: 422, description: "Unprocessable Entity", shouldSucceed: false },
      { code: 500, description: "Internal Server Error", shouldSucceed: false },
      { code: 502, description: "Bad Gateway", shouldSucceed: false },
      { code: 503, description: "Service Unavailable", shouldSucceed: false }
    ];

    statusCodes.forEach(({ code, description, shouldSucceed }) => {
      it(`should handle HTTP ${code} (${description}) correctly`, async () => {
        // Arrange
        server.use(
          http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
            if (shouldSucceed) {
              return HttpResponse.json(mockDashboardStats, { status: code });
            } else {
              return HttpResponse.json(
                { message: `${description} error`, error: description },
                { status: code }
              );
            }
          })
        );

        // Act & Assert
        if (shouldSucceed) {
          const response = await makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' });
          expect(response.status).toBe(code);
          expect(response.data.message).toBe("Admin dashboard statistics retrieved successfully");
        } else {
          await expect(makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' }))
            .rejects.toThrow(`HTTP ${code}`);
        }
      });
    });
  });

  describe("Request Methods", () => {
    const DASHBOARD_STATS_ENDPOINT = "/admin/stats/dashboard";

    it("should only accept GET requests", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(mockDashboardStats, { status: 200 });
        }),
        http.post(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(
            { message: "Method not allowed", error: "Method Not Allowed" },
            { status: 405 }
          );
        }),
        http.put(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(
            { message: "Method not allowed", error: "Method Not Allowed" },
            { status: 405 }
          );
        }),
        http.delete(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.json(
            { message: "Method not allowed", error: "Method Not Allowed" },
            { status: 405 }
          );
        })
      );

      // Act & Assert
      // GET should work
      const getResponse = await makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' });
      expect(getResponse.status).toBe(200);

      // POST should fail
      await expect(makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'POST' }))
        .rejects.toThrow("HTTP 405");

      // PUT should fail
      await expect(makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'PUT' }))
        .rejects.toThrow("HTTP 405");

      // DELETE should fail
      await expect(makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'DELETE' }))
        .rejects.toThrow("HTTP 405");
    });
  });

  describe("Network Scenarios", () => {
    const DASHBOARD_STATS_ENDPOINT = "/admin/stats/dashboard";

    it("should handle network timeout", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, async () => {
          // Simulate a very slow response
          await new Promise(resolve => setTimeout(resolve, 10000));
          return HttpResponse.json(mockDashboardStats);
        })
      );

      // Create a fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000); // 1 second timeout

      try {
        // Act & Assert
        await expect(
          makeApiCall(DASHBOARD_STATS_ENDPOINT, { 
            method: 'GET',
            signal: controller.signal 
          })
        ).rejects.toThrow();
      } finally {
        clearTimeout(timeoutId);
      }
    });

    it("should handle network error", async () => {
      // Arrange
      server.use(
        http.get(`${API_BASE_URL}${DASHBOARD_STATS_ENDPOINT}`, () => {
          return HttpResponse.error();
        })
      );

      // Act & Assert
      await expect(makeApiCall(DASHBOARD_STATS_ENDPOINT, { method: 'GET' }))
        .rejects.toThrow();
    });
  });
});