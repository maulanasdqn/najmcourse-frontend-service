import { ConfigProvider, type ThemeConfig, App as AntdApp } from "antd";
import { FC, PropsWithChildren, ReactElement } from "react";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#4D9AC1",
    colorLink: "#4D9AC1",
    colorBgLayout: "rgb(249 250 251)",
    colorText: "#0B0A13",
  },
  components: {
    Menu: {
      itemColor: "#2A3E52",
      itemSelectedColor: "#B5DBED",
      itemHoverBg: "#4D9AC1",
      itemHoverColor: "#B5DBED",
      itemSelectedBg: "#4D9AC1",
      fontSize: 14,
      horizontalItemSelectedColor: "#4D9AC1",
    },
    Layout: {
      headerColor: "#FFFFFF",
      headerBg: "#2A3E52",
    },
    Button: {
      colorPrimary: "#4D9AC1",
      colorPrimaryHover: "#2A3E52",
      colorPrimaryActive: "#2A3E52",
    },
  },
};

const ThemeProvider: FC<PropsWithChildren> = (props): ReactElement => {
  return (
    <ConfigProvider theme={theme}>
      <AntdApp>{props.children}</AntdApp>
    </ConfigProvider>
  );
};

export default ThemeProvider;
