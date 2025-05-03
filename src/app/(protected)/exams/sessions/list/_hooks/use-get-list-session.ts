import { getListSession } from "@/api/sessions/api";
import { TSessionListResponse } from "@/api/sessions/type";
import { TMetaRequest } from "@/commons/types/meta";
import { TResponseError } from "@/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListSession = (
  params: TMetaRequest,
): UseQueryResult<TSessionListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-session", params],
    queryFn: async () => await getListSession(params),
  });
};
