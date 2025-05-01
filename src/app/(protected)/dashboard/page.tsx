import { useSession } from "@/app/_components/providers/session";
import { Button, Typography } from "antd";
import { FC, ReactElement } from "react";

const Component: FC = (): ReactElement => {
  const { signOut } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={2}>Dashboard</Typography.Title>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Component;
