import { ControlledInput } from "@/shared/components/ui/controlled-input";
import { ControlledUploadFile } from "@/shared/components/ui/controlled-upload-file";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { OptionsFields } from "./option-fields";
import { useFormTest } from "../_hooks/use-form-test";
import { TFormFieldsProps } from "@/shared/commons/types/form-field";
import { FC, ReactElement } from "react";
import { ControlledWysiwyg } from "@/shared/components/ui/controlled-wysiwyg/wysiwyg";

export const FormFields: FC<TFormFieldsProps> = (props): ReactElement => {
  const { form, fields, handler } = useFormTest();

  return (
    <Form name="test_form" onFinish={props.onSubmit} layout="vertical">
      <ControlledInput
        required
        label="Name"
        control={form.control}
        placeholder="Input test name"
        name="name"
      />
      {fields.fields.map((field, index) => (
        <div key={field.id} className="mb-4 p-4 border border-gray-100 rounded bg-gray-50">
          <div className="flex justify-end mb-2">
            <Button
              style={{
                backgroundColor: "#f56565",
                color: "white",
              }}
              danger
              icon={<DeleteOutlined />}
              onClick={() => handler.onRemoveQuestion(index)}
            >
              Remove Question
            </Button>
          </div>
          <ControlledWysiwyg
            label="Question"
            control={form.control}
            name={`questions.${index}.question`}
            placeholder="Input question text"
          />
          <ControlledWysiwyg
            label="Discussion"
            control={form.control}
            name={`questions.${index}.discussion`}
            placeholder="Input discussion text"
          />
          <ControlledUploadFile
            label="Question With Image"
            control={form.control}
            name={`questions.${index}.question_image_url`}
          />
          <ControlledUploadFile
            label="Discussion With Image"
            control={form.control}
            name={`questions.${index}.discussion_image_url`}
          />
          <Form.Item required label="Options" className="px-2">
            <OptionsFields form={form} index={index} />
          </Form.Item>
        </div>
      ))}
      <Form.Item>
        <Button
          htmlType="button"
          type="dashed"
          onClick={handler.onAddQuestion}
          icon={<PlusOutlined />}
        >
          Add Question
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!form.formState.isValid || !form.formState.isDirty || props.isLoading}
          loading={props.isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
