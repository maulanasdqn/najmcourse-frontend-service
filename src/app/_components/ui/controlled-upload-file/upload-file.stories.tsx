import type { Meta, StoryObj } from "@storybook/react";
import { ControlledUploadFile } from "./";
import { useForm } from "react-hook-form";
import { Form } from "antd";
import { TControlledUploadFileProps } from "./type";

type FormValues = {
  file: string;
};

const meta: Meta<typeof ControlledUploadFile<FormValues>> = {
  title: "Components/Controlled Upload File",
  component: ControlledUploadFile,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
};

export default meta;

const Template = (args: TControlledUploadFileProps<FormValues>) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      file: args.defaultValue ?? "",
    },
    mode: "onChange",
  });

  return (
    <Form layout="vertical">
      <ControlledUploadFile<FormValues> {...args} name="file" control={control} />
    </Form>
  );
};

export const Default: StoryObj = {
  render: () =>
    Template({
      name: "file",
      label: "Upload File",
    }),
};

export const WithDefaultValue: StoryObj = {
  render: () =>
    Template({
      name: "file",
      label: "Uploaded",
      defaultValue: "https://via.placeholder.com/300x200.png?text=Uploaded+Image",
    }),
};
