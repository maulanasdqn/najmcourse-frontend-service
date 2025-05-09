import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { Form, DatePicker } from "antd";
import { FieldValues, useController } from "react-hook-form";
import type { ReactElement } from "react";
import type { TControlledDatePickerProps } from "./type";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Jakarta");

export const ControlledDatePicker = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  label,
  ...datePickerProps
}: TControlledDatePickerProps<T>): ReactElement => {
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
        onChange={(date) => onChange(date ? date.tz("Asia/Jakarta").format() : "")}
        onBlur={onBlur}
        style={{ width: "100%" }}
      />
    </Form.Item>
  );
};
