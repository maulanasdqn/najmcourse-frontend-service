import dayjs from "dayjs";
import { TRoleItem, TRoleListResponse } from "@/api/roles/type";
import { Space, Button, Modal, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router";
import { useDeleteRole } from "./use-delete-role";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TResponseError } from "@/commons/types/response";

type TUseColumnRoleProps = {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TRoleListResponse, TResponseError>>;
};

export const useColumnRole = (props: TUseColumnRoleProps) => {
  const { mutate } = useDeleteRole();

  const handleDelete = (record: TRoleItem) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Role?",
      content: record.name,
      okText: "Yes",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        mutate(record.id, {
          onSuccess: () => {
            void props.refetch?.();
            message.success("Role deleted successfully");
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Total Permission",
      dataIndex: "permissions_count",
      key: "permissions_count",
      sorter: true,
      render: (permissions_count: number) => <span>{permissions_count}</span>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => <span>{dayjs(created_at).format("DD/MM/YYYY HH:mm")}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: string) => <span>{dayjs(updated_at).format("DD/MM/YYYY HH:mm")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: TRoleItem) => (
        <Space>
          <Link to={generatePath("/iam/roles/:id/detail", { id: record.id })}>
            <Button type="text" icon={<EyeOutlined />} />
          </Link>
          <Link to={generatePath("/iam/roles/:id/update", { id: record.id })}>
            <Button type="text" icon={<EditOutlined />} />
          </Link>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return {
    columns,
  };
};
