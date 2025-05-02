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
        {...field}
        {...selectProps}
        mode={selectProps.mode}
        placeholder={selectProps.placeholder}
        value={field.value ?? (selectProps.mode === "multiple" ? [] : undefined)}
        onChange={(value) => {
          field.onChange(value);
        }}
        onBlur={field.onBlur}
      />
    </Form.Item>
  );
};
