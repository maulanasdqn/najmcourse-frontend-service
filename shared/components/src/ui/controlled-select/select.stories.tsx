import { Meta, StoryObj } from "@storybook/react";
import { ControlledSelect } from "./select";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { TControlledSelectProps } from "./type";

type FormValues = {
  role: string;
};

const options = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
  { label: "Guest", value: "guest" },
];

const meta: Meta<typeof ControlledSelect<FormValues>> = {
  title: "Components/Controlled Select",
  component: ControlledSelect,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    allowClear: { control: "boolean" },
    size: { control: "radio", options: ["small", "middle", "large"] },
    mode: { control: "radio", options: ["multiple", "tags"] },
  },
};

export default meta;

const Template = (args: TControlledSelectProps<FormValues>) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      role: args.defaultValue ?? "",
    },
    mode: "all",
  });

  return (
    <Form layout="vertical">
      <ControlledSelect<FormValues>
        {...args}
        name="role"
        control={control}
        options={options}
        label="Role"
        placeholder="Select role"
      />
    </Form>
  );
};

export const Default: StoryObj = {
  render: () =>
    Template({
      name: "role",
      placeholder: "Select role",
      allowClear: true,
    }),
};

export const WithDefaultValue: StoryObj = {
  render: () =>
    Template({
      name: "role",
      placeholder: "Select role",
      defaultValue: "user",
      allowClear: true,
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    Template({
      name: "role",
      placeholder: "Disabled select",
      disabled: true,
    }),
};

export const SmallSize: StoryObj = {
  render: () =>
    Template({
      name: "role",
      placeholder: "Small select",
      size: "small",
    }),
};

export const LargeSize: StoryObj = {
  render: () =>
    Template({
      name: "role",
      placeholder: "Large select",
      size: "large",
    }),
};
