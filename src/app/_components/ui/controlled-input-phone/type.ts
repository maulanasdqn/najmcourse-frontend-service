import { FormItemProps, InputProps } from "antd";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledInputPhoneProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputProps, "name" | "defaultValue" | "onChange" | "value" | "onBlur"> & {
    formItemProps?: FormItemProps;
    label?: string;
  };
