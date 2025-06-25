/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Component } from "../page";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdatePermission } from "../_hooks/use-update-permission";
import { useForm } from "react-hook-form";
import { TPermissionUpdateRequest } from "@/shared/apis/permissions/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { permissionUpdateSchema } from "@/shared/apis/permissions/schema";

const mockNavigate = vi.fn();
const mockParams = { id: "permission-id-123" };

vi.mock("react-router", async () => {
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => mockParams,
  };
});

vi.mock("../../_hooks/use-get-detail-permissions", () => ({
  useGetDetailPermission: () => ({
    data: { data: { id: mockParams.id, name: "Old Name", created_at: "", updated_at: "" } },
    isLoading: false,
  }),
}));

vi.mock("../_hooks/use-update-permission");
const mockUseFormPermission = vi.fn();
vi.mock("../../_hooks/use-form-permission", () => ({
  useFormPermission: mockUseFormPermission,
}));

const TestWrapper = ({
  isValid = true,
  isDirty = true,
  onSubmit = vi.fn().mockResolvedValue(undefined),
}: {
  isValid?: boolean;
  isDirty?: boolean;
  onSubmit?: (e?: any) => Promise<void>;
}) => {
  const form = useForm<TPermissionUpdateRequest>({
    resolver: zodResolver(permissionUpdateSchema),
    defaultValues: { name: "" },
    mode: "all",
  });

  vi.mocked(useUpdatePermission).mockReturnValue({
    form,
    state: {
      isLoading: false,
    },
    handler: {
      onSubmit,
    },
  });

  mockUseFormPermission.mockReturnValue({
    form: {
      control: form.control,
      formState: {
        isValid,
        isDirty,
      },
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

describe("Update Permission Page", () => {
  it("Test renders form and title", () => {
    render(<TestWrapper />);
    expect(screen.getByText("Update Permission")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Input name")).toBeInTheDocument();
  });

  it("Test enables submit button when form is valid", () => {
    render(<TestWrapper isValid isDirty />);
    expect(screen.getByRole("button", { name: "Submit" })).not.toBeDisabled();
  });

  it("Test disables submit button when form is invalid", () => {
    render(<TestWrapper isValid={false} isDirty={false} />);
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("Test calls onSubmit when form is submitted", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<TestWrapper isValid isDirty onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("Test shows validation error when name is empty", async () => {
    render(<TestWrapper isValid={false} isDirty={false} />);
    const input = screen.getByPlaceholderText("Input name");
    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.change(input, { target: { value: "" } });
    await waitFor(() => {
      expect(screen.getByText(/at least 1 character/i)).toBeInTheDocument();
    });
  });

  it("Test enables submit button when name is filled", async () => {
    render(<TestWrapper isValid isDirty />);
    const input = screen.getByPlaceholderText("Input name");
    fireEvent.change(input, { target: { value: "Create User" } });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Submit" })).not.toBeDisabled();
    });
  });
});
