import { Button, Col, Form, Row, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useLogin } from "./_hooks/use-login";
import { ControlledInput } from "@/app/_components/ui/controlled-input";
import { FC, ReactElement } from "react";

const { Text, Title, Link } = Typography;

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useLogin();

  return (
    <section style={state.styles.section}>
      <Row style={state.styles.row} justify="center">
        <Col xs={24} md={12} style={state.styles.formWrapper}>
          <div style={state.styles.container}>
            <div style={state.styles.header}>
              <Title style={state.styles.title}>NAJM Course Backoffice</Title>
              <Text style={state.styles.text}>If you have an account, please sign in.</Text>
            </div>
            <Form
              name="auth_login"
              initialValues={{ remember: true }}
              onFinish={handler.onSubmit}
              layout="vertical"
              requiredMark="optional"
              style={{ width: "100%" }}
            >
              <ControlledInput
                control={form.control}
                name="email"
                placeholder="Email"
                prefix={<MailOutlined />}
                type="email"
                size="large"
              />
              <ControlledInput
                control={form.control}
                name="password"
                prefix={<LockOutlined />}
                placeholder="Kata sandi"
                type="password"
                size="large"
              />
              <Form.Item>
                <Link href="/auth/forgot" style={{ float: "right" }}>
                  Forgot password? Click here
                </Link>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  loading={state.isLoading}
                  size="large"
                  disabled={!form.formState.isValid}
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Sign in now
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xs={0} md={12} style={state.styles.illustrationWrapper}>
          <svg
            width="300"
            height="300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 9H7V7A5 5 0 0117 7V9Z" stroke={state.token.colorPrimary} strokeWidth="2" />
            <rect
              x="3"
              y="9"
              width="18"
              height="12"
              rx="2"
              stroke={state.token.colorPrimary}
              strokeWidth="2"
            />
            <circle cx="12" cy="15" r="2" fill={state.token.colorPrimary} />
          </svg>
        </Col>
      </Row>
    </section>
  );
};

export default Component;
