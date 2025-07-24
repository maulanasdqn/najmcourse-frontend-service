import { getAdminDashboardStats } from "@/shared/apis/admin/api";
import { TAdminDashboardStatsResponse } from "@/shared/apis/admin/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDashboardStats = (): UseQueryResult<TAdminDashboardStatsResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-dashboard-stats"],
    queryFn: async () => await getAdminDashboardStats(),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
  });
};