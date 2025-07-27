import { z } from "zod";

// Date and time utilities for the platform

export type TDateFormat = 
  | "YYYY-MM-DD"
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "YYYY-MM-DD HH:mm:ss"
  | "DD/MM/YYYY HH:mm"
  | "MM/DD/YYYY hh:mm A";

export type TTimeFormat = 
  | "HH:mm"
  | "HH:mm:ss"
  | "hh:mm A"
  | "hh:mm:ss A";

export type TDateRange = {
  start_date: string;
  end_date: string;
};

export type TTimeRange = {
  start_time: string;
  end_time: string;
};

export type TDateTimeRange = {
  start_datetime: string;
  end_datetime: string;
};

export type TSchedule = {
  date: string;
  start_time: string;
  end_time: string;
  timezone: string;
};

export type TRecurrenceType = 
  | "none"
  | "daily" 
  | "weekly"
  | "monthly"
  | "yearly";

export type TRecurrencePattern = {
  type: TRecurrenceType;
  interval: number; // every N days/weeks/months/years
  days_of_week?: number[]; // 0=Sunday, 1=Monday, etc.
  day_of_month?: number; // 1-31
  end_date?: string;
  occurrences?: number;
};

export type TRecurringSchedule = TSchedule & {
  recurrence: TRecurrencePattern;
};

// Duration utilities
export type TDurationType = "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years";

export type TDuration = {
  value: number;
  unit: TDurationType;
};

export type TTimer = {
  duration: number; // in seconds
  remaining?: number; // in seconds
  is_running: boolean;
  started_at?: string;
  paused_at?: string;
  completed_at?: string;
};

// Availability and booking
export type TAvailabilitySlot = {
  start_time: string;
  end_time: string;
  is_available: boolean;
  max_capacity?: number;
  current_bookings?: number;
};

export type TDayAvailability = {
  date: string;
  slots: TAvailabilitySlot[];
};

export type TWeeklyAvailability = {
  monday: TAvailabilitySlot[];
  tuesday: TAvailabilitySlot[];
  wednesday: TAvailabilitySlot[];
  thursday: TAvailabilitySlot[];
  friday: TAvailabilitySlot[];  
  saturday: TAvailabilitySlot[];
  sunday: TAvailabilitySlot[];
};

// Time-based analytics
export type TTimeSeriesPoint = {
  timestamp: string;
  value: number;
  label?: string;
};

export type TTimeSeriesData = {
  name: string;
  data: TTimeSeriesPoint[];
  color?: string;
};

export type TAggregationPeriod = 
  | "minute"
  | "hour" 
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

// Zod schemas for validation
export const dateStringSchema = z.string().datetime();
export const dateOnlySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const timeOnlySchema = z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);

export const dateRangeSchema = z.object({
  start_date: dateOnlySchema,
  end_date: dateOnlySchema
}).refine(data => new Date(data.start_date) <= new Date(data.end_date), {
  message: "End date must be after or equal to start date"
});

export const timeRangeSchema = z.object({
  start_time: timeOnlySchema,
  end_time: timeOnlySchema
});

export const dateTimeRangeSchema = z.object({
  start_datetime: dateStringSchema,
  end_datetime: dateStringSchema
}).refine(data => new Date(data.start_datetime) <= new Date(data.end_datetime), {
  message: "End datetime must be after or equal to start datetime"
});

export const scheduleSchema = z.object({
  date: dateOnlySchema,
  start_time: timeOnlySchema,
  end_time: timeOnlySchema,
  timezone: z.string()
});

export const recurrencePatternSchema = z.object({
  type: z.enum(["none", "daily", "weekly", "monthly", "yearly"]),
  interval: z.number().int().positive(),
  days_of_week: z.array(z.number().int().min(0).max(6)).optional(),
  day_of_month: z.number().int().min(1).max(31).optional(),
  end_date: dateOnlySchema.optional(),
  occurrences: z.number().int().positive().optional()
});

export const durationSchema = z.object({
  value: z.number().positive(),
  unit: z.enum(["seconds", "minutes", "hours", "days", "weeks", "months", "years"])
});

export const timerSchema = z.object({
  duration: z.number().int().positive(),
  remaining: z.number().int().min(0).optional(),
  is_running: z.boolean(),
  started_at: dateStringSchema.optional(),
  paused_at: dateStringSchema.optional(),
  completed_at: dateStringSchema.optional()
});

// Type inference from schemas
export type TDateRangeRequest = z.infer<typeof dateRangeSchema>;
export type TTimeRangeRequest = z.infer<typeof timeRangeSchema>;
export type TDateTimeRangeRequest = z.infer<typeof dateTimeRangeSchema>;
export type TScheduleRequest = z.infer<typeof scheduleSchema>;
export type TRecurrencePatternRequest = z.infer<typeof recurrencePatternSchema>;
export type TDurationRequest = z.infer<typeof durationSchema>;
export type TTimerRequest = z.infer<typeof timerSchema>;