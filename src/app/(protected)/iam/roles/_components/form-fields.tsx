import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ControlledSelect } from "@/app/_components/ui/controlled-select";
import { TFormFieldsProps } from "@/commons/types/form-field";
import { Button, Form } from "antd";
import { FC, ReactElement } from "react";
import { useFormRole } from "../_hooks/use-form-role";

export const FormFields: FC<TFormFieldsProps> = (props): ReactElement => {
  const { form, options } = useFormRole();
  return (
    <Form name="role_form" onFinish={props.onSubmit} layout="vertical">
      <ControlledInput label="Name" control={form.control} placeholder="Input name" name="name" />
      <ControlledSelect
        label="Permissions"
        control={form.control}
        placeholder="Select permissions"
        name="permissions"
        mode="multiple"
        options={options.permissions}
      />
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
