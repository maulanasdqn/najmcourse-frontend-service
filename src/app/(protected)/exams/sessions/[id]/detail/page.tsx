import dayjs from "dayjs";
import { Descriptions, Button, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { useGetDetailSession } from "../_hooks/use-get-detail-session";

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useGetDetailSession(params.id ?? "");
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
          Detail Session
        </h2>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{data?.data?.id}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={data?.data?.is_active ? "green" : "red"}>
            {data?.data?.is_active ? "Active" : "Inactive"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Name">{data?.data?.name}</Descriptions.Item>
        <Descriptions.Item label="Category">{data?.data?.category}</Descriptions.Item>
        <Descriptions.Item label="Student Type">{data?.data?.student_type}</Descriptions.Item>
        <Descriptions.Item label="Description">{data?.data?.description}</Descriptions.Item>
        <Descriptions.Item label="Registered Tests">
          {data?.data?.tests?.map((test) => (
            <Descriptions key={test.test.id} bordered column={1}>
              <Descriptions.Item label="Test ID">{test.test.id}</Descriptions.Item>
              <Descriptions.Item label="Weight (Bobot)">{test.weight}</Descriptions.Item>
              <Descriptions.Item label="Multiplier (Pengkali)">{test.multiplier}</Descriptions.Item>
              <Descriptions.Item label="Start Date">
                {dayjs(test.start_date).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item label="End Date">
                {dayjs(test.end_date).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
            </Descriptions>
          ))}
        </Descriptions.Item>
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
