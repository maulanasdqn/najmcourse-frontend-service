import dayjs from "dayjs";
import { TUserItem, TUserListResponse } from "@/api/users/type";
import { Space, Button, Modal, message, Tag } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router";
import { useDeleteUser } from "./use-delete-user";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TResponseError } from "@/commons/types/response";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/commons/constants/permissions";
import { ROUTES } from "@/commons/constants/routes";

type TUseColumnUserProps = {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TUserListResponse, TResponseError>>;
};

export const useColumnUser = (props: TUseColumnUserProps) => {
  const { mutate } = useDeleteUser();

  const handleDelete = (record: TUserItem) => {
    Modal.confirm({
      title: "Are you sure you want to delete this User?",
      content: record.fullname,
      okText: "Yes",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        mutate(record.id, {
          onSuccess: () => {
            void props.refetch?.();
            message.success("User deleted successfully");
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Student Type",
      dataIndex: "student_type",
      key: "student_type",
    },
    {
      title: "Role Name",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active: boolean) => (
        <Tag color={is_active ? "green" : "red"}>{is_active ? "Active" : "Inactive"}</Tag>
      ),
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
      render: (_: unknown, record: TUserItem) => (
        <Space>
          <Guard fallback="-" permissions={[PERMISSIONS.USERS.READ_DETAIL_USERS]}>
            <Link to={generatePath(ROUTES.iam.users.detail, { id: record.id })}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.USERS.UPDATE_USERS]}>
            <Link to={generatePath(ROUTES.iam.users.update, { id: record.id })}>
              <Button type="text" icon={<EditOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.USERS.DELETE_USERS]}>
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
