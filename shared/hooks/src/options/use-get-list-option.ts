import { getListOption } from "@/shared/apis/options/api";
import { TOptionListResponse } from "@/shared/apis/options/type";
import { TMetaRequest } from "@/shared/commons/types/meta";
import { TResponseError } from "@/shared/commons/types/response";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetListOption = (
  props: TMetaRequest,
): UseQueryResult<TOptionListResponse, TResponseError> => {
  return useQuery({
    queryKey: ["get-list-option", props],
    queryFn: async () => await getListOption(props),
  });
};
