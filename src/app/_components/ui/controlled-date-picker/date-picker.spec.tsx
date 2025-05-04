import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { ControlledDatePicker } from "./index";

const Wrapper = () => {
  const methods = useForm({
    defaultValues: {
      date: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <ControlledDatePicker
        control={methods.control}
        name="date"
        label="Pick a Date"
        placeholder="Select date"
      />
    </FormProvider>
  );
};

describe("Controlled Date Picker", () => {
  it("Test renders with label", () => {
    render(<Wrapper />);
    expect(screen.getByText("Pick a Date")).toBeInTheDocument();
  });

  it("Test renders input with placeholder", () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText("Select date")).toBeInTheDocument();
  });
});
