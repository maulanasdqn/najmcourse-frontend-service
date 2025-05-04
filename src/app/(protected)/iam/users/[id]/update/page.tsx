import { Form, Button } from "antd";
import { useUpdateUser } from "./_hooks/use-update-user";
import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ControlledSelect } from "@/app/_components/ui/controlled-select";
import { ControlledInputPhone } from "@/app/_components/ui/controlled-input-phone";
import { ControlledSwitch } from "@/app/_components/ui/controlled-switch";

export const Component = () => {
  const { form, state, handler, options } = useUpdateUser();
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
        <h2
          style={{
            marginBottom: "0px",
          }}
          className="text-xl font-semibold mb-0"
        >
          Update User
        </h2>
      </div>

      <Form name="User_update" onFinish={handler.onSubmit} layout="vertical">
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
        <ControlledSelect
          label="Role"
          control={form.control}
          placeholder="Select User"
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
            loading={state.isLoading}
            disabled={!form.formState.isValid || !form.formState.isDirty || state.isLoading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Component;
