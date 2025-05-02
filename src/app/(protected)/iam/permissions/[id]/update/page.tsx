import { Form, Button } from "antd";
import { useUpdatePermission } from "./_hooks/use-update-permission";
import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

export const Component = () => {
  const { form, state, handler } = useUpdatePermission();
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
          Update Permission
        </h2>
      </div>

      <Form name="permission_update" onFinish={handler.onSubmit} layout="vertical">
        <ControlledInput label="Name" control={form.control} placeholder="Input name" name="name" />
        <Form.Item>
          <Button
            loading={state.isLoading}
            disabled={!form.formState.isValid && !form.formState.isDirty}
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
