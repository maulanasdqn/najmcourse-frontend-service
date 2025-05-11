import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ControlledInput } from "./input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
  username: string;
};

const Wrapper = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      username: "",
    },
  });
  return (
    <ControlledInput
      control={control}
      name="username"
      formItemProps={{ label: "Username" }}
      placeholder="Enter username"
    />
  );
};

const WrapperWithValidation = () => {
  const schema = z.object({
    username: z
      .string({ required_error: "Username is required" })
      .trim()
      .min(1, "Username is required")
      .refine((value) => value !== "testuser", {
        message: "Username 'testuser' is not allowed",
      }),
  });

  const { control } = useForm<FormValues>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
    },
  });
  return (
    <ControlledInput
      control={control}
      name="username"
      formItemProps={{ label: "Username" }}
      placeholder="Enter username"
    />
  );
};

describe("Controlled Input Component", () => {
  it("Test should render input with correct placeholder", () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("Test should update value when typing", () => {
    render(<Wrapper />);
    const input: HTMLInputElement = screen.getByPlaceholderText("Enter username");
    fireEvent.change(input, { target: { value: "testuser" } });
    expect(input.value).toBe("testuser");
  });

  it("Test should show error message when required validation fails", async () => {
    render(<WrapperWithValidation />);
    const input = screen.getByPlaceholderText("Enter username");
    fireEvent.blur(input);
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
  });

  it("Test should remain empty if no input is provided", () => {
    render(<Wrapper />);
    const input: HTMLInputElement = screen.getByPlaceholderText("Enter username");
    expect(input.value).toBe("");
  });

  it("Test should not trigger error if value is provided", () => {
    render(<WrapperWithValidation />);
    const input: HTMLInputElement = screen.getByPlaceholderText("Enter username");
    fireEvent.change(input, { target: { value: "validuser" } });
    fireEvent.blur(input);
    expect(screen.queryByText("Username is required")).not.toBeInTheDocument();
  });

  it("Test should allow clearing the input", () => {
    render(<Wrapper />);
    const input: HTMLInputElement = screen.getByPlaceholderText("Enter username");
    fireEvent.change(input, { target: { value: "something" } });
    expect(input.value).toBe("something");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });

  it("Test should not allow spaces only", async () => {
    render(<WrapperWithValidation />);
    const input = screen.getByPlaceholderText("Enter username");
    fireEvent.change(input, { target: { value: "     " } });
    fireEvent.blur(input);
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
  });

  it("Test should trim value if needed before validation", async () => {
    render(<WrapperWithValidation />);
    const input = screen.getByPlaceholderText("Enter username");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.blur(input);
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
  });

  it("Test should not throw error if component is unmounted quickly", async () => {
    const { unmount } = render(<WrapperWithValidation />);
    const input = screen.getByPlaceholderText("Enter username");
    fireEvent.change(input, { target: { value: "somevalue" } });
    unmount();
  });

  it("Test should reflect new default value if form rerenders", () => {
    const NewDefaultWrapper = () => {
      const { control } = useForm<FormValues>({
        defaultValues: {
          username: "initial",
        },
      });
      return (
        <ControlledInput
          control={control}
          name="username"
          formItemProps={{ label: "Username" }}
          placeholder="Enter username"
        />
      );
    };
    render(<NewDefaultWrapper />);
    expect(screen.getByDisplayValue("initial")).toBeInTheDocument();
  });
});
