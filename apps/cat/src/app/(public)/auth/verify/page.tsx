import { Button, Form, Typography } from "antd";
import { FC, ReactElement, useEffect, useState } from "react";
import { useVerify } from "./_hooks/use-verify";
import { ControlledInputOtp } from "@/shared/components/ui/controlled-input-otp";

const { Text, Title } = Typography;

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useVerify();

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = () => {
    handler.onResendCode?.();
    setTimer(60);
  };

  return (
    <div className="w-full px-6">
      <div style={state.styles.header}>
        <Title style={state.styles.title}>Verifikasi Email</Title>
        <Text style={state.styles.text}>Email dengan kode verifikasi telah dikirim.</Text>
      </div>
      <Form
        name="auth_verify"
        initialValues={{ remember: true }}
        onFinish={handler.onSubmit}
        layout="vertical"
        requiredMark="optional"
        style={{ width: "100%" }}
      >
        <ControlledInputOtp length={6} name="otp" control={form.control} size="large" />
        <Form.Item>
          {timer > 0 ? (
            <Text style={{ float: "right" }}>Kirim ulang dalam {timer}s</Text>
          ) : (
            <Button type="link" style={{ float: "right", padding: 0 }} onClick={handleResendCode}>
              Kirim Ulang Kode
            </Button>
          )}
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
            Verifikasi Sekarang
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Component;
