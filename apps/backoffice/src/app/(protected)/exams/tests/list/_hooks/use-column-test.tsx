import dayjs from "dayjs";
import { TTestListItem, TTestListResponse } from "@/shared/apis/tests/type";
import { Space, Button, Modal, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router";
import { useDeleteTest } from "@/shared/hooks/tests/use-delete-test";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TResponseError } from "@/shared/commons/types/response";
import { Guard } from "@/shared/components/guard";
import { PERMISSIONS } from "@/shared/commons/constants/permissions";
import { ROUTES } from "@/shared/commons/constants/routes";

type TUseColumnTestProps = {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TTestListResponse, TResponseError>>;
};

export const useColumnTest = (props: TUseColumnTestProps) => {
  const { mutate } = useDeleteTest();

  const handleDelete = (record: TTestListItem) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Test?",
      content: record.name,
      okText: "Yes",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        mutate(record.id, {
          onSuccess: () => {
            void props.refetch?.();
            message.success("Test deleted successfully");
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Test Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Test Kategori",
      dataIndex: "category",
      key: "category",
      sorter: true,
    },
    {
      title: "Total Question",
      dataIndex: "question_count",
      key: "question_count",
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
      render: (_: unknown, record: TTestListItem) => (
        <Space>
          <Guard fallback="-" permissions={[PERMISSIONS.TESTS.READ_DETAIL_TESTS]}>
            <Link to={generatePath(ROUTES.exams.tests.detail, { id: record.id })}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.TESTS.UPDATE_TESTS]}>
            <Link to={generatePath(ROUTES.exams.tests.update, { id: record.id })}>
              <Button type="text" icon={<EditOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.TESTS.DELETE_TESTS]}>
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
