import { useUrlSearchParams } from "@/app/_components/ui/data-table/hooks/use-url-search-params";
import { useGetListPermission } from "./use-get-list-permission";
import { columns } from "../_constants/table-columns";

export const useListPermissions = () => {
  const { params } = useUrlSearchParams();
  const { data, isLoading } = useGetListPermission(params);

  return {
    isLoading,
    dataSource: data?.data,
    meta: data?.meta,
    columns,
  };
};
