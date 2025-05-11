import { Meta, StoryObj } from "@storybook/react";
import { ControlledDatePicker } from "./date-picker";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { TControlledDatePickerProps } from "./type";
import dayjs, { Dayjs } from "dayjs";

type FormValues = {
  date: Dayjs;
};

const meta: Meta<typeof ControlledDatePicker<FormValues>> = {
  title: "Components/Controlled Date Picker",
  component: ControlledDatePicker,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    label: { control: "text" },
    disabled: { control: "boolean" },
    size: { control: "radio", options: ["small", "middle", "large"] },
    allowClear: { control: "boolean" },
    format: { control: "text" },
    picker: { control: "select", options: ["date", "week", "month", "quarter", "year"] },
    showTime: { control: "boolean" },
    showNow: { control: "boolean" },
    showToday: { control: "boolean" },
    inputReadOnly: { control: "boolean" },
    autoFocus: { control: "boolean" },
    bordered: { control: "boolean" },
    status: { control: "radio", options: ["error", "warning", ""] },
  },
};

export default meta;

const Template = (args: TControlledDatePickerProps<FormValues>) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      date: args.defaultValue ?? undefined,
    },
    mode: "all",
  });

  return (
    <Form layout="vertical">
      <ControlledDatePicker<FormValues>
        {...args}
        label={args.label}
        name="date"
        control={control}
      />
    </Form>
  );
};

export const Default: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "Select a date",
    }),
};

export const WithDefaultValue: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "Pre-filled date",
      defaultValue: dayjs("2025-05-08T10:00:00+07:00"),
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "Disabled input",
      disabled: true,
    }),
};

export const SmallSize: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "Small input",
      size: "small",
    }),
};

export const MiddleSize: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "Middle input",
      size: "middle",
    }),
};

export const LargeSize: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "Large input",
      size: "large",
    }),
};

export const Labeled: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "With label",
      label: "Start Date",
    }),
};

export const LabeledWithDefault: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "With label and value",
      label: "Event Date",
      defaultValue: dayjs("2025-06-01T12:00:00+07:00"),
    }),
};

export const DisabledWithValue: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "Can't change this",
      defaultValue: dayjs("2025-07-01T08:00:00+07:00"),
      disabled: true,
    }),
};

export const AllProps: StoryObj = {
  render: () =>
    Template({
      name: "date",
      placeholder: "Complete variant",
      label: "Custom Labeled Input",
      size: "large",
      defaultValue: dayjs("2025-08-01T14:30:00+07:00"),
      allowClear: true,
      showTime: true,
      showNow: true,
      showToday: true,
      inputReadOnly: false,
      autoFocus: false,
      bordered: true,
      status: "",
      format: "YYYY-MM-DD HH:mm",
      picker: "date",
    }),
};
