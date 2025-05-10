import { FieldValues, UseControllerProps } from "react-hook-form";
import { FormItemProps } from "antd";

export type TControlledLexicalEditorProps<T extends FieldValues> = UseControllerProps<T> & {
  formItemProps?: FormItemProps;
  label?: string;
  required?: boolean;
  placeholder?: string;
};

export type TLexicalProps = {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
};
