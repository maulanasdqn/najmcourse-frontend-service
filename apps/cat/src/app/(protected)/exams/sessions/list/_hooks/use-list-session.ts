import { useUrlSearchParams } from "@/shared/components/ui/data-table/hooks/use-url-search-params";
import { useGetListSession } from "@/shared/hooks/sessions/use-get-list-session";
import { useColumnSession } from "./use-column-session";
import { useSession } from "@/shared/components/providers";

export const useListSession = () => {
  const { session } = useSession();
  const userData = session?.user;
  const { params } = useUrlSearchParams();
  const { data, isLoading, refetch } = useGetListSession(params);
  const { columns } = useColumnSession({
    refetch,
  });

  return {
    isLoading,
    dataSource: data?.data.filter(
      (item) => item.student_type === userData?.student_type || item.student_type === "ALL",
    ),
    meta: data?.meta,
    columns,
  };
};
