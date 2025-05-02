import dayjs from "dayjs";
import { Descriptions, Button, Badge } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { useGetDetailRole } from "../_hooks/use-get-detail-role";

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useGetDetailRole(params.id ?? "");
  const role = data?.data;

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <h2 className="text-xl font-semibold mb-0">Detail Role</h2>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{role?.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{role?.name}</Descriptions.Item>
        <Descriptions.Item label="Permissions">
          {(role?.permissions ?? []).map((permission) => (
            <Badge
              key={permission.id}
              className="bg-gray-100 text-gray-800 p-2 mx-2 rounded"
              count={permission.name}
              style={{ backgroundColor: "#f0f0f0", color: "#000" }}
            />
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {role?.created_at ? dayjs(role.created_at).format("DD/MM/YYYY HH:mm") : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {role?.updated_at ? dayjs(role.updated_at).format("DD/MM/YYYY HH:mm") : "-"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Component;
