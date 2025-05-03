import { getListUser } from "@/api/users/api";
import { TUserListResponse } from "@/api/users/type";
import { TMetaRequest } from "@/commons/types/meta";
import { TResponseError } from "@/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListUser = (
  params: TMetaRequest,
): UseQueryResult<TUserListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-user", params],
    queryFn: async () => await getListUser(params),
  });
};
