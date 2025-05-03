import { getListTest } from "@/api/tests/api";
import { TTestListResponse } from "@/api/tests/type";
import { TMetaRequest } from "@/commons/types/meta";
import { TResponseError } from "@/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListTest = (
  params: TMetaRequest,
): UseQueryResult<TTestListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-test"],
    queryFn: async () => await getListTest(params),
  });
};
