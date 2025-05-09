import dayjs from "dayjs";
import { Descriptions } from "antd";
import { useParams } from "react-router";
import { useGetDetailPermission } from "../_hooks/use-get-detail-permissions";
import { PageHeadDetail } from "@/app/(protected)/_components/page-head-detail";
import { Fragment } from "react/jsx-runtime";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const params = useParams();
  const { data } = useGetDetailPermission(params.id ?? "");
  return (
    <Fragment>
      <PageHeadDetail title="Detail Permission" />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{data?.data?.id ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Name">{data?.data?.name ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {dayjs(data?.data?.created_at).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {dayjs(data?.data?.updated_at).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
      </Descriptions>
    </Fragment>
  );
};

export default Component;
