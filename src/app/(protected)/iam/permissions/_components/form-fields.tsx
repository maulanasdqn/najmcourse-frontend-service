import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { Button, Form } from "antd";
import { useFormPermission } from "../_hooks/use-form-permission";
import { TFormFieldsProps } from "@/commons/types/form-field";
import { FC, ReactElement } from "react";

export const FormFields: FC<TFormFieldsProps> = (props): ReactElement => {
  const { form } = useFormPermission();
  return (
    <Form name="permission_form" onFinish={props.onSubmit} layout="vertical">
      <ControlledInput label="Name" control={form.control} placeholder="Input name" name="name" />
      <Form.Item>
        <Button
          loading={props.isLoading}
          disabled={!form.formState.isValid || !form.formState.isDirty || props.isLoading}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
