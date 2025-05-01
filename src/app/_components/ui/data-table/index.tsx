/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Table, TablePaginationConfig, TableProps } from "antd";
import { useUrlSearchParams } from "./hooks/use-url-search-params";
import { useCallback } from "react";
import { EMetaOrder, TMetaResponse } from "@/commons/types/meta";
import type { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

type Props<T> = TableProps<T> & {
  meta?: TMetaResponse;
};

export const DataTable = <T extends Record<string, unknown>>({ meta, ...tableProps }: Props<T>) => {
  const { params, setParams } = useUrlSearchParams();

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      _filters: Record<string, FilterValue | null>,
      sorter: SorterResult<T> | SorterResult<T>[],
      _extra: TableCurrentDataSource<T>,
    ) => {
      setParams.setPage(pagination.current ?? 1);
      setParams.setPerPage(pagination.pageSize ?? 10);

      if (!Array.isArray(sorter) && sorter.field) {
        setParams.setSortBy(sorter.field as string);
        setParams.setOrder(sorter.order === "descend" ? EMetaOrder.DESC : EMetaOrder.ASC);
      }
    },
    [setParams],
  );

  return (
    <section className="bg-white rounded-lg p-2">
      <div className="flex mb-4">
        <Input.Search
          size="large"
          placeholder="Search..."
          className="mr-2 w-fit max-w-[200px]"
          value={params.search}
          onChange={(e) => setParams.setSearch(e.target.value)}
          allowClear
        />
      </div>

      <Table<T>
        {...tableProps}
        pagination={{
          current: meta?.page,
          pageSize: meta?.per_page,
          total: meta?.total,
        }}
        onChange={handleTableChange}
      />
    </section>
  );
};
