import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { ControlledSwitch } from "./";
import { TControlledSwitchProps } from "./type";

type FormValues = {
  is_active: boolean;
};

const meta: Meta<typeof ControlledSwitch<FormValues>> = {
  title: "Components/Controlled Switch",
  component: ControlledSwitch,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;

const Template = (args: TControlledSwitchProps<FormValues>) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      is_active: args.defaultValue ?? false,
    },
    mode: "onChange",
  });

  return (
    <Form layout="vertical">
      <ControlledSwitch<FormValues> {...args} name="is_active" control={control} />
    </Form>
  );
};

export const Default: StoryObj = {
  render: () =>
    Template({
      name: "is_active",
    }),
};

export const WithLabel: StoryObj = {
  render: () =>
    Template({
      name: "is_active",
      label: "Active Status",
    }),
};

export const Disabled: StoryObj = {
  render: () =>
    Template({
      name: "is_active",
      label: "Disabled Switch",
      disabled: true,
    }),
};

export const WithDefaultChecked: StoryObj = {
  render: () =>
    Template({
      name: "is_active",
      label: "Initially On",
      defaultValue: true,
    }),
};
