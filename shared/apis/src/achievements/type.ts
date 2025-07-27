import { z } from "zod";
import { achievementCreateSchema, achievementUpdateSchema } from "./schema";
import type { TBaseEntity, TActivatable, TSuccessResponse, TListResponse } from "@/shared/commons/types/api";
import type { AchievementType } from "@/shared/commons/types/enums";

export type TAchievementCondition = {
  type: "streak" | "score" | "completion" | "time_based" | "custom";
  operator: "eq" | "gt" | "gte" | "lt" | "lte";
  value: number;
  timeframe?: string;
  subject_id?: string;
  test_type?: string;
};

export type TAchievementReward = {
  type: "badge" | "points" | "certificate" | "unlock_content";
  value: number;
  content_id?: string;
  certificate_template?: string;
};

export type TAchievementProgress = {
  student_id: string;
  achievement_id: string;
  current_value: number;
  target_value: number;
  progress_percentage: number;
  is_completed: boolean;
  completed_at?: string;
  started_at: string;
  last_updated: string;
};

export type TAchievementListItem = TBaseEntity & TActivatable & {
  title: string;
  description: string;
  type: AchievementType;
  difficulty: "easy" | "medium" | "hard" | "legendary";
  icon: string;
  badge_color: string;
  points: number;
  category: string;
  is_hidden: boolean;
  unlock_level: number;
  total_earned: number;
  conditions: TAchievementCondition[];
  rewards: TAchievementReward[];
};

export type TAchievementDetailItem = TAchievementListItem & {
  detailed_description: string;
  instructions: string;
  tips?: string[];
  related_achievements: string[];
  prerequisite_achievements: string[];
  progress_tracking: {
    total_students: number;
    completed_count: number;
    completion_rate: number;
    average_time_to_complete: number;
  };
};

export type TStudentAchievement = {
  id: string;
  student_id: string;
  achievement: TAchievementListItem;
  progress: TAchievementProgress;
  unlocked_at?: string;
  earned_at?: string;
  is_showcased: boolean;
  showcase_order?: number;
};

export type TAchievementStats = {
  total_achievements: number;
  earned_achievements: number;
  completion_percentage: number;
  total_points: number;
  rank: number;
  recent_achievements: TStudentAchievement[];
  next_achievements: {
    achievement: TAchievementListItem;
    progress: TAchievementProgress;
  }[];
};

export type TAchievementLeaderboard = {
  rank: number;
  student_id: string;
  student_name: string;
  student_avatar?: string;
  total_achievements: number;
  total_points: number;
  latest_achievement?: {
    title: string;
    earned_at: string;
  };
};

export type TAchievementCreateRequest = z.infer<typeof achievementCreateSchema>;
export type TAchievementUpdateRequest = z.infer<typeof achievementUpdateSchema>;

export type TAchievementListResponse = TListResponse<TAchievementListItem>;
export type TAchievementDetailResponse = TSuccessResponse<TAchievementDetailItem>;
export type TStudentAchievementListResponse = TListResponse<TStudentAchievement>;
export type TAchievementStatsResponse = TSuccessResponse<TAchievementStats>;
export type TAchievementLeaderboardResponse = TListResponse<TAchievementLeaderboard>;