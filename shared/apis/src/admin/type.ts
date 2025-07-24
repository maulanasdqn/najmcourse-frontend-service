// Admin Dashboard Stats Types
export interface TAdminDashboardStatsResponse {
  data: {
    userStats: {
      totalUsers: number;
      activeUsers: number;
      inactiveUsers: number;
      registrationTrends: Array<{
        month: string;
        count: number;
      }>;
    };
    examinationStats: {
      totalTests: number;
      totalSessions: number;
      totalQuestions: number;
      totalAnswersSubmitted: number;
      testsByCategory: Array<{
        category: string;
        count: number;
      }>;
    };
    performanceStats: {
      monthlyActiveUsers: number;
      totalTestAttempts: number;
      averageScore: number;
      completionRate: number;
      scoreTrends: Array<{
        month: string;
        averageScore: number;
      }>;
    };
    contentStats: {
      totalQuestions: number;
      totalOptions: number;
      questionsByDifficulty: Array<{
        difficulty: string;
        count: number;
      }>;
      questionsBySubject: Array<{
        subject: string;
        count: number;
      }>;
    };
    systemStats: {
      databaseSize: string;
      dataIntegrityScore: number;
      userGrowthRate: number;
      testCreationRate: number;
      averageSessionDuration: number;
    };
  };
  message: string;
}