import { useSession } from "@/app/_components/providers/session";
import { Page } from "admiral";
import { Button } from "antd";
import { FC, ReactElement } from "react";

const Component: FC = (): ReactElement => {
  const { signout } = useSession();
  const handleLogout = () => {
    signout();
  };
  return (
    <Page title="Dashboard">
      <h1>Dashboard</h1>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Page>
  );
};

export default Component;
