import type { ReactElement } from "react";
import { Form, Switch } from "antd";
import { FieldValues, useController } from "react-hook-form";
import { TControlledSwitchProps } from "./type";

export const ControlledSwitch = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  label,
  onChange: customOnChange,
}: TControlledSwitchProps<T>): ReactElement => {
  const {
    field: { value, onChange },
    fieldState,
  } = useController({ name, control });
  return (
    <Form.Item
      {...formItemProps}
      label={label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      <Switch
        checked={value}
        onChange={(val) => {
          onChange(val);
          customOnChange?.(val);
        }}
      />
    </Form.Item>
  );
};
