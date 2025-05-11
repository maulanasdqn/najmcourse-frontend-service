import { render, screen } from "@testing-library/react";
import { PageHeadList } from "./";
import { MemoryRouter } from "react-router";

vi.mock("@/app/_components/guard", () => ({
  Guard: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Page Head List Component", () => {
  it("Test should render the title", () => {
    render(
      <MemoryRouter>
        <PageHeadList
          title="Session List"
          createText="Create New"
          createRoute="/sessions/create"
          createPermission="create:sessions"
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Session List")).toBeInTheDocument();
  });

  it("Test should render the create button with correct text and link", () => {
    render(
      <MemoryRouter>
        <PageHeadList
          title="Users"
          createText="Add User"
          createRoute="/users/create"
          createPermission="create:users"
        />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", { name: /add user/i });
    expect(button).toBeInTheDocument();

    const link = button.closest("a");
    expect(link).toHaveAttribute("href", "/users/create");
  });
});
