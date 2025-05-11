import { UploadProps, FormItemProps } from "antd";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledUploadFileProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<UploadProps, "name" | "onChange" | "customRequest"> & {
    formItemProps?: FormItemProps;
    label?: string;
  };
