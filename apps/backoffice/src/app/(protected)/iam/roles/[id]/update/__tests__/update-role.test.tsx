/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Component } from "../page";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateRole } from "../_hooks/use-update-role";
import { useForm } from "react-hook-form";
import { TRoleUpdateRequest } from "@/api/roles/type";
import { vi } from "vitest";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleUpdateSchema } from "@/api/roles/schema";

const mockNavigate = vi.fn();
const mockParams = { id: "Role-id-123" };

vi.mock("react-router", async () => {
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockParams,
  };
});

vi.mock("../../_hooks/use-get-detail-role", () => ({
  useGetDetailRole: () => ({
    data: { data: { id: mockParams.id, name: "Old Name", created_at: "", updated_at: "" } },
    isLoading: false,
  }),
}));

vi.mock("../_hooks/use-update-role");

const TestWrapper = ({
  isValid = true,
  onSubmit = vi.fn().mockResolvedValue(undefined),
}: {
  isValid?: boolean;
  onSubmit?: (e?: any) => Promise<void>;
}) => {
  const form = useForm<TRoleUpdateRequest>({
    resolver: zodResolver(roleUpdateSchema),
    defaultValues: { name: "" },
    mode: "all",
  });

  vi.mocked(useUpdateRole).mockReturnValue({
    form: {
      ...form,
      formState: {
        ...form.formState,
        isValid,
      },
    },
    state: {
      isLoading: false,
    },
    handler: {
      onSubmit,
    },
  });

  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("Update Role Page", () => {
  it("Test renders form and title", () => {
    render(<TestWrapper />);
    expect(screen.getByText("Update Role")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Input name")).toBeInTheDocument();
  });

  it("Test enables submit button when form is valid", () => {
    render(<TestWrapper isValid />);
    expect(screen.getByRole("button", { name: "Submit" })).not.toBeDisabled();
  });

  it("Test disables submit button when form is invalid", () => {
    render(<TestWrapper isValid={false} />);
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("Test calls onSubmit when form is submitted", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<TestWrapper isValid onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("Test shows validation error when name is empty", async () => {
    render(<TestWrapper isValid={false} />);
    const input = screen.getByPlaceholderText("Input name");
    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.change(input, { target: { value: "" } });
    await waitFor(() => {
      expect(screen.getByText(/at least 1 character/i)).toBeInTheDocument();
    });
  });

  it("Test enables submit button when name is filled", async () => {
    render(<TestWrapper isValid />);
    const input = screen.getByPlaceholderText("Input name");
    fireEvent.change(input, { target: { value: "Create User" } });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Submit" })).not.toBeDisabled();
    });
  });
});
