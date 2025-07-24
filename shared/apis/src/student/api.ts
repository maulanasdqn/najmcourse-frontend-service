import { api } from "@/shared/libs/axios/api";
import { ENDPOINTS } from "@/shared/commons/constants/endpoints";
import { generatePath } from "react-router";
import { studentDashboardStatsSchema, studentStatsSchema } from "./schema";
import type { TStudentDashboardStatsResponse, TStudentStatsResponse } from "./type";

export const getStudentDashboardStats = async (userId: string): Promise<TStudentDashboardStatsResponse> => {
  try {
    const { data } = await api({
      url: generatePath(ENDPOINTS.STUDENT.DASHBOARD_STATS, { user_id: userId }),
      method: "GET",
    });
    
    // Validate the response against our schema
    const validatedData = studentDashboardStatsSchema.parse(data);
    return validatedData;
  } catch (error) {
    // Re-throw with better context if it's a validation error
    if (error instanceof Error && error.name === 'ZodError') {
      throw new Error(`Invalid student dashboard stats response: ${error.message}`);
    }
    throw error;
  }
};

export const getStudentStats = async (userId: string): Promise<TStudentStatsResponse> => {
  try {
    const { data } = await api({
      url: generatePath(ENDPOINTS.STUDENT.STATS, { user_id: userId }),
      method: "GET",
    });
    
    // Validate the response against our schema
    const validatedData = studentStatsSchema.parse(data);
    return validatedData;
  } catch (error) {
    // Re-throw with better context if it's a validation error
    if (error instanceof Error && error.name === 'ZodError') {
      throw new Error(`Invalid student stats response: ${error.message}`);
    }
    throw error;
  }
};