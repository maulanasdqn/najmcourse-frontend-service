import { getStudentStats } from "@/shared/apis/student/api";
import { TStudentStatsResponse } from "@/shared/apis/student/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetStudentStats = (
  userId: string,
  enabled = true
): UseQueryResult<TStudentStatsResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-student-stats", userId],
    queryFn: async () => await getStudentStats(userId),
    enabled: !!userId && enabled,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  });
};