import dayjs from "dayjs";
import { Descriptions } from "antd";
import { useParams } from "react-router";
import { useGetDetailUser } from "../_hooks/use-get-detail-user";
import { Fragment } from "react/jsx-runtime";
import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";

export const Component = () => {
  const params = useParams();
  const { data } = useGetDetailUser(params.id ?? "");
  const user = data?.data;

  return (
    <Fragment>
      <PageHeadDetail title="Detail User" />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{user?.id}</Descriptions.Item>
        <Descriptions.Item label="Fullname">{user?.fullname}</Descriptions.Item>
        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{user?.phone_number}</Descriptions.Item>
        <Descriptions.Item label="Role Name">{user?.role?.name}</Descriptions.Item>
        <Descriptions.Item label="Stundet Type">{user?.student_type}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {user?.created_at ? dayjs(user.created_at).format("DD/MM/YYYY HH:mm") : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {user?.updated_at ? dayjs(user.updated_at).format("DD/MM/YYYY HH:mm") : "-"}
        </Descriptions.Item>
      </Descriptions>
    </Fragment>
  );
};

export default Component;
