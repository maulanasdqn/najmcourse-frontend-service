// System-wide enumerations derived from OpenAPI schema
// These enums provide type safety and consistency across the application

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  MODERATOR = "moderator",
  INSTRUCTOR = "instructor"
}

export enum StudentType {
  REGULAR = "regular",
  PREMIUM = "premium",
  VIP = "vip",
  TRIAL = "trial"
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export enum Religion {
  ISLAM = "islam",
  CHRISTIAN = "christian",
  OTHER = "other"
}

export enum TestStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
  SCHEDULED = "scheduled"
}

export enum TestType {
  PRACTICE = "practice",
  ASSESSMENT = "assessment",
  MOCK_EXAM = "mock_exam",
  DIAGNOSTIC = "diagnostic"
}

export enum SessionStatus {
  UPCOMING = "upcoming",
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  EXPIRED = "expired"
}

export enum SessionCategory {
  MATHEMATICS = "mathematics",
  SCIENCE = "science",
  LANGUAGE = "language",
  SOCIAL_STUDIES = "social_studies",
  GENERAL_KNOWLEDGE = "general_knowledge",
  APTITUDE = "aptitude"
}

export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  TRUE_FALSE = "true_false",
  FILL_IN_BLANK = "fill_in_blank",
  ESSAY = "essay",
  MATCHING = "matching",
  ORDERING = "ordering"
}

export enum QuestionDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  EXPERT = "expert"
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded"
}

export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  BANK_TRANSFER = "bank_transfer",
  DIGITAL_WALLET = "digital_wallet",
  VOUCHER = "voucher"
}

export enum AchievementType {
  STREAK = "streak",
  PERFORMANCE = "performance",
  COMPLETION = "completion",
  IMPROVEMENT = "improvement",
  MILESTONE = "milestone"
}

export enum EventType {
  WORKSHOP = "workshop",
  WEBINAR = "webinar",
  COMPETITION = "competition",
  SEMINAR = "seminar",
  BOOTCAMP = "bootcamp"
}

export enum EventStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum NotificationType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  ANNOUNCEMENT = "announcement"
}

export enum AnalyticsTimeframe {
  TODAY = "today",
  WEEK = "week",
  MONTH = "month",  
  QUARTER = "quarter",
  YEAR = "year",
  ALL_TIME = "all_time"
}

export enum AnalyticsMetric {
  ACCURACY = "accuracy",
  SPEED = "speed",
  COMPLETION_RATE = "completion_rate",
  IMPROVEMENT = "improvement",
  ENGAGEMENT = "engagement"
}

export enum DashboardWidgetType {
  CHART = "chart",
  METRIC = "metric",
  TABLE = "table",
  PROGRESS = "progress",
  LEADERBOARD = "leaderboard"
}

export enum SubjectCategory {
  STEM = "stem",
  HUMANITIES = "humanities",
  LANGUAGES = "languages",
  ARTS = "arts",
  VOCATIONAL = "vocational"
}

export enum ProficiencyLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert"
}

export enum FeedbackType {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  SUGGESTION = "suggestion",
  BUG_REPORT = "bug_report"
}

export enum DeviceType {
  DESKTOP = "desktop",
  TABLET = "tablet",
  MOBILE = "mobile"
}

export enum TimeZone {
  UTC = "UTC",
  EST = "America/New_York",
  PST = "America/Los_Angeles",
  GMT = "Europe/London",
  CET = "Europe/Paris",
  JST = "Asia/Tokyo",
  IST = "Asia/Kolkata",
  AEST = "Australia/Sydney"
}