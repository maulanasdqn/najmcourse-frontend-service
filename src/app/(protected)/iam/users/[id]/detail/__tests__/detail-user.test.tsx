/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Component } from "../page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { useGetDetailUser } from "../../_hooks/use-get-detail-user";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: () => ({ id: "User-id-1" }),
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../_hooks/use-get-detail-user");

const renderPage = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </QueryClientProvider>,
  );

describe("Detail User Page", () => {
  beforeEach(() => {
    // @ts-expect-error "stupid typesystem"
    (useGetDetailUser as unknown as vi.Mock).mockReturnValue({
      data: {
        data: {
          id: "User-id-1",
          fullname: "User",
          created_at: "2025-05-01T10:00:00Z",
          updated_at: "2025-05-02T14:30:00Z",
        },
      },
    });
    mockNavigate.mockClear();
  });

  it("Test renders User detail values", () => {
    renderPage();
    expect(screen.getByText("Detail user")).toBeInTheDocument();
    expect(screen.getByText("User-id-1")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("01/05/2025 17:00")).toBeInTheDocument();
    expect(screen.getByText("02/05/2025 21:30")).toBeInTheDocument();
  });

  it("Test renders all description labels", () => {
    renderPage();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Fullname")).toBeInTheDocument();
    expect(screen.getByText("Created At")).toBeInTheDocument();
    expect(screen.getByText("Updated At")).toBeInTheDocument();
  });

  it("Test navigates back when back button is clicked", () => {
    renderPage();
    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
