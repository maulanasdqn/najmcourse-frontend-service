import { DatePickerProps, FormItemProps } from "antd";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledDatePickerProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<DatePickerProps, "name" | "value" | "onChange" | "onBlur"> & {
    formItemProps?: FormItemProps;
    label?: string;
  };
