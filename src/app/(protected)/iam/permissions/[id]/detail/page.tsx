import dayjs from "dayjs";
import { Descriptions, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { useGetDetailPermission } from "../_hooks/use-get-detail-permissions";

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useGetDetailPermission(params.id ?? "");
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <h2
          style={{
            marginBottom: "0px",
          }}
          className="text-xl font-semibold"
        >
          Detail Permission
        </h2>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{data?.data?.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{data?.data?.name}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {dayjs(data?.data?.created_at).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {dayjs(data?.data?.updated_at).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Component;
