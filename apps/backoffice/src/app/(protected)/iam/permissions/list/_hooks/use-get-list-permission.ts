import { getListPermission } from "@/shared/apis/permissions/api";
import { TPermissionListResponse } from "@/shared/apis/permissions/type";
import { TMetaRequest } from "@/shared/commons/types/meta";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListPermission = (
  params: TMetaRequest,
): UseQueryResult<TPermissionListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-permission", params],
    queryFn: async () => await getListPermission(params),
  });
};
