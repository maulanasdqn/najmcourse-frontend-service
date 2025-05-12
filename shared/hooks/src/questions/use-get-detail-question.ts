import { getDetailQuestion } from "@/shared/apis/questions/api";
import { TQuestionDetailResponse } from "@/shared/apis/questions/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetDetailQuestion = (
  id: string,
): UseQueryResult<TQuestionDetailResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-question", id],
    queryFn: async () => await getDetailQuestion(id),
    enabled: !!id,
  });
};
