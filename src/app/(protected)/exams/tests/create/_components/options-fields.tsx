import { TTestCreateRequest } from "@/api/tests/type";
import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ControlledSwitch } from "@/app/_components/ui/controlled-switch";
import { Button } from "antd";
import { FC } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { ControlledUploadFile } from "@/app/_components/ui/controlled-upload-file";

type TProps = {
  form: UseFormReturn<TTestCreateRequest>;
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
        <div key={opt.id} className="p-2 mt-2 bg-white border-gray-100 rounded border">
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
            label: "",
            image_url: "",
            is_correct: false,
            points: 0,
          })
        }
      >
        Add Option
      </Button>
    </div>
  );
};
