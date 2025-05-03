import dayjs from "dayjs";
import { Descriptions, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { useGetDetailUser } from "../_hooks/use-get-detail-user";

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useGetDetailUser(params.id ?? "");
  const user = data?.data;

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <h2 className="text-xl font-semibold mb-0">Detail user</h2>
      </div>

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
    </div>
  );
};

export default Component;
