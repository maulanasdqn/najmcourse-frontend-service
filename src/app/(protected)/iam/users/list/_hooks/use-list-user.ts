import { useUrlSearchParams } from "@/app/_components/ui/data-table/hooks/use-url-search-params";
import { useGetListUser } from "./use-get-list-user";
import { useColumnUser } from "./use-column-user";

export const useListUser = () => {
  const { params } = useUrlSearchParams();
  const { data, isLoading, refetch } = useGetListUser(params);
  const { columns } = useColumnUser({
    refetch,
  });
  return {
    isLoading,
    dataSource: data?.data,
    meta: data?.meta,
    columns,
  };
};
