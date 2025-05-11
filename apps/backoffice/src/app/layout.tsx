import { FC, ReactElement } from "react";
import SessionProvider from "@/shared/components/providers/session";
import AntDProvider from "@/shared/components/providers/theme";

const MainLayout: FC = (): ReactElement => {
  return (
    <AntDProvider>
      <SessionProvider />
    </AntDProvider>
  );
};

export default MainLayout;
