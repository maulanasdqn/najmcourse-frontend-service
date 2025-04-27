import { getListPermission } from "@/api/permissions/api";
import { TPermissionListResponse } from "@/api/permissions/type";
import { useQuery } from "@/app/_hooks/request/use-query";
import { TMetaRequest } from "@/commons/types/meta";
import { TResponseError } from "@/commons/types/response";
import { UseQueryResult } from "@tanstack/react-query";

export const useGetListPermission = (
  params: TMetaRequest,
): UseQueryResult<TPermissionListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-permission", params],
    queryFn: async () => await getListPermission(params),
  });
};
