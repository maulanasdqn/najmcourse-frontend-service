import { Card, Col, Row, Typography } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const data = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 35 },
    { month: "Apr", value: 50 },
    { month: "May", value: 49 },
    { month: "Jun", value: 60 },
  ];

  const pieData = [
    { name: "A", value: 27 },
    { name: "B", value: 25 },
    { name: "C", value: 18 },
    { name: "D", value: 15 },
    { name: "E", value: 10 },
    { name: "F", value: 5 },
  ];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

  return (
    <div className="flex flex-col gap-y-6" style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Typography.Title level={2}>Dashboard</Typography.Title>
      </Row>

      <div className="flex w-full items-start gap-x-6">
        <Card className="flex-1 h-[300px] shadow-sm">
          <h1 className="font-bold text-xl">Progress Belajar</h1>
        </Card>
        <Card className="flex-1 h-[200px] shadow-sm">
          <h1 className="font-bold text-xl">Riwayat Ujian</h1>
        </Card>
        <Card className="flex-1 h-[200px] shadow-sm">
          <h1 className="font-bold text-xl">Nilai Akhir</h1>
        </Card>
      </div>
      <div className="flex w-full items-start gap-x-6 flex-1">
        <Card className="flex-1 h-[400px] shadow-sm w-1/2">
          <h1 className="font-bold text-xl">Sesi Ujian</h1>
        </Card>
        <div className="flex flex-col gap-y-6 h-auto w-1/2">
          <Card className="flex-1 shadow-sm h-[200px]">
            <h1 className="font-bold text-xl">Hasil dan Evaluasi</h1>
          </Card>
          <Card className="flex-1 shadow-sm h-[200px]">
            <h1 className="font-bold text-xl">Materi Belajar</h1>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Component;
