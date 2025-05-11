import type { FC, ReactElement } from "react";
import { Spin } from "antd";

const AppLoading: FC = (): ReactElement => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Spin size="large" />
    </div>
  );
};

export default AppLoading;
