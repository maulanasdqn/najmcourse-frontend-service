import { getDetailPermission } from "@/shared/apis/permissions/api";
import { TPermissionDetailResponse } from "@/shared/apis/permissions/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDetailPermission = (
  id?: string,
): UseQueryResult<TPermissionDetailResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-permission", id],
    queryFn: async () => await getDetailPermission(id),
    enabled: !!id,
  });
};
