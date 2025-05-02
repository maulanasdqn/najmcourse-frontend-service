/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from "@storybook/react";
import { ControlledInput } from "./";
import { useForm } from "react-hook-form";
import { Form } from "antd";

type FormValues = {
  username: string;
};

const meta: Meta<typeof ControlledInput<FormValues>> = {
  title: "Components/Controlled Input",
  component: ControlledInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    size: { control: "radio", options: ["small", "middle", "large"] },
    label: { control: "text" },
  },
};

export default meta;

const Template = (args: any) => {
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
      placeholder: "Enter username",
    }),
};

export const WithDefaultValue: StoryObj = {
  render: () =>
    Template({
      placeholder: "Enter username",
      defaultValue: "john_doe",
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    Template({
      placeholder: "This field is disabled",
      disabled: true,
    }),
};

export const SmallSize: StoryObj = {
  render: () =>
    Template({
      placeholder: "Small input",
      size: "small",
    }),
};

export const LargeSize: StoryObj = {
  render: () =>
    Template({
      placeholder: "Large input",
      size: "large",
    }),
};

export const Labeled: StoryObj = {
  render: () =>
    Template({
      placeholder: "Labeled field input",
      size: "middle",
      label: "Userna    me",
    }),
};
