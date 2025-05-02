import { Form, Select, FormItemProps, SelectProps } from "antd";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type ControlledSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps, "name" | "defaultValue" | "onChange" | "value" | "onBlur"> & {
    formItemProps?: FormItemProps;
    label?: string;
    placeholder?: string;
  };

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  ...selectProps
}: ControlledSelectProps<T>) => {
  const { field, fieldState } = useController({ name, control });

  return (
    <Form.Item
      {...formItemProps}
      label={selectProps.label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      <Select
        placeholder={selectProps.placeholder}
        {...field}
        {...selectProps}
        value={field.value || undefined}
        onChange={field.onChange}
      />
    </Form.Item>
  );
};
