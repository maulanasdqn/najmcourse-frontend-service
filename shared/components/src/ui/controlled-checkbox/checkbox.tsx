import { Form, Checkbox } from "antd";
import { useController, FieldValues } from "react-hook-form";
import type { ReactElement } from "react";
import type { TControlledCheckboxProps } from "./type";

export const ControlledCheckbox = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  ...checkboxProps
}: TControlledCheckboxProps<T>): ReactElement => {
  const { field, fieldState } = useController({ name, control });

  return (
    <Form.Item
      {...formItemProps}
      required={checkboxProps.required}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
      valuePropName="checked"
    >
      <Checkbox
        {...checkboxProps}
        checked={field.value}
        onChange={(e) => field.onChange(e.target.checked)}
      >
        {checkboxProps.label}
      </Checkbox>
    </Form.Item>
  );
};
