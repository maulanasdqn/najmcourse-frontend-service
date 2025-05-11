import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { ControlledInputPhone } from "./";
import type { TControlledInputPhoneProps } from "./type";

type FormValues = {
  phone: string;
};

const meta: Meta<typeof ControlledInputPhone<FormValues>> = {
  title: "Components/Controlled Input Phone",
  component: ControlledInputPhone,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    size: { control: "radio", options: ["small", "middle", "large"] },
    bordered: { control: "boolean" },
    maxLength: { control: "number" },
    status: { control: "radio", options: ["error", "warning", ""] },
  },
};

export default meta;

const Template = (args: TControlledInputPhoneProps<FormValues>) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      phone: args.defaultValue ?? "",
    },
    mode: "onChange",
  });

  return (
    <Form layout="vertical">
      <ControlledInputPhone<FormValues> {...args} name="phone" control={control} />
    </Form>
  );
};

export const Default: StoryObj = {
  render: () =>
    Template({
      name: "phone",
      placeholder: "Enter phone number",
    }),
};

export const WithDefaultValue: StoryObj = {
  render: () =>
    Template({
      name: "phone",
      placeholder: "Enter phone number",
      defaultValue: "08123456789",
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    Template({
      name: "phone",
      placeholder: "Can't type here",
      defaultValue: "08123456789",
      disabled: true,
    }),
};

export const WithLabel: StoryObj = {
  render: () =>
    Template({
      name: "phone",
      label: "Phone Number",
      placeholder: "Type here",
    }),
};

export const AllProps: StoryObj = {
  render: () =>
    Template({
      name: "phone",
      label: "Full Props",
      placeholder: "0812xxxxxxx",
      defaultValue: "081298765432",
      size: "large",
      allowClear: true,
      bordered: true,
      maxLength: 14,
      status: "",
    }),
};
