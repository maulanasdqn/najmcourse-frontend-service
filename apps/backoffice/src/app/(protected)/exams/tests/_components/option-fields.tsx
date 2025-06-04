import { TTestCreateRequest, TTestUpdateRequest } from "@/shared/apis/tests/type";
import { ControlledInput } from "@/shared/components/ui/controlled-input/input";
import { ControlledSwitch } from "@/shared/components/ui/controlled-switch/switch";
import { Button, Input, Modal } from "antd";
import { FC, useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PlusOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { ControlledUploadFile } from "@/shared/components/ui/controlled-upload-file/upload-file";
import { v4 } from "uuid";

const { TextArea } = Input;

type TProps = {
  form: UseFormReturn<TTestCreateRequest | TTestUpdateRequest>;
  index: number;
};

export const OptionsFields: FC<TProps> = ({ form, index }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pastedOptions, setPastedOptions] = useState("");

  const fields = useFieldArray({
    control: form.control,
    name: `questions.${index}.options`,
  });

  const setCorrectOption = (optIndex: number) => {
    const currentOptions = form.getValues(`questions.${index}.options`);
    const updated = currentOptions.map((opt, idx) => ({
      ...opt,
      is_correct: idx === optIndex,
    }));
    form.setValue(`questions.${index}.options`, updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const parseAndAddOptions = () => {
    if (!pastedOptions.trim()) return;
    const lines = pastedOptions.trim().split("\n");
    const parsedOptions = lines
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const cleanedLine = line.replace(/^[A-Za-z]\.\s*/, "");
        return {
          id: v4(),
          label: cleanedLine,
          image_url: "",
          is_correct: false,
          points: "0",
        };
      });
    fields.remove();
    parsedOptions.forEach((option) => {
      fields.append(option);
    });
    setIsModalVisible(false);
    setPastedOptions("");
  };

  return (
    <div className="flex flex-col gap-y-4">
      {fields.fields.map((opt, optIndex) => (
        <div key={opt.id} className="p-4 mt-2 bg-white border-gray-100 rounded border">
          <ControlledInput
            label="Label"
            control={form.control}
            name={`questions.${index}.options.${optIndex}.label`}
            placeholder="Option label"
          />
          <ControlledUploadFile
            label="Label With Image"
            control={form.control}
            name={`questions.${index}.options.${optIndex}.image_url`}
          />
          <ControlledInput
            label="Points (Only used for category Psikologi)"
            control={form.control}
            name={`questions.${index}.options.${optIndex}.points`}
            placeholder="Points"
          />
          <ControlledSwitch
            label="Is Correct"
            control={form.control}
            name={`questions.${index}.options.${optIndex}.is_correct`}
            onChange={() => setCorrectOption(optIndex)}
          />
          <Button
            style={{
              backgroundColor: "#f56565",
              color: "white",
            }}
            danger
            icon={<DeleteOutlined />}
            type="text"
            onClick={() => fields.remove(optIndex)}
          >
            Remove Option
          </Button>
        </div>
      ))}

      <div className="flex gap-2">
        <Button
          className="w-fit"
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() =>
            fields.append({
              id: v4(),
              label: "",
              image_url: "",
              is_correct: false,
              points: "0",
            })
          }
        >
          Add Option
        </Button>

        <Button
          className="w-fit"
          type="dashed"
          icon={<CopyOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Paste Options
        </Button>
      </div>

      <Modal
        title="Paste Options"
        open={isModalVisible}
        onOk={parseAndAddOptions}
        onCancel={() => {
          setIsModalVisible(false);
          setPastedOptions("");
        }}
        okText="Parse and Add Options"
        cancelText="Cancel"
      >
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-600">Paste your options in the format:</p>
          <div className="p-2 bg-gray-100 rounded text-sm font-mono">
            A.Unity of Command
            <br />
            B.Mass
            <br />
            C.Economy of Force
            <br />
            D.Objective
          </div>
        </div>
        <TextArea
          rows={6}
          value={pastedOptions}
          onChange={(e) => setPastedOptions(e.target.value)}
          placeholder="Paste your options here..."
        />
        <p className="mt-2 text-xs text-gray-500">
          Note: This will replace all existing options for this question.
        </p>
      </Modal>
    </div>
  );
};
