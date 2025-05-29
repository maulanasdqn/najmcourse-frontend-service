import { ControlledInput } from "@/shared/components/ui/controlled-input";
import { ControlledUploadFile } from "@/shared/components/ui/controlled-upload-file";
import { DeleteOutlined, PlusOutlined, CopyOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Input } from "antd";
import { OptionsFields } from "./option-fields";
import { useFormTest } from "../_hooks/use-form-test";
import { TFormFieldsProps } from "@/shared/commons/types/form-field";
import { FC, ReactElement, useState } from "react";
import { ControlledWysiwyg } from "@/shared/components/ui/controlled-wysiwyg/wysiwyg";
import { v4 } from "uuid";

const { TextArea } = Input;

export const FormFields: FC<TFormFieldsProps> = (props): ReactElement => {
  const { form, fields, handler } = useFormTest();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pastedQuestions, setPastedQuestions] = useState("");

  const parseAndAddQuestions = () => {
    if (!pastedQuestions.trim()) return;

    // Helper function to escape HTML and convert to proper HTML format
    const escapeAndFormatText = (text: string): string => {
      if (!text) return "<p><br></p>";
      // Escape HTML characters
      const escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      // Convert line breaks to paragraphs
      const paragraphs = escaped.split("\n").filter((line: string) => line.trim());
      if (paragraphs.length === 0) return "<p><br></p>";
      if (paragraphs.length === 1) return `<p>${paragraphs[0]}</p>`;
      return paragraphs.map((p: string) => `<p>${p}</p>`).join("");
    };

    // Split the text into individual questions using regex that matches question numbers
    const questionMatches = pastedQuestions.match(/\d+\.\s+[\s\S]*?(?=\n\s*\d+\.\s+|$)/g);

    if (!questionMatches) return;

    questionMatches.forEach((questionBlock) => {
      if (!questionBlock.trim()) return;

      // Remove the question number from the beginning
      const cleanedBlock = questionBlock.replace(/^\d+\.\s+/, "").trim();

      // Split by "Pembahasan" to separate question+options from discussion
      const parts = cleanedBlock.split(/\nPembahasan\s*\n/);
      const questionPart = parts[0].trim();
      const discussionPart = parts[1] ? parts[1].trim() : "";

      // Extract question text (everything before the first option)
      const optionMatch = questionPart.match(/^([\s\S]*?)\n\s*[A-E]\./s);
      const questionText = optionMatch ? optionMatch[1].trim() : questionPart;

      // Extract options
      const optionLines = questionPart
        .split("\n")
        .filter((line) => line.trim().match(/^[A-E]\.\s+/));

      const options = optionLines.map((line) => {
        const cleanedLine = line.trim().replace(/^[A-E]\.\s*/, "");
        return {
          id: v4(),
          label: cleanedLine,
          image_url: "",
          is_correct: false,
          points: "0",
        };
      });

      // Add the question with properly formatted HTML
      fields.append({
        id: v4(),
        question: escapeAndFormatText(questionText),
        question_image_url: "",
        discussion: escapeAndFormatText(discussionPart),
        discussion_image_url: "",
        options: options,
      });
    });

    // Close modal and clear textarea
    setIsModalVisible(false);
    setPastedQuestions("");
  };

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
        <div className="flex gap-2">
          <Button
            htmlType="button"
            type="dashed"
            onClick={handler.onAddQuestion}
            icon={<PlusOutlined />}
          >
            Add Question
          </Button>
          <Button
            htmlType="button"
            type="dashed"
            onClick={() => setIsModalVisible(true)}
            icon={<CopyOutlined />}
          >
            Paste Questions
          </Button>
        </div>
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

      <Modal
        title="Paste Questions"
        open={isModalVisible}
        onOk={parseAndAddQuestions}
        onCancel={() => {
          setIsModalVisible(false);
          setPastedQuestions("");
        }}
        okText="Parse and Add Questions"
        cancelText="Cancel"
        width={800}
      >
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-600">Paste your questions in the format:</p>
          <div className="p-3 bg-gray-100 rounded text-xs font-mono max-h-40 overflow-y-auto">
            1. Yang meliputi bidang PU (openbare werken) di Indonesia pada zaman Belanda adalah
            sebagai berikut, kecuali ...
            <br />
            A. Lands Gebouwen
            <br />
            B. Wegen
            <br />
            C. lrrigatie & Assainering
            <br />
            D. Water Kracht
            <br />
            E. Afdelingen
            <br />
            Pembahasan
            <br />
            Aku ingin terbang tinggi
            <br />
            <br />
            2. Yang dimaksud 'jalan' sesuai Undang-Undang No. 38 Tahun 2004 adalah ...
            <br />
            A. Ruang sepanjangjalan yang dibatasi oleh lebar, tinggi, dan kedalaman ruang bebas
            tertentu
            <br />
            B. Ruang sepanjang jalan yang dibatasi oleh lebar dan tinggi tertentu
            <br />
            Pembahasan
            <br />
            Aku ingin terbang tinggi
          </div>
        </div>
        <TextArea
          rows={12}
          value={pastedQuestions}
          onChange={(e) => setPastedQuestions(e.target.value)}
          placeholder="Paste your questions here..."
        />
        <p className="mt-2 text-xs text-gray-500">
          Note: This will add new questions to the existing ones. Each question should start with a
          number (1., 2., etc.) and include options (A., B., C., etc.) and discussion section.
        </p>
      </Modal>
    </Form>
  );
};
