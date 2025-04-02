import { Button, Col, Row, Space, Typography, Form, Input } from "antd";
import { useIsMobileScreen } from "admiral";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import { useSession } from "@/app/_components/providers/session";
import { usePostLogin } from "./_hooks/use-post-login";

const Component: React.FC = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isMobile = useIsMobileScreen();

  const redirectUrl = new URL("/auth/oauth-callback", import.meta.env.VITE_BASE_URL);

  const authFusionLoginUrl = new URL(
    `/oauth2/authorize?client_id=${import.meta.env.VITE_AUTH_FUSION_ID}&redirect_uri=${redirectUrl.toString()}&response_type=code&tenantId=${import.meta.env.VITE_AUTH_FUSION_TENANT_ID}`,
    import.meta.env.VITE_AUTH_FUSION_ISSUER_URL,
  );

  useEffect(() => {
    if (session.status === "authenticated") {
      navigate(searchParams.get("callbackUrl") || "/dashboard");
    }
  }, [session.status, navigate, searchParams]);

  const { mutate, isPending: loading } = usePostLogin();

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
            Ant Design is the most influential web design specification in Xihu district
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
          href={authFusionLoginUrl.toString()}
          type="primary"
          htmlType="button"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          Log in with SSO
        </Button>
      </Col>
    </Row>
  );
};

export default Component;
