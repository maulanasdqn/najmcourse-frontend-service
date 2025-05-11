import { getListQuestion } from "@/api/questions/api";
import { TQuestionListResponse } from "@/api/questions/type";
import { TMetaRequest } from "@/commons/types/meta";
import { TResponseError } from "@/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListQuestion = (
  params: TMetaRequest,
): UseQueryResult<TQuestionListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-question", params],
    queryFn: async () => await getListQuestion(params),
  });
};
