import dayjs from "dayjs";
import { ControlledInput } from "@/shared/components/ui/controlled-input";
import { ControlledSelect } from "@/shared/components/ui/controlled-select";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { useFormSession } from "../_hooks/use-form-session";
import { ControlledSwitch } from "@/shared/components/ui/controlled-switch";
import { ControlledDatePicker } from "@/shared/components/ui/controlled-date-picker";
import { TFormFieldsProps } from "@/shared/commons/types/form-field";
import { FC, ReactElement } from "react";
import { ControlledUploadFile } from "@/shared/components/ui/controlled-upload-file";

export const FormFields: FC<TFormFieldsProps> = (props): ReactElement => {
  const { form, fields, options } = useFormSession();

  return (
    <Form name="session_form" onFinish={props.onSubmit} layout="vertical">
      <ControlledInput label="Name" control={form.control} placeholder="Input name" name="name" />
      <ControlledUploadFile
        label="Session Banner (Opsional)"
        control={form.control}
        name="banner"
      />
      <ControlledSelect
        label="Category"
        control={form.control}
        placeholder="Select category"
        name="category"
        options={options.examCategories}
      />
      <ControlledSelect
        label="Student Type"
        control={form.control}
        placeholder="Select student type"
        name="student_type"
        options={options.studentTypes}
      />
      <ControlledInput
        label="Description"
        control={form.control}
        placeholder="Input description"
        name="description"
      />
      <ControlledSwitch label="Status Activation" control={form.control} name="is_active" />
      {fields.fields.map((field, index) => (
        <div
          key={field.test_id}
          className="mb-4 bg-blue-100 shadow-md border border-gray-100 p-4 rounded-lg"
        >
          <div className="flex justify-end">
            <Button
              style={{
                backgroundColor: "#f56565",
                color: "white",
                border: "none",
              }}
              className="bg-red-500"
              icon={<DeleteOutlined />}
              onClick={() => fields.remove(index)}
            >
              Remove Test
            </Button>
          </div>
          <ControlledSelect
            label="Test"
            control={form.control}
            placeholder="Select test"
            name={`tests.${index}.test_id`}
            options={options?.tests?.filter((opt) => {
              const selectedTestIds = form
                .watch("tests")
                .map((t, i) => (i !== index ? t.test_id : null))
                .filter(Boolean);
              return !selectedTestIds.includes(opt.value);
            })}
          />
          <ControlledSelect
            label="Weight (Bobot)"
            control={form.control}
            placeholder="Select weight"
            name={`tests.${index}.weight`}
            options={options.weightOptions}
          />
          <ControlledInput
            label="Multiplier (Pengkali)"
            control={form.control}
            placeholder="Input multiplier"
            name={`tests.${index}.multiplier`}
          />
          <ControlledDatePicker
            label="Start Date"
            control={form.control}
            placeholder="Input start date"
            name={`tests.${index}.start_date`}
            showTime={{ format: "HH:mm" }}
            disabledDate={(currentDate) => {
              const prevEnd = form.watch("tests")[index - 1]?.end_date;
              if (!prevEnd) return currentDate.isBefore(dayjs().startOf("day"));
              return currentDate.isBefore(dayjs(prevEnd).startOf("day"));
            }}
            disabledTime={(currentDate) => {
              const now = dayjs();
              const prevEnd = dayjs(form.watch("tests")[index - 1]?.end_date);
              if (!currentDate) return {};
              const isSameDay = currentDate.isSame(prevEnd, "day");
              const baseHour = isSameDay ? prevEnd.hour() : now.hour();
              const baseMinute = isSameDay ? prevEnd.minute() : now.minute();
              return {
                disabledHours: () =>
                  Array.from({ length: 24 }, (_, i) => i).filter((h) =>
                    isSameDay ? h < baseHour : currentDate.isSame(now, "day") && h < now.hour(),
                  ),
                disabledMinutes: (selectedHour) => {
                  if (isSameDay && selectedHour === baseHour) {
                    return Array.from({ length: 60 }, (_, i) => i).filter((m) => m < baseMinute);
                  }
                  if (currentDate.isSame(now, "day") && selectedHour === now.hour()) {
                    return Array.from({ length: 60 }, (_, i) => i).filter((m) => m < now.minute());
                  }
                  return [];
                },
              };
            }}
          />
          <ControlledDatePicker
            label="End Date"
            control={form.control}
            placeholder="Input end date"
            name={`tests.${index}.end_date`}
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            disabledDate={(currentDate) => {
              const start = dayjs(form.watch("tests")[index]?.start_date);
              return currentDate.isBefore(start.startOf("day"));
            }}
            disabledTime={(currentDate) => {
              const start = dayjs(form.watch("tests")[index]?.start_date);
              if (!start || !currentDate.isSame(start, "day")) return {};
              const startHour = start.hour();
              const startMinute = start.minute();
              return {
                disabledHours: () =>
                  Array.from({ length: 24 }, (_, i) => i).filter((h) => h < startHour),
                disabledMinutes: (selectedHour) => {
                  if (selectedHour === startHour) {
                    return Array.from({ length: 60 }, (_, i) => i).filter((m) => m < startMinute);
                  }
                  return [];
                },
              };
            }}
          />
          <ControlledSwitch
            defaultValue={true}
            label="Shuffle"
            control={form.control}
            name={`tests.${index}.shuffle`}
          />
        </div>
      ))}
      <Form.Item className="flex justify-start mb-6">
        <Button
          htmlType="button"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            fields.append({
              test_id: "",
              weight: "0%",
              multiplier: 0,
              start_date: "",
              end_date: "",
            })
          }
        >
          Add Test
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={props.isLoading}
          disabled={!form.formState.isValid || !form.formState.isDirty || props.isLoading}
          type="primary"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
