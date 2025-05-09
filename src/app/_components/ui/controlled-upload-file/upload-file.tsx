import { ReactElement, useState } from "react";
import { Form, Upload, Button, Image } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { FieldValues, useController } from "react-hook-form";
import { TControlledUploadFileProps } from "./type";
import { postUploadFile } from "@/api/storage/api";
import type { UploadRequestOption } from "rc-upload/lib/interface";

export const ControlledUploadFile = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  label,
  ...uploadProps
}: TControlledUploadFileProps<T>): ReactElement => {
  const {
    field: { value, onChange },
    fieldState,
  } = useController({ name, control });

  const [loading, setLoading] = useState(false);

  const customRequest = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    setLoading(true);
    try {
      const realFile = file instanceof File ? file : undefined;
      if (!realFile) throw new Error("Invalid file type");
      const res = await postUploadFile(realFile);
      onChange(res.data.file_url);
      onSuccess?.(res, realFile);
    } catch (err) {
      onError?.(err as Error);
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
