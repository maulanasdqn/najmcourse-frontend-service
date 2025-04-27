import { Button, Checkbox, Col, Form, Row, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useLogin } from "./_hooks/use-login";
import { ControlledInput } from "@/app/_components/ui/controlled-input";

const { Text, Title, Link } = Typography;

export default function Component() {
  const { form, state, handler } = useLogin();

  return (
    <section style={state.styles.section}>
      <Row style={state.styles.row} justify="center">
        <Col xs={24} md={12} style={state.styles.formWrapper}>
          <div style={state.styles.container}>
            <div style={state.styles.header}>
              <Title style={state.styles.title}>Sign in</Title>
              <Text style={state.styles.text}>
                Welcome back! Please enter your credentials to sign in.
              </Text>
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
              />

              <ControlledInput
                control={form.control}
                name="password"
                prefix={<LockOutlined />}
                placeholder="Password"
                type="password"
              />

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link href="" style={{ float: "right" }}>
                  Forgot password?
                </Link>
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Log in
                </Button>

                <div style={state.styles.footer}>
                  <Text style={state.styles.text}>Don't have an account?</Text>{" "}
                  <Link href="">Sign up now</Link>
                </div>
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
}
