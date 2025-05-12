import { FormItemProps, Input } from "antd";
import { FieldValues, UseControllerProps } from "react-hook-form";
import type { GetProps } from "antd";

type OTPProps = GetProps<typeof Input.OTP>;

export type TControlledOtpInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<OTPProps, "name" | "value" | "onChange" | "onBlur" | "defaultValue"> & {
    formItemProps?: FormItemProps;
    label?: string;
    required?: boolean;
  };
