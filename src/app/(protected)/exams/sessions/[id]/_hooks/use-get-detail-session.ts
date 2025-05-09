import { getDetailSession } from "@/api/sessions/api";
import { TSessionDetailResponse } from "@/api/sessions/type";
import { TResponseError } from "@/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDetailSession = (
  id?: string,
): UseQueryResult<TSessionDetailResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-session", id],
    queryFn: async () => await getDetailSession(id),
    enabled: !!id,
  });
};
