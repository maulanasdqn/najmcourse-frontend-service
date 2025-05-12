import { getDetailRole } from "@/shared/apis/roles/api";
import { TRoleDetailResponse } from "@/shared/apis/roles/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDetailRole = (
  id?: string,
): UseQueryResult<TRoleDetailResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-role", id],
    queryFn: async () => await getDetailRole(id),
    enabled: !!id,
  });
};
