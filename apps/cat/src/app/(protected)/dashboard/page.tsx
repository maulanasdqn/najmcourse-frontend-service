import { Card, Row, Typography, Avatar, Progress, Table, Tag, List, Col, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import type { FC, ReactElement } from "react";
import { useGetListTest, useGetListSession, useGetDetailUser } from "@/shared/hooks/index";
import { useSession } from "@/shared/components/providers";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export const Component: FC = (): ReactElement => {
  const { session } = useSession();
  const { data: testsData } = useGetListTest({ page: 1, per_page: 10 });
  const { data: sessionsData } = useGetListSession({ page: 1, per_page: 10 });
  const { data: userData } = useGetDetailUser(session?.user?.id ?? "");

  const progressData = 70;
  const lastExamDate = "4 April 2024";

  const data = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 35 },
    { month: "Apr", value: 50 },
    { month: "May", value: 49 },
    { month: "Jun", value: 60 },
  ];

  const simulationData = [
    {
      key: "1",
      ujian: "Simulasi 1",
      waktuTersisa: "50 min",
      status: "Sedang Mengenalkan",
      statusColor: "orange",
    },
    {
      key: "2",
      ujian: "Simulasi 2",
      waktuTersisa: "1 hari",
      status: "Belum Mulai",
      statusColor: "red",
    },
    {
      key: "3",
      ujian: "Simulasi 3",
      waktuTersisa: "1 h 30 mnt",
      status: "Belum Mulai",
      statusColor: "red",
    },
  ];

  const subjectScores = [
    { name: "TWK", score: 80, color: "#4F94CD" },
    { name: "TIU", score: 80, color: "#5F9EA0" },
    { name: "TKP", score: 75, color: "#DEB887" },
  ];

  const columns = [
    {
      title: "Ujian",
      dataIndex: "ujian",
      key: "ujian",
    },
    {
      title: "Waktu Tersisa",
      dataIndex: "waktuTersisa",
      key: "waktuTersisa",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <div className="flex flex-col">
          <Tag color={record.statusColor}>{status}</Tag>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-6 bg-white rounded-xl" style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Typography.Title level={2} className="!mb-0">
          Dasbor Siswa
        </Typography.Title>
      </Row>

      <div className="flex items-center gap-x-4 mb-6">
        <Avatar size={80} src={session?.user?.avatar ?? ""} />
        <div>
          <Typography.Title level={3} className="!mb-1">
            {session?.user?.fullname}
          </Typography.Title>
          <Typography.Text type="secondary">{session?.user?.email}</Typography.Text>
        </div>
      </div>

      <div className="flex w-full items-start gap-x-6">
        <Card className="flex-1 h-full shadow-sm" style={{ minHeight: 300 }}>
          <div className="flex flex-col items-center justify-center h-full">
            <Progress
              type="circle"
              percent={progressData}
              size={300}
              strokeColor="#4F94CD"
              strokeWidth={8}
              format={(percent) => (
                <span className="text-3xl font-bold text-gray-800">{percent}%</span>
              )}
            />
            <Typography.Title level={4} className="!mt-4 !mb-0">
              Progres Ujian
            </Typography.Title>
          </div>
        </Card>
        <div className="flex flex-col w-1/2 gap-y-6">
          <Card className="flex-1 shadow-sm" style={{ minHeight: 200 }}>
            <div className="flex items-center gap-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClockCircleOutlined className="text-blue-600 text-lg" />
              </div>
              <div>
                <Typography.Title level={4} className="!mb-0">
                  Riwayat Simulasi Ujian
                </Typography.Title>
              </div>
            </div>
            <Typography.Text type="secondary">{lastExamDate}</Typography.Text>
          </Card>
          <Card className="flex-1 shadow-sm" style={{ minHeight: 200 }}>
            <div className="flex items-center gap-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleOutlined className="text-green-600 text-lg" />
              </div>
              <div>
                <Typography.Title level={4} className="!mb-0">
                  Ujian Selesai
                </Typography.Title>
              </div>
            </div>
            <div className="flex text-lg text-gray-400 flex-col gap-y-2">
              <span>- Test Psikologi</span>
              <span>- Test Kewarasan</span>
            </div>
          </Card>
        </div>
        <div className="flex flex-col w-1/2 gap-y-6">
          <Card className="flex-1 shadow-sm" style={{ minHeight: 200 }}>
            <div className="flex items-center gap-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrophyOutlined className="text-yellow-600 text-lg" />
              </div>
              <div>
                <Typography.Title level={4} className="!mb-0">
                  Nilai Akhir
                </Typography.Title>
              </div>
            </div>
            <Typography.Title type="secondary">80</Typography.Title>
          </Card>
          <Card className="flex-1 shadow-sm" style={{ minHeight: 200 }}>
            <div className="flex items-center gap-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <CloseCircleOutlined className="text-red-600 text-lg" />
              </div>
              <div>
                <Typography.Title level={4} className="!mb-0">
                  Ujian Terlewat
                </Typography.Title>
              </div>
            </div>
            <div className="flex text-lg text-gray-400 flex-col gap-y-2">
              <span>- Test Keberanian</span>
              <span>- Test Kebinekaan</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex w-full items-start gap-x-6">
        <Card className="flex-1 shadow-sm" style={{ minHeight: 400 }}>
          <Typography.Title level={4} className="!mb-4">
            Ujian Simulasi
          </Typography.Title>
          <Table dataSource={simulationData} columns={columns} pagination={false} size="small" />

          <div className="mt-6">
            {subjectScores.map((subject, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography.Text strong>{subject.name}</Typography.Text>
                  <Typography.Text strong>{subject.score}</Typography.Text>
                </div>
                <Progress
                  percent={subject.score}
                  strokeColor={subject.color}
                  showInfo={false}
                  strokeWidth={12}
                />
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-y-6 w-1/2">
          <Col span={24}>
            <Card title="Hasil dan Evaluasi" className="w-full">
              <LineChart className="w-full" width={600} height={300} data={data}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Component;
