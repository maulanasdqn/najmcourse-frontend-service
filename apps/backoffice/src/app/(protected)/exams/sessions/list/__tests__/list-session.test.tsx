import { render, screen } from "@testing-library/react";
import { Component } from "../page";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useListSession } from "../_hooks/use-list-session";

vi.mock("../_hooks/use-list-session");

const defaultMockReturn = {
  dataSource: [],
  isLoading: false,
  meta: { page: 1, per_page: 10, total: 0 },
  columns: [
    {
      title: "Session Name",
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

describe("Page List Sessions", () => {
  beforeEach(() => {
    vi.mocked(useListSession).mockReturnValue(defaultMockReturn);
  });

  it("Test renders title and create button", () => {
    renderPage();
    expect(screen.getByText("List Sessions")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\+ Create Session/i })).toBeInTheDocument();
  });

  it("Test renders empty table and filters", () => {
    renderPage();
    expect(screen.getAllByText("No data").length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("Test renders loading state", () => {
    vi.mocked(useListSession).mockReturnValueOnce({
      ...defaultMockReturn,
      isLoading: true,
    });
    renderPage();
    const loadingEl = document.querySelector(".ant-spin-spinning");
    expect(loadingEl).toBeTruthy();
  });

  it("Test renders data rows when dataSource is available", () => {
    vi.mocked(useListSession).mockReturnValueOnce({
      ...defaultMockReturn,
      dataSource: [
        {
          id: "1",
          name: "Manage Roles",
          created_at: "",
          updated_at: "",
          category: "",
          description: "",
          student_type: "",
          tests_count: 0,
          is_active: false,
          is_deleted: false,
        },
      ],
    });
    renderPage();
    expect(screen.getByText("Manage Roles")).toBeInTheDocument();
    expect(screen.getByText("Click")).toBeInTheDocument();
  });

  it("Test does not crash if meta is undefined", () => {
    vi.mocked(useListSession).mockReturnValueOnce({
      ...defaultMockReturn,
      meta: undefined,
    });
    renderPage();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getAllByText("No data").length).toBeGreaterThan(0);
  });
});
