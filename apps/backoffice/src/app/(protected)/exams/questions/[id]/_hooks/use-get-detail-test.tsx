import { getDetailTest } from "@/shared/apis/tests/api";
import { TTestDetailResponse } from "@/shared/apis/tests/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDetailTest = (
  id?: string,
): UseQueryResult<TTestDetailResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-test", id],
    queryFn: async () => await getDetailTest(id),
    enabled: !!id,
  });
};
