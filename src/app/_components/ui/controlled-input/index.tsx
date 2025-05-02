import { Form, Input, FormItemProps, InputProps } from "antd";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputProps, "name" | "defaultValue" | "onChange" | "value" | "onBlur"> & {
    formItemProps?: FormItemProps;
    label?: string;
  };

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  ...inputProps
}: ControlledInputProps<T>) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <Form.Item
      {...formItemProps}
      label={inputProps.label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      <Input {...field} {...inputProps} />
    </Form.Item>
  );
};
