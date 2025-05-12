import { useUrlSearchParams } from "@/shared/components/ui/data-table/hooks/use-url-search-params";
import { useGetListRole } from "@/shared/hooks/roles/use-get-list-role";
import { useColumnRole } from "./use-column-role";

export const useListRole = () => {
  const { params } = useUrlSearchParams();
  const { data, isLoading, refetch } = useGetListRole(params);
  const { columns } = useColumnRole({
    refetch,
  });

  return {
    isLoading,
    dataSource: data?.data,
    meta: data?.meta,
    columns,
  };
};
