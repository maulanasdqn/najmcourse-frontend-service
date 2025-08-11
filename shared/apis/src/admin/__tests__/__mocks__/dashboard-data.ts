import type { TAdminDashboardStatsResponse } from "../../type";

export const mockDashboardStats: TAdminDashboardStatsResponse = {
  data: {
    userStats: {
      totalUsers: 1250,
      activeUsers: 1200,
      inactiveUsers: 50,
      registrationTrends: [
        { month: "2024-01", count: 125 },
        { month: "2024-02", count: 110 },
        { month: "2024-03", count: 140 },
        { month: "2024-04", count: 135 },
        { month: "2024-05", count: 150 },
        { month: "2024-06", count: 165 },
      ],
    },
    examinationStats: {
      totalTests: 85,
      totalSessions: 25,
      totalQuestions: 2450,
      totalAnswersSubmitted: 5500,
      testsByCategory: [
        { category: "Saintek", count: 45 },
        { category: "Soshum", count: 25 },
        { category: "TKA", count: 15 },
      ],
    },
    performanceStats: {
      monthlyActiveUsers: 1500,
      totalTestAttempts: 3250,
      averageScore: 78.5,
      completionRate: 85.2,
      scoreTrends: [
        { month: "2024-01", averageScore: 75.2 },
        { month: "2024-02", averageScore: 76.8 },
        { month: "2024-03", averageScore: 78.1 },
        { month: "2024-04", averageScore: 77.9 },
        { month: "2024-05", averageScore: 79.3 },
        { month: "2024-06", averageScore: 78.5 },
      ],
    },
    contentStats: {
      totalQuestions: 2450,
      totalOptions: 9800,
      questionsByDifficulty: [
        { difficulty: "Easy", count: 850 },
        { difficulty: "Medium", count: 950 },
        { difficulty: "Hard", count: 650 },
      ],
      questionsBySubject: [
        { subject: "Matematika", count: 450 },
        { subject: "Fisika", count: 420 },
        { subject: "Kimia", count: 380 },
        { subject: "Biologi", count: 400 },
        { subject: "Bahasa Indonesia", count: 350 },
        { subject: "Bahasa Inggris", count: 450 },
      ],
    },
    systemStats: {
      databaseSize: "2.5 GB",
      dataIntegrityScore: 95.8,
      userGrowthRate: 15.5,
      testCreationRate: 8.2,
      averageSessionDuration: 45.6,
    },
  },
  message: "Admin dashboard statistics retrieved successfully",
};

export const mockEmptyDashboardStats: TAdminDashboardStatsResponse = {
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
  message: "No dashboard statistics available",
};

export const mockPartialDashboardStats: TAdminDashboardStatsResponse = {
  data: {
    userStats: {
      totalUsers: 500,
      activeUsers: 450,
      inactiveUsers: 50,
      registrationTrends: [
        { month: "2024-06", count: 50 },
      ],
    },
    examinationStats: {
      totalTests: 10,
      totalSessions: 5,
      totalQuestions: 200,
      totalAnswersSubmitted: 1000,
      testsByCategory: [
        { category: "Saintek", count: 6 },
        { category: "Soshum", count: 4 },
      ],
    },
    performanceStats: {
      monthlyActiveUsers: 400,
      totalTestAttempts: 800,
      averageScore: 65.5,
      completionRate: 70.0,
      scoreTrends: [
        { month: "2024-06", averageScore: 65.5 },
      ],
    },
    contentStats: {
      totalQuestions: 200,
      totalOptions: 800,
      questionsByDifficulty: [
        { difficulty: "Easy", count: 100 },
        { difficulty: "Medium", count: 100 },
      ],
      questionsBySubject: [
        { subject: "Matematika", count: 100 },
        { subject: "Fisika", count: 100 },
      ],
    },
    systemStats: {
      databaseSize: "500 MB",
      dataIntegrityScore: 88.5,
      userGrowthRate: 5.2,
      testCreationRate: 3.1,
      averageSessionDuration: 30.2,
    },
  },
  message: "Partial dashboard statistics available",
};