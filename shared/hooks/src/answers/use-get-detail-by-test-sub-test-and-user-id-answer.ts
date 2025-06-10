import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDetailAnswerByTestSubTestAndUserId } from "@/shared/apis/answers/api";
import { TResponseAnswer } from "@/shared/apis/answers/type";
import { TResponseError } from "@/shared/commons/types/response";

export const useGetDetailByTestSubTestAndUserIdAnswer = (params: {
  testId: string;
  subTestId: string;
  userId: string;
}): UseQueryResult<TResponseAnswer, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-by-test-sub-test-and-user-id-answer", params],
    queryFn: async () => await getDetailAnswerByTestSubTestAndUserId(params),
  });
};
