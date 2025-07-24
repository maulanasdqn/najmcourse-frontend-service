// Student Dashboard Stats Types
export interface TStudentDashboardStatsResponse {
  data: {
    profile: {
      userId: string;
      fullname: string;
      email: string;
      studentType: string;
    };
    performance: {
      overallScore: number;
      totalTestsTaken: number;
      completedTests: number;
      averageCompletionTime: number;
      improvementRate: number;
      currentStreak: number;
    };
    currentSessions: Array<{
      sessionId: string;
      sessionName: string;
      testName: string;
      status: "active" | "completed" | "paused";
      progress: number;
      startedAt: string;
      lastActivity: string;
    }>;
    subjectBreakdown: Array<{
      subject: string;
      averageScore: number;
      testsTaken: number;
      mastery: number;
      lastActivity: string;
    }>;
    achievements: Array<{
      id: string;
      title: string;
      description: string;
      type: string;
      unlockedAt: string;
      icon: string;
    }>;
    recentActivity: Array<{
      id: string;
      type: "test_completed" | "session_started" | "achievement_unlocked";
      description: string;
      timestamp: string;
      score?: number;
      testName?: string;
    }>;
    recommendations: Array<{
      id: string;
      type: "practice" | "review" | "challenge";
      title: string;
      description: string;
      subject: string;
      priority: "high" | "medium" | "low";
    }>;
    comparison: {
      classAverage: number;
      userRank: number;
      totalStudents: number;
      percentile: number;
    };
  };
  message: string;
}

// Student Stats Types
export interface TStudentStatsResponse {
  data: {
    monthlyScores: Array<{
      month: string;
      averageScore: number;
      testsTaken: number;
    }>;
    totalTestsTaken: number;
    overallAverageScore: number;
    performanceTrend: "improving" | "declining" | "stable";
    subjectPerformance: Array<{
      subject: string;
      averageScore: number;
      testCount: number;
      improvement: number;
    }>;
    weeklyActivity: Array<{
      week: string;
      testsCompleted: number;
      hoursSpent: number;
      averageScore: number;
    }>;
    strongestSubjects: Array<{
      subject: string;
      score: number;
    }>;
    areasForImprovement: Array<{
      subject: string;
      score: number;
      gap: number;
    }>;
  };
  message: string;
}