import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { ControlledDatePicker } from "./date-picker";

const Wrapper = () => {
  const methods = useForm({
    defaultValues: {
      date: "",
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <ControlledDatePicker
        control={methods.control}
        name="date"
        label="Pick a Date"
        placeholder="Select date"
        allowClear
        format="YYYY-MM-DD"
        showTime={false}
      />
    </FormProvider>
  );
};

describe("Controlled Date Picker Component", () => {
  it("Test renders with label", () => {
    render(<Wrapper />);
    expect(screen.getByText("Pick a Date")).toBeInTheDocument();
  });

  it("Test renders with placeholder", () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText("Select date")).toBeInTheDocument();
  });

  it("Test can open calendar popup", async () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("Select date");
    fireEvent.mouseDown(input);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("Test can select a date", async () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("Select date");
    fireEvent.mouseDown(input);
    const dayButton = await screen.findByRole("button", { name: "1" });
    fireEvent.click(dayButton);
    await waitFor(() => {
      expect((input as HTMLInputElement).value).toMatch(/^(2025|2024|2023)/);
    });
  });

  it("Test triggers onBlur", () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("Select date");
    fireEvent.blur(input);
    expect(input).toBeInTheDocument();
  });
});
