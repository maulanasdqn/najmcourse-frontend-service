import { z } from "zod";

const profileSchema = z.object({
  userId: z.string(),
  fullname: z.string(),
  email: z.string().email(),
  studentType: z.string(),
});

const performanceSchema = z.object({
  overallScore: z.number(),
  totalTestsTaken: z.number(),
  completedTests: z.number(),
  averageCompletionTime: z.number(),
  improvementRate: z.number(),
  currentStreak: z.number(),
});

const currentSessionSchema = z.object({
  sessionId: z.string(),
  sessionName: z.string(),
  testName: z.string(),
  status: z.enum(["active", "completed", "paused"]),
  progress: z.number(),
  startedAt: z.string(),
  lastActivity: z.string(),
});

const subjectBreakdownSchema = z.object({
  subject: z.string(),
  averageScore: z.number(),
  testsTaken: z.number(),
  mastery: z.number(),
  lastActivity: z.string(),
});

const achievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  unlockedAt: z.string(),
  icon: z.string(),
});

const recentActivitySchema = z.object({
  id: z.string(),
  type: z.enum(["test_completed", "session_started", "achievement_unlocked"]),
  description: z.string(),
  timestamp: z.string(),
  score: z.number().optional(),
  testName: z.string().optional(),
});

const recommendationSchema = z.object({
  id: z.string(),
  type: z.enum(["practice", "review", "challenge"]),
  title: z.string(),
  description: z.string(),
  subject: z.string(),
  priority: z.enum(["high", "medium", "low"]),
});

const comparisonSchema = z.object({
  classAverage: z.number(),
  userRank: z.number(),
  totalStudents: z.number(),
  percentile: z.number(),
});

export const studentDashboardStatsSchema = z.object({
  data: z.object({
    profile: profileSchema,
    performance: performanceSchema,
    currentSessions: z.array(currentSessionSchema),
    subjectBreakdown: z.array(subjectBreakdownSchema),
    achievements: z.array(achievementSchema),
    recentActivity: z.array(recentActivitySchema),
    recommendations: z.array(recommendationSchema),
    comparison: comparisonSchema,
  }),
  message: z.string(),
});

const monthlyScoreSchema = z.object({
  month: z.string(),
  averageScore: z.number(),
  testsTaken: z.number(),
});

const subjectPerformanceSchema = z.object({
  subject: z.string(),
  averageScore: z.number(),
  testCount: z.number(),
  improvement: z.number(),
});

const weeklyActivitySchema = z.object({
  week: z.string(),
  testsCompleted: z.number(),
  hoursSpent: z.number(),
  averageScore: z.number(),
});

const strongestSubjectSchema = z.object({
  subject: z.string(),
  score: z.number(),
});

const improvementAreaSchema = z.object({
  subject: z.string(),
  score: z.number(),
  gap: z.number(),
});

export const studentStatsSchema = z.object({
  data: z.object({
    monthlyScores: z.array(monthlyScoreSchema),
    totalTestsTaken: z.number(),
    overallAverageScore: z.number(),
    performanceTrend: z.enum(["improving", "declining", "stable"]),
    subjectPerformance: z.array(subjectPerformanceSchema),
    weeklyActivity: z.array(weeklyActivitySchema),
    strongestSubjects: z.array(strongestSubjectSchema),
    areasForImprovement: z.array(improvementAreaSchema),
  }),
  message: z.string(),
});