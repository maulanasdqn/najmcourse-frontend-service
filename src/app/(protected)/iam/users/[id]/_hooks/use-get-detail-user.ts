import { getDetailUser } from "@/api/users/api";
import { TUserDetailResponse } from "@/api/users/type";
import { TResponseError } from "@/commons/types/response";
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
