import { getDetailUser } from "@/shared/apis/users/api";
import { TUserDetailResponse } from "@/shared/apis/users/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDetailUser = (
  id: string,
): UseQueryResult<TUserDetailResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-User", id],
    queryFn: async () => await getDetailUser(id),
    enabled: !!id,
  });
};
