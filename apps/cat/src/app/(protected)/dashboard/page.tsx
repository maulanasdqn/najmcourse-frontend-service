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
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Typography.Title level={2}>Dashboard</Typography.Title>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Card title="Best Students">
            <PieChart width={500} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card title="Data Users">
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Sessions" className="w-full">
            <LineChart className="w-full" width={800} height={300} data={data}>
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Component;
