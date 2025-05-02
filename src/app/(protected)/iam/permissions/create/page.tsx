import { Form, Button } from "antd";
import { useCreatePermission } from "./_hooks/use-create-permission";
import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

export const Component = () => {
  const { form, handler } = useCreatePermission();
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
          Create Permission
        </h2>
      </div>

      <Form name="permission_create" onFinish={handler.onSubmit} layout="vertical">
        <ControlledInput label="Name" control={form.control} placeholder="Input name" name="name" />
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
