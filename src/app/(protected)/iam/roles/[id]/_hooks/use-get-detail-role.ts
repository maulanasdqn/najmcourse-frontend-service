import { getDetailRole } from "@/api/roles/api";
import { TRoleDetailResponse } from "@/api/roles/type";
import { TResponseError } from "@/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDetailRole = (
  id: string,
): UseQueryResult<TRoleDetailResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-role", id],
    queryFn: async () => await getDetailRole(id),
    enabled: !!id,
  });
};
