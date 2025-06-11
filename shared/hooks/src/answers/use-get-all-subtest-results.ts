import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { getDetailAnswerByTestSubTestAndUserId } from "@/shared/apis/answers/api";
import { TResponseAnswer } from "@/shared/apis/answers/type";
import { TResponseError } from "@/shared/commons/types/response";

export const useGetAllSubTestResults = (params: {
  testId: string;
  userId: string;
  subTestIds: string[];
}): UseQueryResult<TResponseAnswer, TResponseError>[] => {
  return useQueries({
    queries: params.subTestIds.map((subTestId) => ({
      queryKey: [
        "get-detail-by-test-subtest-and-user-id-answer",
        params.testId,
        subTestId,
        params.userId,
      ],
      queryFn: async () =>
        await getDetailAnswerByTestSubTestAndUserId({
          testId: params.testId,
          subTestId,
          userId: params.userId,
        }),
      enabled: !!params.testId && !!params.userId && !!subTestId,
    })),
  });
};
