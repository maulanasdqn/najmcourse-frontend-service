import { Card, Row, Typography, Avatar, Progress, Table, Tag, List, Col, Statistic, Alert, Spin, Badge } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  BookOutlined,
  StarOutlined,
  FireOutlined,
} from "@ant-design/icons";
import type { FC, ReactElement } from "react";
import { useGetStudentDashboardStats, useGetStudentStats } from "@/shared/hooks/index";
import { useSession } from "@/shared/components/providers";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

export const Component: FC = (): ReactElement => {
  const { session } = useSession();
  const userId = session?.user?.id ?? "";
  
  const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError } = useGetStudentDashboardStats(userId);
  const { data: statsData, isLoading: statsLoading, error: statsError } = useGetStudentStats(userId);

  if (dashboardLoading || statsLoading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading your dashboard...</div>
      </div>
    );
  }

  if (dashboardError || statsError) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Error loading dashboard data"
          description={dashboardError?.message || statsError?.message}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const dashboard = dashboardData?.data;
  const stats = statsData?.data;

  if (!dashboard || !stats) {
    return (
      <div style={{ padding: 24 }}>
        <Alert message="No data available" type="info" showIcon />
      </div>
    );
  }

  const currentSessionsColumns = [
    {
      title: "Session",
      dataIndex: "sessionName",
      key: "sessionName",
    },
    {
      title: "Test",
      dataIndex: "testName",
      key: "testName",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusColors = {
          active: "green",
          completed: "blue",
          paused: "orange",
        };
        return <Tag color={statusColors[status as keyof typeof statusColors]}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-y-6 bg-white rounded-xl" style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Typography.Title level={2} className="!mb-0">
          Student Dashboard
        </Typography.Title>
      </Row>

      {/* Profile Section */}
      <div className="flex items-center gap-x-4 mb-6">
        <Avatar size={80} src={session?.user?.avatar ?? ""} />
        <div className="flex-1">
          <Typography.Title level={3} className="!mb-1">
            {dashboard.profile.fullname}
          </Typography.Title>
          <Typography.Text type="secondary">{dashboard.profile.email}</Typography.Text>
          <div className="mt-2">
            <Badge color="blue" text={dashboard.profile.studentType} />
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <Statistic 
            title="Current Streak" 
            value={dashboard.performance.currentStreak} 
            suffix="days"
            prefix={<FireOutlined style={{ color: '#f56a00' }} />}
          />
        </div>
      </div>

      {/* Key Performance Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card className="shadow-sm">
            <Statistic 
              title="Overall Score" 
              value={dashboard.performance.overallScore} 
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="shadow-sm">
            <Statistic 
              title="Tests Taken" 
              value={dashboard.performance.totalTestsTaken} 
              valueStyle={{ color: '#1890ff' }}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="shadow-sm">
            <Statistic 
              title="Completed Tests" 
              value={dashboard.performance.completedTests} 
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="shadow-sm">
            <Statistic 
              title="Avg Completion Time" 
              value={dashboard.performance.averageCompletionTime} 
              suffix="min"
              valueStyle={{ color: '#722ed1' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="flex w-full items-start gap-x-6">
        {/* Performance Chart */}
        <Card className="flex-1 shadow-sm" style={{ minHeight: 400 }}>
          <Typography.Title level={4} className="!mb-4">
            Monthly Performance Trends
          </Typography.Title>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthlyScores}>
              <Line type="monotone" dataKey="averageScore" stroke="#8884d8" strokeWidth={2} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <RechartsTooltip formatter={(value) => [`${value}%`, 'Average Score']} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Subject Breakdown */}
        <Card className="flex-1 shadow-sm" style={{ minHeight: 400 }}>
          <Typography.Title level={4} className="!mb-4">
            Subject Performance
          </Typography.Title>
          <div className="mb-4">
            {dashboard.subjectBreakdown.map((subject, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography.Text strong>{subject.subject}</Typography.Text>
                  <Typography.Text strong>{subject.averageScore}%</Typography.Text>
                </div>
                <Progress
                  percent={subject.averageScore}
                  strokeColor="#4F94CD"
                  showInfo={false}
                  strokeWidth={12}
                />
                <div className="flex justify-between mt-1">
                  <Typography.Text type="secondary" size="small">
                    Tests: {subject.testsTaken}
                  </Typography.Text>
                  <Typography.Text type="secondary" size="small">
                    Mastery: {subject.mastery}%
                  </Typography.Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex w-full items-start gap-x-6">
        {/* Current Sessions */}
        <Card className="flex-1 shadow-sm" style={{ minHeight: 400 }}>
          <Typography.Title level={4} className="!mb-4">
            Current Sessions
          </Typography.Title>
          <Table 
            dataSource={dashboard.currentSessions.map(session => ({
              ...session,
              key: session.sessionId
            }))} 
            columns={currentSessionsColumns} 
            pagination={false} 
            size="small" 
          />
        </Card>

        {/* Achievements & Recommendations */}
        <div className="flex flex-col gap-y-6 w-1/2">
          <Card className="shadow-sm">
            <Typography.Title level={4} className="!mb-4">
              Recent Achievements
            </Typography.Title>
            <List
              dataSource={dashboard.achievements.slice(0, 3)}
              renderItem={(achievement) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<StarOutlined style={{ color: '#faad14', fontSize: '18px' }} />}
                    title={achievement.title}
                    description={achievement.description}
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card className="shadow-sm">
            <Typography.Title level={4} className="!mb-4">
              Recommendations
            </Typography.Title>
            <List
              dataSource={dashboard.recommendations.slice(0, 3)}
              renderItem={(rec) => (
                <List.Item>
                  <List.Item.Meta
                    title={rec.title}
                    description={rec.description}
                  />
                  <Tag color={rec.priority === 'high' ? 'red' : rec.priority === 'medium' ? 'orange' : 'green'}>
                    {rec.priority}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>

      {/* Class Comparison */}
      <Card className="shadow-sm">
        <Typography.Title level={4} className="!mb-4">
          Class Performance Comparison
        </Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Statistic 
              title="Your Rank" 
              value={dashboard.comparison.userRank} 
              suffix={`of ${dashboard.comparison.totalStudents}`}
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Class Average" 
              value={dashboard.comparison.classAverage} 
              suffix="%"
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Your Percentile" 
              value={dashboard.comparison.percentile} 
              suffix="th"
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Improvement Rate" 
              value={dashboard.performance.improvementRate} 
              suffix="%"
              valueStyle={{ color: dashboard.performance.improvementRate > 0 ? '#3f8600' : '#cf1322' }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Component;
