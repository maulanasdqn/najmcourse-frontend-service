import { render, screen } from "@testing-library/react";
import { Component } from "../page";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useListPermissions } from "@/shared/hooks/permissions/use-list-permissions";

vi.mock("@/shared/hooks/permissions/use-list-permissions");

const defaultMockReturn = {
  dataSource: [],
  isLoading: false,
  meta: { page: 1, per_page: 10, total: 0 },
  columns: [
    {
      title: "Permission Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    { title: "Action", key: "action", render: () => <button>Click</button> },
  ],
};

const renderPage = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </QueryClientProvider>,
  );

describe("Page List Permissions", () => {
  beforeEach(() => {
    vi.mocked(useListPermissions).mockReturnValue(defaultMockReturn);
  });

  it("Test renders title and create button", () => {
    renderPage();
    expect(screen.getByText("List Permissions")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\+ Create Permission/i })).toBeInTheDocument();
  });

  it("Test renders empty table and filters", () => {
    renderPage();
    expect(screen.getAllByText("No data").length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("Test renders loading state", () => {
    vi.mocked(useListPermissions).mockReturnValueOnce({
      ...defaultMockReturn,
      isLoading: true,
    });
    renderPage();
    const loadingEl = document.querySelector(".ant-spin-spinning");
    expect(loadingEl).toBeTruthy();
  });

  it("Test renders data rows when dataSource is available", () => {
    vi.mocked(useListPermissions).mockReturnValueOnce({
      ...defaultMockReturn,
      dataSource: [{ id: "1", name: "Manage Roles", created_at: "", updated_at: "" }],
    });
    renderPage();
    expect(screen.getByText("Manage Roles")).toBeInTheDocument();
    expect(screen.getByText("Click")).toBeInTheDocument();
  });

  it("Test does not crash if meta is undefined", () => {
    vi.mocked(useListPermissions).mockReturnValueOnce({
      ...defaultMockReturn,
      meta: undefined,
    });
    renderPage();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getAllByText("No data").length).toBeGreaterThan(0);
  });
});
