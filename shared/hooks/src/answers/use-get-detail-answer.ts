import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDetailAnswer } from "@/shared/apis/answers/api";
import { TResponseAnswer } from "@/shared/apis/answers/type";
import { TResponseError } from "@/shared/commons/types/response";

export const useGetDetailAnswer = (id: string): UseQueryResult<TResponseAnswer, TResponseError> => {
  return useQuery({
    queryKey: ["get-detail-answer", id],
    queryFn: async () => await getDetailAnswer(id),
  });
};
