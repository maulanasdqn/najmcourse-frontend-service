import { describe, it, expect } from "vitest";
import { adminDashboardStatsSchema } from "../schema";
import { mockDashboardStats, mockEmptyDashboardStats, mockPartialDashboardStats } from "./__mocks__/dashboard-data";

describe("Admin Dashboard Stats Schema Validation", () => {
  describe("Valid data validation", () => {
    it("should validate complete dashboard stats successfully", () => {
      // Act
      const result = adminDashboardStatsSchema.parse(mockDashboardStats);

      // Assert
      expect(result).toEqual(mockDashboardStats);
    });

    it("should validate empty dashboard stats", () => {
      // Act
      const result = adminDashboardStatsSchema.parse(mockEmptyDashboardStats);

      // Assert
      expect(result).toEqual(mockEmptyDashboardStats);
    });

    it("should validate partial dashboard stats", () => {
      // Act
      const result = adminDashboardStatsSchema.parse(mockPartialDashboardStats);

      // Assert
      expect(result).toEqual(mockPartialDashboardStats);
    });

    it("should validate with all required fields present", () => {
      // Arrange
      const minimalValidData = {
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
        message: "Test message",
      };

      // Act
      const result = adminDashboardStatsSchema.parse(minimalValidData);

      // Assert
      expect(result).toEqual(minimalValidData);
    });
  });

  describe("Invalid data rejection", () => {
    it("should reject data without root 'data' field", () => {
      // Arrange
      const invalidData = {
        message: "Test message",
        // Missing 'data' field
      };

      // Act & Assert
      expect(() => adminDashboardStatsSchema.parse(invalidData)).toThrow();
    });

    it("should reject data without root 'message' field", () => {
      // Arrange
      const invalidData = {
        data: mockDashboardStats.data,
        // Missing 'message' field
      };

      // Act & Assert
      expect(() => adminDashboardStatsSchema.parse(invalidData)).toThrow();
    });

    it("should reject data with invalid userStats structure", () => {
      // Arrange
      const invalidData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          userStats: {
            totalUsers: "invalid_number", // Should be number
            activeUsers: null, // Should be number
            // Missing required fields
          },
        },
      };

      // Act & Assert
      expect(() => adminDashboardStatsSchema.parse(invalidData)).toThrow();
    });

    it("should reject data with invalid examinationStats structure", () => {
      // Arrange
      const invalidData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          examinationStats: {
            totalTests: -1, // Negative number should still be valid for numbers
            totalSessions: "invalid", // Should be number
            // Missing required fields
          },
        },
      };

      // Act & Assert
      expect(() => adminDashboardStatsSchema.parse(invalidData)).toThrow();
    });

    it("should reject data with invalid performanceStats structure", () => {
      // Arrange
      const invalidData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          performanceStats: {
            monthlyActiveUsers: true, // Should be number
            // Missing required fields
          },
        },
      };

      // Act & Assert
      expect(() => adminDashboardStatsSchema.parse(invalidData)).toThrow();
    });

    it("should reject data with invalid contentStats structure", () => {
      // Arrange
      const invalidData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          contentStats: {
            totalQuestions: {},  // Should be number
            // Missing required fields
          },
        },
      };

      // Act & Assert
      expect(() => adminDashboardStatsSchema.parse(invalidData)).toThrow();
    });

    it("should reject data with invalid systemStats structure", () => {
      // Arrange
      const invalidData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          systemStats: {
            databaseSize: 123, // Should be string
            dataIntegrityScore: "invalid", // Should be number
            // Missing required fields
          },
        },
      };

      // Act & Assert
      expect(() => adminDashboardStatsSchema.parse(invalidData)).toThrow();
    });
  });

  describe("Array validation", () => {
    it("should validate registrationTrends array structure", () => {
      // Arrange
      const validData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          userStats: {
            ...mockDashboardStats.data.userStats,
            registrationTrends: [
              { month: "2024-01", count: 100 },
              { month: "2024-02", count: 150 },
            ],
          },
        },
      };

      // Act
      const result = adminDashboardStatsSchema.parse(validData);

      // Assert
      expect(result.data.userStats.registrationTrends).toHaveLength(2);
      expect(result.data.userStats.registrationTrends[0]).toEqual({
        month: "2024-01",
        count: 100,
      });
    });

    it("should reject invalid registrationTrends array items", () => {
      // Arrange
      const invalidData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          userStats: {
            ...mockDashboardStats.data.userStats,
            registrationTrends: [
              { month: 123, count: "invalid" }, // Both fields invalid
            ],
          },
        },
      };

      // Act & Assert
      expect(() => adminDashboardStatsSchema.parse(invalidData)).toThrow();
    });

    it("should validate testsByCategory array structure", () => {
      // Arrange
      const validData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          examinationStats: {
            ...mockDashboardStats.data.examinationStats,
            testsByCategory: [
              { category: "Saintek", count: 25 },
              { category: "Soshum", count: 15 },
            ],
          },
        },
      };

      // Act
      const result = adminDashboardStatsSchema.parse(validData);

      // Assert
      expect(result.data.examinationStats.testsByCategory).toHaveLength(2);
      expect(result.data.examinationStats.testsByCategory[0]).toEqual({
        category: "Saintek",
        count: 25,
      });
    });

    it("should validate scoreTrends array structure", () => {
      // Arrange
      const validData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          performanceStats: {
            ...mockDashboardStats.data.performanceStats,
            scoreTrends: [
              { month: "2024-01", averageScore: 75.5 },
              { month: "2024-02", averageScore: 78.2 },
            ],
          },
        },
      };

      // Act
      const result = adminDashboardStatsSchema.parse(validData);

      // Assert
      expect(result.data.performanceStats.scoreTrends).toHaveLength(2);
      expect(result.data.performanceStats.scoreTrends[0]).toEqual({
        month: "2024-01",
        averageScore: 75.5,
      });
    });

    it("should validate questionsByDifficulty array structure", () => {
      // Arrange
      const validData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          contentStats: {
            ...mockDashboardStats.data.contentStats,
            questionsByDifficulty: [
              { difficulty: "Easy", count: 100 },
              { difficulty: "Hard", count: 50 },
            ],
          },
        },
      };

      // Act
      const result = adminDashboardStatsSchema.parse(validData);

      // Assert
      expect(result.data.contentStats.questionsByDifficulty).toHaveLength(2);
      expect(result.data.contentStats.questionsByDifficulty[0]).toEqual({
        difficulty: "Easy",
        count: 100,
      });
    });

    it("should validate questionsBySubject array structure", () => {
      // Arrange
      const validData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          contentStats: {
            ...mockDashboardStats.data.contentStats,
            questionsBySubject: [
              { subject: "Mathematics", count: 200 },
              { subject: "Physics", count: 150 },
            ],
          },
        },
      };

      // Act
      const result = adminDashboardStatsSchema.parse(validData);

      // Assert
      expect(result.data.contentStats.questionsBySubject).toHaveLength(2);
      expect(result.data.contentStats.questionsBySubject[0]).toEqual({
        subject: "Mathematics",
        count: 200,
      });
    });
  });

  describe("Type coercion", () => {
    it("should handle string numbers correctly", () => {
      // Arrange - some APIs might return numbers as strings
      const dataWithStringNumbers = {
        data: {
          userStats: {
            totalUsers: "1250", // String number
            activeUsers: 1200,
            inactiveUsers: 50,
            registrationTrends: [],
          },
          examinationStats: {
            totalTests: 85,
            totalSessions: 25,
            totalQuestions: 2450,
            totalAnswersSubmitted: 5500,
            testsByCategory: [],
          },
          performanceStats: {
            monthlyActiveUsers: 1500,
            totalTestAttempts: 3250,
            averageScore: "78.5", // String number
            completionRate: 85.2,
            scoreTrends: [],
          },
          contentStats: {
            totalQuestions: 2450,
            totalOptions: 9800,
            questionsByDifficulty: [],
            questionsBySubject: [],
          },
          systemStats: {
            databaseSize: "2.5 GB",
            dataIntegrityScore: 95.8,
            userGrowthRate: 15.5,
            testCreationRate: 8.2,
            averageSessionDuration: 45.6,
          },
        },
        message: "Test message",
      };

      // Act & Assert
      // Note: This test depends on whether Zod is configured to coerce strings to numbers
      // If coercion is not enabled, this should throw an error
      expect(() => adminDashboardStatsSchema.parse(dataWithStringNumbers)).toThrow();
    });
  });
});