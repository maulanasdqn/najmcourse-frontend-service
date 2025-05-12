import { SelectProps, FormItemProps } from "antd";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps, "name" | "defaultValue" | "onChange" | "value" | "onBlur"> & {
    formItemProps?: FormItemProps;
    label?: string;
    placeholder?: string;
  };
