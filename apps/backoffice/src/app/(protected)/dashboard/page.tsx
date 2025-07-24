import { Card, Col, Row, Typography, Statistic, Alert, Spin } from "antd";
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
  ResponsiveContainer,
} from "recharts";
import { useGetDashboardStats } from "@/shared/hooks";
import type { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { data: statsData, isLoading, error } = useGetDashboardStats();

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

  if (isLoading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading dashboard statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Error loading dashboard statistics"
          description={error.message}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const stats = statsData?.data;
  if (!stats) {
    return (
      <div style={{ padding: 24 }}>
        <Alert message="No data available" type="info" showIcon />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Typography.Title level={2}>Admin Dashboard</Typography.Title>
      </Row>

      {/* Key Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Total Users" 
              value={stats.userStats.totalUsers} 
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Active Users" 
              value={stats.userStats.activeUsers}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Total Tests" 
              value={stats.examinationStats.totalTests}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="Average Score" 
              value={stats.performanceStats.averageScore}
              suffix="%"
              precision={1}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* User Registration Trends */}
        <Col span={24} lg={12}>
          <Card title="User Registration Trends">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.userStats.registrationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Questions by Difficulty */}
        <Col span={24} lg={12}>
          <Card title="Questions by Difficulty">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.contentStats.questionsByDifficulty}
                  dataKey="count"
                  nameKey="difficulty"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {stats.contentStats.questionsByDifficulty.map((entry, index) => (
                    <Cell key={`cell-${entry.difficulty}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Score Trends */}
        <Col span={24}>
          <Card title="Average Score Trends">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.performanceStats.scoreTrends}>
                <Line type="monotone" dataKey="averageScore" stroke="#8884d8" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Average Score']} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* System Stats */}
        <Col span={24} lg={12}>
          <Card title="System Performance">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic 
                  title="User Growth Rate" 
                  value={stats.systemStats.userGrowthRate}
                  suffix="%"
                  precision={1}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="Test Creation Rate" 
                  value={stats.systemStats.testCreationRate}
                  suffix="%"
                  precision={1}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="Completion Rate" 
                  value={stats.performanceStats.completionRate}
                  suffix="%"
                  precision={1}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="Data Integrity" 
                  value={stats.systemStats.dataIntegrityScore}
                  suffix="%"
                  precision={1}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Tests by Category */}
        <Col span={24} lg={12}>
          <Card title="Tests by Category">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.examinationStats.testsByCategory} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Component;
