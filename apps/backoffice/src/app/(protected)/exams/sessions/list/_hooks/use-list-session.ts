import { useUrlSearchParams } from "@/shared/components/ui/data-table/hooks/use-url-search-params";
import { useGetListSession } from "./use-get-list-session";
import { useColumnSession } from "./use-column-session";

export const useListSession = () => {
  const { params } = useUrlSearchParams();
  const { data, isLoading, refetch } = useGetListSession(params);
  const { columns } = useColumnSession({
    refetch,
  });

  return {
    isLoading,
    dataSource: data?.data,
    meta: data?.meta,
    columns,
  };
};
