import { useSession } from "@/app/_components/providers/session";
import { Page } from "admiral";
import { Typography } from "antd";
import { FC, ReactElement } from "react";

const Component: FC = (): ReactElement => {
  const { session } = useSession();

  return (
    <Page title="Dashboard">
      <Typography.Paragraph>Hello, {session?.user?.name}</Typography.Paragraph>
    </Page>
  );
};

export default Component;
