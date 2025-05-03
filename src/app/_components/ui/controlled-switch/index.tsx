import { Form, Switch, FormItemProps, SwitchProps } from "antd";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type ControlledSwitchProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SwitchProps, "checked" | "onChange"> & {
    formItemProps?: FormItemProps;
    label?: string;
  };

export const ControlledSwitch = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  ...switchProps
}: ControlledSwitchProps<T>) => {
  const {
    field: { value, onChange, ...restField },
    fieldState,
  } = useController({ name, control });

  return (
    <Form.Item
      {...formItemProps}
      label={switchProps.label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
      valuePropName="checked"
    >
      <Switch {...restField} {...switchProps} checked={value} onChange={onChange} />
    </Form.Item>
  );
};
