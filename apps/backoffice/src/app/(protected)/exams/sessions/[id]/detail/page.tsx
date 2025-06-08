import dayjs from "dayjs";
import { Descriptions, Tag, Collapse } from "antd";
import { useParams } from "react-router";
import { useGetDetailSession } from "@/shared/hooks/sessions/use-get-detail-session";
import { FC, Fragment, ReactElement } from "react";
import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";

const { Panel } = Collapse;

export const Component: FC = (): ReactElement => {
  const params = useParams();
  const { data } = useGetDetailSession(params.id ?? "");
  const session = data?.data;

  return (
    <Fragment>
      <PageHeadDetail title="Detail Session" />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{session?.id ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={session?.is_active ? "green" : "red"}>
            {session?.is_active ? "Active" : "Inactive"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Name">{session?.name ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Category">{session?.category ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Student Type">{session?.student_type ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Description">{session?.description ?? "-"}</Descriptions.Item>
        <Descriptions.Item label="Registered Tests">
          <Collapse accordion>
            {session?.tests?.map((test, index) => (
              <Panel header={`Test ${index + 1}`} key={test.test.id}>
                <p>
                  <strong>Test ID:</strong> {test.test.id}
                </p>
                <p>
                  <strong>Weight (Bobot):</strong> {test.weight}
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
    </Fragment>
  );
};

export default Component;
