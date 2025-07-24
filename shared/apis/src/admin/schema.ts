import { z } from "zod";

const trendDataSchema = z.object({
  month: z.string(),
  count: z.number(),
});

const scoreTrendSchema = z.object({
  month: z.string(),
  averageScore: z.number(),
});

const categoryDataSchema = z.object({
  category: z.string(),
  count: z.number(),
});

const difficultyDataSchema = z.object({
  difficulty: z.string(),
  count: z.number(),
});

const subjectDataSchema = z.object({
  subject: z.string(),
  count: z.number(),
});

const userStatsSchema = z.object({
  totalUsers: z.number(),
  activeUsers: z.number(),
  inactiveUsers: z.number(),
  registrationTrends: z.array(trendDataSchema),
});

const examinationStatsSchema = z.object({
  totalTests: z.number(),
  totalSessions: z.number(),
  totalQuestions: z.number(),
  totalAnswersSubmitted: z.number(),
  testsByCategory: z.array(categoryDataSchema),
});

const performanceStatsSchema = z.object({
  monthlyActiveUsers: z.number(),
  totalTestAttempts: z.number(),
  averageScore: z.number(),
  completionRate: z.number(),
  scoreTrends: z.array(scoreTrendSchema),
});

const contentStatsSchema = z.object({
  totalQuestions: z.number(),
  totalOptions: z.number(),
  questionsByDifficulty: z.array(difficultyDataSchema),
  questionsBySubject: z.array(subjectDataSchema),
});

const systemStatsSchema = z.object({
  databaseSize: z.string(),
  dataIntegrityScore: z.number(),
  userGrowthRate: z.number(),
  testCreationRate: z.number(),
  averageSessionDuration: z.number(),
});

export const adminDashboardStatsSchema = z.object({
  data: z.object({
    userStats: userStatsSchema,
    examinationStats: examinationStatsSchema,
    performanceStats: performanceStatsSchema,
    contentStats: contentStatsSchema,
    systemStats: systemStatsSchema,
  }),
  message: z.string(),
});