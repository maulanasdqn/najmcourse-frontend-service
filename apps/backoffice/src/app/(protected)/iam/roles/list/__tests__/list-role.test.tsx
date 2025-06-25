import { render, screen } from "@testing-library/react";
import { Component } from "../page";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useListRole } from "../_hooks/use-list-role";

const mockUseSession = vi.fn();

vi.mock("../_hooks/use-list-role");
vi.mock("@/shared/components/providers/hooks/use-session", () => ({
  useSession: mockUseSession,
}));

const defaultMockReturn = {
  dataSource: [],
  isLoading: false,
  meta: { page: 1, per_page: 10, total: 0 },
  columns: [
    {
      title: "Role Name",
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

const mockSession = {
  user: {
    role: {
      permissions: [{ name: "CREATE_ROLES" }],
    },
  },
};

describe("Page List Roles", () => {
  beforeEach(() => {
    vi.mocked(useListRole).mockReturnValue(defaultMockReturn);
    mockUseSession.mockReturnValue({
      session: mockSession,
      status: "authenticated",
      signIn: vi.fn(),
      signOut: vi.fn(),
      isLoading: false,
    });
  });

  it("Test renders title and create button", () => {
    renderPage();
    expect(screen.getByText("List Roles")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\+ Create Role/i })).toBeInTheDocument();
  });

  it("Test renders empty table and filters", () => {
    renderPage();
    expect(screen.getAllByText("No data").length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("Test renders loading state", () => {
    vi.mocked(useListRole).mockReturnValueOnce({
      ...defaultMockReturn,
      isLoading: true,
    });
    renderPage();
    const loadingEl = document.querySelector(".ant-spin-spinning");
    expect(loadingEl).toBeTruthy();
  });

  it("Test renders data rows when dataSource is available", () => {
    vi.mocked(useListRole).mockReturnValueOnce({
      ...defaultMockReturn,
      dataSource: [
        { id: "1", name: "Manage Roles", permissions: [], created_at: "", updated_at: "" },
      ],
    });
    renderPage();
    expect(screen.getByText("Manage Roles")).toBeInTheDocument();
    expect(screen.getByText("Click")).toBeInTheDocument();
  });

  it("Test does not crash if meta is undefined", () => {
    vi.mocked(useListRole).mockReturnValueOnce({
      ...defaultMockReturn,
      meta: undefined,
    });
    renderPage();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getAllByText("No data").length).toBeGreaterThan(0);
  });
});
