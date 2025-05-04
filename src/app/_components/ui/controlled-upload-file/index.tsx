/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormItemProps, Upload, UploadProps, Button, Image } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { useState } from "react";
import { postUploadFile } from "@/api/storage/api";

type ControlledUploadFileProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<UploadProps, "name" | "onChange" | "customRequest"> & {
    formItemProps?: FormItemProps;
    label?: string;
  };

export const ControlledUploadFile = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  label,
  ...uploadProps
}: ControlledUploadFileProps<T>) => {
  const {
    field: { value, onChange },
    fieldState,
  } = useController({ name, control });

  const [loading, setLoading] = useState(false);

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    setLoading(true);
    try {
      const res = await postUploadFile(file as File);
      onChange(res.data.file_url);
      onSuccess(res, file);
    } catch (err) {
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Item
      {...formItemProps}
      label={label}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      {!value && (
        <Upload {...uploadProps} customRequest={customRequest} showUploadList={false}>
          <Button icon={<UploadOutlined />} loading={loading}>
            Upload File
          </Button>
        </Upload>
      )}

      {value && (
        <div className="mt-4 flex flex-col gap-2 w-fit">
          <Image src={value} alt="Uploaded preview" width={200} />
          <Button
            style={{
              backgroundColor: "#f56565",
              color: "white",
            }}
            danger
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => onChange("")}
          >
            Remove Photo
          </Button>
        </div>
      )}
    </Form.Item>
  );
};
