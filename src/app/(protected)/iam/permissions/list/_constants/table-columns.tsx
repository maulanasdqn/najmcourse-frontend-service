import { TPermissionItem } from "@/api/permissions/type";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";

export const columns: ColumnType<TPermissionItem>[] = [
  {
    title: "Permission Name",
    dataIndex: "name",
    key: "name",
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
];
