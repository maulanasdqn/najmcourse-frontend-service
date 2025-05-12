import { Meta, StoryObj } from "@storybook/react";
import { ControlledInput } from "./input";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { TControlledInputProps } from "./type";

type FormValues = {
  username: string;
};

const meta: Meta<typeof ControlledInput<FormValues>> = {
  title: "Components/Controlled Input",
  component: ControlledInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    label: { control: "text" },
    disabled: { control: "boolean" },
    size: { control: "radio", options: ["small", "middle", "large"] },
    allowClear: { control: "boolean" },
    maxLength: { control: "number" },
    bordered: { control: "boolean" },
    status: { control: "radio", options: ["error", "warning", ""] },
    type: { control: "radio", options: ["text", "password", "email", "number"] },
    autoFocus: { control: "boolean" },
  },
};

export default meta;

const Template = (args: TControlledInputProps<FormValues>) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      username: args.defaultValue ?? "",
    },
    mode: "all",
  });

  return (
    <Form layout="vertical">
      <ControlledInput<FormValues> {...args} name="username" control={control} />
    </Form>
  );
};

export const Default: StoryObj = {
  render: () =>
    Template({
      name: "username",
      placeholder: "Enter username",
    }),
};

export const WithDefaultValue: StoryObj = {
  render: () =>
    Template({
      name: "username",
      placeholder: "Enter username",
      defaultValue: "john_doe",
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    Template({
      name: "username",
      placeholder: "This field is disabled",
      disabled: true,
    }),
};

export const SmallSize: StoryObj = {
  render: () =>
    Template({
      name: "username",
      placeholder: "Small input",
      size: "small",
    }),
};

export const LargeSize: StoryObj = {
  render: () =>
    Template({
      name: "username",
      placeholder: "Large input",
      size: "large",
    }),
};

export const Labeled: StoryObj = {
  render: () =>
    Template({
      name: "username",
      placeholder: "Labeled field input",
      size: "middle",
      label: "Username",
    }),
};

export const PasswordType: StoryObj = {
  render: () =>
    Template({
      name: "username",
      placeholder: "Enter password",
      label: "Password",
      type: "password",
    }),
};

export const AllProps: StoryObj = {
  render: () =>
    Template({
      name: "username",
      placeholder: "Full props input",
      label: "Full Control",
      defaultValue: "john_doe",
      size: "large",
      allowClear: true,
      maxLength: 20,
      bordered: true,
      status: "",
      type: "text",
      autoFocus: false,
    }),
};
