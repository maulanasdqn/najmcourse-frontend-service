import { Button, Form, Typography } from "antd";
import {
  CodeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useRegister } from "./_hooks/use-register";
import { ControlledInput } from "@/shared/components/ui/controlled-input/input";
import { FC, ReactElement } from "react";
import { ControlledSelect } from "@/shared/components/ui/controlled-select";
import { ControlledInputPhone } from "@/shared/components/ui/controlled-input-phone";
import { ControlledCheckbox } from "@/shared/components/ui/controlled-checkbox";
import { Link } from "react-router";

const { Text, Title } = Typography;

export const Component: FC = (): ReactElement => {
  const { form, state, options, handler } = useRegister();

  return (
    <div className="w-full px-6">
      <div style={state.styles.header}>
        <Title style={state.styles.title}>Daftar Sekarang</Title>
        <Text style={state.styles.text}>
          Silahkan daftar untuk mendapatkan akses ke NAJM Course CAT.
        </Text>
      </div>
      <Form
        name="auth_register"
        initialValues={{ remember: true }}
        onFinish={handler.onSubmit}
        layout="vertical"
        requiredMark="optional"
        style={{ width: "100%" }}
      >
        <ControlledInput
          control={form.control}
          name="fullname"
          placeholder="Nama Lengkap"
          prefix={<MailOutlined />}
          type="text"
          size="large"
        />
        <div className="flex w-full gap-x-6">
          <ControlledInput
            control={form.control}
            name="email"
            placeholder="Email"
            prefix={<MailOutlined />}
            type="email"
            size="large"
          />
          <ControlledInputPhone
            control={form.control}
            name="phone_number"
            placeholder="Nomor Telepon"
            prefix={<PhoneOutlined />}
            size="large"
          />
        </div>
        <ControlledInput
          control={form.control}
          name="password"
          prefix={<LockOutlined />}
          placeholder="Kata sandi"
          type="password"
          size="large"
        />
        <ControlledSelect
          control={form.control}
          name="student_type"
          placeholder="Tipe Siswa"
          prefix={<UserSwitchOutlined />}
          options={[
            {
              label: "TNI",
              value: "TNI",
            },
            {
              label: "Polri",
              value: "POLRI",
            },
            {
              label: "Kedinasan",
              value: "KEDINASAN",
            },
          ]}
          size="large"
        />
        <ControlledSelect
          control={form.control}
          name="referred_by"
          placeholder="Tahu dari mana?"
          prefix={<UserAddOutlined />}
          options={options.refferedBy}
          size="large"
        />
        <ControlledInput
          control={form.control}
          name="referral_code"
          placeholder="Kode Refferal"
          prefix={<CodeOutlined />}
          size="large"
        />
        <ControlledCheckbox
          control={form.control}
          name="terms_and_conditions"
          label="Setujui Syarat dan Ketentuan"
        />
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            loading={state.isLoading}
            size="large"
            disabled={!form.formState.isValid}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Daftar Sekarang
          </Button>
        </Form.Item>
        <div className="flex mt-4 w-full justify-center">
          <Link to="/auth/login" style={{ float: "right" }}>
            Sudah punya akun? Masuk disini
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Component;
