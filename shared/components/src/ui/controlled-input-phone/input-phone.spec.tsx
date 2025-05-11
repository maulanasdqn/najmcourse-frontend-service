import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInputPhone } from "./";

type FormValues = {
  phone: string;
};

const Wrapper = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      phone: "",
    },
  });

  return (
    <ControlledInputPhone
      name="phone"
      control={control}
      label="Phone Number"
      placeholder="Enter phone number"
    />
  );
};

const WrapperWithValidation = () => {
  const schema = z.object({
    phone: z
      .string({ required_error: "Phone number is required" })
      .regex(/^\d+$/, "Only digits are allowed")
      .min(1, "Phone number is required"),
  });

  const { control } = useForm<FormValues>({
    defaultValues: {
      phone: "",
    },
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  return (
    <ControlledInputPhone name="phone" control={control} label="Phone" placeholder="Phone input" />
  );
};

describe("Controlled Input Phone Component", () => {
  it("Test renders with label", () => {
    render(<Wrapper />);
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
  });

  it("Test renders with placeholder", () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText("Enter phone number")).toBeInTheDocument();
  });

  it("Test allows only digits to be input", () => {
    render(<Wrapper />);
    const input: HTMLInputElement = screen.getByPlaceholderText("Enter phone number");
    fireEvent.change(input, { target: { value: "abc123!@#" } });
    expect(input.value).toBe("123");
  });

  it("Test displays error message when required validation fails", async () => {
    render(<WrapperWithValidation />);
    const input = screen.getByPlaceholderText("Phone input");
    fireEvent.blur(input);
    expect(await screen.findByText("Phone number is required")).toBeInTheDocument();
  });

  it("Test should not show error if valid input is given", async () => {
    render(<WrapperWithValidation />);
    const input = screen.getByPlaceholderText("Phone input");
    fireEvent.change(input, { target: { value: "08123456789" } });
    fireEvent.blur(input);
    expect(screen.queryByText(/Phone number is required/)).not.toBeInTheDocument();
  });

  it("Test can clear the phone input", () => {
    render(<Wrapper />);
    const input: HTMLInputElement = screen.getByPlaceholderText("Enter phone number");
    fireEvent.change(input, { target: { value: "0812" } });
    expect(input.value).toBe("0812");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });

  it("Test should not throw error if component is unmounted quickly", async () => {
    const { unmount } = render(<WrapperWithValidation />);
    const input = screen.getByPlaceholderText("Phone input");
    fireEvent.change(input, { target: { value: "08123456789" } });
    unmount();
  });
});
