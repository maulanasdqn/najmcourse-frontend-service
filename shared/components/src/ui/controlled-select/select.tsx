import { Form, Select } from "antd";
import { FieldValues, useController } from "react-hook-form";
import { match } from "ts-pattern";
import type { ReactElement } from "react";
import type { TControlledSelectProps } from "./type";

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  ...selectProps
}: TControlledSelectProps<T>): ReactElement => {
  const { field, fieldState } = useController({ name, control });

  const selectValue = match(selectProps.mode)
    .with("multiple", () => (field.value?.length ? field.value : null))
    .otherwise(() => (field.value === "" ? undefined : (field.value ?? undefined)));

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
        value={selectValue}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
    </Form.Item>
  );
};
