import dayjs from "dayjs";
import { Descriptions, Button, Tag, Collapse } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { useGetDetailSession } from "../_hooks/use-get-detail-session";

const { Panel } = Collapse;

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useGetDetailSession(params.id ?? "");
  const session = data?.data;

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <h2 className="text-xl font-semibold mb-0">Detail Session</h2>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{session?.id}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={session?.is_active ? "green" : "red"}>
            {session?.is_active ? "Active" : "Inactive"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Name">{session?.name}</Descriptions.Item>
        <Descriptions.Item label="Category">{session?.category}</Descriptions.Item>
        <Descriptions.Item label="Student Type">{session?.student_type}</Descriptions.Item>
        <Descriptions.Item label="Description">{session?.description}</Descriptions.Item>
        <Descriptions.Item label="Registered Tests">
          <Collapse accordion>
            {session?.tests?.map((test, index) => (
              <Panel header={`Test ${index + 1}`} key={test.test.id}>
                <p>
                  <strong>Test ID:</strong> {test.test.id}
                </p>
                <p>
                  <strong>Weight (Bobot):</strong> {Math.round(test.weight * 100)}%
                </p>
                <p>
                  <strong>Multiplier (Pengkali):</strong> {test.multiplier}
                </p>
                <p>
                  <strong>Start Date:</strong> {dayjs(test.start_date).format("DD/MM/YYYY HH:mm")}
                </p>
                <p>
                  <strong>End Date:</strong> {dayjs(test.end_date).format("DD/MM/YYYY HH:mm")}
                </p>
              </Panel>
            ))}
          </Collapse>
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {dayjs(session?.created_at).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {dayjs(session?.updated_at).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Component;
