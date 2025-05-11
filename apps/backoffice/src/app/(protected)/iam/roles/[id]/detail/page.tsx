import dayjs from "dayjs";
import { Descriptions, Tag } from "antd";
import { useParams } from "react-router";
import { useGetDetailRole } from "../_hooks/use-get-detail-role";
import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import { Fragment } from "react/jsx-runtime";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const params = useParams();
  const { data } = useGetDetailRole(params.id ?? "");
  const role = data?.data;

  return (
    <Fragment>
      <PageHeadDetail title="Detail Role" />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{role?.id ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Name">{role?.name ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Permissions">
          {(role?.permissions ?? []).length > 0
            ? role?.permissions.map((permission) => (
                <Tag key={permission.id} color="default">
                  {permission.name}
                </Tag>
              ))
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {role?.created_at ? dayjs(role.created_at).format("DD/MM/YYYY HH:mm") : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {role?.updated_at ? dayjs(role.updated_at).format("DD/MM/YYYY HH:mm") : "-"}
        </Descriptions.Item>
      </Descriptions>
    </Fragment>
  );
};

export default Component;
