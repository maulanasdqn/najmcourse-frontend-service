import { getListUser } from "@/shared/apis/users/api";
import { TUserListResponse } from "@/shared/apis/users/type";
import { TMetaRequest } from "@/shared/commons/types/meta";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListUser = (
  props: TMetaRequest,
): UseQueryResult<TUserListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-user", props],
    queryFn: async () => await getListUser(props),
  });
};
