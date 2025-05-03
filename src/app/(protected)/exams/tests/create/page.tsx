import { Form, Button } from "antd";
import { useCreateTest } from "./_hooks/use-create-test";
import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { OptionsFields } from "./_components/options-fields";

export const Component = () => {
  const { form, state, fields, handler } = useCreateTest();
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
          Create Test
        </h2>
      </div>

      <Form name="test_create" onFinish={handler.onSubmit} layout="vertical">
        <ControlledInput
          label="Name"
          control={form.control}
          placeholder="Input test name"
          name="name"
        />

        {fields.fields.map((field, index) => (
          <div key={field.question} className="mb-4 p-4 border border-gray-100 rounded bg-gray-50">
            <div className="flex justify-end mb-2">
              <Button danger icon={<DeleteOutlined />} onClick={() => fields.remove(index)}>
                Remove Question
              </Button>
            </div>

            <ControlledInput
              label="Question"
              control={form.control}
              name={`questions.${index}.question`}
              placeholder="Input question text"
            />
            <ControlledInput
              label="Question Image URL"
              control={form.control}
              name={`questions.${index}.question_image_url`}
              placeholder="Input question image URL"
            />
            <ControlledInput
              label="Discussion"
              control={form.control}
              name={`questions.${index}.discussion`}
              placeholder="Input discussion text"
            />
            <ControlledInput
              label="Discussion Image URL"
              control={form.control}
              name={`questions.${index}.discussion_image_url`}
              placeholder="Input discussion image URL"
            />

            <Form.Item label="Options" className="px-2">
              <OptionsFields form={form} index={index} />
            </Form.Item>
          </div>
        ))}

        <Form.Item>
          <Button
            htmlType="button"
            type="dashed"
            onClick={() =>
              fields.append({
                question: "",
                question_image_url: "",
                discussion: "",
                discussion_image_url: "",
                options: [],
              })
            }
            icon={<PlusOutlined />}
          >
            Add Question
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!form.formState.isValid}
            loading={state.isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Component;
