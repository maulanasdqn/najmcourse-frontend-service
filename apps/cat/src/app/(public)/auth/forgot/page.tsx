import { Button, Form, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { ControlledInput } from "@/shared/components/ui/controlled-input/input";
import { useForgot } from "./_hooks/use-forgot";
import { FC, ReactElement } from "react";
import { Link } from "react-router";
import { ROUTES } from "@/shared/commons/constants/routes";

const { Text, Title } = Typography;

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useForgot();

  return (
    <div className="w-full px-6">
      <div style={state.styles.header}>
        <Title style={state.styles.title}>Lupa Kata sandi</Title>
        <Text style={state.styles.text}>Silahkan masukkan email Anda.</Text>
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

        <Form.Item>
          <Link to={ROUTES.auth.login} style={{ float: "right" }}>
            Sudah ingat kata sandi? Masuk
          </Link>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            size="large"
            disabled={!form.formState.isValid}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Kirim Email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Component;
