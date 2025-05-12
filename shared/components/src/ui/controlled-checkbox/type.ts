import { CheckboxProps, FormItemProps } from "antd";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, "checked" | "onChange" | "value" | "defaultChecked" | "name"> & {
    formItemProps?: FormItemProps;
    label?: string;
    required?: boolean;
  };
