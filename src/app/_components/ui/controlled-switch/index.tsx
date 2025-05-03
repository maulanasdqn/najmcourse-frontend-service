import { Form, FormItemProps, Switch } from "antd";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type ControlledSwitchProps<T extends FieldValues> = UseControllerProps<T> & {
  formItemProps?: FormItemProps;
  label?: string;
  onChange?: (checked: boolean) => void;
};

export const ControlledSwitch = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  label,
  onChange: customOnChange,
}: ControlledSwitchProps<T>) => {
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
