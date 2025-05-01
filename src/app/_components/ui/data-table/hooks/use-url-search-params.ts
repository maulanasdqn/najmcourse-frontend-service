import { EMetaOrder } from "@/commons/types/meta";
import { useSearchParams } from "react-router";

export const useUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (key: string, value: string | number | undefined) => {
    if (value === undefined || value === null || value === "") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value.toString());
    }
    setSearchParams(searchParams);
  };

  const params = {
    page: parseInt(searchParams.get("page") ?? "1", 10),
    per_page: parseInt(searchParams.get("per_page") ?? "10", 10),
    search: searchParams.get("search") ?? "",
    sort_by: searchParams.get("sort_by") ?? "",
    order: (searchParams.get("order") as EMetaOrder) ?? EMetaOrder.ASC,
    filter: searchParams.get("filter") ?? "",
    filter_by: searchParams.get("filter_by") ?? "",
  };

  const setParams = {
    setPage: (value: number) => updateParams("page", value),
    setPerPage: (value: number) => updateParams("per_page", value),
    setSearch: (value: string) => updateParams("search", value),
    setSortBy: (value: string) => updateParams("sort_by", value),
    setOrder: (value: EMetaOrder) => updateParams("order", value),
    setFilter: (value: string) => updateParams("filter", value),
    setFilterBy: (value: string) => updateParams("filter_by", value),
  };

  return { params, setParams };
};
