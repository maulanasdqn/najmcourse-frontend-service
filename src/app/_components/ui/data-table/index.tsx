/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Select, Table, TableProps, Pagination } from "antd";
import { useUrlSearchParams } from "./hooks/use-url-search-params";
import { TMetaResponse, EMetaOrder } from "@/commons/types/meta";
import debounce from "just-debounce-it";
import { useEffect, useMemo, useState } from "react";

type Props<T> = TableProps<T> & {
  meta?: TMetaResponse;
  filterOptions?: { label: string; value: string }[];
  filterValues?: { label: string; value: string }[];
};

export const DataTable = <T extends Record<string, unknown>>({
  meta,
  filterOptions = [],
  filterValues = [],
  ...tableProps
}: Props<T>) => {
  const { params, setParams } = useUrlSearchParams();
  const page = Number(params.page);
  const perPage = Number(params.per_page);
  const total = meta?.total ?? 0;
  const [inputValue, setInputValue] = useState(params.search || "");

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setParams.setSearch(value);
        setParams.setPage(1);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue]);

  const perPageOptions = [5, 10, 20, 50, 100].map((val) => ({
    label: `${val} / page`,
    value: val,
  }));

  return (
    <section className="bg-white rounded-lg">
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <Input.Search
          size="large"
          placeholder="Search..."
          className="w-full max-w-[220px]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          allowClear
        />

        <Select
          size="large"
          placeholder="Filter by"
          className="w-full sm:w-[200px]"
          value={params.filter_by || undefined}
          onChange={(val) => {
            setParams.setFilterBy(val);
            setParams.setPage(1);
          }}
          allowClear
          options={filterOptions}
        />

        <Select
          size="large"
          placeholder="Filter value"
          className="w-full sm:w-[220px]"
          value={params.filter || undefined}
          onChange={(val) => {
            setParams.setFilter(val);
            if (!val) setParams.setFilterBy("");
            setParams.setPage(1);
          }}
          allowClear
          options={filterValues}
        />
      </div>

      <Table<T>
        pagination={false}
        onChange={(_: unknown, __: unknown, sorter) => {
          if (!Array.isArray(sorter) && sorter?.field && sorter?.order) {
            setParams.setSortBy(String(sorter.field));
            setParams.setOrder(sorter.order === "ascend" ? EMetaOrder.ASC : EMetaOrder.DESC);
          } else {
            setParams.setSortBy("");
            setParams.setOrder(EMetaOrder.ASC);
          }
        }}
        {...tableProps}
      />

      {meta && (
        <div className="flex justify-between items-center mt-6">
          <Select
            size="middle"
            value={perPage}
            onChange={(val) => {
              setParams.setPerPage(val);
              setParams.setPage(1);
            }}
            options={perPageOptions}
            className="w-[150px]"
          />

          <Pagination
            current={page}
            total={total}
            pageSize={perPage}
            onChange={(newPage) => setParams.setPage(newPage)}
            showSizeChanger={false}
          />
        </div>
      )}
    </section>
  );
};
