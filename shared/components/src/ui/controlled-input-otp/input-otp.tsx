import { Form, Input } from "antd";
import { useController, FieldValues } from "react-hook-form";
import type { ReactElement } from "react";
import type { TControlledOtpInputProps } from "./type";

export const ControlledInputOtp = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  ...inputProps
}: TControlledOtpInputProps<T>): ReactElement => {
  const { field, fieldState } = useController({ name, control });

  return (
    <Form.Item
      {...formItemProps}
      required={inputProps.required}
      label={inputProps.label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      <Input.OTP
        {...inputProps}
        type="number"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
    </Form.Item>
  );
};
