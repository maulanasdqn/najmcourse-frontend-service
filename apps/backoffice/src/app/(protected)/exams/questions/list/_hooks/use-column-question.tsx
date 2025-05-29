import dayjs from "dayjs";
import { TQuestionListItem, TQuestionListResponse } from "@/shared/apis/questions/type";
import { Space, Button, Modal, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router";
import { useDeleteQuestion } from "./use-delete-question";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TResponseError } from "@/shared/commons/types/response";
import { Guard } from "@/shared/components/guard";
import { PERMISSIONS } from "@/shared/commons/constants/permissions";
import { ROUTES } from "@/shared/commons/constants/routes";
import parse from "html-react-parser";

type TUseColumnQuestionProps = {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<TQuestionListResponse, TResponseError>>;
};

export const useColumnQuestion = (props: TUseColumnQuestionProps) => {
  const { mutate } = useDeleteQuestion();

  const handleDelete = (record: TQuestionListItem) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Question?",
      content: record.question,
      okText: "Yes",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        mutate(record.id, {
          onSuccess: () => {
            void props.refetch?.();
            message.success("Question deleted successfully");
          },
        });
      },
    });
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      sorter: true,
      render: (question: string) => <span className="truncate">{parse(question)}</span>,
    },
    {
      title: "Discussion",
      dataIndex: "discussion",
      key: "discussion",
      render: (discussion: string) => <span className="truncate">{parse(discussion)}</span>,
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
      render: (_: unknown, record: TQuestionListItem) => (
        <Space>
          <Guard fallback="-" permissions={[PERMISSIONS.QUESTIONS.READ_DETAIL_QUESTIONS]}>
            <Link to={generatePath(ROUTES.exams.questions.detail, { id: record.id })}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.QUESTIONS.UPDATE_QUESTIONS]}>
            <Link to={generatePath(ROUTES.exams.questions.update, { id: record.id })}>
              <Button type="text" icon={<EditOutlined />} />
            </Link>
          </Guard>
          <Guard fallback="-" permissions={[PERMISSIONS.QUESTIONS.DELETE_QUESTIONS]}>
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
