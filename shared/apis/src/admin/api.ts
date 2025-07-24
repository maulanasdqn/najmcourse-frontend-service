import { api } from "@/shared/libs/axios/api";
import { ENDPOINTS } from "@/shared/commons/constants/endpoints";
import { adminDashboardStatsSchema } from "./schema";
import type { TAdminDashboardStatsResponse } from "./type";

export const getAdminDashboardStats = async (): Promise<TAdminDashboardStatsResponse> => {
  try {
    const { data } = await api({
      url: ENDPOINTS.ADMIN.DASHBOARD_STATS,
      method: "GET",
    });
    
    // Validate the response against our schema
    const validatedData = adminDashboardStatsSchema.parse(data);
    return validatedData;
  } catch (error) {
    // Re-throw with better context if it's a validation error
    if (error instanceof Error && error.name === 'ZodError') {
      throw new Error(`Invalid admin dashboard stats response: ${error.message}`);
    }
    throw error;
  }
};