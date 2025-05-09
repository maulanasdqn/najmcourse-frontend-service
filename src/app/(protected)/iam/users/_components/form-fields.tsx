import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ControlledInputPhone } from "@/app/_components/ui/controlled-input-phone";
import { ControlledSelect } from "@/app/_components/ui/controlled-select";
import { ControlledSwitch } from "@/app/_components/ui/controlled-switch";
import { TFormFieldsProps } from "@/commons/types/form-field";
import { Button, Form } from "antd";
import { FC, ReactElement } from "react";
import { useFormUser } from "../_hooks/use-form.-user";

export const FormFields: FC<TFormFieldsProps> = (props): ReactElement => {
  const { form, options } = useFormUser();
  return (
    <Form name="user_form" onFinish={props.onSubmit} layout="vertical">
      <ControlledInput
        label="Fullname"
        control={form.control}
        placeholder="Input fullname"
        name="fullname"
      />
      <ControlledInput
        label="Email"
        control={form.control}
        placeholder="Input email"
        name="email"
      />
      <ControlledInputPhone
        label="Phone Number"
        control={form.control}
        placeholder="Input phone number"
        name="phone_number"
      />
      <ControlledInput
        type="password"
        label="Password"
        control={form.control}
        placeholder="Input password"
        name="password"
      />
      <ControlledSelect
        label="Role"
        control={form.control}
        placeholder="Select role"
        name="role_id"
        options={options.roles}
      />
      <ControlledSelect
        label="Stundent Type"
        control={form.control}
        placeholder="Select student type"
        name="student_type"
        options={options.studentTypes}
      />
      <ControlledSwitch label="Status" control={form.control} name="is_active" />
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
