import dayjs from "dayjs";
import {
  TUserActivateRequest,
  TUserCompletePaymentRequest,
  TUserItem,
  TUserListResponse,
} from "@/shared/apis/users/type";
import { Space, Button, Modal, message, Tag, Switch } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TResponseError } from "@/shared/commons/types/response";
import { Guard } from "@/shared/components/guard";
import { PERMISSIONS } from "@/shared/commons/constants/permissions";
import { ROUTES } from "@/shared/commons/constants/routes";
import { useDeleteUser } from "@/shared/hooks/users/use-delete-user";
import { usePutActivateUser } from "@/shared/hooks/users/use-put-activate-user";
import { usePutCompletePaymentUser } from "@/shared/hooks/users/use-put-complete-payment-user";

type TUseColumnUserProps = {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TUserListResponse, TResponseError>>;
};

export const useColumnUser = (props: TUseColumnUserProps) => {
  const { mutate } = useDeleteUser();
  const { mutate: mutateActivate } = usePutActivateUser();
  const { mutate: mutateCompletePayment } = usePutCompletePaymentUser();

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

  const handleActivate = (data: TUserActivateRequest) => {
    const isActive = !data.is_active;
    mutateActivate(
      {
        ...data,
        is_active: isActive,
      },
      {
        onSuccess: () => {
          void props.refetch?.();
          message.success(`User ${isActive ? "activated" : "deactivated"} successfully`);
        },
        onError: (err) => void message.error(err?.response?.data?.message),
      },
    );
  };

  const handleCompletePayment = (data: TUserCompletePaymentRequest) => {
    const isPaymentCompleted = !data.is_payment_completed;
    mutateCompletePayment(
      {
        ...data,
        is_payment_completed: isPaymentCompleted,
      },
      {
        onSuccess: () => {
          void props.refetch?.();
          message.success(`User ${isPaymentCompleted ? "completed" : "uncompleted"} successfully`);
        },
        onError: (err) => void message.error(err?.response?.data?.message),
      },
    );
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
      render: (student_type: string) => (
        <span>{student_type === "-" ? "Admin / Staff" : student_type}</span>
      ),
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
      title: "Activate",
      dataIndex: "is_active",
      key: "activate",
      render: (_: unknown, row: TUserItem) => (
        <Guard fallback="-" permissions={[PERMISSIONS.USERS.ACTIVATE_USERS]}>
          <Switch checked={row.is_active} onChange={() => handleActivate(row)} />
        </Guard>
      ),
    },
    {
      title: "Complete Payment",
      dataIndex: "is_payment_completed",
      key: "is_payment_completed",
      render: (_: unknown, row: TUserItem) => (
        <Guard fallback="-" permissions={[PERMISSIONS.USERS.ACTIVATE_USERS]}>
          <Switch checked={row.is_payment_completed} onChange={() => handleCompletePayment(row)} />
        </Guard>
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
