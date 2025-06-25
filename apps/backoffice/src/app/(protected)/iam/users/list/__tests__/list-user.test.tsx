import { render, screen } from "@testing-library/react";
import { Component } from "../page";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useListUser } from "../_hooks/use-list-user";

const mockUseSession = vi.fn();

vi.mock("../_hooks/use-list-User");
vi.mock("@/shared/components/providers/hooks/use-session", () => ({
  useSession: mockUseSession,
}));

const defaultMockReturn = {
  dataSource: [],
  isLoading: false,
  meta: { page: 1, per_page: 10, total: 0 },
  columns: [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      sorter: true,
    },
    { title: "Action", key: "action", render: () => <button>Click</button> },
  ],
};

const mockSession = {
  user: {
    role: {
      permissions: [{ name: "CREATE_USERS" }],
    },
  },
};

const renderPage = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </QueryClientProvider>,
  );

describe("Page List Users", () => {
  beforeEach(() => {
    vi.mocked(useListUser).mockReturnValue(defaultMockReturn);
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
    expect(screen.getByText("List Users")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\+ Create User/i })).toBeInTheDocument();
  });

  it("Test renders empty table and filters", () => {
    renderPage();
    expect(screen.getAllByText("No data").length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it("Test renders loading state", () => {
    vi.mocked(useListUser).mockReturnValueOnce({
      ...defaultMockReturn,
      isLoading: true,
    });
    renderPage();
    const loadingEl = document.querySelector(".ant-spin-spinning");
    expect(loadingEl).toBeTruthy();
  });

  it("Test renders data rows when dataSource is available", () => {
    vi.mocked(useListUser).mockReturnValueOnce({
      ...defaultMockReturn,
      dataSource: [
        {
          id: "1",
          fullname: "Manage Users",
          created_at: "",
          updated_at: "",
          role: {
            id: "",
            name: "",
            permissions: [],
            created_at: "",
            updated_at: "",
          },
          email: "",
          avatar: null,
          phone_number: "",
          referred_by: null,
          referral_code: null,
          student_type: "",
          is_active: false,
          is_profile_completed: false,
          identity_number: null,
          religion: null,
          gender: null,
          birthdate: null,
        },
      ],
    });
    renderPage();
    expect(screen.getByText("Manage Users")).toBeInTheDocument();
    expect(screen.getByText("Click")).toBeInTheDocument();
  });

  it("Test does not crash if meta is undefined", () => {
    vi.mocked(useListUser).mockReturnValueOnce({
      ...defaultMockReturn,
      meta: undefined,
    });
    renderPage();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getAllByText("No data").length).toBeGreaterThan(0);
  });
});
