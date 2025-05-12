import { getListQuestion } from "@/shared/apis/questions/api";
import { TQuestionListResponse } from "@/shared/apis/questions/type";
import { TMetaRequest } from "@/shared/commons/types/meta";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListQuestion = (
  props?: TMetaRequest,
): UseQueryResult<TQuestionListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-question", props],
    queryFn: async () => await getListQuestion(props),
  });
};
