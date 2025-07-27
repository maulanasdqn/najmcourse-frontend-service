import { z } from "zod";
import { nonEmptyStringSchema, titleSchema, descriptionSchema, positiveIntSchema } from "@/shared/commons/types/validation";

const achievementConditionSchema = z.object({
  type: z.enum(["streak", "score", "completion", "time_based", "custom"]),
  operator: z.enum(["eq", "gt", "gte", "lt", "lte"]),
  value: z.number(),
  timeframe: z.string().optional(),
  subject_id: z.string().uuid().optional(),
  test_type: z.string().optional()
});

const achievementRewardSchema = z.object({
  type: z.enum(["badge", "points", "certificate", "unlock_content"]),
  value: z.number(),
  content_id: z.string().uuid().optional(),
  certificate_template: z.string().optional()
});

export const achievementCreateSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  detailed_description: z.string().max(2000).optional(),
  type: z.enum(["streak", "performance", "completion", "improvement", "milestone"]),
  difficulty: z.enum(["easy", "medium", "hard", "legendary"]),
  icon: nonEmptyStringSchema,
  badge_color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color"),
  points: positiveIntSchema,
  category: nonEmptyStringSchema,
  is_hidden: z.boolean().default(false),
  is_active: z.boolean().default(true),
  unlock_level: z.number().int().min(1).default(1),
  instructions: descriptionSchema.optional(),
  tips: z.array(z.string()).optional(),
  conditions: z.array(achievementConditionSchema).min(1),
  rewards: z.array(achievementRewardSchema).min(1),
  related_achievements: z.array(z.string().uuid()).optional(),
  prerequisite_achievements: z.array(z.string().uuid()).optional()
});

export const achievementUpdateSchema = achievementCreateSchema.partial();

export const achievementProgressUpdateSchema = z.object({
  current_value: z.number().min(0),
  metadata: z.record(z.unknown()).optional()
});

export const showcaseAchievementSchema = z.object({
  achievement_ids: z.array(z.string().uuid()).max(5),
  showcase_order: z.array(z.number().int().min(1).max(5)).optional()
});