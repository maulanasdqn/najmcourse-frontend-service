import { Card, Row, Typography, Avatar, Progress, Table, Tag, List } from "antd";
import { ClockCircleOutlined, TrophyOutlined } from "@ant-design/icons";
import type { FC, ReactElement } from "react";
import { useGetListTest, useGetListSession, useGetDetailUser } from "@/shared/hooks/index";
import { useSession } from "@/shared/components/providers";

export const Component: FC = (): ReactElement => {
  const { session } = useSession();
  const { data: testsData } = useGetListTest({ page: 1, per_page: 10 });
  const { data: sessionsData } = useGetListSession({ page: 1, per_page: 10 });
  const { data: userData } = useGetDetailUser(session?.user?.id ?? "");

  const progressData = 70;
  const finalScore = 85;
  const lastExamDate = "4 April 2024";

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

  const evaluationItems = ["Strategi Sukses TWK", "Pemecahan Masalah TIU", "Latihan Soal TKP"];

  const learningMaterials = ["Strategi Sukses TWK", "Pemecahan Masalah TIU", "Latihan Soal TKP"];

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
          Dashbor Siswa
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
        <Card className="flex-1 shadow-sm" style={{ minHeight: 300 }}>
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
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrophyOutlined className="text-blue-600 text-lg" />
            </div>
            <Typography.Title level={4} className="!mb-0">
              Nilai Akhir
            </Typography.Title>
          </div>
          <Typography.Title level={1} className="!mb-0 text-4xl font-bold">
            {finalScore}
          </Typography.Title>
        </Card>
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
          <Card className="shadow-sm" style={{ minHeight: 200 }}>
            <Typography.Title level={4} className="!mb-4">
              Hasil dan Evaluasi
            </Typography.Title>
            <List
              dataSource={evaluationItems}
              renderItem={(item) => (
                <List.Item className="!px-0 !py-2">
                  <div className="flex items-center gap-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <Typography.Text>{item}</Typography.Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>

          <Card className="shadow-sm" style={{ minHeight: 200 }}>
            <Typography.Title level={4} className="!mb-4">
              Materi Belajar
            </Typography.Title>
            <List
              dataSource={learningMaterials}
              renderItem={(item) => (
                <List.Item className="!px-0 !py-2">
                  <div className="flex items-center gap-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <Typography.Text>{item}</Typography.Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Component;
