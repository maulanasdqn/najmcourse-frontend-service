import { InputProps, FormItemProps } from "antd";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputProps, "name" | "defaultValue" | "onChange" | "value" | "onBlur"> & {
    formItemProps?: FormItemProps;
    label?: string;
  };
