import { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./index";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type ExampleItem = {
  id: number;
  name: string;
};

const meta: Meta<typeof DataTable<ExampleItem>> = {
  title: "Components/Data Table",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Wrapper = (args: any) => {
  const [paramsState, setParamsState] = useState({
    page: 1,
    per_page: 10,
    search: "",
    filter_by: "",
    filter: "",
    sort_by: "",
    order: "asc",
  });

  const setParams = {
    setPage: (v: number) => setParamsState((p) => ({ ...p, page: v })),
    setPerPage: (v: number) => setParamsState((p) => ({ ...p, per_page: v })),
    setSearch: (v: string) => setParamsState((p) => ({ ...p, search: v })),
    setFilterBy: (v: string) => setParamsState((p) => ({ ...p, filter_by: v })),
    setFilter: (v: string) => setParamsState((p) => ({ ...p, filter: v })),
    setSortBy: (v: string) => setParamsState((p) => ({ ...p, sort_by: v })),
    setOrder: (v: "asc" | "desc") => setParamsState((p) => ({ ...p, order: v })),
  };

  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <div className="p-8 bg-white w-full h-full">
          <DataTable<ExampleItem> {...args} __mockParams__={{ paramsState, setParams }} />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export const Default: StoryObj<typeof DataTable<ExampleItem>> = {
  render: () =>
    Wrapper({
      meta: { page: 1, per_page: 10, total: 2 },
      rowKey: "id",
      dataSource: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
      columns: [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
      ],
      filterOptions: [{ label: "Name", value: "name" }],
      filterValues: [
        { label: "John Doe", value: "John Doe" },
        { label: "Jane Smith", value: "Jane Smith" },
      ],
    }),
};
