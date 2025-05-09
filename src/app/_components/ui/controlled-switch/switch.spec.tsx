import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { ControlledSwitch } from "./";

type FormValues = {
  is_active: boolean;
};

const Wrapper = (props?: Partial<FormValues> & { onChange?: (val: boolean) => void }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      is_active: props?.is_active ?? false,
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <ControlledSwitch
        name="is_active"
        control={methods.control}
        label="Active Status"
        onChange={props?.onChange}
      />
    </FormProvider>
  );
};

describe("ControlledSwitch", () => {
  it("renders with label", () => {
    render(<Wrapper />);
    expect(screen.getByText("Active Status")).toBeInTheDocument();
  });

  it("Test switch should be off by default", () => {
    render(<Wrapper />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl.getAttribute("aria-checked")).toBe("false");
  });

  it("Test switch should be on if defaultValue is true", () => {
    render(<Wrapper is_active={true} />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl.getAttribute("aria-checked")).toBe("true");
  });

  it("Test triggers onChange when toggled", () => {
    const handleChange = vi.fn();
    render(<Wrapper onChange={handleChange} />);
    const switchEl = screen.getByRole("switch");
    fireEvent.click(switchEl);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
