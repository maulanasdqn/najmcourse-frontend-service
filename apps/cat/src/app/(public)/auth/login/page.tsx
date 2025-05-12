import { Button, Form, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useLogin } from "./_hooks/use-login";
import { ControlledInput } from "@/shared/components/ui/controlled-input/input";
import { FC, ReactElement } from "react";
import { ROUTES } from "@/shared/commons/constants/routes";
import { Link } from "react-router";

const { Text, Title } = Typography;

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useLogin();

  return (
    <div className="w-full px-6">
      <div style={state.styles.header}>
        <Title style={state.styles.title}>Selamat datang kembali</Title>
        <Text style={state.styles.text}>Silahkan masuk dengan akun Anda.</Text>
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
          <Link to={ROUTES.auth.forgotPassword} style={{ float: "right" }}>
            Lupa kata sandi anda
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
            Masuk
          </Button>
        </Form.Item>
        <div className="flex mt-4 w-full justify-center">
          <Link to="/auth/register" style={{ float: "right" }}>
            Belum punya akun? Daftar sekarang
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Component;
