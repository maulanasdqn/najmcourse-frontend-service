import { getListTest } from "@/shared/apis/tests/api";
import { TTestListResponse } from "@/shared/apis/tests/type";
import { TMetaRequest } from "@/shared/commons/types/meta";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListTest = (
  params: TMetaRequest,
): UseQueryResult<TTestListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-test"],
    queryFn: async () => await getListTest(params),
  });
};
