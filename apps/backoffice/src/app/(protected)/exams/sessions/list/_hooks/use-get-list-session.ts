import { getListSession } from "@/shared/apis/sessions/api";
import { TSessionListResponse } from "@/shared/apis/sessions/type";
import { TMetaRequest } from "@/shared/commons/types/meta";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListSession = (
  params: TMetaRequest,
): UseQueryResult<TSessionListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-session", params],
    queryFn: async () => await getListSession(params),
  });
};
