import { FC, ReactElement } from "react";
import SessionProvider from "./_components/providers/session";
import AntDProvider from "./_components/providers/theme";

const MainLayout: FC = (): ReactElement => {
  return (
    <AntDProvider>
      <SessionProvider />
    </AntDProvider>
  );
};

export default MainLayout;
