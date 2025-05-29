import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDetailAnswerByTestAndUserId } from "@/shared/apis/answers/api";
import { TResponseAnswer } from "@/shared/apis/answers/type";
import { TResponseError } from "@/shared/commons/types/response";

export const useGetDetailByTestAndUserIdAnswer = (params: {
  testId: string;
  userId: string;
}): UseQueryResult<TResponseAnswer, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-by-test-and-user-id-answer", params],
    queryFn: async () => await getDetailAnswerByTestAndUserId(params),
  });
};
