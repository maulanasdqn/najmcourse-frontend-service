import { getStudentDashboardStats } from "@/shared/apis/student/api";
import { TStudentDashboardStatsResponse } from "@/shared/apis/student/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetStudentDashboardStats = (
  userId: string,
  enabled = true
): UseQueryResult<TStudentDashboardStatsResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-student-dashboard-stats", userId],
    queryFn: async () => await getStudentDashboardStats(userId),
    enabled: !!userId && enabled,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  });
};