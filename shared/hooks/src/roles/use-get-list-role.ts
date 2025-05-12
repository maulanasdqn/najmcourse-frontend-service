import { getListRole } from "@/shared/apis/roles/api";
import { TRoleListResponse } from "@/shared/apis/roles/type";
import { TMetaRequest } from "@/shared/commons/types/meta";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListRole = (
  props: TMetaRequest,
): UseQueryResult<TRoleListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-role", props],
    queryFn: async () => await getListRole(props),
  });
};
