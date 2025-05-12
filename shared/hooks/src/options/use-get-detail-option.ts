import { getDetailOption } from "@/shared/apis/options/api";
import { TOptionDetailResponse } from "@/shared/apis/options/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDetailOption = (
  id?: string,
): UseQueryResult<TOptionDetailResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-option", id],
    queryFn: async () => await getDetailOption(id),
    enabled: !!id,
  });
};
