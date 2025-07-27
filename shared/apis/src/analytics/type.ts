import { z } from "zod";
import { analyticsQuerySchema } from "./schema";
import type { TSuccessResponse } from "@/shared/commons/types/api";
import type { TTimeSeriesData, TAggregationPeriod } from "@/shared/commons/types/dates";
import type { AnalyticsTimeframe, AnalyticsMetric } from "@/shared/commons/types/enums";

export type TAnalyticsDataPoint = {
  timestamp: string;
  value: number;
  label?: string;
  metadata?: Record<string, unknown>;
};

export type TAnalyticsMetric = {
  name: string;
  value: number;
  change: number;
  change_percentage: number;
  trend: "up" | "down" | "stable";
  previous_period_value?: number;
  target_value?: number;
  unit?: string;
  format?: "number" | "percentage" | "currency" | "duration";
};

export type TAnalyticsChart = {
  title: string;
  type: "line" | "bar" | "pie" | "doughnut" | "area" | "scatter";
  data: TTimeSeriesData[];
  labels?: string[];
  colors?: string[];
  options?: Record<string, unknown>;
};

export type TAnalyticsFilter = {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "between";
  value: string | number | (string | number)[];
};

export type TAnalyticsQuery = {
  timeframe: AnalyticsTimeframe;
  start_date?: string;
  end_date?: string;
  aggregation: TAggregationPeriod;
  metrics: AnalyticsMetric[];
  dimensions?: string[];
  filters?: TAnalyticsFilter[];
  limit?: number;
  sort_by?: string;
  sort_direction?: "asc" | "desc";
};

// Student Performance Analytics
export type TStudentPerformanceMetrics = {
  overall_accuracy: TAnalyticsMetric;
  average_score: TAnalyticsMetric;
  completion_rate: TAnalyticsMetric;
  time_spent: TAnalyticsMetric;
  streak_count: TAnalyticsMetric;
  improvement_rate: TAnalyticsMetric;
};

export type TSubjectPerformance = {
  subject_id: string;
  subject_name: string;
  accuracy: number;
  average_score: number;
  tests_completed: number;
  time_spent: number;
  difficulty_distribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  recent_trend: "improving" | "declining" | "stable";
};

export type TStudentAnalytics = {
  student_id: string;
  period: {
    start_date: string;
    end_date: string;
  };
  metrics: TStudentPerformanceMetrics;
  subject_performance: TSubjectPerformance[];
  learning_pattern: {
    peak_hours: number[];
    active_days: string[];
    session_duration_avg: number;
    preferred_difficulty: "easy" | "medium" | "hard";
  };
  recommendations: {
    focus_subjects: string[];
    suggested_difficulty: "easy" | "medium" | "hard";
    optimal_study_time: number;
    next_goals: string[];
  };
};

// System-wide Analytics
export type TSystemMetrics = {
  total_users: TAnalyticsMetric;
  active_users: TAnalyticsMetric;
  new_registrations: TAnalyticsMetric;
  total_tests: TAnalyticsMetric;
  tests_completed: TAnalyticsMetric;
  average_session_duration: TAnalyticsMetric;
  completion_rate: TAnalyticsMetric;
  user_satisfaction: TAnalyticsMetric;
};

export type TEngagementMetrics = {
  daily_active_users: TAnalyticsChart;
  session_duration: TAnalyticsChart;
  feature_usage: {
    feature_name: string;
    usage_count: number;
    unique_users: number;
    engagement_rate: number;
  }[];
  retention_rate: {
    day_1: number;
    day_7: number;
    day_30: number;
    day_90: number;
  };
};

export type TContentAnalytics = {
  most_popular_tests: {
    test_id: string;
    test_title: string;
    attempts: number;
    average_score: number;
    completion_rate: number;
  }[];
  question_difficulty_analysis: {
    question_id: string;
    difficulty_rating: number;
    success_rate: number;
    average_time: number;
    attempts: number;
  }[];
  subject_popularity: {
    subject: string;
    student_count: number;
    test_count: number;
    engagement_score: number;
  }[];
};

// Real-time Analytics
export type TRealTimeMetrics = {
  active_users_now: number;
  active_sessions: number;
  tests_in_progress: number;
  server_response_time: number;
  error_rate: number;
  last_updated: string;
};

export type TRealTimeEvent = {
  id: string;
  type: "user_login" | "test_started" | "test_completed" | "achievement_earned" | "error_occurred";
  user_id?: string;
  data: Record<string, unknown>;
  timestamp: string;
};

// Performance Comparison
export type TPerformanceComparison = {
  student_id: string;
  peer_group: "class" | "grade" | "school" | "national";
  metrics: {
    accuracy: {
      student_value: number;
      peer_average: number;
      percentile: number;
    };
    speed: {
      student_value: number;
      peer_average: number;
      percentile: number;
    };
    consistency: {
      student_value: number;
      peer_average: number;
      percentile: number;
    };
  };
  ranking: {
    overall_rank: number;
    total_peers: number;
    subject_rankings: {
      subject: string;
      rank: number;
      total: number;
    }[];
  };
};

export type TAnalyticsQueryRequest = z.infer<typeof analyticsQuerySchema>;

export type TStudentAnalyticsResponse = TSuccessResponse<TStudentAnalytics>;
export type TSystemMetricsResponse = TSuccessResponse<TSystemMetrics>;
export type TEngagementMetricsResponse = TSuccessResponse<TEngagementMetrics>;
export type TContentAnalyticsResponse = TSuccessResponse<TContentAnalytics>;
export type TRealTimeMetricsResponse = TSuccessResponse<TRealTimeMetrics>;
export type TPerformanceComparisonResponse = TSuccessResponse<TPerformanceComparison>;