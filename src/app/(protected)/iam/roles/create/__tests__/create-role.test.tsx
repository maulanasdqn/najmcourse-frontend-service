/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Component } from "../page";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCreateRole } from "../_hooks/use-create-role";
import { useForm } from "react-hook-form";
import { TRoleCreateRequest } from "@/api/roles/type";
import { vi } from "vitest";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoleSchema } from "@/api/roles/schema";

vi.mock("react-router", async () => {
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../_hooks/use-create-role");

const TestWrapper = ({
  isValid = true,
  onSubmit = vi.fn().mockResolvedValue(undefined),
}: {
  isValid?: boolean;
  onSubmit?: (e?: any) => Promise<void>;
}) => {
  const form = useForm<TRoleCreateRequest>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: { name: "" },
    mode: "all",
  });

  vi.mocked(useCreateRole).mockReturnValue({
    form: {
      ...form,
      formState: {
        ...form.formState,
        isValid,
      },
    },
    handler: {
      onSubmit,
    },
    options: {
      permissions: [],
    },
    state: {
      isLoading: false,
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

describe("Create Role Page", () => {
  it("Test renders form and title", () => {
    render(<TestWrapper />);
    expect(screen.getByText("Create Role")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Input name")).toBeInTheDocument();
  });

  it("Test submit button is enabled when form is valid", () => {
    render(<TestWrapper isValid />);
    expect(screen.getByRole("button", { name: "Submit" })).not.toBeDisabled();
  });

  it("Test submit button is disabled when form is invalid", () => {
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

  it("Test enables submit when name input is filled", async () => {
    render(<TestWrapper isValid={true} />);
    const input = screen.getByPlaceholderText("Input name");
    fireEvent.change(input, { target: { value: "Create User" } });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Submit" })).not.toBeDisabled();
    });
  });
});
