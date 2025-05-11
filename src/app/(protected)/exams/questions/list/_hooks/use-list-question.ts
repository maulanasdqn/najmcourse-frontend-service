import { useUrlSearchParams } from "@/app/_components/ui/data-table/hooks/use-url-search-params";
import { useGetListQuestion } from "./use-get-list-question";
import { useColumnQuestion } from "./use-column-question";

export const useListQuestion = () => {
  const { params } = useUrlSearchParams();
  const { data, isLoading, refetch } = useGetListQuestion(params);
  const { columns } = useColumnQuestion({
    refetch,
  });

  return {
    isLoading,
    dataSource: data?.data,
    meta: data?.meta,
    columns,
  };
};
