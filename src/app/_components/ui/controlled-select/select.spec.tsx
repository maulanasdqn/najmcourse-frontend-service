import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ControlledSelect } from "./";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
  role: string;
};

const options = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];

const Wrapper = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      role: "",
    },
  });
  return (
    <ControlledSelect
      control={control}
      name="role"
      label="Role"
      placeholder="Select role"
      options={options}
      allowClear
    />
  );
};

const WrapperWithValidation = () => {
  const schema = z.object({
    role: z.string().min(1, "Role is required"),
  });

  const { control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      role: "",
    },
  });

  return (
    <ControlledSelect
      control={control}
      name="role"
      label="Role"
      placeholder="Select role"
      options={options}
      allowClear
    />
  );
};

describe("Controlled Select", () => {
  it("Test should render the select field", () => {
    render(<Wrapper />);
    const selectPlaceholder = document.querySelector(
      ".ant-select-selection-placeholder",
    ) as HTMLElement;
    expect(selectPlaceholder).toHaveTextContent("Select role");
    expect(screen.getByText("Role")).toBeInTheDocument();
  });

  it("Test should open dropdown and select an option", async () => {
    render(<Wrapper />);
    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Admin"));
    const selected = document.querySelector(".ant-select-selection-item");
    expect(selected).toHaveTextContent("Admin");
  });

  it("Test should show required validation error", async () => {
    render(<WrapperWithValidation />);
    fireEvent.blur(screen.getByRole("combobox"));
    await waitFor(() => {
      expect(screen.getByText("Role is required")).toBeInTheDocument();
    });
  });

  it("Test should allow selecting a valid role", async () => {
    render(<WrapperWithValidation />);
    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("User"));
    const selected = document.querySelector(".ant-select-selection-item");
    expect(selected).toHaveTextContent("User");
    expect(screen.queryByText("Role is required")).not.toBeInTheDocument();
  });

  it("Test should allow clearing the selected value", async () => {
    render(<Wrapper />);
    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Admin"));
    const clear = document.querySelector(".ant-select-clear") as HTMLElement;
    fireEvent.click(clear);
    expect(screen.getByRole("combobox")).toHaveTextContent("");
  });

  it("Test should render initial default value", () => {
    const WithDefault = () => {
      const { control } = useForm<FormValues>({
        defaultValues: {
          role: "user",
        },
      });
      return (
        <ControlledSelect
          control={control}
          name="role"
          formItemProps={{ label: "Role" }}
          options={options}
        />
      );
    };

    render(<WithDefault />);
    expect(screen.getByText("User")).toBeInTheDocument();
  });
});
