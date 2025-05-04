import { Form, Button } from "antd";
import { useCreateSession } from "./_hooks/use-create-session";
import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { ArrowLeftOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { ControlledSelect } from "@/app/_components/ui/controlled-select";
import { ControlledDatePicker } from "@/app/_components/ui/controlled-date-picker";
import { ControlledSwitch } from "@/app/_components/ui/controlled-switch";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Jakarta");

export const Component = () => {
  const { form, state, fields, handler, options } = useCreateSession();
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
          Create Session
        </h2>
      </div>

      <Form name="session_create" onFinish={handler.onSubmit} layout="vertical">
        <ControlledInput label="Name" control={form.control} placeholder="Input name" name="name" />
        <ControlledSelect
          label="Category"
          control={form.control}
          placeholder="Select category"
          name="category"
          options={options.categories}
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
        <ControlledSwitch label="Status" control={form.control} name="is_active" />

        {fields.fields.map((field, index) => (
          <div
            key={field.test_id}
            className="mb-4 bg-gray-50 border border-gray-100 p-4 rounded-lg"
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
              options={options.tests}
            />
            <ControlledInput
              label="Weight (Bobot)"
              control={form.control}
              placeholder="Input weight"
              name={`tests.${index}.weight`}
            />
            <ControlledInput
              label="Multiplier (Pengkali)"
              control={form.control}
              placeholder="Input multiplier"
              name={`tests.${index}.multiplier`}
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

            <ControlledDatePicker
              label="End Date"
              control={form.control}
              placeholder="Input end date"
              name={`tests.${index}.end_date`}
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DDTHH:mm"
              disabledDate={(currentDate) => {
                const start = dayjs(form.watch("tests")[index]?.start_date);
                return (
                  currentDate.isBefore(dayjs().startOf("minute")) ||
                  currentDate.isBefore(start.startOf("day"))
                );
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
                weight: 0,
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
            loading={state.isLoading}
            disabled={!form.formState.isValid}
            type="primary"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Component;
