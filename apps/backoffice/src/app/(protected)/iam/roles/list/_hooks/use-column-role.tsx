import dayjs from "dayjs";
import { TRoleItem, TRoleListResponse } from "@/shared/apis/roles/type";
import { Space, Button, Modal, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router";
import { useDeleteRole } from "./use-delete-role";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TResponseError } from "@/shared/commons/types/response";
import { Guard } from "@/shared/components/guard";
import { PERMISSIONS } from "@/shared/commons/constants/permissions";
import { ROUTES } from "@/shared/commons/constants/routes";

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
          <Guard fallback="-" permissions={[PERMISSIONS.ROLES.READ_DETAIL_ROLES]}>
            <Link to={generatePath(ROUTES.iam.roles.detail, { id: record.id })}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.ROLES.UPDATE_ROLES]}>
            <Link to={generatePath(ROUTES.iam.roles.update, { id: record.id })}>
              <Button type="text" icon={<EditOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.ROLES.DELETE_ROLES]}>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Guard>
        </Space>
      ),
    },
  ];

  return {
    columns,
  };
};
