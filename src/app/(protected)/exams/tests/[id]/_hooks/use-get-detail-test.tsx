import { getDetailTest } from "@/api/tests/api";
import { TTestDetailResponse } from "@/api/tests/type";
import { TResponseError } from "@/commons/types/response";
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
