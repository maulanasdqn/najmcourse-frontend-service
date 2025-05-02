import { Form, Button } from "antd";
import { useCreateRole } from "./_hooks/use-create-role";
import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ControlledSelect } from "@/app/_components/ui/controlled-select";

export const Component = () => {
  const { form, handler, options } = useCreateRole();
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
          Create Role
        </h2>
      </div>

      <Form name="Role_create" onFinish={handler.onSubmit} layout="vertical">
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
          <Button disabled={!form.formState.isValid} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Component;
