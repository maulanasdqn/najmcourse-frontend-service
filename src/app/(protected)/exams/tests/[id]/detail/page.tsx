import dayjs from "dayjs";
import { Descriptions, Button, Image, Collapse } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { useGetDetailTest } from "../_hooks/use-get-detail-test";

const { Panel } = Collapse;

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useGetDetailTest(params.id);
  const test = data?.data;

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <h2 className="text-xl font-semibold mb-0">Detail Test</h2>
      </div>

      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{test?.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{test?.name}</Descriptions.Item>
        <Descriptions.Item label="Registered Questions">
          <Collapse accordion>
            {test?.questions?.map((question, index) => (
              <Panel header={`Question ${index + 1}`} key={question.id}>
                <p>
                  <strong>ID:</strong> {question.id}
                </p>
                <p>
                  <strong>Question:</strong> {question.question || "-"}
                </p>
                <p>
                  <strong>Discussion:</strong> {question.discussion || "-"}
                </p>
                {question.question_image_url && (
                  <div className="mb-2">
                    <p>
                      <strong>Question Image:</strong>
                    </p>
                    <Image width={200} src={question.question_image_url} />
                  </div>
                )}
                {question.discussion_image_url && (
                  <div className="mb-2">
                    <p>
                      <strong>Discussion Image:</strong>
                    </p>
                    <Image width={200} src={question.discussion_image_url} />
                  </div>
                )}
                <div>
                  <strong>Options:</strong>
                  {question.options?.map((option) => (
                    <div key={option.id} className="ml-4 mt-2 border p-2 rounded bg-white">
                      <p>
                        <strong>Label:</strong> {option.label || "-"}
                      </p>
                      {option.image_url && (
                        <div className="mb-2">
                          <Image width={150} src={option.image_url} />
                        </div>
                      )}
                      <p>
                        <strong>Points:</strong> {option.points ?? 0}
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            ))}
          </Collapse>
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {dayjs(test?.created_at).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {dayjs(test?.updated_at).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Component;
