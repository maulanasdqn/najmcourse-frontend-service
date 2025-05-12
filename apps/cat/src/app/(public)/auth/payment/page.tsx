import { Button, Card, Typography, Space } from "antd";
import { FC, ReactElement } from "react";
import { useAuth } from "../_hooks/use-auth";
import { WhatsAppOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export const Component: FC = (): ReactElement => {
  const { styles } = useAuth();

  const data = {
    status: "Menunggu Konfirmasi",
    totalPembayaran: "Rp 1.000.000",
    bank: "BNI",
    noRekening: "02312234",
  };

  return (
    <div className="w-full px-6">
      <div style={styles.header}>
        <Title style={styles.title}>Konfirmasi Pembayaran</Title>
        <Text style={styles.text}>Silakan konfirmasi pembayaran Anda melalui WhatsApp.</Text>
      </div>

      <Card style={{ borderRadius: 8, marginTop: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <RowText label="Status:" value={data.status} badge />
          <RowText label="Total Pembayaran:" value={data.totalPembayaran} bold blue />
          <RowText label="Bank:" value={data.bank} />
          <RowText label="No. Rekening:" value={data.noRekening} />
        </Space>
      </Card>

      <div className="mt-6">
        <Button
          icon={<WhatsAppOutlined />}
          size="large"
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Kirim Bukti Pembayaran via WhatsApp
        </Button>

        <Button
          href="/auth/login"
          type="default"
          style={{
            marginTop: 12,
            width: "100%",
            borderColor: "#D0D5DD",
            color: "#1D2939",
            backgroundColor: "transparent",
          }}
        >
          Kembali ke halaman login
        </Button>
      </div>
    </div>
  );
};

const RowText = ({
  label,
  value,
  badge,
  bold,
  blue,
}: {
  label: string;
  value: string;
  badge?: boolean;
  bold?: boolean;
  blue?: boolean;
}) => (
  <div className="flex justify-between w-full border-b-gray-200 border-b pb-2">
    <Text>{label}</Text>
    {badge ? (
      <span
        style={{
          backgroundColor: "#FEF3C7",
          color: "#92400E",
          padding: "2px 12px",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {value}
      </span>
    ) : (
      <Text strong={bold} style={{ color: blue ? "#2E90FA" : undefined }}>
        {value}
      </Text>
    )}
  </div>
);

export default Component;
