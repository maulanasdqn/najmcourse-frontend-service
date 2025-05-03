import { Form, FormItemProps, DatePicker } from "antd";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

type ControlledDatePickerProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<DatePickerProps, "name" | "value" | "onChange" | "onBlur"> & {
    formItemProps?: FormItemProps;
    label?: string;
  };

export const ControlledDatePicker = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  label,
  ...datePickerProps
}: ControlledDatePickerProps<T>) => {
  const {
    field: { value, onChange, onBlur },
    fieldState,
  } = useController({ name, control });

  return (
    <Form.Item
      {...formItemProps}
      label={label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      <DatePicker
        {...datePickerProps}
        format="YYYY-MM-DD HH:mm"
        value={value ? dayjs(value) : undefined}
        onChange={(date) => onChange(date ? date.utc().format("YYYY-MM-DDTHH:mm:ss[Z]") : "")}
        onBlur={onBlur}
        style={{ width: "100%" }}
      />
    </Form.Item>
  );
};
