/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Component } from "../page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { useGetDetailRole } from "../../_hooks/use-get-detail-role";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: () => ({ id: "Role-id-1" }),
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../_hooks/use-get-detail-role");

const renderPage = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </QueryClientProvider>,
  );

describe("Detail Role Page", () => {
  beforeEach(() => {
    // @ts-expect-error "stupid typesystem"
    (useGetDetailRole as unknown as vi.Mock).mockReturnValue({
      data: {
        data: {
          id: "Role-id-1",
          name: "User",
          permissions: [
            { id: "1", name: "Create Users" },
            { id: "2", name: "Delete Users" },
          ],
          created_at: "2025-05-01T10:00:00Z",
          updated_at: "2025-05-02T14:30:00Z",
        },
      },
    });
    mockNavigate.mockClear();
  });

  it("Test renders Role detail values", () => {
    renderPage();
    expect(screen.getByText("Detail Role")).toBeInTheDocument();
    expect(screen.getByText("Role-id-1")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("01/05/2025 17:00")).toBeInTheDocument();
    expect(screen.getByText("02/05/2025 21:30")).toBeInTheDocument();
  });

  it("Test renders all description labels", () => {
    renderPage();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Created At")).toBeInTheDocument();
    expect(screen.getByText("Updated At")).toBeInTheDocument();
  });

  it("Test navigates back when back button is clicked", () => {
    renderPage();
    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("Test renders permission badges", () => {
    renderPage();
    expect(screen.getByText("Create Users")).toBeInTheDocument();
    expect(screen.getByText("Delete Users")).toBeInTheDocument();
  });

  it("Test renders fallback when permission is empty", () => {
    // @ts-expect-error "stupid typesystem"
    (useGetDetailRole as unknown as vi.Mock).mockReturnValueOnce({
      data: {
        data: {
          id: "Role-id-2",
          name: "Admin",
          permissions: [],
          created_at: null,
          updated_at: null,
        },
      },
    });
    renderPage();
    expect(screen.getByText("Role-id-2")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    const dashes = screen.getAllByText("-");
    expect(dashes.length).toBeGreaterThan(0);
  });

  it("Test does not crash if data is undefined", () => {
    // @ts-expect-error "stupid typesystem"
    (useGetDetailRole as unknown as vi.Mock).mockReturnValueOnce({ data: undefined });
    renderPage();
    expect(screen.getByText("Detail Role")).toBeInTheDocument();
  });
});
