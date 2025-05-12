import { useUrlSearchParams } from "@/shared/components/ui/data-table/hooks/use-url-search-params";
import { useGetListTest } from "@/shared/hooks/tests/use-get-list-test";
import { useColumnTest } from "./use-column-test";

export const useListTest = () => {
  const { params } = useUrlSearchParams();
  const { data, isLoading, refetch } = useGetListTest(params);
  const { columns } = useColumnTest({
    refetch,
  });

  return {
    isLoading,
    dataSource: data?.data,
    meta: data?.meta,
    columns,
  };
};
