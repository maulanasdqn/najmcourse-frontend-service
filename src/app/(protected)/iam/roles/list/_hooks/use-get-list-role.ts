import { getListRole } from "@/api/roles/api";
import { TRoleListResponse } from "@/api/roles/type";
import { TMetaRequest } from "@/commons/types/meta";
import { TResponseError } from "@/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListRole = (
  params: TMetaRequest,
): UseQueryResult<TRoleListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-role", params],
    queryFn: async () => await getListRole(params),
  });
};
