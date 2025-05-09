import { Form, Input } from "antd";
import { FieldValues, useController } from "react-hook-form";
import type { ReactElement } from "react";
import type { TControlledInputProps } from "./type";

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  ...inputProps
}: TControlledInputProps<T>): ReactElement => {
  const { field, fieldState } = useController({ name, control });

  return (
    <Form.Item
      {...formItemProps}
      required={inputProps.required}
      label={inputProps.label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      <Input {...field} {...inputProps} />
    </Form.Item>
  );
};
