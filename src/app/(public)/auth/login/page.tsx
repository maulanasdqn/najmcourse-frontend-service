import { useEffect } from "react";
import { Button, Col, Row, Space, Typography, Form, Input } from "antd";
import { useIsMobileScreen } from "admiral";
import { useNavigate, useSearchParams } from "react-router";
import { usePostLogin } from "./_hooks/use-post-login";
import { useSession } from "@/app/_components/providers/session";

const Component: React.FC = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobileScreen();
  const { mutate, isPending: loading } = usePostLogin();

  useEffect(() => {
    if (session.status === "authenticated") {
      navigate(searchParams.get("callbackUrl") || "/dashboard");
    }
  }, [session.status, navigate, searchParams]);

  const handleCredentialLogin = async (values: { email: string; password: string }) =>
    mutate(values);

  return (
    <Row align="middle" justify="center" style={{ height: "80vh" }}>
      <Col
        span={24}
        style={{
          padding: `4rem ${isMobile ? "" : "7rem"}`,
          width: `50%`,
        }}
      >
        <Space
          direction="vertical"
          style={{
            width: "100%",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography.Title level={4}>Welcome back!</Typography.Title>
          <Typography.Text style={{ opacity: 0.5 }}>
            Start by sign in to your acccount
          </Typography.Text>
        </Space>

        <Form layout="vertical" onFinish={handleCredentialLogin} style={{ width: "100%" }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
              Log in
            </Button>
          </Form.Item>
        </Form>

        <Typography.Text style={{ display: "block", textAlign: "center", margin: "1rem 0" }}>
          Or log in with your credentials
        </Typography.Text>

        <Button
          type="primary"
          onClick={() => session.signinWithOAuth("google")}
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          Log in with Google
        </Button>
        <Button
          type="primary"
          onClick={() => session.signinWithOAuth("facebook")}
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          Log in with Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default Component;
