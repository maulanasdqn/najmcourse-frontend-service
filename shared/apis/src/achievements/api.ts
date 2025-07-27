import { axiosInstance } from "@/shared/libs/axios";
import type { TListParams } from "@/shared/commons/types/pagination";
import type {
  TAchievementListResponse,
  TAchievementDetailResponse,
  TStudentAchievementListResponse,
  TAchievementStatsResponse,
  TAchievementLeaderboardResponse,
  TAchievementCreateRequest,
  TAchievementUpdateRequest
} from "./type";
import type { TMessageResponse } from "@/shared/commons/types/api";

const BASE_URL = "/achievements";

// Admin/Instructor Achievement Management
export const getAchievements = (params?: TListParams): Promise<TAchievementListResponse> => {
  return axiosInstance.get(BASE_URL, { params });
};

export const getAchievementDetail = (id: string): Promise<TAchievementDetailResponse> => {
  return axiosInstance.get(`${BASE_URL}/${id}`);
};

export const createAchievement = (data: TAchievementCreateRequest): Promise<TAchievementDetailResponse> => {
  return axiosInstance.post(BASE_URL, data);
};

export const updateAchievement = (id: string, data: TAchievementUpdateRequest): Promise<TAchievementDetailResponse> => {
  return axiosInstance.put(`${BASE_URL}/${id}`, data);
};

export const deleteAchievement = (id: string): Promise<TMessageResponse> => {
  return axiosInstance.delete(`${BASE_URL}/${id}`);
};

export const toggleAchievementStatus = (id: string): Promise<TAchievementDetailResponse> => {
  return axiosInstance.patch(`${BASE_URL}/${id}/toggle-status`);
};

// Student Achievement APIs
export const getStudentAchievements = (studentId?: string, params?: TListParams): Promise<TStudentAchievementListResponse> => {
  const endpoint = studentId ? `/students/${studentId}/achievements` : "/my-achievements";
  return axiosInstance.get(endpoint, { params });
};

export const getAchievementStats = (studentId?: string): Promise<TAchievementStatsResponse> => {
  const endpoint = studentId ? `/students/${studentId}/achievement-stats` : "/my-achievement-stats";
  return axiosInstance.get(endpoint);
};

export const getAchievementLeaderboard = (params?: TListParams & { category?: string; timeframe?: string }): Promise<TAchievementLeaderboardResponse> => {
  return axiosInstance.get(`${BASE_URL}/leaderboard`, { params });
};

export const showcaseAchievements = (achievementIds: string[]): Promise<TMessageResponse> => {
  return axiosInstance.post("/my-achievements/showcase", { achievement_ids: achievementIds });
};

export const hideAchievement = (achievementId: string): Promise<TMessageResponse> => {
  return axiosInstance.post(`/my-achievements/${achievementId}/hide`);
};

// Progress tracking (usually called by system, but exposed for manual triggers)
export const checkAchievementProgress = (studentId: string, achievementId?: string): Promise<TMessageResponse> => {
  const endpoint = achievementId 
    ? `/students/${studentId}/achievements/${achievementId}/check-progress`
    : `/students/${studentId}/achievements/check-all-progress`;
  return axiosInstance.post(endpoint);
};

export const awardAchievement = (studentId: string, achievementId: string, reason?: string): Promise<TMessageResponse> => {
  return axiosInstance.post(`/students/${studentId}/achievements/${achievementId}/award`, { reason });
};

// Discovery and recommendations
export const getRecommendedAchievements = (studentId?: string, limit?: number): Promise<TAchievementListResponse> => {
  const endpoint = studentId ? `/students/${studentId}/recommended-achievements` : "/my-recommended-achievements";
  return axiosInstance.get(endpoint, { params: { limit } });
};

export const getAchievementsByCategory = (category: string, params?: TListParams): Promise<TAchievementListResponse> => {
  return axiosInstance.get(`${BASE_URL}/category/${category}`, { params });
};