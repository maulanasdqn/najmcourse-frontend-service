import dayjs from "dayjs";
import { TSessionListItem, TSessionListResponse } from "@/shared/apis/sessions/type";
import { Space, Button, Modal, message, Tag } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router";
import { useDeleteSession } from "@/shared/hooks/sessions/use-delete-session";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TResponseError } from "@/shared/commons/types/response";
import { Guard } from "@/shared/components/guard";
import { PERMISSIONS } from "@/shared/commons/constants/permissions";
import { ROUTES } from "@/shared/commons/constants/routes";

type TUseColumnSessionProps = {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TSessionListResponse, TResponseError>>;
};

export const useColumnSession = (props: TUseColumnSessionProps) => {
  const { mutate } = useDeleteSession();

  const handleDelete = (record: TSessionListItem) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Session?",
      content: record.name,
      okText: "Yes",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        mutate(record.id, {
          onSuccess: () => {
            void props.refetch?.();
            message.success("Session deleted successfully");
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Session Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: true,
    },
    {
      title: "Total Test",
      dataIndex: "tests_count",
      key: "tests_count",
    },
    {
      title: "Student Type",
      dataIndex: "student_type",
      key: "student_type",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      render: (_: unknown, record: TSessionListItem) => (
        <Space>
          <Guard fallback="-" permissions={[PERMISSIONS.SESSIONS.READ_DETAIL_SESSIONS]}>
            <Link to={generatePath(ROUTES.exams.sessions.detail, { id: record.id })}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.SESSIONS.UPDATE_SESSIONS]}>
            <Link to={generatePath(ROUTES.exams.sessions.update, { id: record.id })}>
              <Button type="text" icon={<EditOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.SESSIONS.DELETE_SESSIONS]}>
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
