import { Form, Input } from "antd";
import { FieldValues, useController } from "react-hook-form";
import type { ReactElement } from "react";
import type { TControlledInputPhoneProps } from "./type";

export const ControlledInputPhone = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  label,
  placeholder,
  ...inputProps
}: TControlledInputPhoneProps<T>): ReactElement => {
  const {
    field: { value, onChange, ...field },
    fieldState,
  } = useController({ name, control });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const onlyDigits = raw.replace(/\D/g, "");
    onChange(onlyDigits);
  };

  return (
    <Form.Item
      style={{
        width: "100%",
      }}
      {...formItemProps}
      label={label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        {...field}
        {...inputProps}
        inputMode="numeric"
      />
    </Form.Item>
  );
};
