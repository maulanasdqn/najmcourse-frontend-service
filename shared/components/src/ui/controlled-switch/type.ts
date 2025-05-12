import { FormItemProps } from "antd";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledSwitchProps<T extends FieldValues> = UseControllerProps<T> & {
  formItemProps?: FormItemProps;
  label?: string;
  onChange?: (checked: boolean) => void;
};
