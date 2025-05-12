import { useUrlSearchParams } from "@/shared/components/ui/data-table/hooks/use-url-search-params";
import { useGetListPermission } from "@/shared/hooks/permissions/use-get-list-permission";
import { useColumnPermission } from "../_hooks/use-column-permission";

export const useListPermissions = () => {
  const { params } = useUrlSearchParams();
  const { data, isLoading, refetch } = useGetListPermission(params);
  const { columns } = useColumnPermission({
    refetch,
  });

  return {
    isLoading,
    dataSource: data?.data,
    meta: data?.meta,
    columns,
  };
};
