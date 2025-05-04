import { Form, Button } from "antd";
import { useCreateUser } from "./_hooks/use-create-user";
import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ControlledSelect } from "@/app/_components/ui/controlled-select";
import { ControlledSwitch } from "@/app/_components/ui/controlled-switch";
import { ControlledInputPhone } from "@/app/_components/ui/controlled-input-phone";

export const Component = () => {
  const { form, handler, options } = useCreateUser();
  const navigate = useNavigate();

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow">
      <div className="flex items-center gap-x-2 mb-6">
        <Button
          className="flex justify-center items-center"
          type="text"
          icon={<ArrowLeftOutlined size={30} />}
          onClick={() => navigate(-1)}
        />
        <h2 className="text-xl font-semibold">Create User</h2>
      </div>

      <Form name="user_create" onFinish={handler.onSubmit} layout="vertical">
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
          <Button disabled={!form.formState.isValid} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Component;
