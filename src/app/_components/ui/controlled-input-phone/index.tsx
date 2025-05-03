import { Form, Input, FormItemProps } from "antd";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type ControlledManualPhoneProps<T extends FieldValues> = UseControllerProps<T> & {
  formItemProps?: FormItemProps;
  label?: string;
  placeholder?: string;
};

export const ControlledInputPhone = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  label,
  placeholder,
}: ControlledManualPhoneProps<T>) => {
  const {
    field: { value, onChange },
    fieldState,
  } = useController({ name, control });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const onlyDigits = raw.replace(/\D/g, "");
    onChange(onlyDigits);
  };

  return (
    <Form.Item
      {...formItemProps}
      label={label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      <Input value={value} onChange={handleChange} placeholder={placeholder} inputMode="numeric" />
    </Form.Item>
  );
};
