import { TTestCreateRequest, TTestUpdateRequest } from "@/shared/apis/tests/type";
import { ControlledInput } from "@/shared/components/ui/controlled-input/input";
import { ControlledSwitch } from "@/shared/components/ui/controlled-switch/switch";
import { Button } from "antd";
import { FC } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { ControlledUploadFile } from "@/shared/components/ui/controlled-upload-file/upload-file";
import { v4 } from "uuid";

type TProps = {
  form: UseFormReturn<TTestCreateRequest | TTestUpdateRequest>;
  index: number;
};

export const OptionsFields: FC<TProps> = ({ form, index }) => {
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
    </div>
  );
};
